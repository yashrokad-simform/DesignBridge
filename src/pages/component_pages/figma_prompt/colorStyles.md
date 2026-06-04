# Figma Color Variables — Full Setup Prompt

## CONTEXT & OBJECTIVE

You are setting up a complete **Color Variable System** in Figma using the Figma MCP server. This involves two variable collections:

1. **`_Primitives`** — Raw hex color values, organized into groups
2. **`Color Style`** — Semantic alias tokens that reference `_Primitives` values, supporting both **Light** and **Dark** modes

Follow every instruction in the exact order given. Do not skip, merge, or reorder steps.

---

## PART 1 — CREATE `_Primitives` VARIABLE COLLECTION

### Step 1: Create the Collection

- Create a new variable collection named exactly: `_Primitives`
- All variables in this collection are of type **Color**
- Variables are organized using **group prefixes** separated by `/`
- Set the hex value directly as the raw color value (no aliases)

---

### Step 2: Create All Primitive Color Variables

Create the following variables exactly as listed. The name before the `/` is the group name.

#### GROUP: Primary

| Variable Name | Hex Value |
|---|---|
| `Primary/primary 50` | `#e6eef8` |
| `Primary/primary 100` | `#b0cbe9` |
| `Primary/primary 200` | `#8ab1de` |
| `Primary/primary 300` | `#548ecf` |
| `Primary/primary 400` | `#3378c6` |
| `Primary/primary 500` | `#0056b8` |
| `Primary/primary 600` | `#004ea7` |
| `Primary/primary 700` | `#003d83` |
| `Primary/primary 800` | `#002f65` |
| `Primary/primary 900` | `#00244d` |

#### GROUP: Secondary

| Variable Name | Hex Value |
|---|---|
| `Secondary/secondary 50` | `#f9eee7` |
| `Secondary/secondary 100` | `#edccb5` |
| `Secondary/secondary 200` | `#e5b391` |
| `Secondary/secondary 300` | `#d9905f` |
| `Secondary/secondary 400` | `#d17a40` |
| `Secondary/secondary 500` | `#c65910` |
| `Secondary/secondary 600` | `#b4510f` |
| `Secondary/secondary 700` | `#8d3f0b` |
| `Secondary/secondary 800` | `#6d3109` |
| `Secondary/secondary 900` | `#532507` |

#### GROUP: Neutrals

| Variable Name | Hex Value |
|---|---|
| `Neutrals/gray 50` | `#f4f5f7` |
| `Neutrals/gray 100` | `#dde3eb` |
| `Neutrals/gray 200` | `#aeb4bc` |
| `Neutrals/gray 300` | `#89919d` |
| `Neutrals/gray 400` | `#727c8a` |
| `Neutrals/gray 500` | `#4f5c6d` |
| `Neutrals/gray 600` | `#485363` |
| `Neutrals/gray 700` | `#29384d` |
| `Neutrals/gray 800` | `#19283c` |
| `Neutrals/gray 900` | `#131e2e` |
| `Neutrals/white` | `#ffffff` |
| `Neutrals/black` | `#051325` |

#### GROUP: Actions → Success

> These go inside an `Actions` parent group, under a `Success` subgroup.

| Variable Name | Hex Value |
|---|---|
| `Actions/Success/success 50` | `#e6f1e9` |
| `Actions/Success/success 100` | `#b1d3bb` |
| `Actions/Success/success 200` | `#8bbe9a` |
| `Actions/Success/success 300` | `#78b38a` |
| `Actions/Success/success 400` | `#5da573` |
| `Actions/Success/success 500` | `#358e50` |
| `Actions/Success/success 600` | `#036821` |
| `Actions/Success/success 700` | `#02511a` |
| `Actions/Success/success 800` | `#023f14` |
| `Actions/Success/success 900` | `#01300f` |

#### GROUP: Actions → Warning

| Variable Name | Hex Value |
|---|---|
| `Actions/Warning/warning 50` | `#fcf4e6` |
| `Actions/Warning/warning 100` | `#f4dcb1` |
| `Actions/Warning/warning 200` | `#efcb8b` |
| `Actions/Warning/warning 300` | `#e8b356` |
| `Actions/Warning/warning 400` | `#e4a435` |
| `Actions/Warning/warning 500` | `#dd8d03` |
| `Actions/Warning/warning 600` | `#c98003` |
| `Actions/Warning/warning 700` | `#9d6402` |
| `Actions/Warning/warning 800` | `#7a4e02` |
| `Actions/Warning/warning 900` | `#5d3b01` |

#### GROUP: Actions → Critical

| Variable Name | Hex Value |
|---|---|
| `Actions/Critical/critical 50` | `#f8e9ea` |
| `Actions/Critical/critical 100` | `#e9babc` |
| `Actions/Critical/critical 200` | `#de989c` |
| `Actions/Critical/critical 300` | `#cf6a6f` |
| `Actions/Critical/critical 400` | `#c64d53` |
| `Actions/Critical/critical 500` | `#b82028` |
| `Actions/Critical/critical 600` | `#a71d24` |
| `Actions/Critical/critical 700` | `#83171c` |
| `Actions/Critical/critical 800` | `#651216` |
| `Actions/Critical/critical 900` | `#4d0d11` |

#### GROUP: Status → Cyan

| Variable Name | Hex Value |
|---|---|
| `Status/Cyan/cyan 50` | `#ecfdff` |
| `Status/Cyan/cyan 100` | `#a5eaff` |
| `Status/Cyan/cyan 500` | `#077799` |
| `Status/Cyan/cyan 700` | `#063e4f` |
| `Status/Cyan/cyan 900` | `#032029` |

#### GROUP: Status → Indigo

| Variable Name | Hex Value |
|---|---|
| `Status/Indigo/indigo 50` | `#eef4ff` |
| `Status/Indigo/indigo 100` | `#d2d5ff` |
| `Status/Indigo/indigo 500` | `#444ce7` |
| `Status/Indigo/indigo 700` | `#082969` |
| `Status/Indigo/indigo 900` | `#051a42` |

#### GROUP: Status → Purple

| Variable Name | Hex Value |
|---|---|
| `Status/Purple/purple 50` | `#f7f3ff` |
| `Status/Purple/purple 100` | `#d5beff` |
| `Status/Purple/purple 500` | `#7839ee` |
| `Status/Purple/purple 700` | `#320e7a` |
| `Status/Purple/purple 900` | `#220a53` |

#### GROUP: Status → Fuchsia

| Variable Name | Hex Value |
|---|---|
| `Status/Fuchsia/fuchsia 50` | `#fdf3ff` |
| `Status/Fuchsia/fuchsia 100` | `#ecb5f6` |
| `Status/Fuchsia/fuchsia 500` | `#991daf` |
| `Status/Fuchsia/fuchsia 700` | `#470b54` |
| `Status/Fuchsia/fuchsia 900` | `#27062e` |

#### GROUP: Status → Rose

| Variable Name | Hex Value |
|---|---|
| `Status/Rose/rose 50` | `#fff1f4` |
| `Status/Rose/rose 100` | `#ffd9e3` |
| `Status/Rose/rose 500` | `#e31b54` |
| `Status/Rose/rose 700` | `#571125` |
| `Status/Rose/rose 900` | `#2b0d16` |

#### GROUP: Status → Teal

| Variable Name | Hex Value |
|---|---|
| `Status/Teal/teal 50` | `#f0fdf9` |
| `Status/Teal/teal 100` | `#cffffa` |
| `Status/Teal/teal 500` | `#0e9384` |
| `Status/Teal/teal 700` | `#06473f` |
| `Status/Teal/teal 900` | `#03221e` |

---

## PART 2 — CREATE `Color Style` VARIABLE COLLECTION

### Step 1: Create the Collection with Two Modes

- Create a new variable collection named exactly: `Color Style`
- Add **two modes** to this collection:
  - Mode 1: `Light`
  - Mode 2: `Dark`
- All variables in this collection are of type **Color**
- All values must be **aliases** (references) to `_Primitives` variables — never raw hex values

---

### Step 2: Alias Reference Convention

When setting alias values, use the following format to reference `_Primitives`:

- **Collection name:** `_Primitives`
- **Variable path:** exact group/name as defined in Part 1

Example: `"Neutrals/black"` → references `_Primitives/Neutrals/black`

---

### Step 3: Create All `Color Style` Variables — Light Mode & Dark Mode Values

Each variable below has a **Light** value and a **Dark** value. Set both modes for every variable.

---

#### GROUP: Text

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Text/text-primary` | `Neutrals/black` | `Neutrals/white` |
| `Text/text-secondary` | `Neutrals/gray 500` | `Neutrals/gray 200` |
| `Text/text-success` | `Actions/Success/success 500` | `Actions/Success/success 100` |
| `Text/text-success-light` | `Actions/Success/success 50` | `Actions/Success/success 700` |
| `Text/text-warning` | `Actions/Warning/warning 500` | `Actions/Warning/warning 200` |
| `Text/text-warning-light` | `Actions/Warning/warning 100` | `Actions/Warning/warning 700` |
| `Text/text-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 100` |
| `Text/text-critical-light` | `Actions/Critical/critical 50` | `Actions/Critical/critical 700` |
| `Text/text-brand` | `Primary/primary 500` | `Primary/primary 200` |
| `Text/text-brand-light` | `Primary/primary 100` | `Primary/primary 700` |
| `Text/text-brand-secondary` | `Secondary/secondary 500` | `Secondary/secondary 200` |
| `Text/text-brand-secondary-light` | `Secondary/secondary 100` | `Secondary/secondary 700` |
| `Text/text-white` | `Neutrals/white` | `Neutrals/white` |

---

#### GROUP: Icon

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Icon/icon-primary` | `Neutrals/black` | `Neutrals/white` |
| `Icon/icon-secondary` | `Neutrals/gray 500` | `Neutrals/gray 300` |
| `Icon/icon-brand` | `Primary/primary 500` | `Primary/primary 200` |
| `Icon/icon-brand-light` | `Primary/primary 100` | `Primary/primary 700` |
| `Icon/icon-brand-secondary` | `Secondary/secondary 500` | `Secondary/secondary 200` |
| `Icon/icon-brand-secondary-light` | `Secondary/secondary 100` | `Secondary/secondary 700` |
| `Icon/icon-success` | `Actions/Success/success 500` | `Actions/Success/success 100` |
| `Icon/icon-success-light` | `Actions/Success/success 50` | `Actions/Success/success 700` |
| `Icon/icon-warning` | `Actions/Warning/warning 500` | `Actions/Warning/warning 100` |
| `Icon/icon-warning-light` | `Actions/Warning/warning 100` | `Actions/Warning/warning 700` |
| `Icon/icon-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 100` |
| `Icon/icon-critical-light` | `Actions/Critical/critical 50` | `Actions/Critical/critical 700` |
| `Icon/icon-white` | `Neutrals/white` | `Neutrals/white` |

---

#### GROUP: Background

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Background/bg-primary` | `Neutrals/white` | `Neutrals/black` |
| `Background/bg-secondary` | `Neutrals/gray 50` | `Neutrals/gray 900` |
| `Background/bg-brand` | `Primary/primary 500` | `Primary/primary 500` |
| `Background/bg-brand-light` | `Primary/primary 50` | `Primary/primary 900` |
| `Background/bg-brand-secondary` | `Secondary/secondary 500` | `Secondary/secondary 500` |
| `Background/bg-brand-secondary-light` | `Secondary/secondary 50` | `Secondary/secondary 900` |
| `Background/bg-success` | `Actions/Success/success 500` | `Actions/Success/success 500` |
| `Background/bg-success-light` | `Actions/Success/success 50` | `Actions/Success/success 800` |
| `Background/bg-warning` | `Actions/Warning/warning 400` | `Actions/Warning/warning 400` |
| `Background/bg-warning-light` | `Actions/Warning/warning 50` | `Actions/Warning/warning 800` |
| `Background/bg-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Background/bg-critical-light` | `Actions/Critical/critical 50` | `Actions/Critical/critical 800` |
| `Background/bg-gray-dark` | `Neutrals/gray 300` | `Neutrals/gray 700` |
| `Background/bg-black` | `Neutrals/black` | `Neutrals/white` |

---

#### GROUP: Border

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Border/border-primary` | `Neutrals/gray 100` | `Neutrals/gray 900` |
| `Border/border-secondary` | `Secondary/secondary 500` | `Secondary/secondary 700` |
| `Border/border-brand` | `Primary/primary 500` | `Primary/primary 700` |
| `Border/border-brand-light` | `Primary/primary 100` | `Primary/primary 800` |
| `Border/border-success` | `Actions/Success/success 500` | `Actions/Success/success 600` |
| `Border/border-warning` | `Actions/Warning/warning 400` | `Actions/Warning/warning 600` |
| `Border/border-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 600` |
| `Border/border-gray-dark` | `Neutrals/gray 300` | `Neutrals/gray 800` |
| `Border/border-black` | `Neutrals/black` | `Neutrals/white` |
| `Border/border-white` | `Neutrals/white` | `Neutrals/white` |

---

#### GROUP: Component → Button

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Component/Button/btn-text-primary` | `Neutrals/white` | `Neutrals/white` |
| `Component/Button/btn-text-disabled` | `Neutrals/gray 400` | `Neutrals/gray 200` |
| `Component/Button/btn-text-bordered` | `Neutrals/black` | `Neutrals/white` |
| `Component/Button/btn-text-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Component/Button/btn-text-secondary` | `Secondary/secondary 600` | `Secondary/secondary 300` |
| `Component/Button/btn-text-secondary-focused` | `Secondary/secondary 700` | `Secondary/secondary 400` |
| `Component/Button/btn-text-secondary-disabled` | `Secondary/secondary 300` | `Secondary/secondary 700` |
| `Component/Button/btn-icon-primary` | `Neutrals/white` | `Neutrals/white` |
| `Component/Button/btn-icon-bordered` | `Neutrals/black` | `Neutrals/white` |
| `Component/Button/btn-icon-secondary` | `Secondary/secondary 600` | `Secondary/secondary 300` |
| `Component/Button/btn-icon-secondary-focused` | `Secondary/secondary 700` | `Secondary/secondary 400` |
| `Component/Button/btn-icon-secondary-disabled` | `Secondary/secondary 300` | `Secondary/secondary 700` |
| `Component/Button/btn-icon-disabled` | `Neutrals/gray 400` | `Neutrals/gray 200` |
| `Component/Button/btn-icon-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Component/Button/btn-bg-primary` | `Primary/primary 500` | `Primary/primary 500` |
| `Component/Button/btn-bg-primary-focused` | `Primary/primary 700` | `Primary/primary 700` |
| `Component/Button/btn-bg-primary-disabled` | `Primary/primary 50` | `Neutrals/gray 800` |
| `Component/Button/btn-bg-bordered` | `Neutrals/white` | `Neutrals/gray 900` |
| `Component/Button/btn-bg-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Component/Button/btn-border-primary` | `Neutrals/gray 100` | `Neutrals/gray 800` |
| `Component/Button/btn-border-focused` | `Neutrals/gray 500` | `Neutrals/gray 200` |
| `Component/Button/btn-border-disabled` | `Neutrals/gray 100` | `Neutrals/gray 900` |
| `Component/Button/btn-border-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |

---

#### GROUP: Component → Input

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Component/Input/input-text-placeholder` | `Neutrals/gray 400` | `Neutrals/gray 300` |
| `Component/Input/input-text-label` | `Neutrals/black` | `Neutrals/white` |
| `Component/Input/input-text-enabled` | `Neutrals/black` | `Neutrals/white` |
| `Component/Input/input-text-disabled` | `Neutrals/gray 300` | `Neutrals/gray 700` |
| `Component/Input/input-text-helper` | `Neutrals/gray 400` | `Neutrals/gray 500` |
| `Component/Input/input-text-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Component/Input/input-icon-enabled` | `Neutrals/black` | `Neutrals/white` |
| `Component/Input/input-icon-disabled` | `Neutrals/gray 300` | `Neutrals/gray 700` |
| `Component/Input/input-icon-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Component/Input/input-bg-primary` | `Neutrals/white` | `Neutrals/gray 900` |
| `Component/Input/input-bg-disabled` | `Neutrals/gray 50` | `Neutrals/black` |
| `Component/Input/input-border-enabled` | `Neutrals/gray 100` | `Neutrals/gray 700` |
| `Component/Input/input-border-selected` | `Primary/primary 500` | `Primary/primary 300` |
| `Component/Input/input-border-critical` | `Actions/Critical/critical 500` | `Actions/Critical/critical 500` |
| `Component/Input/input-border-disabled` | `Neutrals/gray 100` | `Neutrals/gray 800` |

---

#### GROUP: Component → Navigation

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Component/Navigation/nav-text-primary` | `Neutrals/black` | `Neutrals/black` |
| `Component/Navigation/nav-text-secondary` | `Neutrals/gray 200` | `Neutrals/gray 100` |
| `Component/Navigation/nav-text-primary-collapse` | `Neutrals/white` | `Neutrals/white` |
| `Component/Navigation/nav-icon-primary` | `Neutrals/black` | `Neutrals/black` |
| `Component/Navigation/nav-icon-secondary` | `Neutrals/gray 200` | `Neutrals/gray 200` |
| `Component/Navigation/nav-tile-bg-primary` | `Neutrals/white` | `Neutrals/white` |
| `Component/Navigation/nav-tile-bg-secondary` | `Neutrals/gray 800` | `Neutrals/gray 800` |
| `Component/Navigation/nav-bg` | `Neutrals/black` | `Neutrals/gray 900` |
| `Component/Navigation/nav-bg-hover` | `Neutrals/gray 800` | `Neutrals/gray 700` |

---

#### GROUP: Status

| Variable Name | Light Mode Alias | Dark Mode Alias |
|---|---|---|
| `Status/text-cyan` | `Status/Cyan/cyan 500` | `Status/Cyan/cyan 100` |
| `Status/bg-cyan` | `Status/Cyan/cyan 500` | `Status/Cyan/cyan 500` |
| `Status/border-cyan` | `Status/Cyan/cyan 500` | `Status/Cyan/cyan 900` |
| `Status/bg-light-cyan` | `Status/Cyan/cyan 50` | `Status/Cyan/cyan 700` |
| `Status/text-indigo` | `Status/Indigo/indigo 500` | `Status/Indigo/indigo 100` |
| `Status/bg-indigo` | `Status/Indigo/indigo 500` | `Status/Indigo/indigo 500` |
| `Status/border-indigo` | `Status/Indigo/indigo 500` | `Status/Indigo/indigo 700` |
| `Status/bg-light-indigo` | `Status/Indigo/indigo 50` | `Status/Indigo/indigo 900` |
| `Status/text-purple` | `Status/Purple/purple 500` | `Status/Purple/purple 100` |
| `Status/bg-purple` | `Status/Purple/purple 500` | `Status/Purple/purple 500` |
| `Status/border-purple` | `Status/Purple/purple 500` | `Status/Purple/purple 700` |
| `Status/bg-light-purple` | `Status/Purple/purple 50` | `Status/Purple/purple 900` |
| `Status/text-fuchsia` | `Status/Fuchsia/fuchsia 500` | `Status/Fuchsia/fuchsia 100` |
| `Status/bg-fuchsia` | `Status/Fuchsia/fuchsia 500` | `Status/Fuchsia/fuchsia 500` |
| `Status/border-fuchsia` | `Status/Fuchsia/fuchsia 500` | `Status/Fuchsia/fuchsia 700` |
| `Status/bg-light-fuchsia` | `Status/Fuchsia/fuchsia 50` | `Status/Fuchsia/fuchsia 900` |
| `Status/text-rose` | `Status/Rose/rose 500` | `Status/Rose/rose 100` |
| `Status/bg-rose` | `Status/Rose/rose 500` | `Status/Rose/rose 500` |
| `Status/border-rose` | `Status/Rose/rose 500` | `Status/Rose/rose 700` |
| `Status/bg-light-rose` | `Status/Rose/rose 50` | `Status/Rose/rose 900` |
| `Status/text-teal` | `Status/Teal/teal 500` | `Status/Teal/teal 100` |
| `Status/bg-teal` | `Status/Teal/teal 500` | `Status/Teal/teal 500` |
| `Status/border-teal` | `Status/Teal/teal 500` | `Status/Teal/teal 700` |
| `Status/bg-light-teal` | `Status/Teal/teal 50` | `Status/Teal/teal 900` |
| `Status/text-white` | `Neutrals/white` | `Neutrals/white` |

---

## EXECUTION RULES

1. **Complete Part 1 fully** before starting Part 2. All `_Primitives` must exist before aliases can be created.
2. **All `Color Style` values must be aliases** — never hardcode hex values in the `Color Style` collection.
3. **Group hierarchy** must be respected exactly as shown. Use `/` as the group separator in variable names.
4. **Mode names** in `Color Style` must be exactly `Light` and `Dark`.
5. **Variable names** must match exactly — including casing, spacing, and hyphens.
6. After creating all variables, **verify** that each `Color Style` variable correctly resolves its alias in both modes by checking a sample from each group.
