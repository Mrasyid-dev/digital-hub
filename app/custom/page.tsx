"use client";

import React, { useState } from "react";
import { Cpu, Send, CheckCircle2, AlertTriangle, MessageSquare, ShieldAlert, Sparkles } from "lucide-react";
import { submitLead } from "@/app/actions";

export default function CustomRequestPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectType: "Company Profile",
    budgetRange: "Rp 1.000.000 - Rp 3.000.000",
    timeline: "1 - 2 Minggu",
    description: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.description) {
      setStatus("error");
      setErrorMessage("Mohon isi Nama, Email, dan Deskripsi kebutuhan.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    // Compile message from questionnaire answers
    const compiledMessage = `
[REQUEST CUSTOM WEBSITE]
Tipe Project: ${formData.projectType}
Estimasi Budget: ${formData.budgetRange}
Timeline: ${formData.timeline}

Kebutuhan Fitur:
${formData.description}
`.trim();

    try {
      const result = await submitLead({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: compiledMessage,
      });

      if (result.success) {
        setStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          projectType: "Company Profile",
          budgetRange: "Rp 1.000.000 - Rp 3.000.000",
          timeline: "1 - 2 Minggu",
          description: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Gagal menyimpan pengajuan.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Terjadi kesalahan koneksi server.");
    }
  };

  if (status === "success") {
    return (
      <div className="w-full max-w-2xl mx-auto px-4 py-20 text-center">
        <div className="glass-panel border-cyan-500/30 p-10 rounded-3xl space-y-6">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-cyan-500/10 text-cyan-400 mb-2 glow-cyan">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl font-black text-white">Pengajuan Custom Diterima!</h2>
          <p className="text-sm text-gray-400 leading-relaxed max-w-md mx-auto">
            Terima kasih telah mengisi kuesioner. Tim kami akan segera meninjau proposal Anda dan menghubungi Anda kembali melalui WhatsApp atau Email untuk memberikan penawaran harga resmi.
          </p>
          <button
            onClick={() => setStatus("idle")}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg transition-all"
          >
            Kirim Pengajuan Baru
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Header */}
      <div className="text-center space-y-4 mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-semibold text-cyan-400">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tailored Custom Web Services</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          Request Desain{" "}
          <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent glow-text-cyan">
            Website Kustom
          </span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-xl mx-auto">
          Isi kuesioner project di bawah untuk membantu kami memahami visi dan detail website yang ingin Anda bangun.
        </p>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-xs mb-6">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Questionnaire Form */}
      <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Name */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Nama Lengkap *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={status === "loading"}
              placeholder="Contoh: Budi Santoso"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>

          {/* WhatsApp */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">No. WhatsApp / HP</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              disabled={status === "loading"}
              placeholder="Contoh: 0812xxxxxxxx"
              className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
            />
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Alamat Email *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === "loading"}
            placeholder="Contoh: budi@gmail.com"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Project Type */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Tipe Project</label>
            <select
              name="projectType"
              value={formData.projectType}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full bg-black/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors [&>option]:bg-gray-900"
            >
              <option value="Company Profile">Company Profile</option>
              <option value="E-Commerce / Toko Online">E-Commerce</option>
              <option value="Landing Page Produk">Landing Page</option>
              <option value="Sistem Informasi / Dashboard">Sistem Informasi</option>
              <option value="Web Undangan Kustom">Undangan Kustom</option>
            </select>
          </div>

          {/* Budget Range */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Estimasi Budget</label>
            <select
              name="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full bg-black/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors [&>option]:bg-gray-900"
            >
              <option value="Di bawah Rp 1.000.000">&lt; Rp 1 Juta</option>
              <option value="Rp 1.000.000 - Rp 3.000.000">Rp 1 - 3 Juta</option>
              <option value="Rp 3.000.000 - Rp 5.000.000">Rp 3 - 5 Juta</option>
              <option value="Di atas Rp 5.000.000">&gt; Rp 5 Juta</option>
            </select>
          </div>

          {/* Timeline */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Estimasi Timeline</label>
            <select
              name="timeline"
              value={formData.timeline}
              onChange={handleChange}
              disabled={status === "loading"}
              className="w-full bg-black/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors [&>option]:bg-gray-900"
            >
              <option value="Kurang dari 1 Minggu">&lt; 1 Minggu</option>
              <option value="1 - 2 Minggu">1 - 2 Minggu</option>
              <option value="2 - 4 Minggu">2 - 4 Minggu</option>
              <option value="Lebih dari 1 Bulan">&gt; 1 Bulan</option>
            </select>
          </div>
        </div>

        {/* Feature/App description */}
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Jelaskan Detail Fitur & Kebutuhan *</label>
          <textarea
            name="description"
            rows={5}
            value={formData.description}
            onChange={handleChange}
            required
            disabled={status === "loading"}
            placeholder="Contoh: Saya butuh website company profile untuk kantor kontraktor dengan 5 halaman, terintegrasi form email, galeri proyek berjalan, dan tautan sosial media..."
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-500/20 hover:shadow-cyan-400/20 transition-all duration-300 disabled:opacity-50"
        >
          {status === "loading" ? (
            <span>Mengirim Proposal...</span>
          ) : (
            <>
              <span>Kirim Proposal Project</span>
              <Send className="w-4 h-4" />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
