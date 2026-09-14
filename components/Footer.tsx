"use client";

import React from "react";
import Link from "next/link";
import { Globe, Heart, Mail, Phone } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="w-full bg-[#111] text-gray-300 border-t-4 border-black relative overflow-hidden font-sans">
      {/* Background radial accent glow */}
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[150px] bg-emerald-500/5 pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[300px] h-[150px] bg-sky-500/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4 col-span-1 md:col-span-2">
            <span className="text-sm font-pixel font-bold tracking-wider text-emerald-400">
              DIGITAL<span className="text-cyan-400">.HUB</span>
            </span>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed font-mono">
              Showcase portofolio template website premium, landing page bisnis, dan custom website interaktif. Membantu mendigitalkan bisnis Anda dengan performa kelas atas dan visual memukau.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a
                href="#"
                className="p-2 border-2 border-black bg-white/5 hover:bg-emerald-500/20 text-gray-400 hover:text-emerald-400 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="#"
                className="p-2 border-2 border-black bg-white/5 hover:bg-sky-500/20 text-gray-400 hover:text-sky-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="text-[10px] font-pixel font-bold text-white tracking-wider uppercase mb-4">
              Navigasi
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  &gt; Home / Beranda
                </Link>
              </li>
              <li>
                <Link href="/website" className="text-gray-400 hover:text-white transition-colors">
                  &gt; Template Website
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-gray-400 hover:text-white transition-colors">
                  &gt; Request Custom
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h3 className="text-[10px] font-pixel font-bold text-white tracking-wider uppercase mb-4">
              Kontak
            </h3>
            <ul className="space-y-3 font-mono text-xs">
              <li className="flex items-center gap-2.5 text-gray-400">
                <Phone className="w-3.5 h-3.5 text-emerald-400" />
                <span>+62 851-1123-2733</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <Mail className="w-3.5 h-3.5 text-sky-400" />
                <span>rasyidh55@gmail.com</span>
              </li>
              <li className="flex items-center gap-2.5 text-gray-400">
                <Globe className="w-3.5 h-3.5 text-indigo-400" />
                <span>Temanggung, Jawa Tengah, Indonesia</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider and Copyright */}
        <div className="mt-12 pt-8 border-t-2 border-black flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] font-mono text-gray-500">
          <p>© {new Date().getFullYear()} Digital Products Hub. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Made with <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" /> using Next.js 16 & Tailwind v4
          </p>
        </div>
      </div>
    </footer>
  );
}
