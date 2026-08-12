"use client";
import { Terminal, Trash2, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { Button } from "./ui/button";

export default function ConsolePanel({ logs = [], onClear = () => {} }) {
  return (
    <div className="flex h-full flex-col bg-zinc-50 text-zinc-900 font-mono text-xs overflow-hidden border-t border-zinc-200 dark:bg-zinc-950 dark:text-zinc-100 dark:border-zinc-800">
      <div className="flex items-center justify-between px-3 py-1.5 bg-zinc-100 border-b border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800">
        <div className="flex items-center gap-2">
          <Terminal className="h-3.5 w-3.5 text-zinc-500 dark:text-zinc-400" />
          <span className="font-semibold text-[11px] uppercase tracking-wider text-zinc-600 dark:text-zinc-300">
            Console Output ({logs.length})
          </span>
        </div>
        <Button
          size="icon"
          variant="ghost"
          onClick={onClear}
          className="h-6 w-6 text-zinc-500 hover:text-black hover:bg-zinc-200 dark:text-zinc-400 dark:hover:text-white dark:hover:bg-zinc-800"
          title="Clear console"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {logs.length === 0 ? (
          <div className="flex h-full items-center justify-center text-zinc-500 text-[11px] italic dark:text-zinc-600">
            No console output yet. Trigger actions or call console.log() in JavaScript.
          </div>
        ) : (
          logs.map((log, i) => (
            <div
              key={i}
              className={`flex items-start gap-2 px-2 py-1 rounded text-[11px] leading-relaxed ${
                log.level === "error"
                  ? "bg-red-50 text-red-700 border border-red-200 dark:bg-red-950/40 dark:text-red-300 dark:border-red-900/50"
                  : log.level === "warn"
                  ? "bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900/50"
                  : "bg-zinc-100 text-zinc-800 dark:bg-zinc-900/60 dark:text-zinc-200"
              }`}
            >
              <span className="text-[10px] text-zinc-500 shrink-0 mt-0.5">
                {log.timestamp}
              </span>
              {log.level === "error" && (
                <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0 mt-0.5" />
              )}
              {log.level === "warn" && (
                <AlertTriangle className="h-3.5 w-3.5 text-amber-400 shrink-0 mt-0.5" />
              )}
              {log.level === "info" && (
                <Info className="h-3.5 w-3.5 text-blue-400 shrink-0 mt-0.5" />
              )}
              <span className="break-all whitespace-pre-wrap flex-1">
                {log.args.join(" ")}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
