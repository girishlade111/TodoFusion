'use client';

import React, { useState } from 'react';
import { pricingTabTestimonials } from '@/content/testimonials';

export function TestimonialAvatarTabs({ standalone = false }: { standalone?: boolean }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const current = pricingTabTestimonials[activeIndex];

  return (
    <section
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: standalone ? '0 24px' : '110px 24px 0',
        textAlign: 'center',
      }}
      aria-label="Customer quote selector"
    >
      <div
        role="tablist"
        aria-label="Select customer testimonial"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 14,
          marginBottom: 24,
        }}
      >
        {pricingTabTestimonials.map((item, idx) => {
          const isSelected = idx === activeIndex;
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`pricing-testimonial-panel-${item.id}`}
              aria-label={`${item.name}, ${item.role}`}
              onClick={() => setActiveIndex(idx)}
              style={{
                width: isSelected ? 46 : 40,
                height: isSelected ? 46 : 40,
                borderRadius: 999,
                padding: 0,
                border: isSelected
                  ? '2px solid var(--accent-purple)'
                  : '1px solid var(--border-subtle)',
                overflow: 'hidden',
                opacity: isSelected ? 1 : 0.45,
                transform: isSelected ? 'scale(1.06)' : 'scale(1)',
                transition: 'opacity 180ms ease, transform 180ms ease, border-color 180ms ease',
                cursor: 'pointer',
                background: 'var(--surface-primary)',
              }}
            >
              <img
                src={item.avatarSrc}
                alt=""
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            </button>
          );
        })}
      </div>

      <div id={`pricing-testimonial-panel-${current.id}`} role="tabpanel">
        <p
          style={{
            fontSize: 20,
            lineHeight: '28px',
            fontWeight: 500,
            color: 'var(--text-secondary)',
          }}
        >
          {current.quote}
        </p>
        <p
          style={{
            marginTop: 18,
            fontSize: 15,
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {current.name}
        </p>
        <p style={{ marginTop: 4, fontSize: 13, color: 'var(--text-muted)' }}>{current.role}</p>
      </div>
    </section>
  );
}
