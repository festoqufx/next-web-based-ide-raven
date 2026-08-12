"use client";
import { useEffect, useCallback, useMemo, memo } from "react";
import { download } from "@/lib/download";
import { compile } from "@/lib/compile";
import { openInNewTab } from "@/lib/preview";
import { DEFAULT_HTML, DEFAULT_CSS, DEFAULT_JS } from "@/lib/constants";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { toast } from "sonner";
import { PanelTop, Code2 } from "lucide-react";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import PreviewPane from "@/components/PreviewPane";
import useCodes from "@/hooks/useCodes";
import useHtml from "@/hooks/useHtml";
import useCss from "@/hooks/useCss";
import useJs from "@/hooks/useJs";

const Editor = () => {
  const [html, setHtmlValue] = useHtml();
  const [css, setCssValue] = useCss();
  const [js, setJsValue] = useJs();
  const [code, setCodesValue] = useCodes();

  const compileCode = useCallback(() => {
    setCodesValue(compile({ html, css, js }));
  }, [html, css, js, setCodesValue]);

  // Compile live as soon as any pane changes.
  useEffect(() => {
    compileCode();
  }, [compileCode]);

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
    toast.success("Compiled page downloaded");
  }, [code]);

  const handleOpenPreview = useCallback(() => {
    openInNewTab(code);
  }, [code]);

  const handleReset = useCallback(() => {
    setHtmlValue(DEFAULT_HTML);
    setCssValue(DEFAULT_CSS);
    setJsValue(DEFAULT_JS);
    setCodesValue(compile({ html: DEFAULT_HTML, css: DEFAULT_CSS, js: DEFAULT_JS }));
    toast.success("Reset to default template");
  }, [setHtmlValue, setCssValue, setJsValue, setCodesValue]);

  // Keyboard shortcuts: Ctrl/Cmd+S → download, Ctrl/Cmd+Enter → run in new tab.
  useEffect(() => {
    const onKeyDown = (e) => {
      const mod = e.ctrlKey || e.metaKey;
      if (mod && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleDownload();
      } else if (mod && e.key === "Enter") {
        e.preventDefault();
        handleOpenPreview();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleDownload, handleOpenPreview]);

  const stats = useMemo(() => {
    const lines = (html + css + js).split("\n").length;
    const chars = html.length + css.length + js.length;
    return `${lines.toLocaleString()} lines · ${chars.toLocaleString()} chars`;
  }, [html, css, js]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b border-black/10 bg-white/85 px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10 bg-black text-white shadow-sm">
            <PanelTop className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-zinc-950">
              Workspace
            </p>
            <p className="truncate text-xs text-zinc-500">
              HTML · CSS · JavaScript with live preview
            </p>
          </div>
        </div>
        <span className="hidden items-center gap-1.5 rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 md:flex">
          <Code2 className="h-3.5 w-3.5" />
          Ctrl + S to download
        </span>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={62} minSize={30}>
            <ResizablePanelGroup direction="horizontal" className="h-full">
              <ResizablePanel defaultSize={34} minSize={20}>
                <CodeEditor type="html" value={html} onChange={handleChange} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodeEditor type="css" value={css} onChange={handleChange} />
              </ResizablePanel>
              <ResizableHandle withHandle />
              <ResizablePanel defaultSize={33} minSize={20}>
                <CodeEditor type="javascript" value={js} onChange={handleChange} />
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={38} minSize={20} className="bg-zinc-100 p-2">
            <PreviewPane code={code} onOpenNewTab={handleOpenPreview} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Footer onClear={handleReset} onDownload={handleDownload} stats={stats} />
    </div>
  );
};

export default memo(Editor);
