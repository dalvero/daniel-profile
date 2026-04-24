"use client";

import Image from "next/image";
import { useRef, useState, useEffect } from "react";

const WORDS = ["Code.", "Debug.", "Deploy.", "Refactor.", "Eat.", "Sleep.", "Repeat."];
// Karakter acak yang akan muncul sebagai efek animasi typewriter
const CHARS = "0123456789!@#$%^&*()_+?/<>{}[]";

export default function Hero() {
  const cardRef = useRef(null);
  const [transform, setTransform] = useState("");
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 });
  const [shadow, setShadow] = useState("0px 25px 50px rgba(0,0,0,0.25)");

  // Typewriter States
  const [displayWord, setDisplayWord] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    const currentFullWord = WORDS[wordIndex];
    let timerSpeed = isDeleting ? 40 : 80;

    // Logika jeda antar kata
    if (!isDeleting && displayWord === currentFullWord) {
      timerSpeed = 1500;
      const timeout = setTimeout(() => setIsDeleting(true), timerSpeed);
      return () => clearTimeout(timeout);
    } 
    
    if (isDeleting && displayWord === "") {
      timerSpeed = 500;
      const timeout = setTimeout(() => {
        setIsDeleting(false);
        setWordIndex((prev) => (prev + 1) % WORDS.length);
      }, timerSpeed);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        // Efek hapus biasa 
        setDisplayWord(prev => prev.slice(0, -1));
      } else {
        // Efek random/scramble saat mengetik
        if (!isScrambling) {
          // Tampilkan karakter random di posisi huruf berikutnya
          const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
          setDisplayWord(currentFullWord.slice(0, displayWord.length) + randomChar);
          setIsScrambling(true);
        } else {
          // Ubah karakter random tadi menjadi huruf yang benar
          setDisplayWord(currentFullWord.slice(0, displayWord.length));
          setIsScrambling(false);
        }
      }
    }, isScrambling ? 40 : timerSpeed); // Scramble berjalan lebih cepat (40ms)

    return () => clearTimeout(timeout);
  }, [displayWord, isDeleting, wordIndex, isScrambling]);

  // 3D Card Logic
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -28;
    const rotateY = (x - 0.5) * 28;
    const shadowX = (x - 0.5) * -40;
    const shadowY = (y - 0.5) * -40;
    const shadowBlur = 50 + Math.abs(rotateX + rotateY) * 1.5;
    setTransform(`perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`);
    setShadow(`${shadowX}px ${shadowY}px ${shadowBlur}px rgba(0,0,0,0.35)`);
    setGlare({ x: x * 100, y: y * 100, opacity: 0.2 });
  };

  const handleMouseLeave = () => {
    setTransform("perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    setShadow("0px 25px 50px rgba(0,0,0,0.25)");
    setGlare({ x: 50, y: 50, opacity: 0 });
  };

  return (
    <div id="hero" className="h-screen px-10 pl-20 grid grid-cols-2 bg-[rgb(225,227,229)]">
      <div className="flex flex-col items-start justify-center gap-6">
        <p className="text-4xl font-normal tracking-[0.2em] uppercase text-black">
          Born to Code. Forced to Work.
        </p>

        <div className="flex flex-col leading-none">
          {/* Tambahkan font-mono jika ingin kesan hacker lebih kuat */}
          <h1 className="text-8xl font-black uppercase tracking-[0.1em] text-black flex items-center min-h-[120px]">
            {displayWord}
            <span className="inline-block w-[5px] h-[80px] bg-black ml-2 align-middle animate-[blink_1s_step-end_infinite]" />
          </h1>
        </div>

        <a href="#" className="mt-2 px-8 py-4 bg-black border-black border-1 hover:text-black text-white text-lg font-normal tracking-[0.3em] uppercase hover:bg-[rgb(225,227,229)] transition-colors duration-300">
          Learn More
        </a>
      </div>

      <div className="flex items-center justify-center">
        <div
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{
            transform: transform,
            boxShadow: shadow,
            transition: transform.includes("0deg")
              ? "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1), box-shadow 0.6s cubic-bezier(0.23, 1, 0.32, 1)"
              : "transform 0.1s ease-out, box-shadow 0.1s ease-out",
            transformStyle: "preserve-3d",
          }}
          className="relative w-[380px] h-[525px] mt-15 rounded-2xl overflow-hidden cursor-pointer grayscale hover:grayscale-0 transition-all duration-500"
        >
          <Image src="/images/daniel.jpeg" alt="Profile" fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          <div
            className="absolute inset-0 pointer-events-none rounded-2xl"
            style={{
              background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 70%)`,
              transition: "opacity 0.1s ease",
            }}
          />
        </div>
      </div>
    </div>
  );
}