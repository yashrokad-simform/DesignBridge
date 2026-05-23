import React from 'react';

export type InputType = 'text' | 'number' | 'color' | 'select' | 'toggle' | 'multicheck' | 'togglegroup' | 'togglelist' | 'divider';

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
        {config.map(field => {
          if (field.type === 'divider') {
            return (
              <div key={field.key} className="cp-field-divider">
                {field.label && <span className="cp-field-divider-label">{field.label}</span>}
              </div>
            );
          }
          return (
            <div key={field.key} className="cp-field">
              <label className="cp-field-lbl">{field.label}</label>
              <Field field={field} value={values[field.key]} onChange={v => onChange(field.key, v)} />
            </div>
          );
        })}
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
          className="cp-field-number-full"
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

    case 'togglelist': {
      const selected = (value as string ?? '').split(',').filter(Boolean);
      return (
        <div className="cp-togglelist">
          {field.options?.map(opt => {
            const active = selected.includes(opt.value);
            return (
              <div key={opt.value} className="cp-togglelist-row">
                <span className="cp-togglelist-lbl">{opt.label}</span>
                <div className="cp-toggle-wrap">
                  <label className="cp-toggle">
                    <input
                      type="checkbox"
                      checked={active}
                      onChange={e => {
                        const next = e.target.checked
                          ? [...selected, opt.value]
                          : selected.filter(v => v !== opt.value);
                        onChange(next.join(','));
                      }}
                    />
                    <span className="cp-toggle-track" />
                    <span className="cp-toggle-thumb" />
                  </label>
                  <span className="cp-toggle-lbl">{active ? 'On' : 'Off'}</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    }

    case 'multicheck': {
      const selected = (value as string ?? '').split(',').filter(Boolean);
      return (
        <div className="cp-multicheck">
          {field.options?.map(opt => (
            <label key={opt.value} className="cp-multicheck-item">
              <input
                type="checkbox"
                checked={selected.includes(opt.value)}
                onChange={e => {
                  const next = e.target.checked
                    ? [...selected, opt.value]
                    : selected.filter(v => v !== opt.value);
                  onChange(next.join(','));
                }}
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      );
    }

    case 'togglegroup': {
      const selected = (value as string ?? '').split(',').filter(Boolean);
      return (
        <div className="cp-togglegroup">
          {field.options?.map(opt => {
            const active = selected.includes(opt.value);
            return (
              <button
                key={opt.value}
                type="button"
                className={`cp-togglegroup-btn${active ? ' cp-togglegroup-btn--active' : ''}`}
                onClick={() => {
                  const next = active
                    ? selected.filter(v => v !== opt.value)
                    : [...selected, opt.value];
                  onChange(next.join(','));
                }}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      );
    }

    case 'divider':
      return null;
  }
}
