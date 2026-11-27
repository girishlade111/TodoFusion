'use client';

import React, { useEffect, useState } from 'react';
import { CheckCircle2, Pause, Play, Plus, Sparkles } from 'lucide-react';
import { siteConfig } from '@/config/site';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import { Button } from '@/components/primitives/Button';
import styles from './HomeHeroShowcase.module.css';

function formatSeconds(total: number): string {
  const hrs = Math.floor(total / 3600);
  const mins = Math.floor((total % 3600) / 60);
  const secs = total % 60;
  return [hrs, mins, secs].map((n) => String(n).padStart(2, '0')).join(':');
}

export function HomeHeroShowcase({
  standalone = false,
  headingAs = 'h1',
}: {
  standalone?: boolean;
  headingAs?: 'h1' | 'h2';
}) {
  // Initial deterministic fixture matches reference 03:59:57
  const [seconds, setSeconds] = useState(3 * 3600 + 59 * 60 + 57);
  const [running, setRunning] = useState(false);
  const [tasks, setTasks] = useState([
    { id: 'figma', title: 'Figma design', est: '1hr 30min', timer: '00:00', done: false },
    { id: 'report', title: 'Report', est: '2hr 30min', timer: '30:00', done: false },
  ]);

  useEffect(() => {
    if (!running) return;
    let last = performance.now();
    const id = window.setInterval(() => {
      const now = performance.now();
      const delta = Math.floor((now - last) / 1000);
      if (delta >= 1) {
        setSeconds((s) => s + delta);
        last = now;
      }
    }, 500);
    return () => window.clearInterval(id);
  }, [running]);

  const handleToggleDone = (id: string) => {
    setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  return (
    <section
      className={styles.section}
      style={standalone ? { paddingTop: 24 } : undefined}
      aria-label="Hero showcase"
    >
      <div className={styles.intro}>
        {React.createElement(
          headingAs,
          {
            style: {
              fontSize: 'clamp(34px, 5vw, 56px)',
              lineHeight: '1.14',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              textAlign: 'center',
              color: 'var(--text-primary)',
            },
          },
          <>
            Boost Your Productivity
            <br />
            with <span style={{ color: 'var(--accent-purple-light)' }}>TodoFusion</span>
          </>
        )}
        <p className={styles.subtitle}>{siteConfig.description}</p>
        <div className={styles.ctaRow}>
          <Button href={siteConfig.templatePurchaseUrl} external variant="primary">
            Get Started
          </Button>
          <Button href="/#feature-section-1" variant="secondary">
            See how it works
          </Button>
        </div>
      </div>

      <div className={styles.stage}>
        <div className={styles.ambientGlow} aria-hidden="true" />
        <div className={styles.ghostFrameLeft} aria-hidden="true" />
        <div className={styles.ghostFrameRight} aria-hidden="true" />

        <div className={styles.desktopFrame}>
          <div className={styles.desktopInner}>
            <div className={styles.macMenuBar}>
              <div className={styles.menuLeft}>
                <span className={styles.menuAppName}>TodoFusion</span>
                <span>File</span>
                <span>Edit</span>
                <span>View</span>
                <span>Window</span>
                <span>Help</span>
              </div>
              <div className={styles.menuRight}>
                <span>Mon Jun 5  9:41 AM</span>
              </div>
            </div>

            <div className={styles.workspaceBody}>
              {/* Left Task Management Sidebar */}
              <div className={styles.taskSidebar}>
                <div className={styles.sidebarHead}>
                  <span>All ▾  Today</span>
                </div>
                <div className={styles.sidebarMeta}>
                  <span>Est 5hrs 30min</span>
                  <span>2/9 done</span>
                </div>
                <div className={styles.progressTrack}>
                  <div className={styles.progressFill} />
                </div>

                <div className={styles.activeTaskCard}>
                  <div>
                    <div className={styles.taskTitle}>Web design</div>
                    <button
                      type="button"
                      className={styles.timerBtn}
                      onClick={() => setRunning((r) => !r)}
                      title={running ? 'Pause Web design timer' : 'Resume Web design timer'}
                    >
                      {running ? (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Pause size={10} /> Pause
                        </span>
                      ) : (
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <Play size={10} /> Resume
                        </span>
                      )}
                    </button>
                  </div>
                  <span className={styles.timerDigits}>{formatSeconds(seconds)}</span>
                </div>

                {tasks.map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    className={styles.taskRow}
                    onClick={() => handleToggleDone(t.id)}
                    style={{
                      textAlign: 'left',
                      cursor: 'pointer',
                      opacity: t.done ? 0.55 : 1,
                    }}
                  >
                    <div>
                      <div
                        className={styles.taskTitle}
                        style={{ textDecoration: t.done ? 'line-through' : 'none' }}
                      >
                        {t.title}
                      </div>
                      <div className={styles.taskSub}>{t.est}</div>
                    </div>
                    <span className={styles.taskSub}>{t.timer}</span>
                  </button>
                ))}

                <div className={styles.addTaskBtn}>
                  <Plus size={12} />
                  <span>Add task</span>
                </div>

                <div className={styles.doneHeader}>
                  <span>2 Done</span>
                  <span>4hr</span>
                </div>
                <div className={styles.doneRow}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={12} color="#95b500" />
                    <span style={{ textDecoration: 'line-through' }}>Define priorities</span>
                  </span>
                  <span>3hr</span>
                </div>
                <div className={styles.doneRow}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    <CheckCircle2 size={12} color="#95b500" />
                    <span style={{ textDecoration: 'line-through' }}>Localize all content</span>
                  </span>
                  <span>1hr</span>
                </div>
              </div>

              {/* Right Creative Editor Workspace */}
              <div className={styles.editorWindow}>
                <div className={styles.editorTabBar}>
                  <div className={styles.trafficLights} aria-hidden="true">
                    <span style={{ background: '#ff5f57' }} />
                    <span style={{ background: '#febc2e' }} />
                    <span style={{ background: '#28c840' }} />
                  </div>
                  <span>Codify - Framer Tem…</span>
                </div>

                <div className={styles.editorToolbar}>
                  <div className={styles.toolGroup}>
                    <span>Insert</span>
                    <span>Layout</span>
                    <span>Text</span>
                    <span>CMS</span>
                    <span>Actions</span>
                  </div>
                  <div className={styles.publishGroup}>
                    <span className={styles.inviteBtn}>Invite</span>
                    <span className={styles.publishBtn}>Publish</span>
                  </div>
                </div>

                <div className={styles.canvasArea}>
                  <div className={styles.breakpointBar}>
                    <span>Desktop  1440</span>
                    <span>Breakpoint</span>
                  </div>

                  <div className={styles.finovaCanvas}>
                    <div className={styles.finovaNav}>
                      <strong style={{ fontWeight: 700 }}>Finova</strong>
                      <div className={styles.finovaLinks}>
                        <span>Works</span>
                        <span>Blog</span>
                        <span>Features</span>
                        <span>Pricing</span>
                        <span>Shop</span>
                      </div>
                      <span className={styles.finovaGetApp}>Get App</span>
                    </div>

                    <div className={styles.finovaHeroGrid}>
                      <div className={styles.selectionBox}>
                        <span className={styles.selectionTag}>
                          <Sparkles size={10} /> Customize everything
                        </span>
                        <h2 className={styles.finovaTitle}>
                          Versatile Solution For Your Everyday Needs
                        </h2>
                        <p className={styles.finovaDesc}>
                          Enthusiastically empower client-centric materials for an expanded array of
                          potentialities.
                        </p>
                        <div className={styles.finovaCtas}>
                          <span className={styles.finovaBtnPrimary}>Download App</span>
                          <span className={styles.finovaBtnSecondary}>Get Started</span>
                        </div>
                      </div>

                      <div className={styles.finovaMockCards}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#61646b' }}>
                          <span>Weekly Stats</span>
                          <span>+18.4%</span>
                        </div>
                        <div style={{ height: 48, borderRadius: 6, background: 'linear-gradient(135deg, #edeef1, #e0e2e6)' }} />
                        <div className={styles.floatingWidget}>
                          <div>
                            <div style={{ fontSize: 10, color: '#94979e' }}>Active Balance</div>
                            <div style={{ fontSize: 13, fontWeight: 700 }}>$38,735.14</div>
                          </div>
                          <span style={{ fontSize: 10, color: '#95b500', fontWeight: 600 }}>Live</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.bottomReflection} aria-hidden="true" />
      </div>
    </section>
  );
}
