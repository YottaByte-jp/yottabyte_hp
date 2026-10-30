import { mkdirSync, writeFileSync } from 'node:fs';

const output = new URL('../public/illustrations/cases/', import.meta.url);
mkdirSync(output, { recursive: true });

const ink = '#18222d';
const blue = '#0553dd';
const muted = '#a5b0be';
const paper = '#f1f4f7';
const pale = '#e5edfc';
const escape = (value) =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const path = (d, color = ink, width = 3, extra = '') =>
  `<path d="${d}" stroke="${color}" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" fill="none" ${extra}/>`;
const rect = (x, y, w, h, fill = 'white', stroke = ink, radius = 14) =>
  `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
const circle = (x, y, r, fill = 'white', stroke = ink) =>
  `<circle cx="${x}" cy="${y}" r="${r}" fill="${fill}" stroke="${stroke}" stroke-width="3"/>`;
const text = (x, y, value, size = 25, color = ink, extra = '') =>
  `<text x="${x}" y="${y}" fill="${color}" font-family="Arial,Helvetica,sans-serif" font-size="${size}" ${extra}>${escape(value)}</text>`;

function document(x, y, w = 170, h = 225, accent = false) {
  return `${rect(x, y, w, h, accent ? pale : 'white')}
    ${rect(x + 25, y + 30, 42, 10, accent ? blue : muted, 'none', 3)}
    ${path(`M${x + 25} ${y + 80}h${w - 50}m-${w - 50} 26h${w - 70}m-${w - 70} 26h${w - 50}m-${w - 50} 26h${w - 80}`, muted, 5)}`;
}

function database(x, y, w = 185, h = 220) {
  return `<path d="M${x} ${y + 30}v${h - 60}c0 43 ${w} 43 ${w} 0V${y + 30}" fill="${pale}" stroke="${blue}" stroke-width="3"/>
    <ellipse cx="${x + w / 2}" cy="${y + 30}" rx="${w / 2}" ry="30" fill="white" stroke="${blue}" stroke-width="3"/>
    ${path(`M${x} ${y + 95}c0 43 ${w} 43 ${w} 0M${x} ${y + 155}c0 43 ${w} 43 ${w} 0`, blue)}
    ${circle(x + w - 26, y + h - 38, 4, blue, blue)}`;
}

function person(x, y) {
  return `${circle(x, y, 16, 'white', muted)}${path(`M${x - 27} ${y + 52}v-8c0-27 54-27 54 0v8`, muted)}`;
}

const projects = [
  {
    id: 'subscription-platform',
    label: 'PLATFORM / BILLING',
    title: 'Subscription platform illustration',
    scene: `${path('M460 305C550 190 1010 185 1120 345', muted, 3)}
      ${path('m1100 327 22 21 5-30', muted)}
      ${rect(430, 325, 430, 285)}
      ${path('M430 375h430', ink, 2)}
      ${circle(454, 350, 4, muted, 'none')}${circle(472, 350, 4, muted, 'none')}${circle(490, 350, 4, muted, 'none')}
      ${rect(462, 408, 104, 168, paper, 'none', 6)}
      ${path('M602 435h180m-180 30h138m-138 30h164', muted, 6)}
      ${rect(603, 529, 130, 32, blue, 'none', 6)}
      ${rect(822, 426, 320, 205, blue, blue, 18)}
      ${rect(850, 466, 54, 42, 'white', 'none', 7)}
      ${path('M851 554h80m28 0h43m26 0h57', 'white', 6)}
      ${path('M1088 665C965 782 593 771 480 645', muted, 3)}
      ${path('m481 672-4-30 30 2', muted)}
      ${person(699, 725)}${person(800, 725)}${person(901, 725)}`,
    flow: [
      ['WEB APP', 'Checkout / Portal'],
      ['STRIPE', 'Subscription'],
      ['WEBHOOK', 'Status events'],
      ['ACCOUNT', 'Organization / Seats'],
    ],
  },
  {
    id: 'kintone-accounting',
    label: 'OPERATIONS / INTEGRATION',
    title: 'Business application and accounting illustration',
    scene: `${document(408, 320, 180, 250)}
      ${path('M625 444h85m-18-18 18 18-18 18', blue, 4)}
      ${rect(738, 345, 180, 180, blue, blue, 28)}
      ${circle(788, 395, 12, 'white', 'none')}${circle(868, 395, 12, 'white', 'none')}
      ${circle(788, 475, 12, 'white', 'none')}${circle(868, 475, 12, 'white', 'none')}
      ${path('M800 395h56m-68 12v56m80-56v56m-68 12h56', 'white', 3)}
      ${path('M950 444h85m-18-18 18 18-18 18', blue, 4)}
      ${document(1064, 320, 180, 250, true)}
      ${path('M455 630h735', muted, 2)}
      ${circle(578, 630, 7, 'white', muted)}${circle(828, 630, 7, blue, blue)}${circle(1078, 630, 7, 'white', muted)}
      ${text(828, 711, 'CONTRACT  /  INVOICE  /  SYNC', 21, ink, 'text-anchor="middle" letter-spacing="2"')}`,
    flow: [
      ['kintone', 'Business applications'],
      ['JAVASCRIPT', 'Input / Export / Sync'],
      ['AWS LAMBDA', 'API integration'],
      ['freee API', 'Accounting data'],
    ],
  },
  {
    id: 'llm-customization',
    label: 'AI / APPLICATION',
    title: 'LLM customization illustration',
    scene: `${document(390, 325, 155, 210)}${document(426, 369, 155, 210, true)}
      ${path('M615 461h96m-18-18 18 18-18 18', muted, 3)}
      <path d="m820 306 122 71v142l-122 71-122-71V377Z" fill="${blue}"/>
      ${path('M765 413h110m-110 38h110m-110 38h110M782 395v114m38-114v114m38-114v114', 'white', 3)}
      ${circle(782, 413, 9, blue, 'white')}${circle(820, 451, 9, blue, 'white')}${circle(858, 489, 9, blue, 'white')}
      ${path('M977 461h92m-18-18 18 18-18 18', muted, 3)}
      <path d="M1112 364h146a18 18 0 0 1 18 18v150a18 18 0 0 1-18 18h-100l-46 39v-39a18 18 0 0 1-18-18V382a18 18 0 0 1 18-18Z" fill="white" stroke="${ink}" stroke-width="3"/>
      ${path('M1122 410h121m-121 31h98m-98 31h111m-111 31h78', muted, 5)}
      ${path('M500 650h660', muted, 2)}
      ${text(820, 711, 'DATA  /  PROMPT  /  RESPONSE', 21, ink, 'text-anchor="middle" letter-spacing="2"')}`,
    flow: [
      ['WEB APP', 'TypeScript / Python'],
      ['PROMPT + DATA', 'LangChain / LlamaIndex'],
      ['LLM', 'Response generation'],
      ['APPLICATION', 'Use the response'],
    ],
  },
  {
    id: 'video-research-saas',
    label: 'SAAS / RESEARCH',
    title: 'Video research and analytics illustration',
    scene: `${rect(407, 292, 610, 358)}
      ${path('M407 337h610', ink, 2)}
      ${circle(432, 314, 4, muted, 'none')}${circle(450, 314, 4, muted, 'none')}${circle(468, 314, 4, muted, 'none')}
      ${rect(445, 373, 308, 222, pale, 'none', 8)}
      <path d="m565 424 88 60-88 60Z" fill="${blue}"/>
      ${path('M791 390h180m-180 30h140m-140 30h165', muted, 6)}
      ${rect(831, 506, 362, 202, 'white')}
      ${path('M867 666h287M867 666V545', muted, 2)}
      ${path('m884 636 60-26 52 12 55-63 49 13 39-31', blue, 6)}
      ${circle(1051, 559, 6, blue, blue)}
      ${path('M464 716h262m-262 16h182', muted, 3)}`,
    flow: [
      ['VIDEO API', 'Search / Metadata'],
      ['CACHE', 'Supabase / PostgreSQL'],
      ['WEB APP', 'Research / Export'],
      ['AI ANALYSIS', 'Gemini API'],
    ],
  },
  {
    id: 'kintone-data-analytics',
    label: 'DATA / VISUALIZATION',
    title: 'Business data synchronization and visualization illustration',
    scene: `${document(390, 298, 155, 205)}${document(432, 391, 155, 205, true)}
      ${path('M618 466h93m-18-18 18 18-18 18', muted, 3)}
      ${database(740, 342, 184, 240)}
      ${path('M958 466h87m-18-18 18 18-18 18', muted, 3)}
      ${rect(1080, 323, 190, 270)}
      ${path('M1107 551h136M1107 551V375', muted, 2)}
      ${rect(1131, 472, 23, 79, pale, 'none', 3)}
      ${rect(1169, 428, 23, 123, blue, 'none', 3)}
      ${rect(1207, 391, 23, 160, ink, 'none', 3)}
      ${path('M458 655h744', muted, 2)}
      ${text(830, 711, 'COLLECT  /  SYNC  /  VISUALIZE', 21, ink, 'text-anchor="middle" letter-spacing="2"')}`,
    flow: [
      ['kintone', 'Operational data'],
      ['DATA SYNC', 'Extract / Transform'],
      ['BIGQUERY', 'Analytical data'],
      ['LOOKER STUDIO', 'Reporting'],
    ],
  },
  {
    id: 'healthcare-api',
    label: 'API / MAINTENANCE',
    title: 'Healthcare API maintenance illustration',
    scene: `${circle(826, 444, 153, pale, blue)}
      <path d="M826 335 918 369v86c0 64-92 112-92 112s-92-48-92-112v-86Z" fill="white" stroke="${ink}" stroke-width="3"/>
      ${path('M763 444h35l18-35 24 70 17-35h33', blue, 5)}
      ${path('M461 444h165m-18-18 18 18-18 18M1024 444h165m-18-18 18 18-18 18', muted, 3)}
      ${circle(454, 444, 49)}${path('m439 423-20 21 20 21m30-42 20 21-20 21', blue, 4)}
      ${circle(1200, 444, 49)}${path('m1178 445 15 15 29-33', blue, 5)}
      ${path('M826 636v56m-39-8 39 8 39-8', muted, 2)}
      ${text(826, 746, 'INVESTIGATE  /  FIX  /  VERIFY', 21, ink, 'text-anchor="middle" letter-spacing="2"')}`,
    flow: [
      ['EXTERNAL DATA', 'API integration'],
      ['FLASK API', 'Python / Firestore'],
      ['AI SERVICE', 'Advice generation'],
      ['API RESPONSE', 'Verification / Support'],
    ],
  },
];

function shell(title, width, height, content) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">
    <title>${escape(title)}</title><rect width="${width}" height="${height}" fill="${paper}"/>
    ${content}
  </svg>\n`.replace(/[\t ]+$/gm, '');
}

for (const [index, project] of projects.entries()) {
  const thumb = shell(
    project.title,
    1600,
    1000,
    `${text(150, 155, String(index + 1).padStart(2, '0'), 24, blue, 'letter-spacing="3"')}
      ${text(215, 155, project.label, 24, ink, 'letter-spacing="2"')}
      ${path('M150 190h1300', '#dbe1e8', 2)}
      <g transform="translate(-144 -85) scale(1.18)">${project.scene}</g>
      ${text(1450, 885, 'YottaByte / CASE', 21, muted, 'text-anchor="end" letter-spacing="2"')}`,
  );
  const boxes = project.flow
    .map(([title, subtitle], i) => {
      const x = 130 + i * 355;
      const center = x + 137.5;
      return `${rect(x, 280, 275, 205, i === 1 ? blue : 'white', i === 1 ? blue : ink, 16)}
        ${text(x + 25, 322, String(i + 1).padStart(2, '0'), 20, i === 1 ? '#c8d9ff' : muted, 'letter-spacing="2"')}
        ${text(center, 385, title, title.length > 13 ? 25 : 28, i === 1 ? 'white' : ink, 'text-anchor="middle" font-weight="700"')}
        ${text(center, 430, subtitle, 19, i === 1 ? '#dce7ff' : '#586574', 'text-anchor="middle"')}
        ${i < 3 ? path(`M${x + 293} 382h43m-13-12 13 12-13 12`, muted, 3) : ''}`;
    })
    .join('');
  const flow = shell(
    `${project.title}: conceptual technology connections`,
    1600,
    760,
    `${text(130, 157, project.label, 26, ink, 'letter-spacing="2"')}
      ${path('M130 195h1340', '#dbe1e8', 2)}${boxes}
      ${text(130, 608, 'CONCEPTUAL CONNECTIONS / TECHNOLOGY & SCOPE', 21, '#657383', 'letter-spacing="2"')}`,
  );
  writeFileSync(new URL(`${project.id}.svg`, output), thumb);
  writeFileSync(new URL(`${project.id}-flow.svg`, output), flow);
}

console.log(`Created ${projects.length} thumbnails and ${projects.length} conceptual diagrams.`);
