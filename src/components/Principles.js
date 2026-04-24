"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Principles() {
  const sectionRef = useRef(null);

  // 1. Ambil progress scroll khusus untuk section ini
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // 2. Tambahkan "Spring" agar gerakan memiliki efek inersia (smooth/lembut)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // 3. Mapping nilai parallax (sama dengan logika kamu sebelumnya)
  const yLeft = useTransform(smoothProgress, [0, 1], [60, -60]);
  const yRight = useTransform(smoothProgress, [0, 1], [-60, 60]);
  const yCenter = useTransform(smoothProgress, [0, 1], [30, -30]);

  // 4. Mapping opacity (0 -> 1 pada 15% pertama, tetap 1, lalu 1 -> 0 pada 15% terakhir)
  const opacity = useTransform(
    smoothProgress,
    [0, 0.15, 0.85, 1],
    [0, 1, 1, 0]
  );

  return (
    <div
      ref={sectionRef}
      className="flex flex-col items-center justify-center h-screen bg-black overflow-hidden"
    >
      {/* Title */}
      <motion.h1
        style={{ y: yCenter, opacity }}
        className="text-white text-4xl uppercase mt-30 text-center"
      >
        In programming, I believe everything comes down to two things.
      </motion.h1>

      {/* Content */}
      <div className="flex items-center justify-center mt-20 w-full h-full">
        
        {/* Left */}
        <motion.div
          style={{ y: yLeft, opacity }}
          className="flex flex-col items-center w-[40%] h-full"
        >
          <div className="relative w-[125px] h-[125px]">
            <Image src="/images/clarity.png" alt="Clarity" fill className="object-cover" />
          </div>
          <p className="text-lg mt-10 font-[family-name:var(--font-inter)] text-center font-light text-white">
            Clarity means writing code that not only works, but can be understood by others, and by myself in the future.
          </p>
        </motion.div>

        {/* Middle */}
        <motion.h1
          style={{ y: yCenter, opacity }}
          className="text-white mx-6 py-3 mb-20 border-y uppercase font-[family-name:var(--font-inter)] px-5 text-xs"
        >
          And
        </motion.h1>

        {/* Right */}
        <motion.div
          style={{ y: yRight, opacity }}
          className="flex flex-col items-center w-[40%] h-full"
        >
          <div className="relative w-[125px] h-[125px]">
            <Image src="/images/consistent.png" alt="Consistency" fill className="object-cover" />
          </div>
          <p className="text-lg mt-10 font-[family-name:var(--font-inter)] text-center font-light text-white">
            Consistency is what turns small improvements into real progress. Showing up, learning, building even when it gets frustrating.
          </p>
        </motion.div>
      </div>

      {/* Closing */}
      <motion.h1
        style={{ y: yCenter, opacity }}
        className="text-white text-4xl uppercase mb-10 text-center"
      >
        Because in the end, great systems are not built in a day. <br />
        They are built line by line.
      </motion.h1>
    </div>
  );
}