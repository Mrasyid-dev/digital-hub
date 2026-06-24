import React from "react";
import { prisma } from "@/lib/prisma";
import { FileCode, Inbox, Sparkles, Clock, AlertTriangle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  // Query db metrics
  const productCount = await prisma.product.count();
  const leadCount = await prisma.lead.count();
  const pendingLeadCount = await prisma.lead.count({
    where: { status: "pending" },
  });
  const testimonialCount = await prisma.testimonial.count();

  // Fetch recent leads (limit 3)
  const recentLeads = await prisma.lead.findMany({
    take: 3,
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-8">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">OVERVIEW DASHBOARD</h1>
        <p className="text-xs text-gray-400">Selamat datang kembali di panel administrasi Digital Hub Anda.</p>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric 1 */}
        <div className="glass-panel-dark p-6 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Produk</span>
            <span className="block text-3xl font-black text-white">{productCount}</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-violet-500/10 text-violet-400 border border-violet-500/20 flex items-center justify-center">
            <FileCode className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel-dark p-6 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Total Leads (Inbox)</span>
            <span className="block text-3xl font-black text-white">{leadCount}</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center justify-center">
            <Inbox className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel-dark p-6 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Pending Leads</span>
            <span className={`block text-3xl font-black ${pendingLeadCount > 0 ? "text-amber-400" : "text-white"}`}>
              {pendingLeadCount}
            </span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center">
            <Clock className="w-6 h-6" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass-panel-dark p-6 rounded-xl border border-white/5 flex items-center justify-between">
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-gray-400 uppercase tracking-wide">Testimoni Klien</span>
            <span className="block text-3xl font-black text-white">{testimonialCount}</span>
          </div>
          <div className="w-12 h-12 rounded-lg bg-pink-500/10 text-pink-400 border border-pink-500/20 flex items-center justify-center">
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Details layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-4">
        {/* Recent leads box */}
        <div className="lg:col-span-2 glass-panel-dark p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Leads Masuk Terbaru</h3>
          
          {recentLeads.length === 0 ? (
            <p className="text-xs text-gray-500 py-6">Belum ada leads / pesan masuk.</p>
          ) : (
            <div className="space-y-3">
              {recentLeads.map((lead) => (
                <div key={lead.id} className="p-4 bg-white/5 rounded-lg border border-white/5 flex items-start justify-between gap-4">
                  <div className="space-y-1 overflow-hidden">
                    <span className="block text-xs font-bold text-white">{lead.name}</span>
                    <span className="block text-[10px] text-gray-400 truncate">{lead.email}</span>
                    <p className="text-[11px] text-gray-300 line-clamp-1 mt-1 font-sans">{lead.message}</p>
                  </div>
                  <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${
                    lead.status === "pending"
                      ? "bg-amber-500/15 text-amber-400 border border-amber-500/25"
                      : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25"
                  }`}>
                    {lead.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Database Notice Box */}
        <div className="glass-panel-dark p-6 rounded-xl border border-white/5 space-y-4">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">Status Infrastruktur</h3>
          <div className="space-y-3 text-xs text-gray-300">
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>Database</span>
              <span className="text-emerald-400 font-bold">Terhubung</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>DB Provider</span>
              <span className="text-cyan-400 font-sans">PostgreSQL</span>
            </div>
            <div className="flex items-center justify-between border-b border-white/5 pb-2">
              <span>Skema Prisma</span>
              <span className="text-violet-400 font-sans">Sync OK</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Storage Gambar</span>
              <span className="text-amber-400 font-sans">Cloudinary</span>
            </div>
          </div>
          <div className="p-3 bg-white/5 rounded-lg border border-white/5 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
            <span className="text-[10px] text-gray-400 leading-relaxed font-sans">
              Semua data di-render secara dinamis dari database PostgreSQL lokal Anda. Pastikan server PostgreSQL tetap berjalan.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
