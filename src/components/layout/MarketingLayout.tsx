import React from 'react';
import { MarketingHeader } from './MarketingHeader';
import { NewsletterBanner } from './NewsletterBanner';
import { SiteFooter } from './SiteFooter';

export function MarketingLayout({
  children,
  showNewsletter = true,
}: {
  children: React.ReactNode;
  showNewsletter?: boolean;
}) {
  return (
    <>
      <MarketingHeader />
      <main id="main-content">{children}</main>
      {showNewsletter ? <NewsletterBanner /> : null}
      <SiteFooter />
    </>
  );
}
