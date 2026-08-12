"use client";
import { GitFork, Star, Command } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer({ stats, children }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-zinc-200 bg-white/95 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 sm:px-4 shrink-0">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-zinc-900 dark:text-zinc-100">
          <span className="rounded bg-black px-1.5 py-0.5 text-white dark:bg-white dark:text-black">
            NEXT
          </span>
          IDE
        </div>
        <span className="hidden text-zinc-400 dark:text-zinc-600 md:inline">|</span>
        <span className="hidden text-[11px] text-zinc-500 dark:text-zinc-400 md:inline">
          Monochrome Edition
        </span>
      </div>

      {stats && (
        <div className="flex items-center gap-3 font-mono text-[11px] tabular-nums text-zinc-500 dark:text-zinc-400">
          <span>{stats}</span>
          <span className="hidden sm:inline text-zinc-300 dark:text-zinc-700">•</span>
          <span className="hidden sm:inline text-[10px] text-zinc-400">
            <kbd className="rounded border border-zinc-200 bg-zinc-100 px-1 font-mono text-[10px] text-zinc-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400">Ctrl+S</kbd> Save
          </span>
        </div>
      )}

      <div className="flex items-center gap-1">
        <Button
          size="icon"
          asChild
          variant="ghost"
          className="h-7 w-7 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-white"
          aria-label="Star this project on GitHub"
          title="Star on GitHub"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/festoqufx/next-web-based-ide-raven"
          >
            <Star className="h-3.5 w-3.5" />
          </a>
        </Button>
        <Button
          size="icon"
          asChild
          variant="ghost"
          className="h-7 w-7 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-900 dark:hover:text-white"
          aria-label="Fork this project on GitHub"
          title="Fork on GitHub"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/festoqufx/next-web-based-ide-raven/fork"
          >
            <GitFork className="h-3.5 w-3.5" />
          </a>
        </Button>
        {children}
      </div>
    </footer>
  );
}
