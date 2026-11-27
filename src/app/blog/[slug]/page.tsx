import type { Metadata } from 'next';
import React from 'react';
import { notFound } from 'next/navigation';
import { blogArticles } from '@/content/articles';
import { MarketingLayout } from '@/components/layout/MarketingLayout';
import { ArticleDetailView } from '@/components/blog/BlogViews';

export function generateStaticParams() {
  return blogArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) return { title: 'Article Not Found' };
  return {
    title: article.title,
    description: article.excerpt,
  };
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = blogArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <MarketingLayout>
      <ArticleDetailView article={article} />
    </MarketingLayout>
  );
}
