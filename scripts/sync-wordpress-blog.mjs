import { mkdir, rename, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import sanitizeHtml from 'sanitize-html';

const origin = 'https://cms.yottabyte.jp';
const categories = new Set(['development', 'automation', 'ai', 'website']);
const fallbackImages = {
  development: '/illustrations/blog/development.svg',
  automation: '/illustrations/blog/automation.svg',
  ai: '/illustrations/blog/ai.svg',
  website: '/illustrations/blog/website.svg',
};

function requiredString(value, field, maximum = 1000) {
  if (typeof value !== 'string' || !value.trim() || value.length > maximum) {
    throw new Error(`Invalid WordPress article field: ${field}`);
  }
  return value.trim();
}

function imageUrl(value) {
  if (!value) return null;
  const url = new URL(value, origin);
  if (url.origin !== origin || !url.pathname.startsWith('/wp-content/uploads/')) {
    throw new Error('WordPress article image must use the CMS uploads directory');
  }
  if (url.username || url.password) throw new Error('Credentials are not allowed in image URLs');
  return url.href;
}

export function cleanArticleHtml(html) {
  if (typeof html !== 'string' || html.length > 2_000_000) {
    throw new Error('Invalid WordPress article body');
  }
  return sanitizeHtml(html, {
    allowedTags: [
      'p',
      'br',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'strong',
      'b',
      'em',
      'i',
      's',
      'a',
      'ul',
      'ol',
      'li',
      'blockquote',
      'pre',
      'code',
      'figure',
      'figcaption',
      'img',
      'hr',
      'table',
      'thead',
      'tbody',
      'tr',
      'th',
      'td',
      'details',
      'summary',
    ],
    allowedAttributes: {
      a: ['href', 'title', 'target', 'rel'],
      img: ['src', 'alt', 'width', 'height', 'loading'],
      ol: ['start'],
      th: ['scope', 'colspan', 'rowspan'],
      td: ['colspan', 'rowspan'],
      code: ['class'],
    },
    allowedClasses: { code: ['language-*'] },
    allowedSchemes: ['https', 'http', 'mailto', 'tel'],
    allowedSchemesByTag: { img: ['https'] },
    allowProtocolRelative: false,
    transformTags: {
      // The page masthead is h1 and the article title is h2.
      h2: 'h3',
      h3: 'h4',
      h4: 'h5',
      a: (tagName, attributes) => ({
        tagName,
        attribs: {
          ...attributes,
          ...(attributes.target === '_blank' ? { rel: 'noopener noreferrer' } : {}),
        },
      }),
      img: (tagName, attributes) => ({
        tagName,
        attribs: { ...attributes, src: imageUrl(attributes.src) ?? '', loading: 'lazy' },
      }),
    },
  });
}

export function normalizeArticle(item) {
  if (!Number.isSafeInteger(item?.id) || item.id <= 0 || item.status !== 'publish') {
    throw new Error('Only published CMS articles can enter the public snapshot');
  }
  const slug = decodeURIComponent(requiredString(item.slug, 'slug', 540));
  if (!/^[\p{L}\p{N}][\p{L}\p{N}_-]{0,179}$/u.test(slug) || slug === 'category') {
    throw new Error('Invalid WordPress article slug');
  }
  if (!categories.has(item.category)) throw new Error('Unknown WordPress article category');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(item.publishedAt ?? '')) {
    throw new Error('Invalid WordPress article publication date');
  }
  const date = new Date(`${item.publishedAt}T00:00:00Z`);
  if (Number.isNaN(date.getTime()) || date.toISOString().slice(0, 10) !== item.publishedAt) {
    throw new Error('Invalid WordPress article publication date');
  }
  const html = cleanArticleHtml(item.html);
  if (!html.trim()) throw new Error('A published WordPress article must have a body');
  return {
    slug,
    title: requiredString(item.title, 'title', 300),
    description: requiredString(item.description, 'description', 1000),
    category: item.category,
    publishedAt: item.publishedAt,
    image: {
      src: imageUrl(item.image?.src) ?? fallbackImages[item.category],
      alt: typeof item.image?.alt === 'string' ? item.image.alt.slice(0, 500) : '',
    },
    blocks: [{ type: 'html', html }],
  };
}

async function readJson(response) {
  if (!response.ok) throw new Error(`WordPress blog request failed: HTTP ${response.status}`);
  const declared = Number(response.headers.get('content-length'));
  if (declared > 10_000_000) throw new Error('WordPress blog response is too large');
  let size = 0;
  const chunks = [];
  for await (const chunk of response.body) {
    size += chunk.byteLength;
    if (size > 10_000_000) throw new Error('WordPress blog response is too large');
    chunks.push(Buffer.from(chunk));
  }
  return JSON.parse(Buffer.concat(chunks).toString('utf8'));
}

export async function fetchArticles(cmsOrigin, fetcher = fetch) {
  if (cmsOrigin.replace(/\/$/, '') !== origin) {
    throw new Error('BLOG_CMS_ORIGIN must be https://cms.yottabyte.jp');
  }
  const posts = [];
  let pages;
  for (let page = 1; page <= (pages ?? 1); page++) {
    const url = new URL('/wp-json/yottabyte/v1/articles', origin);
    url.searchParams.set('page', String(page));
    url.searchParams.set('per_page', '50');
    const data = await readJson(
      await fetcher(url, {
        signal: AbortSignal.timeout(20_000),
        redirect: 'error',
        headers: { Accept: 'application/json', 'Cache-Control': 'no-cache' },
      }),
    );
    if (
      data.version !== 1 ||
      !Array.isArray(data.items) ||
      data.page !== page ||
      !Number.isInteger(data.totalPages) ||
      data.totalPages < 0 ||
      data.totalPages > 200 ||
      (data.totalPages === 0 && data.items.length !== 0)
    ) {
      throw new Error('Unexpected WordPress blog response schema');
    }
    if (pages !== undefined && pages !== data.totalPages) {
      throw new Error('WordPress articles changed during snapshot; retry the build');
    }
    pages = data.totalPages;
    posts.push(...data.items.map(normalizeArticle));
  }
  if (new Set(posts.map((post) => post.slug)).size !== posts.length) {
    throw new Error('Duplicate WordPress article slug');
  }
  return posts.sort(
    (a, b) => b.publishedAt.localeCompare(a.publishedAt) || a.slug.localeCompare(b.slug),
  );
}

export async function writeSnapshot(posts, output) {
  await mkdir(dirname(output), { recursive: true });
  const temporary = `${output}.${process.pid}.tmp`;
  await writeFile(temporary, `${JSON.stringify(posts, null, 2)}\n`, { mode: 0o600 });
  await rename(temporary, output);
}

export async function syncSnapshot(cmsOrigin, output, fetcher = fetch) {
  const posts = cmsOrigin ? await fetchArticles(cmsOrigin, fetcher) : [];
  await writeSnapshot(posts, output);
  return posts;
}

async function main() {
  const cmsOrigin = process.env.BLOG_CMS_ORIGIN?.trim();
  const output = resolve(
    dirname(fileURLToPath(import.meta.url)),
    '../app/_generated/blog-posts.json',
  );
  // Failures never replace the previous snapshot with an empty list.
  const posts = await syncSnapshot(cmsOrigin, output);
  console.log(
    cmsOrigin
      ? `Synced ${posts.length} published corporate blog articles from the CMS.`
      : 'BLOG_CMS_ORIGIN is unset: generated an empty local blog snapshot.',
  );
}

if (process.argv[1] && import.meta.url === pathToFileURL(resolve(process.argv[1])).href) {
  main().catch((error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
}
