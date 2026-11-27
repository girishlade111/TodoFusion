'use client';

import React, { useState } from 'react';
import styles from './DocumentationShell.module.css';

export function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
    } catch {
      // ignore
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={styles.codeBox}>
      <button type="button" onClick={handleCopy} className={styles.copyCodeBtn}>
        {copied ? 'Copied' : 'Copy'}
      </button>
      <pre className={styles.codePre}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
