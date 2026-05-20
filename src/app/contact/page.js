import ContactHero from "@/components/contact/ContactHero";
import ContactSection from "@/components/contact/ContactSection";

export const metadata = {
  title: "Contact — Daniel Alfero",
  description:
    "Hubungi Daniel Alfero untuk kolaborasi, magang, atau proyek menarik.",
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactSection />
    </main>
  );
}
