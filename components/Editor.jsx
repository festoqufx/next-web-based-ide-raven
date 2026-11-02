"use client";
import { useEffect, useCallback, useMemo, useState, memo } from "react";
import { download } from "@/lib/download";
import { compile } from "@/lib/compile";
import { openInNewTab } from "@/lib/preview";
import { formatCode } from "@/lib/formatter";
import { decodeCodeFromUrl } from "@/lib/sharing";
import { DEFAULT_HTML, DEFAULT_CSS, DEFAULT_JS, PRESET_TEMPLATES } from "@/lib/constants";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { toast } from "sonner";
import { Copy, Download, ExternalLink, Wand2, RotateCcw, Layers } from "lucide-react";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import PreviewPane from "@/components/PreviewPane";
import FileImport from "@/components/FileImport";
import ShareCodeDialog from "@/components/ShareCodeDialog";
import KeyboardShortcutsDialog from "@/components/KeyboardShortcutsDialog";
import useCodes from "@/hooks/useCodes";
import useHtml from "@/hooks/useHtml";
import useCss from "@/hooks/useCss";
import useJs from "@/hooks/useJs";

const ACTION_BUTTON_CLASS = "flex h-10 items-center gap-2.5 rounded-lg border border-zinc-300 bg-white px-4 text-xs font-semibold text-zinc-700 shadow-sm transition-all duration-200 hover:border-zinc-400 hover:bg-zinc-50 hover:shadow-md hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:border-zinc-600 dark:hover:bg-zinc-700 dark:hover:text-white dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950";

const Editor = () => {
  const [html, setHtmlValue] = useHtml();
  const [css, setCssValue] = useCss();
  const [js, setJsValue] = useJs();
  const [code, setCodesValue] = useCodes();
  const [selectedPreset, setSelectedPreset] = useState("default");
  const [mounted, setMounted] = useState(false);

  const compileCode = useCallback(() => {
    setCodesValue(compile({ html, css, js }));
  }, [html, css, js, setCodesValue]);

  useEffect(() => {
    compileCode();
  }, [compileCode]);

  useEffect(() => {
    const urlCode = decodeCodeFromUrl();
    if (urlCode && urlCode.html && urlCode.css && urlCode.js) {
      setHtmlValue(urlCode.html);
      setCssValue(urlCode.css);
      setJsValue(urlCode.js);
      setSelectedPreset("shared");
      toast.success("Loaded shared code");
    }
  }, [setHtmlValue, setCssValue, setJsValue]);

  useEffect(() => {
    setMounted(true);
  }, []);

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
      .then(() => toast.success("Compiled HTML copied to clipboard"))
      .catch(() => toast.error("Could not copy to clipboard"));
  }, [code]);

  const handleOpenPreview = useCallback(() => openInNewTab(code), [code]);

  const handleReset = useCallback(() => {
    setHtmlValue(DEFAULT_HTML);
    setCssValue(DEFAULT_CSS);
    setJsValue(DEFAULT_JS);
    setCodesValue(compile({ html: DEFAULT_HTML, css: DEFAULT_CSS, js: DEFAULT_JS }));
    setSelectedPreset("default");
    toast.success("Reset to default workspace");
  }, [setHtmlValue, setCssValue, setJsValue, setCodesValue]);

  const handleFormat = useCallback(() => {
    const formatted = formatCode({ html, css, js });
    setHtmlValue(formatted.html);
    setCssValue(formatted.css);
    setJsValue(formatted.js);
    toast.success("Code formatted");
  }, [html, css, js, setHtmlValue, setCssValue, setJsValue]);

  const handleSelectPreset = useCallback(
    (presetId) => {
      const preset = PRESET_TEMPLATES.find((p) => p.id === presetId);
      if (preset) {
        setHtmlValue(preset.html);
        setCssValue(preset.css);
        setJsValue(preset.js);
        setSelectedPreset(presetId);
        toast.success(`Loaded "${preset.name}" preset`);
      }
    },
    [setHtmlValue, setCssValue, setJsValue]
  );

  const handleFileImport = useCallback(
    ({ html: importedHtml, css: importedCss, js: importedJs }) => {
      setHtmlValue(importedHtml);
      setCssValue(importedCss);
      setJsValue(importedJs);
      setSelectedPreset("imported");
      toast.success("Code imported successfully");
    },
    [setHtmlValue, setCssValue, setJsValue]
  );

  useEffect(() => {
    const onKeyDown = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleDownload();
      } else if (mod && e.key === "Enter") {
        e.preventDefault();
        handleOpenPreview();
      } else if (mod && e.shiftKey && e.key.toLowerCase() === "f") {
        e.preventDefault();
        handleFormat();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDownload, handleOpenPreview, handleFormat]);

  const stats = useMemo(() => {
    const lines = (html + css + js).split("\n").length;
    const chars = html.length + css.length + js.length;
    return `${lines.toLocaleString()} lines · ${chars.toLocaleString()} chars`;
  }, [html, css, js]);

  const codeState = useMemo(() => ({ html, css, js }), [html, css, js]);

  return (
    <div className="flex h-full flex-col bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200 bg-zinc-100/90 px-4 py-3 shrink-0 sm:gap-4 sm:px-6 dark:border-zinc-800 dark:bg-zinc-900/90">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
            <span className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider text-zinc-700 dark:text-zinc-200">
              Templates
            </span>
          </div>
          <select
            value={selectedPreset}
            onChange={(e) => handleSelectPreset(e.target.value)}
            className="h-9 sm:h-10 rounded-lg border border-zinc-300 bg-white px-2 sm:px-3.5 font-sans text-xs sm:text-sm font-medium text-zinc-800 shadow-sm transition-all duration-200 hover:border-zinc-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600 dark:focus:ring-offset-zinc-950"
          >
            {PRESET_TEMPLATES.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.name}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <FileImport onImport={handleFileImport} />

          <button
            type="button"
            onClick={handleFormat}
            className={ACTION_BUTTON_CLASS}
            title="Format Code (Ctrl+Shift+F)"
          >
            <Wand2 className="h-4 w-4" />
            <span className="hidden sm:inline">Format</span>
          </button>

          <button
            type="button"
            onClick={handleCopy}
            className={ACTION_BUTTON_CLASS}
            title="Copy compiled HTML"
          >
            <Copy className="h-4 w-4" />
            <span className="hidden lg:inline">Copy</span>
          </button>

          <button
            type="button"
            onClick={handleOpenPreview}
            className={ACTION_BUTTON_CLASS}
            title="Open in new tab (Ctrl+Enter)"
          >
            <ExternalLink className="h-4 w-4" />
            <span className="hidden lg:inline">Preview</span>
          </button>

          <ShareCodeDialog codeState={codeState} />

          <button
            type="button"
            onClick={handleReset}
            className={ACTION_BUTTON_CLASS}
            title="Reset code"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="hidden sm:inline">Reset</span>
          </button>

          <KeyboardShortcutsDialog />

          <button
            type="button"
            onClick={handleDownload}
            className="flex h-9 sm:h-10 items-center gap-2.5 rounded-lg bg-zinc-900 px-3 sm:px-5 text-xs font-bold text-white shadow-md transition-all duration-200 hover:bg-zinc-800 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-95 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200 dark:hover:shadow-lg dark:focus-visible:ring-zinc-500 dark:focus-visible:ring-offset-zinc-950"
            title="Download compiled HTML (Ctrl+S)"
          >
            <Download className="h-4 w-4 text-white dark:text-zinc-900" />
            <span className="hidden sm:inline">Download</span>
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={60} minSize={30}>
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={34} minSize={20}>
                <CodeEditor type="html" value={html} onChange={handleChange} />
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700" />
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodeEditor type="css" value={css} onChange={handleChange} />
              </ResizablePanel>
              <ResizableHandle withHandle className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700" />
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodeEditor type="javascript" value={js} onChange={handleChange} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle className="bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700" />

          <ResizablePanel defaultSize={40} minSize={20} className="bg-zinc-50 p-2 dark:bg-zinc-950">
            <PreviewPane code={code} onOpenNewTab={handleOpenPreview} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Footer stats={mounted ? stats : null} />
    </div>
  );
};

export default memo(Editor);
