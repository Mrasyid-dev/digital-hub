import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Cpu, ChevronLeft, ChevronRight, Filter } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ProductCard from "@/components/ProductCard";

export const metadata: Metadata = {
  title: "Galeri Template Website & Landing Page Bisnis",
  description:
    "Katalog template website siap pakai, landing page konversi tinggi untuk UMKM, company profile, e-commerce, dan portfolio modern berbasis Next.js.",
  alternates: {
    canonical: "/website",
  },
};

export const revalidate = 60;

const CATEGORIES = [
  { id: "all", label: "Semua Template" },
  { id: "landing-page", label: "Landing Page" },
  { id: "company-profile", label: "Company Profile" },
  { id: "toko-online", label: "Toko Online" },
  { id: "sistem-backoffice", label: "Sistem & Backoffice" },
];

const ITEMS_PER_PAGE = 6;

interface WebsitePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function WebsitePage({ searchParams }: WebsitePageProps) {
  const resolvedParams = await searchParams;
  const rawPage = resolvedParams?.page;
  const rawCategory = resolvedParams?.category;

  const currentCategory = typeof rawCategory === "string" ? rawCategory : "all";
  const requestedPage = typeof rawPage === "string" ? parseInt(rawPage, 10) : 1;
  const currentPage = Number.isInteger(requestedPage) && requestedPage > 0 ? requestedPage : 1;

  // Filter clause
  const whereClause = {
    status: "published",
    ...(currentCategory !== "all"
      ? { category: currentCategory }
      : { category: { not: "undangan" } }),
  };

  // Fetch count and paginated items in parallel
  const [totalProducts, products] = await Promise.all([
    prisma.product.count({ where: whereClause }),
    prisma.product.findMany({
      where: whereClause,
      orderBy: { createdAt: "desc" },
      skip: (currentPage - 1) * ITEMS_PER_PAGE,
      take: ITEMS_PER_PAGE,
    }),
  ]);

  const totalPages = Math.max(1, Math.ceil(totalProducts / ITEMS_PER_PAGE));

  const buildUrl = (page: number, category = currentCategory) => {
    const params = new URLSearchParams();
    if (category && category !== "all") params.set("category", category);
    if (page > 1) params.set("page", page.toString());
    const query = params.toString();
    return `/website${query ? `?${query}` : ""}`;
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 md:pt-36 bg-[#f9f9fb]">
      {/* Page Header */}
      <div className="text-center space-y-4 mb-10 relative">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-xs font-bold text-emerald-600">
          <Cpu className="w-3.5 h-3.5 text-emerald-600" />
          <span>High Performance Website Templates</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black text-gray-800 tracking-tight font-title">
          Galeri Template{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent">
            Website & Landing Page
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-500 max-w-2xl mx-auto leading-relaxed font-semibold">
          Showcase desain website modern untuk instansi perusahaan, toko e-commerce, portfolio profesional, dan startup SaaS. Dioptimalkan dengan teknologi mutakhir untuk performa loading secepat kilat.
        </p>
      </div>

      {/* Category Filter Tabs */}
      <div className="mb-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {CATEGORIES.map((cat) => {
          const isActive = currentCategory === cat.id;
          return (
            <Link
              key={cat.id}
              href={buildUrl(1, cat.id)}
              className={`px-4 py-2 text-xs font-pixel font-bold uppercase transition-all border-2 border-black ${
                isActive
                  ? "bg-emerald-500 text-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] translate-x-[-1px] translate-y-[-1px]"
                  : "bg-white text-gray-700 hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              }`}
            >
              {cat.label}
            </Link>
          );
        })}
      </div>

      {/* Products Status Indicator */}
      <div className="flex items-center justify-between mb-6 text-xs text-gray-500 font-mono">
        <div>
          {totalProducts > 0 ? (
            <span>
              Menampilkan{" "}
              <strong className="text-gray-800 font-bold">
                {(currentPage - 1) * ITEMS_PER_PAGE + 1} -{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, totalProducts)}
              </strong>{" "}
              dari <strong className="text-gray-800 font-bold">{totalProducts}</strong> template
            </span>
          ) : (
            <span>0 template ditemukan</span>
          )}
        </div>
        {totalPages > 1 && (
          <div className="font-pixel text-[10px] text-gray-600">
            Halaman {currentPage} dari {totalPages}
          </div>
        )}
      </div>

      {/* Grid List */}
      {products.length === 0 ? (
        <div className="text-center py-20 bg-white pixel-border max-w-2xl mx-auto shadow-sm space-y-3">
          <div className="inline-flex p-3 bg-gray-100 rounded-full border border-gray-200 text-gray-400">
            <Filter className="w-6 h-6" />
          </div>
          <p className="text-sm text-gray-700 font-bold">
            Belum ada template pada kategori ini.
          </p>
          <p className="text-xs text-gray-500">
            Silakan pilih kategori lain atau hubungi kami untuk mendesain website kustom sesuai kebutuhan Anda.
          </p>
          <div className="pt-2">
            <Link
              href="/website"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-500 text-black font-pixel text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase hover:bg-emerald-400"
            >
              Lihat Semua Template
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
          {/* Previous Page Button */}
          {currentPage > 1 ? (
            <Link
              href={buildUrl(currentPage - 1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-emerald-50 text-gray-800 font-pixel text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all uppercase"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-400 font-pixel text-xs font-bold border-2 border-gray-300 cursor-not-allowed opacity-60 uppercase">
              <ChevronLeft className="w-4 h-4" />
              <span>Sebelumnya</span>
            </span>
          )}

          {/* Page Number Buttons */}
          <div className="flex items-center gap-1.5">
            {Array.from({ length: totalPages }, (_, idx) => {
              const pageNum = idx + 1;
              const isCurrent = pageNum === currentPage;
              return (
                <Link
                  key={pageNum}
                  href={buildUrl(pageNum)}
                  className={`w-9 h-9 flex items-center justify-center font-pixel text-xs font-bold border-2 border-black transition-all ${
                    isCurrent
                      ? "bg-emerald-500 text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white text-gray-700 hover:bg-gray-100 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none"
                  }`}
                >
                  {pageNum}
                </Link>
              );
            })}
          </div>

          {/* Next Page Button */}
          {currentPage < totalPages ? (
            <Link
              href={buildUrl(currentPage + 1)}
              className="flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-emerald-50 text-gray-800 font-pixel text-xs font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all uppercase"
            >
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </Link>
          ) : (
            <span className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-400 font-pixel text-xs font-bold border-2 border-gray-300 cursor-not-allowed opacity-60 uppercase">
              <span>Selanjutnya</span>
              <ChevronRight className="w-4 h-4" />
            </span>
          )}
        </div>
      )}
    </div>
  );
}
