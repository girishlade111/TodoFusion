import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  showWordmark?: boolean;
  href?: string;
  size?: number;
  inverted?: boolean;
}

export function BrandMark({ size = 32, inverted = false }: { size?: number; inverted?: boolean }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.25),
        background: inverted ? 'var(--text-primary)' : '#ffffff',
        color: inverted ? 'var(--page-background)' : '#121218',
        flexShrink: 0,
        boxShadow: '0 2px 8px rgba(0,0,0,0.18)',
      }}
      aria-hidden="true"
    >
      <svg
        width={Math.round(size * 0.45)}
        height={Math.round(size * 0.45)}
        viewBox="0 0 12 12"
        fill="none"
      >
        <path
          d="M 12 3.5 L 12 2 L 10 0 L 0 0 L 0 3.5 L 6.5 3.5 L 0 9.25 L 2.45 12 L 8.75 6.25 L 8.5 6.48 L 8.5 12 L 12 12 L 12 8.98 L 8.75 6.25 Z"
          fill="currentColor"
        />
      </svg>
    </span>
  );
}

export function BrandLogo({ showWordmark = false, href = '/', size = 32 }: BrandLogoProps) {
  const content = (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <BrandMark size={size} />
      {showWordmark ? (
        <span style={{ fontSize: 18, fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1 }}>
          <span style={{ color: 'var(--text-primary)' }}>Todo</span>
          <span style={{ color: 'var(--text-secondary)' }}>Fusion</span>
        </span>
      ) : null}
    </span>
  );

  if (!href) return content;
  return (
    <Link href={href} aria-label="TodoFusion Home" style={{ display: 'inline-flex', alignItems: 'center' }}>
      {content}
    </Link>
  );
}
