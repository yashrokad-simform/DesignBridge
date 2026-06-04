# Breadcrumb

## Overview

| Property | Value |
|---|---|
| Component Name | Breadcrumb |
| Base Component | `_base Breadcrumb` |
| Component Set | `Breadcrumb` |
| Node — Base | `8103:19143` |
| Node — Component Set | `8103:19180` |
| Total Variants | 5 (Step: 2 · 3 · 4 · 5 · 6) |
| Has States | Yes — on `_base Breadcrumb` only |

Breadcrumb is a horizontal navigation trail showing the user's location in a page hierarchy. It is a purely presentational component — states (Default, Current, Hover) live on the base item, not on the overall trail.

---

## Component Hierarchy

```
Level 1 — Base Component
└── _base Breadcrumb               [COMPONENT_SET]
    ├── State=Default              [COMPONENT]
    ├── State=Current              [COMPONENT]
    └── State=Hover                [COMPONENT]

Level 2 — Variants (Component Set)
└── Breadcrumb                     [COMPONENT_SET]
    ├── Step=2                     [COMPONENT]
    ├── Step=3                     [COMPONENT]
    ├── Step=4                     [COMPONENT]
    ├── Step=5                     [COMPONENT]
    └── Step=6                     [COMPONENT]
```

> ⚠️ **CRITICAL — Architecture difference from Badge and Button:**
> `Breadcrumb` variants are **NOT** wrapper frames containing a single `_base Breadcrumb` instance. Each `Step` variant directly contains **multiple** `_base Breadcrumb` instances interleaved with `Icon` separator instances. The composition pattern is:
>
> ```
> Step=N  →  (N-1) × [_base Breadcrumb (Default) + Icon (arrow-right)]  +  1 × _base Breadcrumb (Current)
> ```
>
> There is no single wrapper + nested base pattern. Do not apply the wrapper approach used for Badge or Button.

---

## Variant Properties

### Step (5 options)

| Step | Items | Structure |
|---|---|---|
| `2` | 2 breadcrumb items · 1 separator | Default → Icon → Current |
| `3` | 3 breadcrumb items · 2 separators | Default → Icon → Default → Icon → Current |
| `4` | 4 breadcrumb items · 3 separators | Default → Icon → Default → Icon → Default → Icon → Current |
| `5` | 5 breadcrumb items · 4 separators | Default × 4 alternating with Icon × 4 → Current |
| `6` | 6 breadcrumb items · 5 separators | Default × 5 alternating with Icon × 5 → Current |

**Rules:**
- The **last item is always `State=Current`**
- All **preceding items are `State=Default`**
- `State=Hover` is never placed statically — it is applied on interaction only

---

## Component Structure

### Level 1 — `_base Breadcrumb` Structure

```
_base Breadcrumb                   [COMPONENT_SET]
  │
  ├── State=Default                [COMPONENT]
  │     Auto Layout:   Horizontal · HUG × HUG
  │     Padding:       None
  │     Gap:           None
  │     Fill:          None
  │     Stroke:        None
  │     └── Text      [TEXT · HUG × HUG]
  │           Style:   Body sm/Regular
  │           Fill:    Text/text-secondary
  │
  ├── State=Current                [COMPONENT]
  │     Auto Layout:   Horizontal · HUG × HUG
  │     Padding:       None
  │     Gap:           None
  │     Fill:          None
  │     Stroke:        None
  │     └── Text      [TEXT · HUG × HUG]
  │           Style:   Body sm/Medium
  │           Fill:    Text/text-primary
  │
  └── State=Hover                  [COMPONENT]
        Auto Layout:   Horizontal · HUG × HUG
        Padding:       None
        Gap:           None
        Fill:          None
        Stroke:        None
        └── Text      [TEXT · HUG × HUG]
              Style:   Body sm/Regular + underline decoration
              Fill:    Text/text-brand
```

### Level 2 — `Breadcrumb` Step Variant Structure

```
Breadcrumb                         [COMPONENT_SET]
  │
  └── Step=2                       [COMPONENT]
        Auto Layout:   Horizontal · HUG × HUG
        Alignment:     Center (cross-axis)
        Gap:           spacing-xs (2px)
        Fill:          None
        Padding:       None
        │
        ├── _base Breadcrumb       [INSTANCE · State=Default]
        ├── Icon                   [INSTANCE · arrow-right · 12px]
        └── _base Breadcrumb       [INSTANCE · State=Current]

  └── Step=3                       [COMPONENT]
        ├── _base Breadcrumb       [INSTANCE · State=Default]
        ├── Icon                   [INSTANCE · arrow-right · 12px]
        ├── _base Breadcrumb       [INSTANCE · State=Default]
        ├── Icon                   [INSTANCE · arrow-right · 12px]
        └── _base Breadcrumb       [INSTANCE · State=Current]

  └── Step=4, 5, 6 follow the same alternating pattern
```

### Layer Descriptions

| Layer | Type | Parent | Notes |
|---|---|---|---|
| `Text` | TEXT | `_base Breadcrumb` state variant | HUG × HUG. Text style and color variable change per state |
| `_base Breadcrumb` | INSTANCE | `Step` variant COMPONENT | State property set to `Default` for all items except last |
| `_base Breadcrumb` | INSTANCE | `Step` variant COMPONENT | Last item always set to `State=Current` |
| `Icon` | INSTANCE | `Step` variant COMPONENT | Separator between items · arrow-right · 12px · stroke = `Icon/icon-secondary` |

### Component Properties — `_base Breadcrumb`

| Property Name | Type | Default | Purpose |
|---|---|---|---|
| `State` | VARIANT | `Default` | Switches between Default · Current · Hover |

### Component Properties — `Breadcrumb`

| Property Name | Type | Default | Purpose |
|---|---|---|---|
| `Step` | VARIANT | `2` | Number of breadcrumb items in the trail |

---

## Attached Variables

### Spacing

| Property | Variable | Value | Applied on |
|---|---|---|---|
| Gap between items | `spacing-xs` | 2px | `Step` variant COMPONENT frame |
| Padding | None | 0 | No padding on any layer |

### Radius

None. No corner radius on any layer.

### Typography

| State | Text Layer | Text Style | Font |
|---|---|---|---|
| Default | `Text` | `Body sm/Regular` | Inter · Regular (400) · 14px · 18px LH · 0 LS |
| Current | `Text` | `Body sm/Medium` | Inter · Medium (500) · 14px · 18px LH · 0 LS |
| Hover | `Text` | `Body sm/Regular` + underline | Inter · Regular (400) · 14px · 18px LH · 0 LS |

> Apply the text style directly on the `Text` layer. Do not bind individual font variables.
>
> **Hover underline note:** The underline decoration on `State=Hover` is a **text decoration override** applied on top of the `Body sm/Regular` style — not a separate text style. Apply it via the text decoration property after setting the text style.

### Colors

| State | Layer | Variable | Usage |
|---|---|---|---|
| Default | `Text` fill | `Text/text-secondary` | Muted grey — inactive breadcrumb item |
| Current | `Text` fill | `Text/text-primary` | Dark primary — active/current page |
| Hover | `Text` fill | `Text/text-brand` | Brand blue — hovered inactive item |
| All | `Icon` VECTOR stroke | `Icon/icon-secondary` | Separator arrow color |

### Icon

#### Separator Icon
The `Icon` layer between breadcrumb items uses the **Icon component** from the design system.

| Property | Value |
|---|---|
| Component | Icon (design system component) |
| Property 1 — Size | `12px` |
| Property 2 — Icon Instance | `arrow-right` (fixed — not swappable in this component) |
| Placement | Between each pair of `_base Breadcrumb` instances |
| Color | Override VECTOR **stroke** → `Icon/icon-secondary` |

> ⚠️ **Icon color override — stroke not fill:**
> `vuesax/linear` icons draw their shape using **stroke**, not fill. Override the **stroke** on the innermost `Icon` VECTOR layer.
>
> **Path:** `Icon [INSTANCE] → 12px [COMPONENT] → arrow-right [COMPONENT] → Icon [VECTOR]`
>
> **Steps:**
> 1. Double-click → enter the `Icon` INSTANCE
> 2. Double-click → enter the `12px` COMPONENT
> 3. Double-click → enter the `arrow-right` COMPONENT
> 4. Select the `Icon` **VECTOR** layer
> 5. In the **Stroke** panel, click the existing stroke swatch to replace it (do NOT click `+`, do NOT touch Fill)
> 6. Switch to Variable mode → select `Icon/icon-secondary`

### Borders / Shadows

None. No stroke, no fill, no elevation on any frame layer.

---

## States

States exist only on `_base Breadcrumb`. The `Breadcrumb` Component Set has no states of its own.

| State | Text Style | Text Color | Decoration | Usage |
|---|---|---|---|---|
| `Default` | `Body sm/Regular` | `Text/text-secondary` | None | All inactive items in the trail |
| `Current` | `Body sm/Medium` | `Text/text-primary` | None | Always the last item in the trail |
| `Hover` | `Body sm/Regular` | `Text/text-brand` | Underline | Applied on interaction to any Default item |

**What changes between states:**

| Property | Default | Current | Hover |
|---|---|---|---|
| Text style | `Body sm/Regular` | `Body sm/Medium` | `Body sm/Regular` |
| Text color variable | `Text/text-secondary` | `Text/text-primary` | `Text/text-brand` |
| Text decoration | None | None | Underline |

---

## Figma Construction Guide

### Step 1 — Build `_base Breadcrumb — State=Default`

1. Create a new **Frame**. Name it `State=Default`.
2. Apply **Horizontal Auto Layout**.
3. Set sizing to **HUG × HUG**.
4. Set **cross-axis alignment** to Center.
5. Set **all padding to 0**. Set **gap to 0**.
6. No fill, no stroke on the frame.
7. Add a **Text** layer inside. Name it `Text`.
8. Set default content to `Text`.
9. Apply text style **`Body sm/Regular`**.
10. Bind fill color → `Text/text-secondary`.
11. Set text sizing to **HUG** on both axes.
12. Convert the frame to a **Component**.

### Step 2 — Build `State=Current`

1. Duplicate `State=Default`.
2. Name it `State=Current`.
3. Select the `Text` layer:
   - Change text style to **`Body sm/Medium`**
   - Change fill color → `Text/text-primary`

### Step 3 — Build `State=Hover`

1. Duplicate `State=Default`.
2. Name it `State=Hover`.
3. Select the `Text` layer:
   - Keep text style as **`Body sm/Regular`**
   - Change fill color → `Text/text-brand`
   - Apply **Underline** text decoration

### Step 4 — Combine into `_base Breadcrumb` Component Set

1. Select all three state components.
2. Combine into a **Component Set**. Name it `_base Breadcrumb`.
3. Add variant property `State` → options: `Default`, `Current`, `Hover`.

### Step 5 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.** Without it, the `State` property will not be accessible on `_base Breadcrumb` instances placed inside `Breadcrumb` Step variants.

1. Select each state variant COMPONENT frame
2. Properties panel → click **"Expose properties from Nested instances"**
3. The `State` property surfaces and is accessible from any parent component

### Step 6 — Build the Separator Icon

1. Place an instance of the **Icon component** inside a temporary frame.
2. Set **Property 1 — Size** to `12px`.
3. Set **Property 2 — Icon Instance** to `arrow-right`.
4. Enter the instance to `Icon [INSTANCE] → 12px [COMPONENT] → arrow-right [COMPONENT] → Icon [VECTOR]`.
5. Select the `Icon` **VECTOR** layer.
6. In the **Stroke** panel, replace the existing stroke variable with `Icon/icon-secondary`. Do NOT touch the Fill.
7. This configured Icon instance will be reused across all Step variants.

### Step 7 — Build `Breadcrumb` Step Variants

> ⚠️ **Do NOT use the wrapper + nested base pattern here.** Each Step variant directly contains multiple `_base Breadcrumb` instances and `Icon` instances. Build each Step variant as follows:

**For `Step=2`:**
1. Create a new **Frame**. Name it `Step=2`.
2. Apply **Horizontal Auto Layout**, HUG × HUG, Center cross-axis alignment.
3. Bind **Gap** → `spacing-xs` (2px). No padding.
4. Place children in this exact order:
   - `_base Breadcrumb` instance → set `State = Default`
   - `Icon` instance → Size=12px, arrow-right, stroke = `Icon/icon-secondary`
   - `_base Breadcrumb` instance → set `State = Current`
5. Convert to a **Component**.

**For `Step=3`:**
Same as Step=2 but with this child order:
- Default → Icon → Default → Icon → Current

**For `Step=4`, `Step=5`, `Step=6`:**
Continue the same alternating pattern. Each additional step adds one more Default + Icon pair before the Current item.

### Step 8 — Combine into `Breadcrumb` Component Set

1. Select all 5 Step variant components.
2. Combine into a **Component Set**. Name it `Breadcrumb`.
3. Add variant property `Step` → options: `2`, `3`, `4`, `5`, `6`.

### Step 9 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.** Without it, the `State` property on each `_base Breadcrumb` instance inside the Step variants will not be accessible from the outside.

1. Select each `Step` variant COMPONENT frame
2. Properties panel → click **"Expose properties from Nested instances"**
3. The `State` property of each nested `_base Breadcrumb` instance surfaces and is accessible

### Step 10 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| `Step` variant frame | Gap | `spacing-xs` |
| `Text` (State=Default) | Fill | `Text/text-secondary` |
| `Text` (State=Default) | Text Style | `Body sm/Regular` |
| `Text` (State=Current) | Fill | `Text/text-primary` |
| `Text` (State=Current) | Text Style | `Body sm/Medium` |
| `Text` (State=Hover) | Fill | `Text/text-brand` |
| `Text` (State=Hover) | Text Style | `Body sm/Regular` + underline decoration |
| `Icon → 12px → arrow-right → Icon [VECTOR]` | Stroke | `Icon/icon-secondary` |

### Step 11 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Base component set | `_base [ComponentName]` | `_base Breadcrumb` |
| Base state variant | `State=[State]` | `State=Default` |
| Component Set | `[ComponentName]` | `Breadcrumb` |
| Step variant | `Step=[N]` | `Step=2` |
| Text layer | `Text` | `Text` |
| Separator icon layer | `Icon` | `Icon` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All color variables must come from the `Color Style` collection.
- **No hardcoded values.** The gap (`spacing-xs`) must be variable-bound. No other spacing or radius variables exist on this component.
- **Last item is always `State=Current`.** All preceding items are always `State=Default`. Never place `State=Current` anywhere except the last position.
- **`State=Hover` is never placed statically.** It is applied on interaction only — never as a fixed child in any Step variant.
- **Separator icon color is `Icon/icon-secondary`** overridden on the `Icon` VECTOR **stroke**. Do not touch the fill. Do not use `Icon/icon-primary`.
- **Icon stroke not fill.** `vuesax/linear` icons draw using stroke paths. Color must always be applied to the stroke of the innermost `Icon` VECTOR — not the fill.
- **Do not use the wrapper pattern.** Unlike Badge and Button, `Breadcrumb` Step variants directly contain multiple instances. Do not create a wrapper frame around a single base instance.
- **Text style only — no font variable bindings.** Apply the named text style on the `Text` layer. Do not bind individual font variables.
- **Expose nested properties** on both `_base Breadcrumb` state variants and `Breadcrumb` Step variants so the `State` property is accessible from the outside.

---

## Figma Component Page — Arrangement

### Page Frame Structure

Place the actual `_base Breadcrumb` and `Breadcrumb` Component Sets directly — do not create separate instances for display.

```
┌────────────────────────────────────────────────────────┐
│  BREADCRUMB COMPONENT SYSTEM       ← small caps label  │
│  Breadcrumb                        ← large bold title  │
│  5 variants · Step: 2 · 3 · 4 · 5 · 6                 │
│  · States on _base: Default · Current · Hover          │
│  ─────────────────────────────────  ← divider          │
│                                                        │
│  ▌ _base Breadcrumb — Base Component                   │
│    3 states · Default · Current · Hover                │
│                                                        │
│    [ actual _base Breadcrumb COMPONENT_SET ]           │
│                                                        │
│  ▌ Breadcrumb — All 5 Variants                         │
│    Step property · 2 to 6 items · spacing-xs gap      │
│                                                        │
│    [ actual Breadcrumb COMPONENT_SET ]                 │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `BREADCRUMB COMPONENT SYSTEM` |
| Title | `Breadcrumb` |
| Summary tagline | `5 variants · Step: 2 · 3 · 4 · 5 · 6 · States: Default · Current · Hover` |
| Divider | Full-width horizontal rule below summary |

### Section 1 — Base Component

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `_base Breadcrumb — Base Component` |
| Subtitle | `3 states · Default · Current · Hover · Body sm text styles · No padding · No radius` |
| Content | Place the **actual `_base Breadcrumb` COMPONENT_SET** directly on the page |

### Section 2 — All Variants

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Breadcrumb — All 5 Variants` |
| Subtitle | `Step property 2–6 · spacing-xs gap · arrow-right separator · Icon/icon-secondary stroke` |
| Content | Place the **actual `Breadcrumb` COMPONENT_SET** directly on the page |

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame with consistent gap between sections.
- The **blue accent bar** is a `3–4px wide rectangle` with the brand primary fill, full height of the section title block.
- **Do not create new instances or duplicate components** — place actual component sets directly.
- `_base Breadcrumb` default display: show all 3 states side by side so the visual difference is clear.
