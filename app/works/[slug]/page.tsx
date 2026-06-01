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

  // Format price
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const isWedding = product.category === "undangan";
  const whatsappUrl = `https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20membeli/memesan%20desain%20${encodeURIComponent(product.title)}%20(Slug:%20${product.slug})`;

  return (
    <div className="w-full pb-24">
      {/* Detail Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-12">
        {/* Back Link */}
        <Link
          href={isWedding ? "/undangan" : "/website"}
          className="inline-flex items-center gap-1.5 text-xs text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Kembali ke Galeri</span>
        </Link>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Thumbnail & Details */}
          <div className="space-y-6">
            <div className="aspect-video w-full rounded-2xl overflow-hidden glass-panel border border-white/10 relative">
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
                  <div key={idx} className="aspect-video rounded-xl overflow-hidden border border-white/5 bg-black/40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={imgUrl} alt={`${product.title} gallery ${idx}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right: Pricing, Description & Features */}
          <div className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
            <div className="space-y-2">
              <span className={`text-[10px] font-extrabold tracking-wider uppercase px-2.5 py-1 rounded-full text-white ${
                isWedding ? "bg-pink-500/20 text-pink-400 border border-pink-500/20" : "bg-cyan-500/20 text-cyan-400 border border-cyan-500/20"
              }`}>
                {isWedding ? "Undangan Digital" : "Website & Landing Page"}
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white">{product.title}</h1>
            </div>

            <div className="flex items-center gap-4 bg-white/5 p-4 rounded-xl border border-white/5 justify-between">
              <div>
                <span className="block text-[10px] uppercase text-gray-500 font-bold font-sans">Harga Desain</span>
                <span className={`text-2xl font-black ${isWedding ? "text-pink-400" : "text-cyan-400"}`}>
                  {formatPrice(product.price)}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-[10px] uppercase text-gray-500 font-bold font-sans">Durasi Kerja</span>
                <span className="text-xs text-white font-bold">1-3 Hari Selesai</span>
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Deskripsi Desain</h3>
              <p className="text-xs text-gray-400 leading-relaxed font-sans">{product.description}</p>
            </div>

            {/* Features checkmarks */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Fitur Termasuk</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-gray-300 font-sans">
                    <div className={`mt-0.5 p-0.5 rounded-full ${isWedding ? "bg-pink-500/10 text-pink-400" : "bg-cyan-500/10 text-cyan-400"}`}>
                      <Check className="w-3 h-3" />
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-500/25 transition-all duration-300"
              >
                <CreditCard className="w-4 h-4" />
                <span>Pesan Desain Ini</span>
              </a>
              {product.demoUrl && (
                <a
                  href="#live-preview-section"
                  className="flex items-center justify-center gap-2 py-3 rounded-lg bg-white/5 hover:bg-white/10 text-white font-bold text-sm border border-white/15 transition-all"
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
        <section id="live-preview-section" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 border-t border-white/5">
          <div className="text-center space-y-2 mb-8">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white">Live Demo Interaktif</h2>
            <p className="text-xs text-gray-400 max-w-lg mx-auto">
              Uji coba responsivitas layout dan fungsionalitas menu template ini secara langsung pada device emulator di bawah.
            </p>
          </div>
          <ShowcaseFrame demoUrl={product.demoUrl} title={product.title} />
        </section>
      )}
    </div>
  );
}
