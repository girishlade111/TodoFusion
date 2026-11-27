'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, ChevronDown, ChevronRight, Mail, MessageCircle } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SectionEyebrow } from '@/components/primitives/SectionEyebrow';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './ContactViews.module.css';

const companySizeOptions = ['1-50', '50-100', '100-500', '500-1000', '1000-5000', '5000+'];

export function ContactIndexView({ standalone = false }: { standalone?: boolean }) {
  const [supportNotice, setSupportNotice] = useState(false);

  return (
    <section className={styles.section} style={standalone ? { paddingTop: 0 } : undefined}>
      <div className={styles.header}>
        <SectionEyebrow>CONTACT US</SectionEyebrow>
        <SplitHeading as="h1" primary="Get in touch with" muted="us today!" size="hero" />
        <p className={styles.subtitle}>
          Contact our sales and support teams for demos, onboarding assistance, or any product
          inquiries.
        </p>
      </div>

      <div className={styles.topCards}>
        <article className={styles.card}>
          <div className={styles.cardTitleRow}>
            <Mail size={16} />
            <h2>Sales</h2>
          </div>
          <p className={styles.cardDesc}>
            Connect with our sales team to talk about pricing, enterprise contracts.
          </p>
          <Link href="/contact/sales" className={styles.pillBtn}>
            <span>Talk to sales</span>
            <ChevronRight size={14} />
          </Link>
        </article>

        <article className={styles.card}>
          <div className={styles.cardTitleRow}>
            <MessageCircle size={16} />
            <h2>Help &amp; Support</h2>
          </div>
          <p className={styles.cardDesc}>
            Ask product questions, report problems, or leave feedback.
          </p>
          <button
            type="button"
            className={styles.pillBtn}
            onClick={() => setSupportNotice((v) => !v)}
          >
            <span>Contact support</span>
            <ChevronRight size={14} />
          </button>
          {supportNotice ? (
            <p style={{ fontSize: 12, color: 'var(--accent-purple-light)' }}>
              For instant answers, visit our{' '}
              <Link href="/helpcenter" style={{ textDecoration: 'underline' }}>
                Helpcenter
              </Link>{' '}
              or email {siteConfig.creator.email}.
            </p>
          ) : null}
        </article>
      </div>

      <div className={styles.openRows}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
            Join the community
          </h2>
          <p className={styles.cardDesc} style={{ marginTop: 8 }}>
            Chat with us directly and become a part of the TodoFusion community
          </p>
          <a
            href={siteConfig.communitySlackUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.openLink}
          >
            <span>Join community</span>
            <ChevronRight size={14} />
          </a>
        </div>

        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
            General communication
          </h2>
          <p className={styles.cardDesc} style={{ marginTop: 8 }}>
            Submit a ticket to our support team or email {siteConfig.creator.email} directly
          </p>
          <a href={`mailto:${siteConfig.creator.email}`} className={styles.openLink}>
            <span>{siteConfig.creator.email}</span>
            <ChevronRight size={14} />
          </a>
        </div>
      </div>

      <hr className={styles.divider} />

      <div className={styles.openRows} style={{ marginTop: 48 }}>
        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
            Documentation
          </h2>
          <p className={styles.cardDesc} style={{ marginTop: 8 }}>
            Gain deeper understanding of TodoFusion&apos;s features, APIs, and SDKs
          </p>
          <Link href="/docs" className={styles.openLink}>
            <span>TodoFusion Docs</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
            Helpcenter
          </h2>
          <p className={styles.cardDesc} style={{ marginTop: 8 }}>
            Explore our FAQs to find quick answers to your questions.
          </p>
          <Link href="/helpcenter" className={styles.openLink}>
            <span>Go to Helpcenter</span>
            <ChevronRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SalesContactView({ standalone = false }: { standalone?: boolean }) {
  const [fullName, setFullName] = useState('');
  const [workEmail, setWorkEmail] = useState('');
  const [companySize, setCompanySize] = useState('1-50');
  const [sizeOpen, setSizeOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (status === 'loading') return;
    if (fullName.trim().length < 2) {
      setStatus('error');
      setFeedback('Please enter your full name.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(workEmail.trim())) {
      setStatus('error');
      setFeedback('Please enter a valid work email address.');
      return;
    }
    if (message.trim().length < 5) {
      setStatus('error');
      setFeedback('Please share a brief message about how we can help.');
      return;
    }

    setStatus('loading');
    setFeedback('');
    try {
      const res = await fetch('/api/contact/sales', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: fullName.trim(),
          workEmail: workEmail.trim(),
          companySize,
          message: message.trim(),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus('error');
        setFeedback(data.error || 'Unable to submit form.');
        return;
      }
      setStatus('success');
      setFeedback(data.message || 'Thank you. Inquiry submitted.');
      setFullName('');
      setWorkEmail('');
      setMessage('');
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again.');
    }
  }

  return (
    <section className={styles.salesSection} style={standalone ? { paddingTop: 0 } : undefined}>
      <div className={styles.salesGrid}>
        <div>
          <span className={styles.badge}>Contact us</span>
          <h1 className={styles.salesHeading}>Get in touch</h1>
          <p className={styles.subtitle} style={{ maxWidth: 380 }}>
            Please feel free to send us any questions, feedback or suggestions you might have.
          </p>

          <ul className={styles.checkList}>
            <li className={styles.checkItem}>
              <CheckCircle2 size={15} color="var(--text-muted)" />
              <span>Request a demo</span>
            </li>
            <li className={styles.checkItem}>
              <CheckCircle2 size={15} color="var(--text-muted)" />
              <span>Learn which plan is right for your team</span>
            </li>
            <li className={styles.checkItem}>
              <CheckCircle2 size={15} color="var(--text-muted)" />
              <span>Get onboarding help</span>
            </li>
          </ul>

          <div className={styles.helpBlock}>
            <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
              Helpcenter
            </h2>
            <p className={styles.cardDesc} style={{ marginTop: 8, maxWidth: 380 }}>
              Learn how to use the GraphQL API and TypeScript SDK to extend TodoFusion.
            </p>
            <Link href="/helpcenter" className={styles.openLink}>
              <span>Go to Helpcenter</span>
              <ChevronRight size={14} />
            </Link>
          </div>
        </div>

        <form className={styles.formCard} onSubmit={handleSubmit} noValidate>
          <div>
            <label htmlFor="sales-fullname" className={styles.fieldLabel}>
              Full name
            </label>
            <input
              id="sales-fullname"
              name="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="David Johnson"
              required
              className={styles.input}
            />
          </div>

          <div>
            <label htmlFor="sales-email" className={styles.fieldLabel}>
              Work email
            </label>
            <input
              id="sales-email"
              name="workEmail"
              type="email"
              value={workEmail}
              onChange={(e) => setWorkEmail(e.target.value)}
              placeholder="david@stylokit.com"
              required
              className={styles.input}
            />
          </div>

          <div style={{ position: 'relative' }}>
            <span id="sales-size-label" className={styles.fieldLabel}>
              Company size
            </span>
            <button
              type="button"
              aria-label={`${companySize} Company size`}
              aria-haspopup="listbox"
              aria-expanded={sizeOpen}
              className={styles.selectBtn}
              onClick={() => setSizeOpen((v) => !v)}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setSizeOpen(false);
              }}
            >
              <span>{companySize}</span>
              <ChevronDown size={15} color="var(--text-muted)" />
            </button>
            {sizeOpen ? (
              <div className={styles.listbox} role="listbox" aria-label="Company size">
                {companySizeOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    role="option"
                    aria-selected={companySize === opt}
                    className={`${styles.listboxOption} ${
                      companySize === opt ? styles.listboxOptionActive : ''
                    }`}
                    onClick={() => {
                      setCompanySize(opt);
                      setSizeOpen(false);
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div>
            <label htmlFor="sales-message" className={styles.fieldLabel}>
              How can we help?
            </label>
            <textarea
              id="sales-message"
              name="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="I'd like to learn more about..."
              required
              className={styles.textarea}
            />
          </div>

          <button type="submit" disabled={status === 'loading'} className={styles.submitBtn}>
            {status === 'loading' ? 'Submitting...' : 'Submit'}
          </button>

          {feedback ? (
            <p
              role="status"
              style={{
                fontSize: 13,
                color: status === 'success' ? 'var(--accent-lime)' : 'var(--accent-coral)',
              }}
            >
              {feedback}
            </p>
          ) : null}
        </form>
      </div>
    </section>
  );
}
