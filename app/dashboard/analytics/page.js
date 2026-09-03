"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function AnalyticsPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [visits, setVisits] = useState([]);

  useEffect(() => {
    async function loadAnalytics() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push("/login");
        return;
      }

      const { data: player } = await supabase
        .from("Players")
        .select("is_admin")
        .eq("user_id", user.id)
        .single();

      if (!player?.is_admin) {
        router.push("/dashboard");
        return;
      }

      const { data, error } = await supabase
        .from("page_visits")
        .select("path, visitor_id, created_at")
        .order("created_at", { ascending: false });

      if (!error) {
        setVisits(data || []);
      }

      setLoading(false);
    }

    loadAnalytics();
  }, [router]);

 if (loading) {
  return <main style={{ padding: "40px" }}>Loading analytics...</main>;
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const sevenDaysAgo = new Date();
sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

const visitsToday = visits.filter(
  (visit) => new Date(visit.created_at) >= today
).length;

const visitsLast7Days = visits.filter(
  (visit) => new Date(visit.created_at) >= sevenDaysAgo
).length;

const uniqueVisitors = new Set(
  visits.map((visit) => visit.visitor_id)
).size;

const pageCounts = visits.reduce((acc, visit) => {
  acc[visit.path] = (acc[visit.path] || 0) + 1;
  return acc;
}, {});

const mostViewedPages = Object.entries(pageCounts)
  .sort((a, b) => b[1] - a[1])
  .slice(0, 10);

return (
  <main style={{ padding: "40px" }}>
    <h1>Site Analytics</h1>

    <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", marginTop: "30px" }}>
      <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px", minWidth: "180px" }}>
        <strong>Total Page Views</strong>
        <div style={{ fontSize: "32px", marginTop: "10px" }}>{visits.length}</div>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px", minWidth: "180px" }}>
        <strong>Unique Visitors</strong>
        <div style={{ fontSize: "32px", marginTop: "10px" }}>{uniqueVisitors}</div>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px", minWidth: "180px" }}>
        <strong>Visits Today</strong>
        <div style={{ fontSize: "32px", marginTop: "10px" }}>{visitsToday}</div>
      </div>

      <div style={{ border: "1px solid #ddd", borderRadius: "12px", padding: "20px", minWidth: "180px" }}>
        <strong>Last 7 Days</strong>
        <div style={{ fontSize: "32px", marginTop: "10px" }}>{visitsLast7Days}</div>
      </div>
    </div>
  <section style={{ marginTop: "40px", maxWidth: "850px" }}>
  <h2>Most Viewed Pages</h2>

  {mostViewedPages.map(([path, count]) => (
    <div
      key={path}
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "12px 0",
        borderBottom: "1px solid #ddd",
      }}
    >
      <span>{path === "/" ? "Homepage" : path}</span>
      <strong>{count} views</strong>
    </div>
  ))}
</section>
  </main>
);
}
