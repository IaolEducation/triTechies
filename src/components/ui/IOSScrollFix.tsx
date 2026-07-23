"use client";

import { useEffect } from "react";

export function IOSScrollFix() {
  useEffect(() => {
    // Ensure the viewport meta is respected on iOS by forcing a repaint
    // The safe-area-inset-top is handled via env() CSS and viewportFit=cover
    document.documentElement.style.setProperty(
      "--sat",
      "env(safe-area-inset-top)"
    );
  }, []);

  return null;
}
