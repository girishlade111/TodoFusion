'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './AnalyticsBento.module.css';

const listPresets: Record<
  string,
  {
    total: string;
    rows: Array<{ label: string; duration: string; pct: string; color: string }>;
  }
> = {
  'All lists': {
    total: '12',
    rows: [
      { label: 'Work', duration: '32hr 40min', pct: '60%', color: '#9f75ff' },
      { label: 'Design', duration: '12hr 24min', pct: '14%', color: '#22d2ed' },
      { label: 'Design', duration: '2hr 12m', pct: '10%', color: '#f49d0b' },
      { label: 'Break', duration: '8hr 40min', pct: '16%', color: '#24242a' },
    ],
  },
  'Web design': {
    total: '7',
    rows: [
      { label: 'Work', duration: '18hr 10min', pct: '55%', color: '#9f75ff' },
      { label: 'Design', duration: '9hr 20min', pct: '25%', color: '#22d2ed' },
      { label: 'Review', duration: '3hr 05m', pct: '10%', color: '#f49d0b' },
      { label: 'Break', duration: '4hr 00min', pct: '10%', color: '#24242a' },
    ],
  },
  'Product sprint': {
    total: '5',
    rows: [
      { label: 'Work', duration: '14hr 30min', pct: '65%', color: '#9f75ff' },
      { label: 'Design', duration: '3hr 04min', pct: '15%', color: '#22d2ed' },
      { label: 'QA', duration: '2hr 00m', pct: '10%', color: '#f49d0b' },
      { label: 'Break', duration: '2hr 10min', pct: '10%', color: '#24242a' },
    ],
  },
};

const dateRanges = [
  'Apr 13, 2024 - May 13, 2024',
  'Mar 13, 2024 - Apr 12, 2024',
  'Last 7 days',
];

export function AnalyticsBento({
  id = 'feature-section-3',
  standalone = false,
}: {
  id?: string;
  standalone?: boolean;
}) {
  const [selectedList, setSelectedList] = useState('All lists');
  const [selectedRange, setSelectedRange] = useState(dateRanges[0]);
  const [openFilter, setOpenFilter] = useState<'list' | 'date' | null>(null);

  const current = listPresets[selectedList];
  const radius = 64;
  const circumference = 2 * Math.PI * radius;

  // Segments matching reference donut visual proportions (purple ~26%, cyan ~14%, orange ~22%, remainder dark)
  const segments = [
    { label: 'Work', pct: 26, color: '#9f75ff' },
    { label: 'Design', pct: 13, color: '#22d2ed' },
    { label: 'Design 2', pct: 21, color: '#f49d0b' },
    { label: 'Break', pct: 40, color: 'var(--border-subtle)' },
  ];

  let offset = 0;

  return (
    <section
      id={id}
      className={styles.section}
      style={standalone ? { paddingTop: 0 } : undefined}
      aria-label="Habit analytics"
    >
      <div className={styles.header}>
        <SplitHeading
          as="h2"
          primary="Get to know your habits,"
          muted="Improve them everyday"
        />
        <p className={styles.subtitle}>
          Track your habits consistently, identify patterns, and make small improvements daily to
          enhance your productivity and well-being
        </p>
      </div>

      <div className={styles.grid}>
        {/* Left: Measure time spent */}
        <article className={`${styles.card} ${styles.donutCard}`}>
          <div>
            <h3 className={styles.cardTitle}>Measure time spent</h3>
            <p className={styles.cardDesc}>Get a deep understanding of where your time goes</p>
          </div>

          <div className={styles.inset}>
            <div className={styles.donutWrap} role="img" aria-label={`Time distribution total ${current.total} tasks`}>
              <svg width="164" height="164" viewBox="0 0 164 164">
                <g transform="rotate(-90 82 82)">
                  {segments.map((seg) => {
                    const len = (seg.pct / 100) * circumference;
                    const dashArray = `${len} ${circumference - len}`;
                    const dashOffset = -offset;
                    offset += len;
                    return (
                      <circle
                        key={seg.label}
                        cx="82"
                        cy="82"
                        r={radius}
                        fill="none"
                        stroke={seg.color}
                        strokeWidth="26"
                        strokeDasharray={dashArray}
                        strokeDashoffset={dashOffset}
                      />
                    );
                  })}
                </g>
              </svg>
              <div className={styles.donutCenter}>
                <span className={styles.donutValue}>{current.total}</span>
                <span className={styles.donutLabel}>Total</span>
              </div>
            </div>

            <div className={styles.legendBox}>
              {current.rows.map((row, idx) => (
                <div key={`${row.label}-${idx}`} className={styles.legendRow}>
                  <div className={styles.legendLeft}>
                    <span className={styles.legendDot} style={{ backgroundColor: row.color }} />
                    <span>{row.label}</span>
                  </div>
                  <div className={styles.legendRight}>
                    <span className={styles.legendDuration}>{row.duration}</span>
                    <span className={styles.legendPct}>{row.pct}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Top-Right: Filter through lists */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Filter through lists</h3>
            <p className={styles.cardDesc}>Measure your performance on different lists</p>
          </div>

          <div className={styles.inset}>
            <div className={styles.filterBar}>
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={styles.filterBtn}
                  aria-expanded={openFilter === 'list'}
                  aria-haspopup="listbox"
                  onClick={() => setOpenFilter(openFilter === 'list' ? null : 'list')}
                >
                  <span className={styles.chipStack} aria-hidden="true">
                    <span className={styles.miniChip} style={{ background: '#e973bb' }}>W</span>
                    <span className={styles.miniChip} style={{ background: '#22d2ed' }}>P</span>
                    <span className={styles.miniChip} style={{ background: '#8624ff' }}>A</span>
                  </span>
                  <span>{selectedList}</span>
                  <ChevronDown size={12} />
                </button>

                {openFilter === 'list' ? (
                  <div className={styles.filterPopover} role="listbox" aria-label="Filter by list">
                    {Object.keys(listPresets).map((name) => (
                      <button
                        key={name}
                        type="button"
                        role="option"
                        aria-selected={selectedList === name}
                        className={`${styles.filterOpt} ${selectedList === name ? styles.filterOptActive : ''}`}
                        onClick={() => {
                          setSelectedList(name);
                          setOpenFilter(null);
                        }}
                      >
                        {name}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={styles.filterBtn}
                  aria-expanded={openFilter === 'date'}
                  aria-haspopup="listbox"
                  onClick={() => setOpenFilter(openFilter === 'date' ? null : 'date')}
                >
                  <Calendar size={13} color="var(--text-muted)" />
                  <span>{selectedRange}</span>
                  <ChevronDown size={12} />
                </button>

                {openFilter === 'date' ? (
                  <div className={styles.filterPopover} role="listbox" aria-label="Date range">
                    {dateRanges.map((range) => (
                      <button
                        key={range}
                        type="button"
                        role="option"
                        aria-selected={selectedRange === range}
                        className={`${styles.filterOpt} ${selectedRange === range ? styles.filterOptActive : ''}`}
                        onClick={() => {
                          setSelectedRange(range);
                          setOpenFilter(null);
                        }}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </article>

        {/* Bottom-Right: Review punctuality */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Review punctuality</h3>
            <p className={styles.cardDesc}>Reflect on your ability to set realistic time estimates</p>
          </div>

          <div className={styles.inset} style={{ gap: 14 }}>
            <div className={styles.punctHeader}>
              <span style={{ color: 'var(--text-secondary)' }}>Tasks</span>
              <div style={{ display: 'flex', gap: 14 }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <span className={styles.legendDot} style={{ background: '#95b500' }} /> 34% early
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--text-secondary)' }}>
                  <span className={styles.legendDot} style={{ background: '#f49d0b' }} /> 66% late
                </span>
              </div>
            </div>

            <div className={styles.punctBar} aria-label="34% early, 66% late">
              <div style={{ width: '34%', background: '#95b500', borderRadius: 999 }} />
              <div style={{ width: '66%', background: '#f49d0b', borderRadius: 999 }} />
            </div>

            <div className={styles.punctRows}>
              {[
                { chip: 'P', color: '#22d2ed', name: 'Task 01', status: 'Early', time: '15hr' },
                { chip: 'S', color: '#95b500', name: 'Task 02', status: 'Late', time: '9hr' },
                { chip: 'P', color: '#8624ff', name: 'Task 03', status: 'Late', time: '9hr' },
              ].map((t) => (
                <div key={t.name} className={styles.punctRow}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span className={styles.miniChip} style={{ background: t.color, marginLeft: 0 }}>
                      {t.chip}
                    </span>
                    <span style={{ color: 'var(--text-primary)', fontWeight: 500 }}>{t.name}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <span className={t.status === 'Early' ? styles.badgeEarly : styles.badgeLate}>
                      {t.status}
                    </span>
                    <span style={{ color: 'var(--text-muted)', minWidth: 28, textAlign: 'right' }}>
                      {t.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
