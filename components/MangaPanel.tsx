"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface MangaPanelProps {
  children: ReactNode;
  className?: string;
  /** Diagonal cut direction */
  cut?: "left" | "right" | "none";
  /** Accent border color */
  accent?: string;
  /** Delay for stagger */
  delay?: number;
  /** Whether to fill with accent background */
  filled?: boolean;
}

const cutPaths = {
  left: "polygon(0 0, 100% 0, 100% 100%, 3% 100%)",
  right: "polygon(0 0, 97% 0, 100% 100%, 0 100%)",
  none: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
};

export default function MangaPanel({
  children,
  className = "",
  cut = "none",
  accent = "#f97316",
  delay = 0,
  filled = false,
}: MangaPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: cut === "left" ? -40 : cut === "right" ? 40 : 0, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative ${className}`}
      style={{ clipPath: cutPaths[cut] }}
    >
      {/* Accent border line */}
      <div
        className="absolute top-0 left-0 bottom-0 w-1"
        style={{ background: accent }}
      />
      <div
        className={`relative z-10 ${filled ? "p-6 md:p-8" : "p-4 md:p-6"}`}
        style={{
          background: filled
            ? `linear-gradient(135deg, ${accent}18, ${accent}08)`
            : "rgba(10, 10, 15, 0.9)",
          border: `1px solid ${accent}30`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/** Diagonal divider line between sections */
export function DiagonalDivider({
  color = "#f97316",
  direction = "left",
}: {
  color?: string;
  direction?: "left" | "right";
}) {
  return (
    <motion.div
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-16 my-4 overflow-hidden"
      style={{
        transformOrigin: direction === "left" ? "left center" : "right center",
      }}
    >
      <svg
        viewBox="0 0 1440 64"
        preserveAspectRatio="none"
        className="w-full h-full"
      >
        <polygon
          points={
            direction === "left"
              ? "0,64 1440,0 1440,8 0,64"
              : "0,0 1440,64 1440,64 0,8"
          }
          fill={color}
          opacity="0.8"
        />
      </svg>
    </motion.div>
  );
}
