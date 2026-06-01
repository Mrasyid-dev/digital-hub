"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, MessageSquare, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Galeri Undangan", href: "/undangan" },
    { name: "Galeri Website", href: "/website" },
    { name: "Layanan Custom", href: "/custom" },
  ];

  const isActive = (path: string) => pathname === path;

  // Let's create an elegant indicator line under active links using framer-motion
  return (
    <header className="sticky top-0 z-50 w-full glass-panel border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-bold tracking-wider bg-gradient-to-r from-violet-500 to-cyan-400 bg-clip-text text-transparent group-hover:opacity-80 transition-opacity">
                DIGITAL<span className="text-cyan-400">HUB</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative px-1 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
              >
                {link.name}
                {isActive(link.href) && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full"
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
              className="text-xs text-gray-400 hover:text-white flex items-center gap-1 transition-colors"
              title="Admin Panel"
            >
              <ShieldAlert className="w-3.5 h-3.5" />
              <span>Admin</span>
            </Link>
            <a
              href="https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-lg shadow-violet-500/20 hover:shadow-cyan-400/20 transition-all duration-300 hover:scale-[1.02]"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Konsultasi WA</span>
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 focus:outline-none transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-panel border-t border-white/5 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-4 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-all ${
                    isActive(link.href)
                      ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 border-l-2 border-cyan-400 text-white"
                      : "text-gray-300 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-white/10 px-3 flex flex-col gap-3">
                <Link
                  href="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-sm text-gray-400 hover:text-white flex items-center gap-2"
                >
                  <ShieldAlert className="w-4 h-4" />
                  <span>Admin Panel</span>
                </Link>
                <a
                  href="https://wa.me/6281234567890?text=Halo%20DigitalHub,%20saya%20tertarik%20untuk%20konsultasi%20pembuatan%20website..."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white font-semibold text-center"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Konsultasi WA</span>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
