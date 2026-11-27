import fs from 'node:fs';

const html = fs.readFileSync('research/reference/html/helpcenter.html', 'utf8');
const scripts = Array.from(new Set(html.match(/https:\/\/framerusercontent\.com\/sites\/[^"'\s<>]+\.mjs/g) || []));
console.log('Found mjs scripts:', scripts.length);

async function run() {
  for (const url of scripts) {
    try {
      const r = await fetch(url);
      const txt = await r.text();
      if (txt.includes('experiencing issues with your service') || txt.includes('ensure customer data privacy')) {
        console.log('MATCH IN:', url);
        const idx = txt.indexOf('experiencing issues');
        console.log(txt.slice(Math.max(0, idx - 300), idx + 4000));
        fs.writeFileSync('research/reference/helpcenter-bundle-snippet.txt', txt.slice(Math.max(0, idx - 500), idx + 8000));
        break;
      }
    } catch {}
  }
}
run();
