# Ampledia Design System (DESIGN.md)

> Single Source of Truth for Ampledia (`rebrand-ampledia`) Design Tokens, Typography, Layout, Glow Physics, and Motion Rules.

---

## 1. Brand Identity & Principles
* **Name**: Ampledia
* **Tagline**: Digital | Creative | Growth
* **Brand Voice**: Authoritative, high-performance, refined, data-driven.
* **Core Rule**: Avoid AI design clichés (no warm cream/terracotta templates, no uniform rounded card sprawl, no scattered hover animations, no acid-green accents).

---

## 2. Color Palette & Tokens

| Token Name | Hex / CSS Value | Role & Usage |
| :--- | :--- | :--- |
| `--bg-canvas` | `#0A0614` | Main page background (deep void obsidian with subtle violet undertone) |
| `--surface-card` | `#1A0F33` | Primary container & card surface (deep royal amethyst) |
| `--surface-elevated` | `#241445` | Elevated interactive cards, dropdowns, popovers |
| `--surface-hover` | `#2D1959` | Hover state for surface cards |
| `--primary-core` | `#7C3AED` | Primary brand accent & main action buttons (electric violet) |
| `--primary-hover` | `#6D28D9` | Hover state for primary actions |
| `--accent-glow` | `#A855F7` | Focused optical illumination & highlight borders |
| `--text-primary` | `#F5F0FF` | Highest legibility content, titles, headlines (crisp lavender-white) |
| `--text-muted` | `#B7A9D6` | Secondary body text, descriptions, labels (soft dusky violet) |
| `--border-subtle` | `rgba(168, 85, 247, 0.14)` | Card and section divider borders |
| `--border-focused` | `rgba(168, 85, 247, 0.40)` | Interactive & highlighted border state |

---

## 3. Typography Rules

* **Display & Headings Font**: **Sora** (Google Font loaded via `next/font/google`).
  * Weights: `400` (Light/Normal), `600` (SemiBold), `700` (Bold).
  * Letter-spacing: `-0.03em` for display headlines, `-0.02em` for H2/H3.
  * Style: Sentence case (zero forced all-caps tracked labels).
* **Body & UI Font**: **Inter** (Google Font loaded via `next/font/google`).
  * Weights: `400` (Regular), `500` (Medium).
  * Line-height: `1.65` – `1.75` for relaxed readability.
  * Line-length: Maximum `75ch` on all reading text.

### Typographic Scale
* **Display / Hero H1**: `clamp(2.5rem, 6vw, 5.25rem)` / Line-height `1.08`
* **Section H2**: `clamp(2rem, 4.5vw, 3.5rem)` / Line-height `1.15`
* **Card H3**: `1.25rem – 1.75rem` / Line-height `1.3`
* **Body Large**: `1.125rem` (`18px`) / Line-height `1.7`
* **Body Regular**: `1rem` (`16px`) / Line-height `1.65`
* **Micro / Meta**: `0.8125rem` (`13px`) / Line-height `1.5`

---

## 4. Spacing & Border Radii

* **Spacing Grid**: Multiples of 4px / 8px.
  * Section padding: `py-16 sm:py-24 lg:py-32`
  * Container max-width: `1320px`
* **Border Radii System**:
  * CTAs / Primary Buttons: `9999px` (Pill button)
  * Inputs / Form elements: `0.75rem` (`12px`)
  * Standard Cards: `1.25rem` (`20px`)
  * Feature & Hero Panels: `1.75rem` (`28px`)

---

## 5. Glow Physics & Restraint Rules

> **STRICT RULE**: Glow is never used as random ambient background decoration. It is an intentional optical focus device.

* **Permitted Glow Targets**:
  1. **Primary CTAs**: `box-shadow: 0 0 24px -4px rgba(168, 85, 247, 0.45);`
  2. **Hero Feature Panel**: Concentrated perimeter highlight `0 0 32px -8px rgba(124, 58, 237, 0.35);`
  3. **Hovered Card Borders**: Transitioning from `rgba(168, 85, 247, 0.14)` to `rgba(168, 85, 247, 0.45)`.
* **Prohibited**: Floating colored blur orbs behind random sections that lower text contrast and create visual noise.

---

## 6. Motion & Animation Standards (GSAP)

* **Engine**: GSAP Core + ScrollTrigger (Zero Three.js / Canvas runtime overhead).
* **Smooth Scrolling**: Lenis connected directly to `ScrollTrigger.update`.
* **Signature Desktop Hero Timeline**:
  1. Single page-load sequence (fake cursor, headline text selection, "Copied" feedback, prompt injection, CTA pulse).
  2. Runs **once** on load, then hands complete control to the user.
* **Scroll Reveals**:
  * Clean, single-orchestrated staggered entrance (`stagger: 0.1`, `y: 24`, `opacity: 1`, `duration: 0.7`, `ease: "power2.out"`).
* **Reduced Motion Compliance**:
  * Whenever `prefers-reduced-motion: reduce` is active, all GSAP timelines immediately render elements at `progress(1)` with zero transition duration.

