"use client";

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from './browserSupabase';
import { createAvatarSession, playerInitials } from './avatarSession.mjs';
import styles from './SiteHeader.module.css';

const links = [['/', 'Home'], ['/news', 'News'], ['/league', 'League'], ['/fixtures', 'Fixtures'], ['/squad', 'Squad'], ['/stats', 'Stats'], ['/dashboard', 'Player Portal']];

function PlayerAvatar({ player }) {
  const [failed, setFailed] = useState(false);
  return (
    <a className={styles.avatar} href="/dashboard" aria-label={`${player.full_name || 'Your profile'} — open Player Portal`} title="Open Player Portal">
      {player.photo_url && !failed ? (
        <img src={player.photo_url} alt="" width="44" height="44" onError={() => setFailed(true)} referrerPolicy="no-referrer" />
      ) : <span aria-hidden="true">{playerInitials(player.full_name)}</span>}
    </a>
  );
}

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [player, setPlayer] = useState(null);

  useEffect(() => {
    const session = createAvatarSession(supabase, setPlayer);
    const refresh = () => { if (document.visibilityState === 'visible') session.refresh(); };
    window.addEventListener('focus', refresh);
    document.addEventListener('visibilitychange', refresh);
    const timer = setInterval(refresh, 60000);
    return () => {
      session.stop();
      clearInterval(timer);
      window.removeEventListener('focus', refresh);
      document.removeEventListener('visibilitychange', refresh);
    };
  }, []);

  return (
    <header className={styles.header}>
      <a href="/" className={styles.brand} aria-label="BCFC London — home">
        <img src="/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg" alt="" width="64" height="64" />
        <span><strong>BRISTOL CITY</strong><small>LONDON SUPPORTERS FC</small></span>
      </a>
      <div className={styles.actions}>
        <button type="button" className={styles.menu} aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} aria-controls="club-navigation" onClick={() => setOpen(!open)} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>
          <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            {open ? <path d="m6 6 12 12M6 18 18 6" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
        {player ? <PlayerAvatar key={`${player.user_id}:${player.photo_url || ''}`} player={player} /> : null}
      </div>
      <nav id="club-navigation" aria-label="Main navigation" className={`${styles.navigation} ${open ? styles.open : ''}`} onKeyDown={(event) => { if (event.key === 'Escape') setOpen(false); }}>
        {links.map(([href, label]) => <a key={href} href={href} onClick={() => setOpen(false)} aria-current={(href === '/' ? pathname === '/' : pathname?.startsWith(href)) ? 'page' : undefined} className={href === '/dashboard' ? styles.portal : undefined}>{label}</a>)}
      </nav>
    </header>
  );
}
