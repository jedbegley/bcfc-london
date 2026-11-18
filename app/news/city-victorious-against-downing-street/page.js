import ShareButtons from "../../ShareButtons";

export const metadata = {
  "title": "City victorious against Downing Street! 🔴⚪",
  "description": "Two goals from Louis and one from Smithy secure a 3–2 win against Downing Street on a memorable evening for BCFC London.",
  "alternates": {
    "canonical": "https://www.bcfclondon.co.uk/news/city-victorious-against-downing-street"
  },
  "openGraph": {
    "title": "City victorious against Downing Street! 🔴⚪",
    "description": "Two goals from Louis and one from Smithy secure a 3–2 win against Downing Street on a memorable evening for BCFC London.",
    "url": "https://www.bcfclondon.co.uk/news/city-victorious-against-downing-street",
    "siteName": "BCFC London",
    "type": "article",
    "publishedTime": "2026-11-18",
    "images": [
      {
        "url": "https://www.bcfclondon.co.uk/news/downing-street-victory-2026.jpg",
        "width": 1600,
        "height": 1200,
        "alt": "Both teams after the game holding the number 10 Bristol City shirt"
      }
    ]
  },
  "twitter": {
    "card": "summary_large_image",
    "title": "City victorious against Downing Street! 🔴⚪",
    "description": "Two goals from Louis and one from Smithy secure a 3–2 win against Downing Street on a memorable evening for BCFC London.",
    "images": [
      "https://www.bcfclondon.co.uk/news/downing-street-victory-2026.jpg"
    ]
  }
};

const paragraphs = [
  "A brilliant evening for BCFC London as we came away with a 3–2 victory against the Downing Street team, with two goals from Louis and one from Smithy securing the win.",
  "A massive thank you to the Downing Street lads for the game and for their help in getting the kit arranged. Another big thank you to Scott Murray for his support in making it happen.",
  "Both teams came together after the game for a photo holding up the number 10 Bristol City shirt, a little nod to Andy Burnham!",
  "A thoroughly enjoyable evening both on and off the pitch, and we look forward to getting an 11-a-side fixture arranged in the new year.",
  "Up the City! 🔴⚪"
];

export default function DowningStreetVictory() {
  return (
    <main style={{ fontFamily: "Arial, Helvetica, sans-serif", color: "#111", background: "#fff" }}>
      <section style={{ background: "#111", color: "#fff", padding: "60px 6%" }}>
        <p style={{ color: "#e31b23", fontSize: 12, fontWeight: 900, letterSpacing: 2 }}>
          CLUB NEWS · <time dateTime="2026-11-18">18 NOVEMBER 2026</time>
        </p>
        <h1 style={{ maxWidth: 950, fontSize: "clamp(32px, 6vw, 68px)", lineHeight: 1.1, margin: "15px 0 0", fontWeight: 900 }}>
          City victorious against Downing Street! 🔴⚪
        </h1>
      </section>
      <article style={{ width: "88%", maxWidth: 800, margin: "0 auto", padding: "40px 0 60px" }}>
        <img src="/news/downing-street-victory-2026.jpg"
          alt="Both teams after the game holding the number 10 Bristol City shirt"
          width={1600} height={1200}
          style={{ width: "100%", height: "auto", display: "block", margin: "0 0 30px", borderRadius: 12 }} />
        {paragraphs.map((paragraph, index) => (
          <p key={index} style={{ fontSize: index === 0 ? 21 : 17, fontWeight: index === 0 ? 700 : 400, lineHeight: 1.8, margin: "0 0 24px" }}>
            {paragraph}
          </p>
        ))}
        <ShareButtons title="City victorious against Downing Street! 🔴⚪" />
        <a href="/news" style={{ display: "inline-block", marginTop: 24, color: "#e31b23", fontWeight: 900 }}>← Back to News</a>
      </article>
    </main>
  );
}
