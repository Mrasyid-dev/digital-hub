"use client";

import React, { useState } from "react";
import { Mail, Phone, Calendar, Clock, CheckCircle2, User, MessageSquare, AlertCircle } from "lucide-react";
import { updateLeadStatus } from "@/app/actions";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  status: string;
  createdAt: Date;
}

interface LeadsListProps {
  initialLeads: Lead[];
}

export default function LeadsList({ initialLeads }: LeadsListProps) {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [filter, setFilter] = useState<string>("all");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleStatusChange = async (id: string, newStatus: string) => {
    setLoadingId(id);
    try {
      const res = await updateLeadStatus(id, newStatus);
      if (res.success) {
        setLeads((prev) =>
          prev.map((l) => (l.id === id ? { ...l, status: newStatus } : l))
        );
      } else {
        alert(res.error || "Gagal memperbarui status.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredLeads = leads.filter((l) => {
    if (filter === "all") return true;
    return l.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="flex items-center gap-2 bg-white/5 p-1 rounded-lg border border-white/5 w-fit">
        {["all", "pending", "contacted", "completed"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-md text-xs font-semibold uppercase tracking-wider transition-all ${
              filter === f
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-cyan-500/10"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Leads list */}
      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <div className="glass-panel-dark p-12 text-center text-gray-500 text-xs rounded-xl border border-white/5">
            Tidak ada pesan / leads dalam kategori ini.
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isProcessing = loadingId === lead.id;
            return (
              <div
                key={lead.id}
                className={`glass-panel-dark p-6 rounded-xl border transition-colors ${
                  lead.status === "pending"
                    ? "border-amber-500/20 bg-amber-500/5 hover:bg-amber-500/10"
                    : lead.status === "completed"
                    ? "border-emerald-500/20 bg-emerald-500/20"
                    : "border-white/5"
                }`}
              >
                {/* Meta details */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-white/5 flex items-center justify-center text-gray-400">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white">{lead.name}</h4>
                      <div className="flex items-center gap-3 mt-0.5 text-[10px] text-gray-400 font-sans">
                        <span className="flex items-center gap-1">
                          <Mail className="w-3 h-3 text-cyan-400" />
                          {lead.email}
                        </span>
                        {lead.phone && (
                          <span className="flex items-center gap-1">
                            <Phone className="w-3 h-3 text-emerald-400" />
                            {lead.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <span className="flex items-center gap-1 text-[10px] text-gray-400 font-sans">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(lead.createdAt)}
                    </span>

                    {/* Status Dropdown selector */}
                    <div className="flex items-center gap-1.5 bg-black/40 border border-white/10 px-2.5 py-1 rounded-md">
                      <span className="text-[10px] text-gray-400 font-medium">Status:</span>
                      <select
                        value={lead.status}
                        disabled={isProcessing}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value)}
                        className="bg-transparent text-[10px] text-white font-bold uppercase focus:outline-none cursor-pointer disabled:opacity-50"
                      >
                        <option value="pending" className="bg-gray-900 text-amber-400 font-bold">Pending</option>
                        <option value="contacted" className="bg-gray-900 text-cyan-400 font-bold">Contacted</option>
                        <option value="completed" className="bg-gray-900 text-emerald-400 font-bold">Completed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Message Body */}
                <div className="bg-black/20 p-4 rounded-lg border border-white/5">
                  <div className="flex gap-2 text-gray-400 mb-2">
                    <MessageSquare className="w-4 h-4 shrink-0 text-cyan-400 mt-0.5" />
                    <span className="text-[10px] font-bold uppercase tracking-wider">Isi Kebutuhan Project / Pesan</span>
                  </div>
                  <p className="text-xs text-gray-200 leading-relaxed whitespace-pre-line font-mono pl-6">
                    {lead.message}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
