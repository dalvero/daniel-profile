"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Journey() {
    const containerRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Konfigurasi Spring untuk mengatur smooth animasi
    const springConfig = { stiffness: 40, damping: 25 };

    // Parallax image
    const y1 = useSpring(useTransform(scrollYProgress, [0, 0.3], [0, -150]), springConfig);
    const y2 = useSpring(useTransform(scrollYProgress, [0.1, 0.5], [0, -200]), springConfig);
    const y3 = useSpring(useTransform(scrollYProgress, [0.3, 0.7], [0, -180]), springConfig);
    const y4 = useSpring(useTransform(scrollYProgress, [0.5, 0.9], [0, -250]), springConfig);
    const y5 = useSpring(useTransform(scrollYProgress, [0.7, 1], [0, -150]), springConfig);
    const y6 = useSpring(useTransform(scrollYProgress, [0.05, 0.4], [0, -170]), springConfig);
    const y7 = useSpring(useTransform(scrollYProgress, [0.15, 0.55], [0, -210]), springConfig);
    const y8 = useSpring(useTransform(scrollYProgress, [0.25, 0.65], [0, -190]), springConfig);
    const y9 = useSpring(useTransform(scrollYProgress, [0.4, 0.8], [0, -230]), springConfig);
    const y10 = useSpring(useTransform(scrollYProgress, [0.55, 0.85], [0, -160]), springConfig);
    const y11 = useSpring(useTransform(scrollYProgress, [0.65, 0.95], [0, -200]), springConfig);
    const y12 = useSpring(useTransform(scrollYProgress, [0.8, 1], [0, -180]), springConfig);
    const y13 = useSpring(useTransform(scrollYProgress, [0.2, 0.6], [0, -220]), springConfig);

    const imageVariants = {
        hidden: { opacity: 0, y: 100 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 1.5, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <div ref={containerRef} className="flex h-[450vh] bg-white relative overflow-hidden">
        
            {/* Left Section */}
            <div className="w-1/2 flex flex-col z-10 border-r border-gray-50">
                <div className="h-screen flex items-center justify-center p-10">
                    <h1 className="text-6xl text-center uppercase font-normal tracking-[2]">
                        Learn by Experience <br /> and Start the Journey...
                    </h1>
                </div>

                <div className="h-screen flex items-center justify-center p-10">
                    <h1 className="text-6xl text-center uppercase font-normal tracking-[2]">
                        Believing in yourself <br /> is the first...
                    </h1>
                </div>

                <div className="h-screen flex flex-col items-center justify-center p-10">
                    <h1 className="text-9xl text-center uppercase font-normal tracking-[1]">
                        Secret of <br /> Success.
                    </h1>
                </div>

                {/* Quotes & Button */}
                <div className="min-h-screen flex flex-col items-center justify-center space-y-48 py-40">
                    <div className="text-center px-10">
                        <p className="text-xl text-gray-400 italic font-light font-[family-name:var(--font-inter)]">
                            &quot;The only way to do great work <br /> is to love what you do.&quot;
                        </p>
                        <h3 className="mt-4 font-normal text-xl uppercase tracking-[2]">- Steve Jobs -</h3>
                    </div>

                    <div className="text-center px-10">
                        <p className="text-xl text-gray-400 italic font-light font-[family-name:var(--font-inter)]">
                            &quot;If you can&apos;t do great things, do <br /> small things in a great way.&quot;
                        </p>
                        <h3 className="mt-4 font-normal text-xl uppercase tracking-[2]">- Napoleon Hill -</h3>
                    </div>

                    <div className="text-center px-10">
                        <p className="text-xl text-gray-400 italic font-light font-[family-name:var(--font-inter)]">
                            &quot;One must be sane to think clearly but <br /> one can think deeply and be quite insane.&quot;
                        </p>
                        <h3 className="mt-4 font-normal text-xl uppercase tracking-[2]">- Nikola Tesla -</h3>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: "#000", color: "#fff" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-4 border-2 border-black text-black text-xl font-normal cursor-pointer uppercase tracking-[0.4em] transition-all"
                    >
                        Hire Daniel
                    </motion.button>
                </div>
            </div>

            {/* Right Section */}
            <div className="w-1/2 relative h-full">

                {/* Gambar 1 */}
                <motion.div 
                    style={{ y: y1 }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} 
                    variants={imageVariants}
                    className="absolute top-[5vh] left-[10%] w-[280px] h-[380px] z-10 shadow-sm">
                    <Image 
                        src="/images/cimory.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 2) */}
                <motion.div 
                    style={{ y: y6 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[45vh] right-[15%] w-[250px] h-[320px] z-10">
                    <Image 
                        src="/images/partime_2.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-8 border-white shadow-lg hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 3 */}
                <motion.div 
                    style={{ y: y2 }} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-10%" }} 
                    variants={imageVariants}
                    className="absolute top-[85vh] left-[20%] w-[320px] h-[450px] z-10">
                    <Image 
                        src="/images/partime_1.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-[15px] border-gray-50 shadow-lg hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 4 */}
                <motion.div 
                    style={{ y: y7 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[125vh] right-[5%] w-[300px] h-[400px] z-10">
                    <Image 
                        src="/images/presentasi_1.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 5 */}
                <motion.div 
                    style={{ y: y13 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[155vh] left-[10%] w-[220px] h-[300px] z-10">
                    <Image 
                        src="/images/sicegah_1.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-4 border-black hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 6 */}
                <motion.div 
                    style={{ y: y3 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[190vh] right-[10%] w-[400px] h-[280px] z-10 shadow-2xl">
                    <Image 
                        src="/images/olivia_juara_1.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 7 */}
                <motion.div 
                    style={{ y: y8 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[225vh] left-[5%] w-[280px] h-[400px] z-10">
                    <Image 
                        src="/images/olivia_fotbar_3.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-8 border-gray-100 shadow-xl hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 8 */}
                <motion.div 
                    style={{ y: y4 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[270vh] right-[15%] w-[260px] h-[380px] z-10">
                    <Image 
                        src="/images/olivia_juara_3.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-8 border-white shadow-xl hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gamba 9 */}
                <motion.div 
                    style={{ y: y9 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[305vh] left-[15%] w-[380px] h-[260px] z-10 shadow-lg">
                    <Image 
                        src="/images/olivia_fotbar_1.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gamber 10 */}
                <motion.div 
                    style={{ y: y10 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[335vh] right-[10%] w-[240px] h-[340px] z-10">
                    <Image 
                        src="/images/olivia_fotbar_4.jpeg"
                        alt="" 
                        fill 
                        className="object-cover border-[12px] border-white shadow-md hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 11 */}
                <motion.div 
                    style={{ y: y5 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[370vh] left-[10%] w-[350px] h-[250px] z-10 shadow-xl">
                    <Image 
                        src="/images/olivia_fotbar_2.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-[10px] border-white shadow-lg hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 12 */}
                <motion.div 
                    style={{ y: y11 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[400vh] right-[20%] w-[300px] h-[200px] z-10">
                    <Image 
                        src="/images/olivia_juara_2.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>

                {/* Gambar 13 */}
                <motion.div 
                    style={{ y: y12 }} initial="hidden" whileInView="visible" viewport={{ once: true }} 
                    variants={imageVariants}
                    className="absolute top-[420vh] left-[20%] w-[260px] h-[360px] z-10">
                    <Image 
                        src="/images/daniel.jpeg" 
                        alt="" 
                        fill 
                        className="object-cover border-4 border-gray-200 hover:grayscale-0 brightness-110 contrast-110 transition-all duration-700 grayscale" 
                    />
                </motion.div>
            </div>
        </div>
    );
}