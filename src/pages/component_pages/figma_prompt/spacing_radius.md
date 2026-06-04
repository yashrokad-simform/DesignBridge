# 🎨 Figma Spacing and Radius System Setup Prompt

Create two new variable collections in the currently active Figma file using the Figma Console MCP tools. Use `figma_setup_design_tokens` (or `figma_create_variable_collection` + `figma_batch_create_variables`) to do this efficiently in batch operations.

═══════════════════════════════════════
COLLECTION 1: "Spacing"
═══════════════════════════════════════
- Type: FLOAT (number)
- Mode: "Default" (single mode)
- Variables (name → value in pixels):

spacing-none    → 0
spacing-xxs     → 2
spacing-xs      → 4
spacing-sm      → 6
spacing-md      → 8
spacing-lg      → 10
spacing-xl      → 12
spacing-2xl     → 14
spacing-3xl     → 16
spacing-4xl     → 20
spacing-5xl     → 24
spacing-6xl     → 32
spacing-7xl     → 40
spacing-8xl     → 48
spacing-9xl     → 64
spacing-10xl    → 80
spacing-11xl    → 96
spacing-12xl    → 128

═══════════════════════════════════════
COLLECTION 2: "Radius"
═══════════════════════════════════════
- Type: FLOAT (number)
- Mode: "Default" (single mode)
- Variables (name → value in pixels):

radius-none     → 0
radius-xxs      → 2
radius-xs       → 4
radius-sm       → 6
radius-md       → 8
radius-lg       → 10
radius-xl       → 12
radius-2xl      → 16
radius-3xl      → 20
radius-4xl      → 24
radius-5xl      → 32
radius-full     → 9999

═══════════════════════════════════════
REQUIREMENTS
═══════════════════════════════════════
1. Create both collections as SEPARATE collections (do not merge).
2. Use the exact variable names listed above (lowercase, kebab-case, preserve the dash before numeric prefixes like "2xl", "3xl", etc.).
3. All values are FLOAT (number) type — not strings, not dimensions.
4. Use batch operations to keep this fast — ideally one collection creation + one batch variable creation per collection (2 batches total, not 29 individual calls).
5. Before creating, check if collections named "Spacing" or "Radius" already exist in this file — if they do, ask me whether to overwrite, append, or rename before proceeding.
6. After creation, confirm with a summary: collection IDs, variable counts, and any errors.
7. Do NOT publish the library — leave that to me.