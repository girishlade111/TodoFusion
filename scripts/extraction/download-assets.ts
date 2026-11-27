import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import sharp from 'sharp';

interface ExtractedImage {
  src: string;
  alt?: string;
}

interface AssetRecord {
  id: string;
  sourceUrl: string;
  assetType: string;
  referenceRoutes: string[];
  mimeType: string;
  originalWidth: number | null;
  originalHeight: number | null;
  fileSize: number | null;
  hasTransparency: boolean;
  masterPath: string;
  deliveryPath: string;
  sha256: string;
  duplicateOf: string | null;
  acquisitionStatus: string;
  validationStatus: string;
}

function sanitizeUrlKey(raw: string): string {
  try {
    const u = new URL(raw);
    return `${u.origin}${u.pathname}`;
  } catch {
    return raw;
  }
}

async function downloadFile(url: string, retries = 3): Promise<{ buffer: Buffer; contentType: string }> {
  let lastErr: unknown;
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        },
        signal: AbortSignal.timeout(20000),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const ab = await res.arrayBuffer();
      return {
        buffer: Buffer.from(ab),
        contentType: res.headers.get('content-type') || 'application/octet-stream',
      };
    } catch (e) {
      lastErr = e;
      await new Promise((r) => setTimeout(r, 800 * (i + 1)));
    }
  }
  throw lastErr;
}

function guessExt(url: string, contentType: string): string {
  const pathname = new URL(url).pathname.toLowerCase();
  for (const ext of ['.svg', '.png', '.jpg', '.jpeg', '.webp', '.avif', '.woff2', '.woff', '.ttf', '.mp4', '.webm']) {
    if (pathname.endsWith(ext)) return ext === '.jpeg' ? '.jpg' : ext;
  }
  if (contentType.includes('svg')) return '.svg';
  if (contentType.includes('png')) return '.png';
  if (contentType.includes('jpeg')) return '.jpg';
  if (contentType.includes('webp')) return '.webp';
  if (contentType.includes('woff2')) return '.woff2';
  if (contentType.includes('font')) return '.woff2';
  return '.bin';
}

async function main() {
  const extracted = JSON.parse(await fs.readFile('research/reference/all-routes-extracted.json', 'utf8'));
  const network = JSON.parse(await fs.readFile('research/reference/network-assets.json', 'utf8')) as Array<{
    url: string;
    resourceType: string;
    contentType: string;
  }>;

  // Map canonical URL -> routes
  const urlRoutes = new Map<string, Set<string>>();
  const urlBestHref = new Map<string, string>();
  const urlType = new Map<string, string>();

  for (const [route, data] of Object.entries(extracted.routes as Record<string, any>)) {
    if (!data || data.error) continue;
    for (const img of (data.imgs || []) as ExtractedImage[]) {
      if (!img.src || img.src.startsWith('data:')) continue;
      const key = sanitizeUrlKey(img.src);
      if (!urlRoutes.has(key)) urlRoutes.set(key, new Set());
      urlRoutes.get(key)!.add(route);
      // Prefer version without tiny width query or keep full URL
      if (!urlBestHref.has(key) || img.src.length < urlBestHref.get(key)!.length) {
        urlBestHref.set(key, img.src);
      }
      urlType.set(key, 'image');
    }
    for (const ff of (data.fontFaces || []) as string[]) {
      const matches = ff.matchAll(/url\(["']?(https?:\/\/[^"')]+)["']?\)/g);
      for (const m of matches) {
        const key = sanitizeUrlKey(m[1]);
        if (!urlRoutes.has(key)) urlRoutes.set(key, new Set());
        urlRoutes.get(key)!.add(route);
        urlBestHref.set(key, m[1]);
        urlType.set(key, 'font');
      }
    }
  }

  for (const net of network) {
    if (net.resourceType === 'image' || net.resourceType === 'font') {
      const key = sanitizeUrlKey(net.url);
      if (!urlRoutes.has(key)) urlRoutes.set(key, new Set());
      if (!urlBestHref.has(key)) urlBestHref.set(key, net.url);
      if (!urlType.has(key)) urlType.set(key, net.resourceType);
    }
  }

  const seenHashes = new Map<string, string>();
  const records: AssetRecord[] = [];
  let idx = 1;

  for (const [key, sourceUrl] of urlBestHref.entries()) {
    const assetType = urlType.get(key) || 'image';
    const routes = Array.from(urlRoutes.get(key) || []);
    const baseName = path.basename(new URL(key).pathname).replace(/[^a-zA-Z0-9._-]/g, '_') || `asset_${idx}`;

    try {
      // Try downloading clean URL (without scale-down query params if framerusercontent)
      const fetchUrl = key.includes('framerusercontent.com/images/') ? key : sourceUrl;
      const { buffer, contentType } = await downloadFile(fetchUrl);
      const sha256 = crypto.createHash('sha256').update(buffer).digest('hex');
      const ext = guessExt(fetchUrl, contentType);
      const id = `asset-${String(idx).padStart(3, '0')}-${baseName.replace(/\.[^.]+$/, '').slice(0, 24)}`;

      let width: number | null = null;
      let height: number | null = null;
      let hasTransparency = false;
      let validationStatus = 'VALIDATED';

      if (ext === '.svg') {
        const svgStr = buffer.toString('utf8');
        if (!svgStr.includes('<svg')) validationStatus = 'INVALID_SVG';
        hasTransparency = true;
      } else if (['.png', '.jpg', '.webp', '.avif'].includes(ext)) {
        try {
          const meta = await sharp(buffer).metadata();
          width = meta.width ?? null;
          height = meta.height ?? null;
          hasTransparency = Boolean(meta.hasAlpha);
        } catch {
          validationStatus = 'DECODE_FAILED';
        }
      }

      const duplicateOf = seenHashes.get(sha256) || null;
      if (!duplicateOf) seenHashes.set(sha256, id);

      const folder = assetType === 'font' ? 'fonts' : 'extracted';
      const masterDir = `assets-source/original/${folder}`;
      const publicDir = `public/assets/${folder === 'fonts' ? 'fonts' : 'images/extracted'}`;
      await fs.mkdir(masterDir, { recursive: true });
      await fs.mkdir(publicDir, { recursive: true });

      const fileName = `${baseName.replace(/\.[^.]+$/, '')}${ext}`;
      const masterPath = `${masterDir}/${fileName}`;
      const deliveryPath = `${publicDir}/${fileName}`;

      if (!duplicateOf) {
        await fs.writeFile(masterPath, buffer);
        await fs.writeFile(deliveryPath, buffer);
      }

      records.push({
        id,
        sourceUrl: fetchUrl,
        assetType,
        referenceRoutes: routes,
        mimeType: contentType,
        originalWidth: width,
        originalHeight: height,
        fileSize: buffer.length,
        hasTransparency,
        masterPath: duplicateOf ? '' : masterPath,
        deliveryPath: duplicateOf ? '' : `/${deliveryPath.replace(/^public\//, '')}`,
        sha256,
        duplicateOf,
        acquisitionStatus: 'DOWNLOADED',
        validationStatus,
      });
      idx++;
    } catch (err) {
      records.push({
        id: `asset-${String(idx).padStart(3, '0')}-failed`,
        sourceUrl,
        assetType,
        referenceRoutes: routes,
        mimeType: '',
        originalWidth: null,
        originalHeight: null,
        fileSize: null,
        hasTransparency: false,
        masterPath: '',
        deliveryPath: '',
        sha256: '',
        duplicateOf: null,
        acquisitionStatus: `FAILED: ${String(err)}`,
        validationStatus: 'FAILED',
      });
      idx++;
    }
  }

  await fs.writeFile('research/manifests/assets.json', JSON.stringify(records, null, 2));
  console.log(`Processed ${records.length} assets. Unique downloaded: ${seenHashes.size}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
