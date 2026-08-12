"use client";
import Editor from "@/components/Editor";
import MobileEditor from "@/components/MobileEditor";
import ThemeToggle from "@/components/ThemeToggle";
import useMediaQuery from "../hooks/useMediaQuery";
import { Loader2, Terminal, Monitor } from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "@/theme/ThemeProvider";

export default function Page() {
  const screenSize = useMediaQuery("768");
  const [preload, setPreload] = useState(true);
  const { resolvedTheme, mounted } = useTheme();

  useEffect(() => {
    setPreload(false);
  }, []);

  return (
    <main className="min-h-screen bg-zinc-100 p-2 sm:p-4 lg:p-5 font-sans bg-grid-pattern text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100 flex flex-col">
      <div className="mx-auto flex h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)] w-full max-w-[1600px] flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
        {/* Top App Header */}
        <header className="flex items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-100/90 px-4 py-3 shrink-0 dark:border-zinc-800 dark:bg-zinc-900/90">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-900 text-white shadow-sm dark:border-zinc-700 dark:bg-white dark:text-zinc-950">
              <Terminal className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.3em] text-zinc-400">
                NEXT IDE
              </p>
              <h1 className="truncate text-sm sm:text-base font-bold tracking-tight text-zinc-900 dark:text-white">
                Web Sandbox & Live Compiler
              </h1>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <div className="hidden sm:flex shrink-0 items-center gap-2 rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-xs font-medium text-zinc-600 font-mono dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
              <Monitor className="h-3 w-3" aria-hidden />
              {mounted
                ? resolvedTheme === "dark"
                  ? "Dark Mode Active"
                  : "Light Mode Active"
                : "Workspace Active"}
            </div>
            <ThemeToggle />
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
          {!screenSize ? <Editor /> : <MobileEditor />}
        </div>
      </div>

      {preload && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-zinc-100/80 backdrop-blur-sm dark:bg-zinc-950/80">
          <div className="flex items-center gap-3 rounded-full border border-zinc-200 bg-white px-5 py-2.5 shadow-xl text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-white">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-900 dark:text-white" />
            <span className="text-sm font-medium font-mono">
              Initializing Monochrome IDE…
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
