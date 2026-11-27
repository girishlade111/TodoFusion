import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { SalesContactView } from '@/components/contact/ContactViews';

export const metadata: Metadata = {
  title: 'Sales Contact',
  description: 'Get in touch with the TodoFusion sales team.',
};

export default function SalesContactPage() {
  return (
    <MarketingLayout>
      <SalesContactView />
    </MarketingLayout>
  );
}
