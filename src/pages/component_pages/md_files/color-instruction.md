## OVERVIEW

A fresh React + Vite project comes with a basic `src/index.css`. You need to **replace it entirely** with a structured design token file that powers the full design system. This file defines all primitive colors, semantic color aliases, typography scale, and dark mode overrides used across every component.

**This file is the single source of truth for all design tokens. Never hardcode hex values or font sizes in components — always use the CSS variables defined here.**

---

## STEP 1 — Prerequisites

Make sure these packages are installed before touching the CSS file:

```bash
npm install tailwindcss @tailwindcss/vite tw-animate-css
```

In `vite.config.ts`, Tailwind v4 must be registered as a Vite plugin:

```ts
import tailwindcss from '@tailwindcss/vite'

export default {
  plugins: [tailwindcss()],
}
```

There is **no** `tailwind.config.js` needed in Tailwind v4. All config lives inside `index.css` via `@theme`.

---

## STEP 2 — Replace `src/index.css` completely

Delete all existing content and replace with the following file, exactly as written:

```css
@import "tailwindcss";
@import "tw-animate-css";

/* Dark mode is driven by a `.dark` class on <html> (see theme-provider.tsx). */
@custom-variant dark (&:where(.dark, .dark *));

@theme {

   /* ==========================================================
   * LAYER 1 — PRIMITIVE COLORS (hex values only, no semantics)
   *
   * RULES:
   * - Only raw hex values here. No var() references.
   * - These are the "atoms" — they have no meaning by themselves.
   * - When the ColorGenerator updates primary/secondary/neutral,
   *   ONLY the values in this layer change. Nothing else.
   * ========================================================== */

  /* ── Primary ─────────────────────────────────────────────── */
  --color-primary-50:  #e6eef8;
  --color-primary-100: #b0cbe9;
  --color-primary-200: #8ab1de;
  --color-primary-300: #548ecf;
  --color-primary-400: #3378c6;
  --color-primary-500: #0056b8;   /* ← USER CONFIGURABLE (Color Generator) */
  --color-primary-600: #004ea7;
  --color-primary-700: #003d83;
  --color-primary-800: #002f65;
  --color-primary-900: #00244d;

  /* ── Secondary ───────────────────────────────────────────── */
  --color-secondary-50:  #f9eee7;
  --color-secondary-100: #edccb5;
  --color-secondary-200: #e5b391;
  --color-secondary-300: #d9905f;
  --color-secondary-400: #d17a40;
  --color-secondary-500: #c65910;  /* ← USER CONFIGURABLE (Color Generator) */
  --color-secondary-600: #b4510f;
  --color-secondary-700: #8d3f0b;
  --color-secondary-800: #6d3109;
  --color-secondary-900: #532507;

  /* ── Neutrals (Gray) ─────────────────────────────────────── */
  --color-gray-50:  #f4f5f7;
  --color-gray-100: #dde3eb;
  --color-gray-200: #aeb4bc;
  --color-gray-300: #89919d;
  --color-gray-400: #727c8a;
  --color-gray-500: #4f5c6d;       /* ← USER CONFIGURABLE (Color Generator) */
  --color-gray-600: #485363;
  --color-gray-700: #29384d;
  --color-gray-800: #19283c;
  --color-gray-900: #131e2e;
  --color-white:    #ffffff;
  --color-black:    #051325;

  /* ── Success ─────────────────────────────────────────────── */
  --color-success-50:  #e6f1e9;
  --color-success-100: #b1d3bb;
  --color-success-200: #8bbe9a;
  --color-success-300: #78b38a;
  --color-success-400: #5da573;
  --color-success-500: #358e50;
  --color-success-600: #036821;
  --color-success-700: #02511a;
  --color-success-800: #023f14;
  --color-success-900: #01300f;

  /* ── Critical ────────────────────────────────────────────── */
  --color-critical-50:  #f8e9ea;
  --color-critical-100: #e9babc;
  --color-critical-200: #de989c;
  --color-critical-300: #cf6a6f;
  --color-critical-400: #c64d53;
  --color-critical-500: #b82028;
  --color-critical-600: #a71d24;
  --color-critical-700: #83171c;
  --color-critical-800: #651216;
  --color-critical-900: #4d0d11;

  /* ── Warning ─────────────────────────────────────────────── */
  --color-warning-50:  #fcf4e6;
  --color-warning-100: #f4dcb1;
  --color-warning-200: #efcb8b;
  --color-warning-300: #e8b356;
  --color-warning-400: #e4a435;
  --color-warning-500: #dd8d03;
  --color-warning-600: #c98003;
  --color-warning-700: #9d6402;
  --color-warning-800: #7a4e02;
  --color-warning-900: #5d3b01;

  /* ── Status / Badge colors (sparse ramps — only used shades) */
  --color-cyan-50:  #ecfdff;
  --color-cyan-100: #a5eaff;
  --color-cyan-500: #077799;
  --color-cyan-700: #063e4f;
  --color-cyan-900: #032029;

  --color-indigo-50:  #eef4ff;
  --color-indigo-100: #d2d5ff;
  --color-indigo-500: #444ce7;
  --color-indigo-700: #082969;
  --color-indigo-900: #051a42;

  --color-purple-50:  #f7f3ff;
  --color-purple-100: #d5beff;
  --color-purple-500: #7839ee;
  --color-purple-700: #320e7a;
  --color-purple-900: #220a53;

  --color-fuchsia-50:  #fdf3ff;
  --color-fuchsia-100: #ecb5f6;
  --color-fuchsia-500: #991daf;
  --color-fuchsia-700: #470b54;
  --color-fuchsia-900: #27062e;

  --color-rose-50:  #fff1f4;
  --color-rose-100: #ffd9e3;
  --color-rose-500: #e31b54;
  --color-rose-700: #571125;
  --color-rose-900: #2b0d16;

  --color-teal-50:  #f0fdf9;
  --color-teal-100: #cffffa;
  --color-teal-500: #0e9384;
  --color-teal-700: #06473f;
  --color-teal-900: #03221e;

  /* Status back-compat aliases — Badge uses bg-/border-/text-{color}-dark|light */
  --color-cyan-dark:     var(--color-cyan-500);
  --color-cyan-light:    var(--color-cyan-50);
  --color-indigo-dark:   var(--color-indigo-500);
  --color-indigo-light:  var(--color-indigo-50);
  --color-purple-dark:   var(--color-purple-500);
  --color-purple-light:  var(--color-purple-50);
  --color-fuchsia-dark:  var(--color-fuchsia-500);
  --color-fuchsia-light: var(--color-fuchsia-50);
  --color-rose-dark:     var(--color-rose-500);
  --color-rose-light:    var(--color-rose-50);
  --color-teal-dark:     var(--color-teal-500);
  --color-teal-light:    var(--color-teal-50);

  /* ==========================================================
   * LAYER 2 — SEMANTIC COLORS (var() references only, no hex)
   *
   * RULES:
   * - Only var(--color-*) references here. Never raw hex.
   * - These carry meaning: "brand", "danger", "muted", etc.
   * - Components consume ONLY these tokens, never Layer 1 directly
   *   (exception: ColorGenerator preview uses Layer 1 directly).
   * ========================================================== */

  /* ── Text ────────────────────────────────────────────────── */
  --color-text-primary:               var(--color-black);
  --color-text-secondary:             var(--color-gray-500);
  --color-text-success:               var(--color-success-500);
  --color-text-success-light:         var(--color-success-100);
  --color-text-warning:               var(--color-warning-600);
  --color-text-warning-light:         var(--color-warning-100);
  --color-text-critical:              var(--color-critical-500);
  --color-text-critical-light:        var(--color-critical-100);
  --color-text-brand:                 var(--color-primary-500);
  --color-text-brand-light:           var(--color-primary-100);
  --color-text-brand-secondary:       var(--color-secondary-500);
  --color-text-brand-secondary-light: var(--color-secondary-100);
  --color-text-white:                 var(--color-white);
  --color-text-black:                 var(--color-black);

  /* ── Background ──────────────────────────────────────────── */
  --color-bg-brand-light:             var(--color-primary-50);
  --color-bg-brand-secondary-light:   var(--color-secondary-50);
  --color-bg-primary:                 var(--color-white);
  --color-bg-black:                   var(--color-black);
  --color-bg-brand:                   var(--color-primary-500);
  --color-bg-brand-secondary:         var(--color-secondary-500);
  --color-bg-secondary:               var(--color-gray-50);
  --color-bg-gray-dark:               var(--color-gray-300);
  --color-bg-success:                 var(--color-success-500);
  --color-bg-success-light:           var(--color-success-50);
  --color-bg-critical:                var(--color-critical-500);
  --color-bg-critical-light:          var(--color-critical-50);
  --color-bg-warning:                 var(--color-warning-500);
  --color-bg-warning-light:           var(--color-warning-50);

  /* ── Border ──────────────────────────────────────────────── */
  --color-border-brand:               var(--color-primary-500);
  --color-border-brand-light:         var(--color-primary-200);
  --color-border-brand-secondary:     var(--color-secondary-500);
  --color-border-primary:             var(--color-gray-200);
  --color-border-gray-dark:           var(--color-gray-400);
  --color-border-success:             var(--color-success-500);
  --color-border-warning:             var(--color-warning-500);
  --color-border-critical:            var(--color-critical-500);
  --color-border-white:               var(--color-white);
  --color-border-black:               var(--color-black);

  /* ── Icon ────────────────────────────────────────────────── */
  --color-icon-primary:                    var(--color-black);
  --color-icon-secondary:                  var(--color-gray-500);
  --color-icon-brand:                      var(--color-primary-500);
  --color-icon-brand-light:               var(--color-primary-100);
  --color-icon-brand-secondary:           var(--color-secondary-500);
  --color-icon-brand-secondary-light:     var(--color-secondary-100);
  --color-icon-success:                    var(--color-success-500);
  --color-icon-success-light:             var(--color-success-100);
  --color-icon-warning:                    var(--color-warning-500);
  --color-icon-warning-light:             var(--color-warning-100);
  --color-icon-critical:                   var(--color-critical-500);
  --color-icon-critical-light:            var(--color-critical-100);
  --color-icon-white:                      var(--color-white);
  --color-icon-black:                      var(--color-black);

  /* ── Button ──────────────────────────────────────────────── */
  --color-btn-text-primary:                var(--color-white);
  --color-btn-text-disabled:               var(--color-gray-400);
  --color-btn-text-bordered:               var(--color-black);
  --color-btn-text-critical:               var(--color-critical-500);
  --color-btn-text-secondary:              var(--color-secondary-500);
  --color-btn-text-secondary-focused:      var(--color-secondary-600);
  --color-btn-text-secondary-disabled:     var(--color-secondary-200);
  --color-btn-bg-primary:                  var(--color-primary-500);
  --color-btn-bg-primary-focused:          var(--color-primary-700);
  --color-btn-bg-primary-disabled:         var(--color-gray-200);
  --color-btn-bg-bordered:                 var(--color-white);
  --color-btn-bg-critical:                 var(--color-critical-500);
  --color-btn-border-primary:              var(--color-gray-300);
  --color-btn-border-focused:              var(--color-primary-500);
  --color-btn-border-disabled:             var(--color-gray-200);
  --color-btn-border-critical:             var(--color-critical-500);
  --color-btn-icon-primary:                var(--color-white);
  --color-btn-icon-bordered:               var(--color-black);
  --color-btn-icon-secondary:              var(--color-secondary-500);
  --color-btn-icon-secondary-focused:      var(--color-secondary-600);
  --color-btn-icon-secondary-disabled:     var(--color-secondary-200);
  --color-btn-icon-disabled:               var(--color-gray-400);
  --color-btn-icon-critical:               var(--color-critical-500);

  /* ── Input Field ─────────────────────────────────────────── */
  --color-input-text-label:       var(--color-black);
  --color-input-text-enabled:     var(--color-black);
  --color-input-text-placeholder: var(--color-gray-400);
  --color-input-text-disabled:    var(--color-gray-300);
  --color-input-text-helper:      var(--color-gray-500);
  --color-input-text-critical:    var(--color-critical-500);
  --color-input-bg-primary:       var(--color-white);
  --color-input-bg-disabled:      var(--color-gray-50);
  --color-input-border-enabled:   var(--color-gray-300);
  --color-input-border-selected:  var(--color-primary-500);
  --color-input-border-critical:  var(--color-critical-500);
  --color-input-border-disabled:  var(--color-gray-200);
  --color-input-icon-enabled:     var(--color-black);
  --color-input-icon-disabled:    var(--color-gray-300);
  --color-input-icon-critical:    var(--color-critical-500);

  /* ── Navigation ──────────────────────────────────────────── */
  --color-nav-bg:                       var(--color-white);
  --color-nav-bg-secondary:             var(--color-gray-50);
  --color-nav-bg-hover:                 var(--color-gray-100);
  --color-nav-text-primary:             var(--color-black);
  --color-nav-text-primary-collapse:    var(--color-white);
  --color-nav-text-secondary:           var(--color-gray-500);
  --color-nav-icon-primary:             var(--color-black);
  --color-nav-icon-secondary:           var(--color-gray-500);
  --color-nav-tile-bg-primary:          var(--color-white);
  --color-nav-tile-bg-secondary:        var(--color-gray-100);

  /* ── Status (Badge) ──────────────────────────────────────── */
  --color-status-bg-cyan:          var(--color-cyan-500);
  --color-status-text-cyan:        var(--color-cyan-50);
  --color-status-border-cyan:      var(--color-cyan-500);
  --color-status-bg-cyan-light:    var(--color-cyan-50);
  --color-status-bg-indigo:        var(--color-indigo-500);
  --color-status-text-indigo:      var(--color-indigo-50);
  --color-status-border-indigo:    var(--color-indigo-500);
  --color-status-bg-indigo-light:  var(--color-indigo-50);
  --color-status-bg-purple:        var(--color-purple-500);
  --color-status-text-purple:      var(--color-purple-50);
  --color-status-border-purple:    var(--color-purple-500);
  --color-status-bg-purple-light:  var(--color-purple-50);
  --color-status-bg-fuchsia:       var(--color-fuchsia-500);
  --color-status-text-fuchsia:     var(--color-fuchsia-50);
  --color-status-border-fuchsia:   var(--color-fuchsia-500);
  --color-status-bg-fuchsia-light: var(--color-fuchsia-50);
  --color-status-rose-bg:          var(--color-rose-500);
  --color-status-rose-text:        var(--color-rose-500);
  --color-status-rose-border:      var(--color-rose-500);
  --color-status-rose-bg-light:    var(--color-rose-50);
  --color-status-teal-bg:          var(--color-teal-500);
  --color-status-teal-text:        var(--color-teal-500);
  --color-status-teal-border:      var(--color-teal-500);
  --color-status-teal-bg-light:    var(--color-teal-50);
  --color-status-text-white:       var(--color-white);
}

/* ==========================================================
 * DARK THEME
 *
 * Only semantic tokens are remapped here.
 * Primitive color values (Layer 1) are NEVER redefined in dark mode.
 * Applied when `.dark` class is on <html>.
 * ========================================================== */
.dark {
  /* ── Text ── */
  --color-text-primary:               var(--color-white);
  --color-text-secondary:             var(--color-gray-200);
  --color-text-success:               var(--color-success-200);
  --color-text-success-light:         var(--color-success-800);
  --color-text-warning:               var(--color-warning-200);
  --color-text-warning-light:         var(--color-warning-800);
  --color-text-critical:              var(--color-critical-200);
  --color-text-critical-light:        var(--color-critical-800);
  --color-text-brand:                 var(--color-primary-200);
  --color-text-brand-light:           var(--color-primary-700);
  --color-text-brand-secondary:       var(--color-secondary-200);
  --color-text-brand-secondary-light: var(--color-secondary-700);
  --color-text-white:                 var(--color-black);
  --color-text-black:                 var(--color-white);

  /* ── Background ── */
  --color-bg-brand-light:           var(--color-primary-900);
  --color-bg-brand-secondary-light: var(--color-secondary-900);
  --color-bg-primary:               var(--color-black);
  --color-bg-black:                 var(--color-white);
  --color-bg-brand:                 var(--color-primary-500);
  --color-bg-brand-secondary:       var(--color-secondary-500);
  --color-bg-secondary:             var(--color-gray-900);
  --color-bg-gray-dark:             var(--color-gray-700);
  --color-bg-success:               var(--color-success-500);
  --color-bg-success-light:         var(--color-success-900);
  --color-bg-critical:              var(--color-critical-500);
  --color-bg-critical-light:        var(--color-critical-900);
  --color-bg-warning:               var(--color-warning-500);
  --color-bg-warning-light:         var(--color-warning-900);

  /* ── Border ── */
  --color-border-brand:           var(--color-primary-700);
  --color-border-brand-light:     var(--color-primary-800);
  --color-border-brand-secondary: var(--color-secondary-700);
  --color-border-primary:         var(--color-gray-900);
  --color-border-gray-dark:       var(--color-gray-800);
  --color-border-success:         var(--color-success-700);
  --color-border-warning:         var(--color-warning-700);
  --color-border-critical:        var(--color-critical-700);
  --color-border-white:           var(--color-white);
  --color-border-black:           var(--color-white);

  /* ── Icon ── */
  --color-icon-primary:               var(--color-white);
  --color-icon-secondary:             var(--color-gray-300);
  --color-icon-brand:                 var(--color-primary-200);
  --color-icon-brand-light:           var(--color-primary-700);
  --color-icon-brand-secondary:       var(--color-secondary-200);
  --color-icon-brand-secondary-light: var(--color-secondary-700);
  --color-icon-success:               var(--color-success-200);
  --color-icon-success-light:         var(--color-success-800);
  --color-icon-warning:               var(--color-warning-100);
  --color-icon-warning-light:         var(--color-warning-800);
  --color-icon-critical:              var(--color-critical-200);
  --color-icon-critical-light:        var(--color-critical-800);
  --color-icon-white:                 var(--color-white);
  --color-icon-black:                 var(--color-white);

  /* ── Button ── */
  --color-btn-text-primary:            var(--color-white);
  --color-btn-text-disabled:           var(--color-gray-200);
  --color-btn-text-bordered:           var(--color-white);
  --color-btn-text-critical:           var(--color-critical-500);
  --color-btn-text-secondary:          var(--color-secondary-300);
  --color-btn-text-secondary-focused:  var(--color-secondary-400);
  --color-btn-text-secondary-disabled: var(--color-secondary-700);
  --color-btn-bg-primary:              var(--color-primary-500);
  --color-btn-bg-primary-focused:      var(--color-primary-700);
  --color-btn-bg-primary-disabled:     var(--color-gray-800);
  --color-btn-bg-bordered:             var(--color-gray-900);
  --color-btn-bg-critical:             var(--color-critical-500);
  --color-btn-border-primary:          var(--color-gray-800);
  --color-btn-border-focused:          var(--color-gray-200);
  --color-btn-border-disabled:         var(--color-gray-900);
  --color-btn-border-critical:         var(--color-critical-500);
  --color-btn-icon-primary:            var(--color-white);
  --color-btn-icon-bordered:           var(--color-white);
  --color-btn-icon-secondary:          var(--color-secondary-300);
  --color-btn-icon-secondary-focused:  var(--color-secondary-400);
  --color-btn-icon-secondary-disabled: var(--color-secondary-700);
  --color-btn-icon-disabled:           var(--color-gray-200);
  --color-btn-icon-critical:           var(--color-critical-500);

  /* ── Input Field ── */
  --color-input-text-label:       var(--color-white);
  --color-input-text-enabled:     var(--color-white);
  --color-input-text-placeholder: var(--color-gray-300);
  --color-input-text-disabled:    var(--color-gray-700);
  --color-input-text-helper:      var(--color-gray-500);
  --color-input-text-critical:    var(--color-critical-500);
  --color-input-bg-primary:       var(--color-gray-900);
  --color-input-bg-disabled:      var(--color-black);
  --color-input-border-enabled:   var(--color-gray-700);
  --color-input-border-selected:  var(--color-primary-300);
  --color-input-border-critical:  var(--color-critical-500);
  --color-input-border-disabled:  var(--color-gray-800);
  --color-input-icon-enabled:     var(--color-white);
  --color-input-icon-disabled:    var(--color-gray-700);
  --color-input-icon-critical:    var(--color-critical-500);

  /* ── Navigation ── */
  --color-nav-bg:                    var(--color-gray-900);
  --color-nav-bg-secondary:          var(--color-gray-800);
  --color-nav-bg-hover:              var(--color-gray-700);
  --color-nav-text-primary:          var(--color-black);
  --color-nav-text-primary-collapse: var(--color-white);
  --color-nav-text-secondary:        var(--color-gray-100);
  --color-nav-icon-primary:          var(--color-black);
  --color-nav-icon-secondary:        var(--color-gray-200);
  --color-nav-tile-bg-primary:       var(--color-white);
  --color-nav-tile-bg-secondary:     var(--color-gray-800);

  /* ── Status (Badge) ── */
  --color-status-bg-cyan:          var(--color-cyan-500);
  --color-status-text-cyan:        var(--color-cyan-100);
  --color-status-border-cyan:      var(--color-cyan-700);
  --color-status-bg-cyan-light:    var(--color-cyan-900);
  --color-status-bg-indigo:        var(--color-indigo-500);
  --color-status-text-indigo:      var(--color-indigo-100);
  --color-status-border-indigo:    var(--color-indigo-700);
  --color-status-bg-indigo-light:  var(--color-indigo-900);
  --color-status-bg-purple:        var(--color-purple-500);
  --color-status-text-purple:      var(--color-purple-100);
  --color-status-border-purple:    var(--color-purple-700);
  --color-status-bg-purple-light:  var(--color-purple-900);
  --color-status-bg-fuchsia:       var(--color-fuchsia-500);
  --color-status-text-fuchsia:     var(--color-fuchsia-100);
  --color-status-border-fuchsia:   var(--color-fuchsia-700);
  --color-status-bg-fuchsia-light: var(--color-fuchsia-900);
  --color-status-bg-rose:          var(--color-rose-500);
  --color-status-text-rose:        var(--color-rose-100);
  --color-status-border-rose:      var(--color-rose-700);
  --color-status-bg-rose-light:    var(--color-rose-900);
  --color-status-bg-teal:          var(--color-teal-500);
  --color-status-text-teal:        var(--color-teal-100);
  --color-status-border-teal:      var(--color-teal-700);
  --color-status-bg-teal-light:    var(--color-teal-900);
  --color-status-text-white:       var(--color-white);
}

/* ==========================================================
 * BASE LAYER — global element defaults
 * ========================================================== */
@layer base {
  * {
    @apply border-border-primary;
  }
  body {
    @apply bg-bg-primary text-text-primary;
  }
}

/* ==========================================================
 * CUSTOM ANIMATIONS
 * ========================================================== */
@keyframes btn-spin {
  to { transform: rotate(360deg); }
}
```

---

## STEP 3 — Rules Claude Code must follow when working with this file

These rules are **permanent and apply to every future task** in this project:

### ✅ DO
- Use `text-text-*` classes for all text colors (e.g. `text-text-primary`, `text-text-brand`)
- Use `bg-bg-*` classes for all backgrounds (e.g. `bg-bg-primary`, `bg-bg-brand`)
- Use `border-border-*` classes for all borders (e.g. `border-border-primary`)
- Use `text-btn-*`, `bg-btn-*`, `border-btn-*` for button states
- Use `text-input-*`, `bg-input-*`, `border-input-*` for form fields
- Use `bg-nav-*`, `text-nav-*` for navigation elements
- Use `text-xs`, `text-sm`, `text-md`, etc. for font sizes (from the typography scale)

### ❌ NEVER DO
- Never hardcode a hex color in a component (e.g. `style={{ color: '#0056b8' }}`)
- Never use Tailwind's built-in color palette directly (e.g. `text-blue-500`, `bg-orange-400`)
- Never use `var(--color-primary-500)` directly in a component — use semantic tokens
- Never add new hex values inside `@theme` — only Layer 1 primitives may have hex values
- Never add new semantic tokens in `.dark {}` that don't also exist in `@theme {}`
- Never edit `index.css` to "fix" a color — update the component's token usage instead

### 🔄 When the Color Generator updates primary/secondary/neutral colors:
The **only** lines that change in `index.css` are the 10 primitive hex values for that palette in Layer 1:
```
--color-primary-50 through --color-primary-900
--color-secondary-50 through --color-secondary-900  
--color-gray-50 through --color-gray-900
```
**Nothing else in the file changes.** All semantic tokens automatically inherit the new values via `var()` references.

---

## STEP 4 — How to add a new semantic token (if needed in future)

1. Add it to `@theme {}` as a `var()` reference: `--color-text-muted: var(--color-gray-400);`
2. Add its dark-mode override to `.dark {}`: `--color-text-muted: var(--color-gray-300);`
3. Tailwind will auto-generate a utility class: `text-text-muted`
4. Use that class in components — never the raw CSS variable

---

## FILE STRUCTURE SUMMARY

```
index.css
├── @import tailwindcss + tw-animate-css
├── @custom-variant dark
├── @theme {
│   ├── Typography scale (--text-*)
│   ├── Layer 1: Primitive colors (hex only)
│   │   ├── primary-50 to 900     ← Color Generator updates ONLY these
│   │   ├── secondary-50 to 900   ← Color Generator updates ONLY these
│   │   ├── gray-50 to 900        ← Color Generator updates ONLY these
│   │   ├── success, critical, warning (fixed — not user-configurable)
│   │   └── status colors: cyan, indigo, purple, fuchsia, rose, teal
│   └── Layer 2: Semantic tokens (var() only)
│       ├── text-*, bg-*, border-*
│       ├── icon-*, btn-*, input-*, nav-*
│       └── status-* (Badge)
├── .dark { semantic overrides only }
├── @layer base { body/element defaults }
└── @keyframes btn-spin
```
