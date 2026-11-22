import assert from 'node:assert/strict';
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { resolve } from 'node:path';

const output = resolve('out');
const errors = [];
let pages = 0;
let references = 0;
function visit(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = resolve(directory, entry.name);
    if (entry.isDirectory()) visit(file);
    else if (entry.name.endsWith('.html')) inspect(file);
  }
}
function inspect(file) {
  // Search Console verification files are plain-text tokens with an .html extension.
  if (/\/google[0-9a-f]+\.html$/.test(file)) return;
  pages++;
  const html = readFileSync(file, 'utf8');
  const path = file.slice(output.length).replace(/index\.html$/, '');
  const base = new URL(path, 'https://yottabyte.jp');
  assert(!html.includes('/preview/shonan/'), `${path}: preview URL in production HTML`);
  assert(!html.includes('/preview/blog/'), `${path}: blog preview URL in production HTML`);
  assert(html.includes('id="main-content"'), `${path}: missing main content target`);
  for (const [, raw] of html.matchAll(/(?:href|src|poster)="([^"]+)"/g)) {
    if (/^(?:data:|mailto:|tel:|javascript:)/.test(raw)) continue;
    const url = new URL(raw.replaceAll('&amp;', '&'), base);
    if (url.origin !== base.origin) continue;
    references++;
    const target = resolve(output, `.${decodeURIComponent(url.pathname)}`);
    if (!existsSync(target) && !existsSync(resolve(target, 'index.html'))) {
      errors.push(`${path}: missing ${url.pathname}`);
    }
  }
}
visit(output);
for (const path of [
  '',
  'features/',
  'service/',
  'service/website/',
  'service/mobile/',
  'case/',
  'blog/',
  'company/',
  'partner/',
  'contact/',
]) {
  const html = readFileSync(resolve(output, path, 'index.html'), 'utf8');
  assert(
    html.includes(`rel="canonical" href="https://yottabyte.jp/${path}"`),
    `${path}: incorrect canonical`,
  );
  assert(!/name="robots" content="[^"]*noindex/.test(html), `${path}: unexpectedly noindex`);
  assert(
    html.includes('property="og:site_name" content="合同会社YottaByte"'),
    `${path}: incorrect site name`,
  );
}
const thanks = readFileSync(resolve(output, 'contact-thanks/index.html'), 'utf8');
assert(/name="robots" content="[^"]*noindex/.test(thanks), 'Thanks page must remain noindex');
const sitemap = readFileSync(resolve(output, 'sitemap.xml'), 'utf8');
for (const path of [
  'features',
  'solutions',
  'partner',
  'service/website',
  'service/mobile',
  'blog',
]) {
  assert(sitemap.includes(`https://yottabyte.jp/${path}/`), `Missing sitemap entry: ${path}`);
}
assert(
  !sitemap.includes('contact-thanks') && !sitemap.includes('/404/'),
  'Private/utility sitemap entry',
);
const blog = readFileSync(resolve(output, 'blog/index.html'), 'utf8');
assert(blog.includes('記事を準備しています'), 'Blog must start with the empty state');
assert(
  blog.replaceAll(/<!--[\s\S]*?-->/g, '').includes('0件の記事'),
  'Blog must start with zero published articles',
);
assert(!existsSync(resolve(output, 'preview/blog')), 'Blog layout fixtures must not be exported');
assert(!sitemap.includes('/preview/'), 'Preview page must not appear in sitemap');
const redirects = JSON.parse(
  readFileSync(new URL('./legacy-redirects.json', import.meta.url), 'utf8'),
);
for (const [source, destination] of Object.entries(redirects)) {
  const html = readFileSync(resolve(output, `.${source}index.html`), 'utf8');
  const target = `https://yottabyte.jp${destination}`;
  assert(
    html.includes(`http-equiv="refresh" content="0;url=${target}"`),
    `${source}: redirect missing`,
  );
  assert(
    html.includes(`rel="canonical" href="${target}"`),
    `${source}: redirect canonical mismatch`,
  );
  assert(
    !/name="robots" content="[^"]*noindex/.test(html),
    `${source}: redirect must remain crawlable`,
  );
  assert(
    !sitemap.includes(`<loc>https://yottabyte.jp${source}</loc>`),
    `${source}: legacy sitemap entry`,
  );
}
assert.deepEqual(errors, [], errors.join('\n'));
console.log(
  `Verified ${pages} HTML files and ${references} local references; production canonicals, indexing, site name, sitemap and new routes passed.`,
);
