"use client";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { download } from "@/lib/download";
import { compile } from "@/lib/compile";
import { openInNewTab } from "@/lib/preview";
import { formatCode } from "@/lib/formatter";
import { DEFAULT_HTML, DEFAULT_CSS, DEFAULT_JS } from "@/lib/constants";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { Copy, Download, ExternalLink, Wand2, RotateCcw, Sun, Moon } from "lucide-react";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import PreviewPane from "@/components/PreviewPane";
import { debounced } from "@/lib/debounced";
import useCodes from "@/hooks/useCodes";
import useHtml from "@/hooks/useHtml";
import useCss from "@/hooks/useCss";
import useJs from "@/hooks/useJs";
import { useTheme } from "@/theme/ThemeProvider";

const TABS = ["html", "css", "javascript"];

function MobileEditor() {
  const [html, setHtmlValue] = useHtml();
  const [css, setCssValue] = useCss();
  const [js, setJsValue] = useJs();
  const [code, setCodesValue] = useCodes();
  const [currTab, setCurrTab] = useState("html");
  const { resolvedTheme, setTheme, mounted } = useTheme();

  const currentValue = useMemo(
    () => (currTab === "html" ? html : currTab === "css" ? css : js),
    [currTab, html, css, js]
  );

  const handleChange = useCallback(
    (val, type) => {
      if (type === "html") setHtmlValue(val);
      else if (type === "css") setCssValue(val);
      else setJsValue(val);
    },
    [setHtmlValue, setCssValue, setJsValue]
  );

  const handleDownload = useCallback(() => {
    download({ src: code, filename: "index.html" });
    toast.success("Compiled HTML downloaded");
  }, [code]);

  const handleCopy = useCallback(() => {
    navigator.clipboard
      .writeText(code)
      .then(() => toast.success("Compiled HTML copied"))
      .catch(() => toast.error("Could not copy"));
  }, [code]);

  const handleOpenPreview = useCallback(() => openInNewTab(code), [code]);

  const handleReset = useCallback(() => {
    setHtmlValue(DEFAULT_HTML);
    setCssValue(DEFAULT_CSS);
    setJsValue(DEFAULT_JS);
    setCodesValue(compile({ html: DEFAULT_HTML, css: DEFAULT_CSS, js: DEFAULT_JS }));
    toast.success("Reset workspace");
  }, [setHtmlValue, setCssValue, setJsValue, setCodesValue]);

  const handleFormat = useCallback(() => {
    const formatted = formatCode({ html, css, js });
    setHtmlValue(formatted.html);
    setCssValue(formatted.css);
    setJsValue(formatted.js);
    toast.success("Code formatted");
  }, [html, css, js, setHtmlValue, setCssValue, setJsValue]);

  const toggleTheme = () => {
    const next = resolvedTheme === "dark" ? "light" : "dark";
    setTheme(next);
    toast.success(`Switched to ${next === "dark" ? "Dark" : "Light"} mode`);
  };

  // Debounced live compilation.
  const compileCode = useMemo(
    () =>
      debounced(() => {
        setCodesValue(compile({ html, css, js }));
      }, 150),
    [html, css, js, setCodesValue]
  );

  useEffect(() => {
    compileCode();
  }, [compileCode]);

  const stats = useMemo(() => {
    const lines = (html + css + js).split("\n").length;
    const chars = html.length + css.length + js.length;
    return `${lines.toLocaleString()} lines · ${chars.toLocaleString()} chars`;
  }, [html, css, js]);

  return (
    <div className="flex h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-200 bg-zinc-100 px-3 py-2 shrink-0 dark:border-zinc-800 dark:bg-zinc-900">
        <ToggleGroup
          size="sm"
          type="single"
          value={currTab}
          onValueChange={(value) => value && setCurrTab(value)}
          className="rounded-lg border border-zinc-200 bg-white p-0.5 dark:border-zinc-800 dark:bg-zinc-950"
        >
          {TABS.map((tab) => (
            <ToggleGroupItem
              key={tab}
              className="rounded-md px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-zinc-500 data-[state=on]:bg-black data-[state=on]:text-white dark:text-zinc-400 dark:data-[state=on]:bg-white dark:data-[state=on]:text-black"
              value={tab}
            >
              {tab === "javascript" ? "JS" : tab}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-7 items-center justify-center rounded border border-zinc-300 bg-white px-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title={`Switch to ${mounted && resolvedTheme === "dark" ? "Light" : "Dark"} Mode`}
          >
            {mounted && resolvedTheme === "dark" ? (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300" />
            )}
          </button>
          <button
            type="button"
            onClick={handleFormat}
            className="flex h-7 items-center justify-center rounded border border-zinc-300 bg-zinc-200 px-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title="Format Code"
          >
            <Wand2 className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleCopy}
            className="flex h-7 items-center justify-center rounded border border-zinc-300 bg-zinc-200 px-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title="Copy Code"
          >
            <Copy className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleOpenPreview}
            className="flex h-7 items-center justify-center rounded border border-zinc-300 bg-zinc-200 px-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title="Open in new tab"
          >
            <ExternalLink className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex h-7 items-center justify-center rounded border border-zinc-300 bg-zinc-200 px-2 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200"
            title="Reset"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
          <button
            type="button"
            onClick={handleDownload}
            className="flex h-7 items-center justify-center rounded bg-zinc-900 px-2.5 text-xs font-bold text-white dark:bg-white dark:text-black"
            title="Download"
          >
            <Download className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={55} minSize={30}>
            <CodeEditor type={currTab} value={currentValue} onChange={handleChange} />
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700" />

          <ResizablePanel defaultSize={45} minSize={20} className="bg-zinc-50 p-2 dark:bg-zinc-950">
            <PreviewPane code={code} onOpenNewTab={handleOpenPreview} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Footer stats={stats} />
    </div>
  );
}

export default memo(MobileEditor);
