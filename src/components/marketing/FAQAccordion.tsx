'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { marketingFaqs, type FaqItem } from '@/content/faqs';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './FAQAccordion.module.css';

export function FAQAccordion({
  items = marketingFaqs,
  showHeader = true,
  defaultOpenId = null,
}: {
  items?: FaqItem[];
  showHeader?: boolean;
  defaultOpenId?: string | null;
}) {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  return (
    <section className={styles.section} style={!showHeader ? { paddingTop: 0 } : undefined}>
      {showHeader ? (
        <div className={styles.header}>
          <SplitHeading as="h2" primary="Frequently Asked" muted="Questions" />
          <p className={styles.subtitle}>
            Seamlessly use your preferred tools for unified work, start to finish.
          </p>
        </div>
      ) : null}

      <div className={styles.list}>
        {items.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div key={item.id} className={`${styles.item} ${isOpen ? styles.itemOpen : ''}`}>
              <button
                type="button"
                className={styles.trigger}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${item.id}`}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span>{item.question}</span>
                <Plus size={18} className={`${styles.icon} ${isOpen ? styles.iconOpen : ''}`} />
              </button>
              {isOpen ? (
                <div id={`faq-panel-${item.id}`} className={styles.panel} role="region">
                  {item.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
