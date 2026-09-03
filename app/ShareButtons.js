"use client";

import { useState } from "react";

const buttonStyle = {
  background: "#111",
  color: "#fff",
  border: "none",
  borderRadius: "6px",
  padding: "11px 16px",
  fontSize: "13px",
  fontWeight: "700",
  cursor: "pointer",
};
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
    <div
      style={{
        fontSize: "12px",
        fontWeight: "800",
        letterSpacing: "0.16em",
        textTransform: "uppercase",
        marginBottom: "14px",
      }}
    >
      Share this story
    </div>

    <div
      style={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
      }}
    >
      <button style={buttonStyle} onClick={shareNative}>
        Share
      </button>

      <button style={buttonStyle} onClick={shareWhatsApp}>
        WhatsApp
      </button>

      <button style={buttonStyle} onClick={shareX}>
        X
      </button>

      <button style={buttonStyle} onClick={shareNative}>
        Instagram
      </button>

      <button style={buttonStyle} onClick={copyLink}>
        {copied ? "Copied ✓" : "Copy Link"}
      </button>
    </div>
  </div>
);
}
