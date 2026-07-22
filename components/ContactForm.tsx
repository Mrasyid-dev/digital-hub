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
      <div className="retro-dialog p-8 text-center space-y-6 max-w-lg mx-auto font-mono text-white">
        <div className="inline-flex items-center justify-center w-16 h-16 border-4 border-emerald-400 bg-emerald-950/40 text-emerald-400 mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-lg font-pixel text-emerald-400 uppercase tracking-wider">&gt; QUEST COMPLETED</h3>
        <p className="text-xs text-gray-300 leading-relaxed uppercase">
          Terima kasih telah menghubungi kami. Kami akan meninjau pesan Anda dan segera menghubungi Anda kembali melalui WhatsApp atau Email.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-pixel text-[9px] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase"
        >
          Kirim Pesan Baru
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="retro-dialog p-8 space-y-6 max-w-xl mx-auto font-mono text-white">
      <div className="space-y-2">
        <h3 className="text-lg font-bold text-white tracking-tight font-title">
          Mulai Project Anda
        </h3>
        <p className="text-xs text-gray-400 leading-relaxed">
          Diskusikan kebutuhan website Anda, kami akan memberikan estimasi pengerjaan dan solusi terbaik.
        </p>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 border-2 border-red-500 bg-red-950/30 text-red-200 text-xs font-bold font-mono">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-400" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Name */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-pixel text-gray-300 flex items-center gap-1.5 uppercase">
          <User className="w-3.5 h-3.5 text-emerald-400" />
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
          className="w-full bg-[#111] border-2 border-white/20 rounded-none px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:bg-black focus:border-emerald-400 transition-all font-mono"
        />
      </div>

      {/* Email & Phone grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-[10px] font-pixel text-gray-300 flex items-center gap-1.5 uppercase">
            <Mail className="w-3.5 h-3.5 text-sky-400" />
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
            className="w-full bg-[#111] border-2 border-white/20 rounded-none px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:bg-black focus:border-emerald-400 transition-all font-mono"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-pixel text-gray-300 flex items-center gap-1.5 uppercase">
            <Phone className="w-3.5 h-3.5 text-emerald-400" />
            <span>Nomor WhatsApp</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "loading"}
            placeholder="081234xxxx"
            className="w-full bg-[#111] border-2 border-white/20 rounded-none px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:bg-black focus:border-emerald-400 transition-all font-mono"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-[10px] font-pixel text-gray-300 flex items-center gap-1.5 uppercase">
          <MessageSquare className="w-3.5 h-3.5 text-sky-400" />
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
          className="w-full bg-[#111] border-2 border-white/20 rounded-none px-4 py-2.5 text-sm text-white placeholder-white/35 focus:outline-none focus:bg-black focus:border-emerald-400 transition-all font-mono resize-none"
        />
      </div>

      {/* Submit Button & FUDs Reduction */}
      <div className="space-y-2">
        <button
          type="submit"
          disabled={status === "loading"}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-500 hover:bg-emerald-400 text-black font-pixel font-bold text-[10.5px] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all uppercase disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span>MENGIRIM REQUEST...</span>
          ) : (
            <>
              <span>KIRIM REQUEST KONSULTASI</span>
              <Send className="w-4 h-4 text-black" />
            </>
          )}
        </button>
        <p className="text-[10px] text-gray-400 font-mono text-center flex flex-wrap items-center justify-center gap-x-4 gap-y-1 pt-1">
          <span>🔒 Privasi Terjamin (Enkripsi SSL)</span>
          <span>⚡ Respon Cepat &lt; 2 Jam</span>
          <span>✓ Tanpa Komitmen Pembelian</span>
        </p>
      </div>
    </form>
  );
}
