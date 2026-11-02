"use client";
import { toast } from "sonner";

/**
 * Import HTML file and extract HTML, CSS, and JS from it
 */
export const importHtmlFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const htmlContent = e.target.result;
        const doc = new DOMParser().parseFromString(htmlContent, "text/html");
        
        // Extract CSS from style tags and style attributes
        const styleTags = Array.from(doc.querySelectorAll("style"));
        const css = styleTags.map(tag => tag.textContent).join("\n\n");
        
        // Extract JS from script tags (excluding first one if it contains IDE logic)
        const scriptTags = Array.from(doc.querySelectorAll("script"));
        const js = scriptTags.map(tag => tag.textContent).join("\n\n");
        
        // Get body content as HTML
        const html = doc.body.innerHTML;
        
        resolve({ html, css, js });
        toast.success("File imported successfully");
      } catch (error) {
        reject(error);
        toast.error("Failed to import file");
      }
    };
    
    reader.onerror = () => {
      reject(new Error("File read error"));
      toast.error("Could not read file");
    };
    
    reader.readAsText(file);
  });
};

/**
 * Export individual CSS file
 */
export const exportCssFile = (css, filename = "styles.css") => {
  const blob = new Blob([css], { type: "text/css" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success("CSS file downloaded");
};

/**
 * Export individual JS file
 */
export const exportJsFile = (js, filename = "script.js") => {
  const blob = new Blob([js], { type: "text/javascript" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success("JS file downloaded");
};

/**
 * Export individual HTML file (body only)
 */
export const exportHtmlBodyFile = (html, filename = "body.html") => {
  const blob = new Blob([html], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
  toast.success("HTML file downloaded");
};
