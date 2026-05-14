# Naruto Portfolio

A Naruto-themed developer portfolio built with Next.js, TypeScript, and Framer Motion.

This site presents your work as a stylized "mission board" instead of a generic card grid. The visual direction is intentional: manga-inspired UI, themed navigation, motion-heavy transitions, and a custom content model for projects and experience.

## Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Framer Motion

## Highlights

- Custom Naruto-inspired visual system instead of a standard portfolio template
- Mission-board project browsing with rank labels and structured metadata
- Dedicated About, Projects, and Experience pages
- Animated hero, HUD-style UI, scroll reveals, and transition effects
- Data-driven content via `data/projects.ts` and `data/experience.ts`

## Local Development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

```text
app/          App Router pages
components/   Reusable themed UI components
data/         Portfolio content
public/       Static assets
```

## Purpose

This repo is the presentation layer for the rest of the portfolio. Its job is not to be a template demo; it is to package backend, ML, and systems work in a more distinctive format.
