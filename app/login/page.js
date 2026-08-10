"use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export default function LoginPage() {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [fullName, setFullName] = useState("");
const [dateOfBirth, setDateOfBirth] = useState("");
const [mobile, setMobile] = useState("");
const [postcode, setPostcode] = useState("");
const [position, setPosition] = useState("");
  
  console.log("SUPABASE URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("SUPABASE KEY EXISTS:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

  async function handleLogin() {
  setMessage("Signing in...");

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    setMessage(error.message);
    return;
  }

  window.location.href = "/dashboard";
}

  async function handleForgotPassword() {
  if (!email) {
    setMessage("Enter your email address first.");
    return;
  }

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: "https://bcfc-london.vercel.app/reset-password",
  });

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage("Password reset email sent!");
}

  async function handleRegister() {
  setMessage("Creating account...");

  const { data, error } = await supabase.auth.signUp({
  email,
  password,
  options: {
    data: {
      full_name: fullName,
      date_of_birth: dateOfBirth,
      mobile,
      postcode,
      position,
    },
  },
});

  if (error) {
    setMessage(error.message);
    return;
  }

  setMessage("Account created successfully!");
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
    <div>
      <input
        type="email"
        placeholder="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{
          width: "100%",
          padding: "12px",
          marginBottom: "12px",
          boxSizing: "border-box",
        }}
      />

      <button
onClick={handleLogin}
        style={{
          width: "100%",
          padding: "12px",
          background: "#e31b23",
          color: "#fff",
          border: "none",
          fontWeight: "700",
          cursor: "pointer",
        }}
      >
        Sign In
      </button>

<button
  onClick={handleForgotPassword}
  style={{
    width: "100%",
    marginTop: "10px",
    padding: "10px",
    background: "transparent",
    color: "#e31b23",
    border: "none",
    fontWeight: "700",
    cursor: "pointer",
  }}
>
  Forgot password?
</button>
          {message && (
  <p style={{ marginTop: "15px", color: "#e31b23", fontWeight: "700" }}>
    {message}
  </p>
)}
    </div>
  ) : (
   <div>
  <input
    type="text"
    placeholder="Full name"
    value={fullName}
    onChange={(e) => setFullName(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      boxSizing: "border-box",
    }}
  />

  <label
  style={{
    display: "block",
    marginBottom: "6px",
    fontWeight: "700",
    color: "#555",
  }}
>
  Date of birth
</label>
    <input
    type="date"
    value={dateOfBirth}
    onChange={(e) => setDateOfBirth(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      boxSizing: "border-box",
    }}
  />

  <input
    type="email"
    placeholder="Email address"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      boxSizing: "border-box",
    }}
  />

  <input
    type="tel"
    placeholder="Mobile number"
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      boxSizing: "border-box",
    }}
  />

  <input
    type="text"
    placeholder="Postcode"
    value={postcode}
    onChange={(e) => setPostcode(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      boxSizing: "border-box",
    }}
  />

 <select
  value={position}
  onChange={(e) => setPosition(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    boxSizing: "border-box",
  }}
>
  <option value="">Select position</option>
  <option value="GK">GK</option>
  <option value="CB">CB</option>
  <option value="RB">RB</option>
  <option value="LB">LB</option>
  <option value="CDM">CDM</option>
  <option value="CM">CM</option>
  <option value="CAM">CAM</option>
  <option value="LW">LW</option>
  <option value="RW">RW</option>
  <option value="ST">ST</option>
</select>

  <input
    type="password"
    placeholder="Create password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    style={{
      width: "100%",
      padding: "12px",
      marginBottom: "12px",
      boxSizing: "border-box",
    }}
  />

  <button
    onClick={handleRegister}
    style={{
      width: "100%",
      padding: "12px",
      background: "#e31b23",
      color: "#fff",
      border: "none",
      fontWeight: "700",
      cursor: "pointer",
    }}
  >
    Create Account
  </button>

      {message && (
  <p style={{ marginTop: "15px", color: "#e31b23", fontWeight: "700" }}>
    {message}
  </p>
)}
</div>
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
