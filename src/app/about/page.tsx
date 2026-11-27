import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { AboutStorySection, TeamGridSection } from '@/components/about/AboutSections';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';

export const metadata: Metadata = {
  title: 'About',
  description: 'What you need to know about us. Meet our team and core values.',
};

export default function AboutPage() {
  return (
    <MarketingLayout>
      <AboutStorySection />
      <TeamGridSection />
      <FAQAccordion />
    </MarketingLayout>
  );
}
