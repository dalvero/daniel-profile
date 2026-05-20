"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Image from "next/image";
import projects from "@/data/projects.json";

function ProjectCard({ project, index }) {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Reveal: card masuk viewport (progress 0→0.4)
  // Unreveal: card keluar viewport (progress 0.7→1)
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.4, 0.75, 1], [0, 1, 1, 1, 0]);
  const y = useTransform(smoothProgress, [0, 0.25, 0.4, 0.75, 1], [60, 0, 0, 0, -40]);
  const scale = useTransform(smoothProgress, [0, 0.25, 0.4, 0.75, 1], [0.92, 1, 1, 1, 0.96]);
  const blur = useTransform(smoothProgress, [0, 0.2, 0.4, 0.75, 1], [6, 0, 0, 0, 4]);

  return (
    <motion.div
      ref={cardRef}
      style={{
        opacity,
        y,
        scale,
        filter: useTransform(blur, (v) => `blur(${v}px)`),
      }}
      className="w-full group bg-[#141414] p-2 border border-white/[0.04] overflow-hidden rounded-md text-white"
    >
      {/* Image Area */}
      <figure className="relative w-full h-72 group-hover:h-64 transition-all duration-300 bg-[#0a121a] p-2 rounded-md overflow-hidden">
        {/* Color gradient overlay on hover */}
        <div
          style={{
            background: `linear-gradient(123.9deg, ${project.color} 1.52%, rgba(0, 0, 0, 0) 68.91%)`,
          }}
          className="absolute top-0 left-0 w-full h-full group-hover:opacity-100 opacity-0 transition-all duration-300 z-10"
        />

        {/* Project Image */}
        <Image
          src={project.image}
          alt={project.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="absolute -bottom-1 group-hover:-bottom-5 right-0 h-64 w-[80%] group-hover:border-4 border-4 rounded-lg object-cover transition-all duration-300"
          style={{
            borderColor: `${project.color}1a`,
          }}
        />

        {/* Category badge */}
        <div className="absolute top-4 left-4 z-20">
          <span className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-[family-name:var(--font-inter)] bg-black/40 px-3 py-1 rounded-sm backdrop-blur-sm">
            {project.category}
          </span>
        </div>
      </figure>

      {/* Text Content */}
      <article className="p-4 space-y-2">
        {/* Color accent bar */}
        <div
          className="h-8 w-20 rounded-md"
          style={{ backgroundColor: project.color }}
        />

        {/* Title */}
        <h3 className="text-xl font-semibold capitalize font-[family-name:var(--font-inter)]">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-base leading-[120%] text-zinc-400 font-[family-name:var(--font-inter)] font-light">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[9px] tracking-[1.5px] uppercase px-2 py-0.5 border border-white/[0.06] text-zinc-600 rounded-sm font-[family-name:var(--font-inter)]"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <a
          href={project.link}
          className="text-base text-white font-normal group-hover:opacity-100 opacity-0 translate-y-2 group-hover:translate-y-0 pt-2 flex gap-1 items-center transition-all duration-300 font-[family-name:var(--font-inter)]"
        >
          View Project
          <span>
            <ChevronRight size={18} />
          </span>
        </a>
      </article>
    </motion.div>
  );
}

export default function ProjectsShowcase() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Header reveal/unreveal
  const headerOpacity = useTransform(smoothProgress, [0, 0.15, 0.3, 0.85, 1], [0, 1, 1, 1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.2, 0.3, 0.85, 1], [30, 0, 0, 0, -20]);
  const headerBlur = useTransform(smoothProgress, [0, 0.15, 0.3, 0.85, 1], [4, 0, 0, 0, 3]);

  return (
    <section
      ref={sectionRef}
      id="projects-showcase"
      className="relative py-20 px-8 lg:px-20"
      style={{ background: "#0a0a0a" }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header — scroll-driven reveal + unreveal */}
        <motion.div
          className="mb-16"
          style={{
            opacity: headerOpacity,
            y: headerY,
            filter: useTransform(headerBlur, (v) => `blur(${v}px)`),
          }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-600 font-[family-name:var(--font-inter)] block mb-3">
            Selected Works
          </span>
          <h2 className="text-4xl lg:text-5xl uppercase text-white leading-tight">
            {projects.length} PROJECTS
          </h2>
          <div className="w-12 h-[2px] bg-white/20 mt-4" />
        </motion.div>

        {/* Cards Grid — each card has its own scroll-driven reveal/unreveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
