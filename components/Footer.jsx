"use client";
import { GitFork, Star, Command } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer({ stats, children }) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2 border-t border-zinc-200 bg-white/95 px-3 py-2 text-xs text-zinc-600 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-400 sm:px-4 shrink-0">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2.5 font-mono text-xs font-bold tracking-[0.1em] text-zinc-800 dark:text-zinc-100">
          <span className="rounded-md border border-zinc-950 bg-zinc-900 px-2.5 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-zinc-50 shadow-sm ring-1 ring-zinc-900/20 dark:border-zinc-100 dark:bg-zinc-100 dark:text-zinc-950 dark:ring-zinc-100/30">
            NEXT
          </span>
          <span className="font-semibold text-zinc-800 dark:text-zinc-100">IDE</span>
        </div>
        <span className="hidden text-zinc-400 dark:text-zinc-500 md:inline">|</span>
        <span className="hidden text-[11px] text-zinc-600 dark:text-zinc-300 md:inline">
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
          className="h-8 w-8 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label="Star this project on GitHub"
          title="Star on GitHub"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/festoqufx/next-web-based-ide-raven"
          >
            <Star className="h-4 w-4" />
          </a>
        </Button>
        <Button
          size="icon"
          asChild
          variant="ghost"
          className="h-8 w-8 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
          aria-label="Fork this project on GitHub"
          title="Fork on GitHub"
        >
          <a
            target="_blank"
            rel="noreferrer"
            href="https://github.com/festoqufx/next-web-based-ide-raven/fork"
          >
            <GitFork className="h-4 w-4" />
          </a>
        </Button>
        {children}
      </div>
    </footer>
  );
}
