import type { MetadataRoute } from 'next';
import { blogArticles } from '@/content/articles';
import { integrationRecords } from '@/content/integrations';
import { docArticles } from '@/content/docs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const staticRoutes = [
    '',
    '/features',
    '/integrations',
    '/about',
    '/pricing',
    '/blog',
    '/privacy-policy',
    '/contact',
    '/contact/sales',
    '/helpcenter',
    '/docs',
    '/uikit',
  ];

  const allPaths = [
    ...staticRoutes,
    ...blogArticles.map((a) => `/blog/${a.slug}`),
    ...integrationRecords.map((i) => `/integrations/${i.slug}`),
    ...docArticles.map((d) => `/docs/${d.slug}`),
  ];

  return allPaths.map((p) => ({
    url: `${baseUrl}${p}`,
    lastModified: new Date('2026-08-21'),
  }));
}
