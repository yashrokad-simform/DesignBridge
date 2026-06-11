# Toast

## Overview

| Property | Value |
|---|---|
| Component Name | Toast |
| Base Component | `_base Toast` |
| Component Set | `Toast` |
| Node — `_base Toast` | `8093:82999` |
| Node — `Toast` | `8093:83046` |
| Toast Variants | 4 (State) |

A brief notification overlay used to communicate status feedback — Success, Warning, Critical, or Info. Always dark-themed with white text. The only visual difference between states is the leading icon.

---

## Component Hierarchy

```
Level 1 — _base Toast              [COMPONENT — single, not a Component Set]
Level 2 — Toast                    [COMPONENT_SET — 4 state variants]
```

---

## Variant Properties

### `Toast`

| Property | Type | Options |
|---|---|---|
| `State` | VARIANT | `Success` · `Warning` · `Critcal` · `Info` |

> ⚠️ **Typo in Figma file:** `State=Critcal` is missing the letter "i" (should be "Critical"). Preserve the exact spelling from the Figma file when referencing the variant property value.

### `_base Toast` Component Properties

| Property | Type | Default | Controls |
|---|---|---|---|
| `Show Icon#8093:6` | BOOLEAN | `true` | Leading `Icon` instance visibility |
| `Show Light#8093:5` | BOOLEAN | `true` | Left accent indicator visibility |

---

## Component Structure

### `_base Toast`

```
_base Toast                        [COMPONENT · FIXED(343px) × HUG · Horizontal AL · Top VA]
  Padding:     spacing-xl (12px) all sides
  Gap:         spacing-xl (12px)
  Fill:        VariableID:67:5885 (dark navy #051325)
  Radius:      radius-xl (all 4 corners)
  Shadow:      DROP_SHADOW · offset(0, 3) · radius 30 · rgba(55%, 55%, 55%, 12%)
  Clips:       true
  │
  ├── Icon                         [INSTANCE · Icon component · Size=20px · swappable]
  │     Visible: Show Icon boolean
  │     Default icon: swapped per Toast state variant (all vuesax/bold)
  │     Color: override Icon VECTOR stroke → Text/text-white
  │
  ├── Frame 2                      [FRAME · FILL × HUG · Vertical AL · layoutGrow=1]
  │     Gap: spacing-xxs (2px)
  │     │
  │     ├── Toast Message          [TEXT · FILL × HUG — title]
  │     │     Style:   1:32759 (14px · Medium 500 · 22px LH)
  │     │     Fill:    Text/text-white (67:6106)
  │     │     Resize:  HEIGHT auto
  │     │     Content: "Toast Message" (default)
  │     │
  │     └── Toast Message          [TEXT · FILL × HUG — body/description]
  │           Style:   Body sm/Regular (12px · Regular 400 · 16px LH)
  │           Fill:    Text/text-white (67:6106)
  │           Resize:  HEIGHT auto
  │           Content: "Toast Message" (default)
  │
  └── Frame 1                      [FRAME · HUG × HUG · Horizontal AL · Center VA]
        Padding T/B: 2px (hardcoded)
        Gap: 10px (hardcoded)
        └── close                  [INSTANCE · 16×16px · close/X icon]
              (dismiss button — close icon from design system)
              Color: override VECTOR stroke → Icon/icon-secondary
```

### `Toast` Variant Structure

```
Toast                              [COMPONENT_SET]
  │
  ├── State=Success                [COMPONENT · FIXED(343) × FIXED(64px)]
  │     └── _base Toast            [INSTANCE · Icon = check-circle · Color: Icon/icon-success]
  │
  ├── State=Warning                [COMPONENT · FIXED(343) × FIXED(64px)]
  │     └── _base Toast            [INSTANCE · Icon = alert-circle · Color: Icon/icon-warning]
  │
  ├── State=Critcal                [COMPONENT · FIXED(343) × FIXED(64px)]  ← note: typo in Figma
  │     └── _base Toast            [INSTANCE · Icon = x-circle · Color: Icon/icon-critical]
  │
  └── State=Info                   [COMPONENT · FIXED(343) × FIXED(64px)]
        └── _base Toast            [INSTANCE · Icon = info-circle · Color: Icon/icon-white]
```

> **Only the icon changes between states.** Background color, padding, text colors, radius, shadow, and layout are identical across all 4 variants.

---

## Icon Per State

| State | Icon | Icon Color |
|---|---|---|
| `Success` | check-circle | `Icon/icon-success` |
| `Warning` | alert-circle | `Icon/icon-warning` |
| `Critcal` | x-circle | `Icon/icon-critical` |
| `Info` | info-circle | `Icon/icon-white` |

> Each state's icon color is set by overriding the Icon VECTOR stroke to the token listed above. Do not use a single shared color — each state has its own distinct icon color token.

---

## Attached Variables

### Spacing

| Target | Property | Variable | Value |
|---|---|---|---|
| `_base Toast` outer frame | Padding all sides | `spacing-xl` | 12px |
| `_base Toast` outer frame | Gap | `spacing-xl` | 12px |
| `Frame 2` | Gap | `spacing-xxs` | 2px |
| `Frame 1` | Padding T/B | 2px | Hardcoded |
| `Frame 1` | Gap | 10px | Hardcoded |

### Radius

| Layer | Variable | Value |
|---|---|---|
| `_base Toast` (all 4 corners) | `radius-xl` | 12px |

### Shadow

| Layer | Effect | Value |
|---|---|---|
| `_base Toast` | DROP_SHADOW | Offset (0, 3) · Radius 30 · Color rgba(55%, 55%, 55%, 12%) · Behind node: false |

### Typography

Confirmed from Figma style IDs:

| Layer | Style ID | Style Name | Font | Size | Weight | LH |
|---|---|---|---|---|---|---|
| `Toast Message` (title) | `1:32759` | Named style — verify in Figma | Inter | 14px | 500 | 22px |
| `Toast Message` (body) | `8077:7074` | `Label sm/Regular` | Inter | 12px | 400 | 16px |

> **Title text style `1:32759`** uses 14px / Medium 500 / 22px LH — a larger line height than Body sm/Medium (18px). Verify the exact style name from the Figma text styles panel. Apply this named style directly on the title layer.

### Colors

| Layer | Variable | Value |
|---|---|---|
| `_base Toast` fill | `VariableID:67:5885` | Dark navy `#051325` |
| `Toast Message` (title) fill | `Text/text-white` | White |
| `Toast Message` (body) fill | `Text/text-white` | White |
| `Icon` VECTOR stroke | `Text/text-white` | White |
| `close` VECTOR stroke | `Icon/icon-secondary` | — |

> ⚠️ **`VariableID:67:5885`** — dark navy `#051325` background. This is the same dark color used by tooltips and dark overlays. Verify the exact variable name from the Figma variable panel (likely `Background/bg-overlay` or `Background/bg-dark`).

---

## Figma Construction Guide

### Step 1 — Build `_base Toast`

1. Create a **Frame**. Name it `_base Toast`.
2. **Horizontal AL · FIXED(343px) × HUG · Top VA** — children must align to the top-left, not centered vertically.
3. Bind padding all sides → `spacing-xl`. Bind gap → `spacing-xl`.
4. Bind fill → `VariableID:67:5885` (dark navy).
5. Bind corner radius all 4 → `radius-xl`.
6. Add **DROP_SHADOW** effect: offset(0, 3) · radius 30 · color rgba(55%,55%,55%,12%) · show behind: false.
7. Set `clipsContent = true`.
8. Convert to **Component**.
9. Create Boolean `Show Icon` (default: `true`). Create Boolean `Show Light` (default: `true`).

#### Icon (leading)
1. Place an **Icon component** instance (Size=20px) as the first child. Name it `Icon`.
2. Default icon: any placeholder — will be swapped per Toast variant.
3. Override VECTOR stroke → `Text/text-white`.
4. Create **Instance Swap property**: link to `Icon` instance.
5. Link visibility to `Show Icon` Boolean.

#### Frame 2 (text content)
1. Add a **Frame** inside. Name it `Frame 2`.
2. **Vertical AL · FILL × HUG · layoutGrow=1**.
3. Bind gap → `spacing-xxs`. No fill.
4. Add `Toast Message` (title) TEXT:
   - Apply text style `1:32759` (14px · Medium 500 · 22px LH).
   - Bind fill → `Text/text-white`. Sizing: FILL × HUG. Resize: HEIGHT.
5. Add `Toast Message` (body) TEXT below it:
   - Apply text style `Body sm/Regular` (12px · Regular 400 · 16px LH).
   - Bind fill → `Text/text-white`. Sizing: FILL × HUG. Resize: HEIGHT.

> Both text layers are named `Toast Message` — this is correct per the Figma file.

#### Frame 1 (close button)
1. Add a **Frame** inside. Name it `Frame 1`.
2. **Horizontal AL · HUG × HUG · Center VA**.
3. Padding T/B: 2px (hardcoded). Gap: 10px (hardcoded).
4. Place the **close icon** instance (16×16px) inside. Name it `close`.
5. Override VECTOR stroke → `Icon/icon-secondary`.

### Step 2 — Build `Toast` Variants

> **Wrapper pattern.** Each variant is a COMPONENT frame containing one `_base Toast` instance.

**For each of the 4 states:**

1. Create an empty **Frame**. Name it `State=Success` (adjust per state). Set sizing FIXED(343) × FIXED(64px).
2. Place an instance of `_base Toast` inside. Set FILL × FILL.
3. Convert to **Component**.
4. Override the `Icon` instance swap to the correct bold icon per state:

| State | Icon | Icon Color |
|---|---|---|
| `State=Success` | `check-circle` | `Icon/icon-success` |
| `State=Warning` | `alert-circle` | `Icon/icon-warning` |
| `State=Critcal` | `x-circle` | `Icon/icon-critical` |
| `State=Info` | `info-circle` | `Icon/icon-white` |

5. Select all 4 variants. Combine into **Component Set** named `Toast`.
6. Add property `State` → `Success`, `Warning`, `Critcal`, `Info`.

> ⚠️ Name the Critical variant exactly `State=Critcal` (preserving the Figma typo) to match the existing file.

### Step 3 — Expose Nested Instance Properties

> ⚠️ CRITICAL.

Properties panel → **"Expose properties from Nested instances"** on all 4 variants. Properties that surface: `Show Icon`, `Show Light`, icon Instance Swap.

### Step 4 — Variable Attachment Locations

| Target | Property | Variable |
|---|---|---|
| `_base Toast` frame | Fill | `VariableID:67:5885` |
| `_base Toast` frame | Padding all sides | `spacing-xl` |
| `_base Toast` frame | Gap | `spacing-xl` |
| `_base Toast` frame | Corner radius (all 4) | `radius-xl` |
| `Frame 2` | Gap | `spacing-xxs` |
| `Toast Message` (title) | Text Style | `1:32759` |
| `Toast Message` (title) | Fill | `Text/text-white` |
| `Toast Message` (body) | Text Style | `Body sm/Regular` |
| `Toast Message` (body) | Fill | `Text/text-white` |
| `Icon` VECTOR | Stroke | Per state — `Icon/icon-success` · `Icon/icon-warning` · `Icon/icon-critical` · `Icon/icon-white` |
| `close` VECTOR | Stroke | `Icon/icon-secondary` |

---

## Mandatory Rules

- **`_base Toast` is a single COMPONENT — not a Component Set.** No variant properties on the base.
- **`_base Toast` alignment is top-left** — set vertical alignment to Top (not Center). Children stack from the top edge of the frame.
- **Only the icon and icon color change between Toast states.** Background fill, padding, text color, shadow, and radius are identical for all 4 variants.
- **Body text style is `Body sm/Regular`** — not `Label sm/Regular` and not Medium weight. Use the Body sm token.
- **Close icon color is `Icon/icon-secondary`** — do not use `Text/text-white` for the close button. Only the text layers and leading state icon use white.
- **Icon color is state-specific** — override the Icon VECTOR stroke per variant: Success → `Icon/icon-success`; Warning → `Icon/icon-warning`; Critical → `Icon/icon-critical`; Info → `Icon/icon-white`. Never use a single shared color for all states.
- **Icon assignments per state are fixed** — Success: `check-circle`; Warning: `alert-circle`; Critical: `x-circle`; Info: `info-circle`. Do not substitute other icons.
- **All text is `Text/text-white`.** The Toast is always dark-themed — do not use any other text color.
- **`State=Critcal` preserves the Figma typo.** Use this exact spelling as the variant value.
- **Title text style is `1:32759`** — apply this named style directly. Do not manually set fontSize/lineHeight — the 22px line height is intentional and differs from Body sm/Medium.
- **`Frame 1` (close button) uses hardcoded padding/gap** — 2px T/B padding, 10px gap. No spacing variable for these values.
- **Text style only — no individual font variable bindings.**
- **Expose nested properties** on all Toast variants.

---

## Flags

### ⚠️ `VariableID:67:5885` — unconfirmed variable name
The Toast background uses `VariableID:67:5885` (dark navy `#051325`). This is the same variable used by Tooltips and dark overlays throughout the file. Confirm the exact semantic variable name from the Figma variable panel before use.

### ⚠️ Text style `1:32759` — verify name
The title `Toast Message` uses text style `1:32759` (14px · Medium 500 · 22px LH). The exact style name is not confirmed from the data. Check the Figma text styles panel to get the correct named style.

### ⚠️ `Show Light` boolean — visual element not confirmed
The `Show Light#8093:5` Boolean property (default: true) controls a layer that was not visible in the depth-4 component tree. It likely controls a left accent stripe or colored indicator. Inspect the `_base Toast` component directly in Figma to identify which layer is tied to this property.

---

## Figma Component Page — Arrangement

```
┌────────────────────────────────────────────────────────────┐
│  TOAST COMPONENT SYSTEM            ← small caps label      │
│  Toast                             ← large bold title      │
│  4 states · Success · Warning · Critical · Info            │
│  Dark-themed · Icon-only state differentiation             │
│  ─────────────────────────────────  ← divider              │
│                                                             │
│  ▌ _base Toast — Base Component                            │
│    FIXED 343px · spacing-xl padding · radius-xl            │
│    Show Icon · Show Light · close button                    │
│    [ actual _base Toast COMPONENT ]                        │
│                                                             │
│  ▌ Toast — All 4 States                                    │
│    Success · Warning · Critical · Info                      │
│    [ actual Toast COMPONENT_SET ]                          │
│                                                             │
└────────────────────────────────────────────────────────────┘
```

| Section | Subtitle | Content |
|---|---|---|
| `_base Toast — Base Component` | `FIXED 343px · spacing-xl all sides · radius-xl · dark navy bg · Text/text-white` | Actual `_base Toast` COMPONENT |
| `Toast — All 4 States` | `State · Success · Warning · Critical · Info · vuesax/bold icons · icon-only differentiation` | Actual `Toast` COMPONENT_SET |