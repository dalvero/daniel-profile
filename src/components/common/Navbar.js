"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useCurtain } from "./PageTransition";

const FULL_TEXT = "DANIEL.ALFERO";
const SHORT_TEXT = "D.";

// ── Sections per halaman ─────────────────────────────────────────────────
const PAGE_SECTIONS = {
  "/": [
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
  ],
  "/about": [
    { name: "Hero", id: "about-hero" },
    { name: "Timeline", id: "about-timeline" },
    { name: "Core Values", id: "about-values" },
    { name: "CTA", id: "about-cta" },
  ],
  "/projects": [
    { name: "Hero", id: "projects-hero" },
    { name: "Showcase", id: "projects-showcase" },
    { name: "Categories", id: "projects-marquee" },
    { name: "CTA", id: "projects-cta" },
  ],
  "/achievement": [
    { name: "Hero", id: "achievement-hero" },
    { name: "Achievements", id: "achievement-carousel" },
    { name: "FAQ", id: "achievement-faq" },
    { name: "CTA", id: "projects-cta" },
  ],
  "/contact": [
    { name: "Hero", id: "contact-hero" },
    { name: "Contact", id: "contact-section" },
  ],
};

// ── Semua halaman ────────────────────────────────────────────────────────
const ALL_PAGES = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Projects", href: "/projects" },
  { name: "Achievement", href: "/achievement" },
  { name: "Contact", href: "/contact" },
];

// Halaman yang background hero-nya gelap/foto — navbar harus selalu putih saat di atas
const DARK_HERO_PAGES = ["/about", "/projects", "/achievement", "/contact"];

export default function Navbar() {
  const pathname = usePathname();
  const hasDarkHero = DARK_HERO_PAGES.includes(pathname);
  const sections = PAGE_SECTIONS[pathname] || [];

  const curtain = useCurtain();
  const [scrolled, setScrolled] = useState(false);
  const [displayText, setDisplayText] = useState(FULL_TEXT);
  const [animating, setAnimating] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const currentTextRef = useRef(FULL_TEXT);
  const timeoutRef = useRef(null);
  const lastScrollY = useRef(0);

  // ── Animasi teks nama ──────────────────────────────────────────────────────
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
      const next =
        current.length > target.length
          ? current.slice(0, -1)
          : target.slice(0, current.length + 1);
      currentTextRef.current = next;
      setDisplayText(next);
      timeoutRef.current = setTimeout(
        step,
        current.length > target.length ? 30 : 50
      );
    };
    step();
  };

  // ── Scroll listener ────────────────────────────────────────────────────────
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

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // ── Smooth scroll ke section ────────────────────────────────────────────
  const handleScrollToSection = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const offsetPosition =
        element.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
    setIsDropdownOpen(false);
  };

  // ── Kalkulasi warna teks navbar ────────────────────────────────────────────
  const isLight = scrolled || (!scrolled && hasDarkHero);
  const textColor = isLight ? "text-white" : "text-black";
  const lineColor = isLight ? "bg-white" : "bg-black";
  const dividerColor = isLight ? "bg-white/30" : "bg-black/30";

  // ── Split nama untuk bold/light ───────────────────────────────────────────
  const dotIndex = displayText.indexOf(".");
  const boldPart = dotIndex !== -1 ? displayText.slice(0, dotIndex) : displayText;
  const lightPart = dotIndex !== -1 ? displayText.slice(dotIndex) : "";

  // ── Page links (kecuali halaman saat ini) ────────────────────────────────
  const otherPages = ALL_PAGES.filter((page) => page.href !== pathname);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 py-5 transition-all duration-500
        ${scrolled ? "bg-black shadow-lg" : "bg-transparent"}`}
    >
      {/* ── Brand Name ── */}
      <button
        onClick={() => {
          if (pathname !== "/") curtain.navigate("/");
          else window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        className={`text-3xl font-normal tracking-[12px] transition-all duration-500 cursor-pointer
          ${textColor} ${animating ? "opacity-90" : "opacity-100"}`}
      >
        {boldPart}
        <span className="font-light">{lightPart}</span>
      </button>

      {/* ── Nav Links ── */}
      <div className="flex items-center gap-8">
        {/* Dropdown "Sections" — selalu tampil, isi berubah sesuai halaman */}
        {sections.length > 0 && (
          <div
            className="relative group"
            onMouseEnter={() => setIsDropdownOpen(true)}
            onMouseLeave={() => setIsDropdownOpen(false)}
          >
            <button
              className={`relative text-lg tracking-[3px] uppercase transition-all duration-300 flex items-center gap-2 cursor-pointer ${textColor}`}
            >
              Sections
              <motion.span
                animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                className="text-[10px] inline-block"
              >
                ▼
              </motion.span>
              <span
                className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${lineColor}`}
              />
            </button>

            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.3, ease: "circOut" }}
                  className={`absolute top-full -left-10 mt-4 w-[450px] p-4 grid grid-cols-2 gap-x-8 gap-y-4 border shadow-2xl
                    ${
                      scrolled
                        ? "bg-black border-zinc-800 text-white"
                        : "bg-white border-zinc-200 text-black"
                    }`}
                >
                  {sections.map((section) => (
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
          </div>
        )}

        {/* Link ke halaman lain */}
        {otherPages.map((page) => (
          <button
            key={page.href}
            onClick={() => curtain.navigate(page.href)}
            className={`relative text-lg tracking-[3px] uppercase transition-all duration-300 group cursor-pointer ${textColor}`}
          >
            {page.name}
            <span
              className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300 ${lineColor}`}
            />
          </button>
        ))}

        {/* Divider */}
        <div className={`w-px h-8 transition-colors duration-300 ${dividerColor}`} />

        {/* Get CV button */}
        <a
          href="/cv.pdf"
          target="_blank"
          className={`px-5 py-2 border text-base font-medium tracking-[4px] uppercase transition-all duration-300
            ${
              isLight
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
