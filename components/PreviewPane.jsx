"use client";
import { Monitor, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

/**
 * Shared live-preview pane used by both editors. Renders compiled HTML in an
 * isolated iframe with an "Open in new tab" action and an optional slot for
 * additional header actions.
 */
export default function PreviewPane({
  code,
  title = "Preview",
  onOpenNewTab,
  children,
}) {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-black/10 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-black/10 bg-zinc-50 px-3 py-2">
        <div className="flex items-center gap-2">
          <Monitor className="h-3.5 w-3.5 text-zinc-500" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="flex items-center gap-1.5 rounded-full border border-black/10 bg-white px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
            <span className="h-1.5 w-1.5 rounded-full bg-black" aria-hidden />
            Live
          </span>
          {onOpenNewTab && (
            <Button
              size="icon"
              variant="ghost"
              className="h-7 w-7"
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
      <iframe
        title={`${title} live preview`}
        sandbox="allow-scripts allow-modals allow-forms allow-popups"
        className="h-full w-full flex-1 bg-white"
        srcDoc={code}
      />
    </div>
  );
}
