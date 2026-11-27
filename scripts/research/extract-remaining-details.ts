import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'https://todofusion.framer.website';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const out: Record<string, any> = {};

  // 1. Dark vs Light CSS variables on <html>
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.evaluate(() => document.fonts.ready);

  const readTokenMap = async () =>
    await page.evaluate(() => {
      const cs = getComputedStyle(document.documentElement);
      const map: Record<string, string> = {};
      for (const sheet of Array.from(document.styleSheets)) {
        try {
          for (const rule of Array.from(sheet.cssRules)) {
            if (rule instanceof CSSStyleRule) {
              for (let i = 0; i < rule.style.length; i++) {
                const prop = rule.style[i];
                if (prop.startsWith('--token-')) {
                  map[prop] = cs.getPropertyValue(prop).trim();
                }
              }
            }
          }
        } catch {}
      }
      return {
        bodyBg: getComputedStyle(document.body).backgroundColor,
        tokens: map,
      };
    });

  out.darkTokens = await readTokenMap();

  // Dwell through Home so all whileInView animations complete
  await page.evaluate(async () => {
    for (let y = 0; y <= document.body.scrollHeight; y += 500) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 450));
    }
    await new Promise((r) => setTimeout(r, 700));
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
  });
  await page.screenshot({ path: 'research/reference/screenshots/desktop/dark/home-settled.png', fullPage: true });

  // Capture closeups of Bento, Analytics, Newsletter, Footer
  await page.evaluate(() => window.scrollTo(0, 1600));
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'research/reference/screenshots/desktop/dark/home-bento.png' });

  await page.evaluate(() => window.scrollTo(0, 3000));
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'research/reference/screenshots/desktop/dark/home-analytics.png' });

  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight - 900));
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'research/reference/screenshots/desktop/dark/home-footer.png' });

  // Click Resources dropdown in header
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  const resEl = page.locator('header').getByText('Resources').first();
  const resBox = await resEl.boundingBox();
  if (resBox) {
    await page.mouse.move(resBox.x + resBox.width / 2, resBox.y + resBox.height / 2);
    await page.waitForTimeout(400);
    await page.mouse.click(resBox.x + resBox.width / 2, resBox.y + resBox.height / 2);
    await page.waitForTimeout(500);
    out.resourcesDropdownLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href]'))
        .map((a) => {
          const r = a.getBoundingClientRect();
          return {
            text: (a.textContent || '').trim().replace(/\s+/g, ' '),
            href: a.getAttribute('href'),
            top: Math.round(r.top),
            left: Math.round(r.left),
            w: Math.round(r.width),
            h: Math.round(r.height),
          };
        })
        .filter((x) => x.w > 0 && x.h > 0 && x.top > 40 && x.top < 500);
    });
    await page.screenshot({ path: 'research/reference/interactions/resources-open.png' });
    await page.mouse.click(10, 10);
  }

  // Toggle to Light Mode and read tokens
  const moonSvg = page.locator('header svg').last();
  const moonBox = await moonSvg.boundingBox();
  if (moonBox) {
    await page.mouse.click(moonBox.x + moonBox.width / 2, moonBox.y + moonBox.height / 2);
    await page.waitForTimeout(600);
    out.lightTokens = await readTokenMap();
    // Switch back to dark for remaining tests
    await page.mouse.click(moonBox.x + moonBox.width / 2, moonBox.y + moonBox.height / 2);
    await page.waitForTimeout(400);
  }

  // 2. Product demo interactive checks (Checklist, Intervals, Calendar, Notes, Share)
  await page.evaluate(() => window.scrollTo(0, 1750));
  await page.waitForTimeout(600);
  const checklistClickInfo = await page.evaluate(() => {
    const items = Array.from(document.querySelectorAll('p, div, span')).filter((e) =>
      ['Web design', 'Design system', 'Framer web development'].includes((e.textContent || '').trim())
    );
    return items.map((e) => {
      const r = e.getBoundingClientRect();
      return { text: e.textContent?.trim(), x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  });
  out.checklistClickInfo = checklistClickInfo;

  // 3. Pricing 3 avatars
  await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  await page.evaluate(async () => {
    window.scrollTo(0, 900);
    await new Promise((r) => setTimeout(r, 600));
  });
  const avatarBtns = await page.evaluate(() => {
    const imgs = Array.from(document.querySelectorAll('img')).filter((i) => {
      const r = i.getBoundingClientRect();
      return r.width >= 32 && r.width <= 72 && r.top > 100 && r.top < 1400;
    });
    return imgs.map((i) => {
      const r = i.getBoundingClientRect();
      return { src: i.src, x: r.left + r.width / 2, y: r.top + r.height / 2 };
    });
  });
  const pricingTabResults: any[] = [];
  for (const ab of avatarBtns) {
    await page.mouse.click(ab.x, ab.y);
    await page.waitForTimeout(450);
    const quoteText = await page.evaluate(() => {
      const ps = Array.from(document.querySelectorAll('p, h3, h4')).map((e) => (e.textContent || '').trim());
      return ps.filter((t) => t.includes('"') || t.includes('“') || t.length > 15 && t.length < 220);
    });
    pricingTabResults.push({ src: ab.src, snippet: quoteText.slice(0, 20) });
  }
  out.pricingTabs = pricingTabResults;

  // 4. Helpcenter all 12 expanded answers
  await page.goto(`${BASE_URL}/helpcenter`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  await page.waitForTimeout(500);
  const helpCoords = await page.evaluate(() => {
    const els = Array.from(document.querySelectorAll('p, h3, h4, div')).filter((e) => {
      const t = (e.textContent || '').trim();
      return e.children.length === 0 && t.endsWith('?') && t.length > 15;
    });
    return els.map((e) => {
      const r = e.getBoundingClientRect();
      return { q: (e.textContent || '').trim(), x: r.left + 20, y: r.top + r.height / 2 };
    });
  });
  const helpAnswers: Record<string, string> = {};
  for (const hc of helpCoords) {
    await page.mouse.click(hc.x, hc.y);
    await page.waitForTimeout(350);
    const bodyNow = await page.evaluate(() => document.body.innerText);
    helpAnswers[hc.q] = bodyNow;
  }
  out.helpAnswersSnapshot = Object.entries(helpAnswers).map(([q, text]) => {
    const idx = text.indexOf(q);
    return { q, following: idx >= 0 ? text.slice(idx, idx + 450) : '' };
  });

  // 5. Contact page - check Contact support href / click
  await page.goto(`${BASE_URL}/contact`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  out.contactLinks = await page.evaluate(() =>
    Array.from(document.querySelectorAll('a[href]')).map((a) => ({
      text: (a.textContent || '').trim().replace(/\s+/g, ' '),
      href: a.getAttribute('href'),
    }))
  );

  // 6. Check /blog/the-art-of-user-centric-design
  await page.goto(`${BASE_URL}/blog/the-art-of-user-centric-design`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  out.extraBlogArticle = await page.evaluate(() => ({
    title: document.title,
    text: document.body.innerText,
    imgs: Array.from(document.querySelectorAll('img')).map((i) => ({ src: i.src, alt: i.alt })),
  }));

  // 7. Extract structured DOM content for all Docs (12), Integrations (12), Blog (8), UIKit
  const docsStructured: Record<string, any> = {};
  const docSlugs = [
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
  for (const slug of docSlugs) {
    await page.goto(`${BASE_URL}${slug}`, { waitUntil: 'domcontentloaded', timeout: 25000 });
    await page.waitForTimeout(400);
    docsStructured[slug] = await page.evaluate(() => {
      const main = document.querySelector('main') || document.body;
      const blocks = Array.from(main.querySelectorAll('h1, h2, h3, h4, p, li, pre, code')).map((el) => ({
        tag: el.tagName,
        text: (el.textContent || '').trim(),
      }));
      return {
        title: document.querySelector('h1')?.textContent?.trim() || '',
        bodyText: document.body.innerText,
        blocks: blocks.slice(0, 120),
      };
    });
  }
  out.docsStructured = docsStructured;

  await fs.writeFile('research/reference/remaining-details.json', JSON.stringify(out, null, 2));
  await browser.close();
  console.log('Done remaining details!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
