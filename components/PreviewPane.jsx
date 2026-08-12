"use client";
import { useState, useEffect } from "react";
import { Monitor, ExternalLink, RotateCcw, Terminal, ChevronUp, ChevronDown } from "lucide-react";
import { Button } from "./ui/button";
import ConsolePanel from "./ConsolePanel";

export default function PreviewPane({
  code,
  title = "Live Output",
  onOpenNewTab,
  onRefresh,
  children,
}) {
  const [logs, setLogs] = useState([]);
  const [showConsole, setShowConsole] = useState(false);
  const [key, setKey] = useState(0);

  // Clear logs when code is re-compiled
  useEffect(() => {
    setLogs([]);
  }, [code]);

  // Handle postMessage logs from compile iframe
  useEffect(() => {
    const handleMessage = (e) => {
      if (e.data && e.data.type === "IDE_CONSOLE_LOG") {
        setLogs((prev) => [
          ...prev,
          {
            level: e.data.level,
            args: e.data.args,
            timestamp: e.data.timestamp || new Date().toLocaleTimeString(),
          },
        ]);
      }
    };
    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleManualRefresh = () => {
    setKey((prev) => prev + 1);
    if (onRefresh) onRefresh();
  };

  const errorCount = logs.filter((l) => l.level === "error").length;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-50 px-3 py-2 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="flex min-w-0 items-center gap-2.5">
          <Monitor className="h-3.5 w-3.5 shrink-0 text-zinc-500" aria-hidden />
          <span className="truncate font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800 dark:text-zinc-200">
            {title}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-zinc-300 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
            <span className="h-1.5 w-1.5 rounded-full bg-black dark:bg-white" aria-hidden />
            Sync
          </span>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowConsole((prev) => !prev)}
            className="h-7 gap-1 px-2 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-800"
            title="Toggle Live Console Output"
          >
            <Terminal className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Console</span>
            {logs.length > 0 && (
              <span
                className={`ml-1 rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                  errorCount > 0
                    ? "bg-red-900 text-red-200"
                    : "bg-zinc-800 text-zinc-200"
                }`}
              >
                {logs.length}
              </span>
            )}
            {showConsole ? (
              <ChevronDown className="h-3 w-3" />
            ) : (
              <ChevronUp className="h-3 w-3" />
            )}
          </Button>

          <Button
            size="icon"
            variant="ghost"
            className="h-7 w-7 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
            onClick={handleManualRefresh}
            aria-label="Refresh preview"
            title="Refresh preview"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </Button>

          {onOpenNewTab && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white"
              onClick={onOpenNewTab}
              aria-label="Open preview in new tab"
              title="Open preview in new tab"
            >
              <ExternalLink className="h-3.5 w-3.5" />
            </Button>
          )}
          {children}
        </div>
      </div>

      <div className="relative flex-1 bg-white">
        <iframe
          key={key}
          title={`${title} live preview`}
          sandbox="allow-scripts allow-modals allow-forms allow-popups"
          className="h-full w-full bg-white"
          srcDoc={code}
        />
      </div>

      {showConsole && (
        <div className="h-44 shrink-0">
          <ConsolePanel logs={logs} onClear={() => setLogs([])} />
        </div>
      )}
    </div>
  );
}
