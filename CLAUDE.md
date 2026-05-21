# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**parent-resources-web** — A static website aggregating curated, faith-based resources for parents of teens. Standalone public site (not YCU-branded).

## Tech Stack

- **Astro** (static site generator)
- **Tailwind CSS v4** (styling, CSS-based config)
- **TypeScript** (strict mode)
- **Netlify** (hosting)

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
