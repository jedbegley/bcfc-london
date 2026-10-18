import InstallButton from "./InstallButton";
import styles from "./install.module.css";

export const metadata = {
  title: "Install BCFC London",
  description: "Add BCFC London to your iPhone or Android home screen.",
};

export default function InstallPage() {
  return <main className={styles.page}>
    <article className={styles.card}>
      <img src="/icons/bcfc-192.png" width="96" height="96" alt="BCFC London badge" />
      <p className={styles.eyebrow}>YOUR CLUB. ONE TAP AWAY.</p>
      <h1>BCFC London</h1>
      <p className={styles.intro}>Fixtures, player availability and club news, straight from your home screen.</p>
      <InstallButton />
      <section aria-labelledby="iphone-install">
        <h2 id="iphone-install">On iPhone</h2>
        <ol>
          <li>Open <a href="https://www.bcfclondon.co.uk/install">bcfclondon.co.uk</a> in Safari.</li>
          <li>Tap <strong>Share</strong>, then <strong>Add to Home Screen</strong>.</li>
          <li>Keep the name <strong>BCFC London</strong>. If shown, turn on <strong>Open as Web App</strong>, then tap <strong>Add</strong>.</li>
        </ol>
      </section>
      <section aria-labelledby="android-install">
        <h2 id="android-install">On Android</h2>
        <ol>
          <li>Open this website in Chrome.</li>
          <li>Use the install button above when available, or open Chrome’s <strong>⋮ menu</strong>.</li>
          <li>Choose <strong>Install app</strong> or <strong>Add to Home screen</strong>, then confirm installation.</li>
        </ol>
      </section>
      <p className={styles.note}>Free to install. No App Store download. An internet connection is required for live fixtures and availability. You may need to sign in again after installing.</p>
      <p className={styles.note}>Your existing email alerts continue automatically. Installing the app does not turn on push notifications.</p>
      <a className={styles.home} href="/">← Back to the club website</a>
    </article>
  </main>;
}
