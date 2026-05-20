import AchievementHero from "@/components/achievement/AchievementHero";
import AchievementCarousel from "@/components/achievement/AchievementCarousel";
import AchievementFAQ from "@/components/achievement/AchievementFAQ";
import AchievementCTA from "@/components/achievement/AchievementCTA";

export const metadata = {
  title: "Achievements — Daniel Alfero",
  description:
    "Pencapaian, penghargaan, dan milestone oleh Daniel Alfero — kompetisi, akademik, organisasi, dan proyek.",
};

export default function AchievementPage() {
  return (
    <main>
      <AchievementHero />
      <AchievementCarousel />
      <AchievementFAQ />
      <AchievementCTA />
    </main>
  );
}
