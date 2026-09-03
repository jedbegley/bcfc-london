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
    <ShareButtons title={document.title.replace(" | BCFC London", "")} />
    mountPoint
  );
}
