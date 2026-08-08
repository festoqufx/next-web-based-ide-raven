import React from "react";
import { GitFork, Star } from "lucide-react";
import { Button } from "./ui/button";

export default function Footer({ onClear = () => { }, children }) {
    return (
        <footer className="flex items-center justify-between gap-2 border-t border-black/10 bg-zinc-50/90 px-3 py-3 sm:px-6">
            <div className="flex items-center gap-2.5">
                <span className="rounded-full border border-black/10 bg-white px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.32em] text-zinc-700 shadow-sm">
                    NEXT IDE
                </span>
                <span className="hidden text-xs font-medium text-zinc-500 sm:inline">Minimal • Focused • Polished</span>
            </div>
            <div className="flex items-center gap-2">
                <Button size="icon" asChild variant="outline" className="h-9 w-9 border-black/10 bg-white text-black shadow-sm hover:bg-black hover:text-white"><a target="_blank" href="https://github.com/festoqufx/next-web-based-ide-raven"><Star className="h-4 w-4" /></a></Button>
                <Button size="icon" asChild variant="outline" className="h-9 w-9 border-black/10 bg-white text-black shadow-sm hover:bg-black hover:text-white"><a target="_blank" href="https://github.com/festoqufx/next-web-based-ide-raven/fork"><GitFork className="h-4 w-4" /></a></Button>
                <Button size="sm" variant="outline" onClick={onClear} className="border-black/10 bg-white text-black shadow-sm hover:bg-black hover:text-white">Clear</Button>
                {children}
            </div>
        </footer>
    )
}