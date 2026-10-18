"use client";

import { useEffect, useState } from "react";
import styles from "./install.module.css";

export default function InstallButton() {
  const [prompt, setPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const display = window.matchMedia("(display-mode: standalone)");
    const check = () => setInstalled(display.matches || navigator.standalone === true);
    const available = (event) => {
      event.preventDefault();
      setPrompt(event);
    };
    const complete = () => { setInstalled(true); setPrompt(null); };
    check();
    window.addEventListener("beforeinstallprompt", available);
    window.addEventListener("appinstalled", complete);
    display.addEventListener("change", check);
    return () => {
      window.removeEventListener("beforeinstallprompt", available);
      window.removeEventListener("appinstalled", complete);
      display.removeEventListener("change", check);
    };
  }, []);

  async function install() {
    if (!prompt) return;
    try {
      await prompt.prompt();
      await prompt.userChoice;
    } catch {
      setMessage("Use your browser’s menu to add BCFC London to your home screen.");
    } finally {
      setPrompt(null);
    }
  }

  if (installed) return <p className={styles.installed} role="status">You’re using the BCFC London app.</p>;
  return <>
    {prompt && <button className={styles.install} type="button" onClick={install}>Install BCFC London</button>}
    {message && <p role="status">{message}</p>}
  </>;
}
