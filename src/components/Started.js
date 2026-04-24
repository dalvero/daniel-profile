"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TIMELINE = [
    { 
        year: "2020", 
        title: "Where It All Began", 
        body: "My journey started in high school when I was first introduced to C++, HTML, JavaScript, and CSS. These technologies opened my eyes to logic, problem-solving, and the fundamentals of programming." 
    },
    { 
        year: "2023", 
        title: "Part Time Worker", 
        body: "After graduating and not getting into university at the time, I worked part-time at Cimory Dairyland On The Valley in Semarang, gaining real-world experience and discipline." 
    },
    { 
        year: "2023", 
        title: "Going Deeper", 
        body: "While working part-time, I joined Arutala Bootcamp intensive Java program focused on preparing students for real industry work in collaboration with PT Padepokan Tujuh Sembilan." 
    },
    { 
        year: "2024", 
        title: "Brawijaya University", 
        body: "I failed at bootcamp and began my studies at Brawijaya University in Malang while continuing to work part-time. During this time, I discovered and became part of the Provoks community." 
    },
    { 
        year: "2025", 
        title: "OLIVIA - 1st Place Web Technology", 
        body: "Achieved 1st place in the Web Technology category at OLIVIA 2025, representing the result of consistent learning, dedication, and growth." 
    },
    { 
        year: "2025", 
        title: "SiCegah Hebat", 
        body: "Developed a healthcare application published on the Play Store to support research by lecturers at the Faculty of Health Sciences, Brawijaya University, focusing on stunting prevention." 
    },
    { 
        year: "Now", 
        title: "Giving Back", 
        body: "Now, I dedicate my time as a Web Technology mentor at Provoks, guiding and supporting the next generation of programmers at Brawijaya University." 
    },
];

const IMAGES = [
    "/images/code_iel_1.jpeg",
    "/images/cimory.jpeg",
    "/images/java_gui_1.jpeg",
    "/images/presentasi_1.jpeg",
    "/images/olivia_juara_3.jpeg",
    "/images/sicegah_1.jpeg",
    "/images/provoks_1.jpeg",
];

export default function Started() {
    const [imgIndex, setImgIndex] = useState(0);
    const containerRef = useRef(null);
    const scrollContentRef = useRef(null);
    const sectionRefs = useRef([]);
    const targetScrollRef = useRef(0);
    const currentScrollRef = useRef(0);
    const rafRef = useRef(null);

    useEffect(() => {
        const scrollEl = scrollContentRef.current;
        if (!scrollEl) return;

        // Smooth Scroll Loop
        const smoothLoop = () => {
            const diff = targetScrollRef.current - currentScrollRef.current;
            if (Math.abs(diff) > 0.1) {
                currentScrollRef.current += diff * 0.1; // Easing factor
                scrollEl.scrollTop = currentScrollRef.current;
            }
            rafRef.current = requestAnimationFrame(smoothLoop);
        };
        rafRef.current = requestAnimationFrame(smoothLoop);

        // Wheel Handler (Hijack) 
        const handleWheel = (e) => {
            const container = containerRef.current;
            if (!container || !scrollEl) return;

            const rect = container.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Section dianggap aktif jika bagian atasnya sudah menempel di top viewport
            // dan bagian bawahnya masih ada di bawah atau pas di viewport.
            const isSectionInView = rect.top <= 2 && rect.bottom >= windowHeight - 2;

            const isAtBottom = scrollEl.scrollHeight - scrollEl.scrollTop <= scrollEl.clientHeight + 2;
            const isAtTop = scrollEl.scrollTop <= 2;

            const scrollingDown = e.deltaY > 0;
            const scrollingUp = e.deltaY < 0;

            if (isSectionInView) {
                // Hijack, jika scroll ke bawah tapi belum mentok bawah
                if (scrollingDown && !isAtBottom) {
                e.preventDefault();
                targetScrollRef.current = Math.min(
                    targetScrollRef.current + e.deltaY,
                    scrollEl.scrollHeight - scrollEl.clientHeight
                );
                } 
                // Hijack, jika scroll ke atas tapi belum mentok atas
                else if (scrollingUp && !isAtTop) {
                e.preventDefault();
                targetScrollRef.current = Math.max(targetScrollRef.current + e.deltaY, 0);
                }
                // Jika sudah mentok, e.preventDefault() tidak dipanggil agar browser bisa scroll halaman selanjutnya
            }
        };

        // Pasang di window agar terdeteksi meski kursor di sisi kanan (gambar)
        window.addEventListener("wheel", handleWheel, { passive: false });

        // Intersection Observer untuk Ganti Gambar
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sectionRefs.current.indexOf(entry.target);
                        if (index !== -1) setImgIndex(index);
                    }
                });
            },
            { 
                root: scrollEl, 
                rootMargin: "-30% 0px -30% 0px", 
                threshold: 0.2
            }
        );

        sectionRefs.current.forEach((s) => s && observer.observe(s));

        return () => {
            window.removeEventListener("wheel", handleWheel);
            observer.disconnect();
            cancelAnimationFrame(rafRef.current);
        };
    }, []);

    return (
        <div ref={containerRef} className="flex h-screen bg-black overflow-hidden select-none">
            {/* Left Content */}
            <div ref={scrollContentRef} className="w-full md:w-1/2 h-full overflow-y-auto no-scrollbar px-8 md:px-20 py-24" style={{ overscrollBehavior: "none" }}>
                <div className="max-w-xl">
                    <header className="mb-24">
                        <h1 className="text-8xl font-normal text-center text-white uppercase tracking-[4]">
                            DANIEL ALFERO
                        </h1>
                        <div className="w-full h-[2px] bg-white/10 mt-5 mb-2" />
                            <div className="flex px-2 justify-between items-center text-lg tracking-[5] uppercase text-zinc-500 font-bold">
                                <span>Biography</span>
                                <span>2020 — 2025</span>
                            </div>
                    </header>

                    <div className="flex flex-col gap-32">
                        {TIMELINE.map((item, i) => (
                            <div
                                key={i}
                                ref={(el) => (sectionRefs.current[i] = el)}
                                className={`transition-all duration-1000 ease-in-out ${
                                imgIndex === i ? "opacity-100 translate-x-2" : "opacity-10"
                                }`}
                            >
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-lg font-normal text-white/60 tracking-[3] leading-none">
                                    {item.year}
                                </span>
                                <div className={`h-[1px] bg-white/40 transition-all duration-1000 ${imgIndex === i ? 'w-16' : 'w-0'}`} /></div>
                                <h2 className="text-3xl font-normal text-white uppercase tracking-[2] mb-3">
                                    {item.title}
                                </h2>
                                <p className="text-zinc-400 text-base font-light font-[family-name:var(--font-inter)] leading-relaxed">
                                    {item.body}
                                </p>
                            </div>
                        ))}
                        <div className="h-[20vh]" /> {/* Spacer agar item terakhir bisa ke tengah layar */}
                    </div>
                </div>
            </div>

            {/* Right Sticky Image */}
            <div className="hidden md:block w-1/2 h-full relative border-white/5">
                <div className="relative w-full h-full overflow-hidden group">
                    {IMAGES.map((src, i) => (
                        <div
                        key={i}
                        className={`absolute inset-0 transition-all duration-1000 ease-in-out transform ${
                            imgIndex === i ? "opacity-100 scale-100" : "opacity-0 scale-110"
                        }`}
                        >
                            <Image
                                src={src}
                                alt={`Experience ${i}`}
                                fill
                                priority={i === 0}
                                className="object-cover grayscale brightness-[0.6] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700"
                            />
                        </div>
                    ))}

                    {/* Gradients Overlay */}
                    <div className="absolute inset-y-0 -left-1 w-1/2 bg-gradient-to-r from-black via-black/40 to-transparent z-10" />
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10" />
                    <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />

                    {/* Progress Indicator */}
                    <div className="absolute bottom-30 right-12 z-20 flex flex-col items-end gap-2 text-right">
                        <span className="text-lg text-white font-normal uppercase tracking-[3]">
                            {TIMELINE[imgIndex].title.split('—')[0]}
                        </span>
                        <div className="w-42 h-[2px] bg-white/10 relative overflow-hidden">
                            <div 
                                className="absolute inset-y-0 left-0 bg-white transition-all duration-500" 
                                style={{ width: `${((imgIndex + 1) / TIMELINE.length) * 100}%` }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>
                {`
                    .no-scrollbar::-webkit-scrollbar { display: none; }
                    .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
                `}
            </style>
        </div>
    );
}