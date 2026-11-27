import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { UIKitShowcase } from '@/components/uikit/UIKitShowcase';

export const metadata: Metadata = {
  title: 'UI Kit',
  description:
    'TodoFusion UI Kit. Explore over 80+ sections and components in both Dark and Light modes.',
};

export default function UIKitPage() {
  return (
    <MarketingLayout>
      <UIKitShowcase />
    </MarketingLayout>
  );
}
