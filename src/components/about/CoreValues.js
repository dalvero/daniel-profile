// AboutIntro.jsx — Stacking cards + scroll-driven spotlight
"use client";

import { useState, useRef, useEffect } from "react";
import { useScroll, useMotionValueEvent } from "framer-motion";

const FOCUS_AREAS = [
  { id: "who", label: "Dibuat oleh manusia, dibentuk untuk manusia.", ask: "Who." },
  { id: "what", label: "Produk digital bukan sekadar kode, ia adalah pengalaman.", ask: "What." },
  { id: "why", label: "Karena kesan pertama hanya terjadi sekali.", ask: "Why." },
  { id: "how", label: "Jangan ubah esensinya, ubah cara menyajikannya.", ask: "How." },
];

const NUM_ITEMS = FOCUS_AREAS.length;

export default function CoreValues() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const rafId = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Spotlight logic shared between scroll handler and mount
  function applySpotlight(idx) {
    for (let i = 0; i < NUM_ITEMS; i++) {
      const el = itemRefs.current[i];
      if (!el) continue;

      const dist = Math.abs(i - idx);

      if (i === idx) {
        el.style.color = "#ffffff";
        el.style.opacity = "1";
        el.style.filter = "blur(0px)";
      } else {
        const normalized = Math.min(dist / 2.5, 1);
        const opacity = Math.max(0.08, 0.3 - normalized * 0.22);
        const blur = Math.round(normalized * 2.5);
        el.style.color = "#71717a";
        el.style.opacity = opacity.toFixed(2);
        el.style.filter = `blur(${blur}px)`;
      }
    }
  }

  // Set initial spotlight on mount item 0 langsung aktif
  useEffect(() => {
    // Delay kecil agar refs sudah ter-assign
    const timer = requestAnimationFrame(() => {
      applySpotlight(0);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  // Update spotlight — pakai raw scroll supaya responsif
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      const idx = Math.round(latest * (NUM_ITEMS - 1));
      setActiveIndex(idx);
      applySpotlight(idx);
    });
  });

  return (
    <section
      ref={sectionRef}
      id="about-values"
      className="pt-50 relative"
      style={{ background: "#0a0a0a", height: "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

          {/* Kiri, Core Values */}
          <div className="relative hidden lg:flex items-center justify-center px-12 xl:px-20">
            <div
              className="relative w-full flex flex-col text-left justify-end pl-50 gap-0"
            >
              {/* Judul Kecil -> Core Values */}
              <span className="text-white font-[family-name:var(--font-inter)] leading-none -mb-2">Core Values</span>
              <h1 className="text-[9rem] opacity-50 tracking-[8px] text-white font-[family-name:var(--font-league-gothic)] leading-none m-0" >{FOCUS_AREAS[activeIndex].ask}</h1>
            </div>
          </div>

          {/* Kanan, Paragraf Sesuai Core Values */}
          <div className="relative h-full overflow-hidden">
            {/* Fade masking */}
            <div
              className="absolute top-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: "25%",
                background: "linear-gradient(to bottom, #0a0a0a 0%, transparent 100%)",
              }}
            />
            <div
              className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none"
              style={{
                height: "25%",
                background: "linear-gradient(to top, #0a0a0a 0%, transparent 100%)",
              }}
            />

            {/* Paragraph spotlight per sentence */}
            <div className="h-full flex flex-col justify-center px-10 lg:px-16">
              <p className="text-4xl font-medium lg:text-4xl font-[family-name:var(--font-inter)] text-white">
                {FOCUS_AREAS.map((area, i) => (
                  <span key={area.id}>
                    <span
                      ref={(el) => (itemRefs.current[i] = el)}
                      style={{
                        opacity: i === 0 ? 1 : 0.2,
                        transition: "opacity 0.4s ease, filter 0.4s ease",
                      }}
                    >
                      {area.label}
                    </span>
                    {i < NUM_ITEMS - 1 ? " " : ""}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
