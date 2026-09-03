"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    async function recordVisit() {
      let visitorId = localStorage.getItem("bcfc_visitor_id");

      if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("bcfc_visitor_id", visitorId);
      }

      await supabase.from("page_visits").insert({
        path: pathname,
        visitor_id: visitorId,
      });
    }

    recordVisit();
  }, [pathname]);

  return null;
}
