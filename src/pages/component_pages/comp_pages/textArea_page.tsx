import React, { useState } from 'react';
import { TextArea, type TextAreaCornerRadius, type TextAreaPadding, type TextAreaTextSize } from '../../../components/ui/main_components/TextArea';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import textAreaMd from '../md_files/textarea-instruction.md?raw';
import textAreaFigmaMd from '../figma_prompt/textarea-prompt.md?raw';

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Options', type: 'divider' },
  { key: 'showLabel',    label: 'Label',       type: 'toggle' },
  { key: 'showRequired', label: 'Required',    type: 'toggle' },
  { key: 'showHelper',   label: 'Helper Text', type: 'toggle' },
  { key: 'div1', label: 'Appearance', type: 'divider' },
  {
    key: 'cornerRadius',
    label: 'Corner Radius',
    type: 'select',
    options: [
      { value: '4px',  label: '4px' },
      { value: '8px',  label: '8px' },
      { value: '12px', label: '12px (default)' },
      { value: '16px', label: '16px' },
    ],
  },
  {
    key: 'padding',
    label: 'Padding',
    type: 'select',
    options: [
      { value: '12px', label: '12px (default)' },
      { value: '14px', label: '14px' },
      { value: '16px', label: '16px' },
      { value: '20px', label: '20px' },
    ],
  },
  {
    key: 'textSize',
    label: 'Text Size',
    type: 'select',
    options: [
      { value: '12px', label: '12px' },
      { value: '14px', label: '14px (default)' },
      { value: '16px', label: '16px' },
    ],
  },
];

const DEFAULT_VALUES: InputValues = {
  showLabel:    true,
  showRequired: true,
  showHelper:   true,
  cornerRadius: '12px',
  padding:      '12px',
  textSize:     '14px',
};

/* ── Demo wrapper ───────────────────────────────────────── */
interface DemoProps {
  label?: string;
  required?: boolean;
  helperText?: string;
  errorText?: string;
  disabled?: boolean;
  focused?: boolean;
  placeholder?: string;
  defaultValue?: string;
  cornerRadius: TextAreaCornerRadius;
  padding: TextAreaPadding;
  textSize: TextAreaTextSize;
}

function Demo({ label, required, helperText, errorText, disabled, focused, placeholder, defaultValue, cornerRadius, padding, textSize }: DemoProps) {
  const [value, setValue] = useState(defaultValue ?? '');
  return (
    <div className="w-[400px]">
      <TextArea
        label={label}
        required={required}
        placeholder={placeholder}
        helperText={helperText}
        errorText={errorText}
        disabled={disabled}
        focused={focused}
        cornerRadius={cornerRadius}
        padding={padding}
        textSize={textSize}
        value={value}
        onChange={setValue}
      />
    </div>
  );
}

/* ── MD helpers ─────────────────────────────────────────── */
const RADIUS_MD: Record<TextAreaCornerRadius, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
};

const PADDING_MD: Record<TextAreaPadding, string> = {
  '12px': 'px-3',
  '14px': 'px-3.5',
  '16px': 'px-4',
  '20px': 'px-5',
};

const TEXT_SIZE_MD: Record<TextAreaTextSize, { cls: string; leading: string }> = {
  '12px': { cls: 'text-xs',  leading: 'leading-4'   },
  '14px': { cls: 'text-sm',  leading: 'leading-4.5' },
  '16px': { cls: 'text-base',  leading: 'leading-5.5' },
};

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showLabel    = vals.showLabel    as boolean;
  const showRequired = vals.showRequired as boolean;
  const showHelper   = vals.showHelper   as boolean;
  const cornerRadius = (vals.cornerRadius as TextAreaCornerRadius) ?? '12px';
  const padding      = (vals.padding      as TextAreaPadding)      ?? '12px';
  const textSize     = (vals.textSize     as TextAreaTextSize)     ?? '14px';

  const label    = showLabel ? 'Description' : undefined;
  const required = showLabel && showRequired;
  const helper   = showHelper ? 'This is a hint text to help the user.' : undefined;

  const shared = { label, required, cornerRadius, padding, textSize };

  return [
    {
      id:          'states',
      label:       'States',
      dotColor:    '',
      hideDivider: true,
      styles: [{
        id:          'all-states',
        label:       '',
        accentColor: '#0056b8',
        rows: [
          {
            cells: [
              { label: 'Enabled',  node: <Demo {...shared} helperText={helper} placeholder="Enter text…" /> },
              { label: 'Focused',  node: <Demo {...shared} helperText={helper} placeholder="Enter text…" focused /> },
            ],
          },
          {
            cells: [
              { label: 'Filled',   node: <Demo {...shared} helperText={helper} defaultValue="This is some filled content in the textarea." /> },
              { label: 'Error',    node: <Demo {...shared} errorText="This field is required." placeholder="Enter text…" /> },
            ],
          },
          {
            cells: [
              { label: 'Disabled', node: <Demo {...shared} helperText={helper} placeholder="Enter text…" disabled /> },
            ],
          },
        ],
      }],
    },
  ];
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(_vals: InputValues): Record<string, string> {
  return {};
}

/* ── transformMarkdown ──────────────────────────────────── */
function transformMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const cornerRadius = (vals.cornerRadius as TextAreaCornerRadius) ?? '12px';
  const padding      = (vals.padding      as TextAreaPadding)      ?? '12px';
  const textSize     = (vals.textSize     as TextAreaTextSize)     ?? '14px';

  const radiusCls  = RADIUS_MD[cornerRadius];
  const paddingCls = PADDING_MD[padding];
  const { cls: textCls, leading: leadingCls } = TEXT_SIZE_MD[textSize];

  // CVA base class — update corner radius
  md = md.replace(
    /flex flex-col w-full (rounded\S+) border overflow-hidden relative/g,
    `flex flex-col w-full ${radiusCls} border overflow-hidden relative`,
  );

  // Content area — update horizontal padding
  md = md.replace(
    /flex flex-1 min-h-0 (px-\S+) py-2 relative/g,
    `flex flex-1 min-h-0 ${paddingCls} py-2 relative`,
  );

  // Content area note
  md = md.replace(
    /> `(px-\S+)` = \d+px · `py-2` = 8px/g,
    `> \`${paddingCls}\` = ${padding} · \`py-2\` = 8px`,
  );

  // Typography table rows — Textarea value & Placeholder
  md = md.replace(
    /(\| (?:Textarea value|Placeholder) \| `)(text-\S+) font-medium (leading-\S+)/g,
    `$1${textCls} font-medium ${leadingCls}`,
  );

  // Typography note
  md = md.replace(
    /> `text-xs` = 12px · `text-sm` = 14px · `leading-4` = 16px · `leading-\S+` [≈=] \d+px/g,
    `> \`text-xs\` = 12px · \`text-sm\` = 14px · \`leading-4\` = 16px · \`${leadingCls}\` ≈ ${textSize === '16px' ? '22' : textSize === '12px' ? '16' : '18'}px`,
  );

  // Native textarea element block
  md = md.replace(
    /^(text-\S+) font-medium (leading-\S+)$/m,
    `${textCls} font-medium ${leadingCls}`,
  );

  return md;
}

/* ── Figma token maps ───────────────────────────────────── */
const RADIUS_TOKEN: Record<TextAreaCornerRadius, { token: string; px: string }> = {
  '4px':  { token: 'radius-sm',  px: '4px'  },
  '8px':  { token: 'radius-md',  px: '8px'  },
  '12px': { token: 'radius-xl',  px: '12px' },
  '16px': { token: 'radius-2xl', px: '16px' },
};

const PADDING_TOKEN: Record<TextAreaPadding, { token: string; px: string }> = {
  '12px': { token: 'spacing-xl',   px: '12px' },
  '14px': { token: 'spacing-2xl',  px: '14px' },
  '16px': { token: 'spacing-3xl',  px: '16px' },
  '20px': { token: 'spacing-4xl',  px: '20px' },
};

const TEXT_STYLE_TOKEN: Record<TextAreaTextSize, { style: string; px: string; lh: string }> = {
  '12px': { style: 'Body xs/Medium', px: '12px', lh: '16px' },
  '14px': { style: 'Body sm/Medium', px: '14px', lh: '18px' },
  '16px': { style: 'Body md/Medium', px: '16px', lh: '22px' },
};

/* ── removeTableColumn ───────────────────────────────────── */
function removeTableColumn(md: string, header: string): string {
  const lines = md.split('\n');
  let colIdx = -1;
  return lines.map(line => {
    if (!line.startsWith('|')) { colIdx = -1; return line; }
    const cells = line.split('|');
    if (colIdx === -1) {
      colIdx = cells.findIndex((c, i) => i > 0 && c.trim() === header);
    }
    if (colIdx > 0) {
      const updated = [...cells];
      updated.splice(colIdx, 1);
      return updated.join('|');
    }
    return line;
  }).join('\n');
}

/* ── transformFigmaMarkdown ──────────────────────────────── */
function transformFigmaMarkdown(raw: string, vals: InputValues): string {
  let md = raw;

  const showLabel    = vals.showLabel    as boolean;
  const showRequired = vals.showRequired as boolean;
  const showHelper   = vals.showHelper   as boolean;
  const cornerRadius = (vals.cornerRadius as TextAreaCornerRadius) ?? '12px';
  const padding      = (vals.padding      as TextAreaPadding)      ?? '12px';
  const textSize     = (vals.textSize     as TextAreaTextSize)     ?? '14px';

  const { token: radiusToken, px: radiusPx }   = RADIUS_TOKEN[cornerRadius];
  const { token: paddingToken, px: paddingPx } = PADDING_TOKEN[padding];
  const { style: textStyle, px: textPx, lh: textLh } = TEXT_STYLE_TOKEN[textSize];

  // Required only makes sense when Label is shown
  const showReq = showLabel && showRequired;

  // ── 1. Step 1 — Component properties list entries ─────────────
  if (!showLabel) {
    md = md.replace(/\n[ \t]*- Boolean `Show Label`[^\n]*/, '');
    md = md.replace(/\n[ \t]*- Boolean `Mandatory`[^\n]*/, '');
    md = md.replace(/\n[ \t]*- Text `Label`[^\n]*/, '');
  } else if (!showReq) {
    md = md.replace(/\n[ \t]*- Boolean `Mandatory`[^\n]*/, '');
  }
  if (!showHelper) {
    md = md.replace(/\n[ \t]*- Boolean `Show Hint`[^\n]*/, '');
    md = md.replace(/\n[ \t]*- Text `Hint`[^\n]*/, '');
  }

  // ── 1b. Step 1 — Label frame section ──────────────────────────
  if (!showLabel) {
    md = md.replace(/\n#### Label frame\n[\s\S]*?(?=\n#### |\n### Step 2)/, '\n');
  } else if (!showReq) {
    // Remove only the asterisk step (last bullet in the Label frame section)
    md = md.replace(/\n[0-9]+\. Add `\*` TEXT:[^\n]*\n/, '\n');
  }

  // ── 1c. Step 1 — Hint text section ────────────────────────────
  if (!showHelper) {
    md = md.replace(/\n#### Hint text\n[\s\S]*?(?=\n### Step 2|\n---\n)/, '\n');
  }

  // ── 2. Component Properties table rows ────────────────────
  if (!showLabel) {
    md = md.replace(/\| `Show Label#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
    md = md.replace(/\| `Mandatory#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
    md = md.replace(/\| `Label#[^`]+` \| TEXT \|[^\n]+\n/, '');
  } else if (!showRequired) {
    md = md.replace(/\| `Mandatory#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
  }
  if (!showHelper) {
    md = md.replace(/\| `Show Hint#[^`]+` \| BOOLEAN \|[^\n]+\n/, '');
    md = md.replace(/\| `Hint#[^`]+` \| TEXT \|[^\n]+\n/, '');
  }

  // ── 3. Component Structure code block — Label frame lines ──
  if (!showLabel) {
    // Remove entire Label frame tree lines from code block
    md = md.replace(/^[ \t]*│[ \t]*├── Label[ \t]+\[FRAME[^\n]*\n/m, '');
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+No padding[^\n]*\n/m, '');
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+Visible: Show Label[^\n]*\n/m, '');
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+│\n/m, '');
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+├── Label[ \t]+\[TEXT[^\n]*\n/m, '');
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+│[ \t]+Style: Label sm\/Medium\n[ \t]*│[ \t]*│[ \t]+│[ \t]+Font:[^\n]*\n[ \t]*│[ \t]*│[ \t]+│[ \t]+Fill:[ \t]+Component\/Input Field\/input-text-label[^\n]*\n[ \t]*│[ \t]*│[ \t]+│[ \t]+Content: linked to Label[^\n]*\n[ \t]*│[ \t]*│[ \t]+│\n/m, '');
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+└── \*[ \t]+\[TEXT[^\n]*\n[ \t]*│[ \t]*│[ \t]+[ \t]+Style:[^\n]*\n[ \t]*│[ \t]*│[ \t]+[ \t]+Font:[^\n]*\n[ \t]*│[ \t]*│[ \t]+[ \t]+Fill:[ \t]+Component\/Input Field\/input-text-critical[^\n]*\n[ \t]*│[ \t]*│[ \t]+[ \t]+Visible: Mandatory boolean[^\n]*\n[ \t]*│[ \t]*│\n/m, '');
  } else if (!showRequired) {
    // Remove only the asterisk line from the Label frame tree
    md = md.replace(/^[ \t]*│[ \t]*│[ \t]+└── \*[ \t]+\[TEXT[^\n]*\n([ \t]*│[ \t]*│[ \t]+[ \t]+[^\n]*\n)*/m, '');
    // Change ├── Label TEXT to └── (last child now)
    md = md.replace(/(│[ \t]*│[ \t]+)├── (Label[ \t]+\[TEXT)/, '$1└── $2');
  }

  // Remove Hint text layer from code block
  if (!showHelper) {
    md = md.replace(/^[ \t]*└── Hint text[ \t]+\[TEXT[^\n]*\n([ \t]*[ \t]+[^\n]*\n)*/m, '');
    // Also remove the Hint = critical note in State=Error variant line
    md = md.replace(/ · Hint = critical/g, '');
  }

  // ── 4. Variant Structure code block — State=Error hint ref ─
  // Already handled above via · Hint = critical removal

  // ── 5. Per-variant overrides table — Hint text column ──────
  if (!showHelper) {
    md = removeTableColumn(md, '`Hint text` fill override');
  }

  // ── 6. Colors — Per State table — Hint text column ─────────
  if (!showHelper) {
    md = removeTableColumn(md, '`Hint text` Fill');
  }

  // ── 7. State Details table — Hint fill column ──────────────
  if (!showHelper) {
    md = removeTableColumn(md, 'Hint fill');
  }

  // ── 8. Fixed Color Variables table rows ────────────────────
  if (!showLabel) {
    md = md.replace(/\| `Label` text \| `Component\/Input Field\/input-text-label`[^\n]+\n/, '');
    md = md.replace(/\| `\*` asterisk \| `Component\/Input Field\/input-text-critical`[^\n]+\n/, '');
  } else if (!showRequired) {
    md = md.replace(/\| `\*` asterisk \| `Component\/Input Field\/input-text-critical`[^\n]+\n/, '');
  }

  // ── 9. Typography table rows ──────────────────────────────
  if (!showLabel) {
    md = md.replace(/\| `Label` text \|[^\n]+\n/, '');
    md = md.replace(/\| `\*` asterisk \|[^\n]+\n/, '');
  } else if (!showRequired) {
    md = md.replace(/\| `\*` asterisk \|[^\n]+\n/, '');
  }
  if (!showHelper) {
    md = md.replace(/\| `Hint text` \|[^\n]+\n/, '');
  }

  // ── 10. Variable Attachment table rows ─────────────────────
  if (!showLabel) {
    md = md.replace(/\| `Label` text \| Fill[^\n]+\n/, '');
    md = md.replace(/\| `Label` text \| Text Style[^\n]+\n/, '');
    md = md.replace(/\| `\*` asterisk \| Fill[^\n]+\n/, '');
    md = md.replace(/\| `\*` asterisk \| Text Style[^\n]+\n/, '');
  } else if (!showRequired) {
    md = md.replace(/\| `\*` asterisk \| Fill[^\n]+\n/, '');
    md = md.replace(/\| `\*` asterisk \| Text Style[^\n]+\n/, '');
  }
  if (!showHelper) {
    md = md.replace(/\| `Hint text` \| Fill[^\n]+\n/, '');
    md = md.replace(/\| `Hint text` \| Text Style[^\n]+\n/, '');
  }

  // ── 11. Step 3 — Expose Nested Properties list ────────────
  const exposedProps: string[] = [];
  if (showLabel) exposedProps.push('`Show Label`');
  if (showReq)   exposedProps.push('`Mandatory`');
  if (showHelper) exposedProps.push('`Show Hint`');
  if (showLabel) exposedProps.push('`Label`');
  exposedProps.push('`Input`');
  if (showHelper) exposedProps.push('`Hint`');
  md = md.replace(
    /Properties that surface: `Show Label`, `Mandatory`, `Show Hint`, `Label`, `Input`, `Hint`\./,
    `Properties that surface: ${exposedProps.join(', ')}.`,
  );

  // ── 12. Mandatory Rules list items ───────────────────────
  if (!showHelper) {
    md = md.replace(/^- \*\*`Error` state changes two properties:\*\*[^\n]+\n/m, '- **`Error` state** changes Input stroke → `input-border-critical`.\n');
  }
  if (!showLabel) {
    // Remove "No prefix or suffix icon slots" rule keeps — not label-related
    // Nothing label-specific in mandatory rules to remove beyond what markers handled
  }

  // ── 13. Overview paragraph ────────────────────────────────
  if (!showLabel && !showHelper) {
    md = md.replace(/with optional label, mandatory marker, resizable text area, and hint text/, 'with a resizable text area');
  } else if (!showLabel) {
    md = md.replace(/with optional label, mandatory marker, resizable text area, and hint text/, 'with a resizable text area and hint text');
  } else if (!showHelper) {
    md = md.replace(/with optional label, mandatory marker, resizable text area, and hint text/, 'with optional label, mandatory marker, and resizable text area');
  }

  // ── 14. Corner Radius ─────────────────────────────────────
  if (radiusToken !== 'radius-xl') {
    // Structure code block
    md = md.replace(/Radius:  radius-xl \(all 4 corners\)/, `Radius:  ${radiusToken} (all 4 corners)`);
    // Attached Variables Radius table
    md = md.replace(/\| `Input` frame \(all 4 corners\) \| `radius-xl` \| 12px \|/, `| \`Input\` frame (all 4 corners) | \`${radiusToken}\` | ${radiusPx} |`);
    // Construction Step 1
    md = md.replace(/Bind corner radius all 4 → `radius-xl`\./, `Bind corner radius all 4 → \`${radiusToken}\`.`);
    // Variable Attachment table
    md = md.replace(/\| `Input` frame \| Corner radius \(all 4\) \| `radius-xl` \|/, `| \`Input\` frame | Corner radius (all 4) | \`${radiusToken}\` |`);
  }

  // ── 15. Padding ───────────────────────────────────────────
  if (paddingToken !== 'spacing-xl') {
    // Structure code block — padding description
    md = md.replace(/Padding: spacing-xl \(12px\) ALL FOUR SIDES/, `Padding: ${paddingToken} (${paddingPx}) ALL FOUR SIDES`);
    // Spacing table rows (4 sides)
    md = md.replace(/(\| `Input` frame \| Padding (?:Top|Bottom|Left|Right) \| )`spacing-xl` \| 12px \|/g, `$1\`${paddingToken}\` | ${paddingPx} |`);
    // Comparison table cell
    md = md.replace(/\*\*All sides\*\* \(`spacing-xl`\)/, `**All sides** (\`${paddingToken}\`)`);
    // Construction step note
    md = md.replace(/Bind padding \*\*all four sides\*\* → `spacing-xl` \(12px each\)\./, `Bind padding **all four sides** → \`${paddingToken}\` (${paddingPx} each).`);
    md = md.replace(/\*\*All four padding sides get `spacing-xl`\.\*\*/, `**All four padding sides get \`${paddingToken}\`.**`);
    // Arrangement subtitle
    md = md.replace(/All-sides spacing-xl padding/, `All-sides ${paddingToken} padding`);
  }

  // ── 16. Text Size ─────────────────────────────────────────
  if (textStyle !== 'Body sm/Medium') {
    // Structure code block — Text layer
    md = md.replace(/Style: Body sm\/Medium\n([ \t]*│[ \t]*[ \t]+Font:  Inter · Medium 500 · )14px · 18px LH/, `Style: ${textStyle}\n$1${textPx} · ${textLh} LH`);
    // Construction Step 1 — Text layer step
    md = md.replace(/Apply style \*\*`Body sm\/Medium`\*\* — Inter · Medium 500 · 14px · 18px LH\./, `Apply style **\`${textStyle}\`** — Inter · Medium 500 · ${textPx} · ${textLh} LH.`);
    // Typography table row
    md = md.replace(/(\| `Text` \(content\) \| `4:288` \| )`Body sm\/Medium`( \| Inter \| )14px( \| 500 \| )18px( \|)/, `$1\`${textStyle}\`$2${textPx}$3${textLh}$4`);
    // Variable Attachment table
    md = md.replace(/\| `Text` \(content\) \| Text Style \| `Body sm\/Medium` \|/, `| \`Text\` (content) | Text Style | \`${textStyle}\` |`);
    // Arrangement subtitle
    md = md.replace(/Body sm\/Medium content/, `${textStyle} content`);
  }

  // ── 17. Arrangement section — property count ──────────────
  let propCount = 1; // Text Input always present
  if (showLabel) propCount += 2; // Show Label + Label text
  if (showReq)   propCount += 1; // Mandatory
  if (showHelper) propCount += 2; // Show Hint + Hint text
  md = md.replace(/6 Boolean\/Text properties/, `${propCount} Boolean\/Text ${propCount === 1 ? 'property' : 'properties'}`);

  // ── 18. Arrangement ASCII art — Label/Mandatory/Hint line ──
  if (!showLabel) {
    md = md.replace(/Label · Mandatory · /, '');
  } else if (!showReq) {
    md = md.replace(/Mandatory · /, '');
  }
  if (!showHelper) {
    md = md.replace(/Hint · /, '');
  }

  // ── 19. Clean up excess blank lines ────────────────────────
  md = md.replace(/\n{3,}/g, '\n\n').trim();

  return md + '\n';
}

/* ── Page ───────────────────────────────────────────────── */
export default function TextAreaPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={textAreaMd}
      markdownFileName="textarea"
      figmaMarkdownContent={textAreaFigmaMd}
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
      transformFigmaMarkdown={transformFigmaMarkdown}
    />
  );
}
