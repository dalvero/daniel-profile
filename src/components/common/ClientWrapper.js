"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Loader from "./Loader";

export default function ClientWrapper({ children }) {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoaderComplete = () => {
      // Beri waktu progress bar selesai, lalu hilangkan loader
      setTimeout(() => setIsLoading(false), 800);
    };

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <Loader key="loader" onComplete={handleLoaderComplete} />}
      </AnimatePresence>
      {/* Navbar dan konten hanya muncul/aktif setelah loading selesai atau tetap render di bawah loader */}
      <div className={isLoading ? "opacity-0" : "opacity-100 transition-opacity duration-500"}>
        {children}
      </div>
    </>
  );
}