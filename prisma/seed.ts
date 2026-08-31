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
  await prisma.testimonial.createMany({
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

  const productsData = [
    // ==========================================
    // 1. UNDANGAN DIGITAL (7 items for pagination)
    // ==========================================
    {
      title: "Elegant Gold Wedding Invitation",
      slug: "elegant-gold-wedding-invitation",
      description: "Desain undangan pernikahan digital premium dengan nuansa emas mewah, galeri foto interaktif, RSVP otomatis, dan backsound musik romantis.",
      category: "undangan",
      price: 150000,
      demoUrl: "https://theme-gold.wedding-invitation-demo.vercel.app",
      thumbnailUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=80&w=800&auto=format&fit=crop"
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
    },
    {
      title: "Rustic Flora Botanical Wedding",
      slug: "rustic-flora-botanical-wedding",
      description: "Undangan digital berkonsep earth tone bohemian dan dedaunan asri. Cocok untuk tema pernikahan outdoor, garden party, atau rustic modern.",
      category: "undangan",
      price: 150000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Palet Warna Earthy Warm & Rustic",
        "Kutipan Ayat & Love Story Timeline",
        "Reservasi Tamu VIP & Meja Reservasi",
        "Countdown Timer Menuju Hari H",
        "Buku Tamu Interaktif Ucapan Doa"
      ],
      status: "published"
    },
    {
      title: "Royal Emerald Modern Wedding",
      slug: "royal-emerald-modern-wedding",
      description: "Kemewahan warna hijau zamrud dan aksen emas klasik dengan transisi paralaks mulus untuk pesta pernikahan megah nan berkelas.",
      category: "undangan",
      price: 175000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Tema Hijau Emerald & Gold Foil Effect",
        "Animasi Tirai Pembuka Undangan",
        "QR Code Check-In Tamu Undangan",
        "Direct Navigation Google Maps / Waze",
        "Integrasi Bank Transfer & E-Wallet"
      ],
      status: "published"
    },
    {
      title: "Minimalist Monochrome Wedding",
      slug: "minimalist-monochrome-wedding",
      description: "Tipografi editorial kontemporer dengan tata letak minimalis hitam-putih yang bersih dan estetika majalah fashion modern.",
      category: "undangan",
      price: 140000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Desain Minimalis High-End Editorial",
        "Mendukung Foto Resolusi Tinggi",
        "Mode Gelap / Terang Otomatis",
        "RSVP WhatsApp Cepat 1-Klik"
      ],
      status: "published"
    },
    {
      title: "Lavender Bliss Pastel Wedding",
      slug: "lavender-bliss-pastel-wedding",
      description: "Nuansa ungu pastel lavender yang lembut dengan kelopak bunga berterbangan (floating petals animation) dan atmosfer romantis.",
      category: "undangan",
      price: 150000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Efek Partikel Kelopak Bunga Berjatuhan",
        "Player Musik Autoplay dengan Kontrol Volume",
        "Galeri Foto Prewedding Slider 3D",
        "Ucapan Doa Realtime"
      ],
      status: "published"
    },
    {
      title: "Classic Javanese Royal Heritage",
      slug: "classic-javanese-royal-heritage",
      description: "Sentuhan ornamen ukir batik parang keraton dengan kemasan modern. Dibuat khusus untuk adat Jawa, Sunda, dan Nusantara.",
      category: "undangan",
      price: 160000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Ornamen Nusantara & Filosofi Adat",
        "Teks Aksara & Font Kaligrafi Elegan",
        "Panduan Protokol Acara Lengkap",
        "Integrasi Live Streaming Youtube"
      ],
      status: "published"
    },
    {
      title: "Cyber Neon Modern Couple",
      slug: "cyber-neon-modern-couple",
      description: "Konsep anti-mainstream futuristik bernuansa neon cyberpunk retro dengan elemen interaktif untuk pasangan muda pecinta teknologi.",
      category: "undangan",
      price: 170000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Glow Lighting & Neon Border Effect",
        "Mini Game Trivia Interaktif Pasangan",
        "Audio Visualizer Music Widget",
        "Filter Foto Kamera Instagram Langsung"
      ],
      status: "published"
    },

    // ==========================================
    // 2. LANDING PAGE (6 items)
    // ==========================================
    {
      title: "SaaS & Startup Modern Landing Page",
      slug: "saas-startup-modern-landing-page",
      description: "Landing page modern dengan performa ultra cepat untuk startup, bisnis lokal, maupun digital Anda. Dilengkapi dengan animasi halus dan integrasi analitik.",
      category: "landing-page",
      price: 1250000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
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
    },
    {
      title: "Strand Haven - Premium Hair Salon Landing Page",
      slug: "strand-haven-premium-hair-salon-landing-page",
      description: "Website landing page premium berorientasi estetika tinggi untuk salon kecantikan dan perawatan rambut. Dirancang dengan perpaduan warna kontras modern dan kalender booking.",
      category: "landing-page",
      price: 1350000,
      demoUrl: "https://salon-web-y5av.vercel.app",
      thumbnailUrl: "https://plus.unsplash.com/premium_photo-1705009607254-5618bb0d0c35?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://plus.unsplash.com/premium_photo-1705009607254-5618bb0d0c35?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1521590832167-7bfcbaa6362d?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Desain Layout Asimetris Modern & Elegan",
        "Section Filosofi & Galeri Grid Estetik",
        "Parallax Image Effect pada Section Portfolio",
        "Widget Kalender & Jam Operasional Interaktif",
        "Integrasi Video Interior & Testimonial"
      ],
      status: "published"
    },
    {
      title: "Goldex - Men's Haircut World & Barber Landing Page",
      slug: "goldex-mens-haircut-world-barber-landing-page",
      description: "Website landing page premium bernuansa retro-modern maskulin untuk barbershop dan salon pria. Dilengkapi layout asimetris panel bento grid dan aksen neon lime.",
      category: "landing-page",
      price: 1450000,
      demoUrl: "https://salon-web-guqv.vercel.app",
      thumbnailUrl: "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Aksen Warna Retro Neon Lime & Dark Panel",
        "Dekorasi Animasi Star Burst Interaktif",
        "Interactive Barbershop Stats & Services Row",
        "FAQ Accordion Interaktif & Terintegrasi",
        "Sidebar Widget Jam Buka & Galeri Produk"
      ],
      status: "published"
    },
    {
      title: "Portacaba - Premium Coffee & Roastery Landing Page",
      slug: "portacaba-premium-coffee-roastery-landing-page",
      description: "Website landing page neo-brutalisme interaktif untuk cafe dan roastery. Dilengkapi filter menu, floating cart WhatsApp, dan polaroid image stack.",
      category: "landing-page",
      price: 1400000,
      demoUrl: "https://restaurant-web-uuym.vercel.app/",
      thumbnailUrl: "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1507133750040-4a8f57021571?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Desain Retro Neo-Brutalisme yang Unik",
        "Filter Menu Interaktif Dinamis",
        "Floating Cart Bar Realtime",
        "Integrasi Pesanan Meja via WhatsApp",
        "Polaroid Image Hover Stack Effect"
      ],
      status: "published"
    },
    {
      title: "FitPulse - Fitness Club & Personal Trainer Landing Page",
      slug: "fitpulse-fitness-club-personal-trainer-landing",
      description: "Landing page berenergi tinggi untuk gym, pusat kebugaran, dan trainer pribadi dengan kalkulator BMI interaktif dan paket membership.",
      category: "landing-page",
      price: 1300000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Kalkulator BMI & Kalori Interaktif",
        "Tabel Perbandingan Harga Paket Membership",
        "Jadwal Kelas Mingguan Interaktif",
        "Integrasi Booking Trial Class via WA"
      ],
      status: "published"
    },
    {
      title: "FinFlow - Modern Fintech & Crypto App Showcase",
      slug: "finflow-modern-fintech-crypto-app-showcase",
      description: "Landing page konversi tinggi untuk aplikasi keuangan, dompet digital, dan trading dengan animasi 3D mockup dan live fee comparison.",
      category: "landing-page",
      price: 1600000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Mockup 3D Glassmorphism Dinamis",
        "Section Fitur Keamanan Bank-Grade",
        "Download App Store & Google Play CTA Bar",
        "Testimoni Pengguna & Integrasi Trustpilot"
      ],
      status: "published"
    },

    // ==========================================
    // 3. COMPANY PROFILE (5 items)
    // ==========================================
    {
      title: "Cielia - Premium Salon & Hairstyling Website",
      slug: "cielia-premium-salon-hairstyling-website",
      description: "Website company profile premium untuk salon kecantikan dan studio profesional. Menampilkan split-screen mewah, transisi paralaks, dan animasi GSAP.",
      category: "company-profile",
      price: 1500000,
      demoUrl: "https://salon-web-fnnp.vercel.app",
      thumbnailUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1605497788044-5a32c7078486?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Desain Split-Screen Mewah",
        "Animasi Interaktif GSAP & ScrollTrigger",
        "Smooth Scrolling Lenis",
        "Integrasi Feed Instagram & Kontak Cepat"
      ],
      status: "published"
    },
    {
      title: "Arkana Architecture & Interior Design Studio",
      slug: "arkana-architecture-interior-design-studio",
      description: "Company profile arsitektur modern berestetika tinggi dengan galeri proyek multi-kategori, slider denah 3D, dan formulir konsultasi.",
      category: "company-profile",
      price: 1750000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Galeri Proyek Full-Screen Grid & Filter",
        "Before / After Interactive Slider",
        "Profil Tim & Riwayat Penghargaan",
        "Formulir Konsultasi Desain Kustom"
      ],
      status: "published"
    },
    {
      title: "Logistika Cargo & Supply Chain Corporate",
      slug: "logistika-cargo-supply-chain-corporate",
      description: "Website perusahaan ekspedisi, kargo, dan logistik internasional dengan fitur pelacakan nomor resi terintegrasi dan kalkulator ongkir.",
      category: "company-profile",
      price: 1900000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Widget Cek Resi & Status Pengiriman",
        "Kalkulator Estimasi Tarif Kargo",
        "Jaringan Cabang Seluruh Indonesia",
        "Dokumen Legalitas & Sertifikasi ISO"
      ],
      status: "published"
    },
    {
      title: "Vanguard Law Firm & Legal Advisors",
      slug: "vanguard-law-firm-legal-advisors",
      description: "Website firma hukum bereputasi tinggi dengan tampilan korporat kredibel, profil advokat tersertifikasi, dan sistem janji temu online.",
      category: "company-profile",
      price: 1800000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Direktori Bidang Praktik Hukum",
        "Profil Partner & Rekam Jejak Kasus",
        "Sistem Penjadwalan Konsultasi Rahasia",
        "Publikasi Artikel Opini & Insight Hukum"
      ],
      status: "published"
    },
    {
      title: "Solaris Green Energy & Sustainability",
      slug: "solaris-green-energy-sustainability",
      description: "Company profile perusahaan energi terbarukan dan panel surya dengan kalkulator penghematan listrik dan visual interaktif.",
      category: "company-profile",
      price: 1700000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1509391365360-2e959784a276?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Kalkulator Estimasi Hemat Tagihan PLN",
        "Infografis Dampak Lingkungan & Emisi Karbon",
        "Katalog Produk Panel Surya & Baterai",
        "Studi Kasus Proyek Komersial & Residensial"
      ],
      status: "published"
    },

    // ==========================================
    // 4. TOKO ONLINE (4 items)
    // ==========================================
    {
      title: "Velvet Urban Streetwear Store",
      slug: "velvet-urban-streetwear-store",
      description: "Platform e-commerce pakaian kasual streetwear modern dengan filter ukuran/warna, cart cepat, dan checkout WhatsApp otomatis.",
      category: "toko-online",
      price: 2100000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=800&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Katalog Produk dengan Filter Varian & Ukuran",
        "Keranjang Belanja Realtime & Quick View",
        "Checkout Otomatis via WhatsApp & Payment Gateway",
        "Manajemen Diskon & Flash Sale Timer"
      ],
      status: "published"
    },
    {
      title: "Kencana Jewelry Artisan Boutique",
      slug: "kencana-jewelry-artisan-boutique",
      description: "Toko online perhiasan emas dan berlian premium dengan tampilan visual mewah, zoom detail mikro 360°, dan kurasi koleksi.",
      category: "toko-online",
      price: 2300000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Tampilan Galeri High-Resolution Zoom",
        "Sertifikat Keaslian & Info Karat Terintegrasi",
        "Panduan Ukuran Cincin Interaktif",
        "Opsi Gift Box & Kartu Ucapan Kustom"
      ],
      status: "published"
    },
    {
      title: "Organika Fresh Farm & Organic Groceries",
      slug: "organika-fresh-farm-organic-groceries",
      description: "E-commerce belanja bahan makanan organik, sayur segar, dan buah langsung dari petani lokal dengan fitur langganan mingguan.",
      category: "toko-online",
      price: 1950000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Pilihan Pengiriman Sameday / Slot Jam Pengantaran",
        "Paket Langganan Sayur Mingguan",
        "Badge Sertifikasi Bebas Pestisida",
        "Hitung Total Belanja Otomatis & Ongkir Wilayah"
      ],
      status: "published"
    },
    {
      title: "Optima Tech Gadget & Accessories",
      slug: "optima-tech-gadget-accessories",
      description: "Toko online gadget, aksesoris komputer, dan audio gear dengan perbandingan spesifikasi produk berdampingan dan review pembeli.",
      category: "toko-online",
      price: 2200000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Fitur Compare Spesifikasi Produk",
        "Status Stok Barang Realtime",
        "Garansi Resmi & Klaim Layanan Purna Jual",
        "Dukungan Pembayaran QRIS, Virtual Account, & Kartu Kredit"
      ],
      status: "published"
    },

    // ==========================================
    // 5. SISTEM & BACKOFFICE (4 items)
    // ==========================================
    {
      title: "OmniPOS - Multi-Branch Inventory & Cashier",
      slug: "omnipos-multi-branch-inventory-cashier",
      description: "Sistem aplikasi kasir (Point of Sale) dan manajemen stok gudang multi-cabang berbasis web cloud dengan laporan keuangan otomatis.",
      category: "sistem-backoffice",
      price: 3500000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Dashboard Analitik Penjualan & Laba Rugi",
        "Manajemen Multi Gudang & Transfer Stok",
        "Hak Akses Kasir, Manajer, dan Owner",
        "Cetak Struk Thermal & Integrasi Barcode Scanner"
      ],
      status: "published"
    },
    {
      title: "ClinicaPro - Hospital & Patient Management",
      slug: "clinicapro-hospital-patient-management",
      description: "Aplikasi backoffice klinik kesehatan, rekam medis elektronik (RME), antrean pasien digital, dan manajemen resep obat.",
      category: "sistem-backoffice",
      price: 4200000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Rekam Medis Elektronik (RME) Standar Kemenkes",
        "Sistem Nomor Antrean Poliklinik & Display TV",
        "Apotek & Peringatan Stok Kedaluwarsa Obat",
        "Integrasi BPJS & Cetak Kwitansi Tagihan"
      ],
      status: "published"
    },
    {
      title: "HR Pulse - Enterprise Attendance & Payroll",
      slug: "hr-pulse-enterprise-attendance-payroll",
      description: "Sistem informasi manajemen SDM (HRIS) terintegrasi dengan absensi geolocation, persetujuan cuti online, dan slip gaji otomatis.",
      category: "sistem-backoffice",
      price: 3800000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Perhitungan Payroll Otomatis (PPh 21, BPJS, Lembur)",
        "Absensi Selfie & GPS Geofencing Mobile",
        "Portal Karyawan Pengajuan Cuti & Reimbursement",
        "Penilaian Kinerja KPI & OKR Perusahaan"
      ],
      status: "published"
    },
    {
      title: "FleetTrack - Logistics & Vehicle Telematics",
      slug: "fleettrack-logistics-vehicle-telematics",
      description: "Dashboard pemantauan armada logistik real-time dengan GPS tracking, pemakaian bahan bakar, jadwal servis, dan rute driver.",
      category: "sistem-backoffice",
      price: 4500000,
      demoUrl: "https://nextjs.org",
      thumbnailUrl: "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=800&auto=format&fit=crop",
      images: [
        "https://images.unsplash.com/photo-1508974239320-0a029497e820?q=80&w=800&auto=format&fit=crop"
      ],
      features: [
        "Pelacakan GPS Armada Truk Live Map",
        "Monitoring Konsumsi BBM & Efisiensi Driver",
        "Pengingat Pemeliharaan Rutin & Pajak Kendaraan",
        "Dispatching Penugasan Pengiriman Cepat"
      ],
      status: "published"
    },
  ];

  for (const p of productsData) {
    await prisma.product.create({
      data: p,
    });
  }

  console.log(`Successfully seeded ${productsData.length} products!`);
}

main()
  .catch((e) => {
    console.error("Error seeding database: ", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
