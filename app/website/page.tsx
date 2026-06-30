import React from "react";
import { Laptop, Cpu } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const revalidate = 60;

export default async function WebsitePage() {
  // Fetch only non-wedding template products
  const products = await prisma.product.findMany({
    where: {
      category: { not: "undangan" },
      status: "published",
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-[#f9f9fb]">
      {/* Page Header */}
      <div className="text-center space-y-4 mb-16 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>High Performance Website Templates</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-800 tracking-tight">
          Galeri Template{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
            Website & Landing Page
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed font-semibold">
          Showcase desain website modern untuk instansi perusahaan, toko e-commerce, portfolio profesional, dan startup SaaS. Dioptimalkan dengan teknologi mutakhir untuk performa loading secepat kilat.
        </p>
      </div>

      {/* Grid List */}
      {products.length === 0 ? (
        <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 max-w-2xl mx-auto shadow-sm">
          <p className="text-sm text-gray-500 mb-2 font-bold">Belum ada template website yang ditambahkan.</p>
          <p className="text-xs text-gray-400">Hubungi kami melalui menu kontak jika ingin mendesain web khusus dari awal.</p>
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
