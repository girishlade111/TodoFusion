import React from 'react';
import { trustedLogos } from '@/content/features';
import styles from './LogoCloud.module.css';

export function LogoCloud({
  compact = false,
  caption,
}: {
  compact?: boolean;
  caption?: React.ReactNode;
}) {
  const repeated = [...trustedLogos, ...trustedLogos];

  return (
    <section className={`${styles.section} ${compact ? styles.compact : ''}`} aria-label="Trusted teams">
      <p className={styles.caption}>
        {caption ?? (
          <>
            Trusted by <strong>800K+</strong> freelancers and <strong>20k+</strong> teams like
          </>
        )}
      </p>

      <div className={styles.marqueeViewport}>
        <div className={styles.marqueeTrack}>
          {repeated.map((logo, idx) => (
            <div key={`${logo.name}-${idx}`} className={styles.logoItem}>
              <img src={logo.icon} alt="" aria-hidden="true" className={styles.logoIcon} />
              <span className={styles.logoName}>{logo.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
