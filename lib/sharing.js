/**
 * Code sharing utilities - encode/decode code state in URL.
 */
const MAX_SHARE_LENGTH = 120000;

function normalizeCodeState(codeState) {
  if (!codeState || typeof codeState !== "object") {
    return null;
  }

  const html = typeof codeState.html === "string" ? codeState.html : "";
  const css = typeof codeState.css === "string" ? codeState.css : "";
  const js = typeof codeState.js === "string" ? codeState.js : "";

  return { html, css, js };
}

function bytesToBase64(bytes) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });
  return btoa(binary);
}

function base64ToBytes(base64) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

function encodeBase64Url(text) {
  const bytes = new TextEncoder().encode(text);
  return bytesToBase64(bytes)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function decodeBase64Url(encoded) {
  const normalized = encoded.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized + "=".repeat((4 - (normalized.length % 4)) % 4);
  const bytes = base64ToBytes(padded);
  return new TextDecoder().decode(bytes);
}

/**
 * Encode code state to base64 URL parameter.
 */
export const encodeCodeToUrl = (codeState) => {
  try {
    const normalized = normalizeCodeState(codeState);
    if (!normalized) return null;
    const encoded = encodeBase64Url(JSON.stringify(normalized));
    if (encoded.length > MAX_SHARE_LENGTH) {
      throw new Error("The code is too large to share as a URL");
    }
    return `${window.location.origin}?code=${encoded}`;
  } catch (error) {
    console.error("Failed to encode code:", error);
    return null;
  }
};

/**
 * Decode code state from URL parameter.
 */
export const decodeCodeFromUrl = () => {
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("code");
    if (!encoded) return null;

    const decoded = decodeBase64Url(encoded);
    const parsed = JSON.parse(decoded);

    return normalizeCodeState(parsed);
  } catch (error) {
    console.error("Failed to decode code:", error);
    return null;
  }
};

/**
 * Copy share link to clipboard.
 */
export const copyShareLink = async (codeState) => {
  const shareUrl = encodeCodeToUrl(codeState);
  if (!shareUrl) {
    throw new Error("Failed to build share URL");
  }
  if (!navigator?.clipboard) {
    throw new Error("Clipboard API is unavailable in this browser");
  }

  await navigator.clipboard.writeText(shareUrl);
  return shareUrl;
};
