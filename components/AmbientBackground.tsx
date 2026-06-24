"use client";

import React from "react";

interface AmbientBackgroundProps {
  type?: "hero" | "contact";
}

export default function AmbientBackground({ type = "hero" }: AmbientBackgroundProps) {
  if (type === "contact") {
    return (
      <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-gray-100">
        {/* Illustrative Contact Section static background image */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/contact_bg.png"
          className="absolute inset-0 w-full h-full object-cover"
          alt="Contact Background"
        />
        
        {/* Soft overlay to blend and increase readability of the contact form */}
        <div className="absolute inset-0 bg-white/20 backdrop-blur-[1px]" />
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-[#bae6fd]">
      {/* Loopable Hero Background Video */}
      <video
        src="/videos/hero.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-90 scale-[1.01]"
      />

      {/* Left gradient overlay for text readability, right is transparent to show the beautiful trees/illustration */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/25 to-transparent md:from-black/50 md:via-black/20" />

      {/* Smooth bottom transition to the content section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#f9f9fb] to-transparent" />
    </div>
  );
}
