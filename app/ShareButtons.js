"use client";

import { useState } from "react";

export default function ShareButtons({ title = "BCFC London" }) {
  const [copied, setCopied] = useState(false);

  const getUrl = () => window.location.href;

  const shareNative = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          url: getUrl(),
        });
      } catch (error) {
        // User closed the share menu
      }
    } else {
      await copyLink();
    }
  };

  const shareWhatsApp = () => {
    const text = `${title} ${getUrl()}`;
    window.open(
      `https://wa.me/?text=${encodeURIComponent(text)}`,
      "_blank"
    );
  };

  const shareX = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        title
      )}&url=${encodeURIComponent(getUrl())}`,
      "_blank"
    );
  };

  const copyLink = async () => {
    await navigator.clipboard.writeText(getUrl());
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };

  return (
    <div
      style={{
        marginTop: "30px",
        paddingTop: "20px",
        borderTop: "1px solid #ddd",
      }}
    >
      <strong style={{ display: "block", marginBottom: "12px" }}>
        Share
      </strong>

      <div
        style={{
          display: "flex",
          gap: "10px",
          flexWrap: "wrap",
        }}
      >
        <button onClick={shareNative}>Share</button>

        <button onClick={shareWhatsApp}>
          WhatsApp
        </button>

        <button onClick={shareX}>
          X
        </button>

        <button onClick={shareNative}>
          Instagram
        </button>

        <button onClick={copyLink}>
          {copied ? "Copied ✓" : "Copy Link"}
        </button>
      </div>
    </div>
  );
}
