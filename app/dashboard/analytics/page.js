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

  return (
    <main style={{ padding: "40px" }}>
      <h1>Site Analytics</h1>
      <p>Visitor tracking is working. Dashboard coming next.</p>
      <p>Recorded page views: {visits.length}</p>
    </main>
  );
}
