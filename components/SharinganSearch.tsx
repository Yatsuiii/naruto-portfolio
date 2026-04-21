"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { projects } from "@/data/projects";

function SharinganEye({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 48 48"
      className={spinning ? "sharingan-spinning" : ""}
      style={{ transition: "filter 0.3s", filter: spinning ? "drop-shadow(0 0 6px #dc2626)" : "none" }}
    >
      {/* Outer ring */}
      <circle cx="24" cy="24" r="20" fill="none" stroke={spinning ? "#dc2626" : "rgba(255,255,255,0.3)"} strokeWidth="2" />
      {/* Iris */}
      <circle cx="24" cy="24" r="14" fill={spinning ? "#1a0000" : "#111"} stroke={spinning ? "#dc2626" : "rgba(255,255,255,0.2)"} strokeWidth="1.5" />
      {/* Pupil */}
      <circle cx="24" cy="24" r="5" fill={spinning ? "#dc2626" : "rgba(255,255,255,0.15)"} />
      {/* Tomoe 1 */}
      <circle cx="24" cy="11" r="3" fill={spinning ? "#dc2626" : "rgba(255,255,255,0.1)"} />
      {/* Tomoe 2 */}
      <circle cx="12.74" cy="30.5" r="3" fill={spinning ? "#dc2626" : "rgba(255,255,255,0.1)"} />
      {/* Tomoe 3 */}
      <circle cx="35.26" cy="30.5" r="3" fill={spinning ? "#dc2626" : "rgba(255,255,255,0.1)"} />
      {/* Connecting curves */}
      {spinning && (
        <>
          <path d="M24 11 Q28 18 24 24" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M12.74 30.5 Q18 28 24 24" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" />
          <path d="M35.26 30.5 Q30 28 24 24" stroke="#dc2626" strokeWidth="1.5" fill="none" opacity="0.6" />
        </>
      )}
    </svg>
  );
}

export default function SharinganSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const isSpinning = query.length > 0;

  const results = query.length > 0
    ? projects.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setIsFocused(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          setIsOpen(!isOpen);
          setTimeout(() => inputRef.current?.focus(), 100);
        }}
        className="flex items-center justify-center w-10 h-10 cursor-pointer"
        style={{
          background: isOpen ? "rgba(220,38,38,0.15)" : "transparent",
          border: isOpen ? "1px solid rgba(220,38,38,0.3)" : "1px solid rgba(255,255,255,0.15)",
          transform: "skewX(-6deg)",
        }}
        title="Sharingan Search"
      >
        <span style={{ transform: "skewX(6deg)" }}>
          <SharinganEye spinning={isSpinning && isOpen} />
        </span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, width: 0, x: 10 }}
            animate={{ opacity: 1, width: 280, x: 0 }}
            exit={{ opacity: 0, width: 0, x: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-full mt-2 overflow-hidden"
            style={{ zIndex: 100 }}
          >
            <div
              className="flex items-center gap-3 px-4 py-3"
              style={{
                background: "rgba(10,10,15,0.95)",
                border: `1px solid ${isFocused ? "rgba(220,38,38,0.4)" : "rgba(255,255,255,0.1)"}`,
                backdropFilter: "blur(12px)",
                transition: "border-color 0.3s",
              }}
            >
              <SharinganEye spinning={isSpinning} />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Search jutsu..."
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/25 outline-none"
              />
            </div>

            {/* Results dropdown */}
            <AnimatePresence>
              {results.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="mt-1"
                  style={{
                    background: "rgba(10,10,15,0.95)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    backdropFilter: "blur(12px)",
                  }}
                >
                  {results.map((p) => (
                    <a
                      key={p.title}
                      href={p.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/5 transition-colors"
                    >
                      <span
                        className="text-xs font-black px-1.5 py-0.5 flex-shrink-0"
                        style={{
                          background: p.rank === "S" ? "#dc2626" : p.rank === "A" ? "#FF9100" : "#3b82f6",
                          color: p.rank === "A" ? "#000" : "#fff",
                        }}
                      >
                        {p.rank}
                      </span>
                      <div className="min-w-0">
                        <div className="text-sm font-bold text-white truncate">{p.title}</div>
                        <div className="text-[10px] text-white/30 truncate">{p.tags.join(" · ")}</div>
                      </div>
                    </a>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {query.length > 0 && results.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-1 px-4 py-4 text-center"
                style={{
                  background: "rgba(10,10,15,0.95)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p className="text-xs text-white/30 uppercase tracking-wider">No jutsu found</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
