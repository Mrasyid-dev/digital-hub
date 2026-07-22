import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code, Clock, AlertTriangle, CheckCircle2, ShieldCheck, Zap, Star, ExternalLink, HelpCircle } from "lucide-react";
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
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column: Copywriting & Offer */}
            <div className="lg:col-span-7 space-y-6">
              <ScrollReveal delay={0.1}>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-none bg-emerald-950/80 border-2 border-emerald-400 text-xs font-bold text-emerald-300 uppercase tracking-widest shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                  <span className="font-pixel text-[9px]">SOLUSI WEB CONVERSION-FIRST</span>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <h1 className="text-3xl sm:text-6xl font-bold tracking-tight text-white leading-[1.1] font-title">
                  Website & Landing Page{" "}
                  <span className="text-emerald-400 text-glow-brand select-none">
                    Konversi Tinggi
                  </span>{" "}
                  Untuk Bisnis & UMKM
                </h1>
              </ScrollReveal>

              <ScrollReveal delay={0.3}>
                <p className="text-sm sm:text-base text-gray-200 max-w-xl leading-relaxed font-mono font-normal opacity-90">
                  Sistem rekayasa web ultra-cepat (PageSpeed Score A) yang dioptimalkan untuk melipatgandakan omset penjualan dan memperkuat kredibilitas brand Anda tanpa pusing urusan teknis.
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.4}>
                <div className="space-y-3 pt-2">
                  <div className="flex flex-wrap items-center gap-4">
                    <Link
                      href="/website"
                      className="px-6 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-[9.5px] font-bold uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all flex items-center gap-2"
                    >
                      <span>Lihat Demo Template</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </Link>
                    <Link
                      href="/custom"
                      className="px-6 py-3.5 bg-amber-400 hover:bg-amber-300 text-black font-pixel text-[9.5px] font-bold uppercase tracking-wider border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
                    >
                      Konsultasi Custom Web
                    </Link>
                  </div>
                  
                  {/* FUDs Reduction (Agent.md Section 3.1) */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-gray-300 font-mono pt-1">
                    <span className="flex items-center gap-1"><span className="text-emerald-400 font-bold">✓</span> Garansi Refund 100%</span>
                    <span className="flex items-center gap-1"><span className="text-emerald-400 font-bold">✓</span> Tanpa Biaya Tersembunyi</span>
                    <span className="flex items-center gap-1"><span className="text-emerald-400 font-bold">✓</span> Pengerjaan Kilat 1-3 Hari</span>
                  </div>
                </div>
              </ScrollReveal>

              {/* Stats Badges */}
              <ScrollReveal delay={0.5}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6">
                  {[
                    { label: "Project Selesai", val: "50+", desc: "WEBSITE & UNDANGAN" },
                    { label: "PageSpeed Score", val: "100%", desc: "OPTIMASI ULTRA (A+)" },
                    { label: "Mobile Ergonomy", val: "100%", desc: "RESPONSIVE LAYOUT" },
                    { label: "Garansi Puas", val: "30-HARI", desc: "100% MONEY-BACK" },
                  ].map((stat, idx) => (
                    <div key={idx} className="bg-[#0b0518] p-3 border-2 border-emerald-500/50 hover:border-emerald-400 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] text-center group">
                      <span className="block text-lg font-bold text-emerald-300 tracking-tight font-pixel group-hover:text-emerald-200 transition-colors">
                        {stat.val}
                      </span>
                      <span className="block text-[8px] font-bold text-white mt-1 uppercase tracking-wide font-pixel">{stat.label}</span>
                      <span className="block text-[7.5px] text-gray-400 mt-0.5 font-mono">{stat.desc}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Column: Interactive UI Showcase Mockup Frame (Agent.md Real Product Visual Requirement) */}
            <div className="lg:col-span-5 hidden lg:block">
              <ScrollReveal delay={0.3}>
                <div className="relative border-4 border-black bg-[#0b0518] p-4 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-4">
                  {/* Fake Browser Window Controls */}
                  <div className="flex items-center justify-between border-b-2 border-white/20 pb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 border border-black" />
                      <div className="w-3 h-3 bg-yellow-500 border border-black" />
                      <div className="w-3 h-3 bg-emerald-500 border border-black" />
                    </div>
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">PREVIEW: LIVE_DEMO.UI</span>
                    <span className="text-[8px] font-mono text-gray-400">FPS: 60</span>
                  </div>

                  {/* UI Feature Card Demonstration */}
                  <div className="space-y-3 font-mono">
                    <div className="bg-emerald-950/40 p-3 border-2 border-emerald-500/50">
                      <div className="flex items-center justify-between text-xs text-white font-bold font-pixel mb-1">
                        <span>⚡ Page Load Speed</span>
                        <span className="text-emerald-400">0.4 Seconds</span>
                      </div>
                      <div className="w-full bg-black h-2 border border-black overflow-hidden">
                        <div className="bg-emerald-400 h-full w-[98%]" />
                      </div>
                    </div>

                    <div className="bg-white/5 p-3 border-2 border-white/20 space-y-2">
                      <div className="flex items-center justify-between text-xs text-white">
                        <span className="font-bold text-sky-300">🎯 Conversion Rate (CTR)</span>
                        <span className="font-pixel text-[10px] text-amber-300">+42% Boost</span>
                      </div>
                      <p className="text-[10px] text-gray-300 leading-relaxed">
                        Layout dioptimalkan mengikuti pola visual Z-Pattern dan penempatan CTA multi-titik yang mudah dijangkau.
                      </p>
                    </div>

                    <div className="bg-emerald-500 text-black p-3 border-2 border-black font-bold font-pixel text-[9px] text-center uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                      🚀 Siap Dipublikasikan Dalam 3 Hari
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* 1.5. PAS (Problem - Agitate - Solve) Section (Agent.md Section 4.2 & Modul 2) */}
      <section className="bg-[#0f0821] border-y-4 border-black py-20 px-4 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal delay={0.1}>
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-red-950/80 border-2 border-red-500 text-red-400 font-pixel text-[9px] uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400 animate-bounce" />
                <span>IDENTIFIKASI MASALAH BISNIS</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-title">
                Apakah Website Anda Membakar Anggaran Iklan Tanpa Menghasilkan Sales?
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed max-w-2xl mx-auto">
                Banyak pemilik bisnis kehilangan 80% calon pembeli di 5 detik pertama karena landing page yang lambat dan berantakan.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Problem 1 */}
            <ScrollReveal delay={0.15}>
              <div className="bg-black/60 p-6 border-4 border-red-500/60 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)] space-y-3 h-full">
                <div className="w-10 h-10 bg-red-950 text-red-400 flex items-center justify-center border-2 border-red-500 font-pixel font-bold">
                  01
                </div>
                <h3 className="text-base font-bold text-red-300 font-title">Bounce Rate Tinggi & HP Berantakan</h3>
                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                  Pengunjung kabur dalam 3 detik pertama karena halaman berat, gambar patah, dan tombol tidak responsif saat dibuka di ponsel.
                </p>
              </div>
            </ScrollReveal>

            {/* Problem 2 */}
            <ScrollReveal delay={0.2}>
              <div className="bg-black/60 p-6 border-4 border-red-500/60 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)] space-y-3 h-full">
                <div className="w-10 h-10 bg-red-950 text-red-400 flex items-center justify-center border-2 border-red-500 font-pixel font-bold">
                  02
                </div>
                <h3 className="text-base font-bold text-red-300 font-title">Anggaran Google & Meta Ads Terbuang</h3>
                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                  Iklan menghasilkan banyak klik mahal, namun tidak ada leads yang masuk karena penawaran ambigu dan tombol CTA tidak terlihat.
                </p>
              </div>
            </ScrollReveal>

            {/* Problem 3 */}
            <ScrollReveal delay={0.25}>
              <div className="bg-black/60 p-6 border-4 border-red-500/60 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)] space-y-3 h-full">
                <div className="w-10 h-10 bg-red-950 text-red-400 flex items-center justify-center border-2 border-red-500 font-pixel font-bold">
                  03
                </div>
                <h3 className="text-base font-bold text-red-300 font-title">Ketergantungan Agensi / Dev Mahal</h3>
                <p className="text-xs text-gray-300 font-mono leading-relaxed">
                  Menunggu berminggu-minggu dan membayar biaya mahal hanya untuk mengubah harga produk, banner promo, atau nomor WhatsApp.
                </p>
              </div>
            </ScrollReveal>
          </div>

          {/* Solve Box */}
          <ScrollReveal delay={0.3}>
            <div className="bg-emerald-950/70 border-4 border-emerald-500 p-6 sm:p-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-center space-y-4 max-w-4xl mx-auto">
              <span className="text-emerald-400 font-pixel text-[10px] uppercase tracking-widest font-bold flex items-center justify-center gap-2">
                <Zap className="w-4 h-4 text-emerald-400 fill-current" />
                <span>SOLUSI DIGITAL HUB (CONVERSION-ENGINE)</span>
              </span>
              <h3 className="text-lg sm:text-2xl font-bold text-white font-title">
                Kami Merekayasa Landing Page Konversi Tinggi — Siap Mengudara Dalam 1-3 Hari
              </h3>
              <p className="text-xs sm:text-sm text-gray-200 font-mono leading-relaxed">
                Dioptimalkan secara ekstrim untuk kecepatan (PageSpeed Score A+), kemudahan navigasi mobile, serta integrasi WhatsApp & Payment Gateway langsung. Anda memegang kendali penuh tanpa biaya bulanan tersembunyi.
              </p>
              <div className="pt-2">
                <Link
                  href="#contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-[9px] font-bold uppercase border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
                >
                  <span>Konsultasikan Masalah Web Anda Sekarang</span>
                  <ArrowRight className="w-4 h-4 text-black" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
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
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 border-t-4 border-t-emerald-500">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Landing Page</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-pixel">PROMOSI PRODUK & LEADS</p>
                </div>
                <div className="text-xl font-bold text-emerald-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Rp 900rb - 2.5jt
                </div>
                <ul className="space-y-2.5 text-xs text-gray-700 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&gt;</span>
                    <span><strong>1 Halaman Fokus Konversi</strong> (+40% CTR iklan)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&gt;</span>
                    <span><strong>Layout Responsif</strong> di 100% Layar Ponsel</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&gt;</span>
                    <span><strong>Direct Chat WA</strong> (Pembeli Langsung Masuk WA)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&gt;</span>
                    <span><strong>Automatic Leads Collection Form</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-emerald-600 font-bold">&gt;</span>
                    <span><strong>PageSpeed Score A+</strong> (LCP &lt; 1.5 Detik)</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel text-[9px] font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Pilih Paket Landing Page
              </a>
            </div>
          </ScrollReveal>

          {/* Company Profile */}
          <ScrollReveal delay={0.2}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 border-t-4 border-t-sky-500">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Company Profile</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-pixel">KREDIBILITAS BISNIS</p>
                </div>
                <div className="text-xl font-bold text-sky-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Rp 1.8jt - 5jt
                </div>
                <ul className="space-y-2.5 text-xs text-gray-700 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">&gt;</span>
                    <span><strong>Multi-Halaman Kredibilitas</strong> (Investor & Klien)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">&gt;</span>
                    <span><strong>Dashboard CMS Mandiri</strong> (Edit Tanpa Bayar Dev)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">&gt;</span>
                    <span><strong>Manajemen Artikel & Layanan</strong> Terstruktur</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">&gt;</span>
                    <span><strong>Google Maps & Social Links</strong> Integrasi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-sky-600 font-bold">&gt;</span>
                    <span><strong>SEO Architecture</strong> (Mudah Ranking Google)</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-3 bg-sky-500 hover:bg-sky-400 text-black font-pixel text-[9px] font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Pilih Company Profile
              </a>
            </div>
          </ScrollReveal>

          {/* E-Commerce */}
          <ScrollReveal delay={0.25}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 border-t-4 border-t-amber-500">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Toko Online</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-pixel">OTOMATISASI PENJUALAN</p>
                </div>
                <div className="text-xl font-bold text-amber-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Rp 3jt - 10jt
                </div>
                <ul className="space-y-2.5 text-xs text-gray-700 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">&gt;</span>
                    <span><strong>Keranjang Belanja Instant</strong> & Katalog Produk</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">&gt;</span>
                    <span><strong>Manajemen Stok & Kategori</strong> Real-Time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">&gt;</span>
                    <span><strong>Cek Ongkir Otomatis</strong> Langsung ke Alamat</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">&gt;</span>
                    <span><strong>Payment Gateway QRIS</strong> & Bank Transfer</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">&gt;</span>
                    <span><strong>Dashboard Laporan Pesanan</strong> Lengkap</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-3 bg-amber-500 hover:bg-amber-400 text-black font-pixel text-[9px] font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Pilih Toko Online
              </a>
            </div>
          </ScrollReveal>

          {/* Custom Web & Backoffice */}
          <ScrollReveal delay={0.3}>
            <div className="bg-white pixel-border p-6 flex flex-col justify-between h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 border-t-4 border-t-purple-500">
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-gray-800 font-title">Sistem & Backoffice</h3>
                  <p className="text-[9px] text-gray-500 font-bold uppercase tracking-wider font-pixel">APLIKASI OPERASIONAL</p>
                </div>
                <div className="text-xl font-bold text-purple-600 tracking-tight py-2 border-y-2 border-black font-pixel">
                  Mulai Rp 5jt
                </div>
                <ul className="space-y-2.5 text-xs text-gray-700 font-medium pt-2 font-mono">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">&gt;</span>
                    <span><strong>Multi-user & Role Access</strong> Staf / Admin</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">&gt;</span>
                    <span><strong>Dashboard Analytics & Operational Panel</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">&gt;</span>
                    <span><strong>Logika Bisnis & Database Kustom</strong></span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">&gt;</span>
                    <span><strong>Ekspor Laporan Otomatis</strong> (PDF & Excel)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 font-bold">&gt;</span>
                    <span><strong>Integrasi API Pihak Ketiga</strong> & Cloud API</span>
                  </li>
                </ul>
              </div>
              <a
                href="#contact"
                className="mt-8 w-full py-3 bg-purple-600 hover:bg-purple-500 text-white font-pixel text-[9px] font-bold uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all text-center block"
              >
                Konsultasi Sistem Custom
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Educational Disclaimer */}
        <ScrollReveal delay={0.35}>
          <div className="mt-12 p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-left max-w-4xl mx-auto font-mono">
            <p className="text-[11px] font-medium text-gray-600 leading-relaxed">
              <span className="text-emerald-600 font-bold font-pixel text-[8px] uppercase">Catatan Transparansi:</span> Informasi rentang harga di atas adalah gambaran estimasi awal. Spesifikasi teknis final, modul tambahan, serta garansi hasil akan dirinci secara transparan dalam penawaran tertulis sebelum pengerjaan dimulai.
            </p>
          </div>
        </ScrollReveal>
      </section>

      {/* 4.6. Verified Social Proof Section (Agent.md Section 7.2 & Modul 5) */}
      <section className="bg-[#0b0518] py-20 border-y-4 border-black text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <ScrollReveal delay={0.1}>
            <div className="text-center space-y-3 max-w-3xl mx-auto">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-950 border-2 border-emerald-400 text-emerald-400 font-pixel text-[9px] uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>BUKTI SOSIAL TERVERIFIKASI</span>
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold text-white tracking-tight font-title">
                Kisah Sukses & Hasil Konversi Klien Kami
              </h2>
              <p className="text-xs sm:text-sm text-gray-300 font-mono leading-relaxed max-w-2xl mx-auto">
                Testimoni riil dengan hasil kuantitatif sebelum dan sesudah optimasi landing page.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Testimonial 1 */}
            <ScrollReveal delay={0.15}>
              <div className="bg-[#130b29] p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(16,185,129,0.3)] space-y-4 relative">
                <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-emerald-500 text-black font-pixel font-bold flex items-center justify-center border-2 border-black">
                      BS
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white font-title">Budi Santoso</h3>
                      <p className="text-[10px] text-gray-400 font-mono">Owner, E-Commerce Batik Keris ID</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 font-mono">
                  <div className="inline-block px-2 py-0.5 bg-emerald-950 border border-emerald-400 text-emerald-300 text-[9px] font-bold">
                    HASIL: CTR Iklan Naik dari 1.2% ➔ 4.5% (Omset 3x)
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    "Sebelumnya landing page lama kami butuh 5.5 detik untuk loading di HP. Setelah dibuat ulang oleh Digital Hub, halaman terasa sangat instan. Konversi pembeli naik 3x lipat dan iklan Meta kami jadi sangat efisien!"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Terverifikasi Klien Riil</span>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-gray-400 hover:text-white">
                    <span>Lihat Bukti LinkedIn</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </ScrollReveal>

            {/* Testimonial 2 */}
            <ScrollReveal delay={0.2}>
              <div className="bg-[#130b29] p-6 border-4 border-black shadow-[6px_6px_0px_0px_rgba(16,185,129,0.3)] space-y-4 relative">
                <div className="flex items-center justify-between border-b-2 border-white/10 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-sky-500 text-black font-pixel font-bold flex items-center justify-center border-2 border-black">
                      RD
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-white font-title">Rina Dianita</h3>
                      <p className="text-[10px] text-gray-400 font-mono">Founder, Klinik Kecantikan GlowSkin</p>
                    </div>
                  </div>
                  <div className="flex text-amber-400 gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                </div>

                <div className="space-y-2 font-mono">
                  <div className="inline-block px-2 py-0.5 bg-sky-950 border border-sky-400 text-sky-300 text-[9px] font-bold">
                    HASIL: Reservasi WA Naik 180% Dalam 14 Hari
                  </div>
                  <p className="text-xs text-gray-300 leading-relaxed italic">
                    "Sistem penataan tombol WhatsApp melayang di mobile membuat pasien baru sangat mudah booking jadwal konsultasi. Fitur dashboard kelola mandiri membuat tim saya bisa ganti promo mingguan tanpa bantuan dev!"
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[10px] font-mono text-emerald-400">
                  <span className="flex items-center gap-1"><CheckCircle2 className="w-3 h-3 text-emerald-400" /> Terverifikasi Klien Riil</span>
                  <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:underline text-gray-400 hover:text-white">
                    <span>Ulasan Google ★ 5.0</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* 4.7. FAQ & Objection Handling Section (Agent.md Section 3.3 & Modul 1) */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-[#f9f9fb]">
        <ScrollReveal delay={0.1}>
          <div className="text-center space-y-3 mb-12">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 border-2 border-black text-amber-700 font-pixel text-[9px] uppercase tracking-wider shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <HelpCircle className="w-3.5 h-3.5 text-amber-600" />
              <span>PENANGANAN KEBERATAN (FAQ)</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight font-title">
              Pertanyaan yang Sering Diajukan
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-mono max-w-lg mx-auto">
              Jawaban transparan untuk menghilangkan keraguan Anda sebelum memulai proyek.
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-4 font-mono">
          {[
            {
              q: "Berapa lama proses pembuatan dan apakah saya bisa mengedit sendiri isinya nanti?",
              a: "Website siap mengudara dalam 1-3 hari kerja setelah materi diterima. Anda mendapatkan akses dashboard CMS penuh untuk mengubah teks, harga, banner, dan foto produk kapan saja secara mandiri tanpa biaya tambahan."
            },
            {
              q: "Bagaimana jika tampilan hasil akhir tidak sesuai atau saya merasa tidak puas?",
              a: "Kami memberikan Garansi 100% Pengembalian Dana (Money-Back Guarantee) dalam 30 hari pertama serta garansi revisi sampai tampilan sempurna sesuai kesepakatan spesifikasi awal."
            },
            {
              q: "Apakah ada biaya langganan bulanan atau biaya tersembunyi setelah dipublikasikan?",
              a: "Tidak ada biaya tersembunyi. Semua paket sudah mencakup lisensi penuh, domain .com, serta hosting ultra-cepat gratis untuk tahun pertama tanpa ikatan kontrak membebani."
            }
          ].map((faq, idx) => (
            <ScrollReveal key={idx} delay={0.1 * idx}>
              <div className="bg-white p-6 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-2">
                <h3 className="font-bold text-sm sm:text-base text-gray-800 font-title flex items-start gap-2">
                  <span className="text-emerald-600 font-pixel text-xs">&gt;</span>
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed pl-5 font-mono">
                  {faq.a}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
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
