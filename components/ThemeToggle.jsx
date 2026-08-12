"use client";
import { Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "@/theme/ThemeProvider";

export default function ThemeToggle() {
  const { resolvedTheme, setTheme, mounted } = useTheme();
  const [anim, setAnim] = useState(false);
  const isDark = mounted ? resolvedTheme === "dark" : true;

  const toggle = () => {
    setTheme(isDark ? "light" : "dark");
    setAnim(true);
    window.setTimeout(() => setAnim(false), 350);
  };

  if (!mounted) {
    return (
      <div className="h-8 w-14 rounded-full border border-zinc-700 bg-zinc-900 opacity-50" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggle}
      role="switch"
      aria-checked={isDark}
      aria-label={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} mode`}
      className={`relative flex h-8 w-14 items-center rounded-full border px-0.5 shadow-sm transition-colors cursor-pointer ${
        isDark
          ? "border-zinc-700 bg-zinc-900 hover:bg-zinc-800"
          : "border-zinc-300 bg-zinc-200 hover:bg-zinc-300"
      }`}
    >
      <span
        className={`flex h-6 w-6 items-center justify-center rounded-full transition-transform duration-300 ease-out shadow-sm ${
          isDark
            ? "translate-x-7 bg-zinc-950 text-amber-300"
            : "translate-x-0.5 bg-white text-zinc-900"
        }`}
      >
        {isDark ? (
          <Moon className={`h-3.5 w-3.5 ${anim ? "animate-spin" : ""}`} />
        ) : (
          <Sun className={`h-3.5 w-3.5 text-amber-500 ${anim ? "animate-spin" : ""}`} />
        )}
      </span>
    </button>
  );
}
