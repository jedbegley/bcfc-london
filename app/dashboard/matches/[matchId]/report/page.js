"use client";

import { useParams } from "next/navigation";

export default function MatchReportPage() {
  const params = useParams();
  const matchId = params.matchId;

  return (
    <main style={{ padding: "40px" }}>
      <h1>Manager Match Report</h1>
      <p>Match ID: {matchId}</p>
    </main>
  );
}
