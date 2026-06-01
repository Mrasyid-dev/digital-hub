import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // 1. Seed Admin
  const adminUsername = "admin";
  const adminPassword = "adminpassword"; // Change this after login
  const hashedPassword = bcrypt.hashSync(adminPassword, 10);

  console.log("Seeding Admin...");
  const admin = await prisma.admin.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      password: hashedPassword,
    },
  });
  console.log(`Admin created/found: ${admin.username}`);

  // 2. Seed Testimonials
  console.log("Seeding Testimonials...");
  await prisma.testimonial.deleteMany();
  const testimonials = await prisma.testimonial.createMany({
    data: [
      {
        clientName: "Rudi Hermawan",
        company: "CV Karya Abadi",
        rating: 5,
        comment: "Website company profile yang dibuat sangat cepat, modern, dan membuat calon klien kami terkesan. Layanan purna jualnya sangat responsif!",
        avatarUrl: "",
      },
      {
        clientName: "Siti Rahma",
        company: "Rahma Boutique",
        rating: 5,
        comment: "Undangan online kami terlihat sangat elegan dan premium. Banyak tamu undangan memuji desainnya yang mewah dan transisi animasinya yang mulus.",
        avatarUrl: "",
      },
      {
        clientName: "Budi Santoso",
        company: "Agro Tech Indonesia",
        rating: 4,
        comment: "Digital Hub ini membantu kami mendesain platform e-commerce kustom. Sangat puas dengan hasil kerja dan pendekatan tech-stack modernnya.",
        avatarUrl: "",
      },
    ],
  });
  console.log("Testimonials seeded.");

  // 3. Seed Products
  console.log("Seeding Products...");
  await prisma.product.deleteMany();
  
  // Wedding invitation product
  await prisma.product.create({
    data: {
      title: "Elegant Gold Wedding Invitation",
      slug: "elegant-gold-wedding-invitation",
      description: "Desain undangan pernikahan digital premium dengan nuansa emas mewah, galeri foto interaktif, RSVP otomatis, dan backsound musik romantis.",
      category: "undangan",
      price: 150000,
      demoUrl: "https://theme-gold.wedding-invitation-demo.vercel.app", // Fallback / mock URL
      thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=600&auto=format&fit=crop"
      ],
      features: [
        "Desain Gold Premium & Elegant",
        "RSVP Online & Integrasi WhatsApp",
        "Galeri Foto & Video",
        "Peta Lokasi & Google Maps Integration",
        "Fitur Kirim Kado / Angpao Digital",
        "Background Musik Kustom"
      ],
      status: "published"
    }
  });

  // Corporate website product
  await prisma.product.create({
    data: {
      title: "SaaS & Startup Modern landing Page",
      slug: "saas-startup-modern-landing-page",
      description: "Landing page modern dengan performa ultra cepat untuk startup, bisnis lokal, maupun digital Anda. Dilengkapi dengan animasi halus dan integrasi analitik.",
      category: "website",
      price: 1250000,
      demoUrl: "https://nextjs.org", // Live demo preview link
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop"
      ],
      features: [
        "SEO Friendly & Performa Skor 100",
        "Responsive di Semua Ukuran Layar",
        "Animasi Bento & Glassmorphic modern",
        "Integrasi Form Kontak Ke Email/Database",
        "Integrasi Google Analytics & Pixel",
        "Hosting Gratis & Setup Domain Kustom"
      ],
      status: "published"
    }
  });

  // Premium Salon website product
  await prisma.product.create({
    data: {
      title: "Cielia - Premium Salon & Hairstyling Website",
      slug: "cielia-premium-salon-hairstyling-website",
      description: "Website landing page premium untuk salon kecantikan, barbershop, maupun jasa hairstyling profesional. Menampilkan desain split-screen mewah, transisi paralaks memukau, animasi interaktif GSAP, smooth scrolling Lenis, dan integrasi feed galeri Instagram.",
      category: "website",
      price: 1500000,
      demoUrl: "https://salon-web-fnnp.vercel.app", // Live demo preview link
      thumbnailUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Desain Split-Screen Split Hero Mewah",
        "Animasi Interaktif GSAP & ScrollTrigger",
        "Smooth Scrolling Modern dengan Lenis",
        "Tipografi Serif & Script yang Elegan",
        "Integrasi Sosial Media & Feed Instagram",
        "Form Newsletter & Peta Lokasi Interaktif",
        "Optimasi Kecepatan & Responsif Mobile"
      ],
      status: "published"
    }
  });

  // Strand Haven Salon product
  await prisma.product.create({
    data: {
      title: "Strand Haven - Premium Hair Salon Landing Page",
      slug: "strand-haven-premium-hair-salon-landing-page",
      description: "Website landing page premium berorientasi estetika tinggi untuk salon kecantikan dan perawatan rambut. Dirancang dengan perpaduan warna kontras modern (dark & light sections), galeri filosofi asimetris, bagian portofolio paralaks, integrasi video preview studio, widget jam operasional interaktif berbentuk kalender, serta layout reservasi/footer yang elegan.",
      category: "website",
      price: 1350000,
      demoUrl: "https://salon-web-y5av.vercel.app",
      thumbnailUrl: "https://plus.unsplash.com/premium_photo-1705009607254-5618bb0d0c35?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://plus.unsplash.com/premium_photo-1705009607254-5618bb0d0c35?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521590832167-7bfcbaa6362d?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1562322140-8baeececf3df?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Desain Layout Asimetris Modern & Elegan",
        "Section Filosofi & Galeri Grid Estetik",
        "Parallax Image Effect pada Section Portfolio",
        "Daftar Layanan Rambut (Layers, Volume, Poni, Ombré, Hairdo) dengan Visual Grid",
        "Widget Kalender & Jam Operasional Interaktif",
        "Integrasi Video Preview Interior Salon",
        "Footer Reservasi & Social Media Link",
        "Animasi Halus dengan GSAP & Smooth Scroll Lenis"
      ],
      status: "published"
    }
  });

  // Goldex Men's Haircut product
  await prisma.product.create({
    data: {
      title: "Goldex - Men's Haircut World & Barber Landing Page",
      slug: "goldex-mens-haircut-world-barber-landing-page",
      description: "Website landing page premium bernuansa retro-modern maskulin untuk barbershop dan salon pria. Dilengkapi layout asimetris panel bergaya bento grid, aksen warna neon lime yang trendi, dekorasi star burst dinamis, stat card pencapaian, fitur virtual hairstyle try-on, dan widget FAQ akordion interaktif.",
      category: "website",
      price: 1450000,
      demoUrl: "https://salon-web-guqv.vercel.app",
      thumbnailUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1593702275687-f8b402bf1fb5?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1620331311520-246422fd82f9?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Aksen Warna Retro Neon Lime & Dark Panel",
        "Dekorasi Animasi Star Burst Interaktif",
        "Layout Bento Grid & Offset Border Hero Image",
        "Interactive Barbershop Stats & Services Row",
        "Virtual Hairstyle Try-On Feature Widget",
        "FAQ Accordion Interaktif & Terintegrasi",
        "Sidebar Widget Jam Buka & Galeri Produk",
        "Desain Responsif & Kecepatan Akses Tinggi"
      ],
      status: "published"
    }
  });

  console.log("Products seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error seeding database: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
