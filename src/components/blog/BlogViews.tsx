import React from 'react';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { blogArticles, type BlogArticle } from '@/content/articles';
import { SectionEyebrow } from '@/components/primitives/SectionEyebrow';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './BlogViews.module.css';

export function BlogCard({ article }: { article: BlogArticle }) {
  return (
    <Link href={`/blog/${article.slug}`} className={styles.cardLink}>
      <img src={article.coverSrc} alt={article.title} className={styles.cardImg} />
      <p className={styles.metaText}>
        {article.publishedAt} · {article.readingMinutes} min read
      </p>
      <h3 className={styles.cardTitle}>{article.title}</h3>
      <p className={styles.cardExcerpt}>{article.excerpt}</p>
    </Link>
  );
}

export function FeaturedBlogCard({ article }: { article: BlogArticle }) {
  return (
    <article className={styles.featuredCard}>
      <div className={styles.featuredBody}>
        <div className={styles.authorRow}>
          <img
            src={article.author.avatarSrc}
            alt={article.author.name}
            className={styles.avatar}
            width={34}
            height={34}
          />
          <div>
            <p className={styles.authorName}>{article.author.name}</p>
            <p className={styles.metaText}>
              {article.publishedAt} · {article.readingMinutes} min read
            </p>
          </div>
        </div>

        <h2 className={styles.featuredTitle}>{article.title}</h2>
        <p className={styles.featuredExcerpt}>{article.excerpt}</p>

        <Link href={`/blog/${article.slug}`} className={styles.readMoreBtn}>
          <span>Read more</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <Link href={`/blog/${article.slug}`}>
        <img src={article.coverSrc} alt={article.title} className={styles.featuredMedia} />
      </Link>
    </article>
  );
}

export function BlogIndexView({ standalone = false }: { standalone?: boolean }) {
  const featured = blogArticles.find((a) => a.featured) || blogArticles[0];
  const featuredRow = blogArticles.filter((a) => a.featuredRow);
  const regularGrid = blogArticles.filter((a) => a.regularGrid);

  return (
    <section className={styles.section} style={standalone ? { paddingTop: 0 } : undefined}>
      <div className={styles.header}>
        <SectionEyebrow>OUR BLOG</SectionEyebrow>
        <SplitHeading as="h1" primary="Our latest" muted="articles" size="hero" />
        <p className={styles.subtitle}>
          Gain confidence in your decisions with TodoFusion, which delivers insightful information
          to guide you.
        </p>
      </div>

      <FeaturedBlogCard article={featured} />

      <div className={styles.grid}>
        {featuredRow.map((article) => (
          <BlogCard key={`upper-${article.id}`} article={article} />
        ))}
      </div>

      <div className={styles.regularBlock}>
        <SectionEyebrow align="left">REGULAR ARTICLES</SectionEyebrow>
        <SplitHeading as="h2" primary="Latest article" muted="and blog" align="left" />
        <div className={styles.grid}>
          {regularGrid.map((article) => (
            <BlogCard key={`grid-${article.id}`} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function ArticleDetailView({ article }: { article: BlogArticle }) {
  const related = article.relatedSlugs
    .map((s) => blogArticles.find((a) => a.slug === s))
    .filter((a): a is BlogArticle => Boolean(a));

  return (
    <div className={styles.detailWrap}>
      <Link href="/blog" className={styles.backLink}>
        <ArrowLeft size={15} />
        <span>All blog</span>
      </Link>

      <div className={styles.detailGrid}>
        <aside className={styles.sidebar}>
          <img src={article.coverSrc} alt={article.title} className={styles.detailThumb} />

          <div>
            <p className={styles.sideHeading}>Table of content</p>
            <nav className={styles.tocList} aria-label="Table of content">
              {article.tableOfContents.map((toc, idx) => (
                <a
                  key={toc.id}
                  href={`#${toc.id}`}
                  className={`${styles.tocLink} ${idx === 0 ? styles.tocLinkActive : ''}`}
                >
                  {toc.label}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className={styles.sideHeading}>Content info</p>
            <p className={styles.metaText}>
              <span className={styles.categoryPill}>{article.category}</span>
              <span>
                {article.publishedAt} · {article.readingMinutes} min read
              </span>
            </p>
          </div>

          <div>
            <p className={styles.sideHeading}>Written by</p>
            <div className={styles.authorRow}>
              <img
                src={article.author.avatarSrc}
                alt={article.author.name}
                className={styles.avatar}
              />
              <div>
                <p className={styles.authorName}>{article.author.name}</p>
                <p className={styles.metaText}>{article.author.role}</p>
              </div>
            </div>
          </div>
        </aside>

        <article>
          <section id="introduction">
            <h1 className={styles.articleTitle}>{article.title}</h1>
            <p className={styles.articleIntro}>{article.intro}</p>
          </section>

          <section id="content" className={styles.articleSection}>
            <h2 className={styles.articleH2}>Content</h2>
            {article.contentBlocks.map((block, idx) => (
              <p key={idx} className={styles.articleParagraph}>
                {block}
              </p>
            ))}
          </section>

          <section id="conclusion" className={styles.articleSection}>
            <h2 className={styles.articleH2}>Conclusion</h2>
            <p className={styles.articleParagraph}>{article.conclusion}</p>
          </section>

          <section id="wrap-up" className={styles.articleSection}>
            <h2 className={styles.articleH2}>Wrap-up</h2>
            <p className={styles.articleParagraph}>{article.wrapUp}</p>
          </section>
        </article>
      </div>

      <section className={styles.relatedHeader} aria-label="Related blogs">
        <SectionEyebrow align="left">Related blogs</SectionEyebrow>
        <SplitHeading as="h2" primary="Our latest news" muted="and articles" align="left" />
        <div className={styles.grid}>
          {related.map((rel) => (
            <BlogCard key={rel.id} article={rel} />
          ))}
        </div>
      </section>
    </div>
  );
}
