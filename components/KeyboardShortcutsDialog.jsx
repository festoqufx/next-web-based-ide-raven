"use client";
import { useState } from "react";
import { HelpCircle, X } from "lucide-react";
import { Button } from "./ui/button";

const SHORTCUTS = [
  { keys: ["Ctrl/Cmd", "+", "S"], action: "Download compiled HTML" },
  { keys: ["Ctrl/Cmd", "+", "Enter"], action: "Open preview in new tab" },
  { keys: ["Ctrl/Cmd", "+", "Shift", "+", "F"], action: "Format all code" },
  { keys: ["Ctrl/Cmd", "+", "Shift", "+", "?"], action: "Show keyboard shortcuts" },
  { keys: ["Esc"], action: "Close dialogs" },
];

export default function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  // Register global keyboard shortcut
  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "?") {
      e.preventDefault();
      setIsOpen(!isOpen);
    }
  };

  // Effect hook is not needed here; this would be handled in parent component
  
  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 text-zinc-600 dark:text-zinc-400"
        onClick={() => setIsOpen(true)}
        title="Keyboard shortcuts (Ctrl+Shift+?)"
      >
        <HelpCircle className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="max-h-[80vh] w-full max-w-md overflow-y-auto rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Keyboard Shortcuts
              </h2>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setIsOpen(false)}
                className="h-7 w-7"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="space-y-4">
              {SHORTCUTS.map((shortcut, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between gap-4 rounded-lg bg-zinc-50 p-3 dark:bg-zinc-900/50"
                >
                  <span className="flex gap-1">
                    {shortcut.keys.map((key, i) => (
                      <span key={i}>
                        {i > 0 && <span className="mx-1 text-zinc-400">+</span>}
                        <kbd className="inline-block rounded border border-zinc-300 bg-white px-2 py-1 text-[11px] font-semibold text-zinc-700 shadow-sm dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
                          {key}
                        </kbd>
                      </span>
                    ))}
                  </span>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    {shortcut.action}
                  </span>
                </div>
              ))}
            </div>

            <p className="mt-6 text-center text-[11px] text-zinc-500 dark:text-zinc-400">
              Press Ctrl/Cmd+Shift+? to toggle this dialog
            </p>
          </div>
        </div>
      )}
    </>
  );
}
