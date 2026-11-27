import type { Metadata } from 'next';
import React from 'react';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { BlogIndexView } from '@/components/blog/BlogViews';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Our latest articles and design insights from TodoFusion.',
};

export default function BlogPage() {
  return (
    <MarketingLayout>
      <BlogIndexView />
    </MarketingLayout>
  );
}
