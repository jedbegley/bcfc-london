"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { createPortal } from "react-dom";
import ShareButtons from "./ShareButtons";

export default function NewsShareBar() {
  const pathname = usePathname();
  const [mountPoint, setMountPoint] = useState(null);

  useEffect(() => {
    if (pathname === "/news") {
      setMountPoint(null);
      return;
    }

    // Preserve sharing on the pages that had a footer before consolidation.
    const sharePages = [
      "/", "/fixtures", "/league",
      "/news/aberdeen-0-3-bristol-city", "/news/andy-burnham",
      "/news/cup-draws-2026", "/news/london-cup-walkover-2026",
      "/news/london-cup-draw-downing-street-friendly",
      "/news/scott-murray-new-kit", "/news/september-player-of-the-month-2026",
      "/news/shepherds-tuesday-2-2-bristol-city",
    ];
    if (!sharePages.includes(pathname) && !/^\/fixtures\/[^/]+$/.test(pathname)) {
      setMountPoint(null);
      return;
    }

    const footer = document.querySelector("footer");

    if (!footer) return;

    const shareContainer = document.createElement("div");

    shareContainer.style.maxWidth = "1080px";
    shareContainer.style.margin = "0 auto";
    shareContainer.style.padding = "0 40px 40px";

    footer.parentNode.insertBefore(shareContainer, footer);

    setMountPoint(shareContainer);

    return () => {
      shareContainer.remove();
    };
  }, [pathname]);

  if (!mountPoint) return null;

  return createPortal(
    <ShareButtons title={document.title.replace(" | BCFC London", "")} />,
    mountPoint
  );
}
