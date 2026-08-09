"use client";

import { useState } from "react";

export default function LoginPage() {
  const [mode, setMode] = useState("login");

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#151515",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "30px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          background: "#fff",
          width: "100%",
          maxWidth: "480px",
          borderRadius: "14px",
          padding: "40px",
        }}
      >
        <div
          style={{
            color: "#e31b23",
            fontSize: "13px",
            fontWeight: "900",
            letterSpacing: "2px",
            marginBottom: "8px",
          }}
        >
          BCFC LONDON
        </div>

        <h1 style={{ margin: "0 0 10px", fontSize: "32px" }}>
          Player Portal
        </h1>

        <p style={{ color: "#666", marginBottom: "30px" }}>
          {mode === "login"
            ? "Sign in to manage your availability and match details."
            : "Register to join the Bristol City London Supporters FC squad."}
        </p>

        <button
          onClick={() => setMode("login")}
          style={{ marginRight: "10px", padding: "10px 18px" }}
        >
          Login
        </button>

        <button
          onClick={() => setMode("register")}
          style={{ padding: "10px 18px" }}
        >
          Register
        </button>

        <div style={{ marginTop: "30px" }}>
          {mode === "login" ? (
            <p>Login form coming next...</p>
          ) : (
            <p>Registration form coming next...</p>
          )}
        </div>

        <a
          href="/"
          style={{
            display: "block",
            marginTop: "30px",
            color: "#e31b23",
            fontWeight: "700",
          }}
        >
          ← Back to BCFC London
        </a>
      </div>
    </main>
  );
}
