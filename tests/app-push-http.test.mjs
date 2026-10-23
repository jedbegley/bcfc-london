import assert from 'node:assert/strict';
import {test} from 'node:test';
const origin=process.env.BCFC_TEST_URL||'http://127.0.0.1:3105';
test('public worker is network-only and news menu uses published stories',async()=>{
 const worker=await fetch(origin+'/sw.js');assert.equal(worker.status,200);assert.match(worker.headers.get('cache-control'),/no-store/);
 const code=await worker.text();assert(code.includes("addEventListener('push'"));assert(!/addEventListener\(['"]fetch['"]/.test(code));assert(!code.includes('caches.open'));
 const response=await fetch(origin+'/api/notification-stories');assert.equal(response.status,200);const stories=await response.json();
 assert(stories.some(s=>s.url==='/news/london-cup-draw-downing-street-friendly'));
 for(const story of stories){assert.match(story.url,/^\/news\/[a-z0-9-]+$/);assert(story.title);assert(story.body);}
 const dashboard=await fetch(origin+'/dashboard');assert.equal(dashboard.status,200);
 const html=await dashboard.text();assert(html.includes('/manifest.webmanifest'));
});
