"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";

const sections = [
  { id: "hero", label: "Gate", kanji: "門" },
  { id: "about", label: "Profile", kanji: "忍" },
  { id: "skills", label: "Jutsu", kanji: "術" },
  { id: "ichiraku", label: "Nindo", kanji: "道" },
  { id: "missions", label: "Missions", kanji: "任" },
];

function KunaiSVG({ active }: { active: boolean }) {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="kunai-icon"
      style={{ transform: active ? "rotate(-45deg) scale(1.1)" : "rotate(0deg)" }}
    >
      {/* Blade */}
      <path
        d="M16 2L20 14H12L16 2Z"
        fill={active ? "#FF9100" : "rgba(255,255,255,0.4)"}
        stroke={active ? "#FF9100" : "rgba(255,255,255,0.2)"}
        strokeWidth="0.5"
      />
      {/* Guard ring */}
      <circle
        cx="16"
        cy="16"
        r="3"
        fill="none"
        stroke={active ? "#FF9100" : "rgba(255,255,255,0.3)"}
        strokeWidth="1.5"
      />
      {/* Handle */}
      <rect
        x="15"
        y="19"
        width="2"
        height="8"
        rx="1"
        fill={active ? "#FF9100" : "rgba(255,255,255,0.3)"}
      />
      {/* Wrap */}
      <line x1="15.2" y1="21" x2="16.8" y2="22" stroke={active ? "#0a0a0f" : "rgba(0,0,0,0.3)"} strokeWidth="0.7" />
      <line x1="15.2" y1="23" x2="16.8" y2="24" stroke={active ? "#0a0a0f" : "rgba(0,0,0,0.3)"} strokeWidth="0.7" />
      {/* Ring hole */}
      <circle cx="16" cy="29" r="2" fill="none" stroke={active ? "#FF9100" : "rgba(255,255,255,0.25)"} strokeWidth="1" />
    </svg>
  );
}

export default function KunaiNav() {
  const [activeSection, setActiveSection] = useState("hero");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    // Add motion blur class to body
    document.body.classList.add("motion-blur-transition");
    setTimeout(() => document.body.classList.remove("motion-blur-transition"), 600);

    el.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3"
        >
          {/* Vertical line connecting kunai */}
          <div
            className="absolute top-3 bottom-3 w-px left-1/2 -translate-x-1/2"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />

          {sections.map((section, i) => (
            <motion.button
              key={section.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08 }}
              onClick={() => scrollToSection(section.id)}
              className="relative group cursor-pointer flex items-center justify-center p-1.5"
              title={section.label}
            >
              <KunaiSVG active={activeSection === section.id} />

              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, x: 10, scale: 0.8 }}
                whileHover={{ opacity: 1, x: 0, scale: 1 }}
                className="absolute right-full mr-3 px-3 py-1.5 pointer-events-none whitespace-nowrap"
                style={{
                  background: "rgba(255,145,0,0.9)",
                  color: "#000",
                  fontSize: "11px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                }}
              >
                <span style={{ fontFamily: "var(--font-display)" }}>{section.kanji}</span>
                {" "}
                {section.label}
                {/* Arrow */}
                <div
                  className="absolute top-1/2 -translate-y-1/2 right-[-4px] w-2 h-2 rotate-45"
                  style={{ background: "rgba(255,145,0,0.9)" }}
                />
              </motion.div>

              {/* Active dot */}
              {activeSection === section.id && (
                <motion.div
                  layoutId="kunai-active"
                  className="absolute -left-2 w-1 h-4 rounded-full"
                  style={{ background: "#FF9100" }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
