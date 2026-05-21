# Parent Resources Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page static website that displays a filterable grid of curated, faith-based resources for parents of teens.

**Architecture:** Astro static site with Tailwind CSS, resource data in JSON, categories in TypeScript, client-side filtering via inline script, deployed to Netlify.

**Tech Stack:** Astro, Tailwind CSS, TypeScript, Netlify

**Spec:** `docs/superpowers/specs/2026-05-21-parent-resources-site-design.md`

---

### Task 1: Scaffold Astro project with Tailwind

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/pages/index.astro`, `src/layouts/Layout.astro`, `netlify.toml`

- [ ] **Step 1: Create Astro project**

Run from the repo root (which already has README.md and docs/):

```bash
npm create astro@latest . -- --template minimal --install --no-git --typescript strict
```

Use `--no-git` since the repo already has git. The `.` tells it to scaffold into the current directory.

- [ ] **Step 2: Add Tailwind integration**

```bash
npx astro add tailwind -y
```

This installs `@astrojs/tailwind` and `tailwindcss`, and updates `astro.config.mjs` automatically.

- [ ] **Step 3: Add Netlify adapter config**

Create `netlify.toml` at the repo root:

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

- [ ] **Step 4: Update Layout.astro with base HTML and Tailwind**

Replace the contents of `src/layouts/Layout.astro`:

```astro
---
interface Props {
  title: string;
}

const { title } = Astro.props;
---

<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="description" content="Curated faith-based resources for parents of teens" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>{title}</title>
  </head>
  <body class="min-h-screen bg-stone-50 text-stone-800 font-sans">
    <slot />
  </body>
</html>
```

- [ ] **Step 5: Update index.astro to use Layout**

Replace `src/pages/index.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
---

<Layout title="Parent Resources — Faith-Based Resources for Parents of Teens">
  <main class="max-w-6xl mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold">Coming soon</h1>
  </main>
</Layout>
```

- [ ] **Step 6: Verify dev server runs**

```bash
npm run dev
```

Expected: Dev server starts at `localhost:4321`, page shows "Coming soon" with Tailwind styling applied (stone background, sans font).

- [ ] **Step 7: Verify build works**

```bash
npm run build
```

Expected: Build completes, output in `dist/` directory.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with Tailwind and Netlify config"
```

---

### Task 2: Data layer — categories and resources

**Files:**
- Create: `src/data/categories.ts`
- Create: `src/data/resources.json`

- [ ] **Step 1: Create categories.ts**

Create `src/data/categories.ts`:

```typescript
export const formats = [
  "book",
  "podcast",
  "newsletter",
  "website",
  "app",
  "video/course",
] as const;

export type Format = (typeof formats)[number];

export const topics = [
  "faith & devotionals",
  "relationships & dating",
  "mental health",
  "technology & screen time",
  "character & values",
  "college & career prep",
  "parenting skills",
] as const;

export type Topic = (typeof topics)[number];

export interface Resource {
  name: string;
  description: string;
  url: string;
  formats: Format[];
  topics: Topic[];
}
```

- [ ] **Step 2: Create resources.json**

Create `src/data/resources.json`:

```json
[
  {
    "name": "All Pro Dad",
    "description": "Daily email devotionals and resources helping dads engage with their kids on topics of faith, character, and relationships.",
    "url": "https://www.allprodad.com",
    "formats": ["newsletter", "website"],
    "topics": ["faith & devotionals", "parenting skills"]
  },
  {
    "name": "Young Christian University",
    "description": "An app and platform equipping young adults with Christ-centered teaching on faith, purpose, and real-world skills.",
    "url": "https://ycu.app",
    "formats": ["app", "website"],
    "topics": ["faith & devotionals", "college & career prep"]
  },
  {
    "name": "Axis",
    "description": "Helps parents understand and navigate teen culture through conversation-starting guides, newsletters, and cultural trend reports.",
    "url": "https://axis.org",
    "formats": ["newsletter", "website"],
    "topics": ["technology & screen time", "parenting skills"]
  },
  {
    "name": "YouVersion Bible App",
    "description": "Free Bible app with reading plans, devotionals, and audio Bibles — includes content designed for teens and families.",
    "url": "https://www.youversion.com",
    "formats": ["app"],
    "topics": ["faith & devotionals"]
  },
  {
    "name": "Focus on the Family",
    "description": "Comprehensive Christian ministry offering podcasts, articles, and tools for navigating parenting, relationships, and faith.",
    "url": "https://www.focusonthefamily.com",
    "formats": ["podcast", "website"],
    "topics": ["faith & devotionals", "relationships & dating", "parenting skills"]
  },
  {
    "name": "The Art of Manliness",
    "description": "Podcast, articles, and books exploring character, virtue, and practical skills — great for dads raising teen boys.",
    "url": "https://www.artofmanliness.com",
    "formats": ["podcast", "book", "website"],
    "topics": ["character & values"]
  },
  {
    "name": "Plugged In",
    "description": "Focus on the Family's entertainment review site — helps parents make informed decisions about movies, TV, music, and games.",
    "url": "https://www.pluggedin.com",
    "formats": ["website"],
    "topics": ["technology & screen time"]
  },
  {
    "name": "Parenting Teens with Dr. Ken Ginsburg",
    "description": "Evidence-based guidance on building resilience in teens, balancing protection with trust, and supporting mental health.",
    "url": "https://parentandteen.com",
    "formats": ["book", "podcast"],
    "topics": ["mental health", "parenting skills"]
  },
  {
    "name": "Growing Up Social by Gary Chapman",
    "description": "Practical book helping parents teach kids to navigate screens and social media while building real-world relationships.",
    "url": "https://www.5lovelanguages.com",
    "formats": ["book"],
    "topics": ["technology & screen time", "parenting skills"]
  },
  {
    "name": "Age of Opportunity by Paul Tripp",
    "description": "A biblical framework for understanding the teen years as a window of opportunity for gospel-centered parenting.",
    "url": "https://www.paultripp.com",
    "formats": ["book"],
    "topics": ["faith & devotionals", "character & values"]
  }
]
```

- [ ] **Step 3: Verify TypeScript is happy**

```bash
npx astro check
```

Expected: No errors related to the data files.

- [ ] **Step 4: Commit**

```bash
git add src/data/categories.ts src/data/resources.json
git commit -m "feat: add resource data and category taxonomy"
```

---

### Task 3: Header and Hero components

**Files:**
- Create: `src/components/Header.astro`
- Create: `src/components/Hero.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Header.astro**

Create `src/components/Header.astro`:

```astro
<header class="bg-white border-b border-stone-200">
  <div class="max-w-6xl mx-auto px-4 py-6">
    <h1 class="text-2xl font-bold text-stone-900">Parent Resources</h1>
    <p class="text-stone-500 mt-1">Curated faith-based resources for parents of teens</p>
  </div>
</header>
```

- [ ] **Step 2: Create Hero.astro**

Create `src/components/Hero.astro`:

```astro
<section class="max-w-6xl mx-auto px-4 py-12">
  <div class="max-w-2xl">
    <h2 class="text-3xl font-bold text-stone-900 mb-4">
      Guiding your teen with faith and confidence
    </h2>
    <p class="text-lg text-stone-600 leading-relaxed">
      Raising teenagers is one of the most rewarding — and challenging — things
      you'll ever do. We've gathered the best books, podcasts, newsletters, and
      tools to help Christian parents lead their teens through these pivotal years.
    </p>
  </div>
</section>
```

- [ ] **Step 3: Update index.astro to use Header and Hero**

Replace `src/pages/index.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
---

<Layout title="Parent Resources — Faith-Based Resources for Parents of Teens">
  <Header />
  <Hero />
  <main class="max-w-6xl mx-auto px-4 pb-16">
    <p class="text-stone-500">Resources coming next...</p>
  </main>
</Layout>
```

- [ ] **Step 4: Verify in browser**

```bash
npm run dev
```

Expected: Page shows header with site name/tagline, hero section with intro copy, and placeholder text.

- [ ] **Step 5: Commit**

```bash
git add src/components/Header.astro src/components/Hero.astro src/pages/index.astro
git commit -m "feat: add Header and Hero components"
```

---

### Task 4: ResourceCard component

**Files:**
- Create: `src/components/ResourceCard.astro`

- [ ] **Step 1: Create ResourceCard.astro**

Create `src/components/ResourceCard.astro`:

```astro
---
import type { Resource } from "../data/categories";

interface Props {
  resource: Resource;
}

const { resource } = Astro.props;
---

<div
  class="bg-white rounded-lg border border-stone-200 p-5 flex flex-col"
  data-formats={JSON.stringify(resource.formats)}
  data-topics={JSON.stringify(resource.topics)}
>
  <h3 class="text-lg font-semibold text-stone-900 mb-2">{resource.name}</h3>
  <p class="text-stone-600 text-sm mb-4 flex-1">{resource.description}</p>
  <div class="flex flex-wrap gap-1.5 mb-4">
    {resource.formats.map((format) => (
      <span class="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
        {format}
      </span>
    ))}
    {resource.topics.map((topic) => (
      <span class="text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
        {topic}
      </span>
    ))}
  </div>
  <a
    href={resource.url}
    target="_blank"
    rel="noopener noreferrer"
    class="text-sm font-medium text-blue-700 hover:text-blue-900 hover:underline"
  >
    Visit resource &rarr;
  </a>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/ResourceCard.astro
git commit -m "feat: add ResourceCard component"
```

---

### Task 5: ResourceGrid component and wire into index

**Files:**
- Create: `src/components/ResourceGrid.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create ResourceGrid.astro**

Create `src/components/ResourceGrid.astro`:

```astro
---
import type { Resource } from "../data/categories";
import ResourceCard from "./ResourceCard.astro";

interface Props {
  resources: Resource[];
}

const { resources } = Astro.props;
---

<div id="resource-grid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
  {resources.map((resource) => (
    <ResourceCard resource={resource} />
  ))}
</div>
```

- [ ] **Step 2: Update index.astro to load data and render grid**

Replace `src/pages/index.astro`:

```astro
---
import Layout from "../layouts/Layout.astro";
import Header from "../components/Header.astro";
import Hero from "../components/Hero.astro";
import ResourceGrid from "../components/ResourceGrid.astro";
import type { Resource } from "../data/categories";
import resourceData from "../data/resources.json";

const resources = resourceData as Resource[];
---

<Layout title="Parent Resources — Faith-Based Resources for Parents of Teens">
  <Header />
  <Hero />
  <main class="max-w-6xl mx-auto px-4 pb-16">
    <ResourceGrid resources={resources} />
  </main>
</Layout>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Page shows header, hero, and a responsive grid of 10 resource cards. Each card shows name, description, format/topic badges, and a link. Grid is 1 col on mobile, 2 on tablet, 3 on desktop.

- [ ] **Step 4: Commit**

```bash
git add src/components/ResourceGrid.astro src/pages/index.astro
git commit -m "feat: add ResourceGrid and wire up resource data on index page"
```

---

### Task 6: FilterBar component

**Files:**
- Create: `src/components/FilterBar.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create FilterBar.astro**

Create `src/components/FilterBar.astro`:

```astro
---
import { formats, topics } from "../data/categories";
---

<div id="filter-bar" class="mb-8 space-y-4">
  <div>
    <h3 class="text-sm font-medium text-stone-500 mb-2">Format</h3>
    <div class="flex flex-wrap gap-2">
      <button
        class="filter-pill active text-sm px-3 py-1.5 rounded-full border border-stone-300 bg-stone-900 text-white transition-colors"
        data-filter-type="format"
        data-filter-value="all"
      >
        All
      </button>
      {formats.map((format) => (
        <button
          class="filter-pill text-sm px-3 py-1.5 rounded-full border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors"
          data-filter-type="format"
          data-filter-value={format}
        >
          {format}
        </button>
      ))}
    </div>
  </div>
  <div>
    <h3 class="text-sm font-medium text-stone-500 mb-2">Topic</h3>
    <div class="flex flex-wrap gap-2">
      <button
        class="filter-pill active text-sm px-3 py-1.5 rounded-full border border-stone-300 bg-stone-900 text-white transition-colors"
        data-filter-type="topic"
        data-filter-value="all"
      >
        All
      </button>
      {topics.map((topic) => (
        <button
          class="filter-pill text-sm px-3 py-1.5 rounded-full border border-stone-300 bg-white text-stone-700 hover:bg-stone-100 transition-colors"
          data-filter-type="topic"
          data-filter-value={topic}
        >
          {topic}
        </button>
      ))}
    </div>
  </div>
</div>
```

- [ ] **Step 2: Add FilterBar to index.astro**

In `src/pages/index.astro`, add the import and place FilterBar above ResourceGrid:

Add import:
```astro
import FilterBar from "../components/FilterBar.astro";
```

In the `<main>` tag, add `<FilterBar />` before `<ResourceGrid>`:
```astro
  <main class="max-w-6xl mx-auto px-4 pb-16">
    <FilterBar />
    <ResourceGrid resources={resources} />
  </main>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Filter pills appear above the grid in two rows (Format and Topic). Both rows show "All" as the active (dark) pill. Clicking pills doesn't filter yet — that comes in the next task.

- [ ] **Step 4: Commit**

```bash
git add src/components/FilterBar.astro src/pages/index.astro
git commit -m "feat: add FilterBar component with format and topic pills"
```

---

### Task 7: Client-side filtering logic

**Files:**
- Modify: `src/pages/index.astro` (add inline `<script>`)

- [ ] **Step 1: Add filtering script to index.astro**

Add the following `<script>` block at the bottom of `src/pages/index.astro`, after the closing `</Layout>` tag:

```astro
<script>
  const filterBar = document.getElementById("filter-bar")!;
  const cards = document.querySelectorAll<HTMLElement>("#resource-grid > div");

  const activeFilters: { format: Set<string>; topic: Set<string> } = {
    format: new Set(),
    topic: new Set(),
  };

  function updatePillStyles() {
    filterBar.querySelectorAll<HTMLElement>(".filter-pill").forEach((pill) => {
      const type = pill.dataset.filterType as "format" | "topic";
      const value = pill.dataset.filterValue!;
      const isAllButton = value === "all";
      const activeSet = activeFilters[type];
      const isActive = isAllButton ? activeSet.size === 0 : activeSet.has(value);

      if (isActive) {
        pill.classList.add("bg-stone-900", "text-white");
        pill.classList.remove("bg-white", "text-stone-700");
      } else {
        pill.classList.remove("bg-stone-900", "text-white");
        pill.classList.add("bg-white", "text-stone-700");
      }
    });
  }

  function filterCards() {
    cards.forEach((card) => {
      const cardFormats: string[] = JSON.parse(card.dataset.formats || "[]");
      const cardTopics: string[] = JSON.parse(card.dataset.topics || "[]");

      const matchesFormat =
        activeFilters.format.size === 0 ||
        cardFormats.some((f) => activeFilters.format.has(f));
      const matchesTopic =
        activeFilters.topic.size === 0 ||
        cardTopics.some((t) => activeFilters.topic.has(t));

      card.style.display = matchesFormat && matchesTopic ? "" : "none";
    });
  }

  filterBar.addEventListener("click", (e) => {
    const pill = (e.target as HTMLElement).closest<HTMLElement>(".filter-pill");
    if (!pill) return;

    const type = pill.dataset.filterType as "format" | "topic";
    const value = pill.dataset.filterValue!;

    if (value === "all") {
      activeFilters[type].clear();
    } else if (activeFilters[type].has(value)) {
      activeFilters[type].delete(value);
    } else {
      activeFilters[type].add(value);
    }

    updatePillStyles();
    filterCards();
  });
</script>
```

- [ ] **Step 2: Verify filtering works in browser**

```bash
npm run dev
```

Test the following scenarios:

1. Click "book" format pill — only resources with `book` format are shown (Art of Manliness, Parenting Teens, Growing Up Social, Age of Opportunity)
2. Click "podcast" format pill too — resources with `book` OR `podcast` are shown
3. Click "faith & devotionals" topic pill — only resources matching both (format: book or podcast) AND (topic: faith & devotionals) are shown
4. Click "All" on formats row — format filter clears, only topic filter applies
5. Click "All" on topics row — all resources visible again

- [ ] **Step 3: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: add client-side filtering for format and topic pills"
```

---

### Task 8: Footer component

**Files:**
- Create: `src/components/Footer.astro`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Create Footer.astro**

Create `src/components/Footer.astro`:

```astro
<footer class="border-t border-stone-200 mt-16">
  <div class="max-w-6xl mx-auto px-4 py-8 text-center text-sm text-stone-500">
    <p>Built for parents, by parents.</p>
    <p class="mt-2">
      Know a great resource?
      <a
        href="mailto:suggest@example.com"
        class="text-blue-700 hover:underline"
      >
        Suggest it here
      </a>
    </p>
  </div>
</footer>
```

Note: Replace `suggest@example.com` with the actual email address during implementation.

- [ ] **Step 2: Add Footer to index.astro**

In `src/pages/index.astro`, add the import:
```astro
import Footer from "../components/Footer.astro";
```

Add `<Footer />` after `</main>` but before `</Layout>`:
```astro
  </main>
  <Footer />
</Layout>
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Footer appears at the bottom with tagline and suggest link.

- [ ] **Step 4: Commit**

```bash
git add src/components/Footer.astro src/pages/index.astro
git commit -m "feat: add Footer component with resource suggestion link"
```

---

### Task 9: TODO.md and final build verification

**Files:**
- Create: `TODO.md`
- Modify: `CLAUDE.md`

- [ ] **Step 1: Create TODO.md**

Create `TODO.md` at the repo root:

```markdown
# TODO

Future ideas for Parent Resources.

## Features
- [ ] Upvote/downvote mechanism for resources
- [ ] Community-submitted resources (form + moderation flow)
- [ ] Search/text filtering
- [ ] Newsletter signup
- [ ] Individual resource detail pages

## Infrastructure
- [ ] Headless CMS integration (Netlify CMS, Sanity, etc.)
- [ ] Netlify Forms for resource suggestions (replace mailto link)
- [ ] Analytics (Plausible, Fathom, or similar privacy-respecting)
```

- [ ] **Step 2: Update CLAUDE.md with project details**

Replace `CLAUDE.md` with updated content reflecting the built project:

```markdown
# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**parent-resources-web** — A static website aggregating curated, faith-based resources for parents of teens. Standalone public site (not YCU-branded).

## Tech Stack

- **Astro** (static site generator)
- **Tailwind CSS** (styling)
- **TypeScript**
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
```

- [ ] **Step 3: Run full build and verify**

```bash
npm run build
```

Expected: Clean build, no errors, output in `dist/`.

```bash
npm run preview
```

Expected: Site loads at preview URL, all sections render, filtering works.

- [ ] **Step 4: Commit**

```bash
git add TODO.md CLAUDE.md
git commit -m "feat: add TODO.md and update CLAUDE.md with project documentation"
```
