"use client";

import { useEffect } from "react";

export default function PWARegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((registration) => console.log("Service Worker registered"))
        .catch((err) => console.error("Service Worker registration failed", err));
    }
  }, []);

  return null;
}
