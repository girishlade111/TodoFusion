import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { HomeHeroShowcase } from '@/components/product-demo/HomeHeroShowcase';
import { LogoCloud } from '@/components/marketing/LogoCloud';
import { ProductivityBento } from '@/components/product-demo/ProductivityBento';
import { AnalyticsBento } from '@/components/analytics/AnalyticsBento';
import { PlannedFeatures } from '@/components/marketing/PlannedFeatures';
import { PricingComparison } from '@/components/marketing/PricingComparison';
import { TestimonialMosaic } from '@/components/marketing/TestimonialMosaic';
import { IntegrationNetworkRectangular } from '@/components/marketing/IntegrationNetwork';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';

export default function HomePage() {
  return (
    <MarketingLayout>
      <HomeHeroShowcase />
      <LogoCloud />
      <ProductivityBento id="feature-section-1" />
      <AnalyticsBento id="feature-section-3" />
      <PlannedFeatures />
      <PricingComparison />
      <TestimonialMosaic />
      <IntegrationNetworkRectangular />
      <FAQAccordion />
    </MarketingLayout>
  );
}
