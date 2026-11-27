import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

const schema = z.object({
  email: z.string().trim().email('Please enter a valid email address.'),
  honeypot: z.string().max(0).optional(),
});

const subscribedEmails = new Set<string>();
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const now = Date.now();
    const bucket = rateLimitMap.get(ip);
    if (bucket && now < bucket.resetAt && bucket.count >= 10) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a moment and try again.' },
        { status: 429 }
      );
    }
    if (!bucket || now >= bucket.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    } else {
      bucket.count += 1;
    }

    const body = await req.json();
    const parsed = schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Invalid email address.' },
        { status: 400 }
      );
    }

    const normalized = parsed.data.email.toLowerCase();
    if (subscribedEmails.has(normalized)) {
      return NextResponse.json(
        {
          ok: true,
          duplicate: true,
          adapter: process.env.FORM_ADAPTER || 'demo',
          message: 'This email is already subscribed (demonstration mode).',
        },
        { status: 200 }
      );
    }

    if (process.env.FORM_ADAPTER === 'webhook' && process.env.NEWSLETTER_WEBHOOK_URL) {
      const hookRes = await fetch(process.env.NEWSLETTER_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalized, source: 'todofusion-newsletter' }),
      });
      if (!hookRes.ok) {
        return NextResponse.json(
          { error: 'External newsletter provider rejected the request.' },
          { status: 502 }
        );
      }
    }

    subscribedEmails.add(normalized);
    return NextResponse.json(
      {
        ok: true,
        duplicate: false,
        adapter: process.env.FORM_ADAPTER || 'demo',
        message: 'Subscribed successfully (local demonstration adapter).',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }
}
