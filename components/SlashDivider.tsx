"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

type Variant = "orange" | "blue" | "red" | "gold";

const palette: Record<Variant, { primary: string; glow: string }> = {
  orange: { primary: "#e87b35", glow: "rgba(255,145,0,0.4)" },
  blue: { primary: "#42A5F5", glow: "rgba(66,165,245,0.4)" },
  red: { primary: "#dc2626", glow: "rgba(220,38,38,0.4)" },
  gold: { primary: "#d4a04a", glow: "rgba(212,160,74,0.4)" },
};

interface Props {
  variant?: Variant;
  kanji?: string;
  label?: string;
}

export default function SlashDivider({ variant = "orange", kanji, label }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });
  const { primary, glow } = palette[variant];

  return (
    <div
      ref={ref}
      className="relative h-24 md:h-32 overflow-hidden flex items-center justify-center select-none"
      style={{ background: "var(--shinobi-ink)" }}
    >
      {/* Slash lines — three diagonal cuts */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={
            inView
              ? { scaleX: 1, opacity: [0, 1, 0.6] }
              : { scaleX: 0, opacity: 0 }
          }
          transition={{
            duration: 0.45,
            delay: i * 0.08,
            ease,
          }}
          className="absolute h-[2px]"
          style={{
            width: `${55 + i * 15}%`,
            background: `linear-gradient(90deg, transparent, ${primary}, transparent)`,
            boxShadow: `0 0 12px ${glow}`,
            transform: `rotate(${-3 + i * 1.5}deg) translateY(${-6 + i * 6}px)`,
            transformOrigin: "left center",
          }}
        />
      ))}

      {/* Speed spark particles */}
      {inView &&
        [0, 1, 2, 3, 4].map((i) => (
          <motion.div
            key={`spark-${i}`}
            initial={{ x: "-10%", y: 0, opacity: 0, scale: 0 }}
            animate={{
              x: ["0%", `${60 + i * 10}%`],
              y: [0, (i % 2 === 0 ? -1 : 1) * (8 + i * 4)],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 0.5,
              delay: 0.1 + i * 0.06,
              ease: "easeOut",
            }}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: primary,
              boxShadow: `0 0 6px ${glow}`,
            }}
          />
        ))}

      {/* Flash overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: [0, 0.08, 0] } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.05, ease }}
        className="absolute inset-0"
        style={{ background: primary }}
      />

      {/* Center kanji / label */}
      {(kanji || label) && (
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.35, ease }}
          className="relative z-10 flex items-center gap-3"
        >
          {kanji && (
            <span
              className="text-2xl md:text-3xl font-bold"
              style={{
                fontFamily: "var(--font-display)",
                color: primary,
                opacity: 0.3,
                textShadow: `0 0 20px ${glow}`,
              }}
            >
              {kanji}
            </span>
          )}
          {label && (
            <span
              className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em]"
              style={{ color: `${primary}60` }}
            >
              {label}
            </span>
          )}
        </motion.div>
      )}

      {/* Subtle horizontal rule underneath */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
        className="absolute bottom-0 left-0 right-0 h-[1px]"
        style={{
          background: `linear-gradient(90deg, transparent, rgba(255,255,255,0.04), transparent)`,
          transformOrigin: "center",
        }}
      />
    </div>
  );
}
