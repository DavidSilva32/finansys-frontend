"use client";

import { useState, useEffect } from "react";
import { Button } from "./button";

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (isDark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button variant="outline" size="sm" onClick={toggleTheme} className="cursor-pointer">
        {isDark ? "🌞 Light" : "🌙 Dark"}
      </Button>
    </div>
  );
}
