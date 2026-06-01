"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Plus, Trash2, Image, Sparkles, UploadCloud } from "lucide-react";
import Link from "next/link";
import { saveProduct, uploadImageAction } from "@/app/actions";

interface Product {
  id?: string;
  slug: string;
  title: string;
  description: string;
  category: string;
  price: number;
  demoUrl?: string | null;
  thumbnailUrl: string;
  images: string[];
  features: string[];
  status: string;
}

interface ProductFormProps {
  product?: Product; // If provided, we are in Edit mode
}

export default function ProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<Product>({
    id: product?.id,
    slug: product?.slug || "",
    title: product?.title || "",
    description: product?.description || "",
    category: product?.category || "website",
    price: product?.price || 0,
    demoUrl: product?.demoUrl || "",
    thumbnailUrl: product?.thumbnailUrl || "",
    images: product?.images || [""],
    features: product?.features || [""],
    status: product?.status || "draft",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  // Cloudinary upload state
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Replace spaces with -
      .replace(/[^\w\-]+/g, "") // Remove all non-word chars
      .replace(/\-\-+/g, "-"); // Replace multiple - with single -
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const title = e.target.value;
    setFormData((prev) => ({
      ...prev,
      title,
      slug: product?.id ? prev.slug : slugify(title), // Auto-slugify only in Create mode
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" ? Number(value) : value,
    }));
  };

  // Cloudinary Image Upload handler
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, targetField: "thumbnail" | { galleryIndex: number }) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    setUploading(true);
    setUploadError("");

    const uploadData = new FormData();
    uploadData.append("file", file);

    try {
      const res = await uploadImageAction(uploadData);

      if (!res.success) {
        throw new Error(res.error || "Gagal mengunggah gambar.");
      }

      const imageUrl = res.url;

      if (targetField === "thumbnail") {
        setFormData((prev) => ({ ...prev, thumbnailUrl: imageUrl }));
      } else {
        const index = targetField.galleryIndex;
        setFormData((prev) => {
          const updated = [...prev.images];
          updated[index] = imageUrl!;
          return { ...prev, images: updated };
        });
      }
    } catch (err: any) {
      console.error(err);
      setUploadError(err.message || "Gagal mengunggah file. Silakan masukkan URL manual.");
    } finally {
      setUploading(false);
    }
  };

  // Features list management
  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.features];
      updated[index] = value;
      return { ...prev, features: updated };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({ ...prev, features: [...prev.features, ""] }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => {
      const updated = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: updated.length > 0 ? updated : [""] };
    });
  };

  // Gallery images list management
  const handleGalleryChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updated = [...prev.images];
      updated[index] = value;
      return { ...prev, images: updated };
    });
  };

  const addGalleryImage = () => {
    setFormData((prev) => ({ ...prev, images: [...prev.images, ""] }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => {
      const updated = prev.images.filter((_, i) => i !== index);
      return { ...prev, images: updated.length > 0 ? updated : [""] };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    // Filter empty features & images
    const cleanedFeatures = formData.features.filter((f) => f.trim() !== "");
    const cleanedImages = formData.images.filter((i) => i.trim() !== "");

    if (cleanedFeatures.length === 0) {
      setError("Mohon isi minimal satu fitur produk.");
      return;
    }

    setLoading(true);

    try {
      const res = await saveProduct({
        ...formData,
        features: cleanedFeatures,
        images: cleanedImages,
      });

      if (res.success) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/admin/dashboard/products");
          router.refresh();
        }, 1500);
      } else {
        setError(res.error || "Gagal menyimpan produk.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Koneksi gagal saat menyimpan produk.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
      {/* Action bar */}
      <div className="flex items-center justify-between">
        <Link
          href="/admin/dashboard/products"
          className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Batal</span>
        </Link>
        <button
          type="submit"
          disabled={loading || uploading}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-violet-500/25 transition-all duration-300 disabled:opacity-50"
        >
          <Save className="w-4 h-4" />
          <span>{loading ? "Menyimpan..." : "Simpan Produk"}</span>
        </button>
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-200 text-xs">
          {error}
        </div>
      )}

      {success && (
        <div className="p-4 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-200 text-xs">
          Produk berhasil disimpan! Mengalihkan halaman...
        </div>
      )}

      {uploadError && (
        <div className="p-3.5 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-200 text-xs">
          <span>{uploadError}</span>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side: General Info */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Informasi Umum</h3>

            {/* Title */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Judul Produk *</label>
              <input
                type="text"
                value={formData.title}
                onChange={handleTitleChange}
                required
                disabled={loading}
                placeholder="Contoh: Premium Blue Wedding Theme"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Slug */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Slug URL *</label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="contoh-blue-wedding"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Deskripsi Singkat</label>
              <textarea
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                disabled={loading}
                placeholder="Deskripsikan fitur template, gaya desain, dsb..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors resize-none"
              />
            </div>
          </div>

          {/* Features Checklist */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Daftar Fitur Produk *</h3>
              <button
                type="button"
                onClick={addFeature}
                className="text-[10px] text-cyan-400 hover:text-white flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Fitur</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(idx, e.target.value)}
                    required={idx === 0}
                    placeholder="Contoh: Galeri Foto Zoomable"
                    className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                  {formData.features.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeFeature(idx)}
                      className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Gallery Images */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">Gambar Galeri (URL)</h3>
              <button
                type="button"
                onClick={addGalleryImage}
                className="text-[10px] text-cyan-400 hover:text-white flex items-center gap-1 font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Tambah Gambar</span>
              </button>
            </div>

            <div className="space-y-3">
              {formData.images.map((imgUrl, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={imgUrl}
                      onChange={(e) => handleGalleryChange(idx, e.target.value)}
                      placeholder="Masukkan URL Gambar..."
                      className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeGalleryImage(idx)}
                        className="p-2 text-gray-500 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  {/* Cloudinary upload for gallery image */}
                  <div className="flex items-center gap-2 bg-white/5 p-2 rounded border border-white/5">
                    <UploadCloud className="w-4 h-4 text-cyan-400 shrink-0" />
                    <input
                      type="file"
                      accept="image/*"
                      disabled={uploading}
                      onChange={(e) => handleImageUpload(e, { galleryIndex: idx })}
                      className="text-[10px] text-gray-400 file:mr-2 file:py-1 file:px-2.5 file:rounded file:border-0 file:text-[10px] file:font-semibold file:bg-white/10 file:text-white file:cursor-pointer hover:file:bg-white/20"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Metadata / Configuration */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Konfigurasi</h3>

            {/* Category */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Kategori *</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-black/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors [&>option]:bg-gray-900"
              >
                <option value="website">Website / Landing Page</option>
                <option value="undangan">Undangan Online</option>
              </select>
            </div>

            {/* Price */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Harga (IDR) *</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                disabled={loading}
                placeholder="Contoh: 150000"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Demo URL */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">URL Demo Live</label>
              <input
                type="url"
                name="demoUrl"
                value={formData.demoUrl || ""}
                onChange={handleChange}
                disabled={loading}
                placeholder="https://theme-demo.vercel.app"
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Status */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Status Publikasi</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-black/80 border border-white/10 rounded-lg px-4 py-2.5 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors [&>option]:bg-gray-900"
              >
                <option value="draft">Draft (Sembunyikan)</option>
                <option value="published">Published (Tampilkan)</option>
              </select>
            </div>
          </div>

          {/* Thumbnail Manager */}
          <div className="glass-panel p-6 rounded-xl border border-white/5 space-y-4">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-2">Thumbnail Utama *</h3>

            {/* Thumbnail Preview */}
            {formData.thumbnailUrl && (
              <div className="aspect-video w-full rounded-lg overflow-hidden border border-white/10 bg-black/40">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.thumbnailUrl}
                  alt="Thumbnail Preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Thumbnail URL Input */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">URL Thumbnail</label>
              <input
                type="text"
                name="thumbnailUrl"
                value={formData.thumbnailUrl}
                onChange={handleChange}
                placeholder="Masukkan URL gambar thumbnail..."
                className="w-full bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white focus:outline-none focus:border-cyan-400 transition-colors"
              />
            </div>

            {/* Cloudinary upload file for thumbnail */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Upload Gambar</label>
              <div className="flex flex-col gap-2 p-3 bg-white/5 rounded-lg border border-white/5 text-center cursor-pointer hover:bg-white/10 transition-colors relative">
                <input
                  type="file"
                  accept="image/*"
                  disabled={uploading}
                  onChange={(e) => handleImageUpload(e, "thumbnail")}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <UploadCloud className="w-8 h-8 text-cyan-400 mx-auto" />
                <span className="text-[10px] text-gray-400">
                  {uploading ? "Mengupload..." : "Klik untuk memilih & upload ke Cloudinary"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
