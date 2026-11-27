import React from 'react';

interface SplitHeadingProps {
  as?: 'h1' | 'h2' | 'h3';
  primary: string;
  muted?: string;
  accent?: string;
  breakBeforeMuted?: boolean;
  breakBeforeAccent?: boolean;
  align?: 'left' | 'center';
  size?: 'hero' | 'section' | 'card';
  className?: string;
}

export function SplitHeading({
  as: Tag = 'h2',
  primary,
  muted,
  accent,
  breakBeforeMuted = false,
  breakBeforeAccent = false,
  align = 'center',
  size = 'section',
  className = '',
}: SplitHeadingProps) {
  const sizeStyles: React.CSSProperties =
    size === 'hero'
      ? {
          fontSize: 'clamp(34px, 5vw, 56px)',
          lineHeight: '1.14',
          fontWeight: 600,
          letterSpacing: '-0.02em',
        }
      : size === 'card'
        ? {
            fontSize: 'clamp(22px, 3vw, 28px)',
            lineHeight: '1.25',
            fontWeight: 600,
            letterSpacing: '-0.015em',
          }
        : {
            fontSize: 'clamp(28px, 3.5vw, 36px)',
            lineHeight: '1.33',
            fontWeight: 600,
            letterSpacing: '-0.015em',
          };

  return (
    <Tag
      className={className}
      style={{
        ...sizeStyles,
        textAlign: align,
        color: 'var(--text-primary)',
        textWrap: 'balance',
      }}
    >
      <span>{primary}</span>
      {accent ? (
        <>
          {breakBeforeAccent ? <br /> : ' '}
          <span style={{ color: 'var(--accent-purple-light)' }}>{accent}</span>
        </>
      ) : null}
      {muted ? (
        <>
          {breakBeforeMuted ? <br /> : ' '}
          <span style={{ color: 'var(--text-heading-muted)' }}>{muted}</span>
        </>
      ) : null}
    </Tag>
  );
}
