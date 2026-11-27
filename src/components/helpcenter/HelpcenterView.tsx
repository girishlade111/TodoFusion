'use client';

import React, { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import {
  helpcenterCategories,
  helpcenterQuestions,
  type HelpCategory,
} from '@/content/helpcenter';

export function HelpcenterView({
  standalone = false,
  initialCategory = 'All',
  limit,
}: {
  standalone?: boolean;
  initialCategory?: HelpCategory;
  limit?: number;
}) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<HelpCategory>(initialCategory);
  const [openId, setOpenId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = helpcenterQuestions.filter((item) => {
      const catMatch = category === 'All' || item.category === category;
      if (!catMatch) return false;
      if (!q) return true;
      return (
        item.question.toLowerCase().includes(q) ||
        item.answer.toLowerCase().includes(q) ||
        item.keywords.some((k) => k.toLowerCase().includes(q))
      );
    });
    return limit ? list.slice(0, limit) : list;
  }, [query, category, limit]);

  return (
    <section
      style={{
        maxWidth: 680,
        margin: '0 auto',
        padding: standalone ? '0 24px' : '72px 24px 0',
      }}
      aria-label="Helpcenter"
    >
      {!standalone ? (
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1
            style={{
              fontSize: 'clamp(32px, 4.5vw, 48px)',
              lineHeight: 1.18,
              fontWeight: 600,
              color: 'var(--text-primary)',
            }}
          >
            How can we help?
          </h1>
          <p style={{ marginTop: 10, fontSize: 15, color: 'var(--text-secondary)' }}>
            Find the answers to all your questions.
          </p>
        </div>
      ) : null}

      {/* Search bar */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          borderRadius: 10,
          border: '1px solid var(--border-subtle)',
          background: 'var(--surface-primary)',
          padding: '0 14px',
          height: 44,
        }}
      >
        <Search size={16} color="var(--text-muted)" aria-hidden="true" />
        <label htmlFor="helpcenter-search" className="skip-link">
          Search help articles
        </label>
        <input
          id="helpcenter-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search something"
          style={{
            flex: 1,
            border: 'none',
            background: 'transparent',
            outline: 'none',
            paddingLeft: 10,
            fontSize: 14,
            color: 'var(--text-primary)',
          }}
        />
      </div>

      {/* Category Filter Row */}
      <div
        style={{
          marginTop: 14,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          flexWrap: 'wrap',
        }}
      >
        <span style={{ fontSize: 13, color: 'var(--text-muted)' }}>Filter by:</span>
        {helpcenterCategories.map((cat) => {
          const active = category === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              aria-pressed={active}
              style={{
                padding: '5px 12px',
                borderRadius: 7,
                border: '1px solid transparent',
                background: active ? 'var(--button-light-bg)' : 'transparent',
                color: active ? 'var(--button-light-text)' : 'var(--text-secondary)',
                fontSize: 13,
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background-color 150ms ease, color 150ms ease',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Questions List */}
      <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
        {filtered.length === 0 ? (
          <div
            style={{
              borderRadius: 12,
              border: '1px solid var(--border-subtle)',
              background: 'var(--surface-primary)',
              padding: 28,
              textAlign: 'center',
            }}
          >
            <p style={{ fontSize: 15, color: 'var(--text-primary)', fontWeight: 500 }}>
              No matching questions found
            </p>
            <p style={{ marginTop: 6, fontSize: 13, color: 'var(--text-secondary)' }}>
              Try another keyword or reset your filters.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setCategory('All');
              }}
              style={{
                marginTop: 14,
                padding: '7px 14px',
                borderRadius: 8,
                border: '1px solid var(--border-subtle)',
                background: 'var(--surface-raised)',
                color: 'var(--text-primary)',
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          filtered.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                style={{
                  borderRadius: 12,
                  border: '1px solid var(--border-subtle)',
                  background: 'var(--surface-primary)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenId(isOpen ? null : item.id)}
                  style={{
                    width: '100%',
                    padding: '18px 20px',
                    background: 'transparent',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: 16,
                    textAlign: 'left',
                    color: 'var(--text-primary)',
                    fontSize: 14,
                    fontWeight: 500,
                    lineHeight: '20px',
                    cursor: 'pointer',
                  }}
                >
                  <span>{item.question}</span>
                  <Plus
                    size={16}
                    color="var(--text-muted)"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                      transition: 'transform 180ms ease',
                    }}
                  />
                </button>
                {isOpen ? (
                  <div
                    style={{
                      padding: '0 20px 18px',
                      fontSize: 14,
                      lineHeight: '22px',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    {item.answer}
                  </div>
                ) : null}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
