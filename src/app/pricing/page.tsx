import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { PricingComparison } from '@/components/marketing/PricingComparison';
import { TestimonialAvatarTabs } from '@/components/testimonials/TestimonialAvatarTabs';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';

export const metadata: Metadata = {
  title: 'Pricing',
  description:
    'Simple pricing. Transform task management with TodoFusion.',
};

export default function PricingPage() {
  return (
    <MarketingLayout>
      <PricingComparison showEyebrow headingAs="h1" standalone />
      <TestimonialAvatarTabs />
      <FAQAccordion />
    </MarketingLayout>
  );
}
