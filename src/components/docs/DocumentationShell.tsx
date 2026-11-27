'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Moon, Search, Sun, X } from 'lucide-react';
import { docArticles, docGroups } from '@/content/docs';
import { useTheme } from '@/components/theme/ThemeProvider';
import { BrandLogo } from '@/components/primitives/BrandLogo';
import styles from './DocumentationShell.module.css';

export function DocumentationShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);

  const searchMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return docArticles.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.groupLabel.toLowerCase().includes(q) ||
        a.description.toLowerCase().includes(q) ||
        a.blocks.some((b) => b.text.toLowerCase().includes(q))
    );
  }, [query]);

  return (
    <div className={styles.shell}>
      <div className={styles.mobileTopBar}>
        <div className={styles.brandLeft}>
          <BrandLogo showWordmark href="/" size={28} />
          <span className={styles.docsDivider} aria-hidden="true" />
          <Link href="/docs" className={styles.docsLabel}>
            Docs
          </Link>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label="Toggle theme"
          >
            {mounted && theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close docs navigation' : 'Open docs navigation'}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <aside
        className={`${styles.sidebar} ${mobileOpen ? styles.sidebarMobileOpen : ''}`}
        aria-label="Documentation Navigation"
      >
        <div className={styles.brandRow}>
          <div className={styles.brandLeft}>
            <BrandLogo showWordmark href="/" size={26} />
            <span className={styles.docsDivider} aria-hidden="true" />
            <Link href="/docs" className={styles.docsLabel}>
              Docs
            </Link>
          </div>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
                : 'Toggle theme'
            }
          >
            {mounted && theme === 'light' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className={styles.searchWrap}>
          <div className={styles.searchInputWrap}>
            <Search size={14} color="var(--text-muted)" aria-hidden="true" />
            <label htmlFor="docs-search-input" className="skip-link">
              Search docs
            </label>
            <input
              id="docs-search-input"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search docs"
              className={styles.searchInput}
              onKeyDown={(e) => {
                if (e.key === 'Escape') setQuery('');
              }}
            />
          </div>

          {query.trim() ? (
            <div className={styles.searchResults} role="region" aria-label="Search results">
              {searchMatches.length === 0 ? (
                <p style={{ padding: '8px 10px', fontSize: 12, color: 'var(--text-muted)' }}>
                  No documentation matches found.
                </p>
              ) : (
                searchMatches.map((m) => (
                  <Link
                    key={m.slug}
                    href={`/docs/${m.slug}`}
                    className={styles.searchResultItem}
                    onClick={() => {
                      setQuery('');
                      setMobileOpen(false);
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}>
                      {m.title}
                    </span>
                    <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>{m.groupLabel}</span>
                  </Link>
                ))
              )}
            </div>
          ) : null}
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          {docGroups.map((group) => {
            const items = docArticles.filter((a) => a.groupId === group.id);
            return (
              <div key={group.id}>
                <p className={styles.groupTitle}>{group.label}</p>
                <ul className={styles.groupList}>
                  {items.map((item) => {
                    const href = `/docs/${item.slug}`;
                    const active = pathname === href;
                    return (
                      <li key={item.slug}>
                        <Link
                          href={href}
                          onClick={() => setMobileOpen(false)}
                          className={`${styles.navItem} ${active ? styles.navItemActive : ''}`}
                        >
                          {item.title}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </nav>
      </aside>

      <div className={styles.main}>
        <main id="main-content" className={styles.content}>
          {children}
        </main>
        <footer className={styles.docsFooter}>© Copyright 2024. All rights reserved.</footer>
      </div>
    </div>
  );
}
