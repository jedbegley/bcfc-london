import styles from "./join.module.css";

const url = "https://www.bcfclondon.co.uk/join";
const socialImage = "https://www.bcfclondon.co.uk/join/squad-social.jpg";
const title = "Join BCFC London | Sunday League Football in London";
const description = "Looking for an 11-a-side Sunday League team? Competitive football, great socials and home games at Clapham Common. Get to know BCFC London.";

export const metadata = {
  title, description,
  alternates: { canonical: url },
  openGraph: { title, description, url, type: "website", images: [{ url: socialImage, width: 1200, height: 630, alt: "BCFC London squad at Clapham Common" }] },
  twitter: { card: "summary_large_image", title, description, images: [socialImage] },
};

const destinations = [
  { title: "Meet the squad", text: "See who’s representing City this season.", href: "/squad", icon: "01" },
  { title: "Fixtures & results", text: "Follow our league and cup campaigns.", href: "/fixtures", icon: "02" },
  { title: "Match reports & news", text: "The highs, the lows and everything in between.", href: "/news", icon: "03" },
  { title: "Fantasy football", text: "There’s plenty of competition within the squad too.", href: "/stats", icon: "04" },
];

export default function JoinPage() {
  return <main className={styles.page}>
    <header className={styles.hero}>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>BRISTOL CITY LONDON SUPPORTERS FC · JOIN THE SQUAD</p>
        <h1>Looking for an 11-a-Side Sunday League Team in London?</h1>
        <p className={styles.lead}>Competitive football, good lads, questionable fines and a decent excuse to spend your Sunday mornings on Clapham Common. Welcome to BCFC London.</p>
        <a className={styles.button} href="#get-in-touch">Interested in Joining? <span aria-hidden="true">↗</span></a>
      </div>
      <figure className={styles.heroPhoto}>
        <img src="/join/squad-2026.jpg" alt="BCFC London’s squad together at Clapham Common" width="1536" height="1152" />
        <figcaption>Sunday mornings. Clapham Common. Up the City.</figcaption>
      </figure>
    </header>

    <article className={styles.article}>
      <p className={styles.intro}>If you’re looking to get back into football, find a new team in London or simply meet a decent group of lads, Bristol City London Supporters FC could be just what you’re after.</p>
      <p>We’ve been playing Sunday League football in London for around six decades, and while the faces have changed over the years, the idea remains pretty much the same: enjoy our football, compete on the pitch and have a laugh off it.</p>

      <section>
        <p className={styles.sectionTag}>THE FOOTBALL</p>
        <h2>Football first, but not too seriously</h2>
        <p>We play competitive 11-a-side football in the Southern Sunday Football League, with our home games taking place on Clapham Common.</p>
        <p>We want to win, of course, and we take our football seriously enough to give it a proper go. But we’re certainly not pretending we’re playing in the Premier League.</p>
        <p>It’s competitive Sunday League football with a good atmosphere, a bit of banter and a group of lads who enjoy turning up every weekend.</p>
        <p>And despite the name, you absolutely don’t have to support Bristol City to play for us.</p>
        <p>Our squad includes supporters of Derby County, Birmingham City, Chelsea, Arsenal and plenty of others. There might be some questionable football allegiances in the dressing room, but everyone’s welcome.</p>
      </section>

      <section>
        <p className={styles.sectionTag}>THE HISTORY</p>
        <h2>A bit of history, and a few trophies along the way</h2>
        <p>We’ve been around for approximately 60 years, and there’s been plenty to celebrate during that time.</p>
        <p>In recent seasons, we’ve enjoyed both league and cup success, including a memorable cup triumph literally outside West Ham’s stadium.</p>
        <figure className={styles.historyPhoto}>
          <img src="/join/cup-winners-west-ham.jpg" alt="BCFC London’s cup-winning team outside West Ham’s stadium" width="1152" height="1536" />
          <figcaption>A cup win outside West Ham’s stadium.</figcaption>
        </figure>
        <h3>We’ve even managed to make the news!</h3>
        <p>Our club has attracted attention beyond the Sunday League circuit, with connections to Bristol City FC and an upcoming friendly against a Downing Street XI.</p>
        <p>Not quite the Champions League, but we’ll take it.</p>
        <div className={styles.readMore}>
          <a href="https://www.bristolpost.co.uk/news/bristol-news/bristol-city-fans-team-gets-11196360" target="_blank" rel="noopener noreferrer">Read our Bristol Post feature <span aria-hidden="true">↗</span></a>
          <a href="/news/from-number-10-to-number-10">Bristol City FC & Downing Street <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section>
        <p className={styles.sectionTag}>OFF THE PITCH</p>
        <h2>It’s not just about the football</h2>
        <p>One of the best things about BCFC London is the social side.</p>
        <p>After home games, you’ll usually find us heading to the pub for a few drinks, a post-match debrief and the occasional argument about who really deserved Man of the Match.</p>
        <p>And if you don’t make it to the pub? Well, there might just be a fine waiting for you.</p>
        <p>Don’t worry, it’s all in good fun. The fines go towards our end-of-season celebrations, so at least somebody benefits from your questionable excuses.</p>
        <p>We also organise regular socials throughout the season. Whether you’ve just moved to London or have been here for years, it’s a great way to meet people.</p>
      </section>

      <section>
        <p className={styles.sectionTag}>EXPLORE THE CLUB</p>
        <h2>Get to know the team</h2>
        <p>We’re not just a group of lads who turn up on Sundays. We’ve got our own website where you can follow the season.</p>
        <div className={styles.linkGrid}>{destinations.map(item => <a className={styles.linkCard} href={item.href} key={item.href}><span className={styles.linkNumber}>{item.icon}</span><strong>{item.title}</strong><span>{item.text}</span><span className={styles.linkArrow} aria-hidden="true">↗</span></a>)}</div>
      </section>
    </article>

    <section id="get-in-touch" className={styles.contact}>
      <div className={styles.contactInner}>
        <p className={styles.sectionTag}>YOUR NEXT SUNDAY STARTS HERE</p>
        <h2>Fancy joining us?</h2>
        <p>We’re always happy to hear from players interested in getting involved.</p>
        <p>Whether you’ve played regularly for years, recently moved to London or are looking for a new Sunday League side, get in touch and introduce yourself.</p>
        <div className={styles.facts}>
          <div><span>HOME GROUND</span><strong>Clapham Common, South London</strong></div>
          <div><span>MATCHDAYS</span><strong>Sunday mornings, usually 10:30am</strong></div>
          <div><span>FOOTBALL</span><strong>Competitive 11-a-side Sunday League</strong></div>
          <div><span>SOCIALS</span><strong>Strongly encouraged. Fines may apply. 🍺</strong></div>
        </div>
        <p className={styles.contactPrompt}>Tell us your name, preferred position and a little about your football experience.</p>
        <div className={styles.contactActions}>
          <a className={styles.button} href="mailto:bcfclondon@hotmail.com?subject=Joining%20BCFC%20London">Get in Touch <span aria-hidden="true">↗</span></a>
          <a href="https://www.instagram.com/bcfc_fans_fc/" target="_blank" rel="noopener noreferrer">Instagram ↗</a>
          <a href="https://x.com/bcfc_fans_fc" target="_blank" rel="noopener noreferrer">X ↗</a>
        </div>
        <p className={styles.email}>Or email <a href="mailto:bcfclondon@hotmail.com">bcfclondon@hotmail.com</a></p>
        <p className={styles.signoff}>Up the City! 🔴⚪</p>
      </div>
    </section>
  </main>;
}
