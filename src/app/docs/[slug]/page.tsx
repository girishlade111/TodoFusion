import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { docArticles } from '@/content/docs';
import { DocumentationShell } from '@/components/docs/DocumentationShell';
import { CodeBlock } from '@/components/docs/CodeBlock';
import styles from '@/components/docs/DocumentationShell.module.css';

export function generateStaticParams() {
  return docArticles.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const doc = docArticles.find((d) => d.slug === slug);
  if (!doc) return { title: 'Doc Not Found' };
  return {
    title: doc.title,
    description: doc.description,
  };
}

function renderStepText(text: string) {
  const m = text.match(/^(Step \d+:)(.*)$/);
  if (!m) return text;
  return (
    <>
      <strong style={{ color: 'var(--text-primary)', fontWeight: 600 }}>{m[1]}</strong>
      {m[2]}
    </>
  );
}

export default async function DocArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const doc = docArticles.find((d) => d.slug === slug);
  if (!doc) notFound();

  const prev = doc.previousSlug ? docArticles.find((d) => d.slug === doc.previousSlug) : null;
  const next = doc.nextSlug ? docArticles.find((d) => d.slug === doc.nextSlug) : null;

  // Skip duplicating description if blocks[0] is the intro paragraph
  const introText = doc.blocks[0]?.type === 'paragraph' ? doc.blocks[0].text : '';
  const bodyBlocks = doc.blocks[0]?.type === 'paragraph' ? doc.blocks.slice(1) : doc.blocks;

  return (
    <DocumentationShell>
      <p className={styles.eyebrow}>{doc.groupLabel}</p>
      <h1 className={styles.h1}>{doc.heading}</h1>
      {introText ? <p className={styles.intro}>{introText}</p> : null}

      <hr className={styles.divider} />

      <div>
        {bodyBlocks.map((b, idx) => {
          if (b.type === 'heading') {
            return (
              <h2 key={idx} className={styles.sectionH2}>
                {b.text}
              </h2>
            );
          }
          if (b.type === 'code') {
            return <CodeBlock key={idx} code={b.text} />;
          }
          return (
            <p key={idx} className={styles.bodyP}>
              {renderStepText(b.text)}
            </p>
          );
        })}
      </div>

      <nav className={styles.prevNextRow} aria-label="Previous and Next documentation">
        <div>
          {prev ? (
            <Link href={`/docs/${prev.slug}`} className={styles.prevNextCard}>
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{prev.title}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                <ChevronLeft size={14} /> Previous
              </span>
            </Link>
          ) : null}
        </div>
        <div>
          {next ? (
            <Link
              href={`/docs/${next.slug}`}
              className={styles.prevNextCard}
              style={{ alignItems: 'flex-end', textAlign: 'right' }}
            >
              <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>{next.title}</span>
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 500,
                  color: 'var(--text-primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                }}
              >
                Next <ChevronRight size={14} />
              </span>
            </Link>
          ) : null}
        </div>
      </nav>
    </DocumentationShell>
  );
}
