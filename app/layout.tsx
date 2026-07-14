import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import RetroSettings from "@/components/RetroSettings";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
      className={`${geistSans.variable} ${geistMono.variable} scroll-smooth`}
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
