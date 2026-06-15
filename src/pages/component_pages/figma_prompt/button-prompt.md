# Button

## Overview

| Property | Value |
|---|---|
| Component Name | Button |
| Base Component | `_base Button` |
| Component Set | `Button` |
| Node — Base | `19257:433094` |
| Node — Component Set | `411:7907` |
| Total Variants | 48 |
| Has States | Yes — Enabled · Hover · Disabled |

> ### ⚠️ Critical Requirement — Expose Nested Instance Properties
>
> The main **`Button`** component (every variant) **MUST** have **all** properties from its nested **`_base Button`** instance exposed onto it. In Figma: select the main component/variant → **Properties** panel → **"Expose properties from → Nested instances"**. Without this, the `_base Button` properties stay buried inside the nested instance and designers cannot access them from the main component. This applies to **every** variant — see the dedicated "Expose Nested Instance Properties" step below for details.

Button is the primary interactive action trigger in the design system. It supports a text label, a prefix icon, and a suffix icon. It comes in two sizes, three states, and ten type styles including destructive (Critical) variants.

---

## Component Hierarchy

```
Level 1 — Base Component
└── _base Button                   [COMPONENT_SET]
    ├── Size=Large                 [COMPONENT]
    └── Size=Small                 [COMPONENT]

Level 2 — Variants (Component Set)
└── Button                         [COMPONENT_SET]
    └── Size=Large, State=Enabled, Type=Primary
          └── _base Button         [INSTANCE of Size=Large]
    └── Size=Large, State=Hover, Type=Primary
          └── _base Button         [INSTANCE of Size=Large]
    └── … (46 more — same structure)
```

> ⚠️ **CRITICAL — Base Component Note:**
> `_base Button` is a **COMPONENT_SET** (not a single COMPONENT) because it contains two size variants — Large and Small — each with different padding, gap, icon size, and text style. When building a Button variant, always place an instance of the correct size (`Size=Large` or `Size=Small`) inside the variant wrapper frame.

> ⚠️ **CRITICAL — Inheritance Rule:**
> Each Button variant is a **wrapper COMPONENT frame** containing exactly **one instance of `_base Button`** (the correct size). `Left Icon`, `Button` (text), and `Right Icon` are children of that instance — never direct children of the variant wrapper frame.
>
> **Correct layer structure:**
> ```
> ▼ Size=Large, State=Enabled, Type=Primary   ← variant COMPONENT
>     ▼ _base Button                           ← INSTANCE (do not detach)
>          Left Icon
>          T Button
>          Right Icon
> ```

---

## Variant Properties

### Type (10 options)

| Type | Description |
|---|---|
| `Primary` | Solid brand blue fill · white text and icons |
| `Bordered` | White/dark fill · 1px border · dark text and icons |
| `Text` | No fill · no border · **no padding** · secondary (orange) text and icons |
| `Link` | No fill · no border · **no padding** · secondary (orange) text · underline decoration |
| `Icon Filled` | Solid brand blue fill · white icon · **Left Icon only** (text hidden, Right Icon hidden) · square sizing |
| `Icon Secondary` | White/dark fill · 1px border · **Left Icon only** (text hidden, Right Icon hidden) · square sizing |
| `Icon Only` | No fill · no border · **Left Icon only** (text hidden, Right Icon hidden) · square sizing |
| `Critical Primary` | Solid critical red fill · white text · Disabled state only |
| `Critical Bordered` | No fill · 1px critical border · red text · Disabled state only |
| `Critical Text` | No fill · no border · red text · Disabled state only |

> **Critical types** (`Critical Primary`, `Critical Bordered`, `Critical Text`) only appear in `State=Disabled`. They do not have Enabled or Hover variants.

### Size (2 options)

| Property | Large | Small |
|---|---|---|
| Height | 44px (fixed) | 36px (fixed) |
| Padding H (Primary · Bordered · Critical) | `spacing-4xl` (20px) | `spacing-3xl` (16px) |
| Padding V (Primary · Bordered · Critical) | `spacing-xl` (12px) | `spacing-lg` (10px) |
| **Padding H (Icon Filled · Icon Secondary)** | **`spacing-xl` (12px) — square** | **`spacing-lg` (10px) — square** |
| **Padding H (Icon Only)** | **`spacing-none` (0px)** | **`spacing-none` (0px)** |
| **Padding V (Icon Only)** | **`spacing-none` (0px)** | **`spacing-none` (0px)** |
| **Gap (Icon Only)** | **`spacing-none` (0px)** | **`spacing-none` (0px)** |
| **Padding H (Text · Link)** | **`spacing-none` (0px)** | **`spacing-none` (0px)** |
| **Padding V (Text · Link)** | **`spacing-none` (0px)** | **`spacing-none` (0px)** |
| Gap (all other types) | `spacing-md` (8px) | `spacing-xs` (4px) |
| Icon Size | 20px | 16px |
| Text Style | `Body sm/Medium` (14px) | `Label sm/Medium` (12px) |

> **Icon Filled & Icon Secondary sizing rule:** Override padding Left/Right to match padding Top/Bottom (`spacing-xl` for Large, `spacing-lg` for Small). This makes the button **44×44px** (Large) or **36×36px** (Small) — a perfect square.
>
> **Icon Only sizing rule:** Override ALL padding (Top, Bottom, Left, Right) and Gap to `spacing-none` (0px). The button dimensions are determined entirely by the icon size: **20×20px** (Large) or **16×16px** (Small). No background, no border, no spacing — just the icon.
>
> **Text & Link sizing rule:** Override ALL padding (Top, Bottom, Left, Right) to `spacing-none` (0px). The button hugs the label and icons with no surrounding space. No background, no border, no padding.

### State (3 options)

| State | Description |
|---|---|
| `Enabled` | Default resting state |
| `Hover` | Darker background / border / text — responds to pointer interaction |
| `Disabled` | Muted colors · non-interactive · includes Critical type variants |

---

## Component Structure

### Level 1 — `_base Button` Structure

```
_base Button — Size=Large                    [COMPONENT]
  Auto Layout:     Horizontal
  Alignment:       Center (cross-axis) · Center (primary-axis)
  Sizing:          HUG × FIXED (44px)
  Padding:         12px top/bottom (spacing-xl) · 20px left/right (spacing-4xl)
  Gap:             8px (spacing-md)
  Corner Radius:   radius-xl (all 4 corners)
  │
  ├── Left Icon                              [INSTANCE — Icon component]
  │     Size:      Property 1 = 20px
  │     Instance:  Property 2 = [icon-name] (swappable)
  │     Structure: Left Icon [INSTANCE] → 20px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]
  │     Color:     Override Icon VECTOR **stroke** → btn-icon-* variable per variant (do NOT touch fill)
  │     Visible:   Controlled by Show Prefix property
  │
  ├── Button                                 [TEXT — HUG × HUG]
  │     Style:     Body sm/Medium (14px · 18px LH · 0 LS)
  │     Fill:      btn-text-* variable per variant
  │
  └── Right Icon                             [INSTANCE — Icon component]
        Size:      Property 1 = 20px
        Instance:  Property 2 = [icon-name] (swappable)
        Structure: Right Icon [INSTANCE] → 20px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]
        Color:     Override Icon VECTOR **stroke** → btn-icon-* variable per variant (do NOT touch fill)
        Visible:   Controlled by Show Suffix property

_base Button — Size=Small                    [COMPONENT]
  Sizing:          HUG × FIXED (36px)
  Padding:         10px top/bottom (spacing-lg) · 16px left/right (spacing-3xl)
  Gap:             4px (spacing-xs)
  Corner Radius:   radius-xl (all 4 corners)
  Icon Size:       16px (Left Icon and Right Icon both use 16px)
  Text Style:      Label sm/Medium (12px · 16px LH · 0 LS)
  [All other properties same as Large]
```

### Level 2 — `Button` Variant Structure

Each variant in the `Button` Component Set is a **wrapper COMPONENT** containing exactly **one instance of `_base Button`** at the matching size. Only the fill, stroke, text color, and icon color change between variants — the layout never changes.

```
Button                                       [COMPONENT_SET]
  │
  ├── Size=Large, State=Enabled, Type=Primary  [COMPONENT]
  │     └── _base Button (Size=Large)          [INSTANCE]
  │           ├──  Left Icon
  │           ├── Button (text)
  │           └── Right Icon
  │
  ├── Size=Large, State=Hover, Type=Primary    [COMPONENT]
  │     └── _base Button (Size=Large)          [INSTANCE]
  │
  └── … (46 more — all follow the same structure)
```

**What changes between variants:**

| Property | Controlled by |
|---|---|
| Frame fill | Background variable per Type + State |
| Stroke color | Border variable per Type + State |
| `Button` text fill | Text color variable per Type + State |
| `Left Icon` VECTOR fill | Icon color variable per Type + State |
| `Right Icon` VECTOR fill | Icon color variable per Type + State |

**What never changes between variants:**

| Property | Value |
|---|---|
| Auto Layout direction | Horizontal |
| Padding (Large) | `spacing-xl` / `spacing-4xl` |
| Padding (Small) | `spacing-lg` / `spacing-3xl` |
| Gap (Large) | `spacing-md` |
| Gap (Small) | `spacing-xs` |
| Corner radius | `radius-xl` |
| Icon size (Large) | 20px |
| Icon size (Small) | 16px |
| Typography | Text style `Body sm/Medium` (Large) · `Label sm/Medium` (Small) applied on `Button` layer |

### Layer Descriptions

| Layer | Type | Parent | Visibility | Notes |
|---|---|---|---|---|
| `_base Button` | INSTANCE | Variant wrapper frame | Always | Only direct child of every variant |
| `Left Icon` | INSTANCE | `_base Button` instance | Toggleable via `Show Prefix` | Icon component, Size=20px (Large) / 16px (Small) |
| `Button` | TEXT | `_base Button` instance | Always visible | HUG sizing, text style applied (`Body sm/Medium` Large · `Label sm/Medium` Small) |
| `Right Icon` | INSTANCE | `_base Button` instance | Toggleable via `Show Suffix` | Icon component, Size=20px (Large) / 16px (Small). **Hidden for all icon-only types** (`Show Suffix = false`) |

### Component Properties

| Property Name | Type | Default | Purpose |
|---|---|---|---|
| `Size` | VARIANT | `Large` | Switches between Large and Small base |
| `Show Prefix#19257:1` | BOOLEAN | `true` | Show/hide the left icon |
| `Show Suffix#19257:0` | BOOLEAN | `true` | Show/hide the right icon |
| `Text#19257:2` | TEXT | `Button` | Button label content |

---

## Attached Variables

### Spacing

| Property | Large Variable | Large Value | Small Variable | Small Value |
|---|---|---|---|---|
| Padding Top | `spacing-xl` | 12px | `spacing-lg` | 10px |
| Padding Bottom | `spacing-xl` | 12px | `spacing-lg` | 10px |
| Padding Left | `spacing-4xl` | 20px | `spacing-3xl` | 16px |
| Padding Right | `spacing-4xl` | 20px | `spacing-3xl` | 16px |
| Gap | `spacing-md` | 8px | `spacing-xs` | 4px |

### Radius

| Property | Variable | Value |
|---|---|---|
| Corner Radius (all 4) | `radius-xl` | 12px |

### Typography

| Size | Text Layer | Text Style | Font |
|---|---|---|---|
| Large | `Button` | `Body sm/Medium` | Inter · Medium (500) · 14px · 18px LH · 0 LS |
| Small | `Button` | `Label sm/Medium` | Inter · Medium (500) · 12px · 16px LH · 0 LS |

> Apply the text style directly on the `Button` text layer. Do not bind individual font variables.

### Colors — All Button Variables

All button color variables live in the `Component/Button/` namespace inside the `Color Style` collection. Never use `_Primitives` variables directly.

#### Background Variables

| Variable | Used on |
|---|---|
| `Component/Button/btn-bg-primary` | Primary · Icon Filled (Enabled) |
| `Component/Button/btn-bg-primary-focused` | Primary · Icon Filled (Hover) |
| `Component/Button/btn-bg-primary-disabled` | Primary · Icon Filled (Disabled) |
| `Component/Button/btn-bg-bordered` | Bordered · Icon Secondary · Icon Only (all states) |
| `Component/Button/btn-bg-critical` | Critical Primary (Disabled) |

#### Text Variables

| Variable | Used on |
|---|---|
| `Component/Button/btn-text-primary` | Primary · Icon Filled · Icon Secondary (Enabled/Hover) |
| `Component/Button/btn-text-bordered` | Bordered · Icon Only (Enabled/Hover) |
| `Component/Button/btn-text-secondary` | Text · Link (Enabled) |
| `Component/Button/btn-text-secondary-focused` | Text · Link (Hover) |
| `Component/Button/btn-text-secondary-disabled` | Text · Link (Disabled) |
| `Component/Button/btn-text-disabled` | Primary · Bordered · Icon (Disabled) |
| `Component/Button/btn-text-critical` | Critical Bordered · Critical Text (Disabled) |

#### Border Variables

| Variable | Used on |
|---|---|
| `Component/Button/btn-border-primary` | Bordered · Icon Secondary (Enabled) |
| `Component/Button/btn-border-focused` | Bordered · Icon Secondary (Hover) |
| `Component/Button/btn-border-disabled` | Bordered · Icon Secondary (Disabled) |
| `Component/Button/btn-border-critical` | Critical Bordered (Disabled) |

Stroke weight is **1px inside** for all bordered types. No stroke for Primary, Text, Link, Icon Filled, Icon Only, Critical Primary, Critical Text.

#### Icon Color Variables

| Variable | Used on |
|---|---|
| `Component/Button/btn-icon-primary` | Primary · Icon Filled (Enabled/Hover) |
| `Component/Button/btn-icon-bordered` | Bordered · Icon Secondary · Icon Only (Enabled/Hover) |
| `Component/Button/btn-icon-secondary` | Text · Link (Enabled) |
| `Component/Button/btn-icon-secondary-focused` | Text · Link (Hover) |
| `Component/Button/btn-icon-secondary-disabled` | Text · Link (Disabled) |
| `Component/Button/btn-icon-disabled` | Primary · Bordered · Icon (Disabled) |
| `Component/Button/btn-icon-critical` | All Critical types (Disabled) |

### Variable Map Per Variant

#### Primary

| State | Frame Fill | Text | Icon | Stroke |
|---|---|---|---|---|
| Enabled | `btn-bg-primary` | `btn-text-primary` | `btn-icon-primary` | None |
| Hover | `btn-bg-primary-focused` | `btn-text-primary` | `btn-icon-primary` | None |
| Disabled | `btn-bg-primary-disabled` | `btn-text-disabled` | `btn-icon-disabled` | None |

#### Bordered

| State | Frame Fill | Text | Icon | Stroke |
|---|---|---|---|---|
| Enabled | `btn-bg-bordered` | `btn-text-bordered` | `btn-icon-bordered` | `btn-border-primary` |
| Hover | `btn-bg-bordered` | `btn-text-bordered` | `btn-icon-bordered` | `btn-border-focused` |
| Disabled | `btn-bg-bordered` | `btn-text-disabled` | `btn-icon-disabled` | `btn-border-disabled` |

#### Text

| State | Frame Fill | Text | Icon | Stroke |
|---|---|---|---|---|
| Enabled | None | `btn-text-secondary` | `btn-icon-secondary` | None |
| Hover | None | `btn-text-secondary-focused` | `btn-icon-secondary-focused` | None |
| Disabled | None | `btn-text-secondary-disabled` | `btn-icon-secondary-disabled` | None |

#### Link

| State | Frame Fill | Text | Icon | Stroke | Note |
|---|---|---|---|---|---|
| Enabled | None | `btn-text-secondary` | `btn-icon-secondary` | None | Text underline decoration |
| Hover | None | `btn-text-secondary-focused` | `btn-icon-secondary-focused` | None | Text underline decoration |
| Disabled | None | `btn-text-secondary-disabled` | `btn-icon-secondary-disabled` | None | Text underline decoration |

#### Icon Filled

| State | Frame Fill | Icon | Stroke | Note |
|---|---|---|---|---|
| Enabled | `btn-bg-primary` | `btn-icon-primary` | None | Left Icon only · text hidden · square padding |
| Hover | `btn-bg-primary-focused` | `btn-icon-primary` | None | Left Icon only · text hidden · square padding |
| Disabled | `btn-bg-primary-disabled` | `btn-icon-disabled` | None | Left Icon only · text hidden · square padding |

#### Icon Secondary

| State | Frame Fill | Icon | Stroke | Note |
|---|---|---|---|---|
| Enabled | `btn-bg-bordered` | `btn-icon-bordered` | `btn-border-primary` | Left Icon only · text hidden · square padding |
| Hover | `btn-bg-bordered` | `btn-icon-bordered` | `btn-border-focused` | Left Icon only · text hidden · square padding |
| Disabled | `btn-bg-bordered` | `btn-icon-disabled` | `btn-border-disabled` | Left Icon only · text hidden · square padding |

#### Icon Only

| State | Frame Fill | Icon | Stroke | Note |
|---|---|---|---|---|
| Enabled | None | `btn-icon-bordered` | None | Left Icon only · text hidden · **all padding + gap = 0** |
| Hover | None | `btn-icon-bordered` | None | Left Icon only · text hidden · **all padding + gap = 0** |
| Disabled | None | `btn-icon-disabled` | None | Left Icon only · text hidden · **all padding + gap = 0** |

#### Critical Primary (Disabled only)

| State | Frame Fill | Text | Icon | Stroke |
|---|---|---|---|---|
| Disabled | `btn-bg-critical` | `btn-text-primary` | `btn-icon-primary` | None |

#### Critical Bordered (Disabled only)

| State | Frame Fill | Text | Icon | Stroke |
|---|---|---|---|---|
| Disabled | None | `btn-text-critical` | `btn-icon-critical` | `btn-border-critical` |

#### Critical Text (Disabled only)

| State | Frame Fill | Text | Icon | Stroke |
|---|---|---|---|---|
| Disabled | None | `btn-text-critical` | `btn-icon-critical` | None |

---

## Icons

### Icon Component Structure

The Icon component used in Button follows this exact layer hierarchy:

```
Left Icon / Right Icon          [INSTANCE — outer Icon component]
└── 20px or 16px                [COMPONENT — size variant]
    └── [icon-name]             [COMPONENT — named icon]
        └── Icon                [VECTOR — flat path, fill variable lives here]
```

This structure is consistent across all icon sizes and all icon names. The depth is always 4 levels.

### Icon Sizes

| Size Variant | Used in |
|---|---|
| `20px` | `_base Button — Size=Large` |
| `16px` | `_base Button — Size=Small` |

### Icon Placement

| Layer | Position | Default Instance | Toggleable |
|---|---|---|---|
| `Left Icon` | Leading (leftmost child) | Any — set via `Prefix Icon` swap | Yes — `Show Prefix` Boolean |
| `Right Icon` | Trailing (rightmost child) | Any — set via `Suffix Icon` swap | Yes — `Show Suffix` Boolean |

### Icon Color — Override Instructions

> ⚠️ **Icon color must be overridden on the STROKE of the innermost `Icon` VECTOR layer — not the fill, not any outer frame.**
>
> Button uses **linear/outline icons** from the icon set. The icon shape is drawn with a **stroke**, not a fill. The color lives on the stroke of the innermost `Icon` VECTOR. Do not touch the fill.
>
> **To override icon color in a Button variant:**
> 1. Double-click → enter the `Left Icon` INSTANCE
> 2. Double-click → enter the `20px` or `16px` COMPONENT (size variant)
> 3. Double-click → enter the `[icon-name]` COMPONENT
> 4. Select the `Icon` **VECTOR** layer — flat path, no further nesting
> 5. In the **Stroke** panel, click the existing stroke color swatch to replace it (do not touch the Fill panel)
> 6. Switch to Variable mode and select the correct `Component/Button/btn-icon-*` variable for that variant and state
>
> The path is always: `Left Icon [INSTANCE] → 20px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`
> This depth stays the same regardless of which icon is swapped in.

---

## States

### State Variable Changes

| State | What changes |
|---|---|
| **Enabled → Hover** | Primary/Icon Filled: fill → `btn-bg-primary-focused` · Bordered/Icon Secondary: stroke → `btn-border-focused` · Text/Link: text → `btn-text-secondary-focused`, icon → `btn-icon-secondary-focused` |
| **Enabled → Disabled** | All types: text → `btn-text-disabled`, icon → `btn-icon-disabled` (except Text/Link/Critical which have their own disabled tokens) · Primary fill → `btn-bg-primary-disabled` · Bordered stroke → `btn-border-disabled` · Critical variants appear only here |

### State Details Per Type

| Type | Enabled | Hover | Disabled |
|---|---|---|---|
| Primary | `btn-bg-primary` | `btn-bg-primary-focused` | `btn-bg-primary-disabled` + disabled text/icon |
| Bordered | `btn-border-primary` stroke | `btn-border-focused` stroke | `btn-border-disabled` stroke + disabled text/icon |
| Text | `btn-text-secondary` | `btn-text-secondary-focused` | `btn-text-secondary-disabled` |
| Link | Same as Text | Same as Text Hover | Same as Text Disabled |
| Icon Filled | Same as Primary | Same as Primary Hover | Same as Primary Disabled |
| Icon Secondary | Same as Bordered | Same as Bordered Hover | Same as Bordered Disabled |
| Icon Only | `btn-icon-bordered` | `btn-icon-bordered` | `btn-icon-disabled` |
| Critical Primary | — | — | `btn-bg-critical` + white text/icon |
| Critical Bordered | — | — | `btn-border-critical` + `btn-text-critical` |
| Critical Text | — | — | `btn-text-critical` + no border/fill |

---

## Figma Construction Guide

### Step 1 — Build `_base Button — Size=Large`

1. Create a new **Frame**. Name it `Size=Large`.
2. Apply **Horizontal Auto Layout**.
3. Set sizing to **HUG width × FIXED height (44px)**.
4. Set **cross-axis alignment** to Center, **primary-axis alignment** to Center.
5. Attach spacing variables:
   - Padding Top/Bottom → `spacing-xl`
   - Padding Left/Right → `spacing-4xl`
   - Gap → `spacing-md`
6. Attach radius variable → `radius-xl` (all 4 corners).
7. Add a **Fill** layer. Bind fill color to `Component/Button/btn-bg-primary` as the default.
8. Convert to a **Component**.

### Step 2 — Add Child Layers to Size=Large

#### Left Icon
1. Place an instance of the **Icon component** (design system) inside the frame.
2. Name it `Left Icon`.
3. Set **Property 1 — Size** to `20px`.
4. Set **Property 2 — Icon Instance** to any default icon (swappable).
5. Position it as the **first child** (leading).
6. Create an **Instance Swap component property**: `Prefix Icon`. Link to this instance.
7. Create a **Boolean component property**: `Show Prefix` (default: `true`). Link to layer visibility.
8. Override the `Icon` VECTOR **stroke** inside (`Left Icon → 20px → [icon-name] → Icon`) → `Component/Button/btn-icon-primary`. Do NOT touch the fill.

#### Button (Label)
1. Add a **Text** layer. Name it `Button`.
2. Set default content to `Button`.
3. Apply text style **`Body sm/Medium`** on the layer.
4. Bind fill color → `Component/Button/btn-text-primary`.
5. Set sizing to **HUG** on both axes.
6. Create a **Text component property**: `Text` (default: `Button`). Link to text content.

#### Right Icon
1. Same as Left Icon setup, but position as the **last child** (trailing).
2. Create **Instance Swap**: `Suffix Icon`. Create **Boolean**: `Show Suffix` (default: `true`).
3. Override the `Icon` VECTOR **stroke** → `Component/Button/btn-icon-primary`. Do NOT touch the fill.

### Step 3 — Build `_base Button — Size=Small`

Duplicate `Size=Large` and apply every adjustment below. **All of these are required** — missing any one will produce a visually incorrect Small button.

1. Set **Height** → `36px` (fixed)
2. Set **Padding Top/Bottom** → `spacing-lg` (10px)
3. Set **Padding Left/Right** → `spacing-3xl` (16px)
4. Set **Gap** → `spacing-xs` (4px)
5. **Select the `Left Icon` instance** → in the Properties panel, change **`Size` → `16px`**

   > ⚠️ This is the most commonly missed step. The `Left Icon` instance has a `Size` variant property on the Icon component. You must explicitly change it from `20px` to `16px`. Do not just resize the layer — use the component's Size property.

6. **Select the `Right Icon` instance** → in the Properties panel, change **`Size` → `16px`** (same as above)
7. Select the `Button` text layer → apply text style **`Label sm/Medium`**

### Step 4 — Combine into `_base Button` Component Set

1. Select both `Size=Large` and `Size=Small` components.
2. Combine into a **Component Set**. Name it `_base Button`.
3. Add variant property `Size` → options: `Large`, `Small`.

### Step 5 — Build Button Variants (Component Set)

> ⚠️ **Do NOT duplicate `_base Button` directly as a variant.** Always create a wrapper frame, place an instance of `_base Button` inside, then convert to a Component.

**For each of the 48 variants:**

1. Create a new **Frame** and immediately apply **Horizontal Auto Layout**. Set sizing to **HUG × HUG**.
   > ⚠️ **CRITICAL — Always use Auto Layout for the variant wrapper frame, never a plain Frame.** Auto Layout is mandatory on every variant wrapper — the frame must hug the `_base Button` instance inside via Auto Layout, not by manual resizing.
2. Place an instance of `_base Button` (correct Size) inside it.
3. Select the outer Auto Layout frame and convert to a **Component**.
5. Name it: `Size=Large, State=Enabled, Type=Primary` (adjust per variant).
6. Select all 48 variant components and combine into a **Component Set** named `Button`.
7. Add **Variant properties**:
   - `Size` → `Large`, `Small`
   - `State` → `Enabled`, `Hover`, `Disabled`
   - `Type` → `Primary`, `Bordered`, `Text`, `Link`, `Icon Only`, `Icon Secondary`, `Icon Filled`, `Critical Primary`, `Critical Bordered`, `Critical Text`

**For each variant, select the `_base Button` instance inside and override:**

| Property | Target | Value |
|---|---|---|
| Frame fill | `_base Button` instance frame | Background variable per type/state table |
| Stroke color | `_base Button` instance frame | Border variable (Bordered/Critical types only) |
| Stroke weight | `_base Button` instance frame | 1px inside (Bordered/Critical types only) |
| `Button` text fill | `Button` text layer inside instance | Text color variable per type/state table |
| `Left Icon` VECTOR **stroke** | `Icon` VECTOR at `Left Icon → [size]px → [icon-name] → Icon` | Icon color variable per type/state table — change STROKE not fill |
| `Right Icon` VECTOR **stroke** | `Icon` VECTOR at `Right Icon → [size]px → [icon-name] → Icon` | Icon color variable per type/state table — change STROKE not fill |
| **Padding Left/Right** *(Icon Filled · Icon Secondary only)* | `_base Button` instance frame | Override to `spacing-xl` (Large) or `spacing-lg` (Small) — makes button square |
| **All Padding + Gap** *(Icon Only)* | `_base Button` instance frame | Override ALL padding and gap to `spacing-none` (0px) — no spacing at all |
| **All Padding** *(Text · Link)* | `_base Button` instance frame | Override ALL padding (Top, Bottom, Left, Right) to `spacing-none` (0px) — no padding at all |

> ⚠️ **CRITICAL — Text & Link Padding Removal (Both Sizes):**
> For `Type=Text` and `Type=Link`, you **must remove all fixed padding** on the `_base Button` instance — for **both Large and Small sizes**. This means:
> - **Large:** Override Padding Top (`spacing-xl` → `spacing-none`), Padding Bottom (`spacing-xl` → `spacing-none`), Padding Left (`spacing-4xl` → `spacing-none`), Padding Right (`spacing-4xl` → `spacing-none`)
> - **Small:** Override Padding Top (`spacing-lg` → `spacing-none`), Padding Bottom (`spacing-lg` → `spacing-none`), Padding Left (`spacing-3xl` → `spacing-none`), Padding Right (`spacing-3xl` → `spacing-none`)
>
> The button must have **zero padding on all four sides** for both sizes. The frame dimensions are driven entirely by the label and icon content — no background, no border, no surrounding space. Do not leave any inherited padding from the base component.
| **Show Suffix** *(all icon types)* | `_base Button` instance | Set to `false` — show Left Icon only |
| **Button text** *(all icon types)* | `Button` text layer | Hide via layer visibility override |

### Step 6 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.** Without it, properties like `Show Prefix`, `Show Suffix`, `Text`, and icon swap properties will not be accessible on the Button variant. Designers would have to enter the nested `_base Button` instance manually to interact with them.

For every variant in the `Button` Component Set:

1. Select the variant wrapper COMPONENT frame
2. In the right panel, go to **Properties**
3. Click **"Expose properties from Nested instances"**
4. All properties from the `_base Button` instance inside will surface: `Show Prefix`, `Show Suffix`, `Text`, `Prefix Icon`, `Suffix Icon`, `Size`
5. These are now accessible directly on the `Button` variant without entering the nested instance

Do this for **all 48 variants**. You can select all variants at once and expose in a single action after combining into the Component Set.

---

### Step 7 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| `_base Button` frame (Large) | Fill | Background variable per variant |
| `_base Button` frame (Large) | Stroke color | Border variable (bordered types only) |
| `_base Button` frame (Large) | Padding Top/Bottom | `spacing-xl` |
| `_base Button` frame (Large) | Padding Left/Right | `spacing-4xl` |
| `_base Button` frame (Large) | Gap | `spacing-md` |
| `_base Button` frame (Small) | Padding Top/Bottom | `spacing-lg` |
| `_base Button` frame (Small) | Padding Left/Right | `spacing-3xl` |
| `_base Button` frame (Small) | Gap | `spacing-xs` |
| `_base Button` frame (both) | All corner radii | `radius-xl` |
| `Button` text layer | Fill | Text color variable per variant |
| `Button` text layer (Large) | Text Style | `Body sm/Medium` |
| `Button` text layer (Small) | Text Style | `Label sm/Medium` |
| `Left Icon → [size]px → [icon-name] → Icon` | **Stroke** (VECTOR) | Icon color variable per variant — change STROKE not fill |
| `Right Icon → [size]px → [icon-name] → Icon` | **Stroke** (VECTOR) | Icon color variable per variant — change STROKE not fill |

### Step 8 — Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Base component set | `_base [ComponentName]` | `_base Button` |
| Base size variant | `Size=[Size]` | `Size=Large` |
| Component Set | `[ComponentName]` | `Button` |
| Variant property | `PascalCase` | `Type`, `State`, `Size` |
| Variant option | `PascalCase` | `Primary`, `Enabled`, `Large` |
| Layer names | `PascalCase` | `Left Icon`, `Button`, `Right Icon` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All colors must come from `Component/Button/btn-*` variables in the `Color Style` collection.
- **No hardcoded values.** All spacing, radius, typography, and color values must be variable-bound.
- **Variant wrapper frame must use Auto Layout.** Every variant COMPONENT that wraps a `_base Button` instance must be created as an **Auto Layout frame** (Horizontal, HUG × HUG) — never a plain Frame. This applies to all 48 variants without exception.
- **Stroke weight (1px) is the only hardcoded value** — no spacing or radius variable exists for stroke weight.
- **Icon color must be overridden on the STROKE of the `Icon` VECTOR** at path `[Left/Right Icon] → [size]px → [icon-name] → Icon`. These are linear/outline icons — color lives on the stroke, not the fill. Never apply fill on the VECTOR or any outer frame.
- **Critical types are Disabled-only.** Do not create Enabled or Hover variants for Critical Primary, Critical Bordered, or Critical Text.
- **Both text style and typography variable bindings are required.** Applying the text style alone is not sufficient.
- **`_base Button` is a COMPONENT_SET.** Always instance the correct size variant (`Size=Large` or `Size=Small`) when building Button variants.
- **For `Icon Filled` and `Icon Secondary`**: use only the Left Icon (`Show Prefix = true`, `Show Suffix = false`), hide the `Button` text layer, and override padding Left/Right to match padding Top/Bottom (`spacing-xl` for Large, `spacing-lg` for Small) — producing a **square button**.
- **For `Icon Only`**: use only the Left Icon (`Show Prefix = true`, `Show Suffix = false`), hide the `Button` text layer, and override ALL padding (Top, Bottom, Left, Right) AND gap to `spacing-none` (0px). No background, no border, no spacing — the button is exactly the size of the icon.
- **For `Text` and `Link`**: override ALL padding (Top, Bottom, Left, Right) to `spacing-none` (0px) — **for both Large and Small sizes**. Large removes `spacing-xl` (top/bottom) and `spacing-4xl` (left/right); Small removes `spacing-lg` (top/bottom) and `spacing-3xl` (left/right). No background, no border, no padding — the button dimensions are driven entirely by the label and icon content. Never leave inherited base padding on Text or Link variants.

---

## Figma Component Page — Arrangement

### Page Frame Structure

Place the actual `_base Button` component and the actual `Button` Component Set directly — do not create separate instances for display.

```
┌────────────────────────────────────────────────────────────┐
│  BUTTON COMPONENT SYSTEM           ← small caps label      │
│  Button                            ← large bold title      │
│  48 variants · Size: Large · Small · Type: 10 styles       │
│  · State: Enabled · Hover · Disabled  ← summary tagline   │
│  ──────────────────────────────────  ← horizontal divider  │
│                                                             │
│  ▌ _base Button — Base Component   ← section heading       │
│    2 size variants · Large (44px) · Small (36px)           │
│                                                             │
│    [ actual _base Button COMPONENT_SET placed here ]       │
│                                                             │
│  ▌ Button — All 48 Variants        ← section heading       │
│    Size × State × Type · Component/Button variables        │
│                                                             │
│    [ actual Button COMPONENT_SET placed here ]             │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

### Header Block

| Element | Content |
|---|---|
| System label | `BUTTON COMPONENT SYSTEM` |
| Title | `Button` |
| Summary tagline | `48 variants · Size: Large · Small · Type: Primary · Bordered · Text · Link · Icon Filled · Icon Secondary · Icon Only · Critical Primary · Critical Bordered · Critical Text · State: Enabled · Hover · Disabled` |
| Divider | Full-width horizontal rule below summary |

### Section 1 — Base Component

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `_base Button — Base Component` |
| Subtitle | `2 size variants · Large (44px) · Small (36px) · All spacing, radius, and typography variables attached` |
| Content | Place the **actual `_base Button` COMPONENT_SET** directly on the page |

### Section 2 — All Variants

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Button — All 48 Variants` |
| Subtitle | `Size × State × Type · All Component/Button variables · Critical types in Disabled only` |
| Content | Place the **actual `Button` COMPONENT_SET** directly on the page |

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame with consistent gap between sections.
- The **blue accent bar** is a `3–4px wide rectangle` with the brand primary fill, full height of the section title block.
- **Do not create new instances or duplicate components** — place the actual component sets directly.
- `_base Button` default properties: Show Prefix = ON, Show Suffix = ON, Text = "Button", Size = Large.