"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { LayoutDashboard, FileCode, Inbox, LogOut, ArrowLeft, Shield } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const sidebarLinks = [
    { name: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
    { name: "Manajemen Produk", href: "/admin/dashboard/products", icon: FileCode },
    { name: "Leads / Inbox", href: "/admin/dashboard/leads", icon: Inbox },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-[#030712] flex flex-col md:flex-row relative">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-violet-600/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Sidebar navigation */}
      <aside className="w-full md:w-64 glass-panel-dark border-r border-white/5 flex flex-col justify-between shrink-0 relative z-20">
        <div>
          {/* Dashboard Header */}
          <div className="p-6 border-b border-white/5 flex items-center gap-2.5">
            <Shield className="w-5 h-5 text-cyan-400" />
            <span className="font-black text-sm tracking-wider text-white uppercase">
              ADMIN PANEL
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-violet-600/20 to-cyan-500/20 text-white border-l-2 border-cyan-400"
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer Actions */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-gray-500 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 shrink-0" />
            <span>Ke Web Utama</span>
          </Link>
          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Keluar Sesi</span>
          </button>
        </div>
      </aside>

      {/* Main dashboard content area */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto relative z-10">
        {children}
      </main>
    </div>
  );
}
