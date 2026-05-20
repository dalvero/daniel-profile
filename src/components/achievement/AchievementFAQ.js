"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "framer-motion";
import { Plus } from "lucide-react";

const FAQ_ITEMS = [
  {
    title: "Apa saja kompetisi yang pernah diikuti?",
    description:
      "Saya aktif mengikuti kompetisi IT dan web development, termasuk OLIVIA 2024 dan OLIVIA 2025 di Universitas Brawijaya. Di OLIVIA 2025, saya meraih Juara 1 kategori Web Technology dengan proyek website interaktif yang menggabungkan animasi scroll-driven dan desain responsif.",
  },
  {
    title: "Bagaimana pengalaman mentoring di Provoks?",
    description:
      "Sebagai Mentor Web Technology di komunitas Provoks Universitas Brawijaya, saya membimbing anggota baru memahami web development dari dasar HTML/CSS hingga JavaScript modern. Pengalaman ini mengajarkan saya untuk menyederhanakan konsep kompleks dan membangun kemampuan komunikasi teknis.",
  },
  {
    title: "Apa proyek yang paling berkesan?",
    description:
      "SiCegah Hebat adalah proyek paling berkesan karena dampaknya yang nyata. Aplikasi mobile ini dikembangkan untuk penelitian pencegahan stunting oleh FKM Universitas Brawijaya dan berhasil diluncurkan di Google Play Store. Ini mengajarkan saya bagaimana kode bisa membuat perbedaan di dunia nyata.",
  },
  {
    title: "Bagaimana cara menyeimbangkan akademik dan organisasi?",
    description:
      "Kunci utamanya adalah manajemen waktu yang disiplin dan prioritas yang jelas. Saya menjadwalkan waktu belajar, berorganisasi, dan berkompetisi secara terstruktur. Konsistensi lebih penting dari intensitas — sedikit setiap hari lebih baik dari maraton sesekali.",
  },
  {
    title: "Apa target pencapaian selanjutnya?",
    description:
      "Target utama saat ini adalah mendapatkan magang di perusahaan tech untuk mendapatkan pengalaman industri. Selain itu, saya ingin terus mengembangkan portofolio proyek dan memperluas jaringan profesional melalui komunitas dan kompetisi.",
  },
];

function FAQItem({ item, index, activeIndex, onClick }) {
  const isOpen = activeIndex === index;

  return (
    <motion.div
      className={`overflow-hidden ${index !== FAQ_ITEMS.length - 1 ? "border-b border-white/[0.04]" : ""}`}
      onClick={onClick}
    >
      <button
        className={`p-4 px-3 w-full cursor-pointer text-base items-center transition-all duration-300 font-[family-name:var(--font-inter)] text-white flex gap-3 ${
          isOpen ? "font-medium" : "font-normal text-zinc-400 hover:text-white"
        }`}
      >
        <Plus
          size={18}
          className={`${
            isOpen ? "rotate-45" : "rotate-0"
          } transition-transform ease-in-out duration-300 text-zinc-500 shrink-0`}
        />
        <span className="text-left">{item.title}</span>
      </button>
      <AnimatePresence mode="sync">
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
              delay: 0.1,
            }}
          >
            <p className="text-zinc-400 p-4 pt-0 pl-10 text-sm font-[family-name:var(--font-inter)] font-light leading-relaxed w-[90%]">
              {item.description}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function AchievementFAQ() {
  const sectionRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
  });

  // Reveal/unreveal
  const headerOpacity = useTransform(smoothProgress, [0, 0.15, 0.3, 0.85, 1], [0, 1, 1, 1, 0]);
  const headerY = useTransform(smoothProgress, [0, 0.2, 0.3, 0.85, 1], [30, 0, 0, 0, -20]);
  const containerOpacity = useTransform(smoothProgress, [0, 0.2, 0.35, 0.8, 1], [0, 1, 1, 1, 0]);
  const containerY = useTransform(smoothProgress, [0, 0.25, 0.35, 0.8, 1], [40, 0, 0, 0, -30]);

  const handleClick = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section
      ref={sectionRef}
      id="achievement-faq"
      className="relative py-20 px-8 lg:px-20"
      style={{ background: "#0a0a0a" }}
    >
      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          backgroundSize: "150px 150px",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header — scroll-driven reveal + unreveal */}
        <motion.div
          className="mb-12"
          style={{
            opacity: headerOpacity,
            y: headerY,
          }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-600 font-[family-name:var(--font-inter)] block mb-3">
            Questions & Answers
          </span>
          <h2 className="text-4xl lg:text-5xl uppercase text-white leading-tight">
            FAQ
          </h2>
          <div className="w-12 h-[2px] bg-white/20 mt-4" />
        </motion.div>

        {/* FAQ Container — scroll-driven reveal + unreveal */}
        <motion.div
          className="bg-[#111] border border-white/[0.04] rounded-lg p-2"
          style={{
            opacity: containerOpacity,
            y: containerY,
          }}
        >
          {FAQ_ITEMS.map((item, index) => (
            <FAQItem
              key={item.title}
              item={item}
              index={index}
              activeIndex={activeIndex}
              onClick={() => handleClick(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
