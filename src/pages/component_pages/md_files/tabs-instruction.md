# Tabs — Standard & Capsule

## Shared Instructions

Use shared instructions:
- `shadcn-implementation.instructions.md`
- `tailwind-implementation.instructions.md`
- `react-implementation.instructions.md`
- `code-review.instructions.md`

---

### Typography Rule

**Do NOT use `leading-snug`.** Use explicit line-height classes matched to font size:
- `text-2xs` → `leading-3`
- `text-xs` → `leading-4`
- `text-sm` → `leading-4.5`
- `text-base` → `leading-5.5`
- `text-lg` → `leading-6.5`
- `text-xl` → `leading-7`
- `text-2xl` → `leading-8`
- `text-3xl` → `leading-9`
- `text-4xl` → `leading-12`

---

## Overview

Two distinct tab systems sharing the same composable architecture. Both are built from a single reusable tab item that is repeated to support any number of tabs. Do NOT create separate components for "2 tabs", "3 tabs", etc. — the multi-tab examples in Figma are usage demonstrations only.

### Components

| Component | Purpose |
|---|---|
| `Tabs` | Context provider — shared `activeTab`, `onChange`, `variant` |
| `TabList` | Wrapper for the row of tab items (handles variant-specific container styling) |
| `TabItem` | Single reusable tab — repeated any number of times |
| `TabPanel` | Content panel shown when its tab is active |

---

## `Tabs` — Context Provider

### Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | controlled active tab |
| `defaultValue` | `string` | uncontrolled default |
| `onChange` | `(value: string) => void` | `undefined` |
| `variant` | `'standard' \| 'capsule'` | `'standard'` |
| `children` | `ReactNode` | required |

Implement using React context to share `activeTab`, `onChange`, and `variant` with all children. Support controlled (`value`) and uncontrolled (`defaultValue`) usage.

---

---

# Part A — Standard Tabs

## TabList — Standard

Wrapper for standard tab items.

### Layout Classes

```
flex items-start border-b border-border-primary
```

No padding on the list itself — spacing is handled per tab item.

---

## TabItem — Standard

### Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `label` | `string` | required |
| `count` | `number` | `undefined` |
| `disabled` | `boolean` | `false` |
| `className` | `string` | `undefined` |

`active` state is inferred from context (`activeTab === value`) — do not pass it as a prop.

---

## CVA Structure — Standard TabItem

Apply CVA to the **tab item container**.

### Base Classes

```
flex flex-col items-center relative shrink-0 cursor-pointer select-none
```

### `state` Variant (no separate CVA variant needed)

Drive active/inactive purely through conditional classes based on `activeTab === value` from context:

| State | Label Classes | Indicator Classes |
|---|---|---|
| Inactive | `font-medium text-text-primary` | `bg-transparent` |
| Active | `font-semibold text-text-brand-secondary` | `bg-border-brand-secondary` |

---

## Standard TabItem Internal Structure

```
[Content Row]     ← flex row, items-center, p-3, gap-1
[Indicator Bar]   ← h-0.5, w-full
```

> `p-3` = 12px · `gap-1` = 4px · `h-0.5` = 2px

### Content Row Classes

```
flex items-center justify-center p-3 gap-1 shrink-0
```

### Label Typography

```
text-sm leading-4.5 whitespace-nowrap text-center
```

| State | Weight | Color |
|---|---|---|
| Inactive | `font-medium` | `text-text-primary` |
| Active | `font-semibold` | `text-text-brand-secondary` |

> `text-sm` = 14px · `leading-4.5` = 18px

### Indicator Bar

```
h-0.5 w-full shrink-0
```

| State | Background |
|---|---|
| Active | `bg-border-brand-secondary` |
| Inactive | `bg-transparent` |

> `h-0.5` = 2px · Always rendered — transparent when inactive to maintain consistent item height.

---

## Count Badge (Optional)

Displayed inside the Content Row when `count` prop is provided.

```
size-[18px] rounded-full bg-bg-critical
flex items-center justify-center flex-shrink-0
```

> `size-[18px]` = 18×18px · No standard Tailwind class for 18px — use arbitrary.

### Count Text Classes

```
text-2xs leading-3 tracking-[0.1px] font-medium text-text-white text-center
```

>Always render count badge on top of active/inactive state — it does not change with tab state.

---

## Standard Tabs — State Color Map

| State | Label font | Label color | Indicator |
|---|---|---|---|
| Inactive | `font-medium` | `text-text-primary` | `bg-transparent` |
| Active | `font-semibold` | `text-text-brand-secondary` | `bg-border-brand-secondary` |

---

---

# Part B — Capsule Tabs

## TabList — Capsule

Wrapper for capsule tab items. The container itself is a styled pill track.

### Container Classes

```
flex items-start p-1 rounded-xl bg-bg-secondary
```

> `p-1` = 4px · `rounded-xl` = 12px

---

## TabItem — Capsule

### Props

Identical to Standard TabItem — `value`, `label`, `disabled`, `className`. No `count` prop for Capsule.

`active` state inferred from context.

---

## CVA Structure — Capsule TabItem

Apply CVA to the **tab item container**.

### Base Classes

```
flex items-center justify-center px-5 py-2
cursor-pointer select-none transition-all whitespace-nowrap
```

> `px-5` = 20px · `py-2` = 8px

### `state` Variant

| State | Classes |
|---|---|
| `inactive` | `rounded-xl` |
| `active` | `bg-bg-primary rounded-lg shadow-[0px_1px_12px_rgba(194,194,194,0.22)]` |

> `rounded-xl` = 12px (inactive) · `rounded-lg` = 8px (active) · Shadow is exact Figma value — no token equivalent exists.

### Default Variant

```
state: 'inactive'
```

---

## Capsule TabItem Label

```
text-sm font-medium leading-4.5 text-text-primary text-center whitespace-nowrap
```

> Label color does not change between active and inactive — always `text-text-primary`. The visual distinction is entirely from the container background and shadow.

---

## Capsule Tabs — State Color Map

| State | Container bg | Radius | Shadow | Label |
|---|---|---|---|---|
| Inactive | none (transparent) | `rounded-xl` | none | `text-text-primary` |
| Active | `bg-bg-primary` | `rounded-lg` | `shadow-[0px_1px_12px_rgba(194,194,194,0.22)]` | `text-text-primary` |

---

---

# TabPanel

### Props

| Prop | Type | Default |
|---|---|---|
| `value` | `string` | required |
| `children` | `ReactNode` | required |
| `className` | `string` | `undefined` |

Render children only when `activeTab === value` from context. Use `role="tabpanel"` and `aria-labelledby` tied to the corresponding tab's `id`.

---

## Accessibility

- `TabList` → `role="tablist"`
- `TabItem` → `role="tab"` · `aria-selected={active}` · `aria-controls={panelId}` · `tabIndex={active ? 0 : -1}`
- `TabPanel` → `role="tabpanel"` · `aria-labelledby={tabId}`
- Keyboard: `ArrowLeft` / `ArrowRight` moves focus between tabs · `Enter` / `Space` activates focused tab

---

## Color Token Map

| Token | Tailwind Class | Used For |
|---|---|---|
| `--color-text-primary` | `text-text-primary` | Standard inactive label · Capsule all labels |
| `--color-text-brand-secondary` | `text-text-brand-secondary` | Standard active label |
| `--color-text-white` | `text-text-white` | Count badge number |
| `--color-border-brand-secondary` | `bg-border-brand-secondary` | Standard active indicator bar |
| `--color-border-primary` | `border-border-primary` | Standard tab list bottom border |
| `--color-bg-critical` | `bg-bg-critical` | Count badge background |
| `--color-bg-primary` | `bg-bg-primary` | Capsule active tab background |
| `--color-bg-secondary` | `bg-bg-secondary` | Capsule container background |
