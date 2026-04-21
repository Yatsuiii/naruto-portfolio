"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Skill {
  name: string;
  level: number;
  element: string;
  description: string;
  jutsu: string;
}

const elementColors: Record<string, string> = {
  Fire: "#f97316",
  Wind: "#a3e635",
  Lightning: "#facc15",
  Water: "#3b82f6",
  Earth: "#a78bfa",
};

const elementSymbols: Record<string, string> = {
  Fire: "火",
  Wind: "風",
  Lightning: "雷",
  Water: "水",
  Earth: "土",
};

export default function InteractiveSkillCard({
  skill,
  index,
}: {
  skill: Skill;
  index: number;
}) {
  const [expanded, setExpanded] = useState(false);
  const [charged, setCharged] = useState(false);
  const color = elementColors[skill.element];
  const symbol = elementSymbols[skill.element];

  return (
    <motion.div
      initial={{ opacity: 0, x: -40, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: "easeOut" }}
      onClick={() => setExpanded(!expanded)}
      onMouseEnter={() => setCharged(true)}
      onMouseLeave={() => setCharged(false)}
      whileHover={{ scale: 1.01 }}
      className="relative cursor-pointer group rounded-2xl p-5 transition-colors duration-500"
      style={{
        background: expanded
          ? `linear-gradient(135deg, ${color}10, transparent)`
          : "rgba(255,255,255,0.02)",
        border: `1px solid ${
          expanded ? `${color}30` : "rgba(255,255,255,0.04)"
        }`,
        transition: "border-color 0.4s, background 0.4s",
      }}
    >
      {/* Charged glow — enhanced with color-matched shadow */}
      <AnimatePresence>
        {charged && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="absolute inset-0 rounded-2xl pointer-events-none"
            style={{
              boxShadow: `inset 0 0 40px ${color}0a, 0 0 25px ${color}08`,
              borderColor: `${color}20`,
            }}
          />
        )}
      </AnimatePresence>

      <div className="flex items-center gap-4 relative z-10">
        {/* Element symbol — spring shake on hover */}
        <motion.div
          animate={
            charged
              ? { rotate: [0, -8, 8, -4, 4, 0], scale: 1.15 }
              : { rotate: 0, scale: 1 }
          }
          transition={
            charged
              ? { rotate: { duration: 0.4 }, scale: { type: "spring", stiffness: 500, damping: 12 } }
              : { type: "spring", stiffness: 300, damping: 20 }
          }
          className="flex items-center justify-center w-12 h-12 rounded-xl text-lg font-bold flex-shrink-0"
          style={{
            background: `${color}15`,
            border: `1px solid ${color}25`,
            color,
            boxShadow: charged ? `0 0 16px ${color}20` : "none",
            transition: "box-shadow 0.3s",
          }}
        >
          {symbol}
        </motion.div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <span
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              {skill.name}
            </span>
            <div className="flex items-center gap-2">
              <motion.span
                animate={charged ? { scale: 1.08 } : { scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="text-xs px-2 py-0.5 rounded-md"
                style={{
                  background: `${color}12`,
                  color,
                  border: `1px solid ${color}20`,
                }}
              >
                {skill.element}
              </motion.span>
              <span
                className="text-xs tabular-nums font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {skill.level}%
              </span>
            </div>
          </div>

          {/* Bar */}
          <div
            className="h-2 rounded-full overflow-hidden"
            style={{ background: "rgba(255,255,255,0.05)" }}
          >
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{
                delay: 0.3 + index * 0.1,
                duration: 1,
                ease: "easeOut",
              }}
              className="h-full rounded-full relative overflow-hidden"
              style={{
                background: `linear-gradient(90deg, ${color}, ${color}aa)`,
                boxShadow: charged ? `0 0 8px ${color}40` : "none",
                transition: "box-shadow 0.3s",
              }}
            >
              <motion.div
                animate={charged ? { x: ["-100%", "100%"] } : {}}
                transition={{
                  duration: 0.8,
                  repeat: charged ? Infinity : 0,
                  ease: "easeInOut",
                }}
                className="absolute inset-0"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)",
                }}
              />
            </motion.div>
          </div>
        </div>

        {/* Expand arrow */}
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="text-xs flex-shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </motion.div>
      </div>

      {/* Expanded details */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ y: 0 }}
              transition={{ delay: 0.1, duration: 0.25 }}
              className="pt-4 pl-16 space-y-2 relative z-10"
            >
              <p className="text-sm" style={{ color: "var(--text-muted)" }}>
                {skill.description}
              </p>
              <p className="text-xs font-medium" style={{ color }}>
                <span style={{ opacity: 0.7 }}>Signature Jutsu:</span>{" "}
                {skill.jutsu}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
