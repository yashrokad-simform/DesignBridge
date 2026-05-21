import { Badge, type BadgeColor, type BadgeVariant } from '../../components/ui/Badge';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from './ComponentPageLayout';
import badgeMd from './md_files/Badge-instruction.md?raw';

const INPUT_CONFIG: InputConfig[] = [
  { key: 'label',      label: 'Label',   type: 'text' },
  {
    key: 'variant', label: 'Variant', type: 'select',
    options: [
      { value: 'filled',   label: 'Filled' },
      { value: 'bordered', label: 'Bordered' },
      { value: 'tertiary', label: 'Tertiary' },
    ],
  },
  {
    key: 'color', label: 'Color', type: 'select',
    options: [
      'primary','secondary','success','warning','critical',
      'gray','black','cyan','indigo','purple','fuchsia','rose','teal',
    ].map(c => ({ value: c, label: cap(c) })),
  },
  { key: 'showPrefix', label: 'Prefix dot',   type: 'toggle' },
  { key: 'showSuffix', label: 'Suffix icon',  type: 'toggle' },
];

const DEFAULT_VALUES: InputValues = {
  label:      'Badge',
  variant:    'filled',
  color:      'primary',
  showPrefix: false,
  showSuffix: false,
};

/* ── buildVariants ──────────────────────────────────────── */
const SEMANTIC: BadgeColor[] = ['primary','secondary','success','warning','critical','gray','black'];
const EXTENDED: BadgeColor[] = ['cyan','indigo','purple','fuchsia','rose','teal'];

function buildVariants(vals: InputValues): VariantGroup[] {
  const lbl        = vals.label      as string;
  const showPrefix = vals.showPrefix as boolean;
  const showSuffix = vals.showSuffix as boolean;

  function makeStyle(
    variant: BadgeVariant,
    colors: BadgeColor[],
    label: string,
    accent: string,
  ) {
    return {
      id: label,
      label,
      accentColor: accent,
      rows: [{
        cells: colors.map(c => ({
          label: cap(c),
          node: (
            <Badge
              key={c}
              variant={variant}
              color={c}
              label={lbl}
              showPrefix={showPrefix}
              showSuffix={showSuffix}
            />
          ),
        })),
      }],
    };
  }

  const groups: VariantGroup[] = (['filled', 'bordered', 'tertiary'] as BadgeVariant[]).map(v => ({
    id: v,
    label: cap(v),
    dotColor: v === 'filled' ? '#0056b8' : v === 'bordered' ? '#89919d' : '#051325',
    styles: [
      makeStyle(v, SEMANTIC, 'Semantic', '#0056b8'),
      makeStyle(v, EXTENDED, 'Extended', '#7839ee'),
    ],
  }));

  return groups;
}

/* ── resolveTokens ──────────────────────────────────────── */
function resolveTokens(vals: InputValues): Record<string, string> {
  const variant = vals.variant as string;
  const color   = vals.color   as string;

  return {
    label:       vals.label as string,
    variant,
    color,
    showPrefix:  String(vals.showPrefix),
    showSuffix:  String(vals.showSuffix),
  };
}

/* ── Page ───────────────────────────────────────────────── */
export default function BadgePage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={badgeMd}
      markdownFileName="badge"
      resolveTokens={resolveTokens}
    />
  );
}

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}
