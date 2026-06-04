# 🎨 Figma Typography System Setup Prompt

## Context
I have already created **color styles** in my Figma file. Now I need you to set up the **complete Typography system** following a 3-layer architecture:

1. **Primitives Collection** (raw values: strings & numbers)
2. **Typography Collection** (semantic tokens linked to primitives)
3. **Text Styles** (final styles linked to Typography variables)

---

## ⚙️ STEP 1: Create Primitives Variables

Create a collection named **"_primitives"** (or use existing) with the following variables:

### Font Family (String)
```
Font/Family/Base → "Inter"
```

### Font Weight (String)
```
Font/Weight/Regular     → "Regular"
Font/Weight/Medium      → "Medium"
Font/Weight/Semi Bold   → "Semi Bold"
Font/Weight/Bold        → "Bold"
```

### Font Size (Number)
```
Font/Size/Label sm      → 12
Font/Size/Body sm       → 14
Font/Size/Body md       → 16
Font/Size/Body lg       → 18
Font/Size/Heading md    → 20
Font/Size/Heading lg    → 24
Font/Size/Heading xl    → 32
Font/Size/Display sm    → 40
Font/Size/Display md    → 48
Font/Size/Display lg    → 60
Font/Size/Display xl    → 72
```

### Line Height (Number)
```
Font/Line Height/Label sm              → 16
Font/Line Height/Label sm Paragraphgraph    → 20
Font/Line Height/Body sm               → 18
Font/Line Height/Body sm Paragraphgraph     → 22
Font/Line Height/Body md               → 22
Font/Line Height/Body lg               → 26
Font/Line Height/Heading md            → 28
Font/Line Height/Heading lg            → 32
Font/Line Height/Heading xl            → 36
Font/Line Height/Display sm            → 48
Font/Line Height/Display md            → 54
Font/Line Height/Display lg            → 68
Font/Line Height/Display xl            → 76
```

### Letter Spacing (Number)
```
Font/Letter Spacing/Label sm              → 0
Font/Letter Spacing/Label sm Paragraphgraph    → 0
Font/Letter Spacing/Body sm               → 0
Font/Letter Spacing/Body sm Paragraphgraph     → 0
Font/Letter Spacing/Body md               → 0
Font/Letter Spacing/Body lg               → 0
Font/Letter Spacing/Heading md            → 0
Font/Letter Spacing/Heading lg            → 0
Font/Letter Spacing/Heading xl            → 0
Font/Letter Spacing/Display sm            → -1
Font/Letter Spacing/Display md            → -1
Font/Letter Spacing/Display lg            → -2
Font/Letter Spacing/Display xl            → -2
```

---

## ⚙️ STEP 2: Create Typography Collection (Linked Variables)

Create a new collection named **"Typography"** with variables that **alias** the primitives above. Use this exact naming structure:

### Display Tier
| Variable Name | Linked To |
|---|---|
| `Display xl/Font-size` | `Font/Size/Display xl` |
| `Display xl/Bold` | `Font/Weight/Bold` |
| `Display xl/Semi Bold` | `Font/Weight/Semi Bold` |
| `Display xl/Font-height` | `Font/Line Height/Display xl` |
| `Display xl/Font-letter-spacing` | `Font/Letter Spacing/Display xl` |
| `Display lg/Font-size` | `Font/Size/Display lg` |
| `Display lg/Bold` | `Font/Weight/Bold` |
| `Display lg/Semi Bold` | `Font/Weight/Semi Bold` |
| `Display lg/Font-height` | `Font/Line Height/Display lg` |
| `Display lg/Font-letter-spacing` | `Font/Letter Spacing/Display lg` |
| `Display md/Font-size` | `Font/Size/Display md` |
| `Display md/Bold` | `Font/Weight/Bold` |
| `Display md/Semi Bold` | `Font/Weight/Semi Bold` |
| `Display md/Font-height` | `Font/Line Height/Display md` |
| `Display md/Font-letter-spacing` | `Font/Letter Spacing/Display md` |
| `Display sm/Font-size` | `Font/Size/Display sm` |
| `Display sm/Bold` | `Font/Weight/Bold` |
| `Display sm/Semi Bold` | `Font/Weight/Semi Bold` |
| `Display sm/Font-height` | `Font/Line Height/Display sm` |
| `Display sm/Font-letter-spacing` | `Font/Letter Spacing/Display sm` |

### Heading Tier
| Variable Name | Linked To |
|---|---|
| `Heading xl/Font-size` | `Font/Size/Heading xl` |
| `Heading xl/Bold` | `Font/Weight/Bold` |
| `Heading xl/Semi Bold` | `Font/Weight/Semi Bold` |
| `Heading xl/Font-height` | `Font/Line Height/Heading xl` |
| `Heading xl/Font-letter-spacing` | `Font/Letter Spacing/Heading xl` |
| `Heading lg/Font-size` | `Font/Size/Heading lg` |
| `Heading lg/Bold` | `Font/Weight/Bold` |
| `Heading lg/Semi Bold` | `Font/Weight/Semi Bold` |
| `Heading lg/Font-height` | `Font/Line Height/Heading lg` |
| `Heading lg/Font-letter-spacing` | `Font/Letter Spacing/Heading lg` |
| `Heading md/Font-size` | `Font/Size/Heading md` |
| `Heading md/Bold` | `Font/Weight/Bold` |
| `Heading md/Semi Bold` | `Font/Weight/Semi Bold` |
| `Heading md/Font-height` | `Font/Line Height/Heading md` |
| `Heading md/Font-letter-spacing` | `Font/Letter Spacing/Heading md` |

### Body Tier
| Variable Name | Linked To |
|---|---|
| `Body lg/Font-size` | `Font/Size/Body lg` |
| `Body lg/Bold` | `Font/Weight/Bold` |
| `Body lg/Semi Bold` | `Font/Weight/Semi Bold` |
| `Body lg/Medium` | `Font/Weight/Medium` |
| `Body lg/Font-height` | `Font/Line Height/Body lg` |
| `Body lg/Font-letter-spacing` | `Font/Letter Spacing/Body lg` |
| `Body md/Font-size` | `Font/Size/Body md` |
| `Body md/Semi Bold` | `Font/Weight/Semi Bold` |
| `Body md/Medium` | `Font/Weight/Medium` |
| `Body md/Regular` | `Font/Weight/Regular` |
| `Body md/Font-height` | `Font/Line Height/Body md` |
| `Body md/Font-letter-spacing` | `Font/Letter Spacing/Body md` |
| `Body sm/Font-size` | `Font/Size/Body sm` |
| `Body sm/Regular` | `Font/Weight/Regular` |
| `Body sm/Medium` | `Font/Weight/Medium` |
| `Body sm/Semi Bold` | `Font/Weight/Semi Bold` |
| `Body sm/Font-height` | `Font/Line Height/Body sm` |
| `Body sm/Font-letter-spacing` | `Font/Letter Spacing/Body sm` |
| `Body sm/Font-height Paragraph` | `Font/Line Height/Body sm Paragraphgraph` |
| `Body sm/Font-letter-spacing Paragraph` | `Font/Letter Spacing/Body sm Paragraphgraph` |

### Label Tier
| Variable Name | Linked To |
|---|---|
| `Label sm/Font-size` | `Font/Size/Label sm` |
| `Label sm/Regular` | `Font/Weight/Regular` |
| `Label sm/Medium` | `Font/Weight/Medium` |
| `Label sm/Semi Bold` | `Font/Weight/Semi Bold` |
| `Label sm/Font-height` | `Font/Line Height/Label sm` |
| `Label sm/Font-letter-spacing` | `Font/Letter Spacing/Label sm` |
| `Label sm/Font-height Paragraph` | `Font/Line Height/Label sm Paragraphgraph` |
| `Label sm/Font-letter-spacing Paragraph` | `Font/Letter Spacing/Label sm Paragraphgraph` |

### Global
```
Font Family → "Font/Family/Base"
```

---

## ⚙️ STEP 3: Create Text Styles (Linked to Typography Variables — NOT Primitives)

Create text styles using the naming pattern **`Tier/Weight`**. Every property must be bound to a Typography variable.

### 🔑 Binding Rules (Apply to EVERY style)
- **Font Family** → `Font Family` variable
- **Font Weight** → `{Tier}/{Weight}` variable (matches style name)
- **Font Size** → `{Tier}/Font-size` variable
- **Line Height** → `{Tier}/Font-height` variable
- **Letter Spacing** → `{Tier}/Font-letter-spacing` variable

### Styles to Create

**Display Tier** (Bold + Semi Bold variants each)
- `Display xl/Bold`, `Display xl/Semi Bold`
- `Display lg/Bold`, `Display lg/Semi Bold`
- `Display md/Bold`, `Display md/Semi Bold`
- `Display sm/Bold`, `Display sm/Semi Bold`

**Heading Tier** (Bold + Semi Bold variants each)
- `Heading xl/Bold`, `Heading xl/Semi Bold`
- `Heading lg/Bold`, `Heading lg/Semi Bold`
- `Heading md/Bold`, `Heading md/Semi Bold`

**Body Tier**
- `Body lg/Bold`, `Body lg/Semi Bold`, `Body lg/Medium`
- `Body md/Semi Bold`, `Body md/Medium`, `Body md/Regular`
- `Body sm/Semi Bold`, `Body sm/Medium`, `Body sm/Regular`
- `Body sm/Regular Paragraph`, `Body sm/Medium Paragraph` *(use `Font-height Paragraph` & `Font-letter-spacing Paragraph`)*

**Label Tier**
- `Label sm/Semi Bold`, `Label sm/Medium`, `Label sm/Regular`
- `Label sm/Regular Paragraph`, `Label sm/Medium Paragraph` *(use `Font-height Paragraph` & `Font-letter-spacing Paragraph`)*

---

## ✅ Critical Requirements

1. **Every text style property MUST be bound to a variable** — no hardcoded values.
2. **Text Styles reference Typography variables only**, NOT primitives directly.
3. **Typography variables alias primitives** — they are the middle layer.
4. **Paragraphgraph variants** (`Body sm Paragraph`, `Label sm Paragraph`) use the `Paragraphgraph` line-height and letter-spacing variables for multi-line text contexts.
5. Confirm completion with a summary count: `X primitives created, Y typography tokens created, Z text styles created`.
