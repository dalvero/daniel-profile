"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { Award, Trophy, Users, GraduationCap, Rocket } from "lucide-react";
import Image from "next/image";
import achievements from "@/data/achievements.json";

const CATEGORY_ICONS = {
  Competition: Trophy,
  Project: Rocket,
  Organization: Users,
  Academic: GraduationCap,
  Award: Award,
};

const DRAG_BUFFER = 0;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const SPRING_OPTIONS = { type: "spring", stiffness: 300, damping: 30 };

function CarouselItem({ item, index, itemWidth, trackItemOffset, x, transition }) {
  const range = [
    -(index + 1) * trackItemOffset,
    -index * trackItemOffset,
    -(index - 1) * trackItemOffset,
  ];
  const outputRange = [90, 0, -90];
  const rotateY = useTransform(x, range, outputRange, { clamp: false });

  const Icon = CATEGORY_ICONS[item.category] || Award;

  return (
    <motion.div
      key={`${item?.id ?? index}-${index}`}
      className="relative shrink-0 flex flex-col items-start justify-between bg-[#141414] border border-white/[0.04] overflow-hidden cursor-grab active:cursor-grabbing"
      style={{
        width: itemWidth,
        height: "100%",
        rotateY: rotateY,
        borderRadius: "12px",
      }}
      transition={transition}
    >
      {/* Image */}
      <div className="relative w-full h-60 overflow-hidden">
        <Image
          src={item.image}
          alt={item.title}
          fill
          sizes={`${itemWidth}px`}
          className="object-cover grayscale"
        />
        {/* Color overlay */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: `linear-gradient(135deg, ${item.color} 0%, transparent 60%)`,
          }}
        />
        {/* Category badge */}
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[9px] tracking-[0.3em] uppercase text-white/60 font-[family-name:var(--font-inter)] bg-black/50 px-2 py-1 rounded-sm backdrop-blur-sm">
            {item.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        {/* Icon + Event */}
        <div>
          <div className="flex items-center gap-3 mb-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-full"
              style={{ backgroundColor: `${item.color}20` }}
            >
              <Icon size={16} style={{ color: item.color }} />
            </span>
            <span className="text-[10px] tracking-[0.3em] uppercase text-zinc-500 font-[family-name:var(--font-inter)]">
              {item.event}
            </span>
          </div>

          {/* Title */}
          <h3 className="text-lg font-semibold capitalize font-[family-name:var(--font-inter)] text-white mb-2">
            {item.title}
          </h3>

          {/* Description */}
          <p className="text-sm text-zinc-400 font-[family-name:var(--font-inter)] font-light leading-relaxed line-clamp-3">
            {item.description}
          </p>
        </div>

        {/* Year */}
        <div className="mt-4 pt-3 border-t border-white/[0.04]">
          <span className="text-xs text-zinc-600 tracking-[3px] uppercase font-[family-name:var(--font-inter)]">
            {item.year}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

export default function AchievementCarousel() {
  const baseWidth = 520;
  const containerPadding = 16;
  const itemWidth = baseWidth - containerPadding * 2;
  const trackItemOffset = itemWidth + GAP;
  const loop = true;

  const itemsForRender = useMemo(() => {
    if (!loop) return achievements;
    if (achievements.length === 0) return [];
    return [achievements[achievements.length - 1], ...achievements, achievements[0]];
  }, [loop]);

  const [position, setPosition] = useState(1);
  const x = useMotionValue(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Autoplay
  useEffect(() => {
    if (itemsForRender.length <= 1 || isHovered) return undefined;

    const timer = setInterval(() => {
      setPosition((prev) => Math.min(prev + 1, itemsForRender.length - 1));
    }, 3500);

    return () => clearInterval(timer);
  }, [isHovered, itemsForRender.length]);

  // Sync x motion value when trackItemOffset changes
  useLayoutEffect(() => {
    x.set(-1 * trackItemOffset);
  }, [trackItemOffset, x]);

  // Clamp position when items change
  const maxPos = itemsForRender.length - 1;
  if (position > maxPos) {
    setPosition(Math.max(0, maxPos));
  }

  const effectiveTransition = isJumping ? { duration: 0 } : SPRING_OPTIONS;

  const handleAnimationStart = () => {
    setIsAnimating(true);
  };

  const handleAnimationComplete = () => {
    if (itemsForRender.length <= 1) {
      setIsAnimating(false);
      return;
    }
    const lastCloneIndex = itemsForRender.length - 1;

    if (position === lastCloneIndex) {
      setIsJumping(true);
      const target = 1;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    if (position === 0) {
      setIsJumping(true);
      const target = achievements.length;
      setPosition(target);
      x.set(-target * trackItemOffset);
      requestAnimationFrame(() => {
        setIsJumping(false);
        setIsAnimating(false);
      });
      return;
    }

    setIsAnimating(false);
  };

  const handleDragEnd = (_, info) => {
    const { offset, velocity } = info;
    const direction =
      offset.x < -DRAG_BUFFER || velocity.x < -VELOCITY_THRESHOLD
        ? 1
        : offset.x > DRAG_BUFFER || velocity.x > VELOCITY_THRESHOLD
          ? -1
          : 0;

    if (direction === 0) return;

    setPosition((prev) => {
      const next = prev + direction;
      const max = itemsForRender.length - 1;
      return Math.max(0, Math.min(next, max));
    });
  };

  const activeIndex =
    achievements.length === 0
      ? 0
      : ((position - 1 + achievements.length) % achievements.length);

  return (
    <section
      id="achievement-carousel"
      className="relative py-20 overflow-hidden"
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

      <div className="relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12 px-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="text-[10px] tracking-[0.5em] uppercase text-zinc-600 font-[family-name:var(--font-inter)] block mb-3">
            Recognition
          </span>
          <h2 className="text-4xl lg:text-5xl uppercase text-white leading-tight">
            {achievements.length} ACHIEVEMENTS
          </h2>
          <div className="w-12 h-[2px] bg-white/20 mt-4 mx-auto" />
        </motion.div>

        {/* Carousel */}
        <div className="flex justify-center">
          <div
            ref={containerRef}
            className="relative overflow-hidden p-4 rounded-[24px] border border-white/[0.04]"
            style={{ width: `${baseWidth}px`, height: "620px" }}
          >
            <motion.div
              className="flex"
              drag={isAnimating ? false : "x"}
              dragConstraints={{
                left: -trackItemOffset * Math.max(itemsForRender.length - 1, 0),
                right: 0,
              }}
              style={{
                width: itemWidth,
                gap: `${GAP}px`,
                perspective: 1000,
                perspectiveOrigin: `${position * trackItemOffset + itemWidth / 2}px 50%`,
                x,
              }}
              onDragEnd={handleDragEnd}
              animate={{ x: -(position * trackItemOffset) }}
              transition={effectiveTransition}
              onAnimationStart={handleAnimationStart}
              onAnimationComplete={handleAnimationComplete}
            >
              {itemsForRender.map((item, index) => (
                <CarouselItem
                  key={`${item?.id ?? index}-${index}`}
                  item={item}
                  index={index}
                  itemWidth={itemWidth}
                  trackItemOffset={trackItemOffset}
                  x={x}
                  transition={effectiveTransition}
                />
              ))}
            </motion.div>

            {/* Dots */}
            <div className="flex w-full justify-center">
              <div className="mt-4 flex w-[150px] justify-between px-8">
                {achievements.map((_, index) => (
                  <motion.div
                    key={index}
                    className={`h-2 w-2 rounded-full cursor-pointer transition-colors duration-150 ${
                      activeIndex === index
                        ? "bg-white"
                        : "bg-white/20"
                    }`}
                    animate={{
                      scale: activeIndex === index ? 1.2 : 1,
                    }}
                    onClick={() => setPosition(index + 1)}
                    transition={{ duration: 0.15 }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Drag hint */}
        <motion.p
          className="text-center mt-6 text-[10px] tracking-[0.3em] uppercase text-zinc-600 font-[family-name:var(--font-inter)]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Drag to explore
        </motion.p>
      </div>
    </section>
  );
}
