"use client";

import { useEffect, useState } from "react";

function readReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function readLiteAnimations(reducedMotion: boolean): boolean {
  if (typeof window === "undefined") return false;
  return (
    reducedMotion ||
    window.matchMedia("(pointer: coarse)").matches ||
    window.matchMedia("(max-width: 1023px)").matches
  );
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(readReducedMotion);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);

    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useLiteAnimations(): boolean {
  const reducedMotion = useReducedMotion();
  const [lite, setLite] = useState(() => readLiteAnimations(reducedMotion));

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)");
    const narrow = window.matchMedia("(max-width: 1023px)");

    const update = () => setLite(readLiteAnimations(reducedMotion));

    update();
    coarse.addEventListener("change", update);
    narrow.addEventListener("change", update);
    return () => {
      coarse.removeEventListener("change", update);
      narrow.removeEventListener("change", update);
    };
  }, [reducedMotion]);

  return lite;
}
