"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export default function ScrollReveal({ children, delay = 0, direction = "up" }: ScrollRevealProps) {
  const getInitialY = () => {
    if (direction === "up") return 20;
    if (direction === "down") return -20;
    return 0;
  };

  const getInitialX = () => {
    if (direction === "left") return 20;
    if (direction === "right") return -20;
    return 0;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: getInitialY(), x: getInitialX() }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.7,
        delay: delay,
        ease: [0.215, 0.610, 0.355, 1.000], // cubic-bezier easeOutCubic
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
}
