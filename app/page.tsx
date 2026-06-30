import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code, Clock } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ContactForm from "@/components/ContactForm";
import AmbientBackground from "@/components/AmbientBackground";
import ScrollReveal from "@/components/ScrollReveal";
import WordSearch from "@/components/WordSearch";

export const revalidate = 60; // Revalidate home page data every 60s

export default async function HomePage() {
  // Fetch featured products
  const products = await prisma.product.findMany({
    where: { status: "published" },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full pb-20 bg-[#f9f9fb]">
      {/* 1. Hero Section */}
      <section className="relative pt-28 pb-24 md:pt-40 md:pb-36 overflow-hidden min-h-[90vh] flex items-center">
        {/* Animated Custom Ambient Background (3D Voxel Sunset Landscape) */}
        <AmbientBackground type="hero" />

        {/* Pixelated Stepped Divider at the bottom of Hero */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10 select-none pointer-events-none">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[32px] text-[#f9f9fb] fill-current">
            {/* Background layer for depth */}
            <path d="M0,120 L0,30 L40,30 L40,40 L80,40 L80,50 L120,50 L120,40 L160,40 L160,60 L200,60 L200,70 L240,70 L240,55 L280,55 L280,40 L320,40 L320,50 L360,50 L360,65 L400,65 L400,80 L440,80 L440,70 L480,70 L480,55 L520,55 L520,40 L560,40 L560,50 L600,50 L600,60 L640,60 L640,75 L680,75 L680,85 L720,85 L720,70 L760,70 L760,50 L800,50 L800,40 L840,40 L840,55 L880,55 L880,65 L920,65 L920,80 L960,80 L960,65 L1000,65 L1000,45 L1040,45 L1040,35 L1080,35 L1080,50 L1120,50 L1120,40 L1160,40 L1160,25 L1200,25 L1200,120 Z" className="opacity-40" fill="#f9f9fb"></path>
            {/* Foreground primary layer */}
            <path d="M0,120 L0,50 L40,50 L40,65 L80,65 L80,75 L120,75 L120,60 L160,60 L160,80 L200,80 L200,90 L240,90 L240,75 L280,75 L280,60 L320,60 L320,70 L360,70 L360,85 L400,85 L400,100 L440,100 L440,90 L480,90 L480,75 L520,75 L520,60 L560,60 L560,70 L600,70 L600,80 L640,80 L640,95 L680,95 L680,105 L720,105 L720,90 L760,90 L760,70 L800,70 L800,60 L840,60 L840,75 L880,75 L880,85 L920,85 L920,100 L960,100 L960,85 L1000,85 L1000,65 L1040,65 L1040,55 L1080,55 L1080,70 L1120,70 L1120,60 L1160,60 L1160,45 L1200,45 L1200,120 Z" fill="#f9f9fb"></path>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-left w-full">
          <div className="max-w-3xl space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-emerald-950/70 border-4 border-emerald-500 text-xs font-bold text-emerald-300 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                <span className="font-pixel text-[9px]">SYS.STATUS: PREMIUM_SHOWCASE</span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <h1 className="text-4xl sm:text-7xl font-bold tracking-tight text-white leading-[1.1] font-title">
                Ubah Ide Anda Menjadi{" "}
                <span className="text-emerald-400 text-glow-brand select-none">
                  Website Premium
                </span>{" "}
                dengan Sentuhan{" "}
                <span className="font-serif text-sky-200 select-none text-glow-brand">Magic</span>
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <p className="text-xs sm:text-sm text-gray-200 max-w-xl leading-relaxed font-mono font-medium">
                Koleksi template landing page bisnis berkinerja tinggi, portofolio digital premium, dan custom website interaktif yang dioptimalkan untuk kecepatan dan visual memukau.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.4}>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/website"
                  className="px-6 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[9px] uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
                >
                  <span>Lihat Demo Template</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
                <Link
                  href="/custom"
                  className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-pixel text-[9px] uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                >
                  Request Custom Web
                </Link>
              </div>
            </ScrollReveal>

            {/* Stats Badges (HUD-style boxes over 3D Voxel canvas) */}
            <ScrollReveal delay={0.5}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10">
                {[
                  { label: "Project Selesai", val: "50+", desc: "UNDANGAN & WEBSITE" },
                  { label: "Kecepatan PageSpeed", val: "100%", desc: "OPTIMASI EKSTRIM (A)" },
                  { label: "Responsive", val: "AUTO", desc: "MOBILE & TABLET" },
                  { label: "Klien Puas", val: "99.9%", desc: "REVIEW BINTANG 5" },
                ].map((stat, idx) => (
                  <div key={idx} className="bg-[#0b0518] p-4 border-2 border-emerald-500/50 hover:border-emerald-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none transition-all text-center group">
                    <span className="block text-xl font-bold text-emerald-300 tracking-tight font-pixel group-hover:text-emerald-200 transition-colors">
                      {stat.val}
                    </span>
                    <span className="block text-[8px] font-bold text-white mt-2 uppercase tracking-wide font-pixel">{stat.label}</span>
                    <span className="block text-[8px] text-gray-400 mt-1 font-mono">{stat.desc}</span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 2. Categories Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#f9f9fb]">
        <ScrollReveal delay={0.1}>
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight font-title">
              Layanan Utama & Kategori
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-mono">
              Solusi digital terlengkap yang dirancang khusus untuk mempercepat pertumbuhan bisnis dan memperkuat kehadiran online Anda.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[220px]">
          {/* Card A: Large Feature Box (Website & Landing Page) */}
          <div className="md:col-span-2 md:row-span-2">
            <ScrollReveal delay={0.15}>
              <div className="w-full h-full bg-white pixel-border p-8 flex flex-col justify-between group hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 pointer-events-none" />
                <div className="space-y-4 max-w-md">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 flex items-center justify-center border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Code className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-800 tracking-tight font-title">Website & Landing Page Premium</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-mono font-medium">
                    Desain landing page bisnis, startup, UMKM, maupun portofolio personal. Dibangun dengan optimasi performa ultra cepat (Lighthouse Score A) dan SEO-friendly.
                  </p>
                </div>
                
                {/* Floating preview graphics */}
                <div className="absolute bottom-6 right-6 w-48 h-32 hidden md:block border-2 border-black bg-gray-50 overflow-hidden p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <div className="flex items-center gap-1.5 border-b border-black pb-1.5 mb-2">
                    <div className="w-2 h-2 bg-red-500 border border-black" />
                    <div className="w-2 h-2 bg-yellow-500 border border-black" />
                    <div className="w-2 h-2 bg-green-500 border border-black" />
                  </div>
                  <div className="text-[9px] font-mono text-gray-500 space-y-1">
                    <p className="text-emerald-600">{"const speed = 100;"}</p>
                    <p className="text-sky-600">{"const seo = \"A+\";"}</p>
                    <p className="text-indigo-600">{"const style = \"Retro\";"}</p>
                  </div>
                </div>

                <Link
                  href="/website"
                  className="mt-8 flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 transition-colors z-10 font-pixel"
                >
                  <span>&gt; JELAJAHI TEMPLATE</span>
                </Link>
              </div>
            </ScrollReveal>
          </div>

          {/* Card B: Performance Circular Stat */}
          <div className="md:col-span-1 md:row-span-1">
            <ScrollReveal delay={0.2}>
              <div className="w-full h-full bg-white pixel-border p-6 flex flex-col justify-between group hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <h3 className="text-[10px] font-pixel font-bold text-gray-800 tracking-tight">OPTIMIZED</h3>
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                </div>
                <div className="flex items-center justify-center py-1">
                  <div className="relative w-20 h-20 border-4 border-black flex flex-col items-center justify-center bg-emerald-50/50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <span className="text-xl font-bold text-gray-800 leading-none font-pixel">100%</span>
                    <span className="text-[6px] text-emerald-600 font-bold uppercase tracking-wider mt-1 font-pixel">SPEED</span>
                  </div>
                </div>
                <span className="text-[9px] text-gray-500 text-center font-bold font-mono">Score Kecepatan Seluler Maksimal</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Card C: Pengerjaan Kilat */}
          <div className="md:col-span-1 md:row-span-1">
            <ScrollReveal delay={0.25}>
              <div className="w-full h-full bg-white pixel-border p-6 flex flex-col justify-between group hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 relative overflow-hidden">
                <div className="flex justify-between items-start">
                  <h3 className="text-[10px] font-pixel font-bold text-gray-800 tracking-tight">KILAT</h3>
                  <Clock className="w-4 h-4 text-sky-500 animate-pulse" />
                </div>
                <div className="flex items-baseline gap-1 py-1">
                  <span className="text-3xl font-bold text-gray-800 tracking-tight font-serif">1-3</span>
                  <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide font-pixel">Hari</span>
                </div>
                <span className="text-[9px] text-gray-500 font-bold font-mono">Website siap mengudara secara profesional setelah data kami terima.</span>
              </div>
            </ScrollReveal>
          </div>

          {/* Card D: Large Custom Dev Box */}
          <div className="md:col-span-3 md:row-span-1">
            <ScrollReveal delay={0.3}>
              <div className="w-full h-full bg-white pixel-border p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 group hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 relative overflow-hidden">
                <div className="space-y-2 max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 border border-black bg-emerald-50 text-[9px] font-pixel text-emerald-600 uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                    Custom Project
                  </div>
                  <h3 className="text-base font-bold text-gray-800 font-title">Butuh Web Kustom / Aplikasi Spesifik?</h3>
                  <p className="text-xs text-gray-500 leading-relaxed font-mono font-medium">
                    Kami melayani pembuatan website kustom dari nol, sistem manajemen data (CMS), integrasi API pembayaran, dashboard admin dinamis, serta optimasi backend yang andal.
                  </p>
                </div>
                
                <Link
                  href="/custom"
                  className="flex items-center gap-1.5 text-xs font-bold px-6 py-3.5 bg-gray-800 text-white font-pixel text-[9px] uppercase border-4 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all shrink-0"
                >
                  <span>Konsultasi Layanan Custom</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 3. Featured Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#f9f9fb]">
        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-16">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold text-gray-800 tracking-tight font-title">
                Highlight Produk & Demo Live
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 max-w-xl leading-relaxed font-mono">
                Klik salah satu produk untuk menguji coba demo interaktif di dalam *iframe device mockup* secara langsung.
              </p>
            </div>
            <Link
              href="/website"
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-600 font-pixel text-[9px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all shrink-0"
            >
              <span>Semua Produk</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </ScrollReveal>

        {products.length === 0 ? (
          <ScrollReveal delay={0.2}>
            <div className="text-center py-20 bg-white border border-gray-100 rounded-3xl">
              <p className="text-sm text-gray-400 font-semibold">Belum ada produk yang dipublikasikan.</p>
            </div>
          </ScrollReveal>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, idx) => (
              <ScrollReveal key={product.id} delay={0.1 * idx}>
                <ProductCard product={product} />
              </ScrollReveal>
            ))}
          </div>
        )}
      </section>

      {/* 4. Interactive Word Search Game Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#f9f9fb]">
        <ScrollReveal delay={0.1}>
          <div className="text-center space-y-2 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight font-title">
              Cari Layanan Kami
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-mono">
              Sambil bersantai, coba temukan kata kunci teknologi dan layanan yang kami tawarkan dalam teka-teki kata interaktif di bawah ini!
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal delay={0.2}>
          <WordSearch />
        </ScrollReveal>
      </section>

      {/* 4.5 Custom Pricing Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#f9f9fb]">
        <ScrollReveal delay={0.1}>
          <div className="text-center space-y-3 mb-16">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 border-2 border-black bg-emerald-50 text-[9px] font-bold text-emerald-600 uppercase tracking-wider font-pixel shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles className="w-3 h-3 animate-pulse" />
              <span>Daftar Harga</span>
            </span>
            <h2 className="text-3xl font-bold text-gray-800 tracking-tight font-title">
              Estimasi Harga Jasa Web Custom
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 max-w-xl mx-auto leading-relaxed font-bold font-mono">
              Temukan kategori website yang sesuai dengan kebutuhan bisnis Anda. Kami menawarkan harga fleksibel dengan spesifikasi berkinerja tinggi.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Landing Page */}
          <ScrollReveal delay={0.15}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Landing Page</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-pixel">PROMOSI PRODUK</p>
                </div>
                <div className="text-xl font-bold text-emerald-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Rp 900rb - 2.5jt
                </div>
                <ul className="space-y-2 text-xs text-gray-500 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>1 Halaman Fokus Utama</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Desain Ultra-Responsive</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Integrasi Direct Chat WA</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Formulir Leads Collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Optimasi PageSpeed A+</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-2.5 bg-gray-800 hover:bg-emerald-600 text-white font-pixel text-[9px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Konsultasikan Project
              </a>
            </div>
          </ScrollReveal>

          {/* Company Profile */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Company Profile</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-pixel">KREDIBILITAS BISNIS</p>
                </div>
                <div className="text-xl font-bold text-emerald-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Rp 1.8jt - 5jt
                </div>
                <ul className="space-y-2 text-xs text-gray-500 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Struktur Multi-Halaman</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>CMS Artikel & Layanan</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Edit Konten Sendiri</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Google Maps & Social Link</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Basic SEO Setup</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-2.5 bg-gray-800 hover:bg-emerald-600 text-white font-pixel text-[9px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Konsultasikan Project
              </a>
            </div>
          </ScrollReveal>

          {/* E-Commerce */}
          <ScrollReveal delay={0.25}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Toko Online</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-pixel">OTOMATISASI PENJUALAN</p>
                </div>
                <div className="text-xl font-bold text-emerald-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Rp 3jt - 10jt
                </div>
                <ul className="space-y-2 text-xs text-gray-500 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Sistem Keranjang Belanja</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Katalog & Manajemen Stok</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Hitung Ongkir Otomatis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Payment Gateway (QRIS)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Halaman Kelola Pesanan</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-2.5 bg-gray-800 hover:bg-emerald-600 text-white font-pixel text-[9px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Konsultasikan Project
              </a>
            </div>
          </ScrollReveal>

          {/* Custom Web & Backoffice */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Sistem & Backoffice</h3>
                  <p className="text-[9px] text-gray-400 font-bold uppercase tracking-wider font-pixel">APLIKASI OPERASIONAL</p>
                </div>
                <div className="text-xl font-bold text-emerald-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Mulai Rp 5jt
                </div>
                <ul className="space-y-2 text-xs text-gray-500 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Multi-user & Role Access</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Dashboard Panel Admin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Custom Logic & Database</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Ekspor Laporan (PDF/Excel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-500">&gt;</span>
                    <span>Integrasi API Pihak Ketiga</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-2.5 bg-gray-800 hover:bg-emerald-600 text-white font-pixel text-[9px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Konsultasikan Project
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Educational Disclaimer */}
        <ScrollReveal delay={0.35}>
          <div className="mt-12 p-4 bg-gray-100 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left max-w-4xl mx-auto font-mono">
            <p className="text-[11px] font-semibold text-gray-500 leading-relaxed">
              <span className="text-emerald-600 font-bold font-pixel text-[8px]">Catatan Edukasi:</span> Informasi rentang harga dan spesifikasi fitur di atas adalah gambaran umum (*general outline*) untuk membantu estimasi budget awal Anda. Spesifikasi teknis final, modul tambahan, dan biaya akhir akan disesuaikan secara transparan setelah melalui diskusi detail mengenai kebutuhan proyek Anda.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 5. Contact Section */}
      <section id="contact" className="relative py-28 overflow-hidden min-h-[75vh] flex items-center w-full mt-10">
        {/* Contact Illustrative Background Image */}
        <AmbientBackground type="contact" />

        {/* Torn paper divider at the top of contact section */}
        <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none z-10 rotate-180">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[40px] text-[#f9f9fb] fill-current">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,42.4V0Z" className="opacity-30" fill="#f9f9fb"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,67.5c31.25,16.63,64.75,8.2,101.37,2.24,51.22-8.34,102-38.37,152.09-38.37,52.86,0,85.11,31.79,135.54,42.59C490,85,546,73,612,55.33c77.78-20.85,137.89-29.24,215-9,80.82,21.21,123.14,2.2,173-10.8,55.35-14.49,114.73-30.72,200-1.8V0Z" fill="#f9f9fb"></path>
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
