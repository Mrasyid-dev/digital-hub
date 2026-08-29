import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Konsultasi & Jasa Pembuatan Custom Website",
  description:
    "Layanan konsultasi dan pengerjaan custom website profesional, landing page spesifik bisnis, integrasi backend, dan sistem web interaktif sesuai kebutuhan Anda.",
  alternates: {
    canonical: "/custom",
  },
};

export default function CustomLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
