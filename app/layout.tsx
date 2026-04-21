import type { Metadata } from "next";
import { Noto_Serif_JP, Outfit } from "next/font/google";
import "./globals.css";
import NinjaNav from "@/components/NinjaNav";

const displayFont = Noto_Serif_JP({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const bodyFont = Outfit({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Shinobi Portfolio — Ninja Developer",
  description:
    "A Naruto-themed developer portfolio showcasing missions, skills, and the way of the code shinobi.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col relative" style={{ background: "var(--shinobi-ink)" }}>
        {/* Noise overlay */}
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
          <div className="noise-overlay" />
        </div>

        {/* Navigation */}
        <NinjaNav />

        {/* Main content */}
        <main className="relative z-10 flex-1">{children}</main>
      </body>
    </html>
  );
}
