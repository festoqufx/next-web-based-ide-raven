"use client";
import Editor from "@/components/Editor";
import MobileEditor from "@/components/MobileEditor";
import useMediaQuery from '../hooks/useMediaQuery';
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Page() {
  const screenSize = useMediaQuery("768");
  const [preload, setPreload] = useState(true);

  useEffect(() => {
    setPreload(false);
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#f8f8f8_0%,_#e8e8e8_36%,_#111111_100%)] p-3 sm:p-4 lg:p-6">
      <div className="mx-auto flex h-[calc(100vh-1.5rem)] max-w-7xl flex-col overflow-hidden rounded-[32px] border border-black/10 bg-white/85 shadow-[0_30px_120px_rgba(0,0,0,0.18)] backdrop-blur-xl">
        <header className="flex items-center justify-between border-b border-black/10 bg-white/85 px-4 py-4 shadow-[0_1px_0_rgba(0,0,0,0.04)] sm:px-6">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">NEXT IDE</p>
            <h1 className="text-lg font-semibold tracking-tight text-zinc-950">Craft polished web experiences</h1>
          </div>
          <div className="rounded-full border border-black/10 bg-zinc-950 px-3 py-1 text-xs font-medium text-white shadow-sm">
            Minimal • Fast • Focused
          </div>
        </header>
        <div className="flex-1 overflow-hidden">
          {!screenSize ? <Editor /> : <MobileEditor />}
        </div>
      </div>
      {preload && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/90 px-4 py-2 shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-950" />
            <span className="text-sm font-medium text-zinc-700">Preparing workspace…</span>
          </div>
        </div>
      )}
    </main>
  )
};