import React from 'react';

export type InputType = 'text' | 'number' | 'color' | 'select' | 'toggle';

export interface SelectOption {
  value: string;
  label: string;
}

export interface InputConfig {
  key: string;
  label: string;
  type: InputType;
  options?: SelectOption[];
  min?: number;
  max?: number;
  step?: number;
}

export type InputValues = Record<string, string | boolean | number>;

interface InputPanelProps {
  config: InputConfig[];
  values: InputValues;
  onChange: (key: string, value: string | boolean | number) => void;
  onReset: () => void;
  onUpdateMd?: () => void;
}

export default function InputPanel({
  config,
  values,
  onChange,
  onReset,
  onUpdateMd,
}: InputPanelProps) {
  return (
    <div className="cp-input-panel">
      <div className="cp-ip-header">Customise</div>

      <div className="cp-ip-body">
        {config.map(field => (
          <div key={field.key} className="cp-field">
            <label className="cp-field-lbl">{field.label}</label>
            <Field field={field} value={values[field.key]} onChange={v => onChange(field.key, v)} />
          </div>
        ))}
      </div>

      <div className="cp-ip-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
        <button className="cp-btn cp-btn-ghost" onClick={onReset}>
          Reset
        </button>
        {onUpdateMd && (
          <button className="cp-btn cp-btn-primary" onClick={onUpdateMd}>
            Update MD File
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  field,
  value,
  onChange,
}: {
  field: InputConfig;
  value: string | boolean | number;
  onChange: (v: string | boolean | number) => void;
}) {
  switch (field.type) {
    case 'text':
      return (
        <input
          type="text"
          value={value as string}
          onChange={e => onChange(e.target.value)}
        />
      );

    case 'number':
      return (
        <input
          type="number"
          value={value as number}
          min={field.min}
          max={field.max}
          step={field.step ?? 1}
          onChange={e => onChange(Number(e.target.value))}
        />
      );

    case 'color':
      return (
        <input
          type="color"
          value={value as string}
          onChange={e => onChange(e.target.value)}
        />
      );

    case 'select':
      return (
        <select
          value={value as string}
          onChange={e => onChange(e.target.value)}
        >
          {field.options?.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      );

    case 'toggle':
      return (
        <div className="cp-toggle-wrap">
          <label className="cp-toggle">
            <input
              type="checkbox"
              checked={value as boolean}
              onChange={e => onChange(e.target.checked)}
            />
            <span className="cp-toggle-track" />
            <span className="cp-toggle-thumb" />
          </label>
          <span className="cp-toggle-lbl">{value ? 'On' : 'Off'}</span>
        </div>
      );
  }
}
