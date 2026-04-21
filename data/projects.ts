export interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  stars?: number;
  rank: "S" | "A" | "B" | "C";
}

export const projects: Project[] = [
  {
    title: "ACE — API Causality Engine",
    description:
      "A production-grade, stateful API workflow testing engine built in Rust. State machine-driven scenarios, concurrent execution, JSONPath assertions, and CI/CD-ready reporting.",
    tags: ["Rust", "CLI", "Testing", "State Machines"],
    link: "https://github.com/Yatsuiii/api--causality-engine",
    stars: 1,
    rank: "S",
  },
  {
    title: "Fractured Perception",
    description:
      "A Rust-built roguelike with perception-based mechanics — AI-driven NPCs, dynamic field-of-view, dialogue systems, procedural map generation, and a custom game engine from scratch.",
    tags: ["Rust", "Game Dev", "AI", "Procedural Gen"],
    link: "https://github.com/Yatsuiii/fractured_perception",
    stars: 1,
    rank: "S",
  },
  {
    title: "Traffic Flow Prediction",
    description:
      "Deep learning pipeline for urban traffic flow forecasting using spatiotemporal models and real-world sensor data for intelligent transportation systems.",
    tags: ["Python", "Deep Learning", "Time Series", "ML"],
    link: "https://github.com/Yatsuiii/Traffic-Flow-Prediction",
    stars: 1,
    rank: "S",
  },
  {
    title: "LecAPI — Timetable Scheduler",
    description:
      "Automated timetable scheduling with conflict resolution, customizable constraints, and a Streamlit web interface. Generates optimal course schedules for university students.",
    tags: ["Python", "Algorithms", "Streamlit"],
    link: "https://github.com/Yatsuiii/TimeTable-Scheduling",
    stars: 1,
    rank: "A",
  },
  {
    title: "Wraith — AI Voice Assistant",
    description:
      "A voice-enabled AI assistant with Google Calendar integration, Gmail, real-time weather, Wikipedia search, and app launching. Multi-functional productivity through voice and text.",
    tags: ["Python", "AI", "Voice", "APIs"],
    link: "https://github.com/Yatsuiii/Wraith---An-Ai-Chatbot-",
    stars: 1,
    rank: "B",
  },
  {
    title: "Airline Delay Analysis",
    description:
      "Big data analysis on 120M+ flight records (1.6GB compressed) using Hadoop, Hive, and dimensional modeling to uncover delay patterns across carriers, airports, and time periods.",
    tags: ["Python", "Hadoop", "Hive", "Big Data"],
    link: "https://github.com/Yatsuiii/Airline-Analysis",
    stars: 1,
    rank: "B",
  },
  {
    title: "Shinobi Portfolio",
    description:
      "This interactive portfolio — scroll-pinned HUD, horizontal timeline, 3D transforms, and scroll-velocity effects. Built with Next.js, Framer Motion, and Tailwind.",
    tags: ["Next.js", "TypeScript", "Framer Motion"],
    link: "https://github.com/Yatsuiii/naruto-portfolio",
    rank: "B",
  },
];
