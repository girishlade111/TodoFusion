import React from 'react';
import { Clock, Gamepad2, LayoutGrid, Smartphone, Sparkles, Zap } from 'lucide-react';
import { featuresRoadmap } from '@/content/roadmap';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './RoadmapGrid.module.css';

const iconMap = {
  gamepad: Gamepad2,
  smartphone: Smartphone,
  clock: Clock,
  sparkles: Sparkles,
  grid: LayoutGrid,
  zap: Zap,
};

export function RoadmapGrid({
  showHeader = false,
  standalone = false,
}: {
  showHeader?: boolean;
  standalone?: boolean;
}) {
  return (
    <section
      className={styles.section}
      style={standalone ? { paddingTop: 0 } : undefined}
      aria-label="Planned product roadmap"
    >
      {showHeader ? (
        <div className={styles.header}>
          <SplitHeading as="h2" primary="Planned for the future" />
          <p className={styles.subtitle}>
            Exciting new features, enhanced integrations, and continuous improvements to keep you
            ahead in your productivity journey.
          </p>
        </div>
      ) : null}

      <div className={styles.grid}>
        {featuresRoadmap.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <article key={item.id} className={styles.card}>
              <div className={styles.iconTile}>
                <Icon size={17} strokeWidth={1.75} />
              </div>
              <h3 className={styles.title}>{item.title}</h3>
              <p className={styles.desc}>{item.description}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
