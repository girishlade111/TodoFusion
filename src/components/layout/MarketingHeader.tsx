'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, Moon, Plug, Sun, Trophy, Users, X } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { useTheme } from '@/components/theme/ThemeProvider';
import { BrandLogo } from '@/components/primitives/BrandLogo';
import { Button } from '@/components/primitives/Button';
import styles from './MarketingHeader.module.css';

const resourceIcons = {
  trophy: Trophy,
  plug: Plug,
  users: Users,
};

export function MarketingHeader({ forceScrolled = false }: { forceScrolled?: boolean }) {
  const pathname = usePathname();
  const { theme, toggleTheme, mounted } = useTheme();
  const [scrolled, setScrolled] = useState(forceScrolled);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceScrolled) {
      setScrolled(true);
      return;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [forceScrolled]);

  useEffect(() => {
    setDropdownOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const isResourceActive = ['/features', '/integrations', '/about'].some((p) =>
    pathname.startsWith(p)
  );

  return (
    <header className={styles.wrapper}>
      <div className={`${styles.headerBar} ${scrolled ? styles.scrolled : ''}`}>
        <div className={styles.left}>
          <BrandLogo href="/" size={32} />

          <nav className={styles.nav} aria-label="Main Navigation">
            <Link
              href="/"
              className={`${styles.navLink} ${pathname === '/' ? styles.navLinkActive : ''}`}
            >
              Home
            </Link>

            <div
              className={styles.dropdownWrap}
              ref={dropdownRef}
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                type="button"
                className={`${styles.navLink} ${isResourceActive ? styles.navLinkActive : ''}`}
                aria-expanded={dropdownOpen}
                aria-haspopup="menu"
                onClick={() => setDropdownOpen((v) => !v)}
              >
                Resources
                <ChevronDown
                  size={14}
                  style={{
                    transform: dropdownOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                    transition: 'transform 160ms ease',
                  }}
                />
              </button>

              {dropdownOpen ? (
                <div className={styles.dropdownMenu} role="menu">
                  {siteConfig.resourcesDropdown.map((item) => {
                    const Icon = resourceIcons[item.icon];
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className={styles.dropdownItem}
                      >
                        <Icon size={16} />
                        <span>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {siteConfig.headerNav
              .filter((item) => item.href !== '/')
              .map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.navLink} ${
                    pathname === item.href || pathname.startsWith(`${item.href}/`)
                      ? styles.navLinkActive
                      : ''
                  }`}
                >
                  {item.label}
                </Link>
              ))}
          </nav>
        </div>

        <div className={styles.right}>
          <button
            type="button"
            className={styles.themeBtn}
            onClick={toggleTheme}
            aria-label={
              mounted
                ? `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`
                : 'Toggle color theme'
            }
          >
            {mounted && theme === 'light' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <span className={styles.divider} aria-hidden="true" />

          <div className={styles.desktopCta}>
            <Button href={siteConfig.templatePurchaseUrl} external variant="primary" size="md">
              Remix Template
            </Button>
          </div>

          <button
            type="button"
            className={styles.mobileMenuBtn}
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className={styles.mobileDrawer} role="dialog" aria-label="Mobile Navigation">
          <Link href="/" className={styles.mobileLink}>
            Home
          </Link>
          {siteConfig.resourcesDropdown.map((item) => (
            <Link key={item.href} href={item.href} className={styles.mobileLink}>
              {item.label}
            </Link>
          ))}
          {siteConfig.headerNav
            .filter((item) => item.href !== '/')
            .map((item) => (
              <Link key={item.href} href={item.href} className={styles.mobileLink}>
                {item.label}
              </Link>
            ))}
          <div style={{ marginTop: 8 }}>
            <Button href={siteConfig.templatePurchaseUrl} external variant="primary" fullWidth>
              Remix Template
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
