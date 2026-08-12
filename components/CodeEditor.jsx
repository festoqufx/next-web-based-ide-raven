"use client";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from "@uiw/react-codemirror";
import { CODE_LABELS } from "@/lib/constants";
import { getCmOptions } from "@/lib/cmOptions";
import { useTheme } from "@/theme/ThemeProvider";

const DOT = {
  html: "bg-white ring-1 ring-zinc-400 dark:bg-zinc-100 dark:ring-zinc-700",
  css: "bg-zinc-400",
  javascript: "bg-zinc-600",
};

export default function CodeEditor({ type, value, onChange }) {
  const { resolvedTheme } = useTheme();

  const handleCopy = () => {
    navigator.clipboard
      .writeText(value)
      .then(() => toast.success(`${CODE_LABELS[type]} copied to clipboard`))
      .catch(() => toast.error("Could not copy to clipboard"));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-100/90 px-3 py-2 shrink-0 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${DOT[type] ?? "bg-zinc-400"}`}
            aria-hidden
          />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            {type === "javascript" ? "JS" : type.toUpperCase()}
          </span>
          <span className="hidden text-[11px] text-zinc-500 sm:inline dark:text-zinc-400">
            · {CODE_LABELS[type]}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${type} code`}
          title={`Copy ${type.toUpperCase()}`}
          className="flex h-6 shrink-0 items-center gap-1 rounded border border-zinc-300 bg-zinc-200 px-2 text-[10px] font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-950"
        >
          <Copy className="h-3 w-3" />
          <span className="hidden sm:inline">Copy</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative bg-zinc-50 dark:bg-zinc-950">
        <CodeMirror
          {...getCmOptions(resolvedTheme)}
          value={value}
          placeholder={type.toUpperCase()}
          onChange={(val) => onChange(val, type)}
          extensions={[loadLanguage(type)]}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}

