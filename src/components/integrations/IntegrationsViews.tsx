import React from 'react';
import Link from 'next/link';
import { ArrowLeft, BadgeCheck } from 'lucide-react';
import { integrationRecords, type IntegrationRecord } from '@/content/integrations';
import { SectionEyebrow } from '@/components/primitives/SectionEyebrow';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { IntegrationNetworkCircular } from '@/components/marketing/IntegrationNetwork';
import styles from './IntegrationsViews.module.css';

export function IntegrationCard({ item }: { item: IntegrationRecord }) {
  return (
    <Link href={`/integrations/${item.slug}`} className={styles.card}>
      <div className={styles.cardTop}>
        <div className={styles.iconTile}>
          <img src={item.iconSrc} alt="" aria-hidden="true" className={styles.iconImg} />
        </div>
        <h3 className={styles.cardName}>{item.name}</h3>
      </div>
      <p className={styles.cardDesc}>{item.shortDescription}</p>
    </Link>
  );
}

export function IntegrationsIndexView({ standalone = false }: { standalone?: boolean }) {
  return (
    <section className={styles.section} style={standalone ? { paddingTop: 0 } : undefined}>
      <IntegrationNetworkCircular />

      <div className={styles.header}>
        <SectionEyebrow>INTEGRATIONS</SectionEyebrow>
        <SplitHeading as="h1" primary="One platform," muted="all your work" size="hero" />
        <p className={styles.subtitle}>
          Consolidate your tools and data with TodoFusion, providing your team with a unified space
          for focused productivity.
        </p>
      </div>

      <div className={styles.grid}>
        {integrationRecords.map((item) => (
          <IntegrationCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

export function IntegrationDetailView({ item }: { item: IntegrationRecord }) {
  const related = item.relatedIds
    .map((id) => integrationRecords.find((r) => r.id === id))
    .filter((r): r is IntegrationRecord => Boolean(r));

  return (
    <div className={styles.detailWrap}>
      <Link href="/integrations" className={styles.backLink}>
        <ArrowLeft size={15} />
        <span>All integrations</span>
      </Link>

      <div className={styles.detailGrid}>
        <aside className={styles.metaSidebar} aria-label="Integration metadata">
          <div className={styles.detailIconTile}>
            <img
              src={item.iconSrc}
              alt={item.name}
              className={styles.iconImg}
              style={{ width: 32, height: 32 }}
            />
          </div>

          <div>
            <p className={styles.metaItemLabel}>Created by</p>
            <p className={styles.metaItemVal}>{item.creator}</p>
          </div>
          <div>
            <p className={styles.metaItemLabel}>Powered by</p>
            <p className={styles.metaItemVal}>{item.poweredBy}</p>
          </div>
          <div>
            <p className={styles.metaItemLabel}>Website</p>
            <a
              href={item.websiteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.metaItemLink}
            >
              {item.websiteLabel}
            </a>
          </div>
          <div>
            <p className={styles.metaItemLabel}>Docs</p>
            <Link href="/docs" className={styles.metaItemVal} style={{ display: 'inline-block' }}>
              {item.docsLabel}
            </Link>
          </div>
          <div>
            <p className={styles.metaItemLabel}>Contact</p>
            <a href={item.contactHref} className={styles.metaItemVal} style={{ display: 'inline-block' }}>
              {item.contactLabel}
            </a>
          </div>
        </aside>

        <div>
          <div className={styles.detailTitleRow}>
            <h1 className={styles.detailTitle}>{item.name}</h1>
            <BadgeCheck size={18} color="#8624ff" aria-hidden="true" />
          </div>
          <p className={styles.cardDesc} style={{ marginTop: 8, maxWidth: 560 }}>
            {item.shortDescription}
          </p>

          <img
            src={item.coverSrc}
            alt={`${item.name} preview`}
            className={styles.coverImg}
          />
          <p className={styles.coverCaption}>Stylokit - Premium templates</p>

          <h2 className={styles.overviewTitle}>Overview</h2>
          <div className={styles.overviewBody}>
            {item.overview.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </div>
      </div>

      <section className={styles.relatedSection} aria-label="Related integrations">
        <div className={styles.grid}>
          {related.map((rel) => (
            <IntegrationCard key={rel.id} item={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
