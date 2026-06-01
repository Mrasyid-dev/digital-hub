import React from "react";
import { prisma } from "@/lib/prisma";
import ProductsList from "./ProductsList";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  // Query all products ordered by latest
  const products = await prisma.product.findMany({
    select: {
      id: true,
      slug: true,
      title: true,
      category: true,
      price: true,
      thumbnailUrl: true,
      status: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Title block */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">MANAJEMEN PRODUK</h1>
        <p className="text-xs text-gray-400">
          Kelola template desain undangan online dan landing page website Anda di sini.
        </p>
      </div>

      <ProductsList initialProducts={products} />
    </div>
  );
}
