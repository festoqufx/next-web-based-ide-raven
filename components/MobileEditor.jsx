"use client";
import { useState, useEffect, useMemo, useCallback, memo } from "react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from "sonner";
import { download } from "@/lib/download";
import { compile } from "@/lib/compile";
import { openInNewTab } from "@/lib/preview";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Footer from "@/components/Footer";
import CodeEditor from "@/components/CodeEditor";
import PreviewPane from "@/components/PreviewPane";
import { debounced } from "@/lib/debounced";
import useCodes from "@/hooks/useCodes";
import useHtml from "@/hooks/useHtml";
import useCss from "@/hooks/useCss";
import useJs from "@/hooks/useJs";

const TABS = ["html", "css", "javascript"];

function MobileEditor() {
  const [html, setHtmlValue] = useHtml();
  const [css, setCssValue] = useCss();
  const [js, setJsValue] = useJs();
  const [code, setCodesValue] = useCodes();
  const [currTab, setCurrTab] = useState("html");

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
    toast.success("Compiled page downloaded");
  }, [code]);

  const handleOpenPreview = useCallback(() => openInNewTab(code), [code]);

  const handleReset = useCallback(() => {
    setHtmlValue(""); setCssValue(""); setJsValue(""); setCodesValue("");
    toast.success("Cleared workspace");
  }, [setHtmlValue, setCssValue, setJsValue, setCodesValue]);

  // Debounced live compilation shared with the desktop editor behaviour.
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

  return (
    <div className="flex h-full flex-col">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white/85 px-3 py-3 md:px-4">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">
            Mobile workspace
          </p>
          <p className="text-sm font-semibold text-zinc-950">
            HTML · CSS · JavaScript
          </p>
        </div>
        <ToggleGroup
          size="sm"
          type="single"
          value={currTab}
          onValueChange={(value) => value && setCurrTab(value)}
          className="rounded-full border border-black/10 bg-white p-1 shadow-sm"
        >
          {TABS.map((tab) => (
            <ToggleGroupItem
              key={tab}
              className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] data-[state=on]:bg-black data-[state=on]:text-white"
              value={tab}
            >
              {tab === "javascript" ? "JS" : tab}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <div className="min-h-0 flex-1">
        <ResizablePanelGroup direction="vertical" className="h-full">
          <ResizablePanel defaultSize={60} minSize={30}>
            <CodeEditor type={currTab} value={currentValue} onChange={handleChange} />
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={40} minSize={20} className="bg-zinc-100 p-2">
            <PreviewPane code={code} onOpenNewTab={handleOpenPreview} />
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      <Footer onClear={handleReset} onDownload={handleDownload} />
    </div>
  );
}

export default memo(MobileEditor);
