"use client";
import { useEffect, useCallback, memo } from 'react';
import { download } from '@/lib/download';
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from '@uiw/react-codemirror';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import Footer from '@/components/Footer';
import { Button } from './ui/button';
import { PanelTop, Save, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { cmOptions } from '@/lib/cmOptions';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import useCodes from '@/hooks/useCodes';
import useHtml from '@/hooks/useHtml';
import useCss from '@/hooks/useCss';
import useJs from '@/hooks/useJs';

const codeTypes = ['html', 'css', 'javascript'];

const Editor = () => {
    const [html, setHtmlValue] = useHtml("");
    const [css, setCssValue] = useCss("");
    const [js, setJsValue] = useJs("");
    const [code, setCodesValue] = useCodes("");

    const handleDownload = useCallback(() => {
        download({ src: code });
        toast.success("Downloaded!");
    }, [code]);

    const compileCode = useCallback(() => {
        setCodesValue(`
            <!DOCTYPE html>
            <html lang="en">
                <head></head>
                <style>* { margin: 0; padding: 0; box-sizing: border-box; }${css}</style>
                <body>
                    <div>${html}</div>
                    <script>${js}</script>
                </body>
            </html>
        `);
    }, [html, css, js, setCodesValue]);

    useEffect(() => {
        compileCode();
    }, [html, css, js, compileCode]);

    const handleChange = useCallback((val, type) => {
        if (type === 'html') setHtmlValue(val);
        else if (type === 'css') setCssValue(val);
        else setJsValue(val);
    }, [setHtmlValue, setCssValue, setJsValue]);

    const renderCodePanel = useCallback((type) => {
        const label = type === 'html' ? 'Markup' : type === 'css' ? 'Styles' : 'Logic';
        return (
            <ResizablePanel key={type} defaultSize={32}>
                <div className="flex h-full flex-col bg-zinc-50">
                    <div className="flex items-center justify-between border-b border-black/10 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                        <span>{type.toUpperCase()}</span>
                        <span>{label}</span>
                    </div>
                    <ScrollArea className="flex-1">
                        <CodeMirror
                            {...cmOptions}
                            value={type === 'html' ? html : (type === 'css' ? css : js)}
                            placeholder={type.toUpperCase()}
                            onChange={(val) => handleChange(val, type)}
                            extensions={[loadLanguage(type)]}
                        />
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
            </ResizablePanel>
        );
    }, [html, css, js, handleChange]);

    return (
        <div className="flex h-full flex-col bg-[linear-gradient(135deg,_#f8f8f8_0%,_#eeeeee_100%)]">
            <div className="flex items-center justify-between border-b border-black/10 bg-white/70 px-4 py-3 text-sm text-zinc-700">
                <div className="flex items-center gap-2">
                    <div className="rounded-full border border-black/10 bg-black p-2 text-white">
                        <PanelTop className="h-4 w-4" />
                    </div>
                    <div>
                        <p className="font-semibold text-zinc-950">Workspace</p>
                        <p className="text-xs text-zinc-500">Three panes for fast iteration</p>
                    </div>
                </div>
                <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-zinc-50 px-3 py-1 text-xs font-medium text-zinc-600 sm:flex">
                    <Sparkles className="h-3.5 w-3.5" />
                    Monochrome preview
                </div>
            </div>
            <ResizablePanelGroup direction="vertical" className="flex-1">
                <ResizablePanel defaultSize={60}>
                    <ResizablePanelGroup direction="horizontal" className="h-full">
                        {renderCodePanel("html")}
                        <ResizableHandle withHandle />
                        {renderCodePanel("css")}
                        <ResizableHandle withHandle />
                        {renderCodePanel("javascript")}
                    </ResizablePanelGroup>
                </ResizablePanel>

                <ResizableHandle withHandle />

                <ResizablePanel defaultSize={40} className="bg-zinc-100 p-2">
                    <div className="flex h-full flex-col overflow-hidden rounded-[20px] border border-black/10 bg-white shadow-inner">
                        <div className="flex items-center justify-between border-b border-black/10 bg-zinc-50 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                            <span>Preview</span>
                            <span>Live</span>
                        </div>
                        <iframe className="h-full w-full bg-white" srcDoc={code} />
                    </div>
                </ResizablePanel>
                <Footer onClear={() => { setHtmlValue(""); setCssValue(""); setJsValue(""); setCodesValue(""); }} >
                    <Button size="icon" variant="outline" onClick={handleDownload} className="border-black/10 bg-black text-white hover:bg-white hover:text-black"><Save className="h-4 w-4" /></Button>
                </Footer>
            </ResizablePanelGroup>
        </div>
    );
};

export default memo(Editor);