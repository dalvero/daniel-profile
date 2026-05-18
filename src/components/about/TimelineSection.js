"use client";

import { useState, useRef, useEffect, forwardRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import Image from "next/image";
import BlurText from "./BlurText";

const FOCUS_AREAS = [
  { id: "branding", label: "Branding", image: "/images/formal_daniel.png" },
  { id: "art-direction", label: "Art Direction", image: "/images/formal_daniel.png" },
  { id: "visual-design", label: "Visual Design", image: "/images/daniel.jpeg" },
  { id: "graphic-design", label: "Graphic Design", image: "/images/formal_daniel.png" },
  { id: "interactive-design", label: "Interactive Design", image: "/images/formal_daniel.png" },
];

const NUM_ITEMS = FOCUS_AREAS.length;

export default function TimelineSection() {
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

  // List translateY langsung dari scroll
  const listY = useTransform(scrollYProgress, [0, 1], [0, -(NUM_ITEMS - 1) * 60]);

  return (
    <section
      ref={sectionRef}
      id="about-timeline"
      className="pt-50 relative"
      style={{ background: "#0a0a0a", height: "200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 h-full">

          {/* Kiri, Image */}
          <div className="relative hidden lg:flex items-center justify-center px-12 xl:px-20">
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={FOCUS_AREAS[activeIndex].image}
                alt={FOCUS_AREAS[activeIndex].label}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover grayscale"
                style={{
                  opacity: 1,
                  transition: "opacity 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Kanan, Focus List */}
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

            {/* List translateY driven by smooth scroll */}
            <motion.div
              className="h-full flex flex-col justify-center pt-10 px-6 lg:px-10"
              style={{ y: listY }}
            >
              {/* Label */}
              <div className="mb-6">
                <BlurText
                  text="Timeline."
                  stagger={0.03}
                  className="text-[10px] tracking-[0.5em] uppercase text-zinc-500 font-[family-name:var(--font-inter)]"
                />
              </div>

              {FOCUS_AREAS.map((area, i) => (
                <FocusItem
                  key={area.id}
                  label={area.label}
                  index={i}
                  ref={(el) => (itemRefs.current[i] = el)}
                />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

const FocusItem = forwardRef(function FocusItem({ label }, ref) {
  return (
    <div
      ref={ref}
      style={{
        color: "#71717a",
        opacity: 0.25,
        transition: "color 0.3s ease, opacity 0.3s ease, filter 0.3s ease",
        padding: "0.2rem 0",
        lineHeight: 1,
        cursor: "default",
        userSelect: "none",
      }}
    >
      <span
        className="font-[family-name:var(--font-inter)] leading-none text-4xl"
        style={{
          letterSpacing: "0.01em",
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </div>
  );
});
