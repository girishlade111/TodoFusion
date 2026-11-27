'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowRight,
  Bold,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Copy,
  Italic,
  Link2,
  List,
  MoreVertical,
} from 'lucide-react';
import { SplitHeading } from '@/components/primitives/SplitHeading';
import styles from './ProductivityBento.module.css';

const sprintOptions = [25, 45, 60, 90];
const breakOptions = [5, 10, 15, 20];
const recurrenceOptions = [
  'No repeat',
  'Every day',
  'Every weekday',
  'Every thursday',
  'Every month on 19th',
];

export function ProductivityBento({
  id = 'feature-section-1',
  standalone = false,
}: {
  id?: string;
  standalone?: boolean;
}) {
  // Card 1: Time tracking
  const [overtimeSec, setOvertimeSec] = useState(9);
  const [trackingActive, setTrackingActive] = useState(false);

  useEffect(() => {
    if (!trackingActive) return;
    const t = window.setInterval(() => setOvertimeSec((s) => s + 1), 1000);
    return () => window.clearInterval(t);
  }, [trackingActive]);

  // Card 2: Focused Intervals
  const [intervalsOn, setIntervalsOn] = useState(true);
  const [sprintMin, setSprintMin] = useState(60);
  const [breakMin, setBreakMin] = useState(15);
  const [openMenu, setOpenMenu] = useState<'sprint' | 'break' | null>(null);

  // Card 3: Schedule tasks
  const [selectedDay, setSelectedDay] = useState(7);
  const [hour, setHour] = useState('09');
  const [ampm, setAmpm] = useState<'AM' | 'PM'>('AM');
  const [recurrence, setRecurrence] = useState('Every day');
  const [scheduleSavedMsg, setScheduleSavedMsg] = useState('');

  // Card 4: Checklist joy
  const [checklist, setChecklist] = useState([
    { id: 'web', label: 'Web design', done: true },
    { id: 'ds', label: 'Design system', done: false },
    { id: 'framer', label: 'Framer web development', done: false },
  ]);

  // Card 6: Notes
  const [noteBold, setNoteBold] = useState(false);
  const [noteItalic, setNoteItalic] = useState(false);

  // Card 7: Share list copy
  const [copied, setCopied] = useState(false);
  const [shareEmail, setShareEmail] = useState('');
  const [shareMsg, setShareMsg] = useState('');

  // Card 8: Alerts
  const [alertAck, setAlertAck] = useState(false);

  const toggleCheck = (itemId: string) => {
    setChecklist((prev) => prev.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c)));
  };

  const handleCopyLink = async () => {
    const demoUrl = 'https://todofusion.local/shared/web-design-list';
    try {
      await navigator.clipboard?.writeText(demoUrl);
    } catch {
      // clipboard fallback
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const handleShareSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shareEmail.trim() || !shareEmail.includes('@')) {
      setShareMsg('Enter a valid email to preview share.');
      return;
    }
    setShareMsg(`Demo preview: shared list with ${shareEmail.trim()}`);
    setShareEmail('');
  };

  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  return (
    <section
      id={id}
      className={styles.section}
      style={standalone ? { paddingTop: 0 } : undefined}
      aria-label="Productivity features"
    >
      <div className={styles.header}>
        <SplitHeading
          as="h2"
          primary="All you need to get"
          muted="sharp focus and crush it"
        />
        <p className={styles.subtitle}>
          Transform task management with TodoFusion. Combine powerful to-do lists, productivity
          tracking, and seamless integrations to stay focused and achieve more
        </p>
      </div>

      <div className={styles.grid}>
        {/* 01. Time tracking */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Time tracking</h3>
            <p className={styles.cardDesc}>
              Estimate how long you might take for a task, track done time and overtime.
            </p>
          </div>
          <div className={styles.inset}>
            <button
              type="button"
              className={styles.timerRow}
              onClick={() => setTrackingActive((v) => !v)}
              title={trackingActive ? 'Pause overtime demo' : 'Start overtime demo'}
              style={{ cursor: 'pointer', width: '100%', textAlign: 'left' }}
            >
              <span className={styles.timerLabel}>Web design</span>
              <span className={styles.timerLime}>
                +00:00:{String(overtimeSec).padStart(2, '0')}
              </span>
            </button>
            <div className={styles.timerMetaRow}>
              <span style={{ color: 'var(--text-muted)' }}>Est: 1hr 30min</span>
              <span style={{ color: 'var(--accent-lime)', fontWeight: 500 }}>Done: 2hr 32min</span>
            </div>
          </div>
        </article>

        {/* 02. Focused Intervals */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Focused Intervals</h3>
            <p className={styles.cardDesc}>Technique to work in fixed intervals &amp; breaks.</p>
          </div>
          <div className={styles.inset}>
            <div className={styles.toggleRow}>
              <span>Intervals</span>
              <button
                type="button"
                role="switch"
                aria-checked={intervalsOn}
                aria-label="Toggle focused intervals"
                className={styles.switchBtn}
                onClick={() => setIntervalsOn((v) => !v)}
                style={{
                  backgroundColor: intervalsOn ? 'var(--text-primary)' : 'var(--border-subtle)',
                }}
              >
                <span
                  className={styles.switchKnob}
                  style={{
                    backgroundColor: intervalsOn ? 'var(--page-background)' : '#ffffff',
                    transform: intervalsOn ? 'translateX(16px)' : 'translateX(0)',
                  }}
                />
              </button>
            </div>

            <div className={styles.intervalRow} style={{ opacity: intervalsOn ? 1 : 0.45 }}>
              <span>Work sprint</span>
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={styles.pickerBtn}
                  aria-expanded={openMenu === 'sprint'}
                  aria-haspopup="listbox"
                  onClick={() => setOpenMenu(openMenu === 'sprint' ? null : 'sprint')}
                >
                  <span>{sprintMin} min</span>
                  <ChevronDown size={12} />
                </button>
                {openMenu === 'sprint' ? (
                  <div className={styles.popover} role="listbox" aria-label="Work sprint duration">
                    {sprintOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="option"
                        aria-selected={sprintMin === m}
                        className={`${styles.popoverOption} ${sprintMin === m ? styles.popoverOptionActive : ''}`}
                        onClick={() => {
                          setSprintMin(m);
                          setOpenMenu(null);
                        }}
                      >
                        {m} min
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>

            <div className={styles.intervalRow} style={{ opacity: intervalsOn ? 1 : 0.45 }}>
              <span>Break</span>
              <div style={{ position: 'relative' }}>
                <button
                  type="button"
                  className={styles.pickerBtn}
                  aria-expanded={openMenu === 'break'}
                  aria-haspopup="listbox"
                  onClick={() => setOpenMenu(openMenu === 'break' ? null : 'break')}
                >
                  <span>{breakMin} min</span>
                  <ChevronDown size={12} />
                </button>
                {openMenu === 'break' ? (
                  <div className={styles.popover} role="listbox" aria-label="Break duration">
                    {breakOptions.map((m) => (
                      <button
                        key={m}
                        type="button"
                        role="option"
                        aria-selected={breakMin === m}
                        className={`${styles.popoverOption} ${breakMin === m ? styles.popoverOptionActive : ''}`}
                        onClick={() => {
                          setBreakMin(m);
                          setOpenMenu(null);
                        }}
                      >
                        {m} min
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </article>

        {/* 03. Schedule tasks (Spans 2 rows on desktop) */}
        <article className={`${styles.card} ${styles.scheduleCard}`}>
          <div>
            <h3 className={styles.cardTitle}>Schedule tasks</h3>
            <p className={styles.cardDesc}>
              Schedule one-time or recurring tasks exactly when you want.
            </p>
          </div>

          <div className={styles.scheduleStage}>
            <div className={styles.calendarPanel}>
              <div className={styles.quickChips}>
                {[
                  { label: 'Today', day: 7 },
                  { label: 'Later today', day: 7 },
                  { label: 'Tomorrow', day: 8 },
                  { label: 'Next week', day: 14 },
                ].map((c) => (
                  <button
                    key={c.label}
                    type="button"
                    className={styles.quickChip}
                    onClick={() => setSelectedDay(c.day)}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              <div className={styles.calHeader}>
                <ChevronLeft size={12} aria-hidden="true" />
                <span>January 2024</span>
                <ChevronRight size={12} aria-hidden="true" />
              </div>

              <div className={styles.calGrid}>
                {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((d) => (
                  <span key={d} className={styles.calDayName}>
                    {d}
                  </span>
                ))}
                {/* Jan 1, 2024 was Monday -> 1 empty offset */}
                <span />
                {days.map((day) => (
                  <button
                    key={day}
                    type="button"
                    onClick={() => setSelectedDay(day)}
                    className={`${styles.calDayBtn} ${selectedDay === day ? styles.calDayActive : ''}`}
                    aria-label={`January ${day}, 2024`}
                    aria-pressed={selectedDay === day}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.recurrencePanel}>
              <div className={styles.calHeader} style={{ marginBottom: 2 }}>
                <span style={{ color: 'var(--text-muted)' }}>‹ Pick date</span>
                <span style={{ color: 'var(--text-muted)' }}>January 2024</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Add time</strong>
                <span style={{ color: 'var(--text-muted)' }}>× Cancel</span>
              </div>

              <div className={styles.timeInputs}>
                <button
                  type="button"
                  className={styles.timeChip}
                  onClick={() => setHour((h) => (h === '09' ? '10' : '09'))}
                >
                  {hour}
                </button>
                <span className={styles.timeChip}>30</span>
                <button
                  type="button"
                  className={styles.timeChip}
                  onClick={() => setAmpm((v) => (v === 'AM' ? 'PM' : 'AM'))}
                >
                  {ampm} ▾
                </button>
              </div>

              <strong style={{ color: 'var(--text-primary)', marginTop: 2 }}>
                Recurring schedule
              </strong>
              <div className={styles.recurList}>
                {recurrenceOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRecurrence(opt)}
                    className={`${styles.recurBtn} ${recurrence === opt ? styles.recurBtnActive : ''}`}
                  >
                    <span style={{ width: 12, display: 'inline-flex' }}>
                      {recurrence === opt ? <Check size={11} /> : null}
                    </span>
                    <span>{opt}</span>
                  </button>
                ))}
              </div>

              <div className={styles.actionPair}>
                <button
                  type="button"
                  className={styles.btnDarkSmall}
                  onClick={() => {
                    setSelectedDay(7);
                    setRecurrence('Every day');
                    setScheduleSavedMsg('');
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className={styles.btnCyanSmall}
                  onClick={() =>
                    setScheduleSavedMsg(`Jan ${selectedDay}, ${hour}:30 ${ampm} (${recurrence})`)
                  }
                >
                  Save
                </button>
              </div>
              {scheduleSavedMsg ? (
                <p style={{ fontSize: 10, color: 'var(--accent-cyan)', marginTop: 2 }}>
                  Draft: {scheduleSavedMsg}
                </p>
              ) : null}
            </div>
          </div>
        </article>

        {/* 04. Checklist joy */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Checklist joy</h3>
            <p className={styles.cardDesc}>
              Experience the joy of completing tasks with our satisfying checklists. Try it out
              below!
            </p>
          </div>
          <div className={styles.inset}>
            {checklist.map((item) => (
              <button
                key={item.id}
                type="button"
                role="checkbox"
                aria-checked={item.done}
                className={styles.checkRow}
                onClick={() => toggleCheck(item.id)}
              >
                <span className={`${styles.checkCircle} ${item.done ? styles.checkCircleDone : ''}`}>
                  {item.done ? <Check size={11} strokeWidth={3} /> : null}
                </span>
                <span
                  style={{
                    color: item.done ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: item.done ? 'line-through' : 'none',
                  }}
                >
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </article>

        {/* 05. Task hub */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Task hub</h3>
            <p className={styles.cardDesc}>
              Organize and centralize your tasks into distinct lists for various purposes.
            </p>
          </div>
          <div className={styles.inset}>
            <div className={styles.hubHeader}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span className={styles.hubBadge}>W</span>
                <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>
                  Web design
                </span>
              </div>
              <MoreVertical size={14} color="var(--text-muted)" aria-hidden="true" />
            </div>
            <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>Upcoming</span>
            <div className={styles.hubRow}>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>1</span>
              <span>Hero section</span>
            </div>
            <div className={styles.hubRow}>
              <span style={{ color: 'var(--text-muted)', fontSize: 12 }}>2</span>
              <span>Feature section</span>
            </div>
          </div>
        </article>

        {/* 06. Notes */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Notes</h3>
            <p className={styles.cardDesc}>
              Attatch notes to your tasks with links or any fleeting thought, auto open links when
              your task goes live.
            </p>
          </div>
          <div className={styles.inset}>
            <div className={styles.noteToolbar}>
              <button
                type="button"
                aria-label="Toggle bold preview"
                aria-pressed={noteBold}
                className={`${styles.noteToolBtn} ${noteBold ? styles.noteToolBtnActive : ''}`}
                onClick={() => setNoteBold((v) => !v)}
              >
                <Bold size={12} />
              </button>
              <button
                type="button"
                aria-label="Toggle italic preview"
                aria-pressed={noteItalic}
                className={`${styles.noteToolBtn} ${noteItalic ? styles.noteToolBtnActive : ''}`}
                onClick={() => setNoteItalic((v) => !v)}
              >
                <Italic size={12} />
              </button>
              <span className={styles.noteToolBtn} aria-hidden="true">
                <Link2 size={12} />
              </span>
              <span className={styles.noteToolBtn} aria-hidden="true">
                <List size={12} />
              </span>
            </div>
            <div
              style={{
                fontSize: 12,
                lineHeight: '18px',
                fontWeight: noteBold ? 600 : 400,
                fontStyle: noteItalic ? 'italic' : 'normal',
                color: 'var(--text-secondary)',
              }}
            >
              <div style={{ color: 'var(--text-primary)', fontWeight: 500 }}>Framer web design</div>
              <div style={{ color: 'var(--accent-purple-light)', fontSize: 11 }}>
                Codify.framer.website
              </div>
              <ul style={{ marginTop: 6, paddingLeft: 16, fontSize: 11 }}>
                <li>Elements</li>
                <li>Colors</li>
                <li>Grid design system</li>
                <li>Typography</li>
              </ul>
            </div>
          </div>
        </article>

        {/* 07. Share list copy */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Share list copy</h3>
            <p className={styles.cardDesc}>
              Share a copy of your list to anyone so they can use it in their account.
            </p>
          </div>
          <div className={styles.inset}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>
                Share this file
              </span>
              <button
                type="button"
                onClick={handleCopyLink}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--accent-purple-light)',
                  fontSize: 11,
                  fontWeight: 500,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  cursor: 'pointer',
                }}
              >
                <Copy size={11} />
                <span>{copied ? 'Copied!' : 'Copy link'}</span>
              </button>
            </div>
            <form onSubmit={handleShareSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <input
                type="email"
                value={shareEmail}
                onChange={(e) => setShareEmail(e.target.value)}
                placeholder="Send via email"
                aria-label="Send list via email"
                className={styles.shareInput}
              />
              <button type="submit" className={styles.shareLightBtn}>
                <span>Share your list</span>
                <ArrowRight size={13} />
              </button>
              {shareMsg ? (
                <p style={{ fontSize: 11, color: 'var(--accent-purple-light)' }}>{shareMsg}</p>
              ) : null}
            </form>
          </div>
        </article>

        {/* 08. Alerts */}
        <article className={styles.card}>
          <div>
            <h3 className={styles.cardTitle}>Alerts</h3>
            <p className={styles.cardDesc}>Get instant reminders for upcoming tasks.</p>
          </div>
          <div className={styles.inset}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className={styles.alertTitle}>Tasks due now</span>
              <button
                type="button"
                onClick={() => setAlertAck((v) => !v)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--text-muted)',
                  fontSize: 11,
                  cursor: 'pointer',
                }}
              >
                {alertAck ? 'Reset' : 'Dismiss'}
              </button>
            </div>
            <p style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              {alertAck
                ? 'All scheduled reminders acknowledged.'
                : 'You have 3 scheduled tasks due now'}
            </p>
            {!alertAck ? (
              <div className={styles.timerRow}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--text-primary)' }}>
                    Figma design
                  </div>
                  <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>1hr 30min</div>
                </div>
                <span style={{ fontSize: 12, color: 'var(--text-muted)', fontVariantNumeric: 'tabular-nums' }}>
                  00:00
                </span>
              </div>
            ) : null}
          </div>
        </article>
      </div>
    </section>
  );
}
