import React from 'react';
import { FilePicker } from '../../../components/ui/main_components/FilePicker';
import { DocumentTile } from '../../../components/ui/main_components/DocumentTile';
import { FileTypeIcon, type FileTypeVariant } from '../../../components/ui/main_components/FileTypeIcon';
import ComponentPageLayout, {
  type InputConfig,
  type InputValues,
  type VariantGroup,
} from '../ComponentPageLayout';
import filePickerMd from '../md_files/filePicker-instruction.md?raw';

/* ── Radius map ─────────────────────────────────────────── */
const RADIUS_MAP: Record<string, string> = {
  '4px':  'rounded',
  '8px':  'rounded-lg',
  '12px': 'rounded-xl',
  '16px': 'rounded-2xl',
};

/* ── Input config ───────────────────────────────────────── */
const INPUT_CONFIG: InputConfig[] = [
  { key: 'div0', label: 'Appearance', type: 'divider' },
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
  { key: 'div1', label: 'Options', type: 'divider' },
  {
    key: 'showDate',
    label: 'Show Date',
    type: 'toggle',
  },
  {
    key: 'acceptedTypes',
    label: 'Accepted File Types',
    type: 'text',
  },
];

const DEFAULT_VALUES: InputValues = {
  cornerRadius:  '12px',
  showDate:      true,
  acceptedTypes: 'PDF, DOC, XLS or PPT',
};

/* ── buildVariants ──────────────────────────────────────── */
function buildVariants(vals: InputValues): VariantGroup[] {
  const showDate      = vals.showDate      as boolean;
  const acceptedTypes = (vals.acceptedTypes as string) || 'PDF, DOC, XLS or PPT';
  const radiusCls     = RADIUS_MAP[vals.cornerRadius as string] ?? 'rounded-xl';

  const FILE_TYPES: FileTypeVariant[] = ['pdf', 'doc', 'csv', 'img', 'jpg', 'png'];

  return [
    /* ── FilePicker ─────────────────────────────────────── */
    {
      id: 'file-picker',
      label: 'File Picker',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'states',
          label: '',
          accentColor: '#0056b8',
          rows: [
            {
              cells: [
                {
                  label: 'Enabled',
                  node: (
                    <div className="w-[280px]">
                      <FilePicker state="enabled" acceptedTypes={acceptedTypes} className={radiusCls} />
                    </div>
                  ),
                },
                {
                  label: 'Drag File',
                  node: (
                    <div className="w-[280px]">
                      <FilePicker state="drag-file" acceptedTypes={acceptedTypes} className={radiusCls} />
                    </div>
                  ),
                },
                {
                  label: 'Disabled',
                  node: (
                    <div className="w-[280px]">
                      <FilePicker state="disabled" acceptedTypes={acceptedTypes} className={radiusCls} />
                    </div>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },

    /* ── DocumentTile ───────────────────────────────────── */
    {
      id: 'document-tile',
      label: 'Document Tile',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'tile-states',
          label: '',
          accentColor: '#7839ee',
          rows: [
            {
              cells: [
                {
                  label: 'View',
                  node: (
                    <div className="w-[340px]">
                      <DocumentTile
                        state="view"
                        fileName="Document_2024.pdf"
                        fileSize="2.4 MB"
                        fileType="pdf"
                        uploadDate="Jan 12, 2024"
                        showDate={showDate}
                        onView={() => {}}
                        onDownload={() => {}}
                      />
                    </div>
                  ),
                },
                {
                  label: 'Uploaded',
                  node: (
                    <div className="w-[340px]">
                      <DocumentTile
                        state="uploaded"
                        fileName="Spreadsheet.xlsx"
                        fileSize="1.8 MB"
                        fileType="csv"
                        uploadDate="Jan 12, 2024"
                        showDate={showDate}
                        onView={() => {}}
                        onDelete={() => {}}
                      />
                    </div>
                  ),
                },
                {
                  label: 'Uploading',
                  node: (
                    <div className="w-[340px]">
                      <DocumentTile
                        state="uploading"
                        fileName="Presentation.pptx"
                        fileSize="5.1 MB"
                        fileType="doc"
                        progress={64}
                        showDate={showDate}
                        onDelete={() => {}}
                      />
                    </div>
                  ),
                },
              ],
            },
          ],
        },
      ],
    },

    /* ── FileTypeIcon ───────────────────────────────────── */
    {
      id: 'file-type-icon',
      label: 'File Type Icons',
      dotColor: '',
      hideDivider: true,
      styles: [
        {
          id: 'icon-variants',
          label: '',
          accentColor: '#16a34a',
          rows: [
            {
              cells: FILE_TYPES.map(ft => ({
                label: ft.toUpperCase(),
                node: <FileTypeIcon key={ft} fileType={ft} />,
              })),
            },
          ],
        },
      ],
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

  const cornerRadius  = vals.cornerRadius  as string;
  const showDate      = vals.showDate      as boolean;
  const acceptedTypes = (vals.acceptedTypes as string).trim() || 'PDF, DOC, XLS or PPT';

  const radiusCls = RADIUS_MAP[cornerRadius] ?? 'rounded-xl';

  /* ── 1. Corner Radius ────────────────────────────────── */

  /* Part A — FilePicker CVA base classes block */
  md = md.replace(
    /(```\nflex flex-col items-center p-3 )(rounded-\S+)(\nbg-bg-white w-full\n```)/,
    (_, pre, _old, post) => `${pre}${radiusCls}${post}`,
  );

  /* Part A — annotation comment below base classes */
  md = md.replace(
    /(> `p-3` = 12px · `)(rounded-\S+)(` = \d+px)/,
    (_, pre, _old, post) => `${pre}${radiusCls}${post}`,
  );

  /* Part B — DocumentTile Container classes */
  md = md.replace(
    /(```\nflex gap-3 p-3 )(rounded-\S+)( w-full\nbg-bg-white border border-border-gray-light\n```)/,
    (_, pre, _old, post) => `${pre}${radiusCls}${post}`,
  );

  /* Part B — DocumentTile Container annotation */
  md = md.replace(
    /(> `gap-3` = 12px · `p-3` = 12px · `)(rounded-\S+)(` = \d+px)/,
    (_, pre, _old, post) => `${pre}${radiusCls}${post}`,
  );

  /* Part B — View State "View" button */
  md = md.replace(
    /(h-9 px-4 py-2\.5 )(rounded-\S+)(\nbg-btn-bg-bordered border border-btn-border-primary)/,
    (_, pre, _old, post) => `${pre}${radiusCls}${post}`,
  );

  /* Part B — View State Download button */
  md = md.replace(
    /(h-9 p-2\.5 )(rounded-\S+)(\nbg-btn-bg-bordered border border-border-gray-light)/,
    (_, pre, _old, post) => `${pre}${radiusCls}${post}`,
  );

  /* ── 2. Show Date ────────────────────────────────────── */

  /* Props table default value */
  md = md.replace(
    /(\| `showDate` \| `boolean` \| )`(true|false)`( \|)/,
    (_, pre, _old, post) => `${pre}\`${showDate ? 'true' : 'false'}\`${post}`,
  );

  if (!showDate) {
    /* Separator dot note */
    md = md.replace(
      /- `size-1` \(4×4px\)[^\n]*/,
      "- `size-1` (4×4px) · `flex-shrink-0` · Always removed from DOM — `showDate` is false by default.",
    );

    /* Upload date note */
    md = md.replace(
      /Remove from DOM entirely when `showDate=\{false\}` or `uploadDate` is not provided\./,
      "Always removed from DOM — `showDate` is false by default.",
    );
  }

  /* ── 3. Accepted File Types ──────────────────────────── */

  /* Props table default value */
  md = md.replace(
    /(\| `acceptedTypes` \| `string` \| `)'PDF, DOC, XLS or PPT'(`)/,
    (_, pre, post) => `${pre}'${acceptedTypes}'${post}`,
  );

  /* Format hint content description */
  md = md.replace(
    /Content: `"[^(]+ \(max\. \{maxSize\}\)"` — dynamic from props\./,
    `Content: \`"${acceptedTypes} (max. {maxSize})"\` — dynamic from props.`,
  );

  return md;
}

/* ── Page ───────────────────────────────────────────────── */
export default function FilePickerPage() {
  return (
    <ComponentPageLayout
      inputConfig={INPUT_CONFIG}
      defaultInputValues={DEFAULT_VALUES}
      buildVariants={buildVariants}
      variantTitle="Variants"
      markdownContent={filePickerMd}
      markdownFileName="filePicker"
      resolveTokens={resolveTokens}
      transformMarkdown={transformMarkdown}
    />
  );
}
