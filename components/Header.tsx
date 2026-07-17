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
    <header className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl h-16 border-4 border-black bg-[#0b0518] text-white flex items-center justify-between px-4 sm:px-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-xs sm:text-sm font-pixel font-bold tracking-wider text-emerald-400 group-hover:text-cyan-400 transition-colors">
            DIGITAL<span className="text-cyan-400">.HUB</span>
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 font-pixel text-[10px]">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-2 py-1 transition-colors uppercase ${
              isActive(link.href) ? "text-emerald-400 font-bold" : "text-gray-400 hover:text-white"
            }`}
          >
            {link.name}
            {isActive(link.href) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-[-4px] left-0 right-0 h-1 bg-emerald-400"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="hidden md:flex items-center gap-4 font-pixel text-[9px]">
        <Link
          href="/admin/dashboard"
          className="text-[9px] text-gray-400 hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase"
          title="Admin Panel"
        >
          <ShieldAlert className="w-3 h-3 text-red-500" />
          <span>Admin</span>
        </Link>
        <a
          href="https://wa.me/6285111232733?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase"
        >
          <MessageSquare className="w-3 h-3" />
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
          className="inline-flex items-center justify-center p-2 text-gray-400 hover:text-white focus:outline-none transition-colors border-2 border-transparent hover:border-black"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Panel (Expands UPWARDS) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="absolute bottom-20 left-0 right-0 w-full border-4 border-black p-4 space-y-3 bg-[#0b0518] text-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] font-pixel text-[9px]"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 transition-all uppercase ${
                    isActive(link.href)
                      ? "bg-emerald-950/50 border-l-4 border-emerald-400 text-emerald-400"
                      : "text-gray-500 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t-2 border-black flex flex-col gap-2">
              <a
                href="https://wa.me/6285111232733?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all uppercase text-[8px]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Hubungi WA</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
