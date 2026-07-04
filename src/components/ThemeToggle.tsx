"use client";

import React, { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check local storage or system preference
    const isDark = 
      localStorage.getItem("theme") === "dark" || 
      (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      setDarkMode(false);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setDarkMode(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 border border-border bg-white dark:bg-card hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all duration-200 cursor-pointer text-muted hover:text-foreground shrink-0 active:scale-95 flex items-center justify-center"
      title="Toggle Light/Dark Theme"
      aria-label="Toggle Light/Dark Theme"
    >
      {darkMode ? (
        <Sun className="h-4.5 w-4.5 text-amber-400 animate-in spin-in-12 duration-300" />
      ) : (
        <Moon className="h-4.5 w-4.5 text-[#7d4dff] animate-in spin-in-12 duration-300" />
      )}
    </button>
  );
}
