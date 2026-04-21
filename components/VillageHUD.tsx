"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

/* ── Parallax Background (local) ── */
function HUDBg() {
  return (
    <>
      <div className="absolute inset-0 z-0">
        <Image src="/bg/hud-field.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,15,20,0.92) 0%, rgba(21,27,46,0.88) 50%, rgba(13,15,20,0.92) 100%)",
        }}
      />
    </>
  );
}

const ease = [0.22, 1, 0.36, 1] as const;

interface Skill {
  name: string;
  level: number;
  kanji: string;
  element: string;
}

interface HUDProps {
  skills: Skill[];
}

/* ── Mini Chakra Bar for HUD ── */
function MiniChakraBar({ level, delay }: { level: number; delay: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="h-1.5 w-full rounded-full" style={{ background: "rgba(255,255,255,0.06)" }}>
      <motion.div
        initial={{ width: 0 }}
        animate={inView ? { width: `${level}%` } : { width: 0 }}
        transition={{ delay, duration: 1, ease: "easeOut" }}
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #1565C0, #4a8fd4, #64B5F6)",
          boxShadow: "0 0 6px rgba(66,165,245,0.4), 0 0 14px rgba(66,165,245,0.2)",
        }}
      />
    </div>
  );
}

export default function VillageHUD({ skills }: HUDProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      id="hud"
      className="relative min-h-screen py-6 px-4 md:px-8 lg:px-12 flex flex-col overflow-hidden"
    >
      <HUDBg />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px)",
        }}
      />

      {/* Section label */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, ease }}
        className="relative z-10 mb-4 md:mb-6"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-7 h-7 flex items-center justify-center text-xs font-bold"
            style={{ background: "#e87b35", color: "#000", transform: "skewX(-6deg)" }}
          >
            忍
          </div>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.3)" }}>
            VILLAGE DASHBOARD — ACTIVE STATUS
          </span>
        </div>
      </motion.div>

      {/* ═══ HUD GRID ═══ */}
      <div className="relative z-10 flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-4 md:gap-5 max-w-6xl mx-auto w-full">

        {/* ── LEFT PANEL: Chakra Stats ── */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          className="flex flex-col gap-3 order-2 lg:order-1"
        >
          {/* Panel header */}
          <div
            className="px-4 py-2.5 flex items-center gap-2"
            style={{ background: "rgba(66,165,245,0.08)", borderLeft: "2px solid rgba(66,165,245,0.4)" }}
          >
            <span className="text-base" style={{ fontFamily: "var(--font-display)", color: "#4a8fd4" }}>
              チャクラ
            </span>
            <span className="text-[9px] font-bold uppercase tracking-[0.2em]" style={{ color: "rgba(66,165,245,0.5)" }}>
              CHAKRA STATS
            </span>
          </div>

          {/* Skill bars */}
          <div
            className="flex-1 p-4 space-y-4"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            {skills.map((s, i) => (
              <div key={s.name}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-sm font-bold"
                      style={{ fontFamily: "var(--font-display)", color: "#4a8fd4" }}
                    >
                      {s.kanji}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                      {s.name}
                    </span>
                  </div>
                  <span
                    className="text-xs font-black tabular-nums"
                    style={{ color: "#4a8fd4", fontFamily: "var(--font-display)" }}
                  >
                    {s.level}
                  </span>
                </div>
                <MiniChakraBar level={s.level} delay={0.4 + i * 0.1} />
                <span className="text-[8px] uppercase tracking-wider mt-0.5 block" style={{ color: "rgba(66,165,245,0.35)" }}>
                  {s.element}
                </span>
              </div>
            ))}
          </div>

          {/* Nature type summary */}
          <div
            className="px-4 py-3 flex items-center justify-between"
            style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}
          >
            <span className="text-[9px] font-bold uppercase tracking-[0.15em]" style={{ color: "rgba(255,255,255,0.25)" }}>
              DOMINANT TYPE
            </span>
            <div className="flex items-center gap-1.5">
              <span className="text-sm" style={{ fontFamily: "var(--font-display)", color: "#e87b35" }}>火</span>
              <span className="text-[9px] font-bold" style={{ color: "#e87b35" }}>FIRE RELEASE</span>
            </div>
          </div>
        </motion.div>

        {/* ── CENTER: Character Avatar ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          className="flex flex-col items-center justify-center order-1 lg:order-2 py-6 lg:py-0"
        >
          {/* Avatar frame */}
          <div className="relative">
            {/* Outer ring glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 rounded-full opacity-20"
              style={{
                border: "1px dashed rgba(255,145,0,0.3)",
              }}
            />

            {/* Avatar container */}
            <div
              className="relative w-44 h-44 md:w-56 md:h-56 rounded-full overflow-hidden"
              style={{
                border: "3px solid rgba(255,145,0,0.4)",
                boxShadow: "0 0 30px rgba(255,145,0,0.15), inset 0 0 30px rgba(0,0,0,0.5)",
              }}
            >
              <Image
                src="/bg/portrait.jpg"
                alt="Shinobi Avatar"
                fill
                className="object-cover"
                sizes="224px"
              />
              {/* Bottom fade */}
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to top, rgba(10,10,15,0.6) 0%, transparent 50%)" }}
              />
            </div>

            {/* Rank badge on avatar */}
            <motion.div
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : {}}
              transition={{ delay: 0.8, type: "spring", stiffness: 300, damping: 15 }}
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-4 py-1.5 font-black text-xs uppercase tracking-wider"
              style={{
                background: "#e87b35",
                color: "#000",
                transform: "translateX(-50%) skewX(-6deg)",
              }}
            >
              JŌNIN
            </motion.div>
          </div>

          {/* Name + title */}
          <div className="mt-8 text-center">
            <h2
              className="text-3xl md:text-4xl font-black uppercase tracking-tight text-white"
              style={{ fontFamily: "var(--font-display)" }}
            >
              YATSUI
            </h2>
            <p className="text-xs font-bold uppercase tracking-[0.25em] mt-1" style={{ color: "rgba(255,255,255,0.3)" }}>
              Junior AI Engineer
            </p>
          </div>

          {/* Quick info row */}
          <div className="mt-5 flex items-center gap-4 flex-wrap justify-center">
            {[
              { icon: "🔥", label: "Fire · Wind", sublabel: "Nature" },
              { icon: "📋", label: "Active Portfolio", sublabel: "Work" },
              { icon: "🏠", label: "Hidden Leaf", sublabel: "Village" },
            ].map((item) => (
              <div
                key={item.sublabel}
                className="flex items-center gap-2 px-3 py-2"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span className="text-sm">{item.icon}</span>
                <div>
                  <div className="text-[10px] font-bold text-white">{item.label}</div>
                  <div className="text-[8px] uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.25)" }}>
                    {item.sublabel}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>

      {/* Corner decorations */}
      <div
        className="absolute top-4 right-4 text-[9px] font-bold uppercase tracking-widest pointer-events-none"
        style={{ color: "rgba(255,255,255,0.08)" }}
      >
        HUD v1.0
      </div>
    </section>
  );
}
