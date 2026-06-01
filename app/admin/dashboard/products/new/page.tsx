import React from "react";
import ProductForm from "../ProductForm";

export default function NewProductPage() {
  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">TAMBAH PRODUK</h1>
        <p className="text-xs text-gray-400">Buat template desain baru untuk dipublikasikan di galeri showcase.</p>
      </div>

      <ProductForm />
    </div>
  );
}
