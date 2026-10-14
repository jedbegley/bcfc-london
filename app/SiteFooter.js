import styles from "./SiteFooter.module.css";

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.club}>
          <strong>Bristol City London Supporters FC</strong>
          <p>Proudly representing the Robins in London.</p>
          <a className={styles.email} href="mailto:bcfclondon@hotmail.com">bcfclondon@hotmail.com</a>
        </div>
        <nav className={styles.social} aria-label="Club social media">
          <a href="https://www.instagram.com/bcfc_fans_fc/" target="_blank" rel="noopener noreferrer" aria-label="BCFC London on Instagram (opens in a new tab)">
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true" focusable="false">
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
            </svg>
          </a>
          <a href="https://x.com/bcfc_fans_fc" target="_blank" rel="noopener noreferrer" aria-label="BCFC London on X (Twitter) (opens in a new tab)">
            <svg viewBox="0 0 24 24" width="21" height="21" fill="currentColor" aria-hidden="true" focusable="false">
              <path d="M18.9 2H22l-6.8 7.8L23.2 22h-6.3l-4.9-7.4L5.5 22H2.3l8.2-9.4L2.8 2h6.5l4.5 6.8L18.9 2ZM17.8 20h1.7L8.3 4H6.5l11.3 16Z" />
            </svg>
          </a>
        </nav>
        <div className={styles.sponsor}>
          <span>PROUDLY SPONSORED BY</span>
          <img src="/IMG_1146.jpeg" alt="DUZZ Sports" width="120" height="45" />
        </div>
      </div>
      <p className={styles.copyright}>© {new Date().getFullYear()} Bristol City London Supporters FC</p>
    </footer>
  );
}
