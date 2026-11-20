import { mkdirSync, writeFileSync } from 'node:fs';

// Original vector scenes for the Shonan preview. No raster images or external resources.
const output = new URL('../public/illustrations/shonan-cases/', import.meta.url);
const ink = '#252525';
const paper = '#fff9ef';
const mint = '#bedfca';
const blue = '#d5eaf1';
const green = '#96b879';
const yellow = '#f3d18a';
const coral = '#d7907e';
const muted = '#74887c';
const esc = (value) =>
  String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const rect = (x, y, w, h, fill = paper, r = 8) =>
  '<rect x="' +
  x +
  '" y="' +
  y +
  '" width="' +
  w +
  '" height="' +
  h +
  '" rx="' +
  r +
  '" fill="' +
  fill +
  '"/>';
const path = (d, fill = 'none', stroke = ink, width = 2.2) =>
  '<path d="' + d + '" fill="' + fill + '" stroke="' + stroke + '" stroke-width="' + width + '"/>';
const circle = (x, y, r, fill = paper, stroke = ink) =>
  '<circle cx="' +
  x +
  '" cy="' +
  y +
  '" r="' +
  r +
  '" fill="' +
  fill +
  '" stroke="' +
  stroke +
  '"/>';
const text = (x, y, value, size = 18, color = ink, weight = 500) =>
  '<text x="' +
  x +
  '" y="' +
  y +
  '" font-size="' +
  size +
  '" font-weight="' +
  weight +
  '" fill="' +
  color +
  '" stroke="none">' +
  esc(value) +
  '</text>';
const group = (content, transform) => '<g transform="' + transform + '">' + content + '</g>';
const placeSymbol = (id, x, y, width, height) =>
  '<use href="#' +
  id +
  '" x="' +
  x +
  '" y="' +
  y +
  '" width="' +
  width +
  '" height="' +
  height +
  '"/>';
const check = (x, y, scale = 1) =>
  group(
    path('M0 8l7 7L23 0', 'none', ink, 3),
    'translate(' + x + ' ' + y + ') scale(' + scale + ')',
  );

const symbols =
  '<defs>' +
  '<symbol id="plant" viewBox="0 0 80 110">' +
  path('M40 83V28') +
  path('M39 58C8 63 4 36 13 29c17-4 30 10 26 29Z', green) +
  path('M42 44C42 18 63 6 72 15c6 16-10 32-30 29Z', mint) +
  path('M40 78C13 79 9 61 18 55c13-1 23 9 22 23Z', mint) +
  path('M42 67c3-23 24-28 30-18 1 14-13 23-30 18Z', green) +
  path('M23 80h36l-5 26H28Z', paper) +
  '</symbol>' +
  '<symbol id="guide" viewBox="0 0 180 250">' +
  '<ellipse cx="87" cy="235" rx="77" ry="12" fill="' +
  mint +
  '" stroke="none"/>' +
  path('M58 139l-4 86 22 2 13-74 14 72 23-2-14-86Z', '#73877b') +
  path('M54 221l22 2 5 13c-13 8-31 5-32-2Z', paper) +
  path('M102 220l22-2 17 13c3 8-12 10-34 4Z', paper) +
  path('M63 74l-13 9-8 53 15 11 57-3 9-57-21-13Z', '#e1ebdf') +
  path('M74 69v14l14 9 13-13-5-17', paper) +
  path('M60 35c-1-27 44-31 48-1l-3 25c-4 18-23 20-35 4Z', paper) +
  path('M59 43C42 12 82-4 102 12c15 7 17 24 8 37l-7-22-11 5-11-9-8 21Z', ink) +
  path('M94 44h3m-12 15 11-1', 'none', ink, 1.7) +
  path('M114 88l20 12 22-22 8 9-25 31-24-8Z', '#e1ebdf') +
  path('m156 78 3-12 6-5 2 12 10-4 2 5-15 13Z', paper) +
  path('M49 87l-13 32 26 13 4-10-14-9 10-18', '#e1ebdf') +
  path('m62 121 9 3 4 9-12-1Z', paper) +
  path('m65 98 34 5-5 30-32-5Z', blue) +
  path('m75 109 14 2m-15 8 12 2', 'none', muted, 2) +
  '</symbol>' +
  '<symbol id="maker" viewBox="0 0 220 235">' +
  '<ellipse cx="105" cy="220" rx="99" ry="13" fill="' +
  mint +
  '" stroke="none"/>' +
  path('M29 109c-19-37-17-66 1-67 19-1 29 29 32 70Z', '#a5c684') +
  path('M24 111h58l5 17H34Z', '#a5c684') +
  path('M40 128v78m34-78 13 78', 'none', ink, 3) +
  path('M61 134l41 17 6 47-18 5-13-41-28-7Z', '#677b70') +
  path('M47 139l13 40-8 31 19 5 15-39-14-37Z', '#677b70') +
  path('m52 205 19 5 8 11c-3 8-35 3-36-4Z', paper) +
  path('m91 197 17-4 17 17c4 10-27 12-33 4Z', paper) +
  path('M38 77c17-12 34-10 47 1l16 57-63 10-9-40Z', '#e0e9dc') +
  path('M51 68v16l15 7 9-17-2-14', paper) +
  path('M42 37c1-23 35-29 43-8l1 22c0 20-20 27-32 13Z', paper) +
  path('M42 48c-16-13-9-40 10-42 27-8 45 11 34 35l-9-20-14 8-11-5Z', ink) +
  path('M72 47h4m-8 14 9-1', 'none', ink, 1.6) +
  path('m79 87 24 22 25-2 2 11-35 5-28-22', '#e0e9dc') +
  path('m128 106 14 1 2 9-14 2Z', paper) +
  path('m88 124 91-7 38 21-100 12-57-16Z', '#edddbd') +
  path('M75 139v76m117-74v72', 'none', ink, 3) +
  path('m120 120 12-53 63 8-14 51Z', blue) +
  path('m120 120 61 6 17 7-66-2Z', '#d1e0d6') +
  path('m145 87 31 3m-34 7 24 2m-26 8 29 3', 'none', muted, 2) +
  '</symbol>' +
  '</defs>';

function browser(x, y, w, h, content, label) {
  return group(
    rect(8, 8, w, h, mint, 10) +
      rect(0, 0, w, h, paper, 10) +
      rect(0, 0, w, 36, '#e0eadf', 10) +
      path('M0 36h' + w) +
      circle(19, 18, 4, coral) +
      circle(34, 18, 4, yellow) +
      circle(49, 18, 4, green) +
      text(72, 24, label, 14, ink, 600) +
      path('M' + (w - 34) + ' 13h16m-16 6h16m-16 6h16', 'none', muted, 1.6) +
      content,
    'translate(' + x + ' ' + y + ')',
  );
}

function document(x, y, w = 120, h = 150) {
  return group(
    path('M0 0h' + (w - 25) + 'l25 25v' + (h - 25) + 'H0Z', paper) +
      path('M' + (w - 25) + ' 0v25h25') +
      rect(15, 22, 24, 8, mint, 2) +
      path(
        'M15 53h' +
          (w - 30) +
          'm-' +
          (w - 30) +
          ' 18h' +
          (w - 45) +
          'm-' +
          (w - 45) +
          ' 18h' +
          (w - 30) +
          'm-' +
          (w - 30) +
          ' 18h' +
          (w - 50),
        'none',
        muted,
        2,
      ),
    'translate(' + x + ' ' + y + ')',
  );
}

function database(x, y) {
  return group(
    path('M0 22v83c0 30 120 30 120 0V22', mint) +
      '<ellipse cx="60" cy="22" rx="60" ry="22" fill="' +
      paper +
      '"/>' +
      path('M0 62c0 30 120 30 120 0M0 96c0 30 120 30 120 0') +
      circle(99, 108, 4, green),
    'translate(' + x + ' ' + y + ')',
  );
}

const projects = [
  {
    id: 'subscription-platform',
    caption: '学習サービスと、決済。',
    desc: '学習サービスの画面、決済カード、利用状況の確認を細い線と淡い色で表現したイメージ。',
    scene:
      browser(
        218,
        117,
        520,
        302,
        rect(22, 60, 197, 169, blue) +
          path('M22 167c45-34 82 15 112-7s57-7 85 7v62H22Z', mint) +
          path('m99 102 48 28-48 28Z', paper) +
          path('M37 250h169', 'none', '#cbd8cd', 10) +
          path('M37 250h111', 'none', green, 10) +
          [0, 1, 2]
            .map(
              (i) =>
                rect(245, 61 + i * 65, 250, 50, i === 1 ? '#e6eedb' : paper, 6) +
                circle(266, 86 + i * 65, 7, i === 1 ? yellow : mint) +
                path('M285 ' + (79 + i * 65) + 'h145m-145 13h100', 'none', muted, 2),
            )
            .join(''),
        'LEARNING',
      ) +
      placeSymbol('maker', 57, 292, 222, 237) +
      group(
        rect(7, 7, 210, 129, mint, 13) +
          rect(0, 0, 210, 129, paper, 13) +
          rect(0, 27, 210, 27, '#a7c5a1', 0) +
          rect(20, 75, 29, 22, yellow, 4) +
          path('M66 87h54m16 0h25M20 111h83', 'none', muted, 3),
        'translate(609 326) rotate(5)',
      ) +
      circle(789, 472, 33, mint) +
      check(778, 465, 1.1),
  },
  {
    id: 'kintone-accounting',
    caption: '契約と、請求をつなぐ。',
    desc: '業務管理の画面と会計の帳票をAPIでつなぐ様子を、人物と線画で表現したイメージ。',
    scene:
      browser(
        97,
        119,
        300,
        287,
        rect(20, 59, 260, 36, '#e6eedb', 4) +
          [0, 1, 2, 3]
            .map(
              (i) =>
                rect(20, 112 + i * 37, 17, 17, i < 3 ? mint : paper, 3) +
                path('M51 ' + (119 + i * 37) + 'h202m-202 9h146', 'none', muted, 2),
            )
            .join(''),
        'kintone',
      ) +
      browser(
        512,
        161,
        285,
        256,
        rect(19, 57, 247, 43, blue, 5) +
          path(
            'M35 77h88m-88 12h149M20 125h245M20 159h245M20 193h245M183 111v108',
            'none',
            muted,
            2,
          ) +
          rect(190, 211, 66, 22, mint, 4),
        'ACCOUNTING',
      ) +
      path('M399 267h30m43 0h39m-12-8 12 8-12 8') +
      circle(455, 267, 37, yellow) +
      text(436, 274, 'API', 20, ink, 700) +
      document(375, 367, 122, 146) +
      placeSymbol('guide', 689, 306, 165, 229) +
      placeSymbol('plant', 52, 399, 70, 96),
  },
  {
    id: 'llm-customization',
    caption: 'AIを、日々の仕事へ。',
    desc: '資料からAIの応答をつくる画面と、それを利用する人物を線画で表現したイメージ。',
    scene:
      browser(
        250,
        112,
        514,
        314,
        rect(16, 52, 131, 244, '#e5eedf', 5) +
          document(37, 69, 85, 104) +
          document(49, 187, 74, 91) +
          path(
            'M166 63h304q12 0 12 12v49q0 12-12 12H196l-30 16v-16q-12 0-12-12V75q0-12 12-12Z',
            blue,
          ) +
          path('M179 87h237m-237 20h177', 'none', muted, 2.2) +
          path(
            'M191 171h273q12 0 12 12v63q0 12-12 12H218l-27 18v-18q-12 0-12-12v-63q0-12 12-12Z',
            mint,
          ) +
          path('M202 196h225m-225 20h201m-201 20h153', 'none', '#527b60', 2.3),
        'AI WORKSPACE',
      ) +
      placeSymbol('guide', 76, 271, 184, 256) +
      group(
        rect(7, 7, 91, 88, mint, 13) +
          rect(0, 0, 91, 88, paper, 13) +
          circle(45, 42, 28, blue) +
          text(29, 49, 'AI', 23, ink, 700) +
          path('M16 0v-11m20 11v-11m20 11v-11m20 11v-11M16 88v11m20-11v11m20-11v11m20-11v11'),
        'translate(653 400) rotate(5)',
      ) +
      placeSymbol('plant', 788, 406, 67, 92),
  },
  {
    id: 'video-research-saas',
    caption: '動画の情報を、ひとつに。',
    desc: '動画の検索画面と分析グラフ、開発する人物を線画で表現したイメージ。',
    scene:
      browser(
        119,
        121,
        603,
        338,
        rect(21, 59, 275, 165, blue, 5) +
          path('M21 185c58-39 94 12 144-13s84-7 131 9v43H21Z', mint) +
          path('m127 108 63 36-63 36Z', paper) +
          [0, 1, 2]
            .map(
              (i) =>
                rect(21 + i * 98, 242, 81, 62, i === 1 ? yellow : mint, 5) +
                path('m' + (52 + i * 98) + ' 257 24 15-24 15Z', paper),
            )
            .join('') +
          rect(320, 59, 259, 174, paper, 5) +
          path('M340 207h219M340 207V80M340 164h219M340 122h219', 'none', '#c2d3c6', 1.4) +
          path('M354 186l39-27 36 9 39-54 37 12 39-35', 'none', coral, 3.5) +
          circle(468, 114, 5, coral) +
          rect(320, 255, 259, 41, '#e7eddc', 5) +
          circle(344, 273, 8, paper) +
          path('m350 279 9 9M372 272h163', 'none', muted, 2),
        'VIDEO RESEARCH',
      ) +
      placeSymbol('maker', 649, 323, 203, 217) +
      placeSymbol('plant', 47, 401, 62, 85),
  },
  {
    id: 'kintone-data-analytics',
    caption: '業務のデータを、見える形に。',
    desc: '業務データの表、データベース、分析ダッシュボードの連携を線画で表現したイメージ。',
    scene:
      browser(
        94,
        126,
        240,
        190,
        rect(17, 55, 206, 28, '#e3ecda', 3) +
          path('M17 104h206M17 132h206M17 160h206M77 84v92M165 84v92', 'none', muted, 1.7),
        'kintone',
      ) +
      browser(
        394,
        126,
        413,
        303,
        [0, 1, 2]
          .map(
            (i) =>
              rect(19 + i * 128, 57, 115, 57, [mint, blue, '#f3dfb3'][i], 5) +
              path('M' + (31 + i * 128) + ' 75h54m-54 21h80', 'none', muted, 2),
          )
          .join('') +
          path('M26 263h356M26 263V140M26 220h356M26 178h356', 'none', '#c1d1c1', 1.4) +
          rect(50, 218, 35, 45, mint, 2) +
          rect(111, 186, 35, 77, blue, 2) +
          rect(172, 160, 35, 103, yellow, 2) +
          rect(233, 178, 35, 85, mint, 2) +
          rect(294, 145, 35, 118, blue, 2) +
          path('M47 190l75-28 70 8 63-42 78 9', 'none', coral, 3),
        'ANALYTICS',
      ) +
      path('M334 219h59m-12-8 12 8-12 8M333 315v44h58', 'none', muted, 2.4) +
      database(264, 349) +
      placeSymbol('guide', 72, 301, 164, 228) +
      placeSymbol('plant', 789, 417, 58, 80),
  },
  {
    id: 'healthcare-api',
    caption: '安心して使える、APIへ。',
    desc: '稼働状況を確認する画面とAPIの検証、保守に取り組む人物を線画で表現したイメージ。',
    scene:
      browser(
        244,
        133,
        508,
        292,
        rect(20, 60, 303, 151, blue, 6) +
          path('M35 185h273M35 151h273M35 117h273', 'none', '#b5cfd4', 1.5) +
          path('M36 153h49l20-37 27 76 31-104 29 65h104', 'none', '#527c5e', 3.2) +
          [0, 1, 2]
            .map(
              (i) =>
                circle(352, 77 + i * 57, 9, i === 1 ? yellow : mint) +
                path('M373 ' + (73 + i * 57) + 'h105m-105 13h76', 'none', muted, 2),
            )
            .join('') +
          rect(20, 233, 463, 34, '#e1ecd9', 5) +
          path('M37 250h249', 'none', muted, 2),
        'SERVICE STATUS',
      ) +
      group(
        rect(7, 7, 180, 120, mint, 10) +
          rect(0, 0, 180, 120, paper, 10) +
          path('m52 35-25 24 25 24m76-48 25 24-25 24m-28-55-24 70', 'none', ink, 2.8),
        'translate(107 244) rotate(-5)',
      ) +
      path('M696 354l58 22v48c0 41-58 73-58 73s-58-32-58-73v-48Z', mint) +
      check(676, 407, 1.7) +
      placeSymbol('maker', 68, 335, 178, 190) +
      placeSymbol('plant', 789, 402, 65, 90),
  },
];

mkdirSync(output, { recursive: true });
for (const [index, project] of projects.entries()) {
  const svg =
    '<svg xmlns="http://www.w3.org/2000/svg" width="900" height="600" viewBox="0 0 900 600" fill="none" stroke="' +
    ink +
    '" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" font-family="Hiragino Sans,Yu Gothic,sans-serif" role="img" aria-labelledby="title desc">' +
    '<title id="title">' +
    esc(project.caption) +
    '</title><desc id="desc">' +
    esc(project.desc) +
    '</desc>' +
    symbols +
    '<rect width="900" height="600" fill="#edf3e9" stroke="none"/>' +
    path('M0 376C146 347 209 392 363 373s331-26 537 8v219H0Z', '#d7e9d7', 'none') +
    path('M0 487c171-38 275 6 438-16s304-19 462-8', 'none', '#aacbb6', 1.5) +
    '<ellipse cx="454" cy="469" rx="330" ry="44" fill="#c8e2cb" stroke="none"/>' +
    project.scene +
    text(48, 568, project.caption, 32, ink, 700) +
    text(772, 568, 'WORK ' + String(index + 1).padStart(2, '0'), 17, '#526c48', 700) +
    '</svg>\n';
  writeFileSync(new URL(project.id + '.svg', output), svg);
}
console.log('Created ' + projects.length + ' original Shonan-style SVG case illustrations.');
