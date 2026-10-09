export const clubBadge = "/374fadec-093f-4e7e-9f54-01c06a034caa.jpeg";

export function londonToday() {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London", year: "numeric", month: "2-digit", day: "2-digit",
    }).formatToParts(new Date()).map(({ type, value }) => [type, value])
  );
  return `${parts.year}-${parts.month}-${parts.day}`;
}

export function formatMatchDate(value) {
  if (!value) return "Date to be confirmed";
  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "long", day: "numeric", month: "long", year: "numeric",
    timeZone: "Europe/London",
  }).format(new Date(Date.UTC(year, month - 1, day, 12))).replace(/^([^,]+), /, "$1 ");
}

export function formatMatchTime(value) {
  return value ? value.slice(0, 5) : null;
}

export function displayCompetition(value) {
  return value?.replace(
    /^Southern Sunday League (?=.+$)/i,
    "Southern Sunday Football League — League "
  ).toUpperCase() || "";
}

export function opponentInitials(name) {
  const words = (name || "").trim().split(/\s+/).filter(Boolean);
  return words.length > 1
    ? words.slice(0, 2).map((word) => word[0]).join("").toUpperCase()
    : words[0]?.slice(0, 2).toUpperCase() || "?";
}

export function isWalkover(match) {
  return match?.result_type === "walkover_win" || match?.result_type === "walkover_loss";
}

export function walkoverOutcome(match) {
  return match?.result_type === "walkover_loss"
    ? "Opposition awarded walkover — Bristol City do not progress"
    : "Bristol City awarded walkover — through to next round";
}

