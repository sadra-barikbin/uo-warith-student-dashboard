# Handoff: Student Academic Dashboard — University of Warith Al-Anbiyaa

## Overview
A single-page **student academic dashboard** for the University of Warith Al-Anbiyaa (جامعة وارث الأنبياء). It gives a logged-in undergraduate a personalized overview of their academic standing: GPA, class rank, earned credits, academic status, an AI advisor card, a GPA trend chart, a percentile gauge, enrolled-course progress, a grade-distribution histogram, a weekly schedule, and announcements.

The interface is **right-to-left (RTL) Arabic**. All copy is in Arabic. It applies the **university color identity: deep royal blue + gold on white**, and ships with both a dark and a light theme.

## About the Design Files
The files in this bundle are **design references created in HTML** — a working prototype showing the intended look, layout, and behavior. They are **not production code to copy directly.**

The HTML uses a small in-house templating runtime (`support.js`, a custom `<x-dc>` web component). **Do not port `support.js` or the `.dc.html` structure** — it exists only to make the prototype run in the design tool.

Your task is to **recreate this design in the target codebase's existing environment** (React, Vue, Svelte, etc.) using its established component patterns, charting library, and conventions. If no environment exists yet, choose an appropriate stack. Treat the HTML as the visual + behavioral spec; rebuild the markup as idiomatic components in the target framework.

## Fidelity
**High-fidelity (hifi).** Final colors, typography, spacing, layout, and interactions are all specified below and present in the prototype. Recreate the UI pixel-faithfully using the codebase's existing libraries.

> ⚠️ **Two things to confirm before/while building** (flagged by the designer):
> 1. **Brand hex values are inferred.** The blue and gold below were derived from the university's visual identity, not an official brand guide. If an official palette exists, substitute the exact hex values — every other color derives from these two.
> 2. **All data is mock/placeholder.** Student name, GPA, courses, grades, schedule, and announcements are hard-coded dummy values. Wire these to real data sources.

---

## Global Layout

- Root: `display:flex; min-height:100vh; direction:rtl`. Background is `radial-gradient(1200px 600px at 20% -10%, var(--accent-glow), transparent 60%)` layered over `--bg`.
- **Sidebar** (`<aside>`): fixed `width:256px`, `flex-shrink:0`, on the **right** (RTL), `border-left:1px solid --bd`, `padding:24px 18px`, sticky, full viewport height, `background:--sidebar-bg`. Vertical flex, `gap:28px`.
- **Main** (`<main>`): `flex:1; min-width:0; padding:26px 32px`, vertical flex, `gap:22px`. Mount animation `dashIn` (fade + 8px rise, 0.4s ease).
- Font family: `'IBM Plex Sans Arabic', system-ui, sans-serif` for UI/Arabic text; `'Space Grotesk'` for large numerals; `'IBM Plex Mono'` for codes, times, and axis labels. Loaded from Google Fonts (weights 400/500/600/700).
- `-webkit-font-smoothing:antialiased`.

### Responsive breakpoints
- `≤1080px`: two-column content grids collapse to single column (`[data-grid]`).
- `≤860px`: sidebar hidden; main padding → 18px; stat grid → 2 columns; hero stacks vertically.
- `≤520px`: stat grid → 1 column.

---

## Screens / Views

There is **one screen** (the overview dashboard). The sidebar nav items (نظرة عامة / الأداء / المقررات / الجدول / الدرجات / السجل الأكاديمي) set an active state but only the **Overview** (نظرة عامة) view is designed. Build the others as routes later.

### Sidebar
- **Brand block** (top): 34×52px logo (SVG, see Assets) + two lines — `وارث الأنبياء` (700, 15px) and `جامعة · كربلاء` (11px, `--muted`). Gap 13px.
- **Nav** (`gap:4px`): a `القائمة` section label (10.5px, 600, `--faint`, letter-spacing .5px), then 6 buttons. Each button: `display:flex; align-items:center; gap:12px; width:100%; padding:10px 12px; border-radius:10px; font:500 13.5px; text-align:start`. Active = `background:--accent-12; color:--text-strong`. Inactive = `background:transparent; color:--muted`. Each has an 18px stroked SVG icon (1.7 stroke). Transition `background .15s, color .15s`.
- **User card** (bottom, `margin-top:auto`): `padding:11px; border-radius:12px; border:1px solid --bd; background:--ov`. Avatar 38×38, `border-radius:10px`, `linear-gradient(145deg,--av-1,--av-2)`, initials `ز ح` (600/14px, `--on-tint`). Name `زينب الحسيني` (13px/600), subtitle `بكالوريوس علوم الحاسوب` (11px, `--muted`), both truncated.

### Topbar (`<header>`)
- Left of flow: title `نظرة عامة` (700/22px) + date line `الجمعة، 27 حزيران · الفصل الثاني 2026` (13px, `--muted`).
- Right cluster (`gap:10px`): theme-toggle button (sun/moon, 40×40), term selector pill `الفصل الثاني 2026 ▾`, search button (40×40), notification bell (40×40) with a badge (`--accent` bg, `--on-accent` text, top-left, count = unread), and a 40×40 avatar. All 40×40 controls: `border-radius:10px; border:1px solid --bd-3; background:--ov; color:--muted-s`.

### Hero section (`[data-hero]`, flex, gap 20px)
- **Greeting card** (`flex:1`): `border-radius:18px; border:1px solid --bd; background:linear-gradient(225deg, --accent-12, --hero-ov 55%); padding:24px`. Contains: eyebrow `صباح الخير، زينب` (13px/600, `--accent`); headline (25px/700, line-height 1.4) with `السابع` wrapped in `color:--accent`; body paragraph (13.5px, `--muted-s`, line-height 1.7).
- **Stat grid** (`[data-stats]`, `flex:1.35`, 2×2, gap 14px). Four cards, each `border-radius:16px; padding:18px`:
  1. **المعدل التراكمي** (GPA): value `3.78` (Space Grotesk 30/600) + green delta `▲ 0.04` (`--pos`); sub `مقابل 3.74 الفصل الماضي · من 4.00`.
  2. **الترتيب على الدفعة** (rank) — *highlighted card*: `border:1px solid --accent-22; background:linear-gradient(200deg,--accent-12,--surface 70%)`. Value `#7` (`--accent`) + `الأعلى 5%` (`--on-tint`); sub `من 142 في علوم الحاسوب`. Label color `--accent-label`.
  3. **الوحدات المكتسبة** (credits): `84` + `/120` (mono, `--muted`); progress bar 6px, `background:--track`, fill `width:70%`, `background:linear-gradient(90deg,--accent,--accent2)` (blue→gold).
  4. **الوضع الأكاديمي** (status): pulse dot 9px (`--pos`, ring `box-shadow:0 0 0 4px --pos-soft`) + `قائمة العميد` (19px/700); sub `3 فصول متتالية · وضع جيّد`.

### AI advisor card (`ذكاء الوارث`) — toggleable via `showAI`
- `position:relative; overflow:hidden; border-radius:18px; border:1px solid --accent-22; background:linear-gradient(120deg, --accent-12, --surface-2 45%, --surface); padding:24px`. A decorative blurred radial orb top-left.
- 52×52 gradient icon tile (`linear-gradient(145deg,--accent,--accent2)`, shadow `0 8px 24px --accent-shadow`) with a floating animation `orbFloat` (4s, ±6px). Sparkle SVG in `--on-accent`.
- Title `ذكاء الوارث` (18/700) + badge `توصية جديدة` (`--accent` on `--accent-12`, border `--accent-22`) + `مساعد الجامعة الذكي`.
- Body paragraph (14px, `--text-2`, line-height 1.85) with several `--text-strong`/`--accent` inline emphases.
- Three suggestion chips in an auto-fit grid (min 220px, gap 10px): each `padding:12px 13px; border-radius:11px; background:--ov-3; border:1px solid --bd-2`, a 17px icon + 12.5px `--text-3` text.
- Footer row: caption (11.5px, `--muted`) + CTA button `عرض الخطة الكاملة` (`background:--accent; color:--on-accent; border-radius:10px; padding:9px 16px; 600/13px`) with a back-arrow icon. Top border `1px solid --bd`.

### Row A — GPA trend + percentile gauge (`[data-grid]`, `2fr 1fr`, gap 20px)
- **GPA trend card**: title `اتجاه المعدل التراكمي` + sub. Inline-legend pill `تراكمي` with an `--accent` dot. SVG line+area chart, `viewBox 0 0 560 200`:
  - 6 data points over 6 terms, GPA range mapped min 3.3 → max 3.9 across y 160→22, x 524→46 (**RTL: oldest on the right, newest on the left**).
  - Horizontal gridlines at 3.40/3.55/3.70/3.85 (`stroke:--bd`) with mono labels.
  - Area fill = `url(#gpaFill)` vertical gradient of `--accent` (0.28 → 0 opacity). Line `stroke:--accent; stroke-width:2.4`.
  - Point markers: `r:4`, `fill:--bg`, `stroke:--accent`. Last point gets a 6.5 halo ring (opacity .4) and a value label (Space Grotesk 12.5/600, `--text-strong`).
  - Term labels under axis (mono 11px, `--muted`): خ23, ر24, خ24, ر25, خ25, ر26.
- **Percentile gauge card** (flex column): title `المئوية على الدفعة` + sub. Donut gauge `viewBox 0 0 160 160`: track circle `r:64; stroke:--track; stroke-width:13`; value arc same radius `stroke:--accent`, `stroke-dasharray` = `0.95 × 2πr`, rotated −90°, round caps. Center text `#7` (34/600) + `الأعلى 5% · من 142` (11.5px, `--muted`). Footer (top border): `متوسط الدفعة 3.21` and `فارقكِ +0.57` (`--pos`).

### Row B — courses + grade distribution (`[data-grid]`, `2fr 1fr`, gap 20px)
- **Enrolled courses card**: header with title `المقررات المسجَّلة`, a meta line (`{sub} · معدل الفصل {gpa} · {credits}`), and two term tabs (`الفصل الثاني 2026` / `الفصل الأول 2025`). Active tab: `border:1px solid --accent-22; background:--accent-12; color:--text-strong`.
  - Course rows (`gap:9px`), each `padding:12px; border-radius:12px; border:1px solid --bd-2; background:--ov-s; display:flex; align-items:center; gap:14px`:
    - Code (62px, mono 12.5px, `--muted-s`, `direction:ltr`, centered).
    - Name (13.5px/500, truncated) + `{instr} · {credits} وحدة` (11.5px, `--muted`).
    - 84×6 progress bar (`background:--track`, fill colored by grade), `{pct}%` (mono, `--muted`), grade chip (Space Grotesk 13/600, color + bg by grade band).
  - **Grade → color band:** A→`--pos`, B→`--info`, C→`--warn`, else→`--neg`. Chip bg uses the matching `*-bg` token.
- **Grade-distribution card** (flex column): title `توزيع درجات الدفعة` + `الدرجات النهائية — الخوارزميات CS 340`. Vertical bar histogram, 9 bins (A, A−, B+, B, B−, C+, C, C−, D), `height:150px`, `gap:5px`. Each bar 62% width, `border-radius:5px 5px 0 0`, height ∝ count. Default bars `--bar-bg`; the **"أنتِ" (you)** bar is `--accent` with a small label chip above (`--accent` on `--accent-12`). Mono axis labels below (top border). Caption: `أنتِ في فئة A− — أعلى من 81% من الدفعة`.

### Row C — weekly schedule (`showSchedule` toggle)
- Card with title `الجدول الأسبوعي` + sub, and a `الامتحانات النهائية ←` filter pill.
- 5-column grid (Sun–Thu: الأحد/الاثنين/الثلاثاء/الأربعاء/الخميس), gap 12px. Each column: a day header (11.5px/600, `--muted`, bottom border) then class blocks.
- Class block: `border-radius:10px; padding:10px; background:--ov-2; border-inline-start:2px solid {course color}`. Time (mono 11px, `--muted-s`, ltr), course code (13px/600, truncated), room (11px, `--muted`). Course accent colors cycle through `--pos`, `--info`, `--warn`, `--alt`.

### Row D — announcements
- Header: `الإعلانات` (16/700) + `{unread} غير مقروءة` (12.5px, `--muted`).
- Auto-fit card grid (min 230px, gap 14px). Each card `border-radius:14px; border:1px solid --bd; background:--surface; padding:16px; cursor:pointer`:
  - Top row: category tag chip (10.5px/600, color + bg by category) + an unread dot (8px, `--accent`) shown only when unread.
  - Title (13.5px/500, line-height 1.6) + relative time (11.5px, `--muted`).
  - Categories → token key: الدرجات→`pos`, موعد نهائي→`warn`, الإرشاد→`accent`, فعالية→`alt`.

---

## Interactions & Behavior
- **Theme toggle** (topbar sun/moon): switches `data-theme` on `<html>` between `dark` and `light`. Persist the choice. Outer container animates `background .3s, color .3s`.
- **Sidebar nav**: clicking sets the active item (visual state). Wire to routing for non-overview views.
- **Course term tabs**: switch the course list + meta between current term (`الفصل الثاني 2026`) and past term (`الفصل الأول 2025`). Current-term meta: `معدل الفصل 3.84 · قيد الدراسة · الأسبوع 9 من 15 · 17 وحدة`. Past-term: `3.91 · مكتمل · الدرجات النهائية · 17 وحدة`.
- **Announcement cards**: clicking marks that announcement read (removes its unread dot and decrements the unread counters in the topbar badge + section header).
- **Animations**: `dashIn` page entry (fade + 8px translateY, 0.4s ease, `both`); `orbFloat` on the AI icon (4s ease-in-out infinite, ±6px). Respect `prefers-reduced-motion` in the rebuild.
- **Hover/active/focus**: add codebase-standard hover affordances on all buttons, nav items, tabs, and announcement cards (the prototype relies on `cursor:pointer` + token swaps; apply your design system's interaction states).

## State Management
- `theme`: `'dark' | 'light'` (persisted).
- `nav`: active sidebar key (`overview | performance | courses | schedule | grades | records`).
- `term`: `'current' | 'past'` for the courses panel.
- `read`: array of read announcement IDs; `unread` count derives from it.
- Feature flags: `showAI`, `showSchedule` (booleans), `rankDisplay` (`exact | percentile | both`, controls the gauge/center text wording).
- **Data fetching**: all of GPA series, courses (per term), grade distribution, schedule, announcements, and student profile should come from the SIS/API. Currently hard-coded.

---

## Design Tokens

All colors are CSS custom properties defined per theme on `:root`/`[data-theme="dark"]` and `[data-theme="light"]`. **Blue (`--accent`) and gold (`--accent2`) are the brand pair; confirm exact hex with an official guide.**

### Dark theme
| Token | Value | Use |
|---|---|---|
| `--bg` | `#071529` | page background (deep navy) |
| `--surface` | `#0f274d` | cards |
| `--surface-2` | `#0b1d38` | secondary surface |
| `--sidebar-bg` | `rgba(5,16,33,.5)` | sidebar |
| `--accent` | `#4a90f7` | **brand blue** (primary) |
| `--accent2` | `#f4b81c` | **brand gold** (secondary) |
| `--accent-12 / -22` | `rgba(74,144,247,.13 / .24)` | accent tints |
| `--accent-glow` | `rgba(74,144,247,.08)` | hero radial glow |
| `--accent-shadow` | `rgba(74,144,247,.30)` | accent shadow |
| `--on-accent` | `#06142b` | text/icon on accent fills |
| `--text / -strong / -2 / -3` | `#e8eefa / #f1f6ff / #ccd9ee / #bbc9e2` | text ramp |
| `--muted / -s / --faint` | `#6e809f / #97a8c6 / #566a8c` | muted text |
| `--on-tint / --accent-label` | `#d2e2fb / #a8c6ee` | text on tinted bg / accent labels |
| `--pos / -bg / -soft` | `#34d399 / rgba(52,211,153,.14 / .16)` | positive (A grades, gains) |
| `--info / -bg` | `#5ea0fb / rgba(94,160,251,.14)` | info (B grades) |
| `--warn / -bg` | `#f4b81c / rgba(244,184,28,.15)` | warning / gold (C grades, deadlines) |
| `--neg / -bg` | `#fb7185 / rgba(251,113,133,.14)` | negative (D grades) |
| `--alt / -bg` | `#c79a3a / rgba(199,154,58,.16)` | alt accent (events) |
| `--bd / -2 / -3` | `rgba(255,255,255,.06 / .05 / .08)` | borders |
| `--ov / -s / -2 / -3` | `rgba(255,255,255,.02 / .015 / .025 / .03)` | overlay fills |
| `--track / --bar-bg` | `rgba(255,255,255,.07 / .10)` | progress track / histogram bars |
| `--hero-ov` | `rgba(255,255,255,.01)` | hero gradient tail |
| `--card-shadow` | `none` | |

### Light theme
| Token | Value | Use |
|---|---|---|
| `--bg` | `#eef3fb` | page background (blue-tinted white) |
| `--surface` | `#ffffff` | cards |
| `--surface-2` | `#f4f8ff` | secondary surface |
| `--sidebar-bg` | `rgba(255,255,255,.78)` | sidebar |
| `--accent` | `#1657cc` | **brand blue** (primary) |
| `--accent2` | `#e0a008` | **brand gold** (secondary) |
| `--accent-12 / -22` | `rgba(22,87,204,.12 / .24)` | accent tints |
| `--accent-glow` | `rgba(22,87,204,.10)` | hero radial glow |
| `--accent-shadow` | `rgba(22,87,204,.32)` | accent shadow |
| `--on-accent` | `#ffffff` | text/icon on accent fills |
| `--text / -strong / -2 / -3` | `#16263f / #0e1c33 / #33455f / #45566f` | text ramp |
| `--muted / -s / --faint` | `#79889f / #5d6d86 / #a7b3c7` | muted text |
| `--on-tint / --accent-label` | `#eaf2ff / #1a56c2` | text on tinted bg / accent labels |
| `--pos / -bg / -soft` | `#2e9d5b / rgba(46,157,91,.15 / .20)` | positive |
| `--info / -bg` | `#2f72c8 / rgba(47,114,200,.15)` | info |
| `--warn / -bg` | `#c2870a / rgba(224,160,8,.18)` | warning / gold |
| `--neg / -bg` | `#d2493f / rgba(210,73,63,.15)` | negative |
| `--alt / -bg` | `#a47a16 / rgba(164,122,22,.16)` | alt accent |
| `--bd / -2 / -3` | `rgba(20,50,110,.10 / .08 / .13)` | borders |
| `--ov / -s / -2 / -3` | `rgba(20,50,110,.03 / .025 / .04 / .05)` | overlay fills |
| `--track / --bar-bg` | `rgba(20,50,110,.10 / .16)` | progress track / histogram bars |
| `--hero-ov` | `rgba(20,50,110,.02)` | hero gradient tail |
| `--card-shadow` | `0 1px 2px rgba(20,40,80,.05), 0 16px 32px -18px rgba(20,40,80,.22)` | card elevation |
| `--av-1 / --av-2` | `#2f6fd1 / #1a4ea0` | avatar gradient |

### Typography
- Families: **IBM Plex Sans Arabic** (UI/body, 400–700), **Space Grotesk** (numerals/stat values, 400–700), **IBM Plex Mono** (codes/times/axis, 400–500).
- Sizes used: 30 (stat values), 25 (hero headline), 22 (page title), 19 (status), 18 (AI title), 16 (card titles), 13.5–14 (body), 11–12.5 (meta/labels), 10.5 (tag chips / section labels).

### Radii & spacing
- Radii: 18px (large cards), 16px (stat cards), 14px (announcement cards), 12px (course rows / user card), 10–11px (buttons / chips), 8px (tabs / pills), 6px (progress bars), 5px (histogram bars).
- Section gap 22px; grid gaps 20px; stat gap 14px; main padding 26px 32px; card padding 18–24px.

### Direction
- Entire app is **RTL**. Use logical properties (`border-inline-start`, `text-align:start`) as the prototype does. Numeric/code/time runs are forced `direction:ltr` locally.

---

## Assets
- `assets/uowa-logo.svg` — university crest, light fill (`#e9eef7`), used on the **dark** theme.
- `assets/uowa-logo-dark.svg` — dark-fill crest variant, used on the **light** theme.
- All other graphics (icons, charts, gauges, histogram) are **inline SVG / CSS** — no raster assets. Recreate icons with the codebase's icon set (they are generic line icons: grid, chart, book, calendar, award, document, bell, search, sun/moon, sparkle, user, arrow).
- Fonts load from Google Fonts; swap to self-hosted in production if required.

## Files
- `Student Dashboard.dc.html` — the full prototype (markup + the logic/data in the trailing `<script type="text/x-dc">` block). Read the data arrays here for exact mock content (courses, grades, schedule, announcements, GPA series).
- `support.js` — design-tool runtime. **Reference only; do not port.**
- `assets/uowa-logo.svg`, `assets/uowa-logo-dark.svg` — logo variants.

To preview the prototype as intended, open `Student Dashboard.dc.html` in a browser.
