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
        return "max-w-[375px] border-[12px] border-gray-800 rounded-[36px] shadow-2xl";
      case "tablet":
        return "max-w-[768px] border-[8px] border-gray-800 rounded-[20px] shadow-xl";
      case "desktop":
      default:
        return "w-full border-2 border-white/10 rounded-xl shadow-lg";
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* Toolbar */}
      <div className="w-full max-w-5xl glass-panel border border-white/10 rounded-xl px-4 py-3 mb-6 flex flex-wrap items-center justify-between gap-4">
        {/* Device Controls */}
        <div className="flex items-center gap-1 bg-white/5 p-1 rounded-lg border border-white/5">
          <button
            onClick={() => setDeviceMode("desktop")}
            className={`p-2 rounded-md flex items-center gap-1.5 text-xs font-semibold transition-all ${
              deviceMode === "desktop"
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-cyan-500/10"
                : "text-gray-400 hover:text-white"
            }`}
            title="Desktop Mode"
          >
            <Monitor className="w-4 h-4" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => setDeviceMode("tablet")}
            className={`p-2 rounded-md flex items-center gap-1.5 text-xs font-semibold transition-all ${
              deviceMode === "tablet"
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-cyan-500/10"
                : "text-gray-400 hover:text-white"
            }`}
            title="Tablet Mode"
          >
            <Tablet className="w-4 h-4" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => setDeviceMode("mobile")}
            className={`p-2 rounded-md flex items-center gap-1.5 text-xs font-semibold transition-all ${
              deviceMode === "mobile"
                ? "bg-gradient-to-r from-violet-600 to-cyan-500 text-white shadow-md shadow-cyan-500/10"
                : "text-gray-400 hover:text-white"
            }`}
            title="Mobile Mode"
          >
            <Smartphone className="w-4 h-4" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>

        {/* URL Bar & Actions */}
        <div className="flex-grow flex items-center max-w-md bg-black/40 border border-white/5 rounded-lg px-3 py-1.5 text-xs text-gray-400 truncate">
          <span className="text-cyan-400 mr-1 select-none">https://</span>
          <span className="truncate">{demoUrl.replace(/^https?:\/\//, "")}</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleRefresh}
            className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
            title="Refresh Demo"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 text-white hover:opacity-90 flex items-center gap-1 text-xs font-semibold transition-opacity"
            title="Open in new tab"
          >
            <span className="hidden sm:inline">Buka Tab Baru</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Frame Container */}
      <div className="w-full flex justify-center py-4 bg-black/20 rounded-2xl border border-white/5 p-4 relative overflow-hidden">
        {/* Decorative Grid background inside frame viewport */}
        <div className="absolute inset-0 grid-glow-background opacity-20 pointer-events-none" />

        <div
          className={`w-full h-[580px] overflow-hidden iframe-wrapper bg-white transition-all duration-500 ease-in-out relative ${getWidthClass()}`}
        >
          {deviceMode === "mobile" && (
            /* Mockup Speaker and Home Button elements */
            <>
              <div className="absolute top-[-10px] left-1/2 transform -translate-x-1/2 w-32 h-4 bg-gray-800 rounded-b-md z-20 flex justify-center items-center">
                <div className="w-12 h-1 bg-gray-600 rounded-full" />
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
