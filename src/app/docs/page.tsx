import type { Metadata } from 'next';
import React from 'react';
import Link from 'next/link';
import { BookOpen, PlayCircle, Rocket, Terminal } from 'lucide-react';
import { docGroups } from '@/content/docs';
import { DocumentationShell } from '@/components/docs/DocumentationShell';
import styles from '@/components/docs/DocumentationShell.module.css';

export const metadata: Metadata = {
  title: 'Docs',
  description: 'Welcome to TodoFusion Docs. Guides for getting started, integrations, collaboration, and automation.',
};

const groupStyles = {
  purple: { color: '#9f75ff', Icon: Rocket },
  orange: { color: '#f49d0b', Icon: BookOpen },
  pink: { color: '#e973bb', Icon: PlayCircle },
  lime: { color: '#95b500', Icon: Terminal },
};

export default function DocsHomePage() {
  return (
    <DocumentationShell>
      <p className={styles.eyebrow}>Documentation</p>
      <h1 className={styles.h1}>
        Welcome to <span style={{ color: 'var(--text-heading-muted)' }}>TodoFusion Docs</span>
      </h1>
      <p className={styles.intro}>
        Welcome to the TodoFusion Overview. In this section, you&apos;ll get a high-level
        understanding of TodoFusion&apos;s key features and how it can help you manage tasks and
        projects more efficiently.
      </p>

      <div className={styles.groupCards}>
        {docGroups.map((g) => {
          const cfg = groupStyles[g.accent];
          const Icon = cfg.Icon;
          return (
            <Link key={g.id} href={`/docs/${g.firstSlug}`} className={styles.groupCard}>
              <div className={styles.groupIconTile} style={{ color: cfg.color }}>
                <Icon size={18} />
              </div>
              <span style={{ fontSize: 15, fontWeight: 500, color: 'var(--text-primary)' }}>
                {g.label}
              </span>
            </Link>
          );
        })}
      </div>

      <hr className={styles.divider} />

      <h2 className={styles.sectionH2}>What is TodoFusion?</h2>
      <p className={styles.bodyP}>
        TodoFusion is a powerful task management and project collaboration platform designed to
        simplify your workflow. Whether you&apos;re an individual managing personal tasks or part of
        a team working on complex projects, TodoFusion is here to streamline your work.
      </p>

      <h2 className={styles.sectionH2}>Task Management</h2>
      <ul className={styles.bulletList}>
        <li>Create tasks with due dates and descriptions.</li>
        <li>Organize tasks into projects.</li>
        <li>Prioritize tasks based on urgency and importance.</li>
      </ul>

      <h2 className={styles.sectionH2}>Team Collaboration</h2>
      <ul className={styles.bulletList}>
        <li>Invite team members to collaborate on tasks and projects.</li>
        <li>Assign tasks to team members.</li>
        <li>Leave comments and have discussions within tasks.</li>
      </ul>
    </DocumentationShell>
  );
}
