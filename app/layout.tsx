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
import FloatingWhatsApp from "@/components/FloatingWhatsApp";

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://digital-hub.rasyid-hidayat.cloud";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Jasa Pembuatan Website, Landing Page UMKM & Undangan Digital | Digital Hub",
    template: "%s | Digital Hub",
  },
  description:
    "Jasa pembuatan website profesional, landing page konversi tinggi untuk bisnis & UMKM, serta undangan pernikahan digital interaktif dengan performa ultra-cepat PageSpeed Score A.",
  keywords: [
    "Jasa Pembuatan Website",
    "Jasa Landing Page UMKM",
    "Jasa Bikin Website Company Profile",
    "Undangan Pernikahan Digital Website",
    "Jasa Web Developer Indonesia",
    "Template Website Next.js",
    "Jasa Desain Website",
    "Web Developer Temanggung",
    "Landing Page Konversi Tinggi",
  ],
  authors: [{ name: "Digital Hub Team", url: siteUrl }],
  creator: "Digital Hub",
  publisher: "Digital Hub",
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Digital Hub | Jasa Pembuatan Website & Landing Page Konversi Tinggi",
    description:
      "Tingkatkan omset dan kredibilitas bisnis Anda dengan website berkecepatan tinggi, mobile-friendly, dan dioptimalkan untuk SEO.",
    url: siteUrl,
    siteName: "Digital Hub",
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital Hub | Solusi Web & Landing Page Bisnis",
    description:
      "Rekayasa website modern ultra-cepat untuk melipatgandakan omset dan branding bisnis Anda.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Digital Hub",
      description: "Jasa Pembuatan Website, Landing Page & Undangan Digital",
      inLanguage: "id-ID",
    },
    {
      "@type": "ProfessionalService",
      "@id": `${siteUrl}/#organization`,
      name: "Digital Hub",
      url: siteUrl,
      telephone: "+6285111232733",
      email: "rasyidh55@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Temanggung",
        addressRegion: "Jawa Tengah",
        addressCountry: "ID",
      },
      priceRange: "$$",
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "08:00",
        closes: "21:00",
      },
    },
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
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col grid-glow-background antialiased selection:bg-cyan-500/30 selection:text-white crt-flicker dark-theme">
        <div className="crt-overlay" />
        <SmoothScroll>
          <Header />
          <main className="flex-grow flex flex-col">{children}</main>
          <Footer />
          <RetroSettings />
          <FloatingWhatsApp />
        </SmoothScroll>
      </body>
    </html>
  );
}
