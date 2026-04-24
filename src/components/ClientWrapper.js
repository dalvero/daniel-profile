"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./Loader";

export default function ClientWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      // Loader akan hilang setelah 3.5 detik
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3500);

      return () => clearTimeout(timer);
    }, []);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>
      {/* Navbar dan konten hanya muncul/aktif setelah loading selesai atau tetap render di bawah loader */}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}