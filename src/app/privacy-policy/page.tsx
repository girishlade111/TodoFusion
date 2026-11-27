import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { privacyPolicyContent } from '@/content/legal';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy and Refund Policy for TodoFusion.',
};

export default function PrivacyPolicyPage() {
  return (
    <MarketingLayout>
      <article
        style={{
          maxWidth: 700,
          margin: '0 auto',
          padding: '88px 24px 40px',
        }}
      >
        <h1
          style={{
            fontSize: 'clamp(32px, 4.5vw, 44px)',
            lineHeight: 1.2,
            fontWeight: 600,
            color: 'var(--text-primary)',
          }}
        >
          {privacyPolicyContent.title}
        </h1>

        <p style={{ marginTop: 20, fontSize: 13, color: 'var(--text-muted)' }}>Date:</p>
        <p style={{ marginTop: 4, fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
          {privacyPolicyContent.date}
        </p>

        <div style={{ marginTop: 48, display: 'flex', flexDirection: 'column', gap: 36 }}>
          {privacyPolicyContent.sections.map((sec) => (
            <section key={sec.id} id={sec.id}>
              <h2
                style={{
                  fontSize: 20,
                  lineHeight: '28px',
                  fontWeight: 600,
                  color: 'var(--text-primary)',
                  marginBottom: 12,
                }}
              >
                {sec.title}
              </h2>

              {sec.paragraphs.map((p, idx) => (
                <p
                  key={idx}
                  style={{
                    fontSize: 15,
                    lineHeight: '24px',
                    color: 'var(--text-secondary)',
                    marginTop: idx > 0 ? 12 : 0,
                  }}
                >
                  {sec.hasContactLink && idx === 1 ? (
                    <>
                      If you&apos;re not satisfied with the product you&apos;ve purchased,{' '}
                      <Link
                        href="/contact"
                        style={{ color: 'var(--accent-purple-light)', textDecoration: 'underline' }}
                      >
                        contact us
                      </Link>{' '}
                      and provide a trustworthy explanation of why you changed your mind. Due to the
                      essence of digital products, we can&apos;t verify you stopped using our assets
                      and deleted them.
                    </>
                  ) : (
                    p
                  )}
                </p>
              ))}

              {sec.bullets ? (
                <ul
                  style={{
                    marginTop: 12,
                    paddingLeft: 20,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    fontSize: 15,
                    lineHeight: '24px',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {sec.bullets.map((b, i) => (
                    <li key={i}>{b}</li>
                  ))}
                </ul>
              ) : null}
            </section>
          ))}
        </div>
      </article>
    </MarketingLayout>
  );
}
