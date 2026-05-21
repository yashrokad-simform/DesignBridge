export interface NavSectionItem {
  id: string;
  label: string;
}

export interface NavSection {
  label: string;
  items: NavSectionItem[];
}

export interface PageInfoEntry {
  eyebrow: string;
  title: string;
  desc: string;
}

export const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Documentation',
    items: [
      { id: 'introduction', label: 'Introduction' },
      { id: 'figma-mcp', label: 'Figma MCP Basics' },
    ],
  },
  {
    label: 'Style Guide',
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing & Radius' },
    ],
  },
  {
    label: 'Components',
    items: [
      { id: 'badge', label: 'Badge' },
      { id: 'breadcrumb', label: 'Breadcrumb' },
      { id: 'button', label: 'Button' },
      { id: 'checkbox', label: 'Checkbox' },
      { id: 'dropdown', label: 'Dropdown' },
      { id: 'file-picker', label: 'File Picker' },
      { id: 'input', label: 'Input' },
      { id: 'navigation', label: 'Navigation' },
      { id: 'progress-step', label: 'Progress Step' },
      { id: 'radio-button', label: 'Radio Button' },
      { id: 'rich-text-editor', label: 'Rich Text Editor' },
      { id: 'tabs', label: 'Tabs' },
      { id: 'text-area', label: 'Text Area' },
      { id: 'toast', label: 'Toast' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
];

export const PAGE_INFO: Record<string, PageInfoEntry> = {
  introduction:    { eyebrow: 'Documentation', title: 'Introduction',     desc: 'DS Storybook is a Storybook-style documentation system built around Figma components and their Markdown specification files. It bridges the gap between design intent and code implementation for both designers and front-end developers.' },
  'figma-mcp':     { eyebrow: 'Documentation', title: 'Figma MCP Basics', desc: '' },
  colors:          { eyebrow: 'Style Guide',   title: 'Colors',           desc: '' },
  typography:      { eyebrow: 'Style Guide',   title: 'Typography',       desc: '' },
  spacing:         { eyebrow: 'Style Guide',   title: 'Spacing & Radius', desc: '' },
  badge:           { eyebrow: 'Components',    title: 'Badge',            desc: 'Badges are small, visible elements used to draw attention to important information, such as new notifications, unread messages, or updates.' },
  breadcrumb:      { eyebrow: 'Components',    title: 'Breadcrumb',       desc: '' },
  button:          { eyebrow: 'Components',    title: 'Button',           desc: '' },
  checkbox:        { eyebrow: 'Components',    title: 'Checkbox',         desc: '' },
  dropdown:        { eyebrow: 'Components',    title: 'Dropdown',         desc: '' },
  'file-picker':   { eyebrow: 'Components',    title: 'File Picker',      desc: '' },
  input:           { eyebrow: 'Components',    title: 'Input',            desc: '' },
  navigation:      { eyebrow: 'Components',    title: 'Navigation',       desc: '' },
  'progress-step': { eyebrow: 'Components',    title: 'Progress Step',    desc: '' },
  'radio-button':  { eyebrow: 'Components',    title: 'Radio Button',     desc: '' },
  'rich-text-editor': { eyebrow: 'Components', title: 'Rich Text Editor',  desc: '' },
  tabs:            { eyebrow: 'Components',    title: 'Tabs',             desc: '' },
  'text-area':     { eyebrow: 'Components',    title: 'Text Area',        desc: '' },
  toast:           { eyebrow: 'Components',    title: 'Toast',            desc: '' },
  toggle:          { eyebrow: 'Components',    title: 'Toggle',           desc: '' },
  tooltip:         { eyebrow: 'Components',    title: 'Tooltip',          desc: '' },
};
