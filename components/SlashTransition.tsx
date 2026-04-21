"use client";
import { motion, AnimatePresence } from "framer-motion";

/**
 * Full-screen diagonal slash transition overlay.
 * Triggered on section changes for dramatic Persona 5 / Naruto feel.
 */
export default function SlashTransition({
  show,
  onComplete,
}: {
  show: boolean;
  onComplete?: () => void;
}) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
          onAnimationComplete={onComplete}
        >
          {/* Black diagonal slash */}
          <motion.div
            initial={{ x: "-100%", skewX: "-15deg" }}
            animate={{ x: "0%" }}
            exit={{ x: "120%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-0"
            style={{
              background: "#000",
              transformOrigin: "center",
            }}
          />
          {/* Orange accent slash */}
          <motion.div
            initial={{ x: "-100%", skewX: "-15deg" }}
            animate={{ x: "0%" }}
            exit={{ x: "120%" }}
            transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
            className="absolute inset-0"
            style={{
              background: "#f97316",
              width: "8px",
              left: "52%",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/**
 * Ink splatter reveal — used for section entrances.
 * Expands from center like an ink brush stroke.
 */
export function InkReveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" }}
      whileInView={{
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
