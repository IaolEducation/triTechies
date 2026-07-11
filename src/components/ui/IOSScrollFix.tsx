"use client";

import { useEffect } from "react";

export function IOSScrollFix() {
  useEffect(() => {
    // Detect iOS (iPhone, iPad, iPod) including iPadOS on Safari
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.userAgent.includes("Mac") && navigator.maxTouchPoints > 1);

    if (isIOS) {
      document.documentElement.classList.add("is-ios");
    }
  }, []);

  return null;
}
