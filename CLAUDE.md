# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**parent-resources-web** — A static website aggregating curated, faith-based resources for parents of teens. Standalone public site (not YCU-branded).

## Tech Stack

- **Astro** (static site generator)
- **Tailwind CSS v4** (styling, CSS-based config)
- **TypeScript** (strict mode)
- **Netlify** (hosting)

## Git Workflow

- **Never push directly to main.** All changes must go on a feature branch.
- Open a PR to merge into main. No exceptions.
- Branch naming: `feat/<name>`, `fix/<name>`, `chore/<name>`

## Commands

- `npm run dev` — Start dev server (localhost:4321)
- `npm run build` — Production build (output: dist/)
- `npm run preview` — Preview production build locally
- `npx astro check` — TypeScript checking

## Architecture

Single-page static site. No backend, no CMS.

- Resource data lives in `src/data/resources.json` — add/edit resources here
- Categories (formats + topics) defined in `src/data/categories.ts` — single source of truth for taxonomy
- Client-side filtering via inline `<script>` in `index.astro` — no framework JS shipped
- Filter logic: ANY match within a category row, AND across rows

## Code Style & Astro Conventions

- **Component props:** Always type props using `interface Props` in the frontmatter
- **Component organization:** All components live in `src/components/`. One component per file.
- **Data files:** Static data in `src/data/`. Use TypeScript for typed exports, JSON for raw data.
- **Layouts:** Base HTML shells live in `src/layouts/`. Pages import a layout and fill slots.
- **Pages:** One file per route in `src/pages/`. Pages compose components — keep logic minimal.
- **Styles:** Tailwind utility classes preferred. Global CSS in `src/styles/global.css`. Avoid inline `<style>` blocks unless scoped styles are genuinely needed.
- **Client-side JS:** Prefer inline `<script>` over framework islands. Ship zero JS when possible.
- **Static assets:** Unprocessed files (fonts, icons) go in `public/`. Processed images go in `src/`.
- **TypeScript:** Strict mode. Use `as const` for constant arrays. Export types from data modules.
- **Astro check:** Run `npx astro check` before committing to catch type errors.
