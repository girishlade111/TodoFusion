import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { FeaturesHeroShowcase } from '@/components/product-demo/FeaturesHeroShowcase';
import { RoadmapGrid } from '@/components/features/RoadmapGrid';
import { ProductivityBento } from '@/components/product-demo/ProductivityBento';
import { AnalyticsBento } from '@/components/analytics/AnalyticsBento';
import { PlannedFeatures } from '@/components/marketing/PlannedFeatures';

export const metadata: Metadata = {
  title: 'Features',
  description:
    'Maximize efficiency with seamless task management, real-time collaboration, and robust integration capabilities.',
};

export default function FeaturesPage() {
  return (
    <MarketingLayout>
      <FeaturesHeroShowcase />
      <RoadmapGrid />
      <ProductivityBento id="feature-section-2" />
      <AnalyticsBento id="feature-section-3" />
      <PlannedFeatures />
    </MarketingLayout>
  );
}
