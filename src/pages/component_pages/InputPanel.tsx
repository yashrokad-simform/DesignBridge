import React from 'react';

export type InputType = 'text' | 'number' | 'color' | 'colorhex' | 'select' | 'toggle' | 'multicheck' | 'togglegroup' | 'togglelist' | 'divider' | 'colorswatches' | 'tokencontrol';

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
  colors?: string[];
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
          if (field.type === 'tokencontrol') {
            return (
              <div key={field.key} className="cp-field">
                <Field field={field} value={values[field.key]} onChange={v => onChange(field.key, v)} />
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
          Reset Component
        </button>
        {onUpdateMd && (
          <button className="cp-btn cp-btn-primary" onClick={onUpdateMd}>
            Update Instruction
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
          value={(value as string) ?? ''}
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

    case 'colorhex': {
      const v = (value as string) ?? '';
      const validHex = /^#[0-9a-fA-F]{6}$/.test(v);
      const handleText = (next: string) => {
        // Allow incremental typing of a hex (up to # + 6 hex digits)
        if (next === '' || /^#?[0-9a-fA-F]{0,6}$/.test(next)) {
          onChange(next.startsWith('#') || next === '' ? next : `#${next}`);
        }
      };
      return (
        <div className="cp-colorhex">
          <input
            type="color"
            value={validHex ? v.toLowerCase() : '#000000'}
            onChange={e => onChange(e.target.value)}
            className="cp-colorhex-picker"
            aria-label={`${field.label} picker`}
          />
          <input
            type="text"
            value={v}
            onChange={e => handleText(e.target.value)}
            className="cp-colorhex-text"
            spellCheck={false}
            aria-label={`${field.label} hex`}
          />
        </div>
      );
    }

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
                <label className="cp-toggle">
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={e => {
                      const allValues = field.options?.map(o => o.value) ?? [];
                      const next = e.target.checked
                        ? allValues.filter(v => selected.includes(v) || v === opt.value)
                        : selected.filter(v => v !== opt.value);
                      onChange(next.join(','));
                    }}
                  />
                  <span className="cp-toggle-track" />
                  <span className="cp-toggle-thumb" />
                </label>
                <span className="cp-togglelist-lbl">{opt.label}</span>
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

    case 'colorswatches': {
      const selected = value as string;
      return (
        <div className="cp-colorswatches">
          {field.colors?.map(color => (
            <button
              key={color}
              type="button"
              className={`cp-colorswatch${selected === color ? ' cp-colorswatch--active' : ''}`}
              style={{ backgroundColor: color }}
              onClick={() => onChange(color)}
              aria-label={color}
            />
          ))}
        </div>
      );
    }

    case 'tokencontrol': {
      const s = String(value ?? 'true:0');
      const colon = s.indexOf(':');
      const enabled = colon === -1 ? true : s.slice(0, colon) !== 'false';
      const numVal = colon === -1 ? Number(s) : Number(s.slice(colon + 1));
      const update = (e: boolean, v: number) => onChange(`${e}:${v}`);
      return (
        <div className="cp-tokenctrl">
          <div className="cp-tokenctrl-row">
            <label className="cp-toggle">
              <input
                type="checkbox"
                checked={enabled}
                onChange={ev => update(ev.target.checked, numVal)}
              />
              <span className="cp-toggle-track" />
              <span className="cp-toggle-thumb" />
            </label>
            <span className={`cp-tokenctrl-name${!enabled ? ' cp-tokenctrl-name--off' : ''}`}>
              {field.label}
            </span>
          </div>
          {enabled && (
            <input
              className="cp-tokenctrl-input"
              type="number"
              value={numVal}
              min={field.min}
              max={field.max}
              step={field.step ?? 1}
              onChange={ev => update(enabled, Number(ev.target.value))}
            />
          )}
        </div>
      );
    }

    case 'divider':
      return null;
  }
}
