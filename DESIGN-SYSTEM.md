# Xylvanthrex Labs — Design System

**Version 2.0** · Source of truth: `src/client/styles/app.css`
Tokens live in `:root`. Every rule below is implemented; nothing here is aspirational.

---

## 1. The idea

The lab is an editorial institution. The site should read like a well-set
research monograph, not a product landing page.

Everything follows from one decision:

> **Structure comes from space, surface tone, and radius.**
> **Nothing is separated by a line.**

There is not a single decorative border in the stylesheet. Section breaks,
card edges, and grouped fields are all created with whitespace and a change
in surface tone. A hairline rule is a cheap way to separate two things; a gap
and a tonal step is a way to say they are the same family, or not.

The only `border` declarations that exist are `border: 0` resets on form
controls, to remove the browser default.

Three corollaries:

1. **Surfaces, not outlines.** Cards are `surface` on `paper`. A nested card
   is `surface-2` on `surface`. Depth is a value change, never a border.
2. **One signal colour.** Everything else is a warm neutral. If something is
   red on this site, it means *active* or *this is the thing*.
3. **Type does the labelling.** Small caps monospace (`label`, `inline-label`,
   `kicker`) mark categories. Never a coloured tag doing that job alone.

---

## 2. Colour

### 2.1 Tokens

| Token | Value | Role |
|---|---|---|
| `--paper` | `#f3efe5` | Page background. Warm paper. |
| `--paper-deep` | `#ebe5d6` | Rarely used; deeper paper for special bands. |
| `--surface` | `#fbf8f1` | Card / panel surface. The default raised layer. |
| `--surface-2` | `#f0ebe0` | Nested surface. Secondary panels, quiet cards, table rows. |
| `--surface-3` | `#e4ddcc` | Deepest neutral. Hover states, inactive pills. |
| `--ink` | `#17170f` | Near-black text and the dark surface colour. |
| `--ink-2` | `#3d3c32` | Body text on light surfaces. |
| `--muted` | `#6d6a5d` | Secondary text, labels, metadata. |
| `--signal` | `#a6391a` | The one accent. Active states, dots, numerals. |
| `--signal-deep` | `#8b2f14` | Signal text on `--signal-soft`. |
| `--signal-soft` | `#f5ded3` | Signal pill background. |
| `--on-ink` | `#f7f3e9` | Text on `--ink`. |
| `--on-ink-soft` | `rgba(247,243,233,.72)` | Secondary text on `--ink`. |
| `--on-ink-2` | `rgba(247,243,233,.12)` | Subtle panel on `--ink`. |

### 2.2 The surface ladder

```
paper        ──  page
  └─ surface     ──  cards, panels, form fields
       └─ surface-2 ──  nested cards, quiet cards, table rows
            └─ surface-3 ──  hover, inactive pills, chevrons
```

Dark inversions use the same four steps in reverse:
`ink` → `on-ink` / `on-ink-soft` / `on-ink-2`.

### 2.3 Status colours

Status is a colour-coded pill. The colour always follows the status, never
the other way round.

| Status | Background | Text | Meaning |
|---|---|---|---|
| `ACTIVE` | `--signal-soft` | `--signal-deep` | Exists and is usable. |
| `BUILDING` | `#e6e0f2` | `#4a3b74` | In development, something showable. |
| `RESEARCHING` | `--surface-3` | `--ink` | Investigating, no product. |
| `PLANNED` | `--surface-2` | `--muted` | Intended, not started. |

`BUILDING` is the only non-warm hue in the palette. It is deliberately
isolated — it appears only when a unit is genuinely `BUILDING`.

### 2.4 Rules

- The signal colour is never used for decoration. If it appears, it means
  something.
- Never introduce a colour outside the token list without adding a token.
- Under `prefers-contrast: more`, `--muted` darkens to `#55534a` and
  `--ink-2` to `#26251e`.
- Print overrides remap the palette to pure white / black.

---

## 3. Typography

Three families, three jobs. Never mix them within one role.

| Role | Family | Fallback stack |
|---|---|---|
| Display / editorial | **Newsreader** (serif) | `"Iowan Old Style", Georgia, serif` |
| UI / body | **IBM Plex Sans** | `"Helvetica Neue", Arial, sans-serif` |
| Data / labels | **IBM Plex Mono** | `ui-monospace, SFMono-Regular, monospace` |

Self-hosted latin subsets in `public/fonts/`. No runtime font requests.

### 3.1 Scale

| Class | Family | Size | Line height | Tracking | Use |
|---|---|---|---|---|---|
| `.display` | serif | `clamp(42px, 6.6vw, 92px)` | `0.99` | `-0.033em` | Hero headline |
| `.display--page` | serif | `clamp(38px, 5.4vw, 76px)` | `1.01` | `-0.026em` | Page `<h1>` |
| `.section-title` | serif | `clamp(30px, 3.6vw, 50px)` | `1.05` | `-0.026em` | Section `<h2>` |
| `.hero-lede` | sans | `clamp(16.5px, 1.35vw, 18.5px)` | `1.6` | — | Hero paragraph |
| `.page-lede` | sans | `clamp(16px, 1.4vw, 18px)` | `1.62` | — | Page intro |
| `.section-intro` | sans | `16.5px` | `1.65` | — | Section intro |
| body | sans | `17px` (`16px` ≤620px) | `1.62` | — | Everything else |
| `.kicker` | mono | `10.5px` | `1.5` | `0.15em` | Section eyebrow, uppercase |
| `.label` | mono | `10.5px` | `1.5` | `0.15em` | Block label, uppercase |
| `.inline-label` | mono | `10px` | `1.5` | `0.12em` | Inline label, uppercase |
| `.status` | mono | `9.5px` | `1.3` | `0.12em` | Status pill, uppercase |
| `.btn` | sans | `14px` (`13px` sm) | `1` | — | Buttons |

### 3.2 Rules

- **Serif for meaning, sans for reading, mono for metadata.** A mono string
  is a label or a value. Never a sentence.
- Negative tracking scales with size: `-0.033em` at 92px, `-0.012em` at 19px.
- Measure is capped: prose `max-width: 56–62ch`, display `16–20ch`.
- `text-wrap: balance` on display and section titles.
- All uppercase text is monospace with `≥0.12em` tracking.

---

## 4. Space, radius, elevation

### 4.1 Radius

| Token | Value | Applied to |
|---|---|---|
| `--r-xl` | `34px` | Hero card, CTA card, closing card, page-level panels |
| `--r-lg` | `24px` | Cards, panels, side cards, split cards |
| `--r-md` | `16px` | Nested blocks, form fields, tree nodes, table rows |
| `--r-sm` | `11px` | Small chips, leaf rows |
| `--r-pill` | `999px` | Buttons, status pills, search, nav links |

Radius is a signal of nesting depth. A component one level deeper uses a
smaller radius. Never mix radii inside one card.

### 4.2 Spacing

The scale is fluid, not fixed:

```css
--gutter: clamp(18px, 4vw, 60px);   /* page inset */
--max:    1340px;                   /* container */
```

Vertical rhythm:

| Context | Value |
|---|---|
| Section padding | `clamp(56px, 7.5vw, 116px)` |
| Section padding (CTA) | `clamp(56px, 7.5vw, 116px)` top, `clamp(40px, 5vw, 72px)` bottom |
| Section head margin | `clamp(28px, 4vw, 52px)` |
| Card padding | `clamp(20px, 2.2vw, 30px)` |
| Large card padding | `clamp(28px, 4vw, 64px)` |
| Grid gap | `clamp(12px, 1.4vw, 20px)` |
| Label → value gap | `4–8px` |
| Card → its label | `12–20px` |

### 4.3 Elevation

Shadows are soft, warm, and only ever *lift* — nothing casts a shadow onto
another shadow.

| Token | Value | Use |
|---|---|---|
| `--sh-card` | `0 1px 2px rgba(23,23,15,.04), 0 18px 40px rgba(23,23,15,.055)` | Default card rest |
| `--sh-lift` | `0 2px 6px rgba(23,23,15,.05), 0 30px 64px rgba(23,23,15,.1)` | Hover / raised CTA / dark cards |
| `--sh-float` | `0 40px 90px rgba(23,23,15,.18)` | Menus, command palette |

`--sh-float` is reserved for things that float above the page: the ventures
mega-menu, the command palette, the mobile menu.

### 4.4 Motion

```css
--ease: cubic-bezier(0.22, 0.7, 0.2, 1);
```

| Interaction | Duration | Transform |
|---|---|---|
| Hover on card | `0.25s` | `translateY(-4px … -5px)` + `--sh-lift` |
| Button hover | `0.2s` | `translateY(-2px)` |
| Colour change | `0.18s` | none |
| Arrow nudge | `0.2s` | `translate(3px, -3px)` |
| Menu open | `0.18–0.22s` | fade + `translateY(-8px)` |
| Hero entrance | `0.7s` | `translateY(12px)` → none |

Motion only ever reinforces a state change. `prefers-reduced-motion: reduce`
collapses every duration to `0.001ms` and disables smooth scrolling.
`@media (hover: none)` removes all hover lifts so touch devices never get
stuck hover states.

---

## 5. Layout

### 5.1 Grid

- Container: `max-width: 1340px`, centred, fluid gutter.
- Section head: `minmax(0,3fr) minmax(0,8fr)` — a narrow index column and a
  wide prose column. The index column holds the numbered kicker and nothing
  else.
- Card grids: `repeat(auto-fit, minmax(0, 1fr))` style via explicit counts.

| Grid | Columns | ≤1200px | ≤860px |
|---|---|---|---|
| `.layer-grid` | 4 | 2 | 1 |
| `.venture-grid` | 3 | 2 | 1 |
| `.venture-grid--even` | 2 | 2 | 1 |
| `.principle-grid` | 3 | 3 | 1 |
| `.principle-grid--full` | 2 | 1 | 1 |
| `.area-grid` | 4 | 2 | 1 |
| `.method-grid` | 4 | 2 | 1 |
| `.status-legend__grid` | 4 | 2 | 1 |
| `.studio-grid` | 3 | 2 | 1 |
| `.not-list` | 4 | 2 | 1 |
| `.board__counts` | 4 | 2 | 1 |

### 5.2 Breakpoints

| Width | What changes |
|---|---|
| `≤1240px` | Search button collapses to its icon only. |
| `≤1200px` | Four-up grids become two-up. Header status pill hidden. |
| `≤1040px` | **Primary nav → mobile menu.** Hero, CTA, detail, research and split cards stack to one column. Header height `82 → 70px`. |
| `≤860px` | Two-up grids become one-up. Order list, format list and status board restack. |
| `≤620px` | Body `17 → 16px`. Display type switches to `vw` scaling. Buttons go full width. Header height `70 → 58px` when scrolled. |
| `≤400px` | Gutter `→ 16px`. Large radii soften to `22px`. |

Two more conditional layers:

- `@media (hover: none)` — hover lifts removed.
- `@media (forced-colors: active)` — status pills keep their own colours.
- `@media (prefers-contrast: more)` — muted text darkens.
- `@media print` — palette collapses to white/black, chrome is hidden.

---

## 6. Components

### 6.1 Buttons

| Class | Background | Text | Min height |
|---|---|---|---|
| `.btn` | `--surface` | `--ink` | `52px` |
| `.btn--primary` | `--ink` | `--paper` | `52px` |
| `.btn--soft` | `--surface-2` | `--ink` | `52px` |
| `.btn--light` | `--paper` | `--ink` | `52px` |
| `.btn--sm` | — | — | `42px` |

Pill radius, `0 24px` inline padding, 14px/500, `gap: 12px` before the arrow
glyph. Hover: `translateY(-2px)` and a background shift. Primary hover turns
`--signal`.

### 6.2 Cards

Four families, one anatomy: `label` → `title` → `body` → optional meta.

| Class | Surface | Shadow |
|---|---|---|
| `.layer-card` | `--surface` | `--sh-card` |
| `.venture-card` | `--surface` | `--sh-card` |
| `.principle-card` | `--surface` | `--sh-card` |
| `.principle-card--refusal` | `--surface-2` | none |
| `.area-card` | `--surface` | `--sh-card` |
| `.method-card` | `--surface-2` | none |
| `.side-card` | `--surface` | `--sh-card` |
| `.side-card--quiet` | `--surface-2` | none |
| `.detail-card` | `--surface` | `--sh-card` |
| `.detail-card--soft` / `--status` | `--surface-2` | none |
| `.empty-card` | `--surface` | `--sh-card` |
| `.split-card` | `--surface` | `--sh-card` |
| `.board` | `--surface` | `--sh-card` |
| `.founder-card` | `--ink` | `--sh-lift` |
| `.cta-card` | `--ink` | `--sh-lift` |

The featured venture card (`.venture-card--featured`) is the one card that
uses a gradient, and only between two adjacent surface steps:

```css
background: linear-gradient(160deg, var(--surface) 0%, var(--surface-2) 100%);
```

### 6.3 Status pill

```html
<span class="status status--active">ACTIVE</span>
```

Pill, `9.5px` mono, uppercase, `0.12em` tracking, with a `6px` dot of
`currentColor` before the label. Never used alone — the word is the meaning.

### 6.4 Hierarchy tree

`.tree` renders the lab structure. The root sits on `--ink`; each branch is a
`--surface` row inside `--surface-2`; leaves are `--surface-2` rows inside
`--surface`. Depth is shown by **indentation and surface tone only** — there
is no connector line.

```
.tree__root      → --ink / --on-ink
.tree__branch    → --surface, inside --surface-2
.tree__leaf      → --surface-2
.tree__glyph     → 9px square; lab = --signal rounded, venture = --signal,
                    division = --muted circle, leaf = --surface-3 circle
```

### 6.5 Status board

`.board` is a live, API-fed table. Rows are `--surface-2` inside `--surface`,
with a grid of `name / layer / status / meta`. The counts strip below is four
`--surface-2` tiles with serif numerals.

### 6.6 Forms

- Fields: `--surface-2`, radius `--r-md`, `14px 16px` padding, no border.
- Hover → `--surface-3`. Focus → `--surface` with a `2px` inset `--ink` ring.
- Invalid → `2px` inset `--signal` ring.
- The select chevron is an SVG mask, not a CSS border trick.
- `.field--trap` is the honeypot: positioned off-screen, not `display:none`,
  so naive bots still fill it.

### 6.7 Navigation

- Sticky header, `--paper` at 86% with a 16px backdrop blur.
- Scrolled → 94% opacity, adds a soft shadow, height `82 → 64px`.
- A 2px `--signal` scroll-progress bar sits at the very top.
- `.nav-link` is a pill; the active link takes `--surface-2`.
- The ventures mega-menu is `--surface` with `--sh-float`, two columns:
  ventures (1.4fr) and the division (1fr). The division column is
  `--surface-3`, so it is tonally distinct without a border.
- The mobile menu is a full-screen `--paper` sheet with a focus trap,
  `Esc` to close, and the status guide included so the model is legible
  without the mega-menu.

### 6.8 Command palette

`--surface` panel, `--sh-float`, radius `--r-xl`. Field on top, results
below, keyboard hints on a `--surface-2` footer. The active row carries a
`1.5px` inset `--signal` ring.

Functional rings — the only outlines on the site — appear in exactly three
places: the global focus ring, the input focus/invalid ring, and the palette's
active row.

---

## 7. Voice

Design copy is part of the system.

- **Problem first.** Every unit opens with what is broken.
- **Short sentences. One claim per sentence.**
- **Honest about stage.** "We haven't built this yet" beats inflation.
- **Every claim carries a status.**
- Banned: revolutionary, cutting-edge, next-gen, world-class, seamless,
  disrupt, game-changing, synergy, leverage (as a verb), unleash, empower.
- Never call the lab a startup, an agency, a tech company, or a consultancy.
- Never present the three studios as separate companies.
- Never call the Software Studio an IDE.

---

## 8. Accessibility

- Focus ring: `2px solid --signal`, `3px` offset, `4px` radius. Visible on
  every interactive element.
- `.skip` link is the first focusable element and slides in on focus.
- Every input has a real `<label>`; errors are wired with
  `aria-describedby` + `aria-invalid`.
- Status changes announce through `role="status"` / `aria-live="polite"`.
- The mobile menu and command palette trap focus and close on `Esc`.
- `aria-current="page"` marks the active nav item.
- Contrast: body text `--ink-2` on `--surface` and `--on-ink-soft` on `--ink`
  both clear WCAG AA.
- `forced-colors` mode keeps status pills legible instead of flattening them.

---

## 9. Checklists

**Before adding a colour**
- [ ] Is there an existing token that already means this?
- [ ] If the signal colour, does it mean *active*?

**Before adding a separator**
- [ ] Can a gap plus a surface step do the job instead?
- [ ] If a line is truly needed, it is functional (focus, input, active
      row) — never decorative.

**Before adding a component**
- [ ] Does it use `--r-lg` or `--r-md` consistently with its depth?
- [ ] Does it rest on `--surface` with `--sh-card`?
- [ ] Does it have a label in mono, and a title in serif?

**Before shipping**
- [ ] Works at 320px, 390px, 768px, 1024px, 1440px.
- [ ] `prefers-reduced-motion` honoured.
- [ ] Keyboard reachable, focus visible.
- [ ] No new colour, no new radius, no new shadow.
