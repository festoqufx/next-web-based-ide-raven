"use client";
import { useState, useCallback } from "react";

/**
 * useState that transparently persists its value to localStorage.
 * Safe for SSR: on first render (server / before hydration snapshot) the
 * provided initial value is used; the stored value is read lazily on mount.
 */
export default function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const stored = window.localStorage.getItem(key);
      return stored !== null ? stored : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setter = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === "function" ? next(prev) : next;
        try {
          window.localStorage.setItem(key, resolved);
        } catch {
          // Ignore storage errors (private mode / quota).
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setter];
}
