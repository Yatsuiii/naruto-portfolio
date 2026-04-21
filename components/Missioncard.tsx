"use client";
import { motion } from "framer-motion";
import { Project } from "@/data/projects";

const rankAccent: Record<string, string> = {
  S: "#8b1a1a",
  A: "#e87b35",
  B: "#2d5a8e",
  C: "#4a4a4a",
};

export default function MissionCard({
  title,
  description,
  tags,
  link,
  stars,
  rank,
  index = 0,
}: Project & { index?: number }) {
  const accent = rankAccent[rank];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 400, damping: 20 } }}
      className="relative flex flex-col gap-3 group cursor-pointer p-5 md:p-6"
      style={{
        background: "rgba(13,15,20,0.6)",
        backdropFilter: "blur(12px)",
        borderLeft: `3px solid ${accent}`,
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Hover highlight */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${accent}08, transparent)` }}
      />

      {/* Rank + stars */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <span className="text-xs font-black px-2 py-0.5" style={{ background: accent, color: rank === "A" || rank === "C" ? "#000" : "#fff" }}>
            {rank}
          </span>
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
            {rank}-Rank
          </span>
        </div>
        {stars !== undefined && (
          <div className="flex items-center gap-1 text-xs font-bold" style={{ color: "#d4a04a" }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            {stars}
          </div>
        )}
      </div>

      {/* Title */}
      <h2 className="text-base font-bold text-white group-hover:text-orange-300 transition-colors relative z-10"
        style={{ fontFamily: "var(--font-display)" }}>
        {title}
      </h2>

      {/* Description */}
      <p className="text-xs leading-relaxed relative z-10" style={{ color: "rgba(255,255,255,0.45)" }}>
        {description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-auto pt-2 relative z-10">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{ background: `${accent}15`, color: accent, border: `1px solid ${accent}25` }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Link */}
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider mt-1 relative z-10 transition-all duration-300 group-hover:gap-2.5"
          style={{ color: accent }}>
          VIEW
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M7 17L17 7M7 7h10v10" />
          </svg>
        </a>
      )}
    </motion.div>
  );
}
