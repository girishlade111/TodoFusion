import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  ChevronRight,
  Clock,
  Keyboard,
  LayoutGrid,
  Search,
  Sparkles,
} from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { Button } from '@/components/primitives/Button';
import { BrandLogo, BrandMark } from '@/components/primitives/BrandLogo';
import { MarketingHeader } from '@/components/layout/MarketingHeader';
import { NewsletterBanner } from '@/components/layout/NewsletterBanner';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { FAQAccordion } from '@/components/marketing/FAQAccordion';
import { LogoCloud } from '@/components/marketing/LogoCloud';
import { PlannedFeatures } from '@/components/marketing/PlannedFeatures';
import { PricingComparison } from '@/components/marketing/PricingComparison';
import { TestimonialMosaic } from '@/components/marketing/TestimonialMosaic';
import {
  IntegrationNetworkCircular,
  IntegrationNetworkRectangular,
} from '@/components/marketing/IntegrationNetwork';
import { HomeHeroShowcase } from '@/components/product-demo/HomeHeroShowcase';
import { FeaturesHeroShowcase } from '@/components/product-demo/FeaturesHeroShowcase';
import { ProductivityBento } from '@/components/product-demo/ProductivityBento';
import { AnalyticsBento } from '@/components/analytics/AnalyticsBento';
import { RoadmapGrid } from '@/components/features/RoadmapGrid';
import { TestimonialAvatarTabs } from '@/components/testimonials/TestimonialAvatarTabs';
import { BlogIndexView } from '@/components/blog/BlogViews';
import { ContactIndexView, SalesContactView } from '@/components/contact/ContactViews';
import { TeamGridSection } from '@/components/about/AboutSections';
import { HelpcenterView } from '@/components/helpcenter/HelpcenterView';
import styles from './UIKitShowcase.module.css';

const previewImages = [
  '/assets/images/extracted/OdTL8nCW7kbUzgtfKgI4QrkeEKk.png',
  '/assets/images/extracted/Wrk138aG4Rxn95jqFL8JW2Na1A.png',
  '/assets/images/extracted/LZDyv8KfoTuNpfMiC4NwsbzD0E.png',
  '/assets/images/extracted/f5eMUVXCVXXxeLQzj8ySnbxgms.png',
  '/assets/images/extracted/ZQaKhGl4GuE367M7IVY9uLjWOA.png',
  '/assets/images/extracted/OnkUAcoLoWtdDUMF8lS9JXtN2og.jpg',
];

const categories = [
  { id: 'button', label: 'Button', count: 16 },
  { id: 'card', label: 'Card', count: 15 },
  { id: 'accordion', label: 'Accordion', count: 2 },
  { id: 'feature-icon', label: 'Feature icon', count: 3 },
  { id: 'navigation', label: 'Navigation', count: 2 },
  { id: 'badge', label: 'Badge', count: 8 },
  { id: 'logo', label: 'Logo', count: 4 },
  { id: 'filter', label: 'Filter', count: 1 },
  { id: 'hero', label: 'Hero', count: 2 },
  { id: 'features', label: 'Features', count: 4 },
  { id: 'pricing', label: 'Pricing', count: 1 },
  { id: 'tab', label: 'Tab', count: 2 },
  { id: 'testimonials', label: 'Testimonials', count: 1 },
  { id: 'faqs', label: 'FAQs', count: 1 },
  { id: 'newsletter', label: 'Newsletter', count: 2 },
  { id: 'logo-cloud', label: 'Logo cloud', count: 1 },
  { id: 'integrations', label: 'Integrations', count: 2 },
  { id: 'footer', label: 'Footer', count: 1 },
  { id: 'blog', label: 'Blog', count: 2 },
  { id: 'contact', label: 'Contact', count: 2 },
  { id: 'team', label: 'Team', count: 1 },
  { id: 'code-comp', label: 'Code comp', count: 5 },
];

function CategoryHeader({ id, title, count }: { id: string; title: string; count: number }) {
  return (
    <div id={id} className={styles.categoryHeader}>
      <h2 className={styles.categoryTitle}>{title}</h2>
      <span className={styles.categoryCount}>{count} Elements</span>
    </div>
  );
}

export function UIKitShowcase() {
  return (
    <div>
      {/* UI Kit Hero */}
      <section className={styles.hero}>
        <span className={styles.framerBadge}>UI Kit Component Catalog</span>
        <SplitHeading
          as="h1"
          primary="TodoFusion UI Kit"
          muted="Design with Precision"
          breakBeforeMuted
          size="hero"
        />
        <p className={styles.heroSub}>
          Unlock a full suite of UI elements designed to enhance productivity and streamline your
          project&apos;s design process effectively.
        </p>
        <div className={styles.heroCtas}>
          <Button href={siteConfig.templatePurchaseUrl} external variant="primary">
            Remix Template
          </Button>
          <Button href="#preview-sections" variant="secondary">
            Preview sections
          </Button>
        </div>
      </section>

      {/* 6 Light/Dark Preview Thumbnails */}
      <div className={styles.previewGallery} aria-label="UI Kit template previews">
        {previewImages.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`TodoFusion UI Kit layout preview ${i + 1}`}
            className={styles.previewThumb}
          />
        ))}
      </div>

      {/* Category Anchor Navigation */}
      <section id="preview-sections" className={styles.catalogIntro}>
        <h2 style={{ fontSize: 22, fontWeight: 600, color: 'var(--text-primary)' }}>
          Flexible modules and customizable elements.
        </h2>
        <p style={{ marginTop: 8, fontSize: 15, color: 'var(--text-secondary)', maxWidth: 680 }}>
          Explore over 80+ sections and components in both Dark and Light modes from the
          comprehensive kit to find your ideal piece.
        </p>
        <nav className={styles.anchorRow} aria-label="UI Kit categories">
          {categories.map((c) => (
            <a key={c.id} href={`#${c.id}`} className={styles.anchorPill}>
              {c.label}
            </a>
          ))}
        </nav>
      </section>

      <div className={styles.sectionList}>
        {/* 01. Button (16 Elements) */}
        <section className={styles.categorySection} aria-labelledby="button">
          <CategoryHeader id="button" title="Button" count={16} />
          <div className={styles.wrapRow}>
            <Button variant="primary">Remix Template</Button>
            <Button variant="primary" size="sm">Remix Template</Button>
            <Button variant="primary" size="lg">Remix Template</Button>
            <Button variant="secondary">Remix Template</Button>
            <Button variant="secondary" size="sm">Remix Template</Button>
            <Button variant="light">Remix Template</Button>
            <Button variant="light" size="sm">Remix Template</Button>
            <Button variant="ghost">Remix Template</Button>
            <Button variant="secondary">
              Remix Template <ArrowRight size={14} />
            </Button>
            <Button variant="primary">
              Remix Template <ChevronRight size={14} />
            </Button>
            <Button variant="secondary">
              Documentation <ChevronRight size={14} />
            </Button>
            <Button variant="secondary">
              <ArrowLeft size={14} /> Previous
            </Button>
            <Button variant="secondary">Submit</Button>
            <Button variant="light">Subscribe</Button>
            <Button variant="secondary" size="sm">
              <Search size={13} /> Search docs
            </Button>
            <Button variant="primary" disabled>
              Remix Template
            </Button>
          </div>
        </section>

        {/* 02. Card (15 Elements) */}
        <section className={styles.categorySection} aria-labelledby="card">
          <CategoryHeader id="card" title="Card" count={15} />
          <div className={styles.grid3}>
            <div className={styles.sampleCard}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>David Johnson · 2024 · 7 min read</p>
              <h3 style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                Fostering Team Creativity and Productivity
              </h3>
              <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                Flexible and affordable. Boost your productivity month by month.
              </p>
            </div>

            <div className={styles.sampleCard}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Date · 7 min read</p>
              <h3 style={{ marginTop: 8, fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>
                How Todofusion&apos;s Gantt Charts Enhance Your Workflow
              </h3>
              <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                Projects, whether big or small, require meticulous planning and management.
              </p>
            </div>

            <div className={styles.sampleCard}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Sales</h3>
              <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                Speak to our sales team about plans, pricing, enterprise contracts, or request a demo.
              </p>
              <Link href="/contact/sales" style={{ display: 'inline-block', marginTop: 12, fontSize: 13, color: 'var(--accent-purple-light)' }}>
                Talk to sales ›
              </Link>
            </div>

            <div className={styles.sampleCard}>
              <p style={{ fontSize: 12, color: 'var(--accent-purple-light)' }}>Getting Started</p>
              <p style={{ marginTop: 8, fontSize: 14, color: 'var(--text-primary)' }}>
                TodoFusion has revolutionized my productivity at Tech Innovators. I get more done in less time!
              </p>
              <p style={{ marginTop: 10, fontSize: 12, color: 'var(--text-muted)' }}>David Johnsson · Founder</p>
            </div>

            <div className={styles.sampleCard}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: 'var(--text-primary)' }}>Drag &amp; Drop pages</h3>
              <p style={{ marginTop: 8, fontSize: 13, color: 'var(--text-secondary)' }}>
                Customize your sitemap layout with intuitive drag-and-drop functionality for seamless editing.
              </p>
            </div>

            <div className={styles.sampleCard} style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--text-muted)' }}>Used by</p>
              <p style={{ fontSize: 30, fontWeight: 600, color: 'var(--text-primary)', margin: '6px 0' }}>11,000+</p>
              <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Creators</p>
            </div>
          </div>
        </section>

        {/* 03. Accordion (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="accordion">
          <CategoryHeader id="accordion" title="Accordion" count={2} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <FAQAccordion
              showHeader={false}
              items={[{ id: 'uikit-acc-1', question: 'What is TodoFusion?', answer: 'TodoFusion is a Framer template designed to enhance task management with integrated tools for productivity and efficient workflow.' }]}
            />
            <FAQAccordion
              showHeader={false}
              defaultOpenId="uikit-acc-2"
              items={[{ id: 'uikit-acc-2', question: 'What is TodoFusion?', answer: 'TodoFusion is a Framer template designed to enhance task management with integrated tools for productivity and efficient workflow.' }]}
            />
          </div>
        </section>

        {/* 04. Feature icon (3 Elements) */}
        <section className={styles.categorySection} aria-labelledby="feature-icon">
          <CategoryHeader id="feature-icon" title="Feature icon" count={3} />
          <div className={styles.wrapRow}>
            {[
              { Icon: Keyboard, color: '#9f75ff' },
              { Icon: Clock, color: '#f49d0b' },
              { Icon: LayoutGrid, color: '#22d2ed' },
            ].map(({ Icon, color }, idx) => (
              <div
                key={idx}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 11,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--surface-primary)',
                  color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <Icon size={20} />
              </div>
            ))}
          </div>
        </section>

        {/* 05. Navigation (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="navigation">
          <CategoryHeader id="navigation" title="Navigation" count={2} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div style={{ border: '1px solid var(--border-subtle)', borderRadius: 16, paddingBottom: 16, background: 'var(--surface-inset)' }}>
              <MarketingHeader forceScrolled />
            </div>
            <div className={styles.sampleCard}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
                <BrandLogo showWordmark href="/docs" size={26} />
                <div className={styles.wrapRow}>
                  <Link href="/docs/account" style={{ fontSize: 13, color: 'var(--accent-purple-light)' }}>Account</Link>
                  <Link href="/docs/dashboard" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Dashboard</Link>
                  <Link href="/docs/managing-tasks" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Managing Tasks</Link>
                  <Link href="/docs/integrations" style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Todo Integrations</Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 06. Badge (8 Elements) */}
        <section className={styles.categorySection} aria-labelledby="badge">
          <CategoryHeader id="badge" title="Badge" count={8} />
          <div className={styles.wrapRow}>
            {[
              { bg: 'var(--surface-primary)', color: 'var(--text-primary)' },
              { bg: 'rgba(134, 36, 255, 0.16)', color: '#a87fff' },
              { bg: 'rgba(34, 210, 237, 0.16)', color: '#22d2ed' },
              { bg: 'rgba(233, 115, 187, 0.16)', color: '#e973bb' },
              { bg: 'rgba(149, 181, 0, 0.16)', color: '#95b500' },
              { bg: 'rgba(244, 157, 11, 0.16)', color: '#f49d0b' },
              { bg: 'rgba(242, 63, 93, 0.16)', color: '#f23f5d' },
              { bg: 'rgba(20, 110, 245, 0.16)', color: '#4d96ff' },
            ].map((b, i) => (
              <span key={i} className={styles.badgePill} style={{ background: b.bg, color: b.color }}>
                Category
              </span>
            ))}
          </div>
        </section>

        {/* 07. Logo (4 Elements) */}
        <section className={styles.categorySection} aria-labelledby="logo">
          <CategoryHeader id="logo" title="Logo" count={4} />
          <div className={styles.wrapRow} style={{ gap: 28 }}>
            <BrandMark size={32} />
            <BrandMark size={32} inverted />
            <BrandLogo showWordmark href="" size={32} />
            <BrandLogo showWordmark href="" size={26} />
          </div>
        </section>

        {/* 08. Filter (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="filter">
          <CategoryHeader id="filter" title="Filter" count={1} />
          <HelpcenterView standalone limit={4} initialCategory="Company" />
        </section>

        {/* 09. Hero (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="hero">
          <CategoryHeader id="hero" title="Hero" count={2} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
            <HomeHeroShowcase standalone headingAs="h2" />
            <FeaturesHeroShowcase standalone headingAs="h2" />
          </div>
        </section>

        {/* 10. Features (4 Elements) */}
        <section className={styles.categorySection} aria-labelledby="features">
          <CategoryHeader id="features" title="Features" count={4} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            <RoadmapGrid showHeader standalone />
            <ProductivityBento id="uikit-bento" standalone />
            <AnalyticsBento id="uikit-analytics" standalone />
            <PlannedFeatures />
          </div>
        </section>

        {/* 11. Pricing (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="pricing">
          <CategoryHeader id="pricing" title="Pricing" count={1} />
          <PricingComparison standalone />
        </section>

        {/* 12. Tab (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="tab">
          <CategoryHeader id="tab" title="Tab" count={2} />
          <div className={styles.grid2}>
            <div className={styles.sampleCard}>
              <TestimonialAvatarTabs standalone />
            </div>
            <div className={styles.sampleCard}>
              <div style={{ borderLeft: '1px solid var(--border-subtle)', display: 'flex', flexDirection: 'column', gap: 8 }}>
                {['Introduction', 'Title', 'Conclusion', 'Wrap-up'].map((t, i) => (
                  <span
                    key={t}
                    style={{
                      paddingLeft: 14,
                      fontSize: 13,
                      borderLeft: i === 0 ? '2px solid var(--accent-purple)' : '2px solid transparent',
                      marginLeft: -1,
                      color: i === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 13. Testimonials (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="testimonials">
          <CategoryHeader id="testimonials" title="Testimonials" count={1} />
          <TestimonialMosaic />
        </section>

        {/* 14. FAQs (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="faqs">
          <CategoryHeader id="faqs" title="Faqs" count={1} />
          <FAQAccordion />
        </section>

        {/* 15. Newsletter (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="newsletter">
          <CategoryHeader id="newsletter" title="Newsletter" count={2} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <NewsletterBanner standalone />
          </div>
        </section>

        {/* 16. Logo cloud (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="logo-cloud">
          <CategoryHeader id="logo-cloud" title="Logo cloud" count={1} />
          <LogoCloud />
        </section>

        {/* 17. Integrations (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="integrations">
          <CategoryHeader id="integrations" title="Integrations" count={2} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            <IntegrationNetworkCircular />
            <IntegrationNetworkRectangular />
          </div>
        </section>

        {/* 18. Footer (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="footer">
          <CategoryHeader id="footer" title="Footer" count={1} />
          <div className={styles.sampleCard}>
            <SiteFooter standalone />
          </div>
        </section>

        {/* 19. Blog (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="blog">
          <CategoryHeader id="blog" title="Blog" count={2} />
          <BlogIndexView standalone />
        </section>

        {/* 20. Contact (2 Elements) */}
        <section className={styles.categorySection} aria-labelledby="contact">
          <CategoryHeader id="contact" title="Contact" count={2} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 56 }}>
            <ContactIndexView standalone />
            <SalesContactView standalone />
          </div>
        </section>

        {/* 21. Team (1 Element) */}
        <section className={styles.categorySection} aria-labelledby="team">
          <CategoryHeader id="team" title="Team" count={1} />
          <TeamGridSection standalone />
        </section>

        {/* 22. Code comp (5 Elements) */}
        <section className={styles.categorySection} aria-labelledby="code-comp">
          <CategoryHeader id="code-comp" title="Code comp" count={5} />
          <div className={styles.wrapRow} style={{ gap: 24 }}>
            <div className={styles.pulseCircle} title="Expand-contract pulse" />
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                background: 'linear-gradient(135deg, #8624ff, #22d2ed)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                boxShadow: '0 0 28px rgba(134,36,255,0.45)',
              }}
            >
              <Sparkles size={18} />
            </div>
            <div
              className="diagonal-panel"
              style={{
                width: 68,
                height: 48,
                borderRadius: 10,
                border: '1px solid var(--border-subtle)',
              }}
            />
            <Button variant="secondary" size="sm">
              <span className={styles.spinner} aria-hidden="true" />
              <span>Loading</span>
            </Button>
            <div
              style={{
                width: 120,
                height: 2,
                background: 'linear-gradient(90deg, transparent, #8624ff, transparent)',
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
