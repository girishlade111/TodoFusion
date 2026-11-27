import React from 'react';
import { Clock, Contrast, Keyboard, Layers, Sparkles, Users } from 'lucide-react';
import { plannedFeatures } from '@/content/features';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './PlannedFeatures.module.css';

const iconMap = {
  keyboard: Keyboard,
  clock: Clock,
  sparkles: Sparkles,
  layers: Layers,
  users: Users,
  contrast: Contrast,
};

export function PlannedFeatures() {
  return (
    <section className={styles.section} aria-labelledby="planned-features-heading">
      <div className={styles.header}>
        <SplitHeading as="h2" primary="Planned for the future" />
        <p className={styles.subtitle}>
          Exciting new features, enhanced integrations, and continuous improvements to keep you ahead
          in your productivity journey.
        </p>
      </div>

      <div className={styles.grid}>
        {plannedFeatures.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <div key={item.id} className={styles.item}>
              <div className={`${styles.iconTile} ${styles[item.accent]}`}>
                <Icon size={18} strokeWidth={1.8} />
              </div>
              <h3 className={styles.itemTitle}>{item.title}</h3>
              <p className={styles.itemDesc}>{item.description}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
