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
  const isWedding = product.category === "undangan";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className="bg-white pixel-border overflow-hidden flex flex-col h-full hover:translate-y-[-2px] hover:translate-x-[-2px] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-150 group"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden border-b-4 border-black bg-gray-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.thumbnailUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 font-pixel text-[10px] font-bold tracking-wider">
          <span className={`px-2.5 py-1 border-2 border-black text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ${
            isWedding 
              ? "bg-pink-600" 
              : "bg-emerald-600"
          }`}>
            {product.category === "undangan" 
              ? "UNDANGAN" 
              : product.category === "landing-page" 
              ? "LANDING PAGE" 
              : product.category === "company-profile" 
              ? "CO. PROFILE" 
              : product.category === "toko-online" 
              ? "TOKO ONLINE" 
              : product.category === "sistem-backoffice" 
              ? "BACKOFFICE" 
              : "TEMPLATE"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors font-title line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed font-sans font-medium">
          {product.description}
        </p>

        {/* Feature quick view (first 3) */}
        <ul className="space-y-2 mb-6 flex-grow font-sans font-medium">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-[11px] text-gray-600">
              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isWedding ? "text-pink-500" : "text-emerald-500"}`} />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t-2 border-black pt-4 mt-auto">

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/works/${product.slug}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold font-pixel bg-gray-100 hover:bg-gray-200 text-gray-700 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase tracking-wide"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Info</span>
            </Link>
            {product.demoUrl ? (
              <Link
                href={`/works/${product.slug}?preview=true`}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold font-pixel text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase tracking-wide ${
                  isWedding 
                    ? "bg-pink-600 hover:bg-pink-500" 
                    : "bg-emerald-600 hover:bg-emerald-500"
                }`}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Demo</span>
              </Link>
            ) : (
              <a
                href={`https://wa.me/6285111232733?text=Halo%20DigitalHub,%20saya%20tertarik%20dengan%20${encodeURIComponent(product.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold font-pixel bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase tracking-wide"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Pesan</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
