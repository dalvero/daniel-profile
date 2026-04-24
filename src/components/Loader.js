"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const TARGET_TEXT = "DANIEL.ALFERO";
const CHARS = "0123456789!@#$%^&*()_+?/<>{}[]";

export default function Loader() {
    const [displayText, setDisplayText] = useState("");
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        let currentIndex = 0;
        let scrambleState = false; // Gunakan variabel lokal untuk menghindari warning dependency

        const interval = setInterval(() => {
        if (currentIndex <= TARGET_TEXT.length) {
            if (!scrambleState) {
            const randomChar = CHARS[Math.floor(Math.random() * CHARS.length)];
            setDisplayText(TARGET_TEXT.slice(0, currentIndex) + (currentIndex < TARGET_TEXT.length ? randomChar : ""));
            scrambleState = true;
            } else {
            setDisplayText(TARGET_TEXT.slice(0, currentIndex + 1));
            scrambleState = false;
            currentIndex++;
            }
        } else {
            clearInterval(interval);
        }
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
        setProgress((oldProgress) => {
            if (oldProgress === 100) {
            clearInterval(timer);
            return 100;
            }
            const diff = Math.random() * 15;
            return Math.min(oldProgress + diff, 100);
        });
        }, 200);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
        {/* Background Slide */}
        <motion.div
            initial={{ x: "100%" }}
            animate={{ x: `${100 - progress}%` }}
            transition={{ ease: "linear" }}
            className="absolute inset-0 bg-[rgb(225,227,229)] z-0"
        />

            {/* Teks dengan Mix Blend Mode */}
            <div className="relative z-10 mix-blend-difference">
                <h1 className="text-white text-5xl md:text-7xl font-black uppercase tracking-[0.2em] font-mono">
                    {displayText}
                    <span className="inline-block w-[4px] h-[40px] md:h-[60px] bg-white ml-2 align-middle animate-pulse" />
                </h1>
            </div>

            {/* Loading Bar Tipis */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-zinc-800 z-20">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    className="h-full bg-white"
                />
            </div>
        </motion.div>
    );
}