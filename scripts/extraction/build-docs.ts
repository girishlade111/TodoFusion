import fs from 'node:fs';

const docsRaw = JSON.parse(fs.readFileSync('research/reference/content/docs-all.json', 'utf8'));

const order = [
  { slug: 'account', groupId: 'getting-started', groupLabel: 'Getting Started', label: 'Account' },
  { slug: 'dashboard', groupId: 'getting-started', groupLabel: 'Getting Started', label: 'Dashboard' },
  { slug: 'managing-tasks', groupId: 'getting-started', groupLabel: 'Getting Started', label: 'Managing Tasks' },
  { slug: 'integrations', groupId: 'integrations', groupLabel: 'Integrations', label: 'Todo Integrations' },
  { slug: 'set-up-integrations', groupId: 'integrations', groupLabel: 'Integrations', label: 'Set Up Integrations' },
  { slug: 'third-party-platforms', groupId: 'integrations', groupLabel: 'Integrations', label: 'Third-party Platforms' },
  { slug: 'inviting-team-members', groupId: 'collaboration', groupLabel: 'Collaboration', label: 'Inviting Team Members' },
  { slug: 'tasks-and-deadlines', groupId: 'collaboration', groupLabel: 'Collaboration', label: 'Tasks and Deadlines' },
  { slug: 'discussions', groupId: 'collaboration', groupLabel: 'Collaboration', label: 'Discussions' },
  { slug: 'task-automation', groupId: 'advanced-features', groupLabel: 'Advanced features', label: 'Task Automation' },
  { slug: 'reporting-and-analytics', groupId: 'advanced-features', groupLabel: 'Advanced features', label: 'Reporting' },
  { slug: 'customizing-todofusion', groupId: 'advanced-features', groupLabel: 'Advanced features', label: 'Customizing Todo' },
];

function parseDocBody(raw: { title: string; bodyText: string; blocks: Array<{ tag: string; text: string }> }, meta: typeof order[0], idx: number) {
  const lines = raw.bodyText.split('\n');
  // Find start after sidebar "Customizing Todo"
  const sidebarEnd = lines.findIndex((l) => l.trim() === 'Customizing Todo');
  const afterSidebar = sidebarEnd >= 0 ? lines.slice(sidebarEnd + 1) : lines;
  // Find footer copyright
  const copyIdx = afterSidebar.findIndex((l) => l.trim().startsWith('© Copyright'));
  const contentLines = copyIdx >= 0 ? afterSidebar.slice(0, copyIdx) : afterSidebar;

  // Strip trailing Previous / Next card labels
  while (contentLines.length > 0) {
    const last = contentLines[contentLines.length - 1].trim();
    if (!last || last === 'Next' || last === 'Previous' || order.some((o) => o.label === last)) {
      contentLines.pop();
    } else {
      break;
    }
  }

  // Strip top breadcrumb group & h1 title
  const headingSet = new Set(
    (raw.blocks || []).filter((b) => b.tag === 'H4' || b.tag === 'H3').map((b) => b.text.trim())
  );

  // Skip initial group label + article title
  let i = 0;
  while (i < contentLines.length && !contentLines[i].trim()) i++;
  if (contentLines[i]?.trim().toLowerCase() === meta.groupLabel.toLowerCase()) i++;
  while (i < contentLines.length && !contentLines[i].trim()) i++;
  if (contentLines[i]?.trim() === meta.label || contentLines[i]?.trim() === raw.title) i++;

  // Build structured blocks including code blocks (lines starting with // Example or PATCH/GET/POST/PUT/DELETE or { )
  const parsed: Array<{ type: 'heading' | 'paragraph' | 'code'; text: string }> = [];
  let inCode = false;
  let codeBuf: string[] = [];
  let braceDepth = 0;

  for (; i < contentLines.length; i++) {
    const line = contentLines[i];
    const trimmed = line.trim();

    if (!inCode && (trimmed.startsWith('//') || /^(GET|POST|PATCH|PUT|DELETE)\s+\/api\//.test(trimmed))) {
      inCode = true;
      codeBuf = [line];
      braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      continue;
    }

    if (inCode) {
      if (trimmed.startsWith('Step ') && braceDepth <= 0) {
        parsed.push({ type: 'code', text: codeBuf.join('\n').trim() });
        codeBuf = [];
        inCode = false;
      } else {
        codeBuf.push(line);
        braceDepth += (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
        if (braceDepth === 0 && trimmed === '}') {
          parsed.push({ type: 'code', text: codeBuf.join('\n').trim() });
          codeBuf = [];
          inCode = false;
        }
        continue;
      }
    }

    if (!trimmed) continue;

    if (headingSet.has(trimmed)) {
      parsed.push({ type: 'heading', text: trimmed });
    } else {
      parsed.push({ type: 'paragraph', text: trimmed });
    }
  }
  if (codeBuf.length > 0) {
    parsed.push({ type: 'code', text: codeBuf.join('\n').trim() });
  }

  const desc = parsed.find((b) => b.type === 'paragraph')?.text || '';
  return {
    id: meta.slug,
    slug: meta.slug,
    title: meta.label,
    heading: raw.title || meta.label,
    groupId: meta.groupId,
    groupLabel: meta.groupLabel,
    description: desc,
    blocks: parsed,
    previousSlug: idx > 0 ? order[idx - 1].slug : null,
    nextSlug: idx < order.length - 1 ? order[idx + 1].slug : null,
    order: idx + 1,
  };
}

const articles = order.map((meta, idx) => parseDocBody(docsRaw[`/docs/${meta.slug}`], meta, idx));

const out = `export interface DocContentBlock {
  type: 'heading' | 'paragraph' | 'code';
  text: string;
}

export interface DocArticle {
  id: string;
  slug: string;
  title: string;
  heading: string;
  groupId: string;
  groupLabel: string;
  description: string;
  blocks: DocContentBlock[];
  previousSlug: string | null;
  nextSlug: string | null;
  order: number;
}

export const docGroups = [
  { id: 'getting-started', label: 'Getting Started', accent: 'purple' as const, firstSlug: 'account' },
  { id: 'integrations', label: 'Integrations', accent: 'orange' as const, firstSlug: 'integrations' },
  { id: 'collaboration', label: 'Collaboration', accent: 'pink' as const, firstSlug: 'inviting-team-members' },
  { id: 'advanced-features', label: 'Advanced features', accent: 'lime' as const, firstSlug: 'task-automation' },
];

export const docArticles: DocArticle[] = ${JSON.stringify(articles, null, 2)};
`;

fs.writeFileSync('src/content/docs.ts', out);
console.log('Generated src/content/docs.ts with', articles.length, 'articles');
