import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import vm from 'node:vm';
import { createAvatarSession, playerInitials } from '../app/avatarSession.mjs';
const require = createRequire(import.meta.url);
const React = require('react');
const { createRoot } = require('react-dom/client');
const { transformSync } = require('next/dist/build/swc');
const domModule = process.env.BCFC_JSDOM_MODULE;

test('header renders only own avatar, refreshes photos, handles errors, logout and navigation', { skip: !domModule }, async () => {
  const { JSDOM } = require(domModule);
  const dom = new JSDOM('<div id="root"></div>', { url: 'https://www.bcfclondon.co.uk', pretendToBeVisual: true });
  global.window = dom.window;
  global.document = dom.window.document;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  let callback;
  let profile = null;
  const fake = {
    auth: { onAuthStateChange(fn) { callback = fn; return { data: { subscription: { unsubscribe() {} } } }; }, getSession: async () => ({ data: { session: null } }) },
    from() { return { select() { return { eq() { return { maybeSingle: async () => ({ data: profile }) }; } }; } }; },
  };
  let source = await fs.readFile(new URL('../app/SiteHeader.js', import.meta.url), 'utf8');
  source = source.replace(/import \{ usePathname \}[^;]+;/, 'const usePathname = () => "/squad";')
    .replace(/import \{ supabase \}[^;]+;/, 'const supabase = injected.client;')
    .replace(/import \{ createAvatarSession, playerInitials \}[^;]+;/, 'const {createAvatarSession, playerInitials} = injected;')
    .replace(/import styles[^;]+;/, 'const styles = new Proxy({}, {get: (_, key) => key});');
  const { code } = transformSync(source, { filename: 'SiteHeader.jsx', jsc: { parser: { syntax: 'ecmascript', jsx: true }, transform: { react: { runtime: 'automatic' } } }, module: { type: 'commonjs' } });
  const module = { exports: {} };
  vm.runInNewContext(code, { require, module, exports: module.exports, injected: {client:fake, createAvatarSession, playerInitials}, setInterval, clearInterval, window: dom.window, document: dom.window.document });
  const root = createRoot(document.getElementById('root'));
  const settle = () => new Promise(r => setTimeout(r, 15));
  const avatar = () => document.querySelector('a.avatar');
  try {
    await React.act(async () => { root.render(React.createElement(module.exports.default)); await settle(); });
    assert.equal(avatar(), null);
    profile = { id: 1, user_id: 'A', full_name: 'Sam Sayer', photo_url: '/first.jpg' };
    await React.act(async () => { callback('SIGNED_IN', {user:{id:'A'}}); await settle(); });
    assert.equal(avatar().getAttribute('href'), '/dashboard');
    assert.equal(avatar().querySelector('img').getAttribute('src'), '/first.jpg');
    await React.act(async () => { avatar().querySelector('img').dispatchEvent(new dom.window.Event('error')); });
    assert.equal(avatar().textContent, 'SS');
    profile = {...profile, photo_url: '/second.jpg'};
    await React.act(async () => { window.dispatchEvent(new dom.window.Event('focus')); await settle(); });
    assert.equal(avatar().querySelector('img').getAttribute('src'), '/second.jpg');
    await React.act(async () => { callback('SIGNED_OUT', null); });
    assert.equal(avatar(), null);
    profile = { id: 2, user_id: 'B', full_name: 'Witse Konings', photo_url: null };
    await React.act(async () => { callback('SIGNED_IN', {user:{id:'B'}}); await settle(); });
    assert.equal(avatar().textContent, 'WK');
    assert.equal(avatar().querySelector('img'), null);
    const button = document.querySelector('button');
    await React.act(async () => { button.click(); });
    assert.equal(button.getAttribute('aria-expanded'), 'true');
    assert.equal(document.querySelectorAll('nav a').length, 7);
    await React.act(async () => { button.dispatchEvent(new dom.window.KeyboardEvent('keydown', {key:'Escape', bubbles:true})); });
    assert.equal(button.getAttribute('aria-expanded'), 'false');
  } finally {
    await React.act(async () => root.unmount()); dom.window.close();
    delete global.window; delete global.document; delete global.IS_REACT_ACT_ENVIRONMENT;
  }
});
