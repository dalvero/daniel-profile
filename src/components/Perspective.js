"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const FLOATING_IMAGES = [
  {
    id: 1,
    src: "/images/olivia_fotbar_1.jpeg",
    style: { top: "2%", left: "1%" },
    rotate: "-rotate-2",
    size: "w-65 h-45",
    side: "left", // Terbang dari tengah ke kiri
  },
  {
    id: 2,
    src: "/images/olivia_fotbar_2.jpeg",
    style: { top: "30%", left: "3%" },
    rotate: "rotate-1",
    size: "w-65 h-45",
    side: "left",
  },
  {
    id: 3,
    src: "/images/olivia_fotbar_3.jpeg",
    style: { bottom: "2%", left: "6%" },
    rotate: "-rotate-3",
    size: "w-65 h-45",
    side: "left",
  },
  {
    id: 4,
    src: "/images/olivia_juara_1.jpeg",
    style: { top: "2%", right: "1%" },
    rotate: "rotate-2",
    size: "w-65 h-45",
    side: "right", // Terbang dari tengah ke kanan
  },
  {
    id: 5,
    src: "/images/olivia_fotbar_4.jpeg",
    style: { top: "30%", right: "3%" },
    rotate: "-rotate-1",
    size: "w-65 h-45",
    side: "right",
  },
  {
    id: 6,
    src: "/images/olivia_juara_2.jpeg",
    style: { bottom: "2%", right: "6%" },
    rotate: "rotate-3",
    size: "w-65 h-45",
    side: "right",
  },
];

const MAIN_IMAGE =
  "/images/olivia_sertif.jpeg";

export default function Greeting() {
  const sectionRef = useRef(null);
  const imageRefs = useRef({});
  const [visibleMap, setVisibleMap] = useState(
    Object.fromEntries(FLOATING_IMAGES.map((img) => [img.id, false]))
  );

  useEffect(() => {
    const handleScroll = () => {
      const vh = window.innerHeight;

      FLOATING_IMAGES.forEach((img) => {
        const el = imageRefs.current[img.id];
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const isVisible = rect.top < vh && rect.bottom > 0;

        setVisibleMap((prev) => {
          if (prev[img.id] === isVisible) return prev;
          return { ...prev, [img.id]: isVisible };
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="flex flex-col bg-white items-center pb-32">

      {/* Title */}
      <h1 className="text-6xl mt-35 uppercase text-center px-10 max-w-4xl leading-tight">
        Confusion is part of programming.
      </h1>

      {/* Description */}
      <p className="mt-4 max-w-xl font-[family-name:var(--font-inter)] text-xl font-light text-center text-gray-400 leading-relaxed">
        You might not think that programmers are artists, but in many ways, they are.
        Programming is not just about writing lines of code. It`s about creating something from nothing,
        turning ideas into reality through logic and structure.
      </p>

      {/* Image Section */}
      <div
        ref={sectionRef}
        className="relative w-full max-w-6xl mt-16"
        style={{ height: "520px" }}
      >

        {/* Floating Images */}
        {FLOATING_IMAGES.map((img) => (
          <div
            key={img.id}
            ref={(el) => (imageRefs.current[img.id] = el)}
            className={`absolute ${img.rotate} ${img.size} rounded-xl overflow-hidden shadow-xl`}
            style={{
              ...img.style,
              opacity: visibleMap[img.id] ? 1 : 0,
              transform: visibleMap[img.id]
                ? "translateX(0px) scale(1)"
                : img.side === "left"
                  ? "translateX(180px) scale(0.9)"  // mulai dari tengah, gerak ke kiri
                  : "translateX(-180px) scale(0.9)", // mulai dari tengah, gerak ke kanan
              transition: "opacity 0.6s ease-out, transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            }}
          >
            <Image
              src={img.src}
              alt={`Floating image ${img.id}`}
              fill
              className="object-cover"
            />
          </div>
        ))}

        {/* Main Image */}
        <div
          className="absolute rounded-2xl overflow-hidden shadow-2xl z-10"
          style={{
            width: "550px",
            height: "400px",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Image
            src={MAIN_IMAGE}
            alt="Main image"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/10" />
        </div>

      </div>
    </div>
  );
}