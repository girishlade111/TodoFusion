import { describe, expect, it } from 'vitest';
import { blogArticles } from '@/content/articles';
import { integrationRecords } from '@/content/integrations';
import { docArticles, docGroups } from '@/content/docs';
import { helpcenterQuestions } from '@/content/helpcenter';
import { marketingFaqs } from '@/content/faqs';
import { pricingPlans } from '@/content/pricing';
import { teamMembers } from '@/content/team';

describe('TodoFusion Content Collections', () => {
  it('contains all 12 integrations in verified order', () => {
    expect(integrationRecords).toHaveLength(12);
    expect(integrationRecords[0].slug).toBe('codify');
    expect(integrationRecords[11].slug).toBe('stylokit');
    for (const item of integrationRecords) {
      expect(item.overview.length).toBeGreaterThan(0);
      expect(item.relatedIds).toHaveLength(3);
    }
  });

  it('contains all 8 discovered blog articles with valid metadata', () => {
    expect(blogArticles).toHaveLength(8);
    const featured = blogArticles.filter((a) => a.featured);
    const upperRow = blogArticles.filter((a) => a.featuredRow);
    const regular = blogArticles.filter((a) => a.regularGrid);
    expect(featured).toHaveLength(1);
    expect(upperRow).toHaveLength(3);
    expect(regular).toHaveLength(6);
  });

  it('contains all 12 docs articles across 4 groups with linked prev/next', () => {
    expect(docGroups).toHaveLength(4);
    expect(docArticles).toHaveLength(12);
    expect(docArticles[0].previousSlug).toBeNull();
    expect(docArticles[0].nextSlug).toBe('dashboard');
    expect(docArticles[11].nextSlug).toBeNull();
  });

  it('contains 12 helpcenter questions across 3 sub-categories', () => {
    expect(helpcenterQuestions).toHaveLength(12);
    expect(helpcenterQuestions.filter((q) => q.category === 'Company')).toHaveLength(4);
    expect(helpcenterQuestions.filter((q) => q.category === 'Get Started')).toHaveLength(4);
    expect(helpcenterQuestions.filter((q) => q.category === 'Services')).toHaveLength(4);
  });

  it('contains 6 FAQs, 2 pricing plans, and 8 team members', () => {
    expect(marketingFaqs).toHaveLength(6);
    expect(pricingPlans).toHaveLength(2);
    expect(teamMembers).toHaveLength(8);
  });
});
