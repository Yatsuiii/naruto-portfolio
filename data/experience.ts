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
    title: "Software Development Intern",
    role: "Software Development Intern",
    organization: "Devyutt Softeck Ltd., Jaipur, India",
    period: "March 2025 — July 2025",
    objective:
      "Build the backend for a client dashboard and reporting module — handle data aggregation, business logic, and end-to-end delivery from schema design to deployment.",
    outcome:
      "Shipped REST API endpoints in FastAPI powering the dashboard and reports. Worked inside a project-based delivery model with version control, code reviews, and CI/CD pipelines.",
    tags: ["FastAPI", "Python", "REST APIs", "CI/CD"],
  },
  {
    rank: "B",
    title: "Technical Team Lead, Student Leadership",
    role: "Technical Team Lead",
    organization: "Manipal University Jaipur",
    period: "June 2022 — August 2023",
    objective:
      "Lead student teams delivering college-level software projects: coordinate task distribution, run technical reviews, and keep iterative delivery on track.",
    outcome:
      "Led 3+ teams to delivery. Set up code review and Git workflows, mentored peers on Python and ML basics, and kept scope realistic so projects shipped on time with working demos.",
    tags: ["Team Lead", "Mentorship", "GitHub", "Python"],
  },
];
