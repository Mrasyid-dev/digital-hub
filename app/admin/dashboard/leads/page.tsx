import React from "react";
import { prisma } from "@/lib/prisma";
import LeadsList from "./LeadsList";

export const dynamic = "force-dynamic";

export default async function AdminLeadsPage() {
  // Query all leads ordered by latest
  const leads = await prisma.lead.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight">INBOX LEADS / INQUIRIES</h1>
        <p className="text-xs text-gray-400">
          Daftar pesan masuk dan kuesioner pengajuan project custom dari calon klien Anda.
        </p>
      </div>

      <LeadsList initialLeads={leads} />
    </div>
  );
}
