import React from "react";
import { Laptop, Cpu } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function WebsitePage() {
  // Fetch only "website" products
  const products = await prisma.product.findMany({
    where: {
      category: "website",
      status: "published",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Page Header */}
      <div className="text-center space-y-4 mb-16 relative">
        {/* Glow decoration */}
        <div className="absolute inset-x-0 top-0 h-40 bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <Cpu className="w-3.5 h-3.5" />
          <span>High Performance Website Templates</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Galeri Template{" "}
          <span className="bg-gradient-to-r from-violet-400 via-indigo-400 to-cyan-400 bg-clip-text text-transparent glow-text-cyan">
            Website & Landing Page
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto leading-relaxed">
          Showcase desain website modern untuk instansi perusahaan, toko e-commerce, portfolio profesional, dan startup SaaS. Dioptimalkan dengan teknologi mutakhir untuk performa loading secepat kilat.
        </p>
      </div>

      {/* Grid List */}
      {products.length === 0 ? (
        <div className="text-center py-24 glass-panel rounded-2xl border border-white/5 max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 mb-2">Belum ada template website yang ditambahkan.</p>
          <p className="text-xs text-gray-600">Hubungi kami melalui menu kontak jika ingin mendesain web khusus dari awal.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
