"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import BlurText from "./BlurText";

// Main Component
export default function HeroAbout() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
  });

  // Foto parallax — lambat, pergerakan minimal
  const photoY = useTransform(smoothProgress, [0, 1], ["10%", "5%"]);
  const photoX = useTransform(smoothProgress, [0, 1], ["-10%", "-10%"]);
  const photoScale = useTransform(smoothProgress, [0, 1], [1.2, 1.3]);
  const photoOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0.3]);

  // Editorial text parallax — bergerak lebih cepat dari background
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "-20%"]);

  return (
    <section
      ref={sectionRef}
      id="about-hero"
      className="relative overflow-hidden"
      style={{ background: "#0a0a0a" }}
    >
      {/* Hero photo + editorial text overlay */}
      <div className="relative w-full overflow-hidden h-[180vh]">
        <motion.div
          className="absolute inset-0"
          style={{ x: photoX, y: photoY, scale: photoScale, opacity: photoOpacity }}
        >
          <Image
            src="/images/formal_daniel.png"
            alt="Daniel Jefry Alfero"
            fill
            sizes="100vw"
            quality={100}
            className="object-cover object-top grayscale"
            priority
          />
        </motion.div>

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.05]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            backgroundSize: "150px 150px",
          }}
        />

        {/* Editorial Text */}
        <motion.div
          className="absolute inset-0 flex items-end justify-end"
          style={{ zIndex: 10, y: textY }}
        >
          <div className="text-white gap-8 h-full w-170 pl-10 pr-30 pt-100 pb-40 flex flex-col justify-start">
            {/* Who am i */}
            <div>
              <BlurText
                text="Who am i."
                stagger={0.02}
                className="text-xs font-[family-name:var(--font-inter)] mb-4"
              />
              <BlurText
                text="Berkuliah di Universitas Brawijaya, berfokus pada Web Development dan Desain. Sebagai Mentor Web Technology di Provoks, saya membimbing teman-teman memahami dunia web dari dasar hingga implementasi. Saat ini, saya terus bereksplorasi menggabungkan kode dan desain untuk menciptakan pengalaman digital yang bermakna."
                stagger={0.002}
                className="text-3xl font-[family-name:var(--font-inter)] font-normal"
              />
            </div>
            {/* What drives me */}
            <div>
              <BlurText
                text="What drives me."
                stagger={0.02}
                className="text-xs font-[family-name:var(--font-inter)] mb-4"
              />
              <BlurText
                text="Kode yang bersih, desain yang presisi, dan pengalaman nyata bagi pengguna. Setiap proyek saya bangun dengan memperhatikan detail dari tipografi yang tepat hingga interaksi yang terasa hidup. Bagi saya, web bukan hanya soal tampilan, tapi bagaimana ia dirasakan."
                stagger={0.002}
                className="text-3xl font-[family-name:var(--font-inter)] font-normal"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Gradient bawah — di luar container scroll, selalu di bawah section */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: "50%",
          background:
            "linear-gradient(to top, #0a0a0a 0%, #0a0a0a 40%, rgba(10,10,10,0.6) 70%, transparent 100%)",
          zIndex: 5,
        }}
      />
    </section>
  );
}
