"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const LANGUAGES = [
    { name: "Java", color: "#f89820", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg" },
    { name: "C++", color: "#00599C", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
    { name: "Kotlin", color: "#7F52FF", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Dart", color: "#0175C2", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
    { name: "Flutter", color: "#54C5F8", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "Next.js", color: "#ffffff", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "Tailwind", color: "#38BDF8", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "TypeScript", color: "#3178C6", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Laravel", color: "#FF2D20", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/laravel/laravel-original.svg" },
    { name: "Python", color: "#3776AB", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MySQL", color: "#4479A1", image: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
];

const ITEMS = [...LANGUAGES, ...LANGUAGES, ...LANGUAGES];

function Card3D({ lang, isHovered, onEnter, onLeave }) {
    const cardRef = useRef(null);
    const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

    const handleMouseMove = (e) => {
        const card = cardRef.current;
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setTilt({
            rx: (y - 0.5) * -25, // Agar sedikit lebih responsif
            ry: (x - 0.5) * 25,
            gx: x * 100,
            gy: y * 100,
        });
    };

    const handleMouseLeave = () => {
        setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
        onLeave();
    };

  return (
    <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={onEnter}
        onMouseLeave={handleMouseLeave}
        style={{
            transform: `perspective(1000px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) scale(${isHovered ? 1.08 : 1})`,
            transition: isHovered ? "transform 0.05s ease-out" : "transform 0.6s cubic-bezier(0.2, 1, 0.2, 1)",
            transformStyle: "preserve-3d",
        }}
        className="relative w-32 h-36 rounded-sm border border-white/5 bg-[#0a0a0a] cursor-pointer flex flex-col items-center justify-center gap-5 overflow-hidden"
    >
        {/* Micro-Highlight Border (Top) */}
        <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

        {/* Subtle Glare */}
        <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-500"
            style={{
            background: `radial-gradient(120px circle at ${tilt.gx}% ${tilt.gy}%, rgba(255,255,255,0.08), transparent 80%)`,
            opacity: isHovered ? 1 : 0,
            }}
        />

        {/* Logo Container with shadow depth */}
        <div 
            className={`relative w-12 h-12 transition-all duration-700 ease-out z-10 ${isHovered ? 'grayscale-0 scale-110' : 'grayscale opacity-30 scale-100'}`}
            style={{ transform: "translateZ(30px)" }} // Pop-out effect
        >
            <Image
                src={lang.image}
                alt={lang.name}
                fill
                className="object-contain"
            />
        </div>

        {/* Typography Sharp & Minimalist */}
        <div 
            className="flex flex-col items-center gap-1 z-10 transition-transform duration-500"
            style={{ transform: "translateZ(15px)" }}
        >
            <span
                className={`text-sm font-normal tracking-[4] uppercase transition-all duration-500 ${isHovered ? 'text-white' : 'text-white/20'}`}
            >
                {lang.name}
            </span>
            <div className={`h-[1px] bg-white transition-all duration-500 ${isHovered ? 'w-4' : 'w-0'}`} />
        </div>
    </div>
  );
}

export default function Language() {
    const trackRef = useRef(null);
    const offsetRef = useRef(0);
    const speedRef = useRef(1.2); // Base speed dipercepat
    const targetSpeedRef = useRef(1.2);
    const rafRef = useRef(null);
    const lastScrollY = useRef(0);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const directionRef = useRef(1); // 1 = kiri, -1 = kanan

    useEffect(() => {
        const track = trackRef.current;
        if (!track) return;

        const itemWidth = 128 + 24; // w-32 (128px) + gap-6
        const totalWidth = LANGUAGES.length * itemWidth;

        const animate = () => {
            // Smooth interpolation for speed
            speedRef.current += (targetSpeedRef.current - speedRef.current) * 0.08;

            if (hoveredIndex === null) {
                offsetRef.current += speedRef.current;
            }

            // Infinite loop logic
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

            // Scroll Bawah -> Positif (Gerak Kiri Cepat)
            // Scroll Atas -> Negatif (Gerak Kanan Cepat)
            if (delta > 0) {
                directionRef.current = 1; // ke kiri
                targetSpeedRef.current = 6;
            } else if (delta < 0) {
                directionRef.current = -1; // ke kanan
                targetSpeedRef.current = -6;
            }

                clearTimeout(window._langScrollTimer);
                window._langScrollTimer = setTimeout(() => {
                // balik ke base speed tapi IKUT arah terakhir
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
    <div className="flex flex-col pt-5 bg-black overflow-hidden select-none">
        {/* Header Editorial Style */}
        <div className="flex items-center justify-center mt-5 mb-5 gap-10">
            <div className="w-80 h-px bg-white/20" />
            <h2 className="text-white text-4xl font-normal uppercase tracking-[1] ">
            What I Love
            </h2>            
            <div className="w-80 h-px bg-white/20" />
        </div>

        <div className="relative w-full h-[220px] flex items-center">
            {/* Soft Vignette Edges */}
            <div className="absolute left-0 top-0 bottom-0 w-64 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-64 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

            <div
                ref={trackRef}
                className="flex gap-6 px-6 will-change-transform items-center"
                style={{ width: "max-content" }}
            >
                {ITEMS.map((lang, i) => (
                    <Card3D
                    key={i}
                    lang={lang}
                    isHovered={hoveredIndex === i}
                    onEnter={() => setHoveredIndex(i)}
                    onLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </div>
      </div>
    </div>
  );
}