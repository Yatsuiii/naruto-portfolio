import Image from "next/image";
import VillageHUD from "@/components/VillageHUD";

const skills = [
  { name: "Python", level: 90, kanji: "火", element: "Fire" },
  { name: "Rust", level: 70, kanji: "雷", element: "Lightning" },
  { name: "LangChain / RAG", level: 75, kanji: "土", element: "Earth" },
  { name: "AI / ML", level: 80, kanji: "風", element: "Wind" },
  { name: "Systems Design", level: 75, kanji: "水", element: "Water" },
];

export default function AboutPage() {
  return (
    <div className="relative min-h-screen">
      <div className="fixed inset-0 z-0">
        <Image
          src="/bg/about-sunset.webp"
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

      <header className="relative z-10 pt-28 md:pt-32 pb-10 px-6 md:px-12 max-w-6xl mx-auto">
        <span
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: "#c9a84c" }}
        >
          忍者登録 — SHINOBI REGISTRATION
        </span>
        <h1 className="text-impact text-4xl md:text-6xl text-white mt-2">
          ABOUT <span style={{ color: "#c9a84c" }}>ME</span>
        </h1>
        <p
          className="text-sm md:text-base max-w-2xl mt-3"
          style={{ color: "rgba(255,255,255,0.55)" }}
        >
          The “village dashboard” is where I keep my skills and featured missions.
          It’s flashy on purpose — but built to stay readable and fast.
        </p>
      </header>

      <div className="relative z-10">
        <VillageHUD skills={skills} />
      </div>
    </div>
  );
}

