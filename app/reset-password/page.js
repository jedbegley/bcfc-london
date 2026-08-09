"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleResetPassword() {
    if (!password) {
      setMessage("Please enter a new password.");
      return;
    }

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Updating password...");

    const { error } = await supabase.auth.updateUser({
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Password updated successfully!");

    setTimeout(() => {
      window.location.href = "/dashboard";
    }, 1000);
  }

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
          boxSizing: "border-box",
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

        <h1
          style={{
            margin: "0 0 10px",
            fontSize: "32px",
          }}
        >
          Set New Password
        </h1>

        <p
          style={{
            color: "#666",
            marginBottom: "30px",
            lineHeight: "1.5",
          }}
        >
          Choose a password for your BCFC London Player Portal account.
        </p>

        <input
          type="password"
          placeholder="New password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <input
          type="password"
          placeholder="Confirm new password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            marginBottom: "12px",
            boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleResetPassword}
          style={{
            width: "100%",
            padding: "13px",
            background: "#e31b23",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "900",
            cursor: "pointer",
          }}
        >
          Set Password
        </button>

        {message && (
          <p
            style={{
              marginTop: "15px",
              color: "#e31b23",
              fontWeight: "700",
            }}
          >
            {message}
          </p>
        )}

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
