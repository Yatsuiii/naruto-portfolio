"use client";
import SharinganSearch from "@/components/SharinganSearch";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Village Gate", kanji: "門", desc: "Home" },
  { href: "/about", label: "Shinobi ID", kanji: "忍", desc: "About" },
  { href: "/experience", label: "Experience Log", kanji: "経", desc: "Timeline" },
  { href: "/projects", label: "Mission Board", kanji: "任", desc: "Projects" },
];

const menuLinks = [
  { href: "/", label: "HOME", kanji: "門" },
  { href: "/about", label: "ABOUT", kanji: "忍" },
  { href: "/experience", label: "EXPERIENCE", kanji: "経" },
  { href: "/projects", label: "MISSIONS", kanji: "任" },
  { href: "https://github.com/Yatsuiii", label: "GITHUB", kanji: "外", external: true },
];

export default function NinjaNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Top bar */}
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex items-center justify-center w-10 h-10 font-bold text-lg"
              style={{
                background: "#e87b35",
                color: "#000",
                transform: "skewX(-6deg)",
                fontFamily: "var(--font-display)",
              }}
            >
              忍
            </motion.div>
            <span
              className="text-sm font-black tracking-[0.2em] uppercase hidden sm:block"
              style={{ color: "#fff" }}
            >
              SHINOBI
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative flex items-center gap-2 px-5 py-2.5 text-sm font-bold uppercase tracking-wider cursor-pointer"
                    style={{
                      background: isActive ? "#e87b35" : "transparent",
                      color: isActive ? "#000" : "#fff",
                      transform: "skewX(-6deg)",
                      border: isActive ? "none" : "1px solid rgba(255,255,255,0.15)",
                    }}
                  >
                    <span
                      className="text-xs font-normal"
                      style={{
                        transform: "skewX(6deg)",
                        opacity: isActive ? 0.7 : 0.4,
                      }}
                    >
                      {item.kanji}
                    </span>
                    <span style={{ transform: "skewX(6deg)" }}>
                      {item.label}
                    </span>
                  </motion.div>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-3">
            <SharinganSearch />
            {/* Menu button (mobile + desktop) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2 px-4 py-2 cursor-pointer font-bold text-sm uppercase tracking-wider"
              style={{
                background: menuOpen ? "#e87b35" : "transparent",
                color: menuOpen ? "#000" : "#fff",
                border: menuOpen ? "none" : "1px solid rgba(255,255,255,0.2)",
                transform: "skewX(-6deg)",
              }}
            >
              <span style={{ transform: "skewX(6deg)" }}>
                {menuOpen ? "CLOSE" : "MENU"}
              </span>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Full-screen command menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40"
          >
            {/* Background */}
            <motion.div
              initial={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
              animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)" }}
              exit={{ clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)" }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="absolute inset-0 bg-black"
            />

            {/* Orange accent diagonal */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
              className="absolute top-0 right-0 w-1/3 h-full"
              style={{
                background: "#e87b35",
                clipPath: "polygon(30% 0, 100% 0, 100% 100%, 0 100%)",
              }}
            />

            {/* Speed lines overlay */}
            <div className="speed-lines absolute inset-0 opacity-30" />

            {/* Menu items */}
            <div className="relative z-10 flex flex-col justify-center h-full px-10 md:px-20 gap-4">
              {menuLinks.map((item, i) => {
                const isActive = pathname === item.href;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ x: -60, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -60, opacity: 0 }}
                    transition={{ delay: 0.15 + i * 0.08, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {item.external ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center gap-4"
                      >
                        <MenuItemContent item={item} isActive={false} />
                      </a>
                    ) : (
                      <Link href={item.href} onClick={() => setMenuOpen(false)} className="group flex items-center gap-4">
                        <MenuItemContent item={item} isActive={isActive} />
                      </Link>
                    )}
                  </motion.div>
                );
              })}

              {/* Decorative kanji */}
              <motion.div
                initial={{ opacity: 0, rotate: -10 }}
                animate={{ opacity: 0.06, rotate: -5 }}
                className="absolute bottom-10 right-10 select-none pointer-events-none"
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "12rem",
                  color: "#fff",
                  lineHeight: 1,
                }}
              >
                火
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MenuItemContent({ item, isActive }: { item: { label: string; kanji: string }; isActive: boolean }) {
  return (
    <>
      <span
        className="text-2xl md:text-3xl opacity-30 group-hover:opacity-60 transition-opacity"
        style={{ fontFamily: "var(--font-display)" }}
      >
        {item.kanji}
      </span>
      <motion.span
        whileHover={{ x: 8 }}
        className="text-3xl md:text-5xl font-black uppercase tracking-tight"
        style={{
          fontFamily: "var(--font-display)",
          color: isActive ? "#e87b35" : "#fff",
          textShadow: isActive ? "0 0 20px rgba(249,115,22,0.4)" : "none",
        }}
      >
        {item.label}
      </motion.span>
      {isActive && (
        <div
          className="w-3 h-3 rotate-45 ml-2"
          style={{ background: "#e87b35" }}
        />
      )}
    </>
  );
}
