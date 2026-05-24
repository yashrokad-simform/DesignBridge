import React, { useState } from 'react';
import './component_pages.css';
import { Dropdown, type DropdownOption } from '../../components/ui/Dropdown';
import VariantSection from './VariantSection';

const FRUITS: DropdownOption[] = [
  { value: 'apple',      label: 'Apple' },
  { value: 'banana',     label: 'Banana' },
  { value: 'cherry',     label: 'Cherry' },
  { value: 'date',       label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig',        label: 'Fig' },
];

const W = 'w-[300px]';

function SingleDemo({ helperText, errorText, disabled, defaultOpen }: {
  helperText?: string; errorText?: string; disabled?: boolean; defaultOpen?: boolean;
}) {
  const [value, setValue] = useState<string | string[]>('');
  return (
    <div className={W}>
      <Dropdown
        label="Label"
        required
        placeholder="Select"
        options={FRUITS}
        value={value as string}
        onChange={setValue}
        helperText={helperText}
        errorText={errorText}
        disabled={disabled}
        defaultOpen={defaultOpen}
      />
    </div>
  );
}

function SearchableDemo() {
  const [value, setValue] = useState<string | string[]>('');
  return (
    <div className={W}>
      <Dropdown
        label="Label"
        required
        placeholder="Select"
        options={FRUITS}
        value={value as string}
        onChange={setValue}
        searchable
        helperText="This is a hint text to help user."
        defaultOpen
      />
    </div>
  );
}

function MultiDemo() {
  const [value, setValue] = useState<string | string[]>(['apple']);
  return (
    <div className={W}>
      <Dropdown
        label="Label"
        required
        placeholder="Select"
        options={FRUITS}
        value={value}
        onChange={setValue}
        multiple
        helperText="This is a hint text to help user."
      />
    </div>
  );
}

const HELPER = 'This is a hint text to help user.';

const groups = [
  {
    id: 'states',
    label: '',
    dotColor: '',
    hideDivider: true,
    noGroupDivider: true,
    styles: [
      {
        id: 'all',
        label: '',
        accentColor: '',
        rows: [
          {
            cells: [
              { label: 'Default',  node: <SingleDemo helperText={HELPER} /> },
              { label: 'Open',     node: <SingleDemo helperText={HELPER} defaultOpen /> },
            ],
          },
          {
            cells: [
              { label: 'Error',    node: <SingleDemo errorText={HELPER} /> },
              { label: 'Multi Select', node: <MultiDemo /> },
            ],
          },
          {
            cells: [
              { label: 'Disabled',   node: <SingleDemo helperText={HELPER} disabled /> },
              { label: 'Searchable', node: <SearchableDemo /> },
            ],
          },
        ],
      },
    ],
  },
];

export default function DropdownPage() {
  return (
    <div className="cp-page">
      <div className="cp-bottom-panel">
        <div className="cp-panel-hd">
          <span className="cp-panel-title">Component Details</span>
        </div>
        <div className="cp-bottom-body">
          <div style={{ flex: '1', overflowY: 'auto', overflowX: 'hidden', padding: 0, background: '#fff' }}>
            <VariantSection title="Variants" groups={groups} />
          </div>
        </div>
      </div>
    </div>
  );
}
