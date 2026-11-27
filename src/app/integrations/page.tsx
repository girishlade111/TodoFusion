import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { IntegrationsIndexView } from '@/components/integrations/IntegrationsViews';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';

export const metadata: Metadata = {
  title: 'Integrations',
  description: 'One platform, all your work. Explore all 12 TodoFusion integrations.',
};

export default function IntegrationsPage() {
  return (
    <MarketingLayout>
      <IntegrationsIndexView />
      <FAQAccordion />
    </MarketingLayout>
  );
}
