"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

const FULL_TEXT = "DANIEL.ALFERO";
const SHORT_TEXT = "D.";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [displayText, setDisplayText] = useState(FULL_TEXT);
    const [animating, setAnimating] = useState(false);

    const currentTextRef = useRef(FULL_TEXT);
    const timeoutRef = useRef(null);
    const lastScrollY = useRef(0);

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
                // delete lebih cepat
                next = current.slice(0, -1);
            } else {
                // typing lebih smooth
                next = target.slice(0, current.length + 1);
            }
            currentTextRef.current = next;
            setDisplayText(next);
            timeoutRef.current = setTimeout(step, current.length > target.length ? 40 : 70);
        };
        step();
    };

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const isScrollingDown = currentScrollY > lastScrollY.current;
            setScrolled(currentScrollY > 20);
            if (isScrollingDown) {
                animateTo(SHORT_TEXT);
            } else {
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

    const dotIndex = displayText.indexOf(".");
    const boldPart = dotIndex !== -1 ? displayText.slice(0, dotIndex) : displayText;
    const lightPart =  dotIndex !== -1 ? displayText.slice(dotIndex) : "";

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-20 py-5 transition-all duration-500
            ${scrolled ? "bg-black shadow-md" : "bg-transparent"}`}>

            {/* Name */}
            <Link href="/" className={`text-3xl font-normal tracking-[12px] transition-all duration-500
                ${scrolled ? "text-white" : "text-black"} ${animating ? "opacity-90" : "opacity-100"}`}>
                {boldPart}
                <span className="font-light">{lightPart}</span>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-8">
                {["About", "Projects", "Achievement", "Contact"].map((item) => (
                    <Link
                        key={item}
                        href={`/${item.toLowerCase()}`}
                        className={`relative text-lg tracking-[3px] uppercase transition-all duration-300 group
                        ${
                        scrolled
                            ? "text-white hover:text-white/80"
                            : "text-black hover:text-black/70"
                        }`}
                    >
                        {item}
                        <span
                        className={`absolute -bottom-1 left-0 w-0 h-px group-hover:w-full transition-all duration-300
                        ${scrolled ? "bg-white" : "bg-black"}`}
                        />
                    </Link>
                ))}

                {/* Divider */}
                <div
                    className={`w-px h-8 transition-colors duration-300 ${
                        scrolled ? "bg-white/30" : "bg-black/30"
                    }`}
                />

                {/* Button */}
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