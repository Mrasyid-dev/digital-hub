# ROADMAP: EKSPANSI MULTI-BAHASA (FASE 2)

Dokumen ini berisi panduan dan arsitektur teknis untuk mengimplementasikan fitur multi-bahasa (Bilingual: Indonesia & Inggris) pada website **Digital Hub** tanpa merusak skor SEO yang sudah ada.

---

## 1. TUJUAN & TARGET PASAR
* **Bahasa Indonesia (`/` atau `/id`)**: Menargetkan pasar lokal UMKM, wedding invitation, dan jasa web development di Indonesia (konversi utama via WhatsApp).
* **Bahasa Inggris (`/en`)**: Menargetkan pasar global untuk penjualan template website, source code, dan jasa *remote web development / international freelancing* (konversi via Stripe / PayPal / Email inquiry).

---

## 2. ARSITEKTUR URL & ROUTING (NEXT.JS APP ROUTER)

Hindari pergantian teks via *state / localStorage* di URL yang sama. Gunakan struktur routing folder terpisah:

```
app/
├── [lang]/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── website/
│   ├── custom/
│   └── works/
├── sitemap.ts
└── robots.ts
```

Atau menggunakan sub-path `/en` terpisah untuk halaman yang ditargetkan ke pasar internasional.

---

## 3. IMPLEMENTASI INTERNATIONAL TECHNICAL SEO (`hreflang`)

Setiap halaman wajib memiliki tag `alternates` di metadata Next.js agar Google memahami relasi antar bahasa dan tidak menganggapnya sebagai konten duplikat (*duplicate content*):

```typescript
// Contoh implementasi di metadata Next.js
export const metadata: Metadata = {
  title: "...",
  description: "...",
  alternates: {
    canonical: "https://digitalhub.id/website",
    languages: {
      "id-ID": "https://digitalhub.id/website",
      "en-US": "https://digitalhub.id/en/website",
      "x-default": "https://digitalhub.id/website", // Fallback default
    },
  },
};
```

---

## 4. SISTEM DICTIONARY / TRANSLATION (i18n)

1. Buat folder kamus teks `dictionaries/id.json` dan `dictionaries/en.json`.
2. Gunakan Server Components untuk memuat dictionary secara instan tanpa membebani ukuran bundle JavaScript client-side:

```typescript
// lib/dictionary.ts
const dictionaries = {
  id: () => import("@/dictionaries/id.json").then((module) => module.default),
  en: () => import("@/dictionaries/en.json").then((module) => module.default),
};

export const getDictionary = async (locale: "id" | "en") => dictionaries[locale]();
```

---

## 5. UI LANGUAGE SWITCHER DI NAVBAR

Tombol switch bahasa di Header harus berupa elemen `<Link>` semantik:

```tsx
<div className="flex items-center gap-2 font-mono text-xs">
  <Link 
    href="/" 
    className={lang === "id" ? "font-bold text-emerald-400" : "text-gray-400"}
  >
    ID
  </Link>
  <span className="text-gray-600">/</span>
  <Link 
    href="/en" 
    className={lang === "en" ? "font-bold text-emerald-400" : "text-gray-400"}
  >
    EN
  </Link>
</div>
```

---

## 6. CHECKLIST PELUNCURAN FASE 2
- [ ] Daftarkan sitemap multi-bahasa ke Google Search Console.
- [ ] Pastikan mata uang di halaman `/en` mendukung USD ($) via Stripe/LemonSqueezy.
- [ ] Uji tag `hreflang` menggunakan *Google Rich Results Test* / *Ahrefs Webmaster Tools*.
