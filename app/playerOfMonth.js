// Points are saved on match_stats when the report is submitted; MOTM points
// are added to that same row when voting closes. Keep the monthly award on
// those stored values so it agrees with the public fantasy leaderboard.
export async function getPlayerOfMonth(supabase, year, month) {
  if (!Number.isInteger(year) || !Number.isInteger(month) || month < 1 || month > 12) {
    throw new Error("Invalid Player of the Month date");
  }

  const start = `${year}-${String(month).padStart(2, "0")}-01`;
  const end = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, "0")}-01`;

  const { data: matches, error: matchesError } = await supabase.from("matches")
    .select("id, match_date")
    .eq("status", "Completed")
    .gte("match_date", start)
    .lt("match_date", end);
  if (matchesError) throw matchesError;
  if (!matches?.length) return { ranking: [], winners: [] };

  const { data: stats, error: statsError } = await supabase.from("match_stats")
    .select("player_id, match_id, fantasy_points, goals, assists, motm")
    .in("match_id", matches.map(({ id }) => id));
  if (statsError) throw statsError;
  if (!stats?.length) return { ranking: [], winners: [] };

  const byPlayer = new Map();
  for (const row of stats) {
    const current = byPlayer.get(row.player_id) || {
      playerId: row.player_id, points: 0, goals: 0, assists: 0,
      goalInvolvements: 0, motmAwards: 0, appearances: 0,
    };
    current.points += Number(row.fantasy_points || 0);
    current.goals += Number(row.goals || 0);
    current.assists += Number(row.assists || 0);
    current.goalInvolvements = current.goals + current.assists;
    current.motmAwards += row.motm ? 1 : 0;
    current.appearances += 1;
    byPlayer.set(row.player_id, current);
  }

  const ranking = [...byPlayer.values()].sort((a, b) =>
    b.points - a.points ||
    b.goalInvolvements - a.goalInvolvements ||
    b.motmAwards - a.motmAwards ||
    a.playerId - b.playerId
  );
  const first = ranking[0];
  const winners = ranking.filter((player) =>
    player.points === first.points &&
    player.goalInvolvements === first.goalInvolvements &&
    player.motmAwards === first.motmAwards
  );
  return { ranking, winners };
}
