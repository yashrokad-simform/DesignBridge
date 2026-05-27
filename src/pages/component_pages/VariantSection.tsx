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
  grid?: boolean;
}

export interface VariantGroup {
  id: string;
  label: string;
  dotColor: string;
  hideDivider?: boolean;
  noGroupDivider?: boolean;
  styles: VariantStyleGroup[];
}

interface VariantSectionProps {
  title?: string;
  groups: VariantGroup[];
}

function GridRows({ rows, colHeaders }: { rows: VariantRow[]; colHeaders?: string[] }) {
  const colCount = rows[0]?.cells.length ?? 0;
  const hasRowLabels = rows.some(r => r.rowLabel);
  const templateCols = hasRowLabels
    ? `max-content repeat(${colCount}, auto)`
    : `repeat(${colCount}, auto)`;

  return (
    <div
      className="cp-vgrid"
      style={{ gridTemplateColumns: templateCols }}
    >
      {colHeaders && colHeaders.length > 0 && (
        <React.Fragment>
          {hasRowLabels && <span className="cp-vgrid-corner" />}
          {colHeaders.map(h => (
            <span key={h} className="cp-vgrid-col-hdr">{h}</span>
          ))}
        </React.Fragment>
      )}
      {rows.map((row, ri) => (
        <React.Fragment key={ri}>
          {hasRowLabels && (
            <span className="cp-vgrid-row-lbl">{row.rowLabel ?? ''}</span>
          )}
          {row.cells.map((cell, ci) => (
            <div key={ci} className="cp-vgrid-cell">
              {ri === 0 && cell.label && (
                <span className="cp-vcell-lbl">{cell.label}</span>
              )}
              {ri > 0 && cell.label && <span className="cp-vcell-lbl cp-vcell-lbl--spacer" aria-hidden="true">&nbsp;</span>}
              {cell.node}
            </div>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
}

export default function VariantSection({ title = 'Variants', groups }: VariantSectionProps) {
  return (
    <div className="cp-variant-outer">
      <div className="cp-variant-hd">{title}</div>
      <div className="cp-variant-bd">
        {groups.map(group => (
          <div key={group.id} className={`cp-vg${group.noGroupDivider ? ' cp-vg--no-divider' : ''}`}>
            <div className="cp-vg-header cp-vg-header--no-border">
              <span className="cp-vg-lbl">{group.label}</span>
            </div>

            {group.styles.map(style => (
              <div key={style.id} className="cp-vs">
                {style.label && (
                  <div className="cp-vs-header">
                    {style.accentColor && <span className="cp-vs-accent" style={{ background: style.accentColor }} />}
                    <span className="cp-vs-lbl">{style.label}</span>
                  </div>
                )}

                {style.grid ? (
                  <GridRows rows={style.rows} colHeaders={style.colHeaders} />
                ) : (
                  <>
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
                  </>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
