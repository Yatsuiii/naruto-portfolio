"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

export default function EntryGate({ onComplete }: { onComplete: () => void }) {
  const [phase, setPhase] = useState<"dark" | "text" | "ready" | "opening" | "done">("dark");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("text"), 600);
    const t2 = setTimeout(() => setPhase("ready"), 2400);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const openGate = useCallback(() => {
    if (phase !== "ready") return;
    setPhase("opening");
    setTimeout(() => {
      setPhase("done");
      onComplete();
    }, 1200);
  }, [phase, onComplete]);

  if (phase === "done") return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] cursor-pointer"
        onClick={openGate}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") openGate(); }}
        tabIndex={0}
        role="button"
        aria-label="Enter the village"
      >
        {/* Left gate */}
        <motion.div
          className="absolute top-0 left-0 w-1/2 h-full"
          style={{ background: "#000" }}
          animate={
            phase === "opening"
              ? { x: "-100%", skewY: -2 }
              : { x: "0%", skewY: 0 }
          }
          transition={{ duration: 1.1, ease }}
        >
          {/* Gate texture — left */}
          <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-10">
            <motion.div
              animate={phase === "opening" ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {/* Vertical line accent */}
              <div
                className="w-[2px] h-40 md:h-60"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)" }}
              />
            </motion.div>
          </div>

          {/* Kanji watermark */}
          <div
            className="absolute bottom-10 left-6 md:left-10 select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 10vw, 8rem)",
              color: "rgba(201,168,76,0.04)",
              lineHeight: 1,
            }}
          >
            門
          </div>
        </motion.div>

        {/* Right gate */}
        <motion.div
          className="absolute top-0 right-0 w-1/2 h-full"
          style={{ background: "#000" }}
          animate={
            phase === "opening"
              ? { x: "100%", skewY: 2 }
              : { x: "0%", skewY: 0 }
          }
          transition={{ duration: 1.1, ease }}
        >
          {/* Gate texture — right */}
          <div className="absolute inset-0 flex items-center justify-start pl-4 md:pl-10">
            <motion.div
              animate={phase === "opening" ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div
                className="w-[2px] h-40 md:h-60"
                style={{ background: "linear-gradient(to bottom, transparent, rgba(201,168,76,0.3), transparent)" }}
              />
            </motion.div>
          </div>

          {/* Kanji watermark */}
          <div
            className="absolute bottom-10 right-6 md:right-10 select-none pointer-events-none"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(4rem, 10vw, 8rem)",
              color: "rgba(201,168,76,0.04)",
              lineHeight: 1,
            }}
          >
            火
          </div>
        </motion.div>

        {/* Center content */}
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
          {/* Intro text */}
          <AnimatePresence>
            {(phase === "text" || phase === "ready") && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center px-6"
              >
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease }}
                  className="text-sm md:text-base tracking-[0.25em] uppercase"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  A new shinobi enters
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3, ease }}
                  className="text-sm md:text-base tracking-[0.25em] uppercase mt-1"
                  style={{ color: "rgba(255,255,255,0.4)" }}
                >
                  the Hidden Leaf…
                </motion.p>

                {/* Decorative line */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.8, delay: 0.6, ease }}
                  className="mx-auto mt-6 h-[1px] w-20"
                  style={{
                    background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.5), transparent)",
                    transformOrigin: "center",
                  }}
                />

                {/* Kanji symbol */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.9, ease }}
                  className="mt-6"
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "2.5rem",
                    color: "rgba(201,168,76,0.15)",
                  }}
                >
                  忍
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* "Click to enter" prompt */}
          <AnimatePresence>
            {phase === "ready" && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="absolute bottom-16 md:bottom-20"
              >
                <motion.p
                  animate={{ opacity: [0.3, 0.8, 0.3] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[10px] md:text-xs font-bold uppercase tracking-[0.4em]"
                  style={{ color: "rgba(201,168,76,0.6)" }}
                >
                  Click to enter the village
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Gate seam glow — center line */}
        <motion.div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-full z-20"
          style={{
            background: "linear-gradient(to bottom, transparent 10%, rgba(201,168,76,0.2) 30%, rgba(201,168,76,0.4) 50%, rgba(201,168,76,0.2) 70%, transparent 90%)",
          }}
          animate={phase === "opening" ? { opacity: 0, scaleX: 30 } : { opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.6, ease }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
