"use client";

import React, { useState, useEffect } from "react";
import { Settings, X } from "lucide-react";

export default function RetroSettings() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== "undefined") {
      const storedTheme = localStorage.getItem("retro-theme");
      return storedTheme === "dark" || !storedTheme;
    }
    return true;
  });
  const [isCrtOn, setIsCrtOn] = useState(() => {
    if (typeof window !== "undefined") {
      const storedCrt = localStorage.getItem("retro-crt");
      return storedCrt !== "off";
    }
    return true;
  });

  // Apply visual effects on preference change
  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }

    if (isCrtOn) {
      document.body.classList.add("crt-flicker");
      document.body.classList.remove("crt-disabled");
    } else {
      document.body.classList.remove("crt-flicker");
      document.body.classList.add("crt-disabled");
    }
  }, [isDark, isCrtOn]);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    localStorage.setItem("retro-theme", nextDark ? "dark" : "light");
    
    if (nextDark) {
      document.body.classList.add("dark-theme");
    } else {
      document.body.classList.remove("dark-theme");
    }
  };

  const toggleCrt = () => {
    const nextCrt = !isCrtOn;
    setIsCrtOn(nextCrt);
    localStorage.setItem("retro-crt", nextCrt ? "on" : "off");

    if (nextCrt) {
      document.body.classList.add("crt-flicker");
      document.body.classList.remove("crt-disabled");
    } else {
      document.body.classList.remove("crt-flicker");
      document.body.classList.add("crt-disabled");
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 font-mono select-none">
      {/* Floating Settings Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="p-3 bg-[#0b0518] hover:bg-[#160d29] text-emerald-400 hover:text-emerald-300 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all flex items-center justify-center cursor-pointer"
          title="Buka Pengaturan Retro"
        >
          <Settings className="w-5 h-5 animate-[spin_10s_linear_infinite]" />
        </button>
      )}

      {/* Retro JRPG Dialogue Settings Box */}
      {isOpen && (
        <div className="w-64 retro-dialog p-4 text-white relative">
          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-2.5 right-2.5 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <h3 className="text-xs font-pixel text-emerald-400 border-b border-white/20 pb-2 mb-4 tracking-wider">
            [ SETTING SYSTEM ]
          </h3>

          <div className="space-y-4">
            {/* Theme Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-pixel text-gray-300 uppercase">TEMA UTAMA:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => isDark && toggleTheme()}
                  className={`py-1.5 text-[8px] font-pixel border-2 border-black cursor-pointer ${
                    !isDark
                      ? "bg-emerald-600 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  LIGHT
                </button>
                <button
                  onClick={() => !isDark && toggleTheme()}
                  className={`py-1.5 text-[8px] font-pixel border-2 border-black cursor-pointer ${
                    isDark
                      ? "bg-emerald-600 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  DARK
                </button>
              </div>
            </div>

            {/* CRT Filter Toggle */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[9px] font-pixel text-gray-300 uppercase">LAYAR CRT:</span>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => !isCrtOn && toggleCrt()}
                  className={`py-1.5 text-[8px] font-pixel border-2 border-black cursor-pointer ${
                    isCrtOn
                      ? "bg-emerald-600 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  ON
                </button>
                <button
                  onClick={() => isCrtOn && toggleCrt()}
                  className={`py-1.5 text-[8px] font-pixel border-2 border-black cursor-pointer ${
                    !isCrtOn
                      ? "bg-emerald-600 text-white shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-white/5 text-gray-400 hover:text-white"
                  }`}
                >
                  OFF
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full mt-4 py-2 bg-white/10 hover:bg-emerald-600 text-white text-[8px] font-pixel border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all uppercase cursor-pointer"
          >
            [ KEMBALI ]
          </button>
        </div>
      )}
    </div>
  );
}
