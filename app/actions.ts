"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import cloudinary from "@/lib/cloudinary";

// --- IMAGE UPLOAD ACTION ---

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file || file.size === 0) {
    return { success: false, error: "Tidak ada file gambar yang dipilih." };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Upload to Cloudinary using secure stream upload
    const uploadResult = await new Promise<any>((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { folder: "digital-products-hub" },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Stream Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(buffer);
    });

    return { success: true, url: uploadResult.secure_url };
  } catch (error: any) {
    console.error("Failed to upload image to Cloudinary:", error);
    return { success: false, error: error.message || "Gagal mengunggah gambar ke server Cloudinary." };
  }
}

// --- LEAD ACTIONS ---

export async function submitLead(data: {
  name: string;
  email: string;
  phone?: string;
  message: string;
}) {
  if (!data.name || !data.email || !data.message) {
    return { success: false, error: "Nama, email, dan pesan harus diisi." };
  }

  try {
    const lead = await prisma.lead.create({
      data: {
        name: data.name,
        email: data.email,
        phone: data.phone || null,
        message: data.message,
        status: "pending",
      },
    });

    revalidatePath("/admin/dashboard");
    revalidatePath("/admin/dashboard/leads");
    return { success: true, leadId: lead.id };
  } catch (error) {
    console.error("Failed to create lead:", error);
    return { success: false, error: "Gagal menyimpan pesan ke database." };
  }
}

export async function updateLeadStatus(id: string, status: string) {
  try {
    await prisma.lead.update({
      where: { id },
      data: { status },
    });
    revalidatePath("/admin/dashboard/leads");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false, error: "Gagal memperbarui status lead." };
  }
}

// --- PRODUCT ACTIONS ---

export async function deleteProduct(id: string) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/undangan");
    revalidatePath("/website");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/products");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete product:", error);
    return { success: false, error: "Gagal menghapus produk." };
  }
}

export async function toggleProductStatus(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      select: { status: true },
    });

    if (!product) {
      return { success: false, error: "Produk tidak ditemukan." };
    }

    const newStatus = product.status === "published" ? "draft" : "published";

    await prisma.product.update({
      where: { id },
      data: { status: newStatus },
    });

    revalidatePath("/undangan");
    revalidatePath("/website");
    revalidatePath("/");
    revalidatePath("/admin/dashboard/products");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle product status:", error);
    return { success: false, error: "Gagal mengubah status produk." };
  }
}

export async function saveProduct(data: {
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
}) {
  if (!data.slug || !data.title || !data.category || !data.thumbnailUrl) {
    return { success: false, error: "Mohon isi field wajib (Slug, Judul, Kategori, Thumbnail)." };
  }

  try {
    let result;
    if (data.id) {
      // Update product
      result = await prisma.product.update({
        where: { id: data.id },
        data: {
          slug: data.slug,
          title: data.title,
          description: data.description,
          category: data.category,
          price: Number(data.price),
          demoUrl: data.demoUrl || null,
          thumbnailUrl: data.thumbnailUrl,
          images: data.images,
          features: data.features,
          status: data.status,
        },
      });
    } else {
      // Create new product
      result = await prisma.product.create({
        data: {
          slug: data.slug,
          title: data.title,
          description: data.description,
          category: data.category,
          price: Number(data.price),
          demoUrl: data.demoUrl || null,
          thumbnailUrl: data.thumbnailUrl,
          images: data.images,
          features: data.features,
          status: data.status,
        },
      });
    }

    revalidatePath("/undangan");
    revalidatePath("/website");
    revalidatePath("/");
    revalidatePath(`/works/${data.slug}`);
    revalidatePath("/admin/dashboard/products");
    revalidatePath("/admin/dashboard");
    return { success: true, product: result };
  } catch (error: any) {
    console.error("Failed to save product:", error);
    if (error.code === "P2002") {
      return { success: false, error: "Slug sudah digunakan produk lain. Pilih slug yang unik." };
    }
    return { success: false, error: "Gagal menyimpan produk ke database." };
  }
}
