"use client";
import { useState, useEffect } from "react";

export default function useMediaQuery(width) {
  const query = `(max-width: ${width}px)`;
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    const update = (e) => setMatches(e.matches);

    setMatches(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, [query]);

  return matches;
}