"use client";
import { useState, useEffect, useCallback } from "react";
import { Share2, Copy, Check, X } from "lucide-react";
import { Button } from "./ui/button";
import { copyShareLink } from "@/lib/sharing";
import { toast } from "sonner";

export default function ShareCodeDialog({ codeState }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateShare = async () => {
    setIsLoading(true);
    try {
      const url = await copyShareLink(codeState);
      setShareUrl(url);
      setCopied(true);
      toast.success("Share link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error(error?.message || "Failed to generate share link");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyShareUrl = useCallback(async () => {
    if (!navigator?.clipboard) {
      toast.error("Clipboard API is unavailable in this browser");
      return;
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast.success("Copied!");
    } catch (error) {
      toast.error("Could not copy share link");
    }
  }, [shareUrl]);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen]);

  return (
    <>
      <Button
        size="icon"
        variant="ghost"
        className="h-9 w-9 text-zinc-600 dark:text-zinc-400"
        onClick={() => setIsOpen(true)}
        title="Share code"
      >
        <Share2 className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-zinc-200 bg-white p-6 shadow-2xl dark:border-zinc-800 dark:bg-zinc-950">
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white">
                Share Your Code
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
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Generate a shareable link containing all your code. Anyone with the link can view and edit your code.
              </p>

              {!shareUrl ? (
                <Button
                  onClick={handleGenerateShare}
                  disabled={isLoading}
                  className="w-full"
                >
                  {isLoading ? "Generating..." : "Generate Share Link"}
                </Button>
              ) : (
                <>
                  <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-3 dark:border-zinc-800 dark:bg-zinc-900/50">
                    <p className="break-all font-mono text-[11px] text-zinc-600 dark:text-zinc-400">
                      {shareUrl}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      onClick={handleGenerateShare}
                      variant="outline"
                      className="flex-1"
                      title="Generate new share link"
                    >
                      <Share2 className="h-3.5 w-3.5" />
                      <span className="hidden sm:inline">New Link</span>
                    </Button>
                    <Button
                      onClick={handleCopyShareUrl}
                      className="flex-1 gap-1"
                    >
                      {copied ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Copied</span>
                        </>
                      ) : (
                        <>
                          <Copy className="h-3.5 w-3.5" />
                          <span>Copy</span>
                        </>
                      )}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
