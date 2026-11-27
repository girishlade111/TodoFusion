import { chromium } from 'playwright';
import fs from 'node:fs/promises';

const BASE_URL = 'https://todofusion.framer.website';

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();
  const cdp = await context.newCDPSession(page);
  await cdp.send('DOM.enable');
  await cdp.send('CSS.enable');

  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 30000 }).catch(() => {});
  await page.evaluate(async () => {
    await document.fonts.ready;
    for (let y = 0; y <= document.body.scrollHeight; y += 700) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 100));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
  });

  // 1. CDP Platform Fonts for key elements
  const doc = await cdp.send('DOM.getDocument', { depth: 1 });
  const selectors = ['body', 'header', 'h1', 'h2', 'h3', 'p', 'a', 'button'];
  const platformFonts: Record<string, unknown> = {};
  for (const sel of selectors) {
    const q = await cdp.send('DOM.querySelector', { nodeId: doc.root.nodeId, selector: sel });
    if (q.nodeId) {
      const pf = await cdp.send('CSS.getPlatformFontsForNode', { nodeId: q.nodeId });
      platformFonts[sel] = pf.fonts;
    }
  }

  // 2. Extract CSS rules, custom properties, theme selectors, diagonal pattern, animations
  const cssAudit = await page.evaluate(() => {
    const customProps: Record<string, string> = {};
    const themeRules: string[] = [];
    const patternRules: string[] = [];
    const keyframes: string[] = [];
    const fontFaces: string[] = [];

    for (const sheet of Array.from(document.styleSheets)) {
      try {
        for (const rule of Array.from(sheet.cssRules)) {
          const text = rule.cssText;
          if (rule.type === CSSRule.FONT_FACE_RULE) {
            fontFaces.push(text);
          } else if (rule.type === CSSRule.KEYFRAMES_RULE) {
            keyframes.push(text.slice(0, 600));
          } else if (text.includes('--token-') || text.includes('color-scheme') || text.includes('data-theme')) {
            themeRules.push(text.slice(0, 1500));
          }
          if (text.includes('repeating-linear-gradient') || text.includes('linear-gradient') && text.includes('45deg')) {
            patternRules.push(text.slice(0, 800));
          }
          if (rule instanceof CSSStyleRule) {
            for (let i = 0; i < rule.style.length; i++) {
              const prop = rule.style[i];
              if (prop.startsWith('--')) {
                customProps[prop] = rule.style.getPropertyValue(prop).trim();
              }
            }
          }
        }
      } catch {
        // cross origin
      }
    }

    // Find elements with background-image or diagonal pattern or SVG pattern
    const patternEls = Array.from(document.querySelectorAll('*'))
      .map((el) => {
        const cs = getComputedStyle(el);
        const r = el.getBoundingClientRect();
        if (
          cs.backgroundImage !== 'none' &&
          (cs.backgroundImage.includes('url(') || cs.backgroundImage.includes('gradient'))
        ) {
          return {
            tag: el.tagName,
            name: el.getAttribute('data-framer-name'),
            width: Math.round(r.width),
            height: Math.round(r.height),
            bgColor: cs.backgroundColor,
            bgImage: cs.backgroundImage,
            bgSize: cs.backgroundSize,
            bgRepeat: cs.backgroundRepeat,
            opacity: cs.opacity,
            position: cs.position,
            zIndex: cs.zIndex,
          };
        }
        return null;
      })
      .filter(Boolean);

    // Inspect animations
    const anims = document.getAnimations().map((a) => ({
      id: a.id,
      timing: a.effect?.getComputedTiming(),
      keyframes: (a.effect as KeyframeEffect)?.getKeyframes?.().slice(0, 4),
    }));

    return {
      customPropsCount: Object.keys(customProps).length,
      customProps,
      themeRules: themeRules.slice(0, 40),
      patternRules,
      fontFaces,
      keyframes: keyframes.slice(0, 30),
      patternEls: patternEls.slice(0, 80),
      activeAnimationsCount: anims.length,
      anims: anims.slice(0, 30),
    };
  });

  // 3. Measure geometry of major sections & header & cards on Homepage
  const homeGeometry = await page.evaluate(() => {
    const header = document.querySelector('header, nav');
    const h1 = document.querySelector('h1');
    const h2s = Array.from(document.querySelectorAll('h2')).map((el) => {
      const r = el.getBoundingClientRect();
      const cs = getComputedStyle(el);
      return {
        text: (el.textContent || '').trim().replace(/\s+/g, ' '),
        x: Math.round(r.left),
        y: Math.round(r.top + window.scrollY),
        w: Math.round(r.width),
        h: Math.round(r.height),
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        color: cs.color,
      };
    });

    const footer = document.querySelector('footer');
    const containers = Array.from(document.querySelectorAll('[data-framer-name]'))
      .map((el) => {
        const r = el.getBoundingClientRect();
        const cs = getComputedStyle(el);
        return {
          name: el.getAttribute('data-framer-name'),
          w: Math.round(r.width),
          h: Math.round(r.height),
          x: Math.round(r.left),
          y: Math.round(r.top + window.scrollY),
          bg: cs.backgroundColor,
          border: cs.border,
          radius: cs.borderRadius,
          shadow: cs.boxShadow,
        };
      })
      .filter((c) => c.w >= 250 && c.h >= 60);

    return {
      headerRect: header ? header.getBoundingClientRect() : null,
      headerStyle: header
        ? {
            position: getComputedStyle(header).position,
            bg: getComputedStyle(header).backgroundColor,
            height: getComputedStyle(header).height,
          }
        : null,
      h1: h1
        ? {
            text: (h1.textContent || '').trim(),
            rect: h1.getBoundingClientRect(),
            fontSize: getComputedStyle(h1).fontSize,
            fontWeight: getComputedStyle(h1).fontWeight,
            lineHeight: getComputedStyle(h1).lineHeight,
            letterSpacing: getComputedStyle(h1).letterSpacing,
            color: getComputedStyle(h1).color,
          }
        : null,
      h2s,
      footerRect: footer ? footer.getBoundingClientRect() : null,
      namedContainers: containers.slice(0, 120),
    };
  });

  // 4. Click theme toggle on page and capture actual light theme!
  let themeSwitchResult: Record<string, unknown> = {};
  try {
    // Look for theme switch button in top nav (usually next to Remix Template)
    const toggleCoords = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('header [role="button"], header button, nav [role="button"], nav button, [data-framer-name*="Theme"], [data-framer-name*="Mode"], [data-framer-name*="Dark"], [data-framer-name*="Light"]'));
      for (const b of btns) {
        const r = b.getBoundingClientRect();
        if (r.top < 120 && r.width > 12 && r.width < 60 && r.height > 12 && r.height < 60) {
          return { x: r.left + r.width / 2, y: r.top + r.height / 2, name: b.getAttribute('data-framer-name'), html: b.outerHTML.slice(0, 300) };
        }
      }
      // fallback: find svg moon in top right of nav
      const svgs = Array.from(document.querySelectorAll('svg')).filter((s) => {
        const r = s.getBoundingClientRect();
        return r.top < 100 && r.left > 800 && r.width >= 14 && r.width <= 36;
      });
      return svgs.map((s) => {
        const r = s.getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2, parentHtml: s.parentElement?.outerHTML.slice(0, 200) };
      });
    });
    themeSwitchResult.toggleCoords = toggleCoords;

    const target = Array.isArray(toggleCoords) ? toggleCoords[0] : toggleCoords;
    if (target && typeof target.x === 'number') {
      await page.mouse.click(target.x, target.y);
      await page.waitForTimeout(600);
      themeSwitchResult.afterClick = await page.evaluate(() => ({
        bodyBg: getComputedStyle(document.body).backgroundColor,
        bodyColor: getComputedStyle(document.body).color,
        h1Color: document.querySelector('h1') ? getComputedStyle(document.querySelector('h1')!).color : null,
        localStorage: { ...localStorage },
        htmlClass: document.documentElement.className,
        htmlAttrs: Array.from(document.documentElement.attributes).map((a) => [a.name, a.value]),
      }));
      await page.screenshot({
        path: 'research/reference/screenshots/desktop/light/home-toggled.png',
        fullPage: true,
      });

      // Also check /features, /pricing, /about, /docs, /uikit while toggled to light!
      for (const route of ['/features', '/pricing', '/about', '/docs', '/uikit']) {
        await page.goto(`${BASE_URL}${route}`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
        await page.evaluate(async () => {
          await document.fonts.ready;
          for (let y = 0; y <= document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 80));
          }
          window.scrollTo(0, 0);
          await new Promise((r) => setTimeout(r, 250));
        });
        const slug = route.replace(/^\//, '');
        await page.screenshot({
          path: `research/reference/screenshots/desktop/light/${slug}-toggled.png`,
          fullPage: true,
        });
      }
    }
  } catch (e) {
    themeSwitchResult.error = String(e);
  }

  // 5. Inspect product demo interactivity on Homepage
  await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
  const productDemoTests: Record<string, unknown> = {};
  try {
    // Checklist Joy
    const checklistItem = page.getByText('Design system', { exact: true }).first();
    await checklistItem.scrollIntoViewIfNeeded();
    const beforeCheck = await checklistItem.evaluate((el) => el.closest('[data-framer-name]')?.innerHTML.slice(0, 600));
    await checklistItem.click().catch(() => {});
    await page.waitForTimeout(300);
    const afterCheck = await checklistItem.evaluate((el) => el.closest('[data-framer-name]')?.innerHTML.slice(0, 600));
    productDemoTests.checklistChanged = beforeCheck !== afterCheck;

    // Focused intervals toggle
    const intervalsEl = page.getByText('Work sprint', { exact: false }).first();
    await intervalsEl.scrollIntoViewIfNeeded();
    const intervalsHTML = await intervalsEl.evaluate((el) => {
      let p = el.parentElement;
      for (let i = 0; i < 4 && p?.parentElement; i++) p = p.parentElement;
      return p?.innerText || '';
    });
    productDemoTests.intervalsText = intervalsHTML;
  } catch (e) {
    productDemoTests.error = String(e);
  }

  // 6. Inspect Docs search & UI Kit catalog sections
  const docsAndUiKit: Record<string, unknown> = {};
  try {
    await page.goto(`${BASE_URL}/docs`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
    const searchTrigger = page.getByText('Search docs', { exact: false }).first();
    await searchTrigger.click().catch(() => {});
    await page.waitForTimeout(400);
    docsAndUiKit.docsSearchModalVisible = await page.evaluate(() => {
      const inputs = Array.from(document.querySelectorAll('input'));
      return inputs.map((i) => ({ placeholder: i.placeholder, visible: i.offsetParent !== null }));
    });
    await page.keyboard.type('task');
    await page.waitForTimeout(400);
    docsAndUiKit.docsSearchResults = await page.evaluate(() => document.body.innerText.slice(0, 1500));
  } catch (e) {
    docsAndUiKit.docsError = String(e);
  }

  try {
    await page.goto(`${BASE_URL}/uikit`, { waitUntil: 'networkidle', timeout: 25000 }).catch(() => {});
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y <= document.body.scrollHeight; y += 800) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 80));
      }
      window.scrollTo(0, 0);
    });
    docsAndUiKit.uikitAnchors = await page.evaluate(() => {
      const els = Array.from(document.querySelectorAll('[id]')).map((e) => ({
        id: e.id,
        text: (e.textContent || '').trim().slice(0, 80),
      }));
      return els.slice(0, 80);
    });
    docsAndUiKit.uikitText = await page.evaluate(() => document.body.innerText);
  } catch (e) {
    docsAndUiKit.uikitError = String(e);
  }

  await fs.writeFile(
    'research/reference/deep-details.json',
    JSON.stringify(
      {
        platformFonts,
        cssAudit,
        homeGeometry,
        themeSwitchResult,
        productDemoTests,
        docsAndUiKit,
      },
      null,
      2
    )
  );

  await browser.close();
  console.log('Done deep details extraction!');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
