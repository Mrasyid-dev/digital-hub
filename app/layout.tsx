import type { Metadata } from "next";
import {
  Plus_Jakarta_Sans,
  Pixelify_Sans,
  Press_Start_2P,
  Share_Tech_Mono,
  VT323,
} from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import RetroSettings from "@/components/RetroSettings";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const pixelifySans = Pixelify_Sans({
  variable: "--font-pixelify",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const pressStart2P = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: ["400"],
});

const shareTechMono = Share_Tech_Mono({
  variable: "--font-share-tech",
  subsets: ["latin"],
  weight: ["400"],
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Digital Products Hub | Premium UI/UX Templates & Custom Websites",
  description:
    "Showcase premium digital products, online wedding invitations, corporate landing pages, and responsive web developments custom-built for performance.",
  keywords: [
    "Digital Products",
    "Undangan Online",
    "Company Profile",
    "Landing Page",
    "Next.js Developer",
    "Web Design Portfolio",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${plusJakartaSans.variable} ${pixelifySans.variable} ${pressStart2P.variable} ${shareTechMono.variable} ${vt323.variable} scroll-smooth`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col grid-glow-background antialiased selection:bg-cyan-500/30 selection:text-white crt-flicker dark-theme">
        <div className="crt-overlay" />
        <SmoothScroll>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <RetroSettings />
        </SmoothScroll>
      </body>
    </html>
  );
}
