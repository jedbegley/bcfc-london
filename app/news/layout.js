"use client";

import { usePathname } from "next/navigation";
import ShareButtons from "../ShareButtons";

export default function NewsLayout({ children }) {
  const pathname = usePathname();
  const isArticle = pathname !== "/news";

  return (
    <>
      {children}

      {isArticle && (
        <div
          style={{
            maxWidth: "900px",
            margin: "0 auto 40px",
            padding: "0 20px",
          }}
        >
          <ShareButtons />
        </div>
      )}
    </>
  );
}
