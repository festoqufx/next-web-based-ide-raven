"use client";
import { useCallback, useMemo } from "react";
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
  const codeValue = value ?? "";
  const label = CODE_LABELS[type] ?? "Code";
  const languageTag = type === "javascript" ? "JS" : type.toUpperCase();
  const hasValue = codeValue.trim().length > 0;
  const cmOptions = useMemo(() => getCmOptions(resolvedTheme), [resolvedTheme]);
  const languageExtension = useMemo(() => loadLanguage(type), [type]);

  const stats = useMemo(() => {
    const lines = codeValue.length > 0 ? codeValue.split("\n").length : 0;
    return `${lines.toLocaleString()} lines · ${codeValue.length.toLocaleString()} chars`;
  }, [codeValue]);

  const handleCopy = useCallback(() => {
    if (!hasValue) {
      toast.info("Nothing to copy");
      return;
    }

    if (!navigator?.clipboard) {
      toast.error("Clipboard API is unavailable in this browser");
      return;
    }

    navigator.clipboard
      .writeText(codeValue)
      .then(() => toast.success(`${label} copied to clipboard`))
      .catch(() => toast.error("Could not copy to clipboard"));
  }, [codeValue, hasValue, label]);

  const handleEditorChange = useCallback(
    (nextValue) => {
      onChange(nextValue, type);
    },
    [onChange, type]
  );

  return (
    <div className="flex h-full flex-col overflow-hidden bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-100/90 px-3 py-2 shrink-0 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex min-w-0 items-center gap-2">
          <span
            className={`h-2 w-2 shrink-0 rounded-full ${DOT[type] ?? "bg-zinc-400"}`}
            aria-hidden
          />
          <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-200">
            {languageTag}
          </span>
          <span className="hidden text-[11px] text-zinc-500 sm:inline dark:text-zinc-400">
            · {label}
          </span>
          <span className="hidden text-[11px] text-zinc-500 md:inline dark:text-zinc-400">
            · {stats}
          </span>
        </div>
        <button
          type="button"
          onClick={handleCopy}
          disabled={!hasValue}
          aria-label={`Copy ${type} code`}
          title={`Copy ${languageTag}`}
          className="flex h-6 shrink-0 items-center gap-1 rounded border border-zinc-300 bg-zinc-200 px-2 text-[10px] font-medium text-zinc-600 shadow-sm transition-colors hover:bg-zinc-100 hover:text-zinc-900 disabled:cursor-not-allowed disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-100 dark:hover:text-zinc-950"
        >
          <Copy className="h-3 w-3" />
          <span className="hidden sm:inline">Copy</span>
        </button>
      </div>

      <div className="flex-1 overflow-hidden relative bg-zinc-50 dark:bg-zinc-950">
        <CodeMirror
          {...cmOptions}
          value={codeValue}
          placeholder={languageTag}
          onChange={handleEditorChange}
          extensions={languageExtension ? [languageExtension] : []}
          className="h-full w-full"
        />
      </div>
    </div>
  );
}
