import React from 'react';

export interface VariantCell {
  label?: string;
  node: React.ReactNode;
}

export interface VariantRow {
  rowLabel?: string;
  cells: VariantCell[];
}

export interface VariantStyleGroup {
  id: string;
  label: string;
  accentColor: string;
  colHeaders?: string[];
  rows: VariantRow[];
}

export interface VariantGroup {
  id: string;
  label: string;
  dotColor: string;
  styles: VariantStyleGroup[];
}

interface VariantSectionProps {
  title?: string;
  groups: VariantGroup[];
}

export default function VariantSection({ title = 'Variants', groups }: VariantSectionProps) {
  return (
    <div className="cp-variant-outer">
      <div className="cp-variant-hd">{title}</div>
      <div className="cp-variant-bd">
        {groups.map(group => (
          <div key={group.id} className="cp-vg">
            <div className="cp-vg-header">
              <span className="cp-vg-dot" style={{ background: group.dotColor }} />
              <span className="cp-vg-lbl">{group.label}</span>
            </div>

            {group.styles.map(style => (
              <div key={style.id} className="cp-vs">
                <div className="cp-vs-header">
                  <span className="cp-vs-accent" style={{ background: style.accentColor }} />
                  <span className="cp-vs-lbl">{style.label}</span>
                </div>

                {style.colHeaders && style.colHeaders.length > 0 && (
                  <div className="cp-col-hdrs">
                    {style.colHeaders.map(h => (
                      <span key={h} className="cp-col-hdr">{h}</span>
                    ))}
                  </div>
                )}

                {style.rows.map((row, ri) => (
                  <div key={ri} className="cp-vrow">
                    {row.rowLabel && (
                      <span className="cp-vrow-lbl">{row.rowLabel}</span>
                    )}
                    <div className="cp-vcells">
                      {row.cells.map((cell, ci) => (
                        <div key={ci} className="cp-vcell">
                          {cell.label && (
                            <span className="cp-vcell-lbl">{cell.label}</span>
                          )}
                          {cell.node}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}