"use client";
import Editor from "@/components/Editor";
import MobileEditor from "@/components/MobileEditor";
import useMediaQuery from "../hooks/useMediaQuery";
import { Loader2, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";

export default function Page() {
  const screenSize = useMediaQuery("768");
  const [preload, setPreload] = useState(true);

  useEffect(() => {
    setPreload(false);
  }, []);

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_#ffffff_0%,_#ececec_42%,_#0a0a0a_130%)] p-3 sm:p-4 lg:p-6">
      <div className="mx-auto flex h-[calc(100vh-1.5rem)] max-w-7xl flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white/70 shadow-[0_30px_90px_rgba(0,0,0,0.16)] backdrop-blur-xl">
        <header className="flex items-center justify-between gap-3 border-b border-black/10 bg-white/80 px-4 py-4 sm:px-6">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-black/10 bg-black text-white shadow-sm">
              <svg
                viewBox="0 0 24 24"
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden
              >
                <path d="m8 6-6 6 6 6" />
                <path d="m16 6 6 6-6 6" />
                <path d="m13 3-2 18" />
              </svg>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-zinc-500">
                NEXT IDE
              </p>
              <h1 className="truncate text-lg font-semibold tracking-tight text-zinc-950">
                Craft polished web experiences
              </h1>
            </div>
          </div>
          <div className="flex shrink-0 items-center gap-1.5 rounded-full border border-black/10 bg-zinc-50 px-3 py-1.5 text-xs font-medium text-zinc-600">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Minimal · Fast · Focused
          </div>
        </header>

        <div className="min-h-0 flex-1 overflow-hidden">
          {!screenSize ? <Editor /> : <MobileEditor />}
        </div>
      </div>

      {preload && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 backdrop-blur-sm">
          <div className="flex items-center gap-3 rounded-full border border-black/10 bg-white/95 px-4 py-2 shadow-lg">
            <Loader2 className="h-5 w-5 animate-spin text-zinc-950" />
            <span className="text-sm font-medium text-zinc-700">
              Preparing workspace…
            </span>
          </div>
        </div>
      )}
    </main>
  );
}
