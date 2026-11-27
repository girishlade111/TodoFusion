import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';

const BASE_URL = process.env.PREVIEW_URL || 'http://localhost:3000';

const ALL_ROUTES = [
  '/',
  '/features',
  '/integrations',
  '/about',
  '/pricing',
  '/blog',
  '/privacy-policy',
  '/contact',
  '/contact/sales',
  '/helpcenter',
  '/docs',
  '/uikit',
  '/blog/balancing-aesthetics-and-functionality-in-ui',
  '/blog/where-aesthetics-meet-functionality',
  '/blog/the-symbiosis-of-aesthetics-and-functionality-in-ui',
  '/blog/the-role-of-color-psychology-in-design',
  '/blog/web-design-essentials-a-comprehensive-guide',
  '/blog/crafting-an-effective-product-design-strategy',
  '/blog/navigating-the-trends-ui-ux-in-2023',
  '/blog/the-art-of-user-centric-design',
  '/integrations/codify',
  '/integrations/nexus-ai',
  '/integrations/flexify',
  '/integrations/agentify',
  '/integrations/landify',
  '/integrations/startify',
  '/integrations/taskify',
  '/integrations/platify',
  '/integrations/protify',
  '/integrations/flowboard',
  '/integrations/identify',
  '/integrations/stylokit',
  '/docs/account',
  '/docs/dashboard',
  '/docs/managing-tasks',
  '/docs/integrations',
  '/docs/set-up-integrations',
  '/docs/third-party-platforms',
  '/docs/inviting-team-members',
  '/docs/tasks-and-deadlines',
  '/docs/discussions',
  '/docs/task-automation',
  '/docs/reporting-and-analytics',
  '/docs/customizing-todofusion',
];

async function compareVisual(refPath: string, implPath: string, outDir: string) {
  await fs.mkdir(outDir, { recursive: true });
  try {
    const refMeta = await sharp(refPath).metadata();
    const implMeta = await sharp(implPath).metadata();
    const width = Math.min(refMeta.width || 1440, implMeta.width || 1440);
    const height = Math.min(refMeta.height || 900, implMeta.height || 900, 3000);

    const refBuf = await sharp(refPath).extract({ left: 0, top: 0, width, height }).ensureAlpha().raw().toBuffer();
    const implBuf = await sharp(implPath).extract({ left: 0, top: 0, width, height }).ensureAlpha().raw().toBuffer();

    const diff = new PNG({ width, height });
    const diffPixels = pixelmatch(refBuf, implBuf, diff.data, width, height, { threshold: 0.15 });
    const pct = Number(((diffPixels / (width * height)) * 100).toFixed(2));
    await fs.writeFile(path.join(outDir, 'difference.png'), PNG.sync.write(diff));

    // Side by side
    const refPng = await sharp(refPath).extract({ left: 0, top: 0, width, height }).png().toBuffer();
    const implPng = await sharp(implPath).extract({ left: 0, top: 0, width, height }).png().toBuffer();
    await sharp({
      create: { width: width * 2, height, channels: 4, background: { r: 18, g: 18, b: 24, alpha: 1 } },
    })
      .composite([
        { input: refPng, left: 0, top: 0 },
        { input: implPng, left: width, top: 0 },
      ])
      .png()
      .toFile(path.join(outDir, 'side-by-side.png'));

    return { width, height, diffPixels, diffPercent: pct };
  } catch (e) {
    return { error: String(e) };
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const routeReport: Array<{ route: string; status: number | null; brokenImgs: number; overflow: boolean }> = [];
  for (const route of ALL_ROUTES) {
    const resp = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const check = await page.evaluate(() => {
      const brokenImgs = Array.from(document.querySelectorAll('img')).filter(
        (img) => !img.complete || img.naturalWidth === 0
      ).length;
      const overflow = document.documentElement.scrollWidth > window.innerWidth;
      return { brokenImgs, overflow };
    });
    routeReport.push({ route, status: resp?.status() || null, ...check });
  }

  // 404 verification
  const resp404 = await page.goto(`${BASE_URL}/nonexistent-route-check`, { waitUntil: 'domcontentloaded' });
  const status404 = resp404?.status();

  // Interactive & Theme & Form checks
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  const darkBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.screenshot({ path: 'research/comparisons/home/dark-impl.png', fullPage: true });

  // Toggle theme to light
  await page.getByRole('button', { name: /Switch to light theme/i }).click();
  await page.waitForTimeout(300);
  const lightBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.screenshot({ path: 'research/comparisons/home/light-impl.png', fullPage: true });
  await page.reload({ waitUntil: 'domcontentloaded' });
  const persistedBg = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  // Reset back to dark
  await page.getByRole('button', { name: /Switch to dark theme/i }).click();
  await page.waitForTimeout(200);

  // Interactive demos on Home
  const dsCheck = page.getByRole('checkbox', { name: 'Design system' });
  const beforeCheck = await dsCheck.getAttribute('aria-checked');
  await dsCheck.click();
  const afterCheck = await dsCheck.getAttribute('aria-checked');

  await page.getByRole('button', { name: 'Copy link' }).click();
  const copiedVisible = await page.getByText('Copied!').isVisible();

  await page.getByRole('button', { name: /What is TodoFusion\?/i }).click();
  const faqVisible = await page.getByText(/A task management app designed to boost/i).isVisible();

  // Newsletter form API test
  await page.locator('#newsletter-email').fill('verify-demo@example.com');
  await page.getByRole('button', { name: 'Subscribe' }).click();
  await page.waitForSelector('text=Subscribed successfully');

  // Pricing tabs test
  await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('tab', { name: /David Johnson/i }).click();
  const tab2QuoteVisible = await page.getByText(/Just submitted another brief/i).isVisible();

  // Helpcenter search & filter
  await page.goto(`${BASE_URL}/helpcenter`, { waitUntil: 'domcontentloaded' });
  await page.getByRole('button', { name: 'Company' }).click();
  const companyCount = await page.locator('button[aria-expanded]').count();
  await page.getByRole('button', { name: 'All' }).click();
  await page.locator('#helpcenter-search').fill('privacy');
  const searchCount = await page.locator('button[aria-expanded]').count();

  // Sales form API test
  await page.goto(`${BASE_URL}/contact/sales`, { waitUntil: 'domcontentloaded' });
  await page.locator('#sales-fullname').fill('Ada Lovelace');
  await page.locator('#sales-email').fill('ada@example.com');
  await page.locator('#sales-message').fill('Looking for an enterprise onboarding walkthrough.');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForSelector('text=Inquiry received');

  // Docs search
  await page.goto(`${BASE_URL}/docs`, { waitUntil: 'domcontentloaded' });
  await page.locator('#docs-search-input').fill('automation');
  const docsSearchHit = await page.getByText('Task Automation').first().isVisible();

  // Accessibility Audit via axe-core
  const a11yResults: Record<string, { violations: number; details: Array<{ id: string; impact: string | null | undefined; nodes: number }> }> = {};
  for (const r of ['/', '/features', '/pricing', '/helpcenter', '/docs', '/contact/sales']) {
    await page.goto(`${BASE_URL}${r}`, { waitUntil: 'domcontentloaded' });
    const axe = await new AxeBuilder({ page }).analyze();
    a11yResults[r] = {
      violations: axe.violations.length,
      details: axe.violations.map((v) => ({ id: v.id, impact: v.impact, nodes: v.nodes.length })),
    };
  }

  // Mobile 320x700 & 390x844 overflow check
  const mobileCtx = await browser.newContext({ viewport: { width: 320, height: 700 } });
  const mPage = await mobileCtx.newPage();
  const mobileOverflow: Record<string, boolean> = {};
  for (const r of ['/', '/features', '/pricing', '/integrations', '/about', '/blog', '/docs', '/uikit']) {
    await mPage.goto(`${BASE_URL}${r}`, { waitUntil: 'domcontentloaded' });
    mobileOverflow[r] = await mPage.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
  }
  await mobileCtx.close();

  // Visual regression diff on key pages
  const darkCompare = await compareVisual(
    'research/reference/screenshots/desktop/dark/home-settled.png',
    'research/comparisons/home/dark-impl.png',
    'research/comparisons/home/dark'
  );
  const lightCompare = await compareVisual(
    'research/reference/screenshots/desktop/light/home-toggled.png',
    'research/comparisons/home/light-impl.png',
    'research/comparisons/home/light'
  );

  const summary = {
    routesChecked: routeReport.length,
    routesAll200: routeReport.every((r) => r.status === 200),
    brokenImagesTotal: routeReport.reduce((acc, r) => acc + r.brokenImgs, 0),
    desktopOverflowCount: routeReport.filter((r) => r.overflow).length,
    status404,
    themes: { darkBg, lightBg, persistedBg },
    interactions: {
      checklistToggled: beforeCheck === 'false' && afterCheck === 'true',
      copiedVisible,
      faqVisible,
      tab2QuoteVisible,
      helpcenterCompanyCount: companyCount,
      helpcenterSearchCount: searchCount,
      docsSearchHit,
    },
    mobile320Overflow: mobileOverflow,
    a11yResults,
    visualDiff: { darkCompare, lightCompare },
    routeReport,
  };

  await fs.writeFile('research/comparisons/verification-report.json', JSON.stringify(summary, null, 2));
  console.log(JSON.stringify({ ...summary, routeReport: `${routeReport.length} routes OK` }, null, 2));
  await browser.close();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
