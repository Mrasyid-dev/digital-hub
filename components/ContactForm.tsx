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
      <div className="bg-white border border-gray-100 p-8 rounded-3xl text-center space-y-4 max-w-lg mx-auto shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-100 mb-2 shadow-inner">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl font-bold text-gray-800">Pesan Terkirim!</h3>
        <p className="text-sm text-gray-500 leading-relaxed">
          Terima kasih telah menghubungi kami. Kami akan meninjau pesan Anda dan segera menghubungi Anda kembali melalui WhatsApp atau Email.
        </p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-4 px-6 py-2.5 rounded-full bg-gradient-to-r from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 text-white font-bold text-xs transition-all shadow-md shadow-emerald-500/15"
        >
          Kirim Pesan Baru
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-8 rounded-3xl border border-gray-100 space-y-6 max-w-xl mx-auto shadow-[0_15px_40px_rgba(0,0,0,0.05)]">
      <div className="space-y-2">
        <h3 className="text-xl font-black text-gray-800 tracking-tight">
          Mulai Project Anda
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed font-semibold">
          Diskusikan kebutuhan website Anda, kami akan memberikan estimasi pengerjaan dan solusi terbaik.
        </p>
      </div>

      {status === "error" && (
        <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50 border border-red-100 text-red-700 text-xs font-semibold">
          <AlertTriangle className="w-5 h-5 shrink-0 text-red-500" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Input Name */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
          <User className="w-3.5 h-3.5 text-emerald-500" />
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
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
        />
      </div>

      {/* Email & Phone grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-sky-500" />
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
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-emerald-500" />
            <span>Nomor WhatsApp</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={status === "loading"}
            placeholder="081234xxxx"
            className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200"
          />
        </div>
      </div>

      {/* Message */}
      <div className="space-y-1.5">
        <label className="text-xs font-bold text-gray-600 flex items-center gap-1.5">
          <MessageSquare className="w-3.5 h-3.5 text-sky-500" />
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
          className="w-full bg-gray-50/50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all duration-200 resize-none"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === "loading"}
        className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-sky-500 hover:from-emerald-500 hover:to-sky-400 text-white font-bold text-sm shadow-md shadow-emerald-500/10 hover:shadow-emerald-500/20 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
