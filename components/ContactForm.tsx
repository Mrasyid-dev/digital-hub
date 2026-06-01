"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, AlertTriangle, User, Mail, Phone, MessageSquare } from "lucide-react";
import { submitLead } from "@/app/actions";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus("error");
      setErrorMessage("Mohon lengkapi seluruh field wajib.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const result = await submitLead(formData);
      if (result.success) {
        setStatus("success");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setStatus("error");
        setErrorMessage(result.error || "Gagal mengirim pesan.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("Terjadi kesalahan koneksi server.");
    }
  };

  if (status === "success") {
    return (
      <div className="glass-panel border-cyan-500/30 p-8 rounded-2xl text-center space-y-4 max-w-lg mx-auto">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-cyan-500/10 text-cyan-400 mb-2 glow-cyan">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-white">Pesan Terkirim!</h3>
        <p className="text-sm text-gray-400">
          Terima kasih telah menghubungi kami. Kami akan meninjau pesan Anda dan segera menghubungi Anda kembali melalui WhatsApp atau Email.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-semibold text-xs transition-all"
        >
          Kirim Pesan Baru
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-8 rounded-2xl border border-white/10 space-y-6 max-w-xl mx-auto">
      <div className="space-y-2">
        <h3 className="text-xl font-bold text-white bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
          Mulai Project Anda
        </h3>
        <p className="text-xs text-gray-400">
          Diskusikan kebutuhan website Anda, kami akan memberikan estimasi pengerjaan dan solusi terbaik.
        </p>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-violet-400" />
          <span>Nama Lengkap <span className="text-red-500">*</span></span>
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          placeholder="Masukkan nama Anda..."
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
        />
      </div>

      {/* Email & Phone grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-violet-400" />
            <span>Email <span className="text-red-500">*</span></span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            disabled={status === "loading"}
            placeholder="nama@email.com"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-violet-400" />
            <span>Nomor WhatsApp</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "loading"}
            placeholder="081234xxxx"
            className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-violet-400" />
          <span>Detail Kebutuhan Project <span className="text-red-500">*</span></span>
        </label>
        <textarea
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          disabled={status === "loading"}
          placeholder="Jelaskan fitur-fitur website yang Anda inginkan, budget, atau timeline pengerjaan..."
          className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-sm shadow-lg shadow-violet-500/20 hover:shadow-cyan-400/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "loading" ? (
          <span>Mengirim...</span>
        ) : (
          <>
            <span>Kirim Request Project</span>
            <Send className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
}
