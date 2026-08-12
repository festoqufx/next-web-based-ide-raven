import { GitFork, RotateCcw, Star, Download } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer({
  onClear = () => {},
  onDownload,
  children,
  stats,
}) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-black/10 bg-white/90 px-3 py-2.5 sm:px-4">
      <div className="flex items-center gap-3">
        <span className="rounded-full border border-black/10 bg-zinc-950 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white shadow-sm">
          NEXT IDE
        </span>
        <span className="hidden text-xs font-medium text-zinc-500 sm:inline">
          Minimal · Focused · Polished
        </span>
      </div>

      {stats && (
        <span className="text-[11px] tabular-nums text-zinc-500">
          {stats}
        </span>
      )}

      <div className="flex items-center gap-2">
        <Button
          size="icon"
          asChild
          variant="ghost"
          className="h-8 w-8 border border-transparent hover:border-black/10"
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
          className="h-8 w-8 border border-transparent hover:border-black/10"
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
        <Button
          size="sm"
          variant="outline"
          onClick={onClear}
          className="h-8 gap-1.5 border-black/10 bg-white text-black hover:bg-black hover:text-white"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Reset
        </Button>
        {onDownload && (
          <Button
            size="sm"
            variant="outline"
            onClick={onDownload}
            className="h-8 gap-1.5 border-black/10 bg-black text-white hover:bg-white hover:text-black"
            aria-label="Download compiled HTML"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Download</span>
          </Button>
        )}
        {children}
      </div>
    </footer>
  );
}
