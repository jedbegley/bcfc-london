import assert from 'node:assert/strict';
import { test } from 'node:test';
const origin = process.env.BCFC_TEST_URL || 'http://127.0.0.1:3102';
const path = '/news/london-cup-draw-downing-street-friendly';
const title = 'London Cup Draw Confirmed as BCFC London Prepare for Downing Street Friendly';
const description = 'BCFC London face unbeaten League Five leaders Kew Antigua in the London Cup, with a special friendly against a Downing Street XI also confirmed.';
const image = 'https://www.bcfclondon.co.uk/news/clapham-common-action-social.jpg';

test('individual news metadata and featured photo are publicly served to social crawlers', async () => {
  const response = await fetch(origin + path, {headers:{'User-Agent':'facebookexternalhit/1.1'}});
  assert.equal(response.status,200);
  const html = await response.text();
  const head = html.split('</head>')[0];
  const meta = new Map([...head.matchAll(/<meta (?:property|name)="([^"]+)" content="([^"]*)"/g)].map(m=>[m[1],m[2]]));
  for (const key of ['og:title','twitter:title']) assert.equal(meta.get(key),title);
  for (const key of ['og:description','twitter:description']) assert.equal(meta.get(key),description);
  for (const key of ['og:image','twitter:image']) assert.equal(meta.get(key),image);
  assert.equal(meta.get('og:url'),'https://www.bcfclondon.co.uk'+path);
  assert.equal(meta.get('og:type'),'article');
  assert.equal(meta.get('twitter:card'),'summary_large_image');
  assert.equal(meta.get('og:image:width'),'1200');
  assert.equal(meta.get('og:image:height'),'630');
  assert(head.includes(`rel="canonical" href="https://www.bcfclondon.co.uk${path}"`));
  assert.match(html,/clapham-common-action/);
  assert.match(html,/href="\/news\/from-number-10-to-number-10"/);
  const asset = await fetch(origin + new URL(image).pathname);
  assert.equal(asset.status,200);
  assert.match(asset.headers.get('content-type'),/image\/jpeg/);
  const bytes = Buffer.from(await asset.arrayBuffer());
  const sharp = (await import('sharp')).default;
  const info = await sharp(bytes).metadata();
  assert.equal(info.width,1200); assert.equal(info.height,630);
});

test('home and news listing feature the article and action photo', async () => {
  for (const route of ['/','/news']) {
    const response=await fetch(origin+route);
    assert.equal(response.status,200);
    const html=await response.text();
    assert(html.includes(title),route);
    assert(html.includes(`href="${path}"`),route);
    assert(html.includes('/news/clapham-common-action.jpg'),route);
  }
});

if (process.env.BCFC_FIXTURE_IDS) test('both upcoming previews are ordered and have correct labels',async()=>{
  const [friendly,cup]=process.env.BCFC_FIXTURE_IDS.split(',');
  const html=await (await fetch(origin+'/fixtures')).text();
  assert(html.indexOf(`/fixtures/${friendly}`)<html.indexOf(`/fixtures/${cup}`));
  for(const [id,opponent,date,time,venue,type] of [[friendly,'Downing Street XI','Wednesday 18 November 2026','19:00','Chiswick Sports Ground','FRIENDLY'],[cup,'Kew Antigua','Sunday 22 November 2026','10:30','Clapham Common','LONDON CUP – SECOND ROUND']]){
    const response=await fetch(origin+`/fixtures/${id}`);
    assert.equal(response.status,200);
    const page=await response.text();
    for(const value of [opponent,date,time,venue,type])assert(page.includes(value),value);
  }
  const home=await (await fetch(origin+'/')).text();
  assert(home.includes(`/fixtures/${friendly}`));
});
