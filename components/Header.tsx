"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Galeri Website", href: "/website" },
    { name: "Layanan Custom", href: "/custom" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full h-20 border-b-4 border-black bg-[#0b0518]/95 backdrop-blur-md text-white flex items-center justify-between px-4 sm:px-10 shadow-[0_4px_12px_rgba(0,0,0,0.5)]">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-base sm:text-lg font-pixel font-bold tracking-wider text-emerald-400 group-hover:text-cyan-400 transition-colors">
            DIGITAL<span className="text-cyan-400">.HUB</span>
          </span>
        </Link>
      </div>

      {/* Desktop Navigation (Enlarged for readability - Agent.md Scannability rule) */}
      <nav className="hidden md:flex items-center gap-8 font-pixel text-xs sm:text-sm">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-3 py-1.5 transition-colors uppercase tracking-wider ${
              isActive(link.href) ? "text-emerald-400 font-bold" : "text-gray-200 hover:text-white"
            }`}
          >
            {link.name}
            {isActive(link.href) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-[-6px] left-0 right-0 h-1 bg-emerald-400"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="hidden md:flex items-center gap-5 font-pixel text-xs">
        <Link
          href="/admin/dashboard"
          className="text-xs text-gray-400 hover:text-emerald-400 flex items-center gap-1.5 transition-colors uppercase"
          title="Admin Panel"
        >
          <ShieldAlert className="w-4 h-4 text-red-500" />
          <span>Admin</span>
        </Link>
        <a
          href="https://wa.me/6285111232733?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-black font-bold border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase text-xs"
        >
          <MessageSquare className="w-4 h-4" />
          <span>Hubungi WA</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <Link
          href="/admin/dashboard"
          className="text-gray-400 hover:text-white p-1"
          title="Admin Panel"
        >
          <ShieldAlert className="w-4 h-4 text-red-500" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 text-gray-300 hover:text-white focus:outline-none transition-colors border-2 border-transparent hover:border-black"
          aria-label="Toggle navigation menu"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Panel (Expands DOWNWARDS from top header) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="absolute top-16 left-0 right-0 w-full border-b-4 border-black p-4 space-y-3 bg-[#0b0518] text-white shadow-[0_8px_16px_rgba(0,0,0,0.8)] font-pixel text-[9px]"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 transition-all uppercase ${
                    isActive(link.href)
                      ? "bg-emerald-950/50 border-l-4 border-emerald-400 text-emerald-400 font-bold"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Sticky CTA Bar (Thumb-Zone Ergonomics for high conversion - Agent.md Section 3.3) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 p-3 bg-[#0b0518]/95 backdrop-blur-md border-t-4 border-black flex items-center justify-between gap-3 shadow-[0_-4px_10px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col">
          <span className="text-[9px] font-pixel text-emerald-400 font-bold uppercase">Konsultasi Gratis</span>
          <span className="text-[8px] text-gray-300 font-mono">Respon cepat via WA</span>
        </div>
        <a
          href="https://wa.me/6285111232733?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel font-bold text-[9px] uppercase border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[1px] active:shadow-none transition-all shrink-0"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Chat WA</span>
        </a>
      </div>
    </header>
  );
}
