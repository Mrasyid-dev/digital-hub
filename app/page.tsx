import React from "react";
import Link from "next/link";
import { ArrowRight, Sparkles, Code, CheckCircle, Database, Layout } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";
import ContactForm from "@/components/ContactForm";

export const revalidate = 60; // Revalidate home page data every 60s

export default async function HomePage() {
  // Fetch featured products
  const products = await prisma.product.findMany({
    where: { status: "published" },
    take: 6,
    orderBy: { createdAt: "desc" },
  });

  // Fetch testimonials
  const testimonials = await prisma.testimonial.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full pb-20">
      {/* 1. Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-cyan-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Showcase Premium Web & Undangan Digital</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight">
            Ubah Ide Anda Menjadi{" "}
            <span className="bg-gradient-to-r from-violet-500 via-pink-500 to-cyan-400 bg-clip-text text-transparent glow-text-cyan">
              Website Premium
            </span>{" "}
            Yang Berkelas
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Koleksi template undangan digital eksklusif dan landing page bisnis berkinerja tinggi. Kami merancang dengan desain modern, visual memukau, dan optimasi SEO maksimal untuk memajukan bisnis Anda.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/website"
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-500/20 hover:scale-[1.02] transition-all flex items-center gap-2"
            >
              <span>Lihat Demo Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="/custom"
              className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-sm transition-all border border-white/10 hover:border-white/20"
            >
              Request Custom Web
            </Link>
          </div>

          {/* Stats Badges (Glassmorphism layout) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto pt-16">
            {[
              { label: "Project Selesai", val: "50+", desc: "Undangan & Website" },
              { label: "Kecepatan PageSpeed", val: "A / 100%", desc: "Optimasi Ekstrim" },
              { label: "Responsive", val: "Semua Device", desc: "Mobile & Tablet" },
              { label: "Klien Puas", val: "99.9%", desc: "Review Bintang 5" },
            ].map((stat, idx) => (
              <div key={idx} className="glass-panel p-4 rounded-xl border border-white/5 text-center">
                <span className="block text-2xl font-black text-cyan-400 tracking-tight glow-text-cyan">
                  {stat.val}
                </span>
                <span className="block text-xs font-bold text-white mt-1">{stat.label}</span>
                <span className="block text-[10px] text-gray-500 mt-0.5">{stat.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Categories Bento Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Layanan Utama & Kategori Produk
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Solusi digital terlengkap yang dirancang khusus untuk memikat calon konsumen atau tamu undangan Anda.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Box 1: Undangan Pernikahan */}
          <div className="glass-panel neon-border-purple p-8 rounded-2xl flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center border border-violet-500/20 shadow-md shadow-violet-500/5">
                <Layout className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Undangan Online (Web)</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Template undangan pernikahan digital premium dengan transisi halaman yang elegan, galeri foto modern, background music, RSVP online, dan kado digital.
              </p>
            </div>
            <Link
              href="/undangan"
              className="mt-8 flex items-center gap-1.5 text-xs font-bold text-violet-400 hover:text-white transition-colors"
            >
              <span>Jelajahi Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Box 2: Landing Page & Company Profile */}
          <div className="glass-panel neon-border p-8 rounded-2xl flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-md shadow-cyan-500/5">
                <Code className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Website & Landing Page</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Desain landing page bisnis, startup, UMKM, maupun portofolio personal. Dibangun dengan optimasi performa ultra cepat (Lighthouse Score A) dan SEO-friendly.
              </p>
            </div>
            <Link
              href="/website"
              className="mt-8 flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
            >
              <span>Jelajahi Template</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Box 3: Custom Development */}
          <div className="glass-panel neon-border-cyan p-8 rounded-2xl flex flex-col justify-between group hover:scale-[1.01] transition-transform duration-300">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20 shadow-md shadow-cyan-500/5">
                <Database className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white">Layanan Custom</h3>
              <p className="text-xs text-gray-400 leading-relaxed">
                Butuh fitur khusus? Kami melayani pembuatan website kustom dari nol, sistem manajemen data (CMS), integrasi API pembayaran, dan dashboard admin dinamis.
              </p>
            </div>
            <Link
              href="/custom"
              className="mt-8 flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-white transition-colors"
            >
              <span>Konsultasi Layanan Custom</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. Featured Showcase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-12">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
              Highlight Produk & Demo Live
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 max-w-xl">
              Klik salah satu produk untuk menguji coba demo interaktif di dalam *iframe device mockup* secara langsung.
            </p>
          </div>
          <Link
            href="/website"
            className="flex items-center gap-1 text-xs font-bold text-cyan-400 hover:text-white transition-colors shrink-0"
          >
            <span>Semua Produk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 glass-panel rounded-2xl border border-white/5">
            <p className="text-sm text-gray-500">Belum ada produk yang dipublikasikan.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Testimonials Section (Hidden/Commented Out)
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center space-y-2 mb-12">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Apa Kata Klien Kami?</h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
            Testimoni jujur dari pelaku usaha dan pasangan pengantin yang telah mempercayakan websitenya kepada kami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testi) => (
            <div
              key={testi.id}
              className="glass-panel p-6 rounded-2xl border border-white/5 relative flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: testi.rating }).map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
                <p className="text-xs text-gray-300 italic leading-relaxed">
                  &ldquo;{testi.comment}&rdquo;
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center text-xs font-bold text-white">
                  {testi.clientName.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">{testi.clientName}</h4>
                  {testi.company && <p className="text-[10px] text-gray-500">{testi.company}</p>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      */}

      {/* 5. Contact Section */}
      <section id="contact" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Neon blur decorations */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10">
          <ContactForm />
        </div>
      </section>
    </div>
  );
}
