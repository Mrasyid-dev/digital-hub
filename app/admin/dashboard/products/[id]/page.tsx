import React from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import ProductForm from "../ProductForm";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: EditProductPageProps) {
  const { id } = await params;

  // Fetch product details
  const product = await prisma.product.findUnique({
    where: { id },
  });

  if (!product) {
    notFound();
  }

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">EDIT PRODUK</h1>
        <p className="text-xs text-gray-400">Perbarui spesifikasi, deskripsi, harga, atau gambar untuk produk ini.</p>
      </div>

      <ProductForm product={product} />
    </div>
  );
}
