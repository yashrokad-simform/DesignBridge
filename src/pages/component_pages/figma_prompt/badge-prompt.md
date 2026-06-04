# Badge

## Overview

| Property | Value |
|---|---|
| Component Name | Badge |
| Base Component | `_base Badge` |
| Component Set | `Badge` |
| Node — Base | `80:20388` |
| Node — Component Set | `411:22195` |
| Total Variants | 36 (3 Types × 12 Colors) |
| Has States | No — static, non-interactive component |

Badge is a compact, non-interactive label used to communicate status, category, or contextual metadata. It is always read-only and carries no hover, focus, pressed, or disabled states.

---

## Component Hierarchy

```
Level 1 — Base Component
└── _base Badge                    [COMPONENT]
      ├── Dot                      [ELLIPSE]
      ├── Label                    [TEXT]
      └── Icon                     [INSTANCE]

Level 2 — Variants (Component Set)
└── Badge                          [COMPONENT_SET]
    └── Type=Filled, Color=Primary [COMPONENT — variant wrapper]
          └── _base Badge          [INSTANCE of Level 1]
    └── Type=Bordered, Color=Primary
          └── _base Badge          [INSTANCE of Level 1]
    └── … (34 more variants, same structure)
```

> ⚠️ **CRITICAL — Base Component Inheritance Rule:**
> Each variant is a **wrapper COMPONENT frame** that contains exactly **one instance of `_base Badge`**. The children `Dot`, `Label`, and `Icon` live inside that instance — they are **never** direct children of the variant frame itself.
>
> **Correct layer panel structure for any variant:**
> ```
> ▼ Type=Bordered, Color=Primary     ← variant component frame
>     ▼ _base Badge                  ← single instance (DO NOT expand/detach)
>         ○ Dot
>         T Label
>         ◇ Icon
> ```
>
> **Wrong (do not do this):**
> ```
> ▼ Bordered, Primary                ← variant component frame
>     ○ Dot                          ← direct child (INCORRECT)
>     T Label                        ← direct child (INCORRECT)
>     ◇ Icon                         ← direct child (INCORRECT)
> ```
>
> Building variants by duplicating the base component's children directly is wrong. The variant must wrap an **instance** of `_base Badge` and override variables on that instance.

---

## Variant Properties

### Type (3 options)

| Type | Description |
|---|---|
| `Filled` | Solid background, white text. Strong emphasis. |
| `Bordered` | Light tint background + 1px stroke, colored text. Medium emphasis. |
| `Tertiary` | Light tint background only, no stroke, colored text. Subtle emphasis. |

> **Tertiary = Bordered without the border stroke.** Fill and text variables are identical between Bordered and Tertiary for every color. Only the stroke layer differs.

### Color (12 options)

| Color | Category |
|---|---|
| `Primary` | Brand |
| `Secondary` | Brand |
| `Success` | Semantic |
| `Warning` | Semantic |
| `Critical` | Semantic |
| `Gray` | Neutral |
| `Cyan` | Status |
| `Indigo` | Status |
| `Purple` | Status |
| `Fuchsia` | Status |
| `Rose` | Status |
| `Teal` | Status |

---

## Component Structure

### Level 1 — `_base Badge` Structure

```
_base Badge                             [COMPONENT]
  Auto Layout:     Horizontal
  Alignment:       Center (cross-axis)
  Sizing:          HUG × HUG
  Padding:         4px top/bottom · 8px left/right
  Gap:             6px
  Corner Radius:   radius-full (9999)
  │
  ├── Dot                               [ELLIPSE]
  │     Size:      6×6px (fixed)
  │     Fill:      Status/text-white (default)
  │     Visible:   Controlled by Show Dot property
  │
  ├── Label                             [TEXT]
  │     Style:     Label sm/Medium
  │     Sizing:    HUG × HUG
  │     Fill:      Status/text-white (default)
  │     Visible:   Always
  │
  └── Icon                              [INSTANCE — Icon component]
        Size:      Property 1 = 12px
        Instance:  Property 2 = Close (swap to Close/X icon directly inside the instance)
        Structure: Icon [INSTANCE] → 12px [COMPONENT] → close [COMPONENT] → Icon [VECTOR]
        Color:     Override the Icon VECTOR **stroke** to match Label color variable (do NOT touch fill)
        Stroke:    None
        Visible:   Controlled by Show Suffix property
```

### Level 2 — `Badge` Variant Structure

Each variant in the `Badge` Component Set is a **wrapper COMPONENT** containing exactly **one instance of `_base Badge`**. The child layers (`Dot`, `Label`, `Icon`) belong to the instance — they are never direct children of the variant frame.

```
Badge                                   [COMPONENT_SET]
  │
  ├── Type=Filled, Color=Primary        [COMPONENT — variant wrapper]
  │     └── _base Badge                 [INSTANCE]
  │           ├── Dot
  │           ├── Label
  │           └── Icon
  │
  ├── Type=Bordered, Color=Primary      [COMPONENT — variant wrapper]
  │     └── _base Badge                 [INSTANCE]
  │           ├── Dot
  │           ├── Label
  │           └── Icon
  │
  ├── Type=Tertiary, Color=Primary      [COMPONENT — variant wrapper]
  │     └── _base Badge                 [INSTANCE]
  │           ├── Dot
  │           ├── Label
  │           └── Icon
  │
  └── … 33 more variants (same structure)
```

**What changes between variants** — only the variable overrides on the `_base Badge` instance:

| What changes | Filled | Bordered | Tertiary |
|---|---|---|---|
| Frame fill | Solid bg variable | Light tint bg variable | Light tint bg variable |
| Stroke | None | 1px · semantic border variable | None |
| `Label` fill | `Status/text-white` | Semantic text variable | Semantic text variable |
| `Dot` fill | `Status/text-white` | Semantic text variable | Semantic text variable |
| `Icon` VECTOR **stroke** | `Status/text-white` (override stroke from `Icon/icon-primary`) | Semantic text variable (override stroke from `Icon/icon-primary`) | Semantic text variable (override stroke from `Icon/icon-primary`) |

**What never changes between variants** — these are set once on `_base Badge` and inherited by all instances:

| Property | Value |
|---|---|
| Auto Layout direction | Horizontal |
| Padding Top/Bottom | `spacing-xs` |
| Padding Left/Right | `spacing-md` |
| Gap | `spacing-sm` |
| Corner Radius | `radius-full` |
| Icon Size | 12px |
| Typography | Text style `Label sm/Medium` applied on `Label` |

### Layer Descriptions

| Layer | Type | Parent | Visibility | Notes |
|---|---|---|---|---|
| `_base Badge` | INSTANCE | Variant wrapper frame | Always | The only direct child of every variant |
| `Dot` | ELLIPSE | `_base Badge` instance | Toggleable via `Show Dot` | 6×6px, fill matches Label |
| `Label` | TEXT | `_base Badge` instance | Always visible | HUG sizing, text style `Label sm/Medium` applied |
| `Icon` | INSTANCE | `_base Badge` instance | Toggleable via `Show Suffix` | Icon component Size=12px, VECTOR stroke matches Label color |

### Component Properties

| Property Name | Type | Default | Purpose |
|---|---|---|---|
| `Text#411:104` | TEXT | `Label` | Badge label content |
| `Show Dot#8091:4` | BOOLEAN | `true` | Show/hide the leading dot |
| `Show Suffix#411:103` | BOOLEAN | `true` | Show/hide the trailing icon |
| `Suffix Icon#411:100` | INSTANCE_SWAP | `Close` | Default must be the close/x icon. Swappable via instance swap. |

---

## Attached Variables

### Spacing

| Property | Variable | Value |
|---|---|---|
| Padding Top | `spacing-xs` | 4px |
| Padding Bottom | `spacing-xs` | 4px |
| Padding Left | `spacing-md` | 8px |
| Padding Right | `spacing-md` | 8px |
| Gap (item spacing) | `spacing-sm` | 6px |

### Radius

| Property | Variable | Value |
|---|---|---|
| Corner Radius (all 4) | `radius-full` | 9999 (pill shape) |

### Typography

| Property | Value |
|---|---|
| Text Layer | `Label` |
| Text Style | `Label sm/Medium` |
| Font | Inter · Medium (500) · 12px · 16px LH · 0 LS |

> Apply the text style `Label sm/Medium` directly on the `Label` text layer. Do not bind individual font variables.

### Colors — Filled Type

All Filled badges use a solid background and always pair with `Status/text-white` for text and dot. No stroke.

| Color | Background Variable | Text & Dot Variable |
|---|---|---|
| Primary | `Background/bg-brand` | `Status/text-white` |
| Secondary | `Background/bg-brand_secondary` | `Status/text-white` |
| Success | `Background/bg-success` | `Status/text-white` |
| Warning | `Background/bg-warning` | `Status/text-white` |
| Critical | `Background/bg-critical` | `Status/text-white` |
| Gray | `Background/bg-gray_dark` | `Status/text-white` |
| Cyan | `Status/cyan-bg` | `Status/text-white` |
| Indigo | `Status/indigo-bg` | `Status/text-white` |
| Purple | `Status/purple-bg` | `Status/text-white` |
| Fuchsia | `Status/fuchsia-bg` | `Status/text-white` |
| Rose | `Status/rose-bg` | `Status/text-white` |
| Teal | `Status/teal-bg` | `Status/text-white` |

### Colors — Bordered Type

All Bordered badges use a light tint background, a 1px stroke, and a matching semantic text color.

| Color | Background Variable | Border Variable | Text & Dot Variable |
|---|---|---|---|
| Primary | `Background/bg-brand_light` | `Border/border-brand` | `Text/text-brand` |
| Secondary | `Background/bg-brand_secondary_light` | `Border/border-secondary` | `Text/text-brand_secondary` |
| Success | `Background/bg-success_light` | `Border/border-success` | `Text/text-success` |
| Warning | `Background/bg-warning_light` | `Border/border-warning` | `Text/text-warning` |
| Critical | `Background/bg-critical_light` | `Border/border-critical` | `Text/text-critical` |
| Gray | `Background/bg-secondary` | `Border/border-gray_dark` | `Text/text-primary` |
| Cyan | `Status/cyan-bg_light` | `Status/cyan-border` | `Status/cyan-text` |
| Indigo | `Status/indigo-bg_light` | `Status/indigo-border` | `Status/indigo-text` |
| Purple | `Status/purple-bg_light` | `Status/purple-border` | `Status/purple-text` |
| Fuchsia | `Status/fuchsia-bg_light` | `Status/fuchsia-border` | `Status/fuchsia-text` |
| Rose | `Status/rose-bg_light` | `Status/rose-border` | `Status/rose-text` |
| Teal | `Status/teal-bg_light` | `Status/teal-border` | `Status/teal-text` |

### Colors — Tertiary Type

Tertiary uses the exact same fill and text variables as Bordered. The only difference is **no stroke is applied**.

| Color | Background Variable | Text & Dot Variable |
|---|---|---|
| Primary | `Background/bg-brand_light` | `Text/text-brand` |
| Secondary | `Background/bg-brand_secondary_light` | `Text/text-brand_secondary` |
| Success | `Background/bg-success_light` | `Text/text-success` |
| Warning | `Background/bg-warning_light` | `Text/text-warning` |
| Critical | `Background/bg-critical_light` | `Text/text-critical` |
| Gray | `Background/bg-secondary` | `Text/text-primary` |
| Cyan | `Status/cyan-bg_light` | `Status/cyan-text` |
| Indigo | `Status/indigo-bg_light` | `Status/indigo-text` |
| Purple | `Status/purple-bg_light` | `Status/purple-text` |
| Fuchsia | `Status/fuchsia-bg_light` | `Status/fuchsia-text` |
| Rose | `Status/rose-bg_light` | `Status/rose-text` |
| Teal | `Status/teal-bg_light` | `Status/teal-text` |

### Border

Borders are only applied on the `Bordered` Type. Stroke weight is always `1px`, inside alignment.

| Property | Value |
|---|---|
| Stroke Weight | 1px (hardcoded) |
| Stroke Align | Inside |
| Stroke Color | Semantic border variable per color (see Bordered table above) |

### Shadows

None. No elevation variables are applied to the Badge component.

### Icons

#### Dot
The `Dot` is not an icon component instance. It is a plain **Ellipse** layer (6×6px, fixed size) colored with the same variable as the `Label` text.

| Property | Value |
|---|---|
| Layer type | ELLIPSE |
| Size | 6×6px (fixed) |
| Color | Same variable as `Label` fill |
| Placement | Leading (leftmost child) |
| Toggleable | Yes — via `Show Dot` Boolean property |

#### Suffix Icon
The `Icon` layer uses the **Icon component** from the design system. Do not create a custom icon or use a detached SVG.

| Property | Value |
|---|---|
| Component | Icon (design system component) |
| Property 1 — Size | `12px` |
| Property 2 — Icon Instance | `Close` — always use the close/x icon as default (swappable) |
| Placement | Trailing (rightmost child) |
| Toggleable | Yes — via `Show Suffix` Boolean property |
| Swap via | `Suffix Icon` Instance Swap property |
| **Color** | **Override required — change the STROKE on the `Icon` VECTOR layer (do NOT touch fill)** |
| **Stroke** | **None** |

> ⚠️ **How icon color works — read carefully:**
> The Icon component structure is: `Icon [INSTANCE] → 12px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`
> The icon set draws shapes using **stroke**, not fill. The color lives on the **stroke** of the innermost `Icon` VECTOR layer. Do not touch the fill — it is empty. Do not apply anything on any outer frame or intermediate COMPONENT layer.
>
> **Correct approach — to change icon color in a Badge variant:**
> 1. Double-click → enter the outer `Icon` INSTANCE
> 2. Double-click → enter the `12px` COMPONENT (size variant)
> 3. Double-click → enter the `[icon-name]` COMPONENT (e.g. `close`)
> 4. Select the `Icon` **VECTOR** layer inside — this is the flat path, no more nesting
> 5. In the **Stroke** panel, click the existing stroke color swatch to replace it (do NOT use the Fill panel)
> 6. Switch to Variable mode and select the correct semantic color variable for that variant
>
> This path is always the same depth regardless of which icon is swapped in: `Icon → 12px → [icon-name] → Icon (VECTOR)`
>
> The Icon component defaults to `Icon/icon-primary` on its inner `Icon` VECTOR layer. For Badge, override that variable to match the `Label` text color per variant.

---

## Figma Construction Guide

### Step 1 — Build `_base Badge`

1. Create a new **Frame**.
2. Set name to `_base Badge`.
3. Apply **Horizontal Auto Layout**.
4. Set sizing to **HUG contents** on both axes.
5. Set **cross-axis alignment** to Center.
6. Attach spacing variables:
   - Padding Top/Bottom → `spacing-xs`
   - Padding Left/Right → `spacing-md`
   - Gap → `spacing-sm`
7. Attach radius variable → `radius-full` (all 4 corners).
8. Add a **Fill** layer. Bind fill color to `Background/bg-brand` as the default.
9. Convert the frame to a **Component**.

### Step 2 — Add Child Layers

#### Dot
1. Draw an **Ellipse** inside `_base Badge`. Set fixed size: **6×6px**.
2. Name it `Dot`.
3. Bind fill color to `Status/text-white`.
4. Create a **Boolean component property**: `Show Dot` (default: `true`). Link it to the layer's visibility.

#### Label
1. Add a **Text** layer. Name it `Label`.
2. Set default content to `Label`.
3. Apply text style **`Label sm/Medium`** on the layer.
4. Bind fill color to `Status/text-white` (default for `_base Badge`).
5. Set sizing to **HUG** on both axes.
6. Create a **Text component property**: `Text` (default: `Label`). Link to the text content.

#### Icon (Suffix)
1. Place an instance of the **Icon component** (design system) inside the frame.
2. Name it `Icon`.
3. Set **Property 1 — Size** to `12px`.
4. Set **Property 2 — Icon Instance** to `Close` — the default icon for Badge suffix must always be the close/x icon. It remains swappable via the `Suffix Icon` instance swap property.
5. **Inside the `Icon` instance, swap the icon to the Close/X icon directly** — double-click into the instance, select the `[icon-name]` COMPONENT layer, and use Instance Swap to set it to the Close icon. The resulting structure is: `Icon [INSTANCE] → 12px [COMPONENT] → close [COMPONENT] → Icon [VECTOR]`.
6. Position it as the **last child** (trailing).
7. Create an **Instance Swap component property**: `Suffix Icon`. Link to this instance so the icon remains swappable.
8. Create a **Boolean component property**: `Show Suffix` (default: `true`). Link to layer visibility.

> Do not detach the icon instance. After setting Close, the structure is `Icon [INSTANCE] → 12px [COMPONENT] → close [COMPONENT] → Icon [VECTOR]`. For Badge, override the **stroke** variable on that innermost `Icon` VECTOR to match the `Label` text color per variant. Do not apply anything on the outer `Icon` instance or any intermediate COMPONENT layer. Do not apply any fill on the VECTOR.

### Step 3 — Layer Order

Arrange children in this exact order (top to bottom in the layers panel = left to right in the frame):

```
1. Dot
2. Label
3. Icon
```

### Step 4 — Build Badge Variants (Component Set)

> ⚠️ **Do NOT duplicate `_base Badge` and use the copy as a variant directly.** That approach places `Dot`, `Label`, and `Icon` as direct children of the variant frame, which is wrong. Follow the steps below exactly.

**For each of the 36 variants:**

1. Create a new **Frame** and immediately apply **Horizontal Auto Layout**. Set sizing to **HUG × HUG**.
   > ⚠️ **CRITICAL — Always use Auto Layout for the variant wrapper frame, never a plain Frame.** A plain Frame cannot properly hug and respond to the `_base Badge` instance inside. Auto Layout is mandatory on every variant wrapper in this component set.
2. Place an **instance** of `_base Badge` inside it — drag it from the Assets panel (do not copy-paste the component itself).
3. Select the outer Auto Layout frame and convert it to a **Component**.
5. Name it using the variant convention: `Type=Filled, Color=Primary` (adjust per variant).
6. Select all 36 variant components and combine them into a **Component Set** named `Badge`.
7. Add **Variant properties** to the Component Set:
   - `Type` → options: `Filled`, `Bordered`, `Tertiary`
   - `Color` → options: `Primary`, `Secondary`, `Success`, `Warning`, `Critical`, `Gray`, `Cyan`, `Indigo`, `Purple`, `Fuchsia`, `Rose`, `Teal`

**For each variant, select the `_base Badge` instance inside it and override:**

| Property to Override | Where | Value |
|---|---|---|
| Fill | `_base Badge` instance frame | Background variable per color table |
| Stroke color | `_base Badge` instance frame | Border variable (Bordered type only) |
| Stroke weight | `_base Badge` instance frame | 1px inside (Bordered type only) |
| `Label` fill | `Label` text layer inside instance | Text color variable per color table |
| `Dot` fill | `Dot` ellipse layer inside instance | Same variable as `Label` fill |
| `Icon` VECTOR **stroke** | `Icon` VECTOR at path `Icon [INSTANCE] → 12px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]` | Same variable as `Label` color — change STROKE not fill |

All overrides are applied on the **instance layers** inside the variant wrapper — never by detaching or recreating layers.

### Step 5 — Expose Nested Instance Properties

> ⚠️ **CRITICAL — This step is mandatory.** Without it, properties like `Show Dot`, `Show Suffix`, `Suffix Icon`, and `Text` will not be accessible on the Badge variant and designers will have to enter the nested `_base Badge` instance manually to change them.

For every variant in the `Badge` Component Set:

1. Select the variant wrapper COMPONENT frame
2. In the right panel, go to **Properties**
3. Click **"Expose properties from Nested instances"**
4. All properties from the `_base Badge` instance inside will appear: `Show Dot`, `Show Suffix`, `Suffix Icon`, `Text`
5. These properties are now accessible directly on the `Badge` variant without entering the nested instance

Do this for **all 36 variants**. If combining variants into the Component Set first, you can select all variants together and expose in one action.

---

### Step 6 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| `_base Badge` (frame) | Fill | Background color variable per variant |
| `_base Badge` (frame) | Stroke color | Border variable (Bordered only) |
| `_base Badge` (frame) | Padding Top/Bottom | `spacing-xs` |
| `_base Badge` (frame) | Padding Left/Right | `spacing-md` |
| `_base Badge` (frame) | Gap | `spacing-sm` |
| `_base Badge` (frame) | All corner radii | `radius-full` |
| `Label` | Fill | Text color variable per variant |
| `Label` | Text Style | `Label sm/Medium` |
| `Dot` | Fill | Same color variable as `Label` (not an Icon component — plain Ellipse) |
| `Icon [INSTANCE] → 12px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]` | **Stroke** | Same color variable as `Label` — enter to the innermost VECTOR and replace the stroke variable |
| `Icon` (outer frame) | Fill | **None** — do not apply any fill anywhere |
| `Icon` VECTOR | Fill | **None** — do not touch the fill on the VECTOR either |

### Step 6 — Variant Layout in the Component Set

Arrange the 36 variants in a grid inside the Component Set frame. Suggested organization:

```
Row 1  →  Filled:   Primary · Secondary · Success · Warning · Critical · Gray
Row 2  →  Filled:   Cyan · Indigo · Purple · Fuchsia · Rose · Teal
Row 3  →  Bordered: Primary · Secondary · Success · Warning · Critical · Gray
Row 4  →  Bordered: Cyan · Indigo · Purple · Fuchsia · Rose · Teal
Row 5  →  Tertiary: Primary · Secondary · Success · Warning · Critical · Gray
Row 6  →  Tertiary: Cyan · Indigo · Purple · Fuchsia · Rose · Teal
```

### Naming Conventions

| Item | Convention | Example |
|---|---|---|
| Base component | `_base [ComponentName]` | `_base Badge` |
| Component Set | `[ComponentName]` | `Badge` |
| Variant property | `PascalCase` | `Type`, `Color` |
| Variant option | `PascalCase` | `Filled`, `Primary` |
| Layer names | `PascalCase` | `Dot`, `Label`, `Icon` |
| Component property | `PascalCase + ID suffix` | `Show Dot#8091:4` |

---

## Mandatory Rules

- **Never use `_Primitives` variables directly.** All color variables must come from the `Color Style` collection (semantic layer).
- **No hardcoded values.** All spacing, radius, typography, and color values must be variable-bound.
- **Variant wrapper frame must use Auto Layout.** Every variant COMPONENT that wraps a `_base Badge` instance must be created as an **Auto Layout frame** (Horizontal, HUG × HUG) — never a plain Frame. This rule applies to all 36 variants without exception.
- **Dot and Label must always use the same color variable** within a given variant.
- **Bordered stroke weight (1px) is the only hardcoded value** in this component — no spacing or radius variable exists for stroke weight.
- **Do not add states.** Badge is intentionally stateless.
- **Suffix icon color** — icons use stroke-based paths. The color lives on the **stroke** of the innermost `Icon` VECTOR (path: `Icon [INSTANCE] → 12px [COMPONENT] → [icon-name] [COMPONENT] → Icon [VECTOR]`). For Badge, enter to that VECTOR and replace the **stroke** variable with the same color variable as the `Label` for that variant. Do not touch the fill anywhere.



---

## Figma Component Page — Arrangement

This section defines how to present the Badge component on the Figma component page, following the standard component system layout used across this design system.

---

### Page Frame Structure

Each component lives inside a dedicated presentation frame on the component page. Place the **actual `_base Badge` component** and the **actual `Badge` Component Set** directly — do not create separate instances or duplicate components for display.

```
┌─────────────────────────────────────────────────────────┐
│  BADGE COMPONENT SYSTEM          ← small caps label     │
│  Badge                           ← large bold title     │
│  36 variants · Type: Filled · Bordered · Tertiary        │
│  · Color: 12 options             ← summary tagline      │
│  ─────────────────────────────── ← horizontal divider   │
│                                                          │
│  ▌ _base Badge — Base Component  ← section heading      │
│    Core foundation · all properties visible             │
│                                                          │
│    [ actual _base Badge COMPONENT placed here ]         │
│                                                          │
│  ▌ Badge — All 36 Variants       ← section heading      │
│    Type + Color properties · 3 Types × 12 Colors        │
│                                                          │
│    [ actual Badge COMPONENT_SET placed here ]           │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

### Header Block

| Element | Content | Style |
|---|---|---|
| System label | `BADGE COMPONENT SYSTEM` | Small caps, muted grey, above the title |
| Title | `Badge` | Large bold heading |
| Summary tagline | `36 variants · Type: Filled · Bordered · Tertiary · Color: Primary · Secondary · Success · Warning · Critical · Gray · Cyan · Indigo · Purple · Fuchsia · Rose · Teal` | Small, muted, single line |
| Divider | Full-width horizontal rule | Below summary, above first section |

---

### Section 1 — Base Component

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `_base Badge — Base Component` |
| Subtitle | `Core foundation · Horizontal Auto Layout · HUG × HUG · radius-full · All variables attached` |
| Content | Place the **actual `_base Badge` COMPONENT** directly on the page — no separate instance |

---

### Section 2 — All Variants

| Element | Content |
|---|---|
| Accent bar | Blue vertical bar on the left edge |
| Section title | `Badge — All 36 Variants` |
| Subtitle | `Type + Color properties · Filled · Bordered · Tertiary × 12 Colors` |
| Content | Place the **actual `Badge` COMPONENT_SET** directly on the page — do not recreate or duplicate variants |

---

### Arrangement Rules

- Use **Auto Layout (Vertical)** for the main presentation frame with consistent gap between sections.
- The **blue accent bar** is a `3–4px wide rectangle` with the brand primary fill, full height of the section title block.
- **Do not create new instances or duplicate components** for the display sections. Place the actual `_base Badge` COMPONENT and the actual `Badge` COMPONENT_SET directly.
- Do **not** annotate or label individual variants — the section heading and subtitle carry that context.
- `_base Badge` default properties: Show Dot = ON, Show Suffix = ON, Text = "Label".