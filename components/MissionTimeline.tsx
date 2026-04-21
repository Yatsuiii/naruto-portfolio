"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";
import type { Mission } from "@/data/experience";

const ease = [0.22, 1, 0.36, 1] as const;

const rankColor: Record<string, string> = {
  S: "#8b1a1a",
  A: "#e87b35",
  B: "#2d5a8e",
  C: "#666",
};

const rankGlow: Record<string, string> = {
  S: "rgba(220,38,38,0.15)",
  A: "rgba(255,145,0,0.12)",
  B: "rgba(59,130,246,0.1)",
  C: "rgba(100,100,100,0.08)",
};

function TimelineEntry({ mission, index }: { mission: Mission; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className="relative grid grid-cols-[1fr_auto_1fr] gap-4 md:gap-8">
      {/* Left content (desktop only) */}
      <div className={`hidden md:block ${isLeft ? "" : "invisible"}`}>
        {isLeft && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <EntryCard mission={mission} align="right" />
          </motion.div>
        )}
      </div>

      {/* Center spine node */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.05, type: "spring", stiffness: 300, damping: 15 }}
          className="relative z-10"
        >
          {/* Rank node */}
          <div
            className="w-11 h-11 flex items-center justify-center font-black text-sm"
            style={{
              background: rankColor[mission.rank],
              color: mission.rank === "A" ? "#000" : "#fff",
              transform: "skewX(-6deg)",
              boxShadow: `0 0 20px ${rankGlow[mission.rank]}, 0 0 40px ${rankGlow[mission.rank]}`,
            }}
          >
            <span style={{ transform: "skewX(6deg)" }}>{mission.rank}</span>
          </div>

          {/* Pulse ring */}
          <motion.div
            animate={{ scale: [1, 1.6, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0"
            style={{
              border: `2px solid ${rankColor[mission.rank]}`,
              transform: "skewX(-6deg)",
              pointerEvents: "none",
            }}
          />
        </motion.div>

        {/* Connecting line */}
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="w-[1px] flex-1 origin-top"
          style={{
            background: `linear-gradient(to bottom, ${rankColor[mission.rank]}40, rgba(255,255,255,0.06))`,
          }}
        />
      </div>

      {/* Right content (desktop only) */}
      <div className={`hidden md:block ${!isLeft ? "" : "invisible"}`}>
        {!isLeft && (
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1, ease }}
          >
            <EntryCard mission={mission} align="left" />
          </motion.div>
        )}
      </div>

      {/* Mobile: single card */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.1, ease }}
        className="col-start-1 col-end-4 md:hidden -mt-8 ml-16"
      >
        <EntryCard mission={mission} align="left" />
      </motion.div>
    </div>
  );
}

function EntryCard({ mission, align }: { mission: Mission; align: "left" | "right" }) {
  return (
    <div
      className="relative p-5 md:p-6 group"
      style={{
        background: "rgba(255,255,255,0.03)",
        borderLeft: align === "left" ? `3px solid ${rankColor[mission.rank]}` : "none",
        borderRight: align === "right" ? `3px solid ${rankColor[mission.rank]}` : "none",
        borderBottom: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: `linear-gradient(135deg, ${rankGlow[mission.rank]}, transparent)` }}
      />

      {/* Header: rank label + period */}
      <div className="flex items-center justify-between mb-3 relative z-10">
        <div className="flex items-center gap-2">
          <span
            className="text-[9px] font-black px-2 py-0.5 uppercase tracking-wider"
            style={{
              background: `${rankColor[mission.rank]}18`,
              color: rankColor[mission.rank],
              border: `1px solid ${rankColor[mission.rank]}30`,
            }}
          >
            {mission.rank}-RANK MISSION
          </span>
        </div>
        <span
          className="text-[10px] font-bold uppercase tracking-wider"
          style={{ color: "rgba(255,255,255,0.25)" }}
        >
          {mission.period}
        </span>
      </div>

      {/* Title */}
      <h3
        className="text-base md:text-lg font-bold text-white mb-1 relative z-10"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {mission.title}
      </h3>

      {/* Role + Org */}
      <p className="text-[11px] font-semibold mb-4 relative z-10" style={{ color: rankColor[mission.rank] }}>
        {mission.role} — {mission.organization}
      </p>

      {/* Objective */}
      <div className="mb-3 relative z-10">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full" style={{ background: "rgba(255,255,255,0.3)" }} />
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            OBJECTIVE
          </span>
        </div>
        <p className="text-xs leading-relaxed pl-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          {mission.objective}
        </p>
      </div>

      {/* Outcome */}
      <div className="mb-4 relative z-10">
        <div className="flex items-center gap-1.5 mb-1">
          <div className="w-1 h-1 rounded-full" style={{ background: "#4CAF50" }} />
          <span
            className="text-[9px] font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(76,175,80,0.5)" }}
          >
            OUTCOME
          </span>
        </div>
        <p className="text-xs leading-relaxed pl-3" style={{ color: "rgba(255,255,255,0.5)" }}>
          {mission.outcome}
        </p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 relative z-10">
        {mission.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-bold px-2 py-0.5 uppercase tracking-wider"
            style={{
              background: "rgba(255,255,255,0.04)",
              color: "rgba(255,255,255,0.3)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Status stamp */}
      <div
        className="absolute top-4 right-4 text-[8px] font-black uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ color: "#4CAF50" }}
      >
        COMPLETE ✓
      </div>
    </div>
  );
}

export default function MissionTimeline({ missions }: { missions: Mission[] }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative min-h-screen py-20 md:py-28 overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image src="/bg/timeline-rasengan.webp" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,15,20,0.93) 0%, rgba(21,27,46,0.9) 50%, rgba(13,15,20,0.93) 100%)",
        }}
      />

      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.015] z-[1]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,145,0,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease }}
          className="mb-14 md:mb-20"
        >
          <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#e87b35" }}>
            経験記録 — EXPERIENCE LOG
          </span>
          <h2 className="text-impact text-3xl md:text-5xl text-white mt-2">
            MISSION <span className="text-brush" style={{ color: "#e87b35" }}>Timeline</span>
          </h2>
          <p className="text-sm mt-3 max-w-lg" style={{ color: "rgba(255,255,255,0.4)" }}>
            A shinobi is defined by the missions they complete. Each entry below is a real objective — ranked by complexity and impact.
          </p>

          {/* Rank legend */}
          <div className="flex items-center gap-4 mt-5">
            {(["S", "A", "B"] as const).map((r) => (
              <div key={r} className="flex items-center gap-1.5">
                <span
                  className="text-[9px] font-black px-1.5 py-0.5"
                  style={{ background: rankColor[r], color: r === "A" ? "#000" : "#fff" }}
                >
                  {r}
                </span>
                <span className="text-[9px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                  {r === "S" ? "Legendary" : r === "A" ? "High Impact" : "Standard"}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Central spine line (desktop) */}
          <div
            className="absolute left-1/2 top-0 bottom-0 w-[1px] -translate-x-1/2 hidden md:block"
            style={{
              background: "linear-gradient(to bottom, transparent, rgba(255,255,255,0.08) 10%, rgba(255,255,255,0.08) 90%, transparent)",
            }}
          />

          {/* Entries */}
          <div className="space-y-6 md:space-y-0">
            {missions.map((mission, i) => (
              <TimelineEntry key={mission.title} mission={mission} index={i} />
            ))}
          </div>

          {/* End node */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex justify-center mt-8"
          >
            <div className="flex flex-col items-center gap-2">
              <div
                className="w-3 h-3 rotate-45"
                style={{ background: "rgba(255,145,0,0.3)", border: "1px solid rgba(255,145,0,0.2)" }}
              />
              <span
                className="text-[9px] font-bold uppercase tracking-[0.3em]"
                style={{ color: "rgba(255,255,255,0.15)" }}
              >
                MORE MISSIONS INCOMING…
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
