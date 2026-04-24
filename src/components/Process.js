"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const journeyData = [
  {
    id: "01",
    title: "LEARN",
    description: "I dive deep into new concepts, mastering the tools that shape the future of the web.",
    color: "bg-zinc-50",
    textColor: "text-black",
    border: "border-zinc-200"
  },
  {
    id: "02",
    title: "BUILD",
    description: "Turning abstract ideas into real-world projects with precision and clean architecture.",
    color: "bg-black",
    textColor: "text-white",
    border: "border-zinc-800"
  },
  {
    id: "03",
    title: "BREAK",
    description: "Inevitably facing problems where every bug and failure becomes a seed for growth.",
    color: "bg-zinc-100",
    textColor: "text-black",
    border: "border-zinc-300"
  },
];

export default function Process() {
  const targetRef = useRef(null);
  
  // Memantau scroll pada kontainer ini
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Mengubah scroll vertical (0 ke 1) menjadi pergerakan horizontal (-0% ke -66%)
  // Kita geser -66% karena ada 3 card, card pertama sudah terlihat di awal.
  const x = useTransform(scrollYProgress, [0, 1], ["66%", "-66%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh]">
      {/* Sticky Wrapper, Membuat konten tetap di layar selama scroll */}
      <div className="sticky top-0 flex h-screen mt-20 flex-col items-center justify-center overflow-hidden">
        
        {/* Title Section */}
        <div className="mb-12 px-4 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-black text-4xl md:text-5xl uppercase font-bold tracking-[4]"
          >
            My journey as a <span className="border-b-3 py-2">developer</span> has always been a cycle.
          </motion.h1>
          <p className="text-zinc-500 mt-10 max-w-2xl mx-auto text-base font-[family-name:var(--font-inter)] italic">
            Because every bug, every failure, every confusion is part of becoming better.
          </p>
        </div>

        {/* Cards Container (Bergerak Horizontal) */}
        <div className="flex w-full px-[10vw]">
          <motion.div style={{ x }} className="flex gap-8">
            {journeyData.map((item, index) => (
              <Card key={index} item={item} />
            ))}
          </motion.div>
        </div>

        {/* Scroll Progress Indicator (Opsional/Elegan) */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-zinc-200">
          <motion.div 
            style={{ scaleX: scrollYProgress }} 
            className="h-full bg-black origin-left"
          />
        </div>
      </div>
    </section>
  );
}

function Card({ item }) {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`relative cursor-pointer flex-shrink-0 w-[85vw] md:w-[450px] h-[450px] ${item.color} ${item.border} border p-10 flex flex-col justify-between group transition-colors duration-500`}
    >
      <div className="flex justify-between items-start">
        <span className={`text-5xl font-light  opacity-20 ${item.textColor}`}>{item.id}</span>
        <div className={`w-12 h-[1px] ${item.textColor === 'text-white' ? 'bg-white' : 'bg-black'} mt-6`}></div>
      </div>

      <div>
        <h2 className={`text-6xl font-black mb-6 tracking-[4] ${item.textColor}`}>
          {item.title}.
        </h2>
        <p className={`text-lg leading-relaxed font-[family-name:var(--font-inter)] font-light ${item.textColor} opacity-80`}>
          {item.description}
        </p>
      </div>

      {/* Interactive Hover Element */}
      <motion.div 
        className={`mt-6 flex items-center gap-2 text-sm font-bold uppercase tracking-widest ${item.textColor} cursor-pointer`}
        whileHover={{ x: 10 }}
      >
        <span>Explore Experience</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </motion.div>

      {/* Overlay Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br from-white to-transparent pointer-events-none" />
    </motion.div>
  );
}