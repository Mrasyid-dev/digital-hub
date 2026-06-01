"use client";

import React from "react";
import Link from "next/link";
import { ExternalLink, Info, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: {
    id: string;
    slug: string;
    title: string;
    description: string;
    category: string;
    price: number;
    thumbnailUrl: string;
    features: string[];
    demoUrl?: string | null;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  // Format price to IDR
  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const isWedding = product.category === "undangan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col h-full group"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden border-b border-white/5">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3">
          <span className={`text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full text-white ${
            isWedding 
              ? "bg-gradient-to-r from-pink-500 to-amber-500 shadow-md shadow-pink-500/20" 
              : "bg-gradient-to-r from-violet-600 to-cyan-500 shadow-md shadow-cyan-500/20"
          }`}>
            {product.category === "undangan" ? "Undangan Online" : "Website Template"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-400 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Feature quick view (first 3) */}
        <ul className="space-y-2 mb-6 flex-grow">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-[11px] text-gray-300">
              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isWedding ? "text-pink-400" : "text-cyan-400"}`} />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-white/5 pt-4 mt-auto">
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="text-xs text-gray-500">Harga Desain</span>
            <span className={`font-extrabold text-lg tracking-tight bg-gradient-to-r ${
              isWedding ? "from-pink-400 to-amber-400" : "from-violet-400 to-cyan-400"
            } bg-clip-text text-transparent`}>
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/works/${product.slug}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-white/5 hover:bg-white/10 text-white transition-colors border border-white/5"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Detail Info</span>
            </Link>
            {product.demoUrl ? (
              <Link
                href={`/works/${product.slug}?preview=true`}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg text-white shadow-lg transition-all duration-300 ${
                  isWedding 
                    ? "bg-gradient-to-r from-pink-600 to-amber-500 hover:from-pink-500 hover:to-amber-400 shadow-pink-500/10" 
                    : "bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 shadow-cyan-500/10"
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Live Demo</span>
              </Link>
            ) : (
              <a
                href={`https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20dengan%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-500 hover:to-emerald-400 text-white transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Pesan WA</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
