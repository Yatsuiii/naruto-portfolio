"use client";
import { motion } from "framer-motion";

// Deterministic pseudo-random to avoid hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const stars = Array.from({ length: 40 }).map((_, i) => ({
  width: Math.round((seededRandom(i * 6) * 2 + 1) * 100) / 100,
  height: Math.round((seededRandom(i * 6 + 1) * 2 + 1) * 100) / 100,
  top: Math.round(seededRandom(i * 6 + 2) * 5000) / 100,
  left: Math.round(seededRandom(i * 6 + 3) * 10000) / 100,
  duration: Math.round((2 + seededRandom(i * 6 + 4) * 3) * 100) / 100,
  delay: Math.round(seededRandom(i * 6 + 5) * 300) / 100,
}));

export default function VillageScene() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Sky gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 120% 80% at 50% 20%, #1a0a2e 0%, #0d0d1a 40%, #0a0a0f 70%)",
        }}
      />

      {/* Moon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, delay: 0.3 }}
        className="absolute"
        style={{ top: "8%", right: "15%", width: 120, height: 120 }}
      >
        <div
          className="w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(circle at 40% 40%, #fef3c7 0%, #fde68a 30%, #f59e0b 70%, transparent 100%)",
            boxShadow:
              "0 0 60px rgba(245,158,11,0.3), 0 0 120px rgba(245,158,11,0.15), 0 0 200px rgba(245,158,11,0.05)",
          }}
        />
        {/* Moon craters */}
        <div
          className="absolute rounded-full"
          style={{
            top: "25%",
            left: "30%",
            width: 18,
            height: 18,
            background: "rgba(217,119,6,0.2)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "50%",
            left: "55%",
            width: 12,
            height: 12,
            background: "rgba(217,119,6,0.15)",
          }}
        />
      </motion.div>

      {/* Stars */}
      {stars.map((star, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: star.width,
            height: star.height,
            top: `${star.top}%`,
            left: `${star.left}%`,
            background: "#fff",
          }}
          animate={{ opacity: [0.2, 0.8, 0.2] }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
          }}
        />
      ))}

      {/* Clouds */}
      <svg
        className="absolute w-full"
        style={{ top: "12%", opacity: 0.06 }}
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M0,120 Q120,80 240,110 Q360,140 480,100 Q600,60 720,90 Q840,120 960,80 Q1080,40 1200,70 Q1320,100 1440,60 L1440,200 L0,200 Z"
          fill="rgba(249,115,22,0.5)"
          animate={{ d: [
            "M0,120 Q120,80 240,110 Q360,140 480,100 Q600,60 720,90 Q840,120 960,80 Q1080,40 1200,70 Q1320,100 1440,60 L1440,200 L0,200 Z",
            "M0,100 Q120,130 240,90 Q360,60 480,110 Q600,140 720,80 Q840,50 960,100 Q1080,130 1200,60 Q1320,90 1440,110 L1440,200 L0,200 Z",
            "M0,120 Q120,80 240,110 Q360,140 480,100 Q600,60 720,90 Q840,120 960,80 Q1080,40 1200,70 Q1320,100 1440,60 L1440,200 L0,200 Z",
          ]}}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </svg>

      {/* Far mountains */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 400"
        preserveAspectRatio="none"
        style={{ height: "55%" }}
      >
        {/* Farthest range */}
        <path
          d="M0,350 L80,280 L180,310 L300,220 L420,260 L500,180 L600,230 L720,150 L840,200 L920,140 L1020,190 L1100,130 L1200,170 L1300,120 L1400,160 L1440,140 L1440,400 L0,400 Z"
          fill="#0f0f1a"
          opacity="0.9"
        />
        {/* Mid range */}
        <path
          d="M0,380 L100,320 L200,340 L340,270 L440,300 L560,240 L680,280 L780,220 L880,260 L1000,200 L1100,240 L1220,190 L1340,230 L1440,200 L1440,400 L0,400 Z"
          fill="#0c0c16"
          opacity="0.95"
        />
      </svg>

      {/* Village silhouette */}
      <svg
        className="absolute bottom-0 w-full"
        viewBox="0 0 1440 250"
        preserveAspectRatio="none"
        style={{ height: "30%" }}
      >
        {/* Treeline */}
        <path
          d="M0,200 L20,170 L35,190 L50,160 L65,185 L80,155 L100,180 L120,150 L140,175 L160,145 L180,170 L200,140 L220,165 L240,135 L260,160 L280,130 L300,155 L320,125 L340,150 L360,145 L380,165 L400,135 L420,155 L440,130 L460,150 L480,125 L500,145 L520,120 L540,140 L560,130 L580,150 L600,125 L620,145 L640,120 L660,140 L680,115 L700,135 L720,130 L740,150 L760,125 L780,145 L800,120 L820,140 L840,115 L860,135 L880,130 L900,150 L920,125 L940,145 L960,120 L980,140 L1000,130 L1020,150 L1040,125 L1060,145 L1080,120 L1100,140 L1120,130 L1140,150 L1160,125 L1180,145 L1200,135 L1220,155 L1240,130 L1260,150 L1280,140 L1300,160 L1320,135 L1340,155 L1360,145 L1380,165 L1400,140 L1420,160 L1440,150 L1440,250 L0,250 Z"
          fill="#08080e"
        />

        {/* Buildings */}
        {/* Hokage tower - center */}
        <rect x="680" y="90" width="40" height="110" fill="#0a0a12" />
        <rect x="670" y="100" width="60" height="8" fill="#0a0a12" />
        <polygon points="675,100 700,60 725,100" fill="#0a0a12" />
        {/* Tower windows - warm light */}
        <rect x="693" y="110" width="6" height="8" fill="#f9731630" rx="1" />
        <rect x="693" y="130" width="6" height="8" fill="#f9731625" rx="1" />
        <rect x="693" y="150" width="6" height="8" fill="#f9731620" rx="1" />

        {/* Left buildings */}
        <rect x="520" y="150" width="30" height="50" fill="#09090f" />
        <polygon points="518,150 535,130 552,150" fill="#09090f" />
        <rect x="530" y="160" width="5" height="6" fill="#f9731618" rx="1" />

        <rect x="580" y="140" width="25" height="60" fill="#09090f" />
        <polygon points="578,140 592,120 607,140" fill="#09090f" />
        <rect x="588" y="155" width="5" height="6" fill="#f9731620" rx="1" />

        <rect x="630" y="130" width="28" height="70" fill="#09090f" />
        <polygon points="628,130 644,105 660,130" fill="#09090f" />

        {/* Right buildings */}
        <rect x="760" y="145" width="28" height="55" fill="#09090f" />
        <polygon points="758,145 774,125 790,145" fill="#09090f" />
        <rect x="770" y="158" width="5" height="6" fill="#f9731618" rx="1" />

        <rect x="820" y="155" width="25" height="45" fill="#09090f" />
        <polygon points="818,155 832,138 847,155" fill="#09090f" />

        <rect x="870" y="140" width="30" height="60" fill="#09090f" />
        <polygon points="868,140 885,115 902,140" fill="#09090f" />
        <rect x="880" y="150" width="5" height="6" fill="#f9731615" rx="1" />

        {/* Village wall base */}
        <rect x="0" y="195" width="1440" height="55" fill="#06060a" />

        {/* Village gate */}
        <rect x="690" y="180" width="8" height="30" fill="#0e0e18" />
        <rect x="740" y="180" width="8" height="30" fill="#0e0e18" />
        <rect x="685" y="178" width="68" height="6" fill="#0e0e18" />
        {/* Gate symbol */}
        <circle cx="719" cy="191" r="6" fill="none" stroke="#f9731615" strokeWidth="1" />
      </svg>

      {/* Ground fog */}
      <div
        className="absolute bottom-0 left-0 right-0"
        style={{
          height: "15%",
          background:
            "linear-gradient(to top, rgba(10,10,15,1) 0%, rgba(10,10,15,0.8) 40%, transparent 100%)",
        }}
      />
    </div>
  );
}
