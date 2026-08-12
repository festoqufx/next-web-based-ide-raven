"use client";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { CODE_LABELS } from "@/lib/constants";
import { cmOptions } from "@/lib/cmOptions";

/**
 * Single code pane (header + CodeMirror editor) used by both editors.
 */
export default function CodeEditor({ type, value, onChange }) {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success(`${type.toUpperCase()} copied to clipboard`))
      .catch(() => toast.error("Could not copy to clipboard"));
  };

  return (
    <div className="flex h-full flex-col bg-zinc-50">
      <div className="flex items-center justify-between border-b border-black/10 bg-white/90 px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-black" aria-hidden />
          <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-600">
            {type}
          </span>
          <span className="hidden text-[10px] text-zinc-400 sm:inline">
            {CODE_LABELS[type]}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${type} code`}
          title={`Copy ${type.toUpperCase()}`}
          className="flex h-6 items-center gap-1 rounded-md border border-black/10 bg-white px-1.5 text-[10px] font-medium text-zinc-500 transition-colors hover:bg-black hover:text-white"
        >
          <Copy className="h-3 w-3" />
          <span className="hidden sm:inline">Copy</span>
        </button>
      </div>
      <ScrollArea className="flex-1">
        <CodeMirror
          {...cmOptions}
          value={value}
          placeholder={type.toUpperCase()}
          onChange={(val) => onChange(val, type)}
          extensions={[loadLanguage(type)]}
        />
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  );
}
