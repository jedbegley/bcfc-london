import { createClient } from "@supabase/supabase-js";

// One list supplies the homepage feature and News archive. Editorial copy and
// publication dates live here; player photos remain in public_squad.
const articles = [
  {
    date: "2026-10-09", displayDate: "9 October 2026", label: "CLUB NEWS",
    category: "LONDON CUP", title: "Bristol City Progress in London Cup Following Walkover",
    summary: "City progress to the next round of the London Sunday Junior Shield after Highams Park Rangers First withdrew due to an Essex Cup scheduling clash.",
    link: "/news/london-cup-walkover-2026",
    imageAlt: "BCFC London club crest", button: "Read Story →",
  },
  {
    date: "2026-09-29", displayDate: "29 September 2026", label: "CLUB NEWS",
    category: "PLAYER OF THE MONTH", title: "Smithy Wins September Player of the Month",
    summary: "Jack Smith is our first Player of the Month of 2026/27 after a 16-point September, three assists and a Man of the Match award.",
    link: "/news/september-player-of-the-month-2026", imagePlayerId: 20,
    imageAlt: "Jack Smith, September Player of the Month",
    button: "Read Story →",
  },
  {
    date: "2026-09-15", displayDate: "15 September 2026", label: "CLUB NEWS",
    category: "CUP DRAWS", title: "City Handed Two Home Ties in Opening Cup Draws",
    summary: "City will face Higham Park Rangers and Larkhall City at home after the first two cup draws of the season, with another unusual fixture also on the horizon...",
    link: "/news/cup-draws-2026", image: "/london-fa.png",
    imageAlt: "London FA", button: "Read Story →",
  },
  {
    date: "2026-09-13", displayDate: "13 September 2026", label: "MATCH REPORT",
    category: "MATCH REPORT", title: "Bristol City 2–1 Barnes Stormers",
    summary: "City opened their League Eight campaign with a 2–1 victory at Clapham Common.",
    link: "/fixtures/3", button: "Read Match Report →",
  },
  {
    date: "2026-09-13", displayDate: "13 September 2026", label: "MATCH PREVIEW",
    category: "MATCH PREVIEW", title: "City Begin League Eight Campaign Against Barnes Stormers",
    summary: "City began the 2026/27 league season at home to familiar opponents Barnes Stormers.",
    link: "/news/barnes-stormers-preview", button: "Read Match Preview →",
  },
  {
    date: "2026-08-16", displayDate: "16 August 2026", label: "MATCH REPORT",
    category: "MATCH REPORT", title: "Shepherd's Tuesday 2–2 Bristol City",
    summary: "City rounded off an unbeaten pre-season with a 2–2 draw at Burgess Park.",
    link: "/news/shepherds-tuesday-2-2-bristol-city", button: "Read Match Report →",
  },
  {
    date: "2026-08-09", displayDate: "9 August 2026", label: "MATCH REPORT",
    category: "MATCH REPORT", title: "Aberdeen 0–3 Bristol City",
    summary: "City made the perfect start to pre-season with a convincing 3–0 victory at Raynes Park.",
    link: "/news/aberdeen-0-3-bristol-city", button: "Read Match Report →",
  },
  {
    date: "2026-08-01", displayDate: "August 2026", label: "CLUB NEWS",
    category: "CLUB NEWS", title: "BCFC London call on former player Andy Burnham for a little help",
    summary: "Our search for support with a new kit took an unexpected turn when we called on one of the club's most high-profile former players.",
    link: "/news/andy-burnham", button: "Read Story →",
  },
];

export async function getNewsArticles() {
  const sorted = [...articles].sort((a, b) => b.date.localeCompare(a.date));
  const playerIds = [...new Set(sorted.map(({ imagePlayerId }) => imagePlayerId).filter(Boolean))];
  if (!playerIds.length) return sorted;

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
  const { data: players, error } = await supabase.from("public_squad")
    .select("id, photo_url").in("id", playerIds);
  if (error) console.error("Error loading news player photos:", error);
  const photos = new Map((players || []).map(({ id, photo_url }) => [Number(id), photo_url]));
  return sorted.map((article) => ({
    ...article,
    image: article.imagePlayerId ? photos.get(article.imagePlayerId) || null : article.image || null,
  }));
}

