import React from 'react';

export function SectionEyebrow({
  children,
  align = 'center',
}: {
  children: React.ReactNode;
  align?: 'left' | 'center';
}) {
  return (
    <p
      style={{
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        color: 'var(--accent-purple-light)',
        textAlign: align,
        marginBottom: '12px',
      }}
    >
      {children}
    </p>
  );
}
