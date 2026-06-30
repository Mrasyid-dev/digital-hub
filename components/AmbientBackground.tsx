"use client";

import React from "react";
import VoxelLandscape from "./VoxelLandscape";

interface AmbientBackgroundProps {
  type?: "hero" | "contact";
}

export default function AmbientBackground({ type = "hero" }: AmbientBackgroundProps) {
  if (type === "contact") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* 3D Pixel Voxel Midnight Nature Landscape */}
        <VoxelLandscape mode="night" />
        
        {/* Deep dark overlay to ensure the contact form is highly legible */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#07030e]/45 via-[#07030e]/20 to-[#07030e]/65 pointer-events-none" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* 3D Pixel Voxel Sunset Nature Landscape */}
      <VoxelLandscape />

      {/* Deep slate-navy gradient overlay to ensure hero text is highly legible against the bright daylight canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b]/70 via-[#070e1b]/30 to-transparent md:from-[#070e1b]/80 md:via-[#070e1b]/40 pointer-events-none" />

      {/* Smooth bottom transition blending with the page background */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#f9f9fb] via-[#f9f9fb]/30 to-transparent pointer-events-none" />
    </div>
  );
}
