import assert from 'node:assert/strict';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const origin = 'https://yottabyte.jp';
const output = resolve('out');
const marker = '<!-- generated: legacy-url-redirect -->';
const redirects = JSON.parse(
  readFileSync(new URL('./legacy-redirects.json', import.meta.url), 'utf8'),
);
const sitemap = readFileSync(resolve(output, 'sitemap.xml'), 'utf8');

// Validate every destination before writing; never replace a current exported page.
for (const [source, destination] of Object.entries(redirects)) {
  assert(/^\/(?:[a-z0-9-]+\/)+$/.test(source), `Invalid legacy path: ${source}`);
  assert(/^\/(?:[a-z0-9-]+\/)+$/.test(destination), `Invalid destination: ${destination}`);
  assert(!redirects[destination], `Redirect chain: ${source} -> ${destination}`);
  assert(
    existsSync(resolve(output, `.${destination}index.html`)),
    `Missing target: ${destination}`,
  );
  assert(
    sitemap.includes(`<loc>${origin}${destination}</loc>`),
    `Non-canonical target: ${destination}`,
  );
  assert(
    !sitemap.includes(`<loc>${origin}${source}</loc>`),
    `Legacy path still canonical: ${source}`,
  );
  const file = resolve(output, `.${source}index.html`);
  assert(
    !existsSync(file) || readFileSync(file, 'utf8').includes(marker),
    `Existing page: ${source}`,
  );
}

for (const [source, destination] of Object.entries(redirects)) {
  const target = `${origin}${destination}`;
  // Google treats a zero-second meta refresh as permanent. GitHub Pages cannot
  // serve application-defined HTTP 301s; JavaScript also retains query/hash values.
  const html = `<!doctype html>
<html lang="ja">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${marker}
  <title>ページを移動しました | 合同会社YottaByte</title>
  <link rel="canonical" href="${target}">
  <meta http-equiv="refresh" content="0;url=${target}">
  <script>window.location.replace(${JSON.stringify(target)} + window.location.search + window.location.hash);</script>
</head>
<body>
  <main id="main-content">
    <h1>ページを移動しました</h1>
    <p>自動的に切り替わらない場合は、<a href="${target}">移動先のページ</a>をご覧ください。</p>
  </main>
</body>
</html>
`;
  const file = resolve(output, `.${source}index.html`);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
}

console.log(`Generated ${Object.keys(redirects).length} legacy URL redirects.`);
