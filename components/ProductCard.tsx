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
      className="bg-white border border-gray-100 rounded-2xl overflow-hidden flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)] hover:-translate-y-1 transition-all duration-300 group"
    >
      {/* Thumbnail Container */}
      <div className="relative aspect-video overflow-hidden border-b border-gray-100">
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
              : "bg-gradient-to-r from-emerald-600 to-sky-500 shadow-md shadow-emerald-500/20"
          }`}>
            {product.category === "undangan" ? "Undangan Online" : "Website Template"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-base font-bold text-gray-800 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-1">
          {product.title}
        </h3>
        <p className="text-xs text-gray-500 line-clamp-2 mb-4 leading-relaxed">
          {product.description}
        </p>

        {/* Feature quick view (first 3) */}
        <ul className="space-y-2 mb-6 flex-grow">
          {product.features.slice(0, 3).map((feature, idx) => (
            <li key={idx} className="flex items-center gap-2 text-[11px] text-gray-600">
              <CheckCircle2 className={`w-3.5 h-3.5 shrink-0 ${isWedding ? "text-pink-500" : "text-emerald-500"}`} />
              <span className="truncate">{feature}</span>
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-gray-100 pt-4 mt-auto">

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3">
            <Link
              href={`/works/${product.slug}`}
              className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-700 transition-colors border border-gray-100"
            >
              <Info className="w-3.5 h-3.5" />
              <span>Detail Info</span>
            </Link>
            {product.demoUrl ? (
              <Link
                href={`/works/${product.slug}?preview=true`}
                className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg text-white shadow-md transition-all duration-300 ${
                  isWedding 
                    ? "bg-gradient-to-r from-pink-500 to-amber-500 hover:from-pink-400 hover:to-amber-400 shadow-pink-500/10" 
                    : "bg-gradient-to-r from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 shadow-emerald-500/10"
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
                className="flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 text-white transition-colors shadow-md shadow-emerald-500/10"
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
