import Image from "next/image";
import { missions } from "@/data/experience";
import MissionTimeline from "@/components/MissionTimeline";

export default function ExperiencePage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg/timeline-rasengan.webp"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="fixed inset-0 z-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(13,15,20,0.9) 0%, rgba(21,27,46,0.92) 55%, rgba(13,15,20,0.98) 100%)",
        }}
      />

      <header className="relative z-10 pt-28 md:pt-32 pb-10 px-6 md:px-12 max-w-5xl mx-auto">
        <span
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: "#e87b35" }}
        >
          経験記録 — EXPERIENCE LOG
        </span>
        <h1 className="text-impact text-4xl md:text-6xl text-white mt-2">
          MISSION <span style={{ color: "#e87b35" }}>TIMELINE</span>
        </h1>
        <p
          className="text-sm md:text-base max-w-2xl mt-3"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          Real work, ranked like missions — objectives, outcomes, and the tech used.
        </p>
      </header>

      <div className="relative z-10">
        <MissionTimeline missions={missions} />
      </div>
    </div>
  );
}

