import React from 'react';
import {
  aboutStats,
  companyValues,
  founderMessage,
  teamMembers,
} from '@/content/team';
import { siteConfig } from '@/config/site';
import { SectionEyebrow } from '@/components/primitives/SectionEyebrow';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './AboutSections.module.css';

export function AboutStorySection() {
  return (
    <section className={styles.section} aria-label="Our story">
      <div className={styles.storyGrid}>
        <div>
          <SectionEyebrow align="left">OUR STORY</SectionEyebrow>
          <SplitHeading
            as="h1"
            primary="What you need to"
            muted="know about us"
            breakBeforeMuted
            align="left"
            size="hero"
          />
          <p className={styles.introSub}>
            World class development and built for performance, Todofusion will deliver every time.
          </p>

          <div className={styles.founderRow}>
            <img
              src={founderMessage.avatarSrc}
              alt={founderMessage.name}
              className={styles.founderAvatar}
              width={48}
              height={48}
            />
            <div>
              <p className={styles.founderQuote}>{founderMessage.quote}</p>
              <p className={styles.founderName}>{founderMessage.name}</p>
              <p className={styles.founderRole}>{founderMessage.role}</p>
            </div>
          </div>
        </div>

        <div className={styles.statsStack}>
          {aboutStats.map((stat) => (
            <div key={stat.id} className={styles.statOuter}>
              <div className={styles.statInner}>
                <p className={styles.statTop}>{stat.topLabel}</p>
                <p className={styles.statValue}>{stat.value}</p>
                <p className={styles.statBottom}>{stat.bottomLabel}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.valuesCard}>
        <p className={styles.valuesLabel}>Empowering Harmony</p>
        <h2 className={styles.valuesHeading}>
          Harmonizing Professional Ambitions with Personal Growth
        </h2>
        <p className={styles.valuesSub}>
          We are a unified team driven by shared values that emphasize a harmonious balance between
          work and personal life.
        </p>

        <div className={styles.valuesColumns}>
          {companyValues.map((val) => (
            <div key={val.id}>
              <h3 className={styles.valueItemTitle}>{val.title}</h3>
              <p className={styles.valueItemDesc}>{val.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TeamGridSection({
  showHeader = true,
  standalone = false,
}: {
  showHeader?: boolean;
  standalone?: boolean;
}) {
  return (
    <section
      className={styles.section}
      style={standalone ? { paddingTop: 0 } : undefined}
      aria-label="Meet our team"
    >
      {showHeader ? (
        <div className={styles.teamHeader}>
          <SplitHeading as="h2" primary="Meet our" muted="Team" />
          <p style={{ marginTop: 12, fontSize: 15, lineHeight: '22px', color: 'var(--text-secondary)' }}>
            Discover the creative and dedicated individuals driving TodoFusion&apos;s mission forward.
          </p>
        </div>
      ) : null}

      <div className={styles.teamGrid}>
        {teamMembers.map((member) => (
          <article key={member.id} className={styles.teamCard}>
            <div className={styles.teamInner}>
              <img
                src={member.avatarSrc}
                alt={member.name}
                className={styles.teamAvatar}
                width={72}
                height={72}
              />
              <h3 className={styles.teamName}>{member.name}</h3>
              <p className={styles.teamRole}>{member.role}</p>
            </div>

            <div className={styles.teamSocials}>
              {siteConfig.socialLinks.map((s) => (
                <a
                  key={s.platform}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on ${s.label}`}
                  className={styles.teamSocialIcon}
                >
                  {s.platform === 'x' ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  ) : s.platform === 'linkedin' ? (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
                    </svg>
                  ) : (
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
                      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
                    </svg>
                  )}
                </a>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
