export interface Mission {
  rank: "S" | "A" | "B" | "C";
  title: string;
  role: string;
  organization: string;
  period: string;
  objective: string;
  outcome: string;
  tags: string[];
}

export const missions: Mission[] = [
  {
    rank: "A",
    title: "Software Dev Intern — Pricing Analytics Squad",
    role: "Software Dev Intern",
    organization: "E‑commerce Startup (Internship)",
    period: "March 2025 — July 2025",
    objective:
      "Support a small data team by cleaning event data, building dashboards, and prototyping simple models that help the business pick better prices and campaigns.",
    outcome:
      "Shipped a set of Python notebooks + SQL queries that the team used weekly, plus a lightweight dashboard that surfaced top under‑performing SKUs and campaigns.",
    tags: ["Internship", "Python", "SQL", "LangChain", "RAG"],
  },
  {
    rank: "B",
    title: "College Project Lead — ML Capstone Team",
    role: "Team Lead / ML Engineer",
    organization: "University Capstone",
    period: "2024 — 2025",
    objective:
      "Lead a 4‑person team building an ML capstone project: split work, keep everyone unblocked, and make sure the final demo is solid instead of last‑minute chaos.",
    outcome:
      "Ran weekly stand‑ups, set up GitHub workflows, reviewed PRs, and kept scope realistic — the team delivered on time with a working model, clean repo, and clear presentation.",
    tags: ["Team Lead", "GitHub", "Agile-ish", "ML Project"],
  },
];
