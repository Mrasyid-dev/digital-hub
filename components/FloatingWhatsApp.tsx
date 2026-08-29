"use client";

import React, { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import { usePathname } from "next/navigation";

export default function FloatingWhatsApp() {
  const pathname = usePathname();
  const [showTooltip, setShowTooltip] = useState(true);

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const phoneNumber = "6285111232733";
  const defaultMessage = encodeURIComponent(
    "Halo Digital Hub! Saya tertarik untuk konsultasi pembuatan website / landing page untuk bisnis saya."
  );
  const waUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Interactive Tooltip Bubble */}
      {showTooltip && (
        <div className="hidden sm:flex items-center gap-2 bg-[#111] text-white border-2 border-emerald-400 px-3.5 py-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] animate-bounce text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>Ada yang bisa kami bantu? <strong>Chat WhatsApp</strong></span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setShowTooltip(false);
            }}
            className="text-gray-400 hover:text-white ml-1 p-0.5"
            aria-label="Tutup pesan"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Konsultasi via WhatsApp"
        className="flex items-center gap-2.5 px-4 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all"
      >
        <MessageCircle className="w-5 h-5 fill-black" />
        <span className="font-pixel text-[10px] uppercase tracking-wider hidden md:inline-block">
          Konsultasi WhatsApp
        </span>
      </a>
    </div>
  );
}
