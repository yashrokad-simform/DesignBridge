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
    ],
  },
  {
    label: 'Style Guide',
    items: [
      { id: 'colors', label: 'Colors' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing-radius', label: 'Spacing & Radius' },
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
      { id: 'table', label: 'Table' },
      { id: 'text-area', label: 'Text Area' },
      { id: 'toast', label: 'Toast' },
      { id: 'toggle', label: 'Toggle' },
      { id: 'tooltip', label: 'Tooltip' },
    ],
  },
];

export const PAGE_INFO: Record<string, PageInfoEntry> = {
  introduction:    { eyebrow: 'Documentation', title: 'Introduction',     desc: 'DS Storybook is a Storybook-style documentation system built around Figma components and their Markdown specification files. It bridges the gap between design intent and code implementation for both designers and front-end developers.' },
  colors:          { eyebrow: 'Style Guide',   title: 'Colors',           desc: 'Our design system provides a curated set of color styles for consistency, readability, and accessibility. Figma color variables help manage reusable color values and simplify design updates across systems.' },
  typography:      { eyebrow: 'Style Guide',   title: 'Typography',       desc: 'Our design system includes a curated set of typographic styles designed for consistency, versatility, and accessibility across different projects and use cases.' },
  'spacing-radius': { eyebrow: 'Style Guide',   title: 'Spacing & Radius', desc: 'Our design system defines a consistent spacing and border-radius scale to ensure visual harmony, alignment, and rhythm across all components and layouts.' },
  badge:           { eyebrow: 'Components',    title: 'Badge',            desc: 'Badges are small visual elements used to highlight important information, such as notifications, updates, or status indicators, helping users quickly notice key details.' },
  breadcrumb:      { eyebrow: 'Components',    title: 'Breadcrumb',       desc: 'Breadcrumbs are navigation elements that show a user’s current location within a website or app, helping them understand their path and easily move back to previous pages or sections.' },
  button:          { eyebrow: 'Components',    title: 'Button',           desc: 'Buttons are interactive elements that guide users through actions in an interface, helping them navigate, submit forms, confirm choices, and complete tasks efficiently.' },
  checkbox:        { eyebrow: 'Components',    title: 'Checkbox',         desc: 'Checkboxes allow users to select one or multiple options from a list, while radio buttons limit selection to a single choice within a group. They also help users toggle options on or off.' },
  dropdown:        { eyebrow: 'Components',    title: 'Dropdown',         desc: 'Dropdowns organize related actions into a compact menu, helping keep the interface clean and reducing clutter when multiple options would take up too much space.' },
  'file-picker':   { eyebrow: 'Components',    title: 'File Picker',      desc: 'File components are UI elements used to upload, display, and manage files, helping users handle file-related tasks efficiently with a clear and organized experience.' },
  input:           { eyebrow: 'Components',    title: 'Input',            desc: 'Input fields allow users to enter text in forms and interfaces, helping capture information while ensuring a smooth and user-friendly experience.' },
  navigation:      { eyebrow: 'Components',    title: 'Navigation',       desc: 'Navigation helps users move through different sections or pages of a website or app, making it easier to find and access content efficiently.' },
  'progress-step': { eyebrow: 'Components',    title: 'Progress Step',    desc: 'Progress steps help users understand their position in a multi-step process, making workflows like forms or checkouts easier to follow and complete.' },
  'radio-button':  { eyebrow: 'Components',    title: 'Radio Button',     desc: 'Radio buttons allow users to select a single option from a group of choices, providing a simple and clear way to make one selection.' },
  'rich-text-editor': { eyebrow: 'Components', title: 'Rich Text Editor',  desc: 'Rich text editors allow users to format and edit text with various styles, making it easy to create and modify content within an interface.' },
  tabs:            { eyebrow: 'Components',    title: 'Tabs',             desc: 'Tabs are navigation elements that allow users to switch between different sections of content within the same page or view.' },
  table:           { eyebrow: 'Components',    title: 'Table',            desc: 'Tables display structured data in rows and columns, supporting sorting, pagination, and various cell types to help users scan and interact with information efficiently.' },
  'text-area':     { eyebrow: 'Components',    title: 'Text Area',        desc: 'Text area fields allow users to enter multiple lines of text, making them useful for longer responses or detailed information in forms and interfaces.' },
  toast:           { eyebrow: 'Components',    title: 'Toast',            desc: 'Toasts are temporary notifications that appear on screen to provide feedback or information to the user without interrupting their workflow.' },
  toggle:          { eyebrow: 'Components',    title: 'Toggle',           desc: 'Toggles are switch-like controls that allow users to turn features on or off, providing a simple way to enable or disable options.' },
  tooltip:         { eyebrow: 'Components',    title: 'Tooltip',          desc: 'Tooltips are small pop-up messages that appear when a user hovers over an element, providing additional information or context about that element.' },
};
