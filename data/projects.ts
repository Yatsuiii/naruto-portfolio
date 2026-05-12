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
    title: "BrainConnect-ASD",
    description:
      "Adversarial GCN with Gradient Reversal Layer for cross-site ASD detection from resting-state fMRI. Mean AUC 0.7872 across 20 leave-one-site-out splits on 1,102 ABIDE subjects. Paired with a Qwen2.5-7B fine-tune for clinical report generation. Trained on AMD MI300X for the AMD Developer Hackathon 2026. Two models published on HuggingFace.",
    tags: ["PyTorch", "GCN", "LLM Fine-tuning", "Qwen2.5-7B", "HuggingFace", "AMD MI300X"],
    link: "https://huggingface.co/Yatsuiii/brain-connect-gcn",
    rank: "S",
  },
  {
    title: "LLMTrace",
    description:
      "Self-hosted Go reverse proxy for LLM API traffic that records per-call telemetry into a SQLite ledger, detects spend anomalies with a 7-day rolling baseline + sigma thresholding, and runs a multi-tool Gemini agent that autonomously investigates anomalies and attributes them to specific deploys with a confidence score.",
    tags: ["Go", "Gemini SDK", "SQLite", "Anomaly Detection", "AI Agent"],
    link: "https://github.com/Yatsuiii/llmtrace",
    rank: "S",
  },
  {
    title: "ACE — API Causality Engine",
    description:
      "Production-grade Rust CLI that models multi-step API workflows as state machines in YAML, validates the full DAG before execution, and diffs traces across environments to surface root-cause divergence. Concurrent step execution, retry, circuit-break, A/B routing. Distributed via Homebrew, Docker (GHCR), and cross-platform binaries via GitHub Actions.",
    tags: ["Rust", "CLI", "State Machines", "CI/CD", "Open Source"],
    link: "https://github.com/Yatsuiii/api--causality-engine",
    rank: "S",
  },
  {
    title: "CostTrace",
    description:
      "Go CLI that correlates AWS cost anomalies to GitHub Actions deploys via CloudTrail resource creation events. Statistical anomaly detection (7-day rolling baseline + stddev threshold), multi-signal confidence scoring across resource match, principal identity, and temporal proximity. 30 days of cost + deploy data analyzed in one command, no tagging required.",
    tags: ["Go", "AWS", "CloudTrail", "Anomaly Detection", "CLI"],
    link: "https://github.com/Yatsuiii/costtrace",
    rank: "A",
  },
  {
    title: "Fractured Perception",
    description:
      "Rust game project exploring perception-based mechanics — players experience the same world through different sensory constraints, with hidden state tracking and divergent endings.",
    tags: ["Rust", "Game Dev", "Systems"],
    link: "https://github.com/Yatsuiii/fractured_perception",
    rank: "A",
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
