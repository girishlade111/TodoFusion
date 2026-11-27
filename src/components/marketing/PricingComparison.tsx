import React from 'react';
import { pricingPlans } from '@/content/pricing';
import { siteConfig } from '@/config/site';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { SectionEyebrow } from '@/components/primitives/SectionEyebrow';
import styles from './PricingComparison.module.css';

export function PricingComparison({
  showEyebrow = false,
  headingAs = 'h2',
  standalone = false,
}: {
  showEyebrow?: boolean;
  headingAs?: 'h1' | 'h2';
  standalone?: boolean;
}) {
  return (
    <section
      className={styles.section}
      style={standalone ? { paddingTop: 48 } : undefined}
      aria-label="Pricing comparison"
    >
      <div className={styles.header}>
        {showEyebrow ? <SectionEyebrow>PRICING</SectionEyebrow> : null}
        <SplitHeading
          as={headingAs}
          primary="Simple"
          muted="pricing"
          size={headingAs === 'h1' ? 'hero' : 'section'}
        />
        <p className={styles.subtitle}>
          {showEyebrow
            ? 'Transform task management with TodoFusion. Combine powerful to-do lists, productivity tracking, and seamless integrations to stay focused and achieve more'
            : 'Choose the plan that fits your needs and boost your productivity with TodoFusion.'}
        </p>
      </div>

      <div className={styles.grid}>
        {pricingPlans.map((plan) => {
          const PlanTag = headingAs === 'h1' ? 'h2' : 'h3';
          const FeatTag = headingAs === 'h1' ? 'h3' : 'h4';
          return (
          <div
            key={plan.id}
            className={`${styles.card} ${plan.isFeatured ? styles.featuredCard : styles.standardCard}`}
          >
            <PlanTag className={styles.planTitle}>{plan.title}</PlanTag>
            <p className={styles.planDesc}>{plan.description}</p>

            <div className={styles.insetBox}>
              <div className={styles.priceRow}>
                <span className={styles.priceValue}>{plan.price}</span>
                <div className={styles.priceMeta}>
                  <span className={styles.billingLabel}>{plan.billingLabel}</span>
                  <span className={styles.taxLabel}>{plan.taxLabel}</span>
                </div>
              </div>

              <a
                href={siteConfig.templatePurchaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${styles.ctaBtn} ${plan.isFeatured ? styles.featuredBtn : styles.standardBtn}`}
              >
                {plan.ctaLabel}
              </a>

              <div className={styles.highlights}>
                <span>{plan.highlights[0]}</span>
                <span aria-hidden="true">·</span>
                <span>{plan.highlights[1]}</span>
              </div>
            </div>

            <FeatTag className={styles.featuresHeading}>Features</FeatTag>
            <ul className={styles.featureList}>
              {plan.features.map((feat) => (
                <li key={feat} className={styles.featureItem}>
                  <span className={styles.dot} aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>
          );
        })}
      </div>
    </section>
  );
}
