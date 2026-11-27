import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { HelpcenterView } from '@/components/helpcenter/HelpcenterView';

export const metadata: Metadata = {
  title: 'Helpcenter',
  description: 'How can we help? Search and filter answers to all your TodoFusion questions.',
};

export default function HelpcenterPage() {
  return (
    <MarketingLayout>
      <HelpcenterView />
    </MarketingLayout>
  );
}
