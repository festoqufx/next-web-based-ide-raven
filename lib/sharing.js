/**
 * Code sharing utilities - encode/decode code state in URL
 */

/**
 * Encode code state to base64 URL parameter
 */
export const encodeCodeToUrl = ({ html, css, js }) => {
  try {
    const codeState = JSON.stringify({ html, css, js });
    const encoded = btoa(unescape(encodeURIComponent(codeState)));
    return `${window.location.origin}?code=${encoded}`;
  } catch (error) {
    console.error("Failed to encode code:", error);
    return null;
  }
};

/**
 * Decode code state from URL parameter
 */
export const decodeCodeFromUrl = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("code");
    
    if (!encoded) return null;
    
    const decoded = decodeURIComponent(escape(atob(encoded)));
    const codeState = JSON.parse(decoded);
    
    return codeState;
  } catch (error) {
    console.error("Failed to decode code:", error);
    return null;
  }
};

/**
 * Copy share link to clipboard
 */
export const copyShareLink = async (codeState) => {
  try {
    const shareUrl = encodeCodeToUrl(codeState);
    if (!shareUrl) throw new Error("Failed to encode code");
    
    await navigator.clipboard.writeText(shareUrl);
    return shareUrl;
  } catch (error) {
    console.error("Failed to copy share link:", error);
    throw error;
  }
};
