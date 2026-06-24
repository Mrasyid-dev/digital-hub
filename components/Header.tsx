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
    <header className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-5xl h-16 rounded-full border border-gray-200/50 bg-white/75 backdrop-blur-md shadow-[0_15px_35px_rgba(0,0,0,0.06)] flex items-center justify-between px-4 sm:px-6">
      {/* Logo */}
      <div className="flex-shrink-0">
        <Link href="/" className="flex items-center gap-1.5 group">
          <span className="text-base sm:text-lg font-black tracking-wider bg-gradient-to-r from-emerald-600 to-sky-500 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
            DIGITAL<span className="text-sky-500">HUB</span>
          </span>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`relative px-1 py-1.5 text-xs font-semibold transition-colors ${
              isActive(link.href) ? "text-gray-900" : "text-gray-500 hover:text-gray-900"
            }`}
          >
            {link.name}
            {isActive(link.href) && (
              <motion.div
                layoutId="nav-underline"
                className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-gradient-to-r from-emerald-500 to-sky-400 rounded-full"
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </Link>
        ))}
      </nav>

      {/* Right actions */}
      <div className="hidden md:flex items-center gap-4">
        <Link
          href="/admin/dashboard"
          className="text-[10px] text-gray-400 hover:text-gray-700 flex items-center gap-1 transition-colors"
          title="Admin Panel"
        >
          <ShieldAlert className="w-3 h-3" />
          <span>Admin</span>
        </Link>
        <a
          href="https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 text-white shadow-md shadow-emerald-600/10 hover:shadow-sky-500/15 transition-all duration-300 hover:scale-[1.02]"
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Konsultasi WA</span>
        </a>
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center gap-2">
        <Link
          href="/admin/dashboard"
          className="text-gray-400 hover:text-gray-700 p-1"
          title="Admin Panel"
        >
          <ShieldAlert className="w-4 h-4" />
        </Link>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center justify-center p-2 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 focus:outline-none transition-colors"
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Panel (Expands UPWARDS) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className="absolute bottom-20 left-0 right-0 w-full glass-panel border border-gray-200/50 rounded-2xl overflow-hidden p-4 space-y-3 bg-white/95 backdrop-blur-lg shadow-xl"
          >
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-emerald-600/10 to-sky-500/10 border-l-2 border-emerald-500 text-emerald-700"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              <a
                href="https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 text-white font-bold text-xs"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Konsultasi WA</span>
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
