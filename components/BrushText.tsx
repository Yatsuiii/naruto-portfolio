"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BrushTextProps {
  text: string;
  className?: string;
  /** Accent color for the brush stroke underline */
  accent?: string;
  /** Show brush stroke underline */
  stroke?: boolean;
  /** Delay before animation starts */
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function BrushText({
  text,
  className = "",
  accent = "#f97316",
  stroke = true,
  delay = 0,
  as: Tag = "h2",
}: BrushTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <div ref={ref} className={`relative inline-block ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20, skewX: -3 }}
        animate={inView ? { opacity: 1, y: 0, skewX: 0 } : {}}
        transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        <Tag
          className="font-black uppercase tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {text}
        </Tag>
      </motion.div>

      {/* Brush stroke underline */}
      {stroke && (
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.6, delay: delay + 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="absolute -bottom-1 left-0 right-0 h-1.5"
          style={{
            background: `linear-gradient(90deg, ${accent}, ${accent}80, transparent)`,
            transformOrigin: "left center",
          }}
        />
      )}
    </div>
  );
}

/** Large kanji watermark that slashes across the screen */
export function KanjiSlash({
  kanji,
  className = "",
}: {
  kanji: string;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -100, rotate: -8 }}
      whileInView={{ opacity: 0.04, x: 0, rotate: -5 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`absolute pointer-events-none select-none ${className}`}
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(15rem, 35vw, 30rem)",
        color: "#f97316",
        lineHeight: 1,
        zIndex: 0,
      }}
    >
      {kanji}
    </motion.div>
  );
}
