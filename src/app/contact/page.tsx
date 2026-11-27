import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { ContactIndexView } from '@/components/contact/ContactViews';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with us today! Contact sales, support, documentation, or helpcenter.',
};

export default function ContactPage() {
  return (
    <MarketingLayout>
      <ContactIndexView />
    </MarketingLayout>
  );
}
