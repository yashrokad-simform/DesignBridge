# Stepper

## Shared Instructions

Use shared instructions:
- `shadcn-implementation.instructions.md`
- `tailwind-implementation.instructions.md`
- `react-implementation.instructions.md`
- `code-review-shadcn.instructions.md`
- `code-review-structure.instructions.md`

---

### Typography Rule

**Do NOT use `leading-snug`.** Use explicit line-height classes matched to font size:
- `text-2xs` → `leading-3`
- `text-xs` → `leading-4`
- `text-sm` → `leading-4.5`
- `text-md` → `leading-5.5`
- `text-lg` → `leading-6.5`
- `text-xl` → `leading-7`
- `text-2xl` → `leading-8`
- `text-3xl` → `leading-9`
- `text-4xl` → `leading-12`

---

## Component Overview

A vertical progress indicator that guides users through a multi-step workflow. The Stepper is composed of a single repeatable `StepItem` component stacked vertically. The multi-step counts shown in Figma (2-step, 3-step, 4-step, etc.) are usage demonstrations only — they are not separate component variants. Any number of steps is supported by repeating `StepItem`.

---

## Component Hierarchy

```
Stepper
└── StepItem[]  (repeated N times)
    ├── ConnectorWrap
    │   ├── StepIcon          ← visual state indicator
    │   └── Connector         ← vertical line joining steps
    └── TextContent
        ├── Title
        └── Caption (optional)
```

The three Figma base components map to this architecture:

| Figma Component | Maps To |
|---|---|
| `_base Step Icon` | `StepIcon` sub-component |
| `_base Step` | `StepItem` component (composes `StepIcon` + `Connector` + text) |
| `Stepper` | `Stepper` wrapper (renders a list of `StepItem`) |

---

## Component Properties

### `Stepper`

| Prop | Type | Default |
|---|---|---|
| `steps` | `StepItemData[]` | required |
| `size` | `'regular' \| 'large'` | `'regular'` |
| `className` | `string` | `undefined` |

```ts
interface StepItemData {
  title: string
  caption?: string
  state: 'incomplete' | 'current' | 'completed'
}
```

> The step count is dynamic — `steps` is an array of any length. The last item automatically has `showConnector={false}`. Do not hardcode the number of steps.

---

### `StepItem`

| Prop | Type | Default |
|---|---|---|
| `title` | `string` | required |
| `caption` | `string` | `undefined` |
| `state` | `'incomplete' \| 'current' \| 'completed'` | `'incomplete'` |
| `size` | `'regular' \| 'large'` | `'regular'` |
| `showConnector` | `boolean` | `true` |
| `showCaption` | `boolean` | `true` |

> `showConnector` must be `false` on the last step in every stepper. The `Stepper` wrapper handles this automatically.

---

### `StepIcon`

| Prop | Type | Default |
|---|---|---|
| `state` | `'incomplete' \| 'current' \| 'completed'` | `'incomplete'` |
| `size` | `'regular' \| 'large'` | `'regular'` |

---

## Step States

| State | Icon Appearance | Title Color | Connector Color |
|---|---|---|---|
| `incomplete` | White circle, gray border, gray dot | `text-text-primary` | `bg-border-gray-light` |
| `current` | Orange-tinted circle, orange border, spinner | `text-text-brand-secondary` | `bg-border-gray-light` |
| `completed` | Green filled circle, white check | `text-text-success` | `bg-border-success` |

---

## StepIcon — Detailed Spec

### Base Container

```
flex items-center justify-center rounded-full flex-shrink-0
```

### CVA — StepIcon container

| State + Size | Classes |
|---|---|
| `incomplete` + `regular` | `size-6 bg-bg-white border-[1.5px] border-border-gray-light` |
| `incomplete` + `large` | `size-8 bg-bg-white border-[1.5px] border-border-gray-light` |
| `current` + `regular` | `size-6 bg-bg-secondary border-[1.5px] border-border-brand-secondary` |
| `current` + `large` | `size-8 bg-bg-secondary border-[1.5px] border-border-brand-secondary` |
| `completed` + `regular` | `size-6 bg-bg-success` |
| `completed` + `large` | `size-8 bg-bg-success` |

> `size-6` = 24×24px · `size-8` = 32×32px · `rounded-full` = 9999px
x
### Inner Icon Content by State

**Incomplete — gray dot:**
Import `StepDotIcon` from `src/assets/icons/`.

| Size | Icon size class |
|---|---|
| `regular` | `size-2` (8×8px) |
| `large` | `size-3` (12×12px) |

**Current — animated spinner:**
Import `StepSpinnerIcon` from `src/assets/icons/`. This is an animated loading/spinner asset (mask-based in Figma). Use an SVG spinner component with `animate-spin` or a CSS-animated asset.

| Size | Icon size class |
|---|---|
| `regular` | `size-3` (12×12px) |
| `large` | `size-4` (16×16px) |

**Completed — white check:**
Import `CheckIcon` from `src/assets/icons/` (reuse existing check icon).

| Size | Icon size class |
|---|---|
| `regular` | `size-4` (16×16px) |
| `large` | `size-5` (20×20px) |

- `aria-hidden="true"` on all icon elements.

---

## Connector — Detailed Spec

The vertical line connecting an icon to the next step's icon below it.

### Base Classes

```
w-0.5 rounded-full flex-shrink-0
```

> `w-0.5` = 2px · `rounded-full` = 9999px

### Height by Size

| Size | Height class |
|---|---|
| `regular` | `h-7` (28px) |
| `large` | `h-16` (64px) |

### Color by State

| Step state | Connector color |
|---|---|
| `incomplete` | `bg-border-gray-light` |
| `current` | `bg-border-gray-light` |
| `completed` | `bg-border-success` |

> The connector below a completed step is green, visually joining completed icons in sequence.

### Connector Wrap

The `ConnectorWrap` holds the `StepIcon` and `Connector` in a vertical flex column:

```
flex flex-col gap-1 items-center pb-1 flex-shrink-0
```

> `gap-1` = 4px between icon bottom and connector top · `pb-1` = 4px bottom padding

For `regular` size: add `self-stretch`.

---

## Text Content — Detailed Spec

Sits beside the `ConnectorWrap`, grows to fill available width.

```
flex flex-col flex-1 min-w-0
```

### Vertical Padding and Gap by Size

| Size | pt | pb | gap |
|---|---|---|---|
| `regular` | `pt-0.5` | `pb-6` (24px) | `gap-1` (4px) |
| `large` | `pt-1` (4px) | `pb-8` (32px) | `gap-0.5` (2px) |

> `pt-0.5` aligns the title baseline with the icon center.

---

## Typography

### Title

| Size | State | Classes |
|---|---|---|
| `regular` | `incomplete` | `text-sm font-medium leading-4.5 text-text-primary` |
| `regular` | `current` | `text-sm font-semibold leading-4.5 text-text-brand-secondary` |
| `regular` | `completed` | `text-sm font-medium leading-4.5 text-text-success` |
| `large` | `incomplete` | `text-base font-medium leading-5.5 text-text-primary` |
| `large` | `current` | `text-base font-semibold leading-5.5 text-text-brand-secondary` |
| `large` | `completed` | `text-base font-medium leading-5.5 text-text-success` |

> `text-sm` = 14px · `text-base` = 16px · `leading-4.5` ≈ 18px · `leading-5.5` = 22px (Figma paragraph LH for 16px scale). `font-semibold` = 600 on `current` state only.

### Caption

| Size | Classes |
|---|---|
| `regular` | `text-xs font-medium leading-4 text-text-secondary` |
| `large` | `text-sm font-medium leading-4.5 text-text-secondary` |

> `text-xs` = 12px · `text-sm` = 14px · Caption is optional — remove from DOM when `showCaption={false}` or `caption` is not provided.

**Caption visibility rule:** Caption is always shown in Figma for `incomplete` and `completed` states. For `current` state, caption is also shown. The `showCaption` prop provides a developer override if product context requires hiding it.

---

## Layout & Spacing

### StepItem Wrapper

```
flex flex-row items-start w-full
```

| Size | Icon-to-text gap |
|---|---|
| `regular` | `gap-2` (8px) |
| `large` | `gap-3` (12px) |

> The Figma reference width of 344px is a canvas illustration only. Use `w-full` in implementation.

### Stepper Wrapper

```
flex flex-col gap-2 items-start w-full
```

> `gap-2` = 8px between each `StepItem`. This gap is in addition to the connector height — the connector sits inside `ConnectorWrap` and is visually part of the step, so the 8px gap only appears between the text content blocks.

---

## Connector Logic

- Every step except the **last** renders a `Connector`.
- The `Stepper` wrapper automatically passes `showConnector={false}` to the final step in the `steps` array.
- When `showConnector={false}`, the `Connector` element is fully removed from the DOM — not hidden.
- The `ConnectorWrap` still renders (for icon alignment consistency) but contains only the `StepIcon`.

---

## Scalability & Dynamic Step Count

The Stepper supports any number of steps. The `steps` prop is a plain array:

```
// 3 steps
steps={[
  { title: 'Your details', caption: 'Provide name and email', state: 'completed' },
  { title: 'Company info', caption: 'Provide company details', state: 'current' },
  { title: 'Invite team', caption: 'Add team members', state: 'incomplete' },
]}

// 7 steps — same API, no new variants
steps={[ ...7 items ]}
```

Figma demonstrates 2, 3, 4, 5, 6, and 7-step layouts as usage examples — these are **not** separate component variants. The architecture accommodates all of them identically.

---

## State Machine Rules

A valid stepper always follows this sequence:

```
Completed* → Current (0 or 1) → Incomplete*
```

- Zero or more `completed` steps come first.
- Exactly zero or one `current` step follows.
- Zero or more `incomplete` steps come last.

The `Stepper` component does not enforce this rule internally — the consuming product is responsible for providing valid state sequences. Rendering multiple `current` steps is technically possible but incorrect.

---

## Developer Handoff Notes

### Icon Assets Required

| File | Used For |
|---|---|
| `src/assets/icons/StepDotIcon.tsx` | Incomplete dot inside the step icon |
| `src/assets/icons/StepSpinnerIcon.tsx` | Current state spinner animation |
| `src/assets/icons/CheckIcon.tsx` | Reuse existing check icon from `src/assets/icons/` |

All icons are `aria-hidden="true"`. Do not create inline SVG inside the Stepper or StepItem components.

### No `height` on StepItem

`StepItem` has no fixed height. Height is entirely driven by content (`TextContent` padding + text line-heights). The connector height creates the visual space between icons.

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-bg-white` | `bg-bg-white` | Step icon bg (incomplete) |
| `--color-bg-secondary` | `bg-bg-secondary` | Step icon bg (current) |
| `--color-bg-success` | `bg-bg-success` | Step icon bg (completed) |
| `--color-border-gray-light` | `border-border-gray-light` | Icon border (incomplete) · Connector (incomplete/current) |
| `--color-border-brand-secondary` | `border-border-brand-secondary` | Icon border (current) |
| `--color-border-success` | `bg-border-success` | Connector (completed) — used as `bg-*` on the connector div |
| `--color-text-primary` | `text-text-primary` | Title (incomplete) |
| `--color-text-brand-secondary` | `text-text-brand-secondary` | Title (current) |
| `--color-text-success` | `text-text-success` | Title (completed) |
| `--color-text-secondary` | `text-text-secondary` | Caption (all states) |
