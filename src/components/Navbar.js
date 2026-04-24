"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FULL_TEXT = "DANIEL.ALFERO";
const SHORT_TEXT = "D.";

const SECTIONS = [
  { name: "Hero", id: "hero" },
  { name: "Perspective", id: "perspective" },
  { name: "Principles", id: "principles" },
  { name: "The Process", id: "process" },
  { name: "Inspires Me", id: "inspires" },
  { name: "How I Started", id: "started" },
  { name: "Signature Language", id: "signature" },
  { name: "Tech Stack", id: "tech" },
  { name: "My Journey", id: "journey" },
  { name: "Footer", id: "footer" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [displayText, setDisplayText] = useState(FULL_TEXT);
  const [animating, setAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentTextRef = useRef(FULL_TEXT);
  const timeoutRef = useRef(null);
  const lastScrollY = useRef(0);

  // --- LOGIKA ANIMASI TEKS NAMA ---
  const animateTo = (target) => {
    if (currentTextRef.current === target) return;
    setAnimating(true);
    clearTimeout(timeoutRef.current);

    const step = () => {
      const current = currentTextRef.current;
      if (current === target) {
        setAnimating(false);
        return;
      }
      let next;
      if (current.length > target.length) {
        next = current.slice(0, -1);
      } else {
        next = target.slice(0, current.length + 1);
      }
      currentTextRef.current = next;
      setDisplayText(next);
      timeoutRef.current = setTimeout(step, current.length > target.length ? 30 : 50);
    };
    step();
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDown = currentScrollY > lastScrollY.current;
      setScrolled(currentScrollY > 20);

      if (isScrollingDown && currentScrollY > 100) {
        animateTo(SHORT_TEXT);
      } else if (currentScrollY < 50) {
        animateTo(FULL_TEXT);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // --- LOGIKA SMOOTH SCROLL ---
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const navbarHeight = 90; // Offset agar tidak tertutup navbar
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsDropdownOpen(false); // Tutup dropdown setelah klik
  };

  const dotIndex = displayText.indexOf(".");
  const boldPart = dotIndex !== -1 ? displayText.slice(0, dotIndex) : displayText;
  const lightPart = dotIndex !== -1 ? displayText.slice(dotIndex) : "";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 py-5 transition-all duration-500
            ${scrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
    >
      {/* Brand Name */}
      <Link
        href="/"
        className={`text-3xl font-normal tracking-[12px] transition-all duration-500
                ${scrolled ? "text-white" : "text-black"} ${animating ? "opacity-90" : "opacity-100"}`}
      >
        {boldPart}
        <span className="font-light">{lightPart}</span>
      </Link>

      {/* Nav Links */}
      <div className="flex items-center gap-8">
        {["Sections", "About", "Projects", "Achievement", "Contact"].map((item) => (
          <div
            key={item}
            className="relative group"
            onMouseEnter={() => item === "Sections" && setIsDropdownOpen(true)}
            onMouseLeave={() => item === "Sections" && setIsDropdownOpen(false)}
          >
            {item === "Sections" ? (
              // Tombol Trigger Dropdown
              <button
                className={`relative text-lg tracking-[3px] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer
                ${scrolled ? "text-white" : "text-black"}`}
              >
                {item}
                <motion.span
                  animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                  className="text-[10px]  inline-block"
                >
                  ▼
                </motion.span>
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 
                  ${scrolled ? "bg-white" : "bg-black"}`}
                />
              </button>
            ) : (
              // Link Biasa
              <Link
                href={`/${item.toLowerCase()}`}
                className={`relative text-lg tracking-[3px] uppercase transition-all duration-300 group
                        ${scrolled ? "text-white hover:text-white/80" : "text-black hover:text-black/70"}`}
              >
                {item}
                <span
                  className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 
                  ${scrolled ? "bg-white" : "bg-black"}`}
                />
              </Link>
            )}

            {/* Dropdown Menu (Hanya untuk "Sections") */}
            {item === "Sections" && (
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 15 }}
                    transition={{ duration: 0.3, ease: "circOut" }}
                    className={`absolute top-full -left-10 mt-4 w-[450px] p-4 grid grid-cols-2 gap-x-8 gap-y-4 border
                    ${
                      scrolled
                        ? "bg-black border-zinc-800 text-white"
                        : "bg-white border-zinc-200 text-black"
                    } shadow-2xl`}
                  >
                    {SECTIONS.map((section) => (
                      <button
                        key={section.id}
                        onClick={(e) => handleScrollToSection(e, section.id)}
                        className={`text-left text-sm tracking-[2px] uppercase font-light transition-all duration-300 cursor-pointer
                        ${
                          scrolled
                            ? "text-zinc-400 hover:text-white hover:translate-x-2"
                            : "text-zinc-500 hover:text-black hover:translate-x-2"
                        }`}
                      >
                        {section.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            )}
          </div>
        ))}

        {/* Divider */}
        <div
          className={`w-px h-8 transition-colors duration-300 ${
            scrolled ? "bg-white/30" : "bg-black/30"
          }`}
        />

        {/* Action Button */}
        <a
          href="/cv.pdf"
          target="_blank"
          className={`px-5 py-2 border text-base font-medium tracking-[4px] uppercase transition-all duration-300
                    ${
                      scrolled
                        ? "border-white/30 text-white hover:bg-white hover:text-black"
                        : "border-black/30 text-black hover:bg-black hover:text-white"
                    }`}
        >
          Get CV
        </a>
      </div>
    </nav>
  );
}