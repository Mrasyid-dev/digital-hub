"use client";

import React, { useState } from "react";
import { Monitor, Tablet, Smartphone, ExternalLink, RefreshCw } from "lucide-react";

interface ShowcaseFrameProps {
  demoUrl: string;
  title: string;
}

type DeviceMode = "desktop" | "tablet" | "mobile";

export default function ShowcaseFrame({ demoUrl, title }: ShowcaseFrameProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [iframeKey, setIframeKey] = useState<number>(0);

  const handleRefresh = () => {
    setIframeKey((prev) => prev + 1);
  };

  // Dimensions based on selected device mode
  const getWidthClass = () => {
    switch (deviceMode) {
      case "mobile":
        return "max-w-[375px] border-[16px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
      case "tablet":
        return "max-w-[768px] border-[12px] border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
      case "desktop":
      default:
        return "w-full border-4 border-black rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
    }
  };
 
  return (
    <div className="w-full flex flex-col items-center font-mono">
      {/* Toolbar */}
      <div className="w-full max-w-5xl bg-[#111] border-4 border-black px-6 py-3.5 mb-6 flex flex-wrap items-center justify-between gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-white">
        {/* Device Controls */}
        <div className="flex items-center gap-1 bg-black p-1 border-2 border-black">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-2 flex items-center gap-1.5 text-[8px] font-pixel transition-all ${
              deviceMode === "desktop"
                ? "bg-emerald-600 text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-400 hover:text-white"
            }`}
            title="Desktop Mode"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-2 flex items-center gap-1.5 text-[8px] font-pixel transition-all ${
              deviceMode === "tablet"
                ? "bg-emerald-600 text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-400 hover:text-white"
            }`}
            title="Tablet Mode"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-2 flex items-center gap-1.5 text-[8px] font-pixel transition-all ${
              deviceMode === "mobile"
                ? "bg-emerald-600 text-white border-2 border-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                : "text-gray-400 hover:text-white"
            }`}
            title="Mobile Mode"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
 
        {/* URL Bar & Actions */}
        <div className="flex-grow flex items-center max-w-md bg-black border-2 border-black px-4 py-2 text-xs text-gray-300 tracking-wide truncate shadow-[inset_2px_2px_4px_rgba(0,0,0,0.8)]">
          <span className="text-cyan-400 mr-1 select-none">https://</span>
          <span className="truncate">{demoUrl.replace(/^https?:\/\//, "")}</span>
        </div>
 
        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 border-2 border-black bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:shadow-none transition-all"
            title="Refresh Demo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white text-[8px] font-pixel border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-[2px] active:translate-x-[2px] active:shadow-none transition-all flex items-center gap-1.5 uppercase"
            title="Open in new tab"
          >
            <span className="hidden sm:inline">Buka Tab Baru</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
 
      {/* Frame Container */}
      <div className="w-full flex justify-center py-4 bg-[#222] border-4 border-black p-4 relative overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
        {/* Decorative Grid background inside frame viewport */}
        <div className="absolute inset-0 grid-glow-background opacity-20 pointer-events-none" />
 
        <div
          className={`w-full h-[580px] overflow-hidden iframe-wrapper bg-white transition-all duration-300 ease-in-out relative ${getWidthClass()}`}
        >
          {deviceMode === "mobile" && (
            /* Mockup Retro Gameboy-like speaker bezel */
            <>
              <div className="absolute top-[-14px] left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black z-20 flex justify-center items-center">
                <div className="w-16 h-1.5 bg-gray-700" />
              </div>
            </>
          )}
 
          <iframe
            key={iframeKey}
            src={demoUrl}
            title={title}
            className="w-full h-full border-none bg-white"
            sandbox="allow-scripts allow-same-origin allow-forms"
          />
        </div>
      </div>
    </div>
  );
}
