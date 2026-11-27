import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { SectionEyebrow } from '@/components/primitives/SectionEyebrow';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { Button } from '@/components/primitives/Button';

export default function NotFound() {
  return (
    <MarketingLayout>
      <section
        style={{
          maxWidth: 640,
          margin: '0 auto',
          padding: '120px 24px 80px',
          textAlign: 'center',
        }}
      >
        <SectionEyebrow>404 error</SectionEyebrow>
        <SplitHeading as="h1" primary="Page" muted="not found" size="hero" />
        <p style={{ marginTop: 16, fontSize: 15, lineHeight: '22px', color: 'var(--text-secondary)' }}>
          We&apos;re sorry, but the page you&apos;re looking for could not be found. It may have been
          moved, deleted, or never existed in the first place.
        </p>
        <div
          style={{
            marginTop: 28,
            display: 'flex',
            justifyContent: 'center',
            gap: 12,
            flexWrap: 'wrap',
          }}
        >
          <Button href="/" variant="primary">
            Go to home
          </Button>
          <Button href="/contact" variant="secondary">
            Contact us
          </Button>
        </div>
      </section>
    </MarketingLayout>
  );
}
