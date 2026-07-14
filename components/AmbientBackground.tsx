"use client";

import React from "react";
import VoxelLandscape from "./VoxelLandscape";

interface AmbientBackgroundProps {
  type?: "hero" | "contact";
}

export default function AmbientBackground({ type = "hero" }: AmbientBackgroundProps) {
  const [isDark, setIsDark] = React.useState(true); // Default to dark JRPG theme

  React.useEffect(() => {
    // Sync theme on mount
    setIsDark(document.body.classList.contains("dark-theme"));

    const observer = new MutationObserver(() => {
      setIsDark(document.body.classList.contains("dark-theme"));
    });

    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  if (type === "contact") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
        {/* 3D Pixel Voxel Landscape: Day in Light theme, Night in Dark theme */}
        <VoxelLandscape mode={isDark ? "night" : "day"} />
        
        {/* Color overlay to ensure the contact form is highly legible */}
        <div className={`absolute inset-0 bg-gradient-to-b pointer-events-none ${
          isDark 
            ? "from-[#07030e]/45 via-[#07030e]/20 to-[#07030e]/65"
            : "from-[#f9f9fb]/45 via-[#f9f9fb]/20 to-[#f9f9fb]/65"
        }`} />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
      {/* 3D Pixel Voxel Landscape: Day in Light theme, Sunset in Dark theme */}
      <VoxelLandscape mode={isDark ? "sunset" : "day"} />

      {/* Deep slate-navy gradient overlay to ensure hero text is highly legible against the bright daylight canvas */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#070e1b]/70 via-[#070e1b]/30 to-transparent md:from-[#070e1b]/80 md:via-[#070e1b]/40 pointer-events-none" />

      {/* Smooth bottom transition blending with the page background */}
      <div className={`absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t via-transparent to-transparent pointer-events-none ${
        isDark ? "from-[#07030e]" : "from-[#f9f9fb]"
      }`} />
    </div>
  );
}
