import test from 'node:test';
import assert from 'node:assert/strict';
import { createAvatarSession, playerInitials } from '../app/avatarSession.mjs';

const tick = () => new Promise(resolve => setImmediate(resolve));
function setup() {
  let auth;
  let initial;
  let unsubscribed = false;
  const requests = [];
  const states = [];
  const client = {
    auth: {
      onAuthStateChange(fn) { auth = fn; return { data: { subscription: { unsubscribe() { unsubscribed = true; } } } }; },
      getSession() { return new Promise(resolve => { initial = resolve; }); },
    },
    from(table) {
      assert.equal(table, 'Players');
      return { select(columns) {
        assert.equal(columns, 'id, user_id, full_name, photo_url');
        return { eq(column, id) {
          assert.equal(column, 'user_id');
          return { maybeSingle() { return new Promise(resolve => requests.push({ id, resolve })); } };
        } };
      } };
    },
  };
  const controller = createAvatarSession(client, value => states.push(value), fn => setImmediate(fn));
  return { controller, requests, states, auth: id => auth(id ? 'SIGNED_IN' : 'SIGNED_OUT', id ? { user: { id } } : null), initial: id => initial({ data: { session: id ? { user: { id } } : null } }), unsubscribed: () => unsubscribed };
}
const profile = (user, photo = '/photo.jpg') => ({ user_id: user, full_name: 'Sam Sayer', photo_url: photo });

test('logged out stays empty; initials handle missing photos and single names', async () => {
  const s = setup(); s.initial(null); await tick();
  assert.equal(s.requests.length, 0);
  assert.equal(playerInitials('Sam Sayer'), 'SS');
  assert.equal(playerInitials(' Nikita '), 'N');
  assert.equal(playerInitials(null), 'P');
  s.controller.stop(); assert.equal(s.unsubscribed(), true);
});
test('account switch and logout discard old requests and stale initial session', async () => {
  const s = setup();
  s.auth('A'); await tick(); s.auth('B'); await tick();
  s.initial('A'); await tick(); await tick();
  assert.deepEqual(s.requests.map(r => r.id), ['A', 'B']);
  s.requests[1].resolve({ data: profile('B') }); await tick();
  assert.equal(s.states.at(-1).user_id, 'B');
  s.requests[0].resolve({ data: profile('A') }); await tick();
  assert.equal(s.states.at(-1).user_id, 'B');
  s.controller.refresh(); s.auth(null);
  s.requests[2].resolve({ data: profile('B') }); await tick();
  assert.equal(s.states.at(-1), null);
  s.controller.stop();
});
test('refresh picks up changed photo, rejects mismatched identity, and stops cleanly', async () => {
  const s = setup(); s.initial('A'); await tick(); await tick();
  s.requests[0].resolve({ data: profile('A') }); await tick();
  s.controller.refresh(); s.requests[1].resolve({ data: profile('A', '/new.jpg') }); await tick();
  assert.equal(s.states.at(-1).photo_url, '/new.jpg');
  s.controller.refresh(); s.requests[2].resolve({ data: profile('OTHER') }); await tick();
  assert.equal(s.states.at(-1), null);
  s.controller.refresh(); s.controller.stop();
  const count = s.states.length;
  s.requests[3].resolve({ data: profile('A') }); await tick();
  assert.equal(s.states.length, count);
});
