"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, createContext, useContext, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";

const TARGET_TEXT = "DANIEL.ALFERO";
const SCRAMBLE_CHARS = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン";

const CurtainContext = createContext(null);

export function useCurtain() {
    return useContext(CurtainContext);
}

export default function PageTransition({ children }) {
    const pathname = usePathname();
    const router = useRouter();
    const [phase, setPhase] = useState("idle");
    const [displayText, setDisplayText] = useState("");
    const [progress, setProgress] = useState(0);
    const targetPath = useRef(null);

    // Escape hatch: jika pathname berubah tanpa curtain (misal browser back)
    useEffect(() => {
        if (phase !== "idle" && !targetPath.current) {
            setPhase("idle");
        }
    }, [pathname, phase]);

    const navigate = useCallback((href) => {
        if (phase !== "idle") return;

        targetPath.current = href;
        setDisplayText("");
        setProgress(0);
        setPhase("curtain-in");
    }, [phase]);

    // Curtain masuk selesai → mulai scramble
    useEffect(() => {
        if (phase !== "curtain-in") return;

        const timer = setTimeout(() => {
            setPhase("scramble");

            let currentIndex = 0;
            let scrambleState = false;
            let stepCount = 0;
            const totalSteps = TARGET_TEXT.length * 2 + 1;

            const interval = setInterval(() => {
                if (currentIndex <= TARGET_TEXT.length) {
                    if (!scrambleState) {
                        const randomChar = SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
                        setDisplayText(
                            TARGET_TEXT.slice(0, currentIndex) +
                            (currentIndex < TARGET_TEXT.length ? randomChar : "")
                        );
                        scrambleState = true;
                    } else {
                        setDisplayText(TARGET_TEXT.slice(0, currentIndex + 1));
                        scrambleState = false;
                        currentIndex++;
                    }
                    stepCount++;
                    setProgress(Math.min((stepCount / totalSteps) * 100, 100));
                } else {
                    clearInterval(interval);
                    // Navigasi terjadi di balik tirai
                    if (targetPath.current) {
                        router.push(targetPath.current);
                    }
                    setTimeout(() => setPhase("reveal"), 200);
                }
            }, 50);

            return () => clearInterval(interval);
        }, 500); // tunggu curtain-in selesai

        return () => clearTimeout(timer);
    }, [phase, router]);

    // Reveal selesai → idle
    useEffect(() => {
        if (phase !== "reveal") return;
        const timer = setTimeout(() => {
            setPhase("idle");
            targetPath.current = null;
        }, 600);
        return () => clearTimeout(timer);
    }, [phase]);

    return (
        <CurtainContext.Provider value={{ navigate, phase }}>
            {children}

            <AnimatePresence>
                {phase !== "idle" && (
                    <motion.div
                        key="curtain-layer"
                        initial={{ y: "-100%" }}
                        animate={{ y: "0%" }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed inset-0 z-[9999] bg-black overflow-hidden"
                    >
                        {/* Scramble Text */}
                        <div className="absolute inset-0 flex items-center justify-center z-10">
                            <div className="mix-blend-difference">
                                <h1 className="text-white text-4xl md:text-6xl font-black uppercase tracking-[0.2em] font-mono">
                                    {displayText}
                                    {phase !== "idle" && displayText && (
                                        <span className="inline-block w-[3px] h-[32px] md:h-[50px] bg-white ml-2 align-middle animate-pulse" />
                                    )}
                                </h1>
                            </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-800 z-20">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.1, ease: "linear" }}
                                className="h-full bg-white"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </CurtainContext.Provider>
    );
}
