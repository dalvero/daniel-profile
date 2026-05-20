"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import BlurText from "@/components/about/BlurText";

export default function ContactHero() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-30%"]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const titleScale = useTransform(smoothProgress, [0, 0.6], [1, 0.92]);
  const titleBlur = useTransform(smoothProgress, [0, 0.6], [0, 8]);
  const labelY = useTransform(smoothProgress, [0, 0.4], [0, -20]);
  const labelOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const scrollIndicatorOpacity = useTransform(smoothProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="contact-hero"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      <div className="relative w-full h-[100vh]">
        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* Editorial Text */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end pb-20 px-8 lg:px-20"
          style={{ zIndex: 10, y: textY }}
        >
          <div className="max-w-6xl mx-auto w-full">
            {/* Label */}
            <motion.div style={{ y: labelY, opacity: labelOpacity }}>
              <BlurText
                text="Get in touch."
                stagger={0.02}
                className="text-xs font-[family-name:var(--font-inter)] text-zinc-500 mb-6 tracking-[0.35em] uppercase"
              />
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              className="text-[clamp(48px,10vw,140px)] leading-[0.85] uppercase text-white mb-8"
              style={{
                letterSpacing: "0.03em",
                opacity: titleOpacity,
                scale: titleScale,
                filter: useTransform(titleBlur, (v) => `blur(${v}px)`),
              }}
            >
              LET&apos;S
              <br />
              <span
                style={{
                  WebkitTextStroke: "1px rgba(255,255,255,0.4)",
                  color: "transparent",
                }}
              >
                CONNECT.
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.div
              style={{
                opacity: useTransform(smoothProgress, [0, 0.35], [1, 0]),
                y: useTransform(smoothProgress, [0, 0.4], [0, -15]),
              }}
            >
              <BlurText
                text="Terbuka untuk kolaborasi, magang, dan proyek menarik. Jangan ragu untuk menghubungi saya."
                stagger={0.003}
                className="text-lg lg:text-xl font-[family-name:var(--font-inter)] font-light text-zinc-400 max-w-xl leading-relaxed"
              />
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
              className="mt-12 flex items-center gap-3"
              style={{ opacity: scrollIndicatorOpacity }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5, duration: 1 }}
            >
              <div className="w-px h-10 bg-white/20" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-600 font-[family-name:var(--font-inter)]">
                Scroll to explore
              </span>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Gradient bottom */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, #0a0a0a 0%, #0a0a0a 40%, rgba(10,10,10,0.6) 70%, transparent 100%)",
          zIndex: 5,
        }}
      />
    </section>
  );
}
