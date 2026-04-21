"use client";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import MissionCard from "@/components/Missioncard";
import { projects } from "@/data/projects";
import { useState } from "react";

const ranks = ["All", "S", "A", "B", "C"] as const;

export default function Projects() {
  const [activeRank, setActiveRank] = useState<string>("All");

  const filtered =
    activeRank === "All"
      ? projects
      : projects.filter((p) => p.rank === activeRank);

  return (
    <div className="relative min-h-screen">
      {/* Full-page background */}
      <div className="fixed inset-0 z-0">
        <Image src="/bg/hero-village.jpg" alt="" fill className="object-cover" sizes="100vw" />
      </div>
      <div className="fixed inset-0 z-0" style={{
        background: "linear-gradient(to bottom, rgba(13,15,20,0.88) 0%, rgba(21,27,46,0.92) 50%, rgba(13,15,20,0.95) 100%)",
      }} />

      {/* Hero banner */}
      <div className="relative z-10 h-[40vh] md:h-[45vh] overflow-hidden flex items-end">
        <div className="absolute top-0 left-0 right-0 h-12" style={{ background: "rgba(13,15,20,0.9)" }} />

        <div className="relative z-10 pb-8 px-6 md:px-12 max-w-5xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "#c9a84c" }}>
              任務掲示板
            </span>
            <h1 className="text-impact text-4xl md:text-6xl text-white mt-2">
              MISSION <span style={{ color: "#c9a84c" }}>BOARD</span>
            </h1>
            <p className="text-sm max-w-lg mt-2" style={{ color: "rgba(255,255,255,0.5)" }}>
              Ranked by complexity and impact — from routine C-Rank to legendary S-Rank.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 py-10">
        {/* Rank Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex gap-2 mb-10 flex-wrap"
        >
          {ranks.map((rank, i) => {
            const isActive = activeRank === rank;
            return (
              <motion.button
                key={rank}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.05 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.93 }}
                onClick={() => setActiveRank(rank)}
                className="px-5 py-2.5 text-xs font-bold uppercase tracking-wider cursor-pointer transition-colors duration-200"
                style={{
                  background: isActive ? "#c9a84c" : "rgba(255,255,255,0.04)",
                  color: isActive ? "#000" : "rgba(255,255,255,0.4)",
                  border: isActive ? "1px solid #c9a84c" : "1px solid rgba(255,255,255,0.1)",
                  backdropFilter: "blur(8px)",
                }}
              >
                {rank === "All" ? "ALL" : `${rank}-RANK`}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <MissionCard {...p} index={i} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
            <p className="text-lg font-bold uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
              No missions of this rank... yet.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
