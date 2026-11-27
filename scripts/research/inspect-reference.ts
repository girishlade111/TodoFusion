import { chromium, Page, BrowserContext } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const BASE_URL = 'https://todofusion.framer.website';

const KNOWN_ROUTES = [
  '/',
  '/features',
  '/integrations',
  '/about',
  '/pricing',
  '/blog',
  '/privacy-policy',
  '/contact',
  '/helpcenter',
  '/docs',
  '/uikit',
  '/contact/sales',
  '/blog/balancing-aesthetics-and-functionality-in-ui',
  '/blog/where-aesthetics-meet-functionality',
  '/blog/the-symbiosis-of-aesthetics-and-functionality-in-ui',
  '/blog/the-role-of-color-psychology-in-design',
  '/blog/web-design-essentials-a-comprehensive-guide',
  '/blog/crafting-an-effective-product-design-strategy',
  '/blog/navigating-the-trends-ui-ux-in-2023',
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

const SCREENSHOT_ROUTES = [
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
  '/docs/account',
  '/uikit',
  '/integrations/codify',
  '/blog/balancing-aesthetics-and-functionality-in-ui',
];

function routeSlug(route: string): string {
  if (route === '/') return 'home';
  return route.replace(/^\//, '').replace(/\//g, '__');
}

async function scrollAndSettle(page: Page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const total = document.body.scrollHeight;
    const step = 600;
    for (let y = 0; y <= total; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 120));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 400));
    // Wait for visible images
    const imgs = Array.from(document.querySelectorAll('img'));
    await Promise.all(
      imgs.map((img) => {
        if (img.complete) return Promise.resolve();
        return new Promise((res) => {
          img.addEventListener('load', res, { once: true });
          img.addEventListener('error', res, { once: true });
          setTimeout(res, 4000);
        });
      })
    );
  });
}

async function extractPageData(page: Page, route: string) {
  return await page.evaluate((currentRoute) => {
    const title = document.title;
    const metaDesc =
      document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
    const canonical =
      document.querySelector('link[rel="canonical"]')?.getAttribute('href') || '';
    const ogImage =
      document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';

    const links = Array.from(document.querySelectorAll('a[href]')).map((a) => ({
      text: (a.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
      href: (a as HTMLAnchorElement).href,
      rawHref: a.getAttribute('href') || '',
    }));

    const imgs = Array.from(document.querySelectorAll('img')).map((img) => {
      const rect = img.getBoundingClientRect();
      const cs = getComputedStyle(img);
      return {
        src: img.currentSrc || img.src,
        rawSrc: img.getAttribute('src'),
        srcset: img.getAttribute('srcset'),
        alt: img.alt,
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
        renderWidth: Math.round(rect.width),
        renderHeight: Math.round(rect.height),
        objectFit: cs.objectFit,
        objectPosition: cs.objectPosition,
        opacity: cs.opacity,
      };
    });

    // Collect CSS background images & masks
    const bgMedia: Array<{ tag: string; bgImage: string; maskImage: string; selectorHint: string }> = [];
    const allEls = Array.from(document.querySelectorAll('*'));
    for (const el of allEls) {
      const cs = getComputedStyle(el);
      if (cs.backgroundImage !== 'none' || cs.maskImage !== 'none') {
        if (
          cs.backgroundImage.includes('url(') ||
          cs.backgroundImage.includes('repeating-linear-gradient') ||
          cs.maskImage !== 'none'
        ) {
          bgMedia.push({
            tag: el.tagName.toLowerCase(),
            bgImage: cs.backgroundImage.slice(0, 500),
            maskImage: cs.maskImage.slice(0, 300),
            selectorHint:
              (el.getAttribute('data-framer-name') || '') +
              '|' +
              (el.className?.toString().slice(0, 80) || ''),
          });
        }
      }
    }

    // Collect SVG snapshots
    const svgs = Array.from(document.querySelectorAll('svg')).map((svg) => {
      const rect = svg.getBoundingClientRect();
      return {
        width: Math.round(rect.width),
        height: Math.round(rect.height),
        viewBox: svg.getAttribute('viewBox'),
        framerName:
          svg.closest('[data-framer-name]')?.getAttribute('data-framer-name') || '',
        outerHTML: svg.outerHTML.slice(0, 2000),
      };
    });

    // Collect loaded fonts
    const fonts = Array.from(document.fonts).map((f) => ({
      family: f.family,
      weight: f.weight,
      style: f.style,
      status: f.status,
    }));

    // Collect @font-face rules
    const fontFaces: string[] = [];
    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          if (rule.type === CSSRule.FONT_FACE_RULE) {
            fontFaces.push(rule.cssText);
          }
        }
      } catch {
        // cross-origin
      }
    }

    // Typography & surface sampling
    const bodyCs = getComputedStyle(document.body);
    const rootCs = getComputedStyle(document.documentElement);
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4')).map((h) => {
      const cs = getComputedStyle(h);
      const rect = h.getBoundingClientRect();
      return {
        tag: h.tagName,
        text: (h.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 120),
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
        width: Math.round(rect.width),
      };
    });

    const visibleText = (document.body.innerText || '').trim();

    return {
      route: currentRoute,
      url: location.href,
      title,
      metaDesc,
      canonical,
      ogImage,
      htmlClass: document.documentElement.className,
      htmlAttrs: Array.from(document.documentElement.attributes).map((a) => [a.name, a.value]),
      bodyBg: bodyCs.backgroundColor,
      bodyBgImage: bodyCs.backgroundImage,
      bodyColor: bodyCs.color,
      bodyFont: bodyCs.fontFamily,
      rootBg: rootCs.backgroundColor,
      scrollHeight: document.body.scrollHeight,
      scrollWidth: document.documentElement.scrollWidth,
      links,
      imgs,
      bgMedia: bgMedia.slice(0, 100),
      svgCount: svgs.length,
      svgs: svgs.slice(0, 60),
      fonts,
      fontFaces: Array.from(new Set(fontFaces)),
      headings: headings.slice(0, 40),
      visibleText,
    };
  }, route);
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  });

  const networkAssets = new Map<string, { url: string; resourceType: string; status: number; contentType: string }>();
  const page = await context.newPage();

  page.on('response', (res) => {
    const type = res.request().resourceType();
    if (['image', 'font', 'media', 'stylesheet'].includes(type)) {
      networkAssets.set(res.url(), {
        url: res.url(),
        resourceType: type,
        status: res.status(),
        contentType: res.headers()['content-type'] || '',
      });
    }
  });

  // 1. Check robots.txt, sitemap.xml, and 404
  const metaChecks: Record<string, unknown> = {};
  for (const p of ['/robots.txt', '/sitemap.xml', '/this-route-does-not-exist-404']) {
    try {
      const resp = await page.goto(`${BASE_URL}${p}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      const text = await page.evaluate(() => document.body?.innerText?.slice(0, 2000) || '');
      metaChecks[p] = { status: resp?.status(), url: page.url(), text };
    } catch (e) {
      metaChecks[p] = { error: String(e) };
    }
  }
  await fs.writeFile('research/reference/meta-checks.json', JSON.stringify(metaChecks, null, 2));

  // 2. Visit all 43 routes to verify HTTP status, discover links, and extract content
  const allDiscoveredInternal = new Set<string>(KNOWN_ROUTES);
  const routeResults: Record<string, unknown> = {};

  for (const route of KNOWN_ROUTES) {
    console.log(`Visiting ${route}...`);
    try {
      const resp = await page.goto(`${BASE_URL}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000,
      }).catch(() => page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 30000 }));

      await scrollAndSettle(page);
      const data = await extractPageData(page, route);

      for (const l of data.links) {
        if (l.href.startsWith(BASE_URL)) {
          const u = new URL(l.href);
          if (!u.pathname.includes('.')) {
            allDiscoveredInternal.add(u.pathname);
          }
        }
      }

      routeResults[route] = {
        status: resp?.status() || null,
        finalUrl: page.url(),
        title: data.title,
        metaDesc: data.metaDesc,
        canonical: data.canonical,
        ogImage: data.ogImage,
        scrollHeight: data.scrollHeight,
        bodyBg: data.bodyBg,
        bodyColor: data.bodyColor,
        bodyFont: data.bodyFont,
        headings: data.headings,
        imgs: data.imgs,
        bgMedia: data.bgMedia,
        fonts: data.fonts,
        fontFaces: data.fontFaces,
        visibleText: data.visibleText,
        links: data.links,
        svgs: data.svgs,
      };

      // Capture dark desktop screenshot for key routes
      if (SCREENSHOT_ROUTES.includes(route)) {
        const slug = routeSlug(route);
        await page.screenshot({
          path: `research/reference/screenshots/desktop/dark/${slug}.png`,
          fullPage: true,
        });
      }
    } catch (err) {
      console.error(`Error on ${route}:`, err);
      routeResults[route] = { error: String(err) };
    }
  }

  // Check any newly discovered internal routes beyond KNOWN_ROUTES
  const extraRoutes = Array.from(allDiscoveredInternal).filter((r) => !KNOWN_ROUTES.includes(r));
  for (const route of extraRoutes) {
    console.log(`Visiting extra discovered route ${route}...`);
    try {
      const resp = await page.goto(`${BASE_URL}${route}`, { waitUntil: 'domcontentloaded', timeout: 20000 });
      await scrollAndSettle(page);
      const data = await extractPageData(page, route);
      routeResults[route] = {
        status: resp?.status() || null,
        finalUrl: page.url(),
        title: data.title,
        visibleText: data.visibleText.slice(0, 2000),
      };
    } catch (err) {
      routeResults[route] = { error: String(err) };
    }
  }

  await fs.writeFile(
    'research/reference/all-routes-extracted.json',
    JSON.stringify(
      {
        knownCount: KNOWN_ROUTES.length,
        discoveredRoutes: Array.from(allDiscoveredInternal).sort(),
        extraRoutes,
        routes: routeResults,
      },
      null,
      2
    )
  );
  await fs.writeFile(
    'research/reference/network-assets.json',
    JSON.stringify(Array.from(networkAssets.values()), null, 2)
  );

  // 3. Interactive & Light-Theme & Mobile Inspection
  const interactions: Record<string, unknown> = {};

  // Home interactions + theme toggle + Resources dropdown
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await scrollAndSettle(page);

  // Try finding theme toggle and Resources dropdown
  interactions.homeThemeBefore = await page.evaluate(() => ({
    bg: getComputedStyle(document.body).backgroundColor,
    htmlClass: document.documentElement.className,
    localStorage: { ...localStorage },
  }));

  // Click Resources to see dropdown
  try {
    const resBtn = page.locator('header, nav').getByText('Resources', { exact: false }).first();
    await resBtn.hover();
    await page.waitForTimeout(300);
    await resBtn.click().catch(() => {});
    await page.waitForTimeout(400);
    interactions.resourcesDropdownText = await page.evaluate(() => {
      const links = Array.from(document.querySelectorAll('a[href]')).map((a) => ({
        text: (a.textContent || '').trim(),
        href: a.getAttribute('href'),
        visible: (a as HTMLElement).offsetParent !== null,
      }));
      return links.filter((l) => l.visible);
    });
    await page.screenshot({ path: 'research/reference/interactions/resources-dropdown.png' });
    await page.keyboard.press('Escape');
    await page.mouse.click(10, 10);
  } catch (e) {
    interactions.resourcesDropdownError = String(e);
  }

  // Click theme toggle button (look for button with moon/sun svg in nav)
  try {
    const themeToggleInfo = await page.evaluate(() => {
      const header = document.querySelector('header, nav') || document.body;
      const candidates = Array.from(header.querySelectorAll('[role="button"], button, [data-framer-name]'));
      return candidates
        .filter((el) => {
          const r = el.getBoundingClientRect();
          return r.top < 120 && r.width > 16 && r.width < 60 && r.height > 16 && r.height < 60;
        })
        .map((el) => ({
          tag: el.tagName,
          name: el.getAttribute('data-framer-name'),
          ariaLabel: el.getAttribute('aria-label'),
          rect: el.getBoundingClientRect(),
          html: el.outerHTML.slice(0, 300),
        }));
    });
    interactions.themeToggleCandidates = themeToggleInfo;
  } catch (e) {
    interactions.themeToggleError = String(e);
  }

  // Open all FAQ items on Home
  try {
    const faqQuestions = [
      'What is TodoFusion?',
      'Integration details?',
      'Main features?',
      'Mobile availability?',
      'Task sharing possible?',
      'Customer support options?',
    ];
    const faqAnswers: Record<string, string> = {};
    for (const q of faqQuestions) {
      const el = page.getByText(q, { exact: false }).first();
      await el.scrollIntoViewIfNeeded();
      await el.click().catch(() => {});
      await page.waitForTimeout(350);
      const containerText = await el.evaluate((node) => {
        let cur: HTMLElement | null = node as HTMLElement;
        for (let i = 0; i < 4 && cur?.parentElement; i++) {
          cur = cur.parentElement;
        }
        return cur?.innerText || '';
      });
      faqAnswers[q] = containerText;
    }
    interactions.faqAnswers = faqAnswers;
  } catch (e) {
    interactions.faqError = String(e);
  }

  // Pricing page: inspect the 3 testimonial avatars
  try {
    await page.goto(`${BASE_URL}/pricing`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await scrollAndSettle(page);
    const pricingTestimonials: unknown[] = [];
    // Find avatars near Emily Smith
    const avatarPositions = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img')).filter((img) => {
        const r = img.getBoundingClientRect();
        return r.width >= 30 && r.width <= 90 && r.height >= 30 && r.height <= 90;
      });
      return imgs.map((img) => {
        const r = img.getBoundingClientRect();
        return { src: img.src, x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width, h: r.height };
      });
    });
    for (const pos of avatarPositions) {
      await page.mouse.click(pos.x, pos.y);
      await page.waitForTimeout(350);
      const quoteBlock = await page.evaluate(() => {
        const emilyOrQuote = document.body.innerText;
        return emilyOrQuote;
      });
      pricingTestimonials.push({ avatar: pos.src, textSnippet: quoteBlock.slice(0, 2500) });
    }
    interactions.pricingTestimonials = pricingTestimonials;
  } catch (e) {
    interactions.pricingTestimonialsError = String(e);
  }

  // Helpcenter: capture all 4 categories + expand all 12 questions
  try {
    await page.goto(`${BASE_URL}/helpcenter`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await scrollAndSettle(page);
    const helpcenterData: Record<string, unknown> = {};
    for (const cat of ['All', 'Company', 'Get Started', 'Services']) {
      const btn = page.getByText(cat, { exact: true }).first();
      await btn.click().catch(() => {});
      await page.waitForTimeout(300);
      helpcenterData[`category_${cat}`] = await page.evaluate(() => document.body.innerText);
    }
    // Back to All and click every question heading
    await page.getByText('All', { exact: true }).first().click().catch(() => {});
    await page.waitForTimeout(300);
    const qTriggers = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('h3, h4, p, div')).filter((el) => {
        const t = (el.textContent || '').trim();
        return el.children.length === 0 && t.endsWith('?') && t.length > 12 && t.length < 150;
      });
      return els.map((el) => {
        const r = el.getBoundingClientRect();
        return { text: (el.textContent || '').trim(), x: r.left + 10, y: r.top + r.height / 2 };
      });
    });
    const expandedHelp: Record<string, string> = {};
    for (const q of qTriggers) {
      await page.mouse.click(q.x, q.y);
      await page.waitForTimeout(300);
      expandedHelp[q.text] = await page.evaluate(() => document.body.innerText);
    }
    helpcenterData.questionsExpanded = expandedHelp;
    interactions.helpcenter = helpcenterData;
  } catch (e) {
    interactions.helpcenterError = String(e);
  }

  // Sales form inspection
  try {
    await page.goto(`${BASE_URL}/contact/sales`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
    await scrollAndSettle(page);
    interactions.salesForm = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input, textarea, select, button'));
      return inputs.map((el) => ({
        tag: el.tagName,
        type: (el as HTMLInputElement).type || null,
        name: el.getAttribute('name'),
        placeholder: el.getAttribute('placeholder'),
        required: (el as HTMLInputElement).required || false,
        options:
          el.tagName === 'SELECT'
            ? Array.from((el as HTMLSelectElement).options).map((o) => ({ value: o.value, text: o.text }))
            : null,
        text: (el.textContent || '').trim(),
      }));
    });
  } catch (e) {
    interactions.salesFormError = String(e);
  }

  await fs.writeFile('research/reference/interactions/interactions-raw.json', JSON.stringify(interactions, null, 2));

  // 4. Mobile 390x844 capture on Home + Features + Docs
  const mobileCtx = await browser.newContext({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 1,
    colorScheme: 'dark',
  });
  const mPage = await mobileCtx.newPage();
  for (const r of ['/', '/features', '/docs', '/pricing']) {
    await mPage.goto(`${BASE_URL}${r}`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
    await scrollAndSettle(mPage);
    await mPage.screenshot({
      path: `research/reference/screenshots/mobile/dark/${routeSlug(r)}.png`,
      fullPage: true,
    });
  }
  await mobileCtx.close();

  // 5. Light colorScheme context check
  const lightCtx = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
    colorScheme: 'light',
  });
  const lPage = await lightCtx.newPage();
  for (const r of ['/', '/features', '/pricing', '/docs', '/uikit']) {
    await lPage.goto(`${BASE_URL}${r}`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
    await scrollAndSettle(lPage);
    const lightBg = await lPage.evaluate(() => ({
      bodyBg: getComputedStyle(document.body).backgroundColor,
      bodyColor: getComputedStyle(document.body).color,
    }));
    console.log(`Light colorScheme on ${r}:`, lightBg);
    await lPage.screenshot({
      path: `research/reference/screenshots/desktop/light/${routeSlug(r)}.png`,
      fullPage: true,
    });
  }
  await lightCtx.close();

  await browser.close();
  console.log('Done reference inspection!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
