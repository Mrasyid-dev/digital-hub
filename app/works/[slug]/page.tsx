import React from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, MessageSquare, Check, CreditCard } from "lucide-react";
import { prisma } from "@/lib/prisma";
import ShowcaseFrame from "@/components/ShowcaseFrame";

interface WorkDetailPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export const revalidate = 60;

export default async function WorkDetailPage({ params, searchParams }: WorkDetailPageProps) {
  const { slug } = await params;
  const sParams = await searchParams;
  const isPreviewOpen = sParams.preview === "true";

  // Fetch product from DB
  const product = await prisma.product.findUnique({
    where: { slug },
  });

  if (!product) {
    notFound();
  }

  const isWedding = product.category === "undangan";
  const whatsappUrl = `https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20membeli/memesan%20desain%20${encodeURIComponent(product.title)}%20(Slug:%20${product.slug})`;

  return (
    <div className="w-full pb-24 bg-[#f9f9fb]">
      {/* Detail Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
        {/* Back Link */}
        <Link
          href={isWedding ? "/undangan" : "/website"}
          className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-gray-800 mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Galeri</span>
        </Link>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Thumbnail & Details */}
          <div className="space-y-6">
            <div className="aspect-video w-full rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-[0_10px_35px_rgba(0,0,0,0.04)] relative">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.thumbnailUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Gallery Images Quick View */}
            {product.images.length > 1 && (
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((imgUrl, idx) => (
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-gray-100 bg-white shadow-sm">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`${product.title} gallery ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Pricing, Description & Features */}
          <div className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6 shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
            <div className="space-y-2">
              <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full text-white ${
                isWedding 
                  ? "bg-gradient-to-r from-pink-500 to-amber-500 shadow-md shadow-pink-500/20" 
                  : "bg-gradient-to-r from-emerald-600 to-sky-500 shadow-md shadow-emerald-500/20"
              }`}>
                {isWedding ? "Undangan Digital" : "Website & Landing Page"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-gray-800 tracking-tight">{product.title}</h1>
            </div>

            <div className="flex items-center justify-between bg-gray-50 p-4 rounded-2xl border border-gray-100">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Durasi Kerja</span>
              <span className="text-sm font-black text-gray-800">1-3 Hari Selesai</span>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Deskripsi Desain</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-sans font-medium">{product.description}</p>
            </div>

            {/* Features checkmarks */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider">Fitur Termasuk</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-sans font-medium">
                    <div className={`mt-0.5 p-0.5 rounded-full ${isWedding ? "bg-pink-50 text-pink-500" : "bg-emerald-50 text-emerald-500"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-gray-100 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 text-white font-bold text-sm shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pesan Desain Ini</span>
              </a>
              {product.demoUrl && (
                <a
                  href="#live-preview-section"
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 font-bold text-sm border border-gray-200 transition-all"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Coba Demo Interaktif</span>
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Frame Live Showcase Section */}
      {product.demoUrl && (
        <section id="live-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-gray-100">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-xl sm:text-2xl font-black text-gray-800 tracking-tight">Live Demo Interaktif</h2>
            <p className="text-xs text-gray-500 font-semibold max-w-lg mx-auto leading-relaxed">
              Uji coba responsivitas layout dan fungsionalitas menu template ini secara langsung pada device emulator di bawah.
            </p>
          </div>
          <ShowcaseFrame demoUrl={product.demoUrl} title={product.title} />
        </section>
      )}
    </div>
  );
}
