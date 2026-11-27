import React from 'react';
import { CheckCircle2, Plus } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { Button } from '@/components/primitives/Button';
import { LogoCloud } from '@/components/marketing/LogoCloud';
import styles from './FeaturesHeroShowcase.module.css';

export function FeaturesHeroShowcase({
  headingAs = 'h1',
  standalone = false,
}: {
  headingAs?: 'h1' | 'h2';
  standalone?: boolean;
}) {
  return (
    <section
      className={styles.section}
      style={standalone ? { paddingTop: 24 } : undefined}
      aria-label="Features Hero"
    >
      <div className={styles.grid}>
        <div className={styles.left}>
          <SplitHeading
            as={headingAs}
            primary="Unleashing Productivity"
            muted="Features"
            breakBeforeMuted
            align="left"
            size="hero"
          />
          <p className={styles.subtitle}>
            Maximize efficiency with seamless task management, real-time collaboration, and robust
            integration capabilities.
          </p>
          <div className={styles.ctaRow}>
            <Button href={siteConfig.templatePurchaseUrl} external variant="primary">
              Get Started
            </Button>
            <Button href="#feature-section-2" variant="secondary">
              See how it works
            </Button>
          </div>

          <div style={{ marginTop: 28 }}>
            <LogoCloud
              compact
              caption={
                <>
                  Over <strong>800K+</strong> users love TodoFusion
                </>
              }
            />
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.window}>
            <div className={styles.macBar}>
              <div className={styles.macLeft}>
                <strong>TodoFusion</strong>
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Window</span>
                <span>Help</span>
              </div>
              <span>Mon Jun 5  9:41 AM</span>
            </div>

            <div className={styles.floatingPanel}>
              <div className={styles.panelHead}>
                <span>All ▾  Today</span>
              </div>
              <div className={styles.metaRow}>
                <span>Est 5hrs 30min</span>
                <span>2/9 done</span>
              </div>
              <div className={styles.progressTrack}>
                <div className={styles.progressFill} />
              </div>

              <div className={styles.activeRow}>
                <span>Web design</span>
                <span style={{ fontVariantNumeric: 'tabular-nums' }}>03:59:57</span>
              </div>

              <div className={styles.row}>
                <div>
                  <div>Figma design</div>
                  <div className={styles.sub}>1hr 30min</div>
                </div>
                <span className={styles.sub}>00:00</span>
              </div>

              <div className={styles.row}>
                <div>
                  <div>Report</div>
                  <div className={styles.sub}>2hr 30min</div>
                </div>
                <span className={styles.sub}>30:00</span>
              </div>

              <div className={styles.sub} style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '4px 2px' }}>
                <Plus size={12} /> Add task
              </div>

              <div className={styles.metaRow}>
                <span>2 Done</span>
                <span>4hr</span>
              </div>
              <div className={styles.sub} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <CheckCircle2 size={11} color="#95b500" />
                  <span style={{ textDecoration: 'line-through' }}>Define priorities</span>
                </span>
                <span>3hr</span>
              </div>
              <div className={styles.sub} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <CheckCircle2 size={11} color="#95b500" />
                  <span style={{ textDecoration: 'line-through' }}>Localize all content</span>
                </span>
                <span>1hr</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
