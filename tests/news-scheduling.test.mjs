import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {approvalISO,londonInput} from '../app/dashboard/news/schedule.mjs';
test('approval scheduling uses UK time, independent of browser timezone',()=>{
 assert.equal(approvalISO('2026-10-31T10:00'),'2026-10-31T10:00:00.000Z');
 assert.equal(approvalISO('2026-07-01T10:00'),'2026-07-01T09:00:00.000Z');
 assert.equal(londonInput('2026-07-01T09:00:00Z'),'2026-07-01T10:00');
 assert.equal(approvalISO(''),null);
 assert.throws(()=>approvalISO('2026-03-29T01:30'),/clock-change/);
 assert.throws(()=>approvalISO('2026-10-25T01:30'),/clock-change/);
});
test('private preview push links are allowed but foreign origins and unexpected paths are blocked',()=>{
 const source=readFileSync(new URL('../public/sw.js',import.meta.url),'utf8');
 const context={URL,self:{location:{origin:'https://www.bcfclondon.co.uk'},addEventListener:()=>{}}};
 vm.createContext(context);vm.runInContext(source,context);
 assert.equal(context.safePath('/dashboard/news/1'),'/dashboard/news/1');
 for(const path of ['https://evil.example/dashboard/news/1','//evil.example/news/a','/dashboard/news/abc','/dashboard/news/1/secret'])assert.equal(context.safePath(path),'/dashboard');
});
