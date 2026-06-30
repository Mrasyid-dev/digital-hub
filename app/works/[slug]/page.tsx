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
          className="inline-flex items-center gap-1.5 text-[9px] font-pixel text-gray-500 hover:text-emerald-500 mb-8 transition-colors uppercase"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>&lt; Kembali</span>
        </Link>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Thumbnail & Details */}
          <div className="space-y-6">
            <div className="aspect-video w-full pixel-border overflow-hidden bg-white relative">
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
                  <div key={idx} className="aspect-video pixel-border-sm overflow-hidden bg-white hover:scale-105 transition-transform duration-150">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`${product.title} gallery ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Pricing, Description & Features */}
          <div className="bg-white p-8 pixel-border space-y-6">
            <div className="space-y-2">
              <span className={`text-[8px] font-pixel uppercase px-2 py-1.5 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
                isWedding 
                  ? "bg-pink-600" 
                  : "bg-emerald-600"
              }`}>
                {isWedding ? "UNDANGAN DIGITAL" : "WEBSITE TEMPLATE"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight font-title pt-2">{product.title}</h1>
            </div>

            <div className="flex items-center justify-between bg-gray-100 p-4 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-[9px] font-pixel text-gray-500 uppercase tracking-wider">Durasi Kerja</span>
              <span className="text-sm font-bold text-gray-800 font-mono">1-3 Hari Selesai</span>
            </div>

            <div className="space-y-2 font-mono">
              <h3 className="text-[10px] font-pixel text-gray-700 uppercase tracking-wider">Deskripsi Desain</h3>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">{product.description}</p>
            </div>

            {/* Features checkmarks */}
            <div className="space-y-3 font-mono">
              <h3 className="text-[10px] font-pixel text-gray-700 uppercase tracking-wider">Fitur Termasuk</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-600 font-medium">
                    <div className={`mt-0.5 p-0.5 rounded-none border border-black ${isWedding ? "bg-pink-50 text-pink-600" : "bg-emerald-50 text-emerald-600"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t-2 border-black grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pesan Desain</span>
              </a>
              {product.demoUrl && (
                <a
                  href="#live-preview-section"
                  className="flex items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Coba Demo</span>
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
