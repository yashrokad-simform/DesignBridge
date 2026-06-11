# Tooltip

## Overview

| Property | Value |
|---|---|
| Component Name | Tooltip |
| Node | `254:1602` |
| Type | `COMPONENT_SET` |
| Variants | 8 (Direction) |

A contextual overlay that appears near a trigger element, providing additional information. Always dark-themed. Available in 8 directional positions, each with a matching arrow indicator pointing back toward the trigger. Supports an optional Heading, Caption, and Close button controlled via Boolean properties.

---

## Variant Properties

| Property | Type | Options |
|---|---|---|
| `Direction` | VARIANT | `Top↑` · `bottom↓` · `left←` · `right→` · `top-left↖︎` · `top-right↗︎` · `bottom-left↙︎` · `bottom-right↘︎` |
| `Heading#2206:9` | BOOLEAN | `true` (default) — Heading text visibility |
| `Caption#19129:1` | BOOLEAN | `true` (default) — Caption text visibility |

---

## Component Structure

Each variant contains two direct children: a `body` frame (the dark pill) and a `tooltip-arrow` frame (the beak). Their stacking order and orientation change per direction.

### Order of children per direction

| Direction | Child order (first → last) |
|---|---|
| `Top↑` | `body` → `tooltip-arrow` (arrow below body) |
| `bottom↓` | `tooltip-arrow` → `body` (arrow above body) |
| `left←` | `body` → `tooltip-arrow` (arrow at right edge) |
| `right→` | `tooltip-arrow` → `body` (arrow at left edge) |
| `top-left↖︎` | `body` → `tooltip-arrow` (arrow below, left-aligned) |
| `top-right↗︎` | `body` → `tooltip-arrow` (arrow below, right-aligned) |
| `bottom-left↙︎` | `tooltip-arrow` → `body` (arrow above, left-aligned) |
| `bottom-right↘︎` | `tooltip-arrow` → `body` (arrow above, right-aligned) |

---

### `body` frame (identical across all 8 variants)

```
body                               [FRAME · FILL × HUG · Vertical AL]
  Padding:  spacing-xl (12px) all sides
  Gap:      spacing-4xl (20px)
  Fill:     VariableID:67:5885 (dark navy #051325)
  Radius:   radius-xl (all 4 corners)
  No stroke
  │
  └── Frame 2                      [FRAME · FILL × HUG · Horizontal AL]
        Gap: spacing-md (8px)
        │
        ├── Frame 4                [FRAME · FILL × HUG · Vertical AL · layoutGrow=1]
        │     Gap: spacing-md (8px)
        │     ├── Heading          [TEXT — visible: Heading boolean]
        │     │     (text content — inspect Frame 4 children directly in Figma)
        │     └── Caption          [TEXT — visible: Caption boolean]
        │           (text content — inspect Frame 4 children directly in Figma)

```

### `tooltip-arrow` frame + `beak`

The arrow is a clipped rotated rectangle that creates the triangular pointer. The `beak` RECTANGLE is 11.31×11.31px, visually rotated 45°, and clipped by the `tooltip-arrow` frame (FIXED 5px in the direction of the arrow). One corner of the beak has a 2px radius to soften the arrow tip.

```
tooltip-arrow                      [FRAME · clipsContent=true]
  Vertical variants:  FILL × FIXED(5px) — arrow is a horizontal strip
  Horizontal variants: FIXED(5px) × FILL — arrow is a vertical strip
  Fill: None
  │
  └── beak                         [RECTANGLE · 11.31×11.31px]
        Fill: VariableID:67:5885 (dark navy — matches body)
        Rotated: 45°
        One corner = 2px radius (see table below)
```

---

## Arrow Direction Map

| Variant | Arrow position | `beak` corner radii [TL, TR, BR, BL] | Arrow alignment |
|---|---|---|---|
| `Top↑` | Bottom center | `[0, 0, 2, 0]` BR=2 | Center |
| `bottom↓` | Top center | `[2, 0, 0, 0]` TL=2 | Center |
| `left←` | Right center | `[0, 2, 0, 0]` TR=2 | Center |
| `right→` | Left center | `[0, 0, 0, 2]` BL=2 | Center |
| `top-left↖︎` | Bottom left | `[0, 0, 2, 0]` BR=2 | Left (padding-left: `spacing-5xl`) |
| `top-right↗︎` | Bottom right | `[0, 0, 2, 0]` BR=2 | Right (padding-right: `spacing-5xl`) |
| `bottom-left↙︎` | Top left | `[2, 0, 0, 0]` TL=2 | Left (padding-left: `spacing-5xl`) |
| `bottom-right↘︎` | Top right | `[2, 0, 0, 0]` TL=2 | Right (padding-right: `spacing-5xl`) |

> The `2px` corner radius on a specific beak corner creates a softened, slightly curved arrow tip facing the trigger element. Match the correct corner per direction.

---

## Attached Variables

### Spacing

| Layer | Property | Variable | Value |
|---|---|---|---|
| `body` | Padding all sides | `spacing-xl` | 12px |
| `body` | Gap | `spacing-4xl` | 20px |
| `Frame 4` | Gap | `spacing-md` | 8px |
| `tooltip-arrow` (diagonal variants) | Padding L/R | `spacing-5xl` | 24px |

### Radius

| Layer | Variable | Value |
|---|---|---|
| `body` (all 4 corners) | `radius-xl` | 12px |
| `beak` (one corner, varies per direction) | 2px | Hardcoded |

### Shadow

| Layer | Effect | Value |
|---|---|---|
| All variant outer frames | DROP_SHADOW | Offset (0, 0) · Radius 20 · Color rgba(60%, 60%, 60%, 15%) · Show behind: true |

### Colors

| Layer | Variable | Value |
|---|---|---|
| `body` fill | `VariableID:67:5885` | Dark navy `#051325` |
| `beak` fill | `VariableID:67:5885` | Dark navy — matches body exactly |

> All tooltip content (Heading, Caption) should use `Text/text-white`. The close Button inherits its icon color from the Button component.

> ⚠️ `VariableID:67:5885` — same dark navy variable used by Toast. Confirm exact name from the Figma variable panel (likely `Background/bg-overlay` or similar dark background token).

---

## Figma Construction Guide

### Step 1 — Build `Direction=Top↑`

1. Create an outer **Frame**. Name it `Direction=Top↑`.
2. **Vertical AL · FIXED(200px) × HUG · Center cross-axis**. No fill.
3. Add DROP_SHADOW: offset(0,0) · radius 20 · rgba(60%,60%,60%,15%) · show behind: true.
4. Convert to **Component**.

#### body frame
1. Inside the outer frame, add a **Frame**. Name it `body`.
2. **Vertical AL · FILL × HUG**. Bind padding all sides → `spacing-xl`. Bind gap → `spacing-4xl`.
3. Bind fill → `VariableID:67:5885`. Bind corner radius all 4 → `radius-xl`. No stroke.

Inside `body`:
- Add `Frame 2` (FILL × HUG · Horizontal AL · gap spacing-md):
  - Add `Frame 4` inside (FILL × HUG · Vertical AL · layoutGrow=1 · gap spacing-md):
    - Add Heading TEXT layer. Link visibility to `Heading` Boolean.
    - Add Caption TEXT layer. Link visibility to `Caption` Boolean.
    - (Set text styles after inspecting `Frame 4` children directly in Figma)


#### tooltip-arrow frame (Top↑ — arrow below body)
1. Add a **Frame** below `body`. Name it `tooltip-arrow`.
2. **Horizontal AL · FILL × FIXED(5px) · Center cross-axis · clipsContent=true**. No fill.
3. Inside, add a **RECTANGLE** named `beak`. Size: **11.31×11.31px**.
4. Bind fill → `VariableID:67:5885`.
5. Set corner radii: `[TL=0, TR=0, BR=2, BL=0]` — bottom-right corner = 2px.
6. Rotate the `beak` 45° and position it so the top half is clipped (only the bottom triangular half visible).
7. Align beak at horizontal center of the `tooltip-arrow` frame.

### Step 2 — Build Remaining Direction Variants

Duplicate `Direction=Top↑` for each direction. Adjust the following per direction:

**For `bottom↓`:**
- Move `tooltip-arrow` to be the FIRST child (above `body`).
- `beak` corner radii: `[TL=2, TR=0, BR=0, BL=0]`.
- Beak position: top half visible (clipped at bottom).
- Arrow centered horizontally.

**For `left←`:**
- Outer frame: **Horizontal AL · FIXED(200px) × HUG**.
- `body` uses layoutGrow=1.
- `tooltip-arrow` is LAST child (at right edge): **FIXED(5px) × FILL · clipsContent=true**.
  - `primaryAxisAlignItems: MAX` (beak at right edge of frame).
- `beak` corner radii: `[TL=0, TR=2, BR=0, BL=0]`.
- Arrow centered vertically.

**For `right→`:**
- Outer frame: **Horizontal AL**.
- `tooltip-arrow` is FIRST child (at left edge): **FIXED(5px) × FILL**.
- `body` uses layoutGrow=1.
- `beak` corner radii: `[TL=0, TR=0, BR=0, BL=2]`.
- Arrow centered vertically.

**For `top-left↖︎` and `top-right↗︎`:**
- Same structure as `Top↑` (body → arrow below).
- `beak` corner radii: `[TL=0, TR=0, BR=2, BL=0]`.
- `tooltip-arrow` has padding L/R → `spacing-5xl` (24px).
  - `top-left↖︎`: default alignment (beak at left after padding).
  - `top-right↗︎`: `primaryAxisAlignItems: MAX` (beak at right after padding).

**For `bottom-left↙︎` and `bottom-right↘︎`:**
- Same structure as `bottom↓` (arrow first, body below).
- `beak` corner radii: `[TL=2, TR=0, BR=0, BL=0]`.
- `tooltip-arrow` has padding L/R → `spacing-5xl` (24px).
  - `bottom-left↙︎`: default alignment (beak at left).
  - `bottom-right↘︎`: `primaryAxisAlignItems: MAX` (beak at right).

### Step 3 — Combine into `Tooltip` Component Set

1. Select all 8 variants. Combine into **Component Set** named `Tooltip`.
2. Add property `Direction` → 8 options (with arrow symbols preserved exactly as in the Figma file).
3. Add Boolean `Heading` (default: `true`).
4. Add Boolean `Caption` (default: `true`).

### Step 4 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 8 variants.

### Step 5 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| `body` | Fill | `VariableID:67:5885` |
| `body` | Padding all sides | `spacing-xl` |
| `body` | Gap | `spacing-4xl` |
| `body` | Corner radius (all 4) | `radius-xl` |
| `Frame 4` | Gap | `spacing-md` |
| `beak` | Fill | `VariableID:67:5885` |
| `tooltip-arrow` (diagonal) | Padding L/R | `spacing-5xl` |

---

## Beak Construction Detail

The arrow is a visual trick using a clipped, rotated rectangle:

1. Draw a RECTANGLE `beak` at 11.31×11.31px
2. Rotate it **45°** — this creates a diamond shape
3. Position it so that the arrow frame (`tooltip-arrow`) clips away the unwanted half
4. Only the triangular tip pointing toward the trigger is visible
5. Apply 2px radius to one corner (see direction table) — this rounds the visible tip

The beak fill must exactly match the `body` fill (`VariableID:67:5885`) so the arrow appears as a seamless extension of the body.

---

## Mandatory Rules

- **8 direction variants — only arrow position and order change.** The `body` frame is structurally identical across all variants.
- **`beak` fill must match `body` fill exactly** — `VariableID:67:5885`. Any mismatch creates a visible seam at the body/arrow join.
- **Beak corner radius is 2px hardcoded** on the correct corner per direction. Do not use a radius variable.
- **Diagonal variants use `spacing-5xl` (24px)** for the `tooltip-arrow` horizontal padding to offset the beak from the corner edge.
- **Body radius = `radius-xl`.** Do not use any other radius.
- **Direction variant names preserve arrow symbols** (e.g. `Top↑`, `bottom↓`) — match these exactly in the component property.
- **Text content in `Frame 4` requires direct Figma inspection** — heading and caption TEXT layer styles are not confirmed from the depth-4 data.
- **Shadow: show behind node = true** for all variants.
- **Text style only — no individual font variable bindings.**
- **Expose nested properties** on all 8 variants.

---

## Flags

### ⚠️ `Frame 4` text content — not confirmed
The `Frame 4` children (Heading and Caption TEXT layers) were not returned at depth 4. Inspect `Frame 4` directly in Figma to confirm:
- Heading text style and fill
- Caption text style and fill
- Whether additional layers exist inside

Both are expected to use `Text/text-white` given the dark-themed background.

### ⚠️ `VariableID:67:5885` — unconfirmed variable name
Same dark navy variable used by Toast (`#051325`). Confirm the exact semantic variable name from the Figma variable panel.



---

## Figma Component Page — Arrangement

```
┌──────────────────────────────────────────────────────────────┐
│  TOOLTIP COMPONENT SYSTEM          ← small caps label        │
│  Tooltip                           ← large bold title        │
│  8 direction variants · dark-themed · Close · Heading        │
│  Caption · beak arrow indicator                              │
│  ──────────────────────────────────  ← divider               │
│                                                               │
│  ▌ Tooltip — All 8 Direction Variants                        │
│    Top · Bottom · Left · Right · Diagonals                   │
│    [ actual Tooltip COMPONENT_SET ]                           │
│                                                               │
└──────────────────────────────────────────────────────────────┘
```

| Section | Subtitle | Content |
|---|---|---|
| `Tooltip — All 8 Direction Variants` | `Direction · Heading · Caption · body: spacing-xl padding · radius-xl · dark navy · beak arrow · spacing-5xl offset for diagonals` | Actual `Tooltip` COMPONENT_SET |