"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

const quotes = [
  {
    text: "“Programs must be written for people to read, and only incidentally for machines to execute.”",
    author: "— Harold Abelson",
    bg: "bg-black",
    color: "text-white",
    direction: -1, 
  },
  {
    text: "“First, solve the problem. Then, write the code.”",
    author: "— John Johnson",
    bg: "bg-white",
    color: "text-black",
    direction: 1, 
  },
  {
    text: "“Stay hungry, stay foolish.”",
    author: "— Steve Jobs",
    bg: "bg-black",
    color: "text-white",
    direction: -1, 
  },
];

export default function Inspires() {
  const containerRef = useRef(null);

  // Offset ["start end", "end start"] artinya animasi berjalan dari 
  // saat section muncul di bawah sampai hilang di atas layar
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section 
        ref={containerRef} 
        className="relative bg-black overflow-hidden pt-20 pb-30"
    >
        {/* Title */}
        <div className="flex flex-col items-center mb-30 px-6 relative z-20">
            <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-zinc-500 uppercase tracking-[0.8em] text-lg mb-4"
            >
            Perspective
            </motion.p>
            <h1 className="text-5xl md:text-8xl text-white font-medium tracking-[3] text-center">
            What Inspires Me.
            </h1>
        </div>

        {/* Diagonal Container */}
        {/* Kita miringkan -5 derajat dan besarkan scale agar pinggirannya tidak bocor */}
        <div className="-rotate-6 scale-110 flex flex-col gap-2 relative z-10">
            {quotes.map((quote, index) => (
            <QuoteRow 
                key={index} 
                quote={quote} 
                progress={scrollYProgress} 
            />
            ))}
        </div>

        {/* Decorative background text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[30vw] font-black text-white/[0.02] pointer-events-none select-none italic">
            MOTTO
        </div>
    </section>
  );
}

function QuoteRow({ quote, progress }) {
    // SENSITIVITY: Angka 1000 - 1500 membuat pergerakan sangat terasa walau scroll sedikit.
    // Semakin tinggi angka kedua di useTransform, semakin cepat gerakannya.
    const xRaw = useTransform(
        progress, 
        [0, 1], 
        [quote.direction * 2000, quote.direction * -2000] 
    );
  
    // Gunakan damping rendah agar gerakan lebih responsif/sensitif mengikuti scroll
    const x = useSpring(xRaw, { stiffness: 60, damping: 15 });

    return (
        <div id="inspires" className={`w-[150vw] -left-[25vw] relative ${quote.bg} py-14 md:py-24 border-y border-white/10 flex items-center overflow-hidden`}>
        <motion.div 
            style={{ x }} 
            className="flex whitespace-nowrap gap-10 items-center px-10"
        >
            {/* Loop 4 kali agar barisan teks sangat panjang dan tidak putus saat bergeser cepat */}
            {[...Array(4)].map((_, i) => (
            <div key={i} className={`flex items-center gap-2 ${quote.color}`}>
                <span className="text-4xl md:text-3xl font-normal tracking-[3] uppercase italic leading-none">
                {quote.text}
                </span>
                <span className={`text-xl md:text-2xl font-light opacity-50 px-10`}>
                {quote.author}
                </span>
                {/* Dot Separator */}
                <div className={`w-4 h-4 rounded-full ${quote.bg === 'bg-white' ? 'bg-black' : 'bg-white'}`} />
            </div>
            ))}
        </motion.div>
        </div>
    );
}