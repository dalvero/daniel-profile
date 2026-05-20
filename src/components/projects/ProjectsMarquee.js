"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const MARQUEE_ITEMS = [
  "Web Development",
  "Mobile Apps",
  "Java",
  "IoT",
  "UI Design",
  "Flutter",
  "Next.js",
  "TailwindCSS",
  "Firebase",
  "Arduino",
  "Laravel",
  "MySQL",
  "Figma",
  "Competition",
  "Research",
];

const ITEMS = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

function MarqueeTrack({ hoveredIndex, setHoveredIndex }) {
  const trackRef = useRef(null);
  const offsetRef = useRef(0);
  const speedRef = useRef(1.2);
  const targetSpeedRef = useRef(1.2);
  const rafRef = useRef(null);
  const lastScrollY = useRef(0);
  const directionRef = useRef(1);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const itemWidth = 280;
    const totalWidth = MARQUEE_ITEMS.length * itemWidth;

    const animate = () => {
      speedRef.current +=
        (targetSpeedRef.current - speedRef.current) * 0.08;

      if (hoveredIndex === null) {
        offsetRef.current += speedRef.current;
      }

      if (offsetRef.current >= totalWidth) {
        offsetRef.current -= totalWidth;
      } else if (offsetRef.current < 0) {
        offsetRef.current += totalWidth;
      }

      track.style.transform = `translate3d(${-offsetRef.current}px, 0, 0)`;
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    const handleScroll = () => {
      const currentY = window.scrollY;
      const delta = currentY - lastScrollY.current;

      if (delta > 0) {
        directionRef.current = 1;
        targetSpeedRef.current = 5;
      } else if (delta < 0) {
        directionRef.current = -1;
        targetSpeedRef.current = -5;
      }

      clearTimeout(window._marqueeScrollTimer);
      window._marqueeScrollTimer = setTimeout(() => {
        targetSpeedRef.current = 1.2 * directionRef.current;
      }, 300);

      lastScrollY.current = currentY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [hoveredIndex]);

  return (
    <div
      ref={trackRef}
      className="flex items-center gap-12 px-6 will-change-transform"
      style={{ width: "max-content" }}
    >
      {ITEMS.map((item, i) => (
        <div
          key={i}
          className="flex items-center gap-12 shrink-0"
          onMouseEnter={() => setHoveredIndex(i)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <span
            className={`text-2xl lg:text-4xl font-normal tracking-[3] uppercase transition-colors duration-500 cursor-default whitespace-nowrap ${
              hoveredIndex === i
                ? "text-white/60"
                : "text-white/[0.06]"
            }`}
          >
            {item}
          </span>
          <span className="text-white/10 text-xl select-none">+</span>
        </div>
      ))}
    </div>
  );
}

export default function ProjectsMarquee() {
  const sectionRef = useRef(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Header reveal/unreveal
  const headerOpacity = useTransform(smoothProgress, [0, 0.2, 0.35, 0.8, 1], [0, 1, 1, 1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.25, 0.35, 0.8, 1], [20, 0, 0, 0, -15]);
  const headerBlur = useTransform(smoothProgress, [0, 0.2, 0.35, 0.8, 1], [3, 0, 0, 0, 3]);

  // Track area reveal/unreveal (slightly delayed)
  const trackOpacity = useTransform(smoothProgress, [0, 0.25, 0.4, 0.75, 1], [0, 1, 1, 1, 0]);
  const trackY = useTransform(smoothProgress, [0, 0.3, 0.4, 0.75, 1], [30, 0, 0, 0, -20]);
  const trackScale = useTransform(smoothProgress, [0, 0.3, 0.4, 0.75, 1], [0.95, 1, 1, 1, 0.97]);

  // Bottom line reveal
  const lineOpacity = useTransform(smoothProgress, [0, 0.35, 0.5, 0.7, 1], [0, 1, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="projects-marquee"
      className="relative py-20 overflow-hidden select-none"
      style={{ background: "#0a0a0a" }}
    >
      {/* Header — scroll-driven reveal + unreveal */}
      <motion.div
        className="flex items-center justify-center gap-10 mb-12"
        style={{
          opacity: headerOpacity,
          y: headerY,
          filter: useTransform(headerBlur, (v) => `blur(${v}px)`),
        }}
      >
        <div className="w-80 h-px bg-white/10" />
        <h2 className="text-white text-3xl font-normal uppercase tracking-[1]">
          Categories
        </h2>
        <div className="w-80 h-px bg-white/10" />
      </motion.div>

      {/* Marquee container — scroll-driven reveal + unreveal */}
      <motion.div
        className="relative w-full h-[120px] flex items-center"
        style={{
          opacity: trackOpacity,
          y: trackY,
          scale: trackScale,
        }}
      >
        {/* Edge vignettes */}
        <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-10 pointer-events-none" />

        <MarqueeTrack
          hoveredIndex={hoveredIndex}
          setHoveredIndex={setHoveredIndex}
        />
      </motion.div>

      {/* Bottom decorative line — scroll-driven reveal */}
      <motion.div
        className="flex justify-center mt-12"
        style={{ opacity: lineOpacity }}
      >
        <div className="w-16 h-px bg-white/10" />
      </motion.div>
    </section>
  );
}
