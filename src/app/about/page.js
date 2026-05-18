// src/app/about/page.js

import HeroAbout from "@/components/about/HeroAbout";
import TimelineSection from "@/components/about/TimelineSection";
import CoreValues from "@/components/about/CoreValues";
import AboutCTA from "@/components/about/AboutCTA";

export const metadata = {
  title: "About — Daniel Alfero",
  description:
    "Mahasiswa Teknologi Informasi Universitas Brawijaya, web developer, dan mentor Web Technology di komunitas Provoks.",
};

export default function AboutPage() {
  return (
    <main>
      <HeroAbout />
      <TimelineSection />
      <CoreValues />
      <AboutCTA /> 
    </main>
  );
}