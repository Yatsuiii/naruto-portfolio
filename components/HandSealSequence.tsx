"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback } from "react";

const seals = [
  { kanji: "子", name: "Ne (Rat)", element: "Special" },
  { kanji: "丑", name: "Ushi (Ox)", element: "Earth" },
  { kanji: "寅", name: "Tora (Tiger)", element: "Fire" },
  { kanji: "卯", name: "U (Hare)", element: "Wind" },
  { kanji: "辰", name: "Tatsu (Dragon)", element: "Water" },
  { kanji: "巳", name: "Mi (Snake)", element: "Lightning" },
];

const elementColors: Record<string, string> = {
  Special: "#a78bfa",
  Earth: "#a78bfa",
  Fire: "#f97316",
  Wind: "#a3e635",
  Water: "#3b82f6",
  Lightning: "#facc15",
};

export default function HandSealSequence({
  onComplete,
}: {
  onComplete?: () => void;
}) {
  const [activated, setActivated] = useState<number[]>([]);
  const [flash, setFlash] = useState(false);
  const [jutsuComplete, setJutsuComplete] = useState(false);
  const [shakeIndex, setShakeIndex] = useState<number | null>(null);

  const handleSealClick = useCallback(
    (index: number) => {
      if (jutsuComplete) return;

      const nextExpected = activated.length;
      if (index === nextExpected) {
        const newActivated = [...activated, index];
        setActivated(newActivated);

        if (newActivated.length === seals.length) {
          setFlash(true);
          setJutsuComplete(true);
          setTimeout(() => setFlash(false), 800);
          onComplete?.();
        }
      } else {
        // Wrong order — shake and reset
        setShakeIndex(index);
        setTimeout(() => {
          setShakeIndex(null);
          setActivated([]);
        }, 400);
      }
    },
    [activated, jutsuComplete, onComplete]
  );

  const reset = () => {
    setActivated([]);
    setJutsuComplete(false);
  };

  const progress = activated.length / seals.length;

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Flash overlay — dramatic completion */}
      <AnimatePresence>
        {flash && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: [0, 0.5, 0.3, 0], scale: [0.8, 1.2, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="fixed inset-0 z-50 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, rgba(249,115,22,0.6), rgba(220,38,38,0.3), transparent 70%)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Instruction + progress bar */}
      <div className="text-center mb-2">
        <p
          className="text-xs uppercase tracking-widest"
          style={{ color: "var(--text-muted)" }}
        >
          {jutsuComplete
            ? "Jutsu activated!"
            : `Weave the seals in order — ${activated.length}/${seals.length}`}
        </p>
        {/* Mini progress bar */}
        <div
          className="mt-2 h-0.5 w-32 mx-auto rounded-full overflow-hidden"
          style={{ background: "rgba(255,255,255,0.06)" }}
        >
          <motion.div
            animate={{ width: `${progress * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, #f97316, #dc2626)",
            }}
          />
        </div>
      </div>

      {/* Seal buttons */}
      <div className="flex gap-3 flex-wrap justify-center">
        {seals.map((seal, i) => {
          const isActivated = activated.includes(i);
          const isNext = i === activated.length && !jutsuComplete;
          const isShaking = shakeIndex === i;
          const color = elementColors[seal.element];

          return (
            <motion.button
              key={seal.kanji}
              onClick={() => handleSealClick(i)}
              whileHover={
                !jutsuComplete
                  ? { scale: 1.12, y: -4 }
                  : {}
              }
              whileTap={!jutsuComplete ? { scale: 0.88 } : {}}
              animate={
                isShaking
                  ? { x: [0, -6, 6, -4, 4, 0], borderColor: "#dc2626" }
                  : isActivated
                  ? {
                      borderColor: color,
                      boxShadow: `0 0 20px ${color}50, 0 0 40px ${color}20`,
                      scale: 1,
                    }
                  : { x: 0 }
              }
              transition={
                isActivated
                  ? { duration: 0.4, ease: "easeOut" }
                  : { duration: 0.3 }
              }
              className="relative flex flex-col items-center justify-center w-16 h-16 rounded-xl text-xl cursor-pointer"
              style={{
                background: isActivated
                  ? `${color}18`
                  : isNext
                  ? "rgba(249,115,22,0.06)"
                  : "rgba(255,255,255,0.03)",
                border: `1px solid ${
                  isActivated
                    ? color
                    : isNext
                    ? "rgba(249,115,22,0.3)"
                    : "rgba(255,255,255,0.06)"
                }`,
                color: isActivated ? color : "var(--text-muted)",
                transition: "background 0.3s",
              }}
            >
              <motion.span
                animate={
                  isActivated ? { scale: 1.15 } : { scale: 1 }
                }
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="text-lg"
              >
                {seal.kanji}
              </motion.span>

              {/* Pulse ring on next seal */}
              {isNext && !jutsuComplete && (
                <motion.div
                  className="absolute inset-0 rounded-xl"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(249,115,22,0.4)",
                      "0 0 0 10px rgba(249,115,22,0)",
                    ],
                  }}
                  transition={{ duration: 1.0, repeat: Infinity, ease: "easeOut" }}
                />
              )}

              {/* Activation burst — ring + particles */}
              <AnimatePresence>
                {isActivated && (
                  <>
                    <motion.div
                      initial={{ scale: 0.5, opacity: 1 }}
                      animate={{ scale: 2.8, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                      className="absolute inset-0 rounded-xl"
                      style={{ border: `2px solid ${color}` }}
                    />
                    {/* Small particle dots */}
                    {[...Array(4)].map((_, j) => (
                      <motion.div
                        key={j}
                        initial={{ scale: 1, opacity: 0.8, x: 0, y: 0 }}
                        animate={{
                          scale: 0,
                          opacity: 0,
                          x: [0, (j % 2 === 0 ? 1 : -1) * 20],
                          y: [0, (j < 2 ? -1 : 1) * 20],
                        }}
                        transition={{ duration: 0.5, delay: j * 0.05 }}
                        className="absolute w-1.5 h-1.5 rounded-full"
                        style={{ background: color }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>

      {/* Seal names */}
      <div className="flex gap-3 flex-wrap justify-center mt-1">
        {seals.map((seal, i) => (
          <motion.span
            key={i}
            animate={{
              color: activated.includes(i)
                ? elementColors[seal.element]
                : "var(--text-muted)",
              opacity: activated.includes(i) ? 1 : 0.4,
            }}
            className="text-[10px] w-16 text-center"
          >
            {seal.name}
          </motion.span>
        ))}
      </div>

      {/* Completion message + reset */}
      <AnimatePresence>
        {jutsuComplete && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="flex flex-col items-center gap-3 mt-4"
          >
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
                textShadow: [
                  "0 0 10px rgba(249,115,22,0.3)",
                  "0 0 20px rgba(249,115,22,0.6)",
                  "0 0 10px rgba(249,115,22,0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-sm font-bold tracking-wider uppercase"
              style={{ color: "#f97316" }}
            >
              火遁・豪火球の術
            </motion.p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={reset}
              className="text-xs px-3 py-1.5 rounded-lg cursor-pointer transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--text-muted)",
              }}
            >
              Reset Seals
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
