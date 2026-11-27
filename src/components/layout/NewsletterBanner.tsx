'use client';

import React, { useState } from 'react';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './NewsletterBanner.module.css';

export function NewsletterBanner({ standalone = false }: { standalone?: boolean }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setMessage(data.error || 'Unable to subscribe right now.');
        return;
      }
      setStatus('success');
      setMessage(data.message || 'Subscribed to demo newsletter updates.');
      setEmail('');
    } catch {
      setStatus('error');
      setMessage('Network error. Please try again.');
    }
  }

  const content = (
    <div className={styles.banner}>
      <img
        src="/assets/images/extracted/3zzvKeH39ZfIEJWMuu6IeSmmiyw.png"
        alt=""
        aria-hidden="true"
        className={styles.globe}
        width={1036}
        height={490}
        loading="lazy"
      />
      <div className={styles.copy}>
        <SplitHeading as="h2" primary="Join our" muted="newsletter" align="left" />
        <p className={styles.description}>
          Join our newsletter for exclusive insights, announcements, and special offers delivered
          directly to your inbox.
        </p>
      </div>

      <div className={styles.formWrap}>
        <form onSubmit={handleSubmit} noValidate>
          <div className={styles.formRow}>
            <label htmlFor="newsletter-email" className="skip-link">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              className={styles.input}
            />
            <button type="submit" disabled={status === 'loading'} className={styles.submitBtn}>
              {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
            </button>
          </div>
          {message ? (
            <p
              role="status"
              className={`${styles.feedback} ${
                status === 'success' ? styles.feedbackSuccess : styles.feedbackError
              }`}
            >
              {message}
            </p>
          ) : null}
        </form>
      </div>
    </div>
  );

  if (standalone) return content;
  return (
    <section className={styles.section} aria-label="Newsletter">
      {content}
    </section>
  );
}
