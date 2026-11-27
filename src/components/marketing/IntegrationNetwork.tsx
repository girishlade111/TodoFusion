import React from 'react';
import Link from 'next/link';
import { integrationRecords } from '@/content/integrations';
import { BrandMark } from '@/components/primitives/BrandLogo';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './IntegrationNetwork.module.css';

const topOrder = ['startify', 'identify', 'nexus-ai'];
const bottomOrder = ['flexify', 'landify', 'platify'];

export function IntegrationNetworkRectangular({ showHeader = true }: { showHeader?: boolean }) {
  const byId = Object.fromEntries(integrationRecords.map((r) => [r.id, r]));

  return (
    <section className={styles.section} aria-label="Seamless Integrations">
      <div className={styles.rectWrap}>
        <div className={styles.nodeColumn}>
          {topOrder.map((id) => {
            const item = byId[id];
            if (!item) return null;
            return (
              <Link key={item.id} href={`/integrations/${item.slug}`} className={styles.nodeCard}>
                <img src={item.iconSrc} alt="" aria-hidden="true" className={styles.nodeIcon} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>

        <div className={styles.connectorLine} aria-hidden="true">
          <div className={styles.connectorPulse} />
        </div>

        <div className={styles.centerHub} aria-hidden="true">
          <div className={styles.centerHubInner}>
            <BrandMark size={30} />
          </div>
        </div>

        <div className={styles.connectorLine} aria-hidden="true">
          <div className={styles.connectorPulse} />
        </div>

        <div className={styles.nodeColumn}>
          {bottomOrder.map((id) => {
            const item = byId[id];
            if (!item) return null;
            return (
              <Link key={item.id} href={`/integrations/${item.slug}`} className={styles.nodeCard}>
                <img src={item.iconSrc} alt="" aria-hidden="true" className={styles.nodeIcon} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {showHeader ? (
        <div className={styles.rectHeader}>
          <SplitHeading as="h2" primary="Seamless" muted="Integrations" />
          <p className={styles.subtitle}>
            Connect TodoFusion with your favorite tools like Notion and Google. Enjoy a unified
            workflow for enhanced productivity and efficiency.
          </p>
        </div>
      ) : null}
    </section>
  );
}

export function IntegrationNetworkCircular() {
  // 5x3 grid: center cell (row 1, col 2 = index 7) is TodoFusion purple hub
  const icons = integrationRecords.slice(0, 14);
  const cells = Array.from({ length: 15 }, (_, idx) => {
    if (idx === 7) return null;
    const item = icons[idx < 7 ? idx : idx - 1];
    return item || integrationRecords[idx % integrationRecords.length];
  });

  return (
    <div className={styles.circularHero} aria-hidden="true">
      <div className={styles.circularGrid}>
        <svg className={styles.gridLines} viewBox="0 0 460 260" preserveAspectRatio="none">
          <line x1="34" y1="130" x2="426" y2="130" stroke="var(--border-subtle)" strokeWidth="1" />
          <line x1="230" y1="20" x2="230" y2="240" stroke="var(--border-subtle)" strokeWidth="1" />
          <line x1="132" y1="20" x2="132" y2="240" stroke="var(--border-subtle)" strokeWidth="1" />
          <line x1="328" y1="20" x2="328" y2="240" stroke="var(--border-subtle)" strokeWidth="1" />
        </svg>
        {cells.map((item, idx) =>
          idx === 7 ? (
            <div key="center" className={styles.circularCenter}>
              <svg width="24" height="24" viewBox="0 0 12 12" fill="none">
                <path
                  d="M 12 3.5 L 12 2 L 10 0 L 0 0 L 0 3.5 L 6.5 3.5 L 0 9.25 L 2.45 12 L 8.75 6.25 L 8.5 6.48 L 8.5 12 L 12 12 L 12 8.98 L 8.75 6.25 Z"
                  fill="#ffffff"
                />
              </svg>
            </div>
          ) : (
            <div key={`${item?.id}-${idx}`} className={styles.circularNode}>
              {item ? (
                <img src={item.iconSrc} alt="" className={styles.nodeIcon} />
              ) : null}
            </div>
          )
        )}
      </div>
    </div>
  );
}
