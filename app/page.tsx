import Image from "next/image";
import Link from "next/link";
import { projects } from "@/data/projects";
import HomeFX from "@/components/HomeFX";

export default function Home() {
  const featured = projects.slice(0, 6);

  return (
    <div className="relative" style={{ background: "var(--shinobi-ink)" }}>
      <HomeFX />
      {/* HERO */}
      <section
        id="hero"
        className="relative min-h-[70vh] md:h-[80vh] overflow-hidden flex items-end"
      >
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg/hero-village.jpg"
            alt="Hidden Leaf Village"
            fill
            className="object-cover object-[center_30%]"
            priority
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to bottom, rgba(13,15,20,0.1) 0%, rgba(13,15,20,0.3) 40%, rgba(13,15,20,0.98) 90%, rgba(13,15,20,1) 100%)",
          }}
        />

        <div className="relative z-10 pb-16 md:pb-20 px-6 md:px-12 max-w-6xl mx-auto w-full">
          <div className="mb-4">
            <span
              className="text-xs font-bold uppercase tracking-[0.3em] px-3 py-1.5 inline-block"
              style={{ background: "var(--naruto-orange)", color: "#0d0f14" }}
            >
              Developer Portfolio
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9]">
            <span className="block text-white text-impact">YATSUI</span>
            <span
              className="block text-brush text-4xl sm:text-5xl md:text-6xl lg:text-7xl mt-2"
              style={{ color: "var(--naruto-orange)" }}
            >
              忍の道
            </span>
          </h1>

          <p
            className="mt-4 text-sm md:text-base max-w-md"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            A shinobi of systems & data, focused on reliable software, clean
            architecture, and shipping real missions.
          </p>

          <div className="mt-6 flex items-center gap-4 flex-wrap">
            <Link href="/projects">
              <button
                className="px-7 py-3.5 font-bold text-sm uppercase tracking-wider cursor-pointer flex items-center gap-2"
                style={{
                  background: "var(--naruto-orange)",
                  color: "#0d0f14",
                  border: "none",
                }}
              >
                View missions
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </Link>
            <Link href="/about">
              <button
                className="px-7 py-3.5 font-bold text-sm uppercase tracking-wider cursor-pointer"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                  backdropFilter: "blur(10px)",
                }}
              >
                Shinobi ID
              </button>
            </Link>
            <a
              href="https://github.com/Yatsuiii"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="px-7 py-3.5 font-bold text-sm uppercase tracking-wider cursor-pointer"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.3)",
                }}
              >
                GitHub
              </button>
            </a>
          </div>
        </div>
      </section>

      {/* HUB — make the site feel interactive */}
      <section className="relative py-14 md:py-18">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/projects" className="group">
              <div
                className="p-6 md:p-7 transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid var(--naruto-orange)",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  任務掲示板
                </div>
                <div className="text-impact text-2xl text-white mt-2">Mission Board</div>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Filter by rank, open missions, and inspect the stack.
                </p>
              </div>
            </Link>

            <Link href="/experience" className="group">
              <div
                className="p-6 md:p-7 transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid #4a8fd4",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  経験記録
                </div>
                <div className="text-impact text-2xl text-white mt-2">Experience Log</div>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Timeline view — objectives, outcomes, and impact.
                </p>
              </div>
            </Link>

            <Link href="/about" className="group">
              <div
                className="p-6 md:p-7 transition-transform duration-300 group-hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                  borderLeft: "3px solid #c9a84c",
                }}
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  忍者登録
                </div>
                <div className="text-impact text-2xl text-white mt-2">Shinobi ID</div>
                <p className="text-sm mt-2" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Skills dashboard + featured missions.
                </p>
              </div>
            </Link>
          </div>

          <div className="mt-12">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(255,255,255,0.35)" }}>
                  Featured missions
                </span>
                <h2 className="text-impact text-3xl md:text-4xl text-white mt-2">
                  QUICK <span style={{ color: "var(--naruto-orange)" }}>LOOK</span>
                </h2>
              </div>
              <Link href="/projects" className="text-xs font-bold uppercase tracking-[0.3em]" style={{ color: "rgba(232,123,53,0.85)" }}>
                View all →
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-6">
              {featured.map((p) => (
                <a
                  key={p.title}
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderBottom: "1px solid rgba(255,255,255,0.06)",
                  }}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="text-[10px] font-black px-2 py-0.5"
                      style={{
                        background:
                          p.rank === "S"
                            ? "#8b1a1a"
                            : p.rank === "A"
                              ? "#e87b35"
                              : p.rank === "B"
                                ? "#2d5a8e"
                                : "#4a4a4a",
                        color: p.rank === "A" ? "#000" : "#fff",
                      }}
                    >
                      {p.rank}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "rgba(255,255,255,0.3)" }}>
                      {p.tags.slice(0, 2).join(" · ")}
                    </span>
                  </div>
                  <div
                    className="text-base font-bold text-white group-hover:text-orange-300 transition-colors"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {p.title}
                  </div>
                  <p className="text-xs mt-2 leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    {p.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* NINDO / QUOTE – simplified, no scroll hooks */}
      <section className="relative py-20 md:py-24 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/bg/battle-leap.webp"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "linear-gradient(to right, rgba(13,15,20,0.95) 0%, rgba(13,15,20,0.7) 45%, transparent 80%)",
          }}
        />

        <div className="relative z-10 px-6 md:px-12 max-w-5xl mx-auto w-full">
          <span
            className="text-brush text-5xl md:text-7xl block mb-4"
            style={{ color: "#d4a04a" }}
          >
            忍道
          </span>
          <div
            className="h-[1px] mb-6"
            style={{
              background: "linear-gradient(90deg, #d4a04a, transparent)",
              maxWidth: "220px",
            }}
          />
          <p
            className="text-base md:text-lg leading-relaxed italic"
            style={{ color: "rgba(255,255,255,0.8)" }}
          >
            &quot;I&apos;m not gonna run away. I never go back on my word.
            That&apos;s my nindo — my ninja way!&quot;
          </p>
          <p
            className="text-xs mt-4 font-bold uppercase tracking-[0.2em]"
            style={{ color: "rgba(255,255,255,0.4)" }}
          >
            — Naruto Uzumaki
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        className="py-10 px-6"
        style={{
          background: "var(--shinobi-ink)",
          borderTop: "1px solid rgba(255,255,255,0.04)",
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p
            className="text-xs font-bold uppercase tracking-wider"
            style={{ color: "rgba(255,255,255,0.25)" }}
          >
            Built with Next.js, React, and a bit of Will of Fire.
          </p>
          <p
            className="text-brush text-base"
            style={{ color: "rgba(255,255,255,0.2)" }}
          >
            火の意志を継ぐ者
          </p>
        </div>
      </footer>
    </div>
  );
}
