"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";

const EMAIL = "dalvero589@gmail.com";

export default function ProjectsCTA() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 18,
  });

  const bgScale = useTransform(smoothProgress, [0, 1], [1.15, 1.0]);
  const bgY = useTransform(smoothProgress, [0, 1], ["10%", "-10%"]);

  // Content reveal/unreveal
  const contentY = useTransform(smoothProgress, [0, 0.2, 0.4, 0.75, 1], ["60px", "0px", "0px", "0px", "-40px"]);
  const contentOpacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.8, 1], [0, 1, 1, 1, 0]);
  const contentBlur = useTransform(smoothProgress, [0, 0.2, 0.4, 0.8, 1], [6, 0, 0, 0, 5]);

  // Headline specific — more dramatic
  const headlineY = useTransform(smoothProgress, [0, 0.15, 0.35, 0.78, 1], ["40px", "0px", "0px", "0px", "-30px"]);
  const headlineOpacity = useTransform(smoothProgress, [0, 0.12, 0.3, 0.78, 1], [0, 1, 1, 1, 0]);
  const headlineScale = useTransform(smoothProgress, [0, 0.15, 0.35, 0.78, 1], [0.94, 1, 1, 1, 0.97]);
  const headlineBlur = useTransform(smoothProgress, [0, 0.15, 0.35, 0.78, 1], [8, 0, 0, 0, 6]);

  // Buttons — slightly delayed from headline
  const buttonsY = useTransform(smoothProgress, [0.05, 0.25, 0.4, 0.72, 0.95], ["30px", "0px", "0px", "0px", "-20px"]);
  const buttonsOpacity = useTransform(smoothProgress, [0.05, 0.22, 0.38, 0.72, 0.95], [0, 1, 1, 1, 0]);

  // Social icons — most delayed
  const socialOpacity = useTransform(smoothProgress, [0.1, 0.3, 0.45, 0.68, 0.9], [0, 1, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      id="projects-cta"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ background: "#000" }}
    >
      {/* Background parallax */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ scale: bgScale, y: bgY }}
      >
        <Image
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=1920&q=80&auto=format&fit=crop"
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
          aria-hidden
        />
      </motion.div>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.06]"
        style={{
          zIndex: 2,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      {/* Content container */}
      <div
        className="relative text-white text-center px-8 max-w-5xl mx-auto"
        style={{ zIndex: 10 }}
      >
        {/* Headline — scroll-driven reveal + unreveal */}
        <motion.h2
          className="text-[clamp(40px,8vw,110px)] leading-none uppercase text-white mb-10"
          style={{
            letterSpacing: "0.03em",
            y: headlineY,
            opacity: headlineOpacity,
            scale: headlineScale,
            filter: useTransform(headlineBlur, (v) => `blur(${v}px)`),
          }}
        >
          EXPLORE
          <br />
          MY
          <br />
          <span
            style={{
              WebkitTextStroke: "1px rgba(255,255,255,0.5)",
              color: "transparent",
            }}
          >
            WORK.
          </span>
        </motion.h2>

        {/* CTA Buttons — scroll-driven reveal + unreveal */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-5"
          style={{ y: buttonsY, opacity: buttonsOpacity }}
        >
          {/* Back to Showcase */}
          <a
            href="#achievement-hero"
            className="group relative overflow-hidden px-10 py-4 bg-white text-zinc-900 transition-colors duration-300 hover:bg-black hover:text-white"
          >
            <span className="relative z-10 text-[11px] tracking-[0.35em] uppercase font-medium flex items-center gap-3 font-[family-name:var(--font-inter)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="18 15 12 9 6 15" />
              </svg>
              BACK TO TOP
            </span>
          </a>

          {/* Let's Talk */}
          <a
            href={`mailto:${EMAIL}`}
            className="group relative overflow-hidden px-10 py-4 border border-white text-white transition-colors duration-300 hover:bg-white hover:text-zinc-900"
          >
            <span className="relative z-10 text-[11px] tracking-[0.35em] uppercase font-medium flex items-center gap-3 font-[family-name:var(--font-inter)]">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              LET&apos;S TALK
            </span>
          </a>
        </motion.div>

        {/* Social icons — scroll-driven reveal + unreveal */}
        <motion.div
          className="mt-10 flex items-center justify-center gap-6"
          style={{ opacity: socialOpacity }}
        >
          {/* Gmail */}
          <a
            href={`mailto:${EMAIL}`}
            className="text-zinc-500 hover:text-white transition-colors duration-300"
            aria-label="Email"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="M22 4L12 13 2 4" />
            </svg>
          </a>
          {/* GitHub */}
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-300"
            aria-label="GitHub"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          {/* LinkedIn */}
          <a
            href="https://linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
          {/* Instagram */}
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-500 hover:text-white transition-colors duration-300"
            aria-label="Instagram"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <circle cx="12" cy="12" r="5" />
              <circle
                cx="17.5"
                cy="6.5"
                r="1.5"
                fill="currentColor"
                stroke="none"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
