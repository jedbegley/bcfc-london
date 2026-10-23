// Session-scoped profile loading: discard responses from earlier users or requests.
export function createAvatarSession(client, publish, schedule = (fn) => setTimeout(fn, 0)) {
  let userId = null;
  let version = 0;
  let stopped = false;
  let observedAuth = false;

  async function loadProfile() {
    if (stopped || !userId) return;
    const id = userId;
    const request = ++version;
    try {
      const { data, error } = await client.from('Players')
        .select('id, user_id, full_name, photo_url').eq('user_id', id).maybeSingle();
      if (!stopped && request === version && userId === id) {
        publish(!error && data?.user_id === id ? data : null);
      }
    } catch {
      if (!stopped && request === version) publish(null);
    }
  }

  function accept(session) {
    if (stopped) return;
    const next = session?.user?.id || null;
    if (next !== userId) {
      ++version;
      userId = next;
      publish(null);
    }
    // Keep Supabase queries outside the synchronous auth callback.
    if (next) schedule(loadProfile);
  }

  const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
    observedAuth = true;
    accept(session);
  });
  client.auth.getSession().then(({ data: { session } }) => {
    if (!observedAuth) accept(session);
  }).catch(() => { if (!observedAuth) publish(null); });

  return {
    refresh: loadProfile,
    stop() { stopped = true; ++version; subscription.unsubscribe(); },
  };
}

export function playerInitials(name) {
  const parts = (name || '').trim().split(/\s+/).filter(Boolean);
  return parts.length ? (parts[0][0] + (parts.length > 1 ? parts.at(-1)[0] : '')).toUpperCase() : 'P';
}
