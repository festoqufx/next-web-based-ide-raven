"use client";
import { useRef } from "react";
import { Upload } from "lucide-react";
import { Button } from "./ui/button";
import { importHtmlFile } from "@/lib/fileOperations";
import { toast } from "sonner";

export default function FileImport({ onImport }) {
  const fileInputRef = useRef(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".html")) {
      toast.error("Please select an HTML file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    try {
      const { html, css, js } = await importHtmlFile(file);
      onImport({ html, css, js });
    } catch (error) {
      toast.error("Failed to import file: " + error.message);
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept=".html"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Import HTML file"
      />
      <Button
        size="sm"
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        className="gap-2"
        title="Import HTML file"
      >
        <Upload className="h-3.5 w-3.5" />
        <span className="hidden sm:inline">Import</span>
      </Button>
    </>
  );
}
