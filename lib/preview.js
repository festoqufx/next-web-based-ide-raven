/**
 * Opens compiled HTML in a new browser tab using a temporary blob URL.
 * The URL is cleaned up shortly after navigation so memory is freed.
 */
export const openInNewTab = (src) => {
  const url = URL.createObjectURL(
    new Blob([src], { type: "text/html" })
  );
  window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 30000);
};
