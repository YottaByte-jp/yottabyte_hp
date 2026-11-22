import assert from 'node:assert/strict';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';
import {
  cleanArticleHtml,
  fetchArticles,
  normalizeArticle,
  syncSnapshot,
} from './sync-wordpress-blog.mjs';

const origin = 'https://cms.yottabyte.jp';
const article = {
  id: 1,
  status: 'publish',
  slug: 'first-article',
  title: '仕事の仕組みを考える',
  description: '記事の説明です。',
  category: 'development',
  publishedAt: '2026-11-22',
  html: '<h2>始め方</h2><p>まずは課題を整理します。</p>',
  image: null,
};
const response = (items = [], page = 1, totalPages = 0) =>
  Response.json({ version: 1, items, page, totalPages });

test('published articles preserve Japanese text, safe body, and vector fallback', () => {
  const post = normalizeArticle(article);
  assert.equal(post.title, article.title);
  assert.equal(post.blocks[0].html, '<h3>始め方</h3><p>まずは課題を整理します。</p>');
  assert.match(post.image.src, /\.svg$/);
  assert.equal(normalizeArticle({ ...article, slug: '%e9%96%8b%e7%99%ba' }).slug, '開発');
});

test('draft/private, unsafe slug, unknown category, invalid date and empty body are rejected', () => {
  for (const invalid of [
    { status: 'draft' },
    { status: 'private' },
    { slug: '../escape' },
    { slug: 'category' },
    { category: 'old-media' },
    { publishedAt: '2026-02-30' },
    { html: '' },
    { title: '' },
  ])
    assert.throws(() => normalizeArticle({ ...article, ...invalid }));
});

test('article markup removes executable HTML, styles, embedded frames and unsafe links', () => {
  const html = cleanArticleHtml(
    '<script>alert(1)</script><iframe src="https://bad.test"></iframe><p style="display:none" onclick="alert(1)">本文</p><a href="javascript:alert(1)">リンク</a><a target="_blank" href="https://example.com/">参考</a>',
  );
  assert(!/script|iframe|onclick|style=|javascript:/.test(html));
  assert.match(html, /rel="noopener noreferrer"/);
  assert(html.includes('本文'));
});

test('only CMS upload images may enter the snapshot, with handlers/srcset removed', () => {
  const src = `${origin}/wp-content/uploads/2026/11/example.webp`;
  const html = cleanArticleHtml(
    `<figure><img src="${src}" alt="図" onerror="alert(1)" srcset="https://bad.test/a 2x"><figcaption>説明</figcaption></figure>`,
  );
  assert(html.includes(src));
  assert(!html.includes('onerror') && !html.includes('srcset'));
  for (const unsafe of [
    'http://cms.yottabyte.jp/wp-content/uploads/a.png',
    'https://evil.test/a.png',
    'https://user:password@cms.yottabyte.jp/wp-content/uploads/a.png',
    'data:image/svg+xml,x',
  ]) {
    assert.throws(() => normalizeArticle({ ...article, image: { src: unsafe } }));
    assert.throws(() => cleanArticleHtml(`<img src="${unsafe}">`));
  }
});

test('only the exact new CMS endpoint is requested, with paging and no redirect following', async () => {
  const urls = [];
  const posts = await fetchArticles(origin, async (url, options) => {
    urls.push(url.href);
    assert.equal(options.redirect, 'error');
    return urls.length === 1
      ? response([article], 1, 2)
      : response([{ ...article, id: 2, slug: 'second' }], 2, 2);
  });
  assert.equal(posts.length, 2);
  assert.deepEqual(urls, [
    `${origin}/wp-json/yottabyte/v1/articles?page=1&per_page=50`,
    `${origin}/wp-json/yottabyte/v1/articles?page=2&per_page=50`,
  ]);
  await assert.rejects(fetchArticles('https://media.yottabyte.jp'), /BLOG_CMS_ORIGIN/);
});

test('zero articles are valid; duplicate slugs and changing page count stop publication', async () => {
  assert.deepEqual(await fetchArticles(origin, async () => response()), []);
  await assert.rejects(
    fetchArticles(origin, async () => response([article, article], 1, 1)),
    /Duplicate/,
  );
  let page = 0;
  await assert.rejects(
    fetchArticles(origin, async () => response([article], ++page, page === 1 ? 2 : 3)),
    /changed/,
  );
  await assert.rejects(
    fetchArticles(origin, async () => new Response('unavailable', { status: 503 })),
    /503/,
  );
  await assert.rejects(
    fetchArticles(origin, async () => Response.json({ items: [] })),
    /schema/,
  );
});

test('a failed CMS fetch cannot erase the last good snapshot; an explicit empty feed can', async () => {
  const directory = await mkdtemp(join(tmpdir(), 'yottabyte-blog-test-'));
  const output = join(directory, 'posts.json');
  try {
    await writeFile(output, '["last good snapshot"]\n');
    await assert.rejects(
      syncSnapshot(origin, output, async () => {
        throw new Error('network unavailable');
      }),
    );
    assert.equal(await readFile(output, 'utf8'), '["last good snapshot"]\n');
    await syncSnapshot(origin, output, async () => response());
    assert.deepEqual(JSON.parse(await readFile(output, 'utf8')), []);
  } finally {
    await rm(directory, { recursive: true, force: true });
  }
});
