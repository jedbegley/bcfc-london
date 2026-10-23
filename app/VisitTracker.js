"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import {supabase} from "./browserSupabase";


export default function VisitTracker() {
  const pathname = usePathname();

  useEffect(() => {
    async function recordVisit() {
      if (
  pathname.startsWith("/dashboard") ||
  pathname.startsWith("/login") ||
  pathname.startsWith("/register") ||
  pathname.startsWith("/reset-password")
) {
  return;
}
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
