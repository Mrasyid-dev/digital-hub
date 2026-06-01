"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Trash2, Edit2, ToggleLeft, ToggleRight, Plus, ExternalLink, AlertTriangle } from "lucide-react";
import { deleteProduct, toggleProductStatus } from "@/app/actions";

interface Product {
  id: string;
  slug: string;
  title: string;
  category: string;
  price: number;
  thumbnailUrl: string;
  status: string;
}

interface ProductsListProps {
  initialProducts: Product[];
}

export default function ProductsList({ initialProducts }: ProductsListProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const formatPrice = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const handleToggleStatus = async (id: string) => {
    setLoadingId(id);
    try {
      const res = await toggleProductStatus(id);
      if (res.success) {
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? { ...p, status: p.status === "published" ? "draft" : "published" } : p))
        );
      } else {
        alert(res.error || "Gagal mengubah status.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Apakah Anda yakin ingin menghapus produk "${title}"?`)) {
      return;
    }

    setLoadingId(id);
    try {
      const res = await deleteProduct(id);
      if (res.success) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
      } else {
        alert(res.error || "Gagal menghapus produk.");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan.");
    } finally {
      setLoadingId(null);
    }
  };

  const filteredProducts = products.filter((p) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Search */}
        <input
          type="text"
          placeholder="Cari produk berdasarkan judul atau kategori..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full sm:max-w-xs bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400"
        />

        <Link
          href="/admin/dashboard/products/new"
          className="w-full sm:w-auto flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs shadow-lg shadow-violet-500/20 transition-all duration-300"
        >
          <Plus className="w-4 h-4" />
          <span>Tambah Produk Baru</span>
        </Link>
      </div>

      {/* Table container */}
      <div className="glass-panel rounded-xl border border-white/5 overflow-hidden">
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center text-gray-500 text-xs">
            Tidak ada produk ditemukan.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-white/5 bg-white/5 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  <th className="p-4 w-20">Gambar</th>
                  <th className="p-4">Nama Produk</th>
                  <th className="p-4">Kategori</th>
                  <th className="p-4">Harga</th>
                  <th className="p-4 text-center">Status</th>
                  <th className="p-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-xs text-gray-300">
                {filteredProducts.map((p) => {
                  const isWedding = p.category === "undangan";
                  const isPublished = p.status === "published";
                  const isProcessing = loadingId === p.id;

                  return (
                    <tr key={p.id} className="hover:bg-white/5 transition-colors">
                      {/* Thumbnail */}
                      <td className="p-4">
                        <div className="w-14 aspect-video rounded overflow-hidden border border-white/10 bg-black/40">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.thumbnailUrl}
                            alt={p.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </td>

                      {/* Title */}
                      <td className="p-4 font-bold text-white max-w-xs truncate">
                        <Link
                          href={`/works/${p.slug}`}
                          target="_blank"
                          className="hover:text-cyan-400 inline-flex items-center gap-1.5 transition-colors"
                        >
                          <span>{p.title}</span>
                          <ExternalLink className="w-3 h-3 text-gray-500 shrink-0" />
                        </Link>
                      </td>

                      {/* Category */}
                      <td className="p-4 uppercase tracking-wider text-[10px] font-bold">
                        <span className={`px-2 py-0.5 rounded ${
                          isWedding
                            ? "bg-pink-500/10 text-pink-400 border border-pink-500/25"
                            : "bg-cyan-500/10 text-cyan-400 border border-cyan-500/25"
                        }`}>
                          {p.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="p-4 font-bold text-gray-300">{formatPrice(p.price)}</td>

                      {/* Status Toggle */}
                      <td className="p-4 text-center">
                        <button
                          onClick={() => handleToggleStatus(p.id)}
                          disabled={isProcessing}
                          className="focus:outline-none disabled:opacity-50 inline-flex"
                          title={isPublished ? "Set to Draft" : "Set to Published"}
                        >
                          {isPublished ? (
                            <ToggleRight className="w-8 h-8 text-emerald-400 hover:text-emerald-300 transition-colors" />
                          ) : (
                            <ToggleLeft className="w-8 h-8 text-gray-600 hover:text-gray-500 transition-colors" />
                          )}
                        </button>
                      </td>

                      {/* Actions */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2.5">
                          <Link
                            href={`/admin/dashboard/products/${p.id}`}
                            className="p-2 rounded bg-white/5 hover:bg-violet-500/20 text-gray-400 hover:text-violet-400 transition-all"
                            title="Edit Product"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </Link>
                          <button
                            onClick={() => handleDelete(p.id, p.title)}
                            disabled={isProcessing}
                            className="p-2 rounded bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-all disabled:opacity-50"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
