import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import { integrationRecords } from '@/content/integrations';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { IntegrationDetailView } from '@/components/integrations/IntegrationsViews';

export function generateStaticParams() {
  return integrationRecords.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const item = integrationRecords.find((r) => r.slug === slug);
  if (!item) return { title: 'Integration Not Found' };
  return {
    title: item.name,
    description: item.shortDescription,
  };
}

export default async function IntegrationDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const item = integrationRecords.find((r) => r.slug === slug);
  if (!item) notFound();

  return (
    <MarketingLayout>
      <IntegrationDetailView item={item} />
    </MarketingLayout>
  );
}
