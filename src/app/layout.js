import { League_Gothic, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/common/Navbar";
import ClientWrapper from "@/components/common/ClientWrapper";
import PageTransition from "@/components/common/PageTransition";

// Font
const leagueGothic = League_Gothic({
  variable: "--font-league-gothic",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700"],
});

export const metadata = {
  title: "Daniel's Profile",
  description: "Let's make this fun",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${leagueGothic.variable} ${inter.variable} h-full antialiased relative`}>
      <body className={`${leagueGothic.variable} font-[family-name:var(--font-league-gothic)] min-h-full flex flex-col`}>
        <ClientWrapper>
          <PageTransition>
            <Navbar />
            {children}
          </PageTransition>
        </ClientWrapper>
      </body>
    </html>
  );
}