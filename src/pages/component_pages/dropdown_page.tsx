import React, { useState } from 'react';
import './component_pages.css';
import { Dropdown, type DropdownOption } from '../../components/ui/Dropdown';
import { ArrowRightIcon } from '../../assets/icons/ArrowRightIcon';
import VariantSection from './VariantSection';

const FRUITS: DropdownOption[] = [
  { value: 'apple',  label: 'Apple' },
  { value: 'banana', label: 'Banana' },
  { value: 'cherry', label: 'Cherry' },
  { value: 'date',   label: 'Date' },
  { value: 'elderberry', label: 'Elderberry' },
  { value: 'fig',    label: 'Fig' },
];

function SingleDemo({ label, helperText, errorText, disabled, leadingIcon, placeholder }: {
  label?: string; helperText?: string; errorText?: string;
  disabled?: boolean; leadingIcon?: React.ReactNode; placeholder?: string;
}) {
  const [value, setValue] = useState<string | string[]>('');
  return (
    <div className="w-[220px]">
      <Dropdown
        label={label}
        placeholder={placeholder ?? 'Select'}
        options={FRUITS}
        value={value as string}
        onChange={setValue}
        helperText={helperText}
        errorText={errorText}
        disabled={disabled}
        leadingIcon={leadingIcon}
      />
    </div>
  );
}

function MultiDemo({ label, searchable }: { label?: string; searchable?: boolean }) {
  const [value, setValue] = useState<string | string[]>([]);
  return (
    <div className="w-[220px]">
      <Dropdown
        label={label}
        placeholder="Select options"
        options={FRUITS}
        value={value}
        onChange={setValue}
        multiple
        searchable={searchable}
      />
    </div>
  );
}

function SearchableDemo() {
  const [value, setValue] = useState<string | string[]>('');
  return (
    <div className="w-[220px]">
      <Dropdown
        label="Searchable"
        placeholder="Select"
        options={FRUITS}
        value={value as string}
        onChange={setValue}
        searchable
      />
    </div>
  );
}

const groups = [
  {
    id: 'single',
    label: 'Single Select',
    dotColor: '#0056b8',
    styles: [
      {
        id: 'states',
        label: 'States',
        accentColor: '#0056b8',
        rows: [{
          cells: [
            { label: 'Default',      node: <SingleDemo /> },
            { label: 'With Label',   node: <SingleDemo label="Fruit" helperText="Pick one" /> },
            { label: 'Leading Icon', node: <SingleDemo label="Fruit" leadingIcon={<ArrowRightIcon aria-hidden="true" className="size-4" />} /> },
            { label: 'Error',        node: <SingleDemo label="Fruit" errorText="Required field" /> },
            { label: 'Disabled',     node: <SingleDemo label="Fruit" disabled /> },
          ],
        }],
      },
    ],
  },
  {
    id: 'multi',
    label: 'Multi Select',
    dotColor: '#7839ee',
    styles: [
      {
        id: 'states',
        label: 'States',
        accentColor: '#7839ee',
        rows: [{
          cells: [
            { label: 'Default',    node: <MultiDemo label="Fruits" /> },
            { label: 'Searchable', node: <MultiDemo label="Fruits" searchable /> },
            { label: 'Disabled',   node: (
              <div className="w-[220px]">
                <Dropdown label="Fruits" placeholder="Select options" options={FRUITS} value={[]} onChange={() => {}} multiple disabled />
              </div>
            )},
          ],
        }],
      },
    ],
  },
  {
    id: 'searchable',
    label: 'Searchable',
    dotColor: '#036821',
    styles: [
      {
        id: 'single',
        label: 'Single',
        accentColor: '#036821',
        rows: [{
          cells: [
            { label: 'Searchable', node: <SearchableDemo /> },
          ],
        }],
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
