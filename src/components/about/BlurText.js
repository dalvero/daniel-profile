"use client";

import { useRef } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

// BlurText — scroll-driven blur reveal
// Per-word grouping, no initial blur, rAF batched

export default function BlurText({
  text = "",
  className = "",
  direction = "top",
  stagger = 0.003,
}) {
  // Split per word, simpan posisi char offset per word untuk stagger calculation
  const words = text.split(/\s+/).reduce((acc, word) => {
    const prevEnd = acc.length > 0 ? acc[acc.length - 1].charEnd : 0;
    acc.push({ text: word, charStart: prevEnd, charEnd: prevEnd + word.length });
    return acc;
  }, []);

  // Normalize stagger: ensure last word finishes before progress=1
  // transition window per word = 0.08
  const TRANSITION_WINDOW = 0.08;
  const totalChars = words.length > 0 ? words[words.length - 1].charEnd : 1;
  const effectiveStagger = Math.min(stagger, (1 - TRANSITION_WINDOW) / totalChars);

  const containerRef = useRef(null);
  const wordRefs = useRef([]);
  const rafId = useRef(null);
  const pendingValue = useRef(null);
  // Track state per word to avoid redundant style writes
  const prevState = useRef(new Int8Array(words.length)); // 0=hidden, 1=transitioning, 2=visible

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.2"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    pendingValue.current = latest;
    if (rafId.current) return;

    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const value = pendingValue.current;
      if (value == null) return;

      const yOffset = direction === "top" ? -40 : 40;

      for (let i = 0; i < words.length; i++) {
        const el = wordRefs.current[i];
        if (!el) continue;

        // Gunakan charStart word untuk stagger
        const start = words[i].charStart * effectiveStagger;
        const end = start + 0.08;
        const t = Math.min(Math.max((value - start) / (end - start), 0), 1);

        // Determine state: 0=hidden, 1=transitioning, 2=visible
        let state;
        if (t === 0) state = 0;
        else if (t === 1) state = 2;
        else state = 1;

        // Skip if state unchanged (no visual change needed)
        if (prevState.current[i] === state && state !== 1) continue;
        prevState.current[i] = state;

        if (state === 0) {
          // Hidden — no blur, just invisible
          el.style.willChange = "";
          el.style.filter = "none";
          el.style.opacity = "0";
          el.style.transform = `translateY(${yOffset}px)`;
          continue;
        }

        if (state === 2) {
          // Visible — clean up all animation styles
          el.style.willChange = "";
          el.style.filter = "none";
          el.style.opacity = "1";
          el.style.transform = "translateY(0)";
          continue;
        }

        // Actively transitioning
        el.style.willChange = "transform, filter, opacity";

        let blur, opacity, y;
        if (t < 0.5) {
          const p = t * 2;
          blur = 10 - p * 5;
          opacity = p * 0.5;
          y = yOffset * (1 - p) + (yOffset > 0 ? 3 : -3) * p;
        } else {
          const p = (t - 0.5) * 2;
          blur = 5 - p * 5;
          opacity = 0.5 + p * 0.5;
          y = (yOffset > 0 ? 3 : -3) * (1 - p);
        }

        el.style.filter = `blur(${blur.toFixed(1)}px)`;
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translateY(${y.toFixed(1)}px)`;
      }
    });
  });

  return (
    <p ref={containerRef} className={`blur-text ${className} flex flex-wrap`}>
      {words.map((word, i) => (
        <span
          key={i}
          ref={(el) => (wordRefs.current[i] = el)}
          className="inline-block"
          style={{
            opacity: 0,
            transform: `translateY(${direction === "top" ? -40 : 40}px)`,
          }}
        >
          {word.text}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
