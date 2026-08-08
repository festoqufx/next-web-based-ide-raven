"use client";
import { useState, useEffect, useMemo, useCallback,memo } from 'react';
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { toast } from 'sonner';
import { download } from '@/lib/download';
import { loadLanguage } from "@uiw/codemirror-extensions-langs";
import CodeMirror from '@uiw/react-codemirror';
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable";
import Footer from '@/components/Footer';
import { Button } from './ui/button';
import { Copy, Save } from 'lucide-react';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cmOptions } from '@/lib/cmOptions';
import useCodes from '@/hooks/useCodes';
import useHtml from '@/hooks/useHtml';
import useCss from '@/hooks/useCss';
import useJs from '@/hooks/useJs';
import { debounced } from '@/lib/debounced';

function MobileEditor() {
    const [html, setHtmlValue] = useHtml("");
    const [css, setCssValue] = useCss("");
    const [js, setJsValue] = useJs("");
    const [currTab, setCurrTab] = useState("html");
    const [code, setCodesValue] = useCodes();

    const handleDownload = useCallback(() => {
        download({ src: code });
        toast.success("Downloaded!");
    }, [code]);

    const compileCode = useMemo(
        () => debounced(() => {
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
        }, 0),
        [html, css, js, setCodesValue]
    );

    useEffect(() => {
        compileCode();
    }, [compileCode]);

    return (
        <div className="flex h-full flex-col bg-[linear-gradient(135deg,_#f8f8f8_0%,_#eeeeee_100%)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 bg-white/70 px-3 py-3 md:px-4">
                <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-zinc-500">Mobile workspace</p>
                    <p className="text-sm font-semibold text-zinc-950">Switch between HTML, CSS, and JavaScript</p>
                </div>
                <div className="flex items-center gap-2">
                    <ToggleGroup size="sm" type="single" value={currTab} onValueChange={(value) => value && setCurrTab(value)} className="rounded-full border border-black/10 bg-white p-1 shadow-sm">
                        <ToggleGroupItem className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] data-[state=on]:bg-black data-[state=on]:text-white" value="html">HTML</ToggleGroupItem>
                        <ToggleGroupItem className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] data-[state=on]:bg-black data-[state=on]:text-white" value="css">CSS</ToggleGroupItem>
                        <ToggleGroupItem className="rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] data-[state=on]:bg-black data-[state=on]:text-white" value="javascript">JS</ToggleGroupItem>
                    </ToggleGroup>
                    <Button size="icon" variant="outline" onClick={() => { navigator.clipboard.writeText(currTab === "html" ? html : (currTab === "css" ? css : js)).then(() => { toast.success(`Copied ${currTab} code`); }); }} className="border-black/10 bg-black text-white hover:bg-white hover:text-black"><Copy className="h-[15px] w-[15px]" /></Button>
                </div>
            </div>
            <ResizablePanelGroup direction="vertical" className="flex-1">
                <ResizablePanel defaultSize={60}>
                    <div className="flex h-full flex-col bg-zinc-50">
                        <div className="flex items-center justify-between border-b border-black/10 bg-white/90 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">
                            <span>{currTab.toUpperCase()}</span>
                            <span>Editor</span>
                        </div>
                        <ScrollArea className="flex-1">
                            <CodeMirror
                                value={currTab === "html" ? html : (currTab === "css" ? css : js)}
                                placeholder={currTab.toUpperCase()}
                                onChange={(val) => { currTab === "html" ? setHtmlValue(val) : (currTab === "css" ? setCssValue(val) : setJsValue(val)); }}
                                extensions={[loadLanguage(currTab)]}
                                {...cmOptions}
                            />
                            <ScrollBar orientation="horizontal" />
                        </ScrollArea>
                    </div>
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
}

export default memo(MobileEditor);