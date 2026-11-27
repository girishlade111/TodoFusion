import React from 'react';
import { MessageSquareQuote } from 'lucide-react';
import { mosaicTestimonials, type TestimonialRecord } from '@/content/testimonials';
import styles from './TestimonialMosaic.module.css';

function TestimonialCard({ item }: { item: TestimonialRecord }) {
  const isFeatured = Boolean(item.featured);
  const isTall = Boolean(item.companyLogoSrc);

  return (
    <article
      className={`${styles.card} ${isTall ? styles.tallCard : ''} ${isFeatured ? styles.featuredPurple : ''}`}
    >
      <div>
        {item.companyLogoSrc ? (
          <div className={styles.companyRow}>
            <img
              src={item.companyLogoSrc}
              alt={item.companyName || ''}
              className={styles.companyLogo}
              style={isFeatured ? { filter: 'brightness(0) invert(1)' } : undefined}
            />
            {!isFeatured && item.companyName ? (
              <span className={styles.companyName}>{item.companyName}</span>
            ) : null}
          </div>
        ) : null}
        <p className={styles.quote}>{item.quote}</p>
      </div>

      <div className={styles.footerRow}>
        <div className={styles.author}>
          <img src={item.avatarSrc} alt={item.name} className={styles.avatar} width={36} height={36} />
          <div>
            <p className={styles.name}>{item.name}</p>
            <p className={styles.role}>{item.role}</p>
          </div>
        </div>
        <MessageSquareQuote size={16} className={styles.quoteIcon} aria-hidden="true" />
      </div>
    </article>
  );
}

export function TestimonialMosaic({ showIntro = true }: { showIntro?: boolean }) {
  const left = mosaicTestimonials.filter((t) => t.column === 'left');
  const middle = mosaicTestimonials.filter((t) => t.column === 'middle');
  const right = mosaicTestimonials.filter((t) => t.column === 'right');

  return (
    <section className={styles.section} aria-label="Customer testimonials">
      {showIntro ? (
        <p className={styles.intro}>
          People just like you are already using TodoFusion to stay super focused, crush more tasks
          and save hours of their time
        </p>
      ) : null}

      <div className={styles.columns}>
        <div className={styles.col}>
          {left.map((t) => (
            <TestimonialCard key={t.id} item={t} />
          ))}
        </div>
        <div className={styles.col}>
          {middle.map((t) => (
            <TestimonialCard key={t.id} item={t} />
          ))}
        </div>
        <div className={styles.col}>
          {right.map((t) => (
            <TestimonialCard key={t.id} item={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
