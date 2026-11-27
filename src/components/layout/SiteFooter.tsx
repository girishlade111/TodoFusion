import React from 'react';
import Link from 'next/link';
import { siteConfig } from '@/config/site';
import { BrandLogo } from '@/components/primitives/BrandLogo';
import styles from './SiteFooter.module.css';

function SocialIcon({ platform }: { platform: 'x' | 'linkedin' | 'dribbble' }) {
  if (platform === 'x') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    );
  }
  if (platform === 'linkedin') {
    return (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93zM6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37z" />
      </svg>
    );
  }
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M19.13 5.09C15.22 9.14 10 10.44 2.25 10.94" />
      <path d="M21.75 12.84c-6.62-1.41-12.14 1-16.38 6.32" />
      <path d="M8.56 2.75c4.37 6 6 9.42 8 17.72" />
    </svg>
  );
}

export function SiteFooter({ standalone = false }: { standalone?: boolean }) {
  return (
    <footer className={styles.footer} style={standalone ? { paddingTop: 24, paddingBottom: 24 } : undefined}>
      <div className={styles.top}>
        <div className={styles.brandCol}>
          <BrandLogo showWordmark size={32} />
          <p className={styles.tagline}>{siteConfig.footerTagline}</p>
        </div>

        <div className={styles.columns}>
          <div>
            <h3 className={styles.colTitle}>Pages</h3>
            <ul className={styles.linkList}>
              {siteConfig.footerColumns.pages.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Products</h3>
            <ul className={styles.linkList}>
              {siteConfig.footerColumns.products.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.colTitle}>Resources</h3>
            <ul className={styles.linkList}>
              {siteConfig.footerColumns.resources.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={styles.link}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p className={styles.copyright}>
          © TodoFusion Template | Created by{' '}
          <a href={siteConfig.creator.url} target="_blank" rel="noopener noreferrer">
            {siteConfig.creator.name}
          </a>{' '}
          (Dmytri Ivanov) | Reconstructed in Next.js
        </p>

        <div className={styles.socials}>
          {siteConfig.socialLinks.map((s) => (
            <a
              key={s.platform}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className={styles.socialBtn}
            >
              <SocialIcon platform={s.platform} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
