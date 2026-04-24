"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const DATA = [
  {
    quote: "Java is C++ without the guns, knives, and clubs.",
    name: "James Gosling",
    role: "Creator of Java",
    image: "/images/james_gosling.jpg",
  },
  {
    quote: "Kotlin is designed to be a better language, not just a better Java.",
    name: "Andrey Breslav",
    role: "Kotlin Lead Designer",
    image: "/images/andrey_breslav.jpg",
  },
  {
    quote: "Dart is designed for building fast apps on any platform.",
    name: "Lars Bak",
    role: "Lead Engineer of Dart",
    image: "/images/lars_bak.jpg",
  },
  {
    quote: "C makes it easy to shoot yourself in the foot, C++ makes it harder, but when you do, it blows your whole leg off.",
    name: "Bjarne Stroustrup",
    role: "Creator of C++",
    image: "/images/bjarne_stroustrup.jpg",
  },
];

export default function SigLanguage() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 untuk ke kiri, 1 untuk ke kanan

  const next = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % DATA.length);
  };

  const prev = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + DATA.length) % DATA.length);
  };

  const getPrevIndex = () => (index - 1 + DATA.length) % DATA.length;
  const getNextIndex = () => (index + 1) % DATA.length;

  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden px-4">
      {/* Carousel Image */}
      <div className="relative w-full max-w-6xl mt-15 h-[450px] flex items-center justify-center gap-4 md:gap-10">
        {/* Prev Image (Left Faded) */}
        <div 
          onClick={prev}
          className="relative hidden md:block w-64 h-[350px] opacity-20 grayscale hover:opacity-40 transition-all duration-500 cursor-pointer scale-90"
        >
          <Image
            src={DATA[getPrevIndex()].image}
            alt="prev"
            fill
            className="object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Active Main Image */}
        <div className="relative w-[320px] md:w-[400px] h-[400px] z-20 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -50 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <Image
                src={DATA[index].image}
                alt={DATA[index].name}
                fill
                className="object-cover brightness-110 contrast-110 transition-all duration-700"
                priority
              />
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Image (Right Faded) */}
        <div 
          onClick={next}
          className="relative hidden md:block w-64 h-[350px] opacity-20 grayscale hover:opacity-40 transition-all duration-500 cursor-pointer scale-90"
        >
          <Image
            src={DATA[getNextIndex()].image}
            alt="next"
            fill
            className="object-cover rounded-sm"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>

        {/* Navigation Arrows (Floating) */}
        <button 
            onClick={prev}
            className="absolute left-4 md:left-20 z-30 p-4 text-white/30 hover:text-white transition-colors"
        >
            <span className="text-4xl cursor-pointer font-extralight tracking-tighter">{"<"}</span>
        </button>
        <button 
            onClick={next}
            className="absolute right-4 md:right-20 z-30 p-4 text-white/30 hover:text-white transition-colors"
        >
            <span className="text-4xl font-extralight cursor-pointer tracking-tighter">{">"}</span>
        </button>
      </div>

      {/* Content Section (Quotes & Names) */}
      <div className="mt-2 max-w-4xl w-full flex flex-col items-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center "
          >
            <p className="text-2xl text-zinc-400 font-light tracking-[1] leading-relaxed px-6">
              {DATA[index].quote}
            </p>
            <div>
              <h3 className="text-2xl md:text-3xl font-normal uppercase tracking-[0.2em] text-white">
                {DATA[index].name}
              </h3>
              <p className="text-sm tracking-[0.6em] uppercase text-zinc-500 font-normal">
                {DATA[index].role}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* PAGINATION DOTS */}
        <div className="flex gap-4 mt-5 mb-7">
          {DATA.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`h-[2px] transition-all duration-500 ${
                i === index ? "w-12 bg-white" : "w-4 bg-zinc-800"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}