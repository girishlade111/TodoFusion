import { chromium } from 'playwright';
import fs from 'node:fs/promises';

async function main() {
  const b = await chromium.launch({ headless: true });
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('https://todofusion.framer.website/helpcenter', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(2000);

  // Extract hidden/collapsed DOM text inside accordion wrappers + click every row
  const helpRows = await p.evaluate(() => {
    const questions = [
      'What should I do if I am experiencing issues with your service?',
      'How can I upgrade my current service package?',
      'Are there any subscription plans for your services?',
      'What types of customer support do you offer?',
      'How does your company ensure customer data privacy?',
      'What are your company’s core values?',
      'Where is your company located?',
      'What is the history of your company?',
      'Can I customize my settings as a new user?',
      'Is there a tutorial available for new users?',
      'What do I need to start using your services immediately after registration?',
      'How do I create an account with your service?',
    ];
    return questions.map((q) => {
      const el = Array.from(document.querySelectorAll('p, h3, h4, div')).find(
        (n) => n.children.length === 0 && (n.textContent || '').trim() === q
      );
      if (!el) return { q, rawTextContent: '', rect: null };
      let card: HTMLElement | null = el as HTMLElement;
      for (let i = 0; i < 4 && card?.parentElement; i++) {
        card = card.parentElement;
        if ((card.textContent || '').length > q.length + 20) break;
      }
      const r = el.getBoundingClientRect();
      return { q, rawTextContent: (card?.textContent || '').trim(), x: r.left + 20, y: r.top + r.height / 2 };
    });
  });

  const clickedQA: Record<string, string> = {};
  for (const item of helpRows) {
    if (item.x && item.y) {
      await p.mouse.click(item.x, item.y);
      await p.waitForTimeout(300);
    }
  }
  const afterAllClicks = await p.evaluate(() => document.body.innerText);

  // Pricing 3 avatar tabs
  await p.goto('https://todofusion.framer.website/pricing', { waitUntil: 'domcontentloaded', timeout: 25000 });
  await p.waitForTimeout(2000);
  await p.evaluate(() => window.scrollTo(0, 950));
  await p.waitForTimeout(500);
  const avatars = await p.evaluate(() =>
    Array.from(document.querySelectorAll('img'))
      .filter((i) => {
        const r = i.getBoundingClientRect();
        return r.width >= 32 && r.width <= 72 && r.top > 100 && r.top < 1400;
      })
      .map((i) => {
        const r = i.getBoundingClientRect();
        return { src: i.src, x: r.left + r.width / 2, y: r.top + r.height / 2 };
      })
  );
  const tabs: Array<{ src: string; quote: string; author: string; role: string }> = [];
  for (const a of avatars) {
    await p.mouse.click(a.x, a.y);
    await p.waitForTimeout(450);
    const data = await p.evaluate(() => {
      const txt = document.body.innerText;
      const start = txt.lastIndexOf('No recurring fees');
      const end = txt.indexOf('Frequently Asked Questions');
      const slice = txt.slice(start + 'No recurring fees'.length, end).trim();
      const lines = slice.split('\n').map((l) => l.trim()).filter(Boolean);
      return {
        quote: lines[0] || '',
        author: lines[1] || '',
        role: lines[2] || '',
      };
    });
    tabs.push({ src: a.src, ...data });
  }

  await fs.writeFile(
    'research/reference/help-and-pricing.json',
    JSON.stringify({ helpRows, afterAllClicks, tabs }, null, 2)
  );
  await b.close();
  console.log('Saved help-and-pricing.json');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
