# Parent Resources Website — Design Spec

## Overview

A standalone public website that aggregates curated, faith-based resources for parents of teens. Focused on helping Christian parents lead and guide their teenagers as they grow into adults.

## Tech Stack

- **Framework:** Astro (static site generator)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Netlify (static deployment)
- **Content:** JSON data files (no CMS, no backend)

## Page Structure

Single-page layout, top to bottom:

### Header
- Site name/logo
- Tagline: "Curated faith-based resources for parents of teens" (or similar)

### Hero Section
- Brief intro paragraph explaining what the site is and who it's for
- Warm, inviting tone

### Filter Bar
- Two rows of pill/tag buttons:
  - **Row 1 — Formats:** book, podcast, newsletter, website, app, video/course
  - **Row 2 — Topics:** faith & devotionals, relationships & dating, mental health, technology & screen time, character & values, college & career prep, parenting skills
- Clicking a pill filters the resource list in real-time
- "All" option to reset filters
- Multiple filters can be active (resources match ANY selected filter within a row, must match BOTH rows if both have selections)

### Resource Grid
- Responsive card layout: 1 column (mobile), 2 columns (tablet), 3 columns (desktop)
- Each card displays:
  - Resource name
  - Short description (2-3 lines)
  - Format & topic tags as small badges
  - Link button to the external resource

### Footer
- Simple tagline (e.g., "Built for parents, by parents")
- Link to suggest a resource (mailto or Google Form — lightweight precursor to community submissions)

## Data Model

### Resource (`src/data/resources.json`)

```json
[
  {
    "name": "All Pro Dad",
    "description": "Daily email devotionals and resources helping dads engage with their kids on topics of faith, character, and relationships.",
    "url": "https://www.allprodad.com",
    "formats": ["newsletter", "website"],
    "topics": ["faith & devotionals", "parenting skills"]
  }
]
```

Fields:
- `name` (string) — Display name of the resource
- `description` (string) — 1-2 sentence description
- `url` (string) — External link to the resource
- `formats` (string[]) — One or more from the format taxonomy
- `topics` (string[]) — One or more from the topic taxonomy

### Categories (`src/data/categories.ts`)

Defines the valid formats and topics as typed constants. Single source of truth for filter UI and data validation.

**Formats:** `book`, `podcast`, `newsletter`, `website`, `app`, `video/course`

**Topics:** `faith & devotionals`, `relationships & dating`, `mental health`, `technology & screen time`, `character & values`, `college & career prep`, `parenting skills`

## Starter Resources

| Resource | Formats | Topics |
|----------|---------|--------|
| All Pro Dad | newsletter, website | faith & devotionals, parenting skills |
| Young Christian University | app, website | faith & devotionals, college & career prep |
| Axis | newsletter, website | technology & screen time, parenting skills |
| The Bible App for Kids / YouVersion | app | faith & devotionals |
| Focus on the Family | podcast, website | faith & devotionals, relationships & dating, parenting skills |
| The Art of Manliness | podcast, book, website | character & values |
| Plugged In (Focus on the Family) | website | technology & screen time |
| Parenting Teens with Dr. Ken Ginsburg | book, podcast | mental health, parenting skills |
| Growing Up Social by Gary Chapman | book | technology & screen time, parenting skills |
| Age of Opportunity by Paul Tripp | book | faith & devotionals, character & values |

## Client-Side Interactivity

The only JS needed is for the filter bar. Implementation options:
- Inline `<script>` that toggles CSS classes to show/hide cards based on data attributes
- Small Astro island (e.g., Preact component) if filtering logic warrants a reactive framework

Preference: inline script to keep the bundle at zero framework JS.

## Project Files

```
src/
  data/
    resources.json      # Resource entries
    categories.ts       # Format & topic taxonomy
  layouts/
    Layout.astro        # Base HTML layout
  pages/
    index.astro         # Single page
  components/
    Header.astro        # Header with logo/tagline
    Hero.astro          # Intro section
    FilterBar.astro     # Format + topic filter pills
    ResourceGrid.astro  # Card grid
    ResourceCard.astro  # Individual card
    Footer.astro        # Footer
TODO.md                 # Future ideas (upvote/downvote, community submissions, etc.)
```

## Future Ideas (tracked in TODO.md)

- Upvote/downvote mechanism for resources
- Community-submitted resources (form + moderation)
- Headless CMS integration (Netlify CMS, Sanity, etc.)
- Individual resource detail pages
- Newsletter signup
- Search functionality
