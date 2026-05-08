---
name: Code Review - Accessibility (a11y)
description: Enforce WCAG 2.2 AA accessibility standards including keyboard navigation, ARIA labels, color contrast, focus management, and screen reader support
applyTo: '**/*.tsx, **/*.jsx, src/components/**, src/pages/**'
---

Ensure all UI components meet WCAG 2.2 Level AA accessibility standards for keyboard navigation, screen readers, and visual accessibility.

## ⌨️ Keyboard Navigation

**DO:** All interactive elements must be keyboard accessible (Tab, Enter, Space, Escape). Use `<button>` for clickable elements, not `<div onClick>`. Add `onKeyDown` handlers where needed.

**DON'T:** Use non-semantic elements (`<div>`, `<span>`) for interactive features without proper keyboard support and ARIA roles.

## 🏷️ ARIA Labels for Icon Buttons

**DO:** Every icon-only button/input needs `aria-label` or visible text label.
```tsx
<button aria-label="Delete item"><Trash2 /></button>
```

**DON'T:** Leave icon buttons without accessible labels. Screen readers announce only "button" without context.

## 🎨 Color Contrast (WCAG AA)

**DO:** Use semantic tokens (`text-foreground`, `bg-background`, `text-destructive-foreground`) ensuring 4.5:1 contrast for text, 3:1 for large text (18px+).

**DON'T:** Use custom colors (`bg-red-100 text-red-400`) without verifying WCAG AA contrast ratios.

## 👁️ Focus-Visible Styles

**DO:** Replace `outline-none` with `focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`. shadcn components handle this automatically.

**DON'T:** Remove focus indicators with `outline-none` without replacement. Keyboard users cannot see focus state.

## 📝 Form Labels

**DO:** Associate labels with inputs using `htmlFor`/`id` or `aria-labelledby`.
```tsx
<label htmlFor="email">Email</label>
<input id="email" type="email" />
```

**DON'T:** Use placeholder as label. No unlabeled inputs allowed.

## ⚠️ Error States

**DO:** Communicate errors via `aria-invalid` and `aria-describedby`.
```tsx
<input aria-invalid={!!error} aria-describedby="email-error" />
<span id="email-error">{error}</span>
```

**DON'T:** Show errors visually only without associating them to inputs via ARIA.

## 🖼️ Image Alt Text

**DO:** Meaningful alt text for content images. Empty `alt=""` for decorative images.
```tsx
<img alt="Blue running shoes" />
<img alt="" /> {/* decorative */}
```

**DON'T:** Generic alt text ("image"), missing alt, or empty alt on content images.

## 🎯 Focus Trap in Modals

**DO:** Use shadcn Dialog components. Radix handles focus trap automatically.

**DON'T:** Override `modal={false}` or disable Radix accessibility props. Preserve built-in focus management.

## 📢 Dynamic Content Announcements

**DO:** Use `aria-live="polite"` for status updates, `aria-live="assertive"` for errors.
```tsx
<div aria-live="polite" className="sr-only">{status}</div>
```

**DON'T:** Update important content silently without aria-live regions.

## 🔢 Tab Order

**DO:** Use natural DOM order. `tabIndex="-1"` removes from tab order, `tabIndex="0"` includes non-interactive elements.

**DON'T:** Use positive `tabIndex` values (`tabIndex={1}`, `tabIndex={2}`). Breaks natural tab sequence.

---

## ✅ CHECKLIST

- [ ] All interactive elements keyboard accessible (Tab, Enter, Space, Escape)
- [ ] `aria-label` or visible label on icon-only buttons/inputs
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 large text)
- [ ] Focus-visible styles present (outline-none needs focus-visible:ring)
- [ ] Form inputs have `<label>` or `aria-labelledby`
- [ ] Error states use `aria-describedby` and `aria-invalid`
- [ ] Images have meaningful `alt` (empty `alt=""` for decorative)
- [ ] Modals trap focus (don't break Radix features)
- [ ] Dynamic content uses `aria-live` regions
- [ ] No `tabIndex > 0` — use natural DOM order

---

## 🚩 FLAG LEVELS

**🔴 Critical:** Non-keyboard accessible interactions, icon buttons without labels, removed focus styles, unlabeled inputs, positive tabIndex

**🟠 High Priority:** Poor color contrast, silent error states, missing alt text, broken focus trap

**🟡 Suggestions:** aria-live improvements, better alt descriptions, keyboard shortcuts
