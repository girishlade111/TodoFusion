import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';

export const companySizes = ['1-50', '50-100', '100-500', '500-1000', '1000-5000', '5000+'] as const;

const salesSchema = z.object({
  fullName: z.string().trim().min(2, 'Please enter your full name.').max(120),
  workEmail: z.string().trim().email('Please enter a valid work email.'),
  companySize: z.enum(companySizes),
  message: z.string().trim().min(5, 'Please share a brief note about how we can help.').max(2000),
  honeypot: z.string().max(0).optional(),
});

const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'local';
    const now = Date.now();
    const bucket = rateLimitMap.get(ip);
    if (bucket && now < bucket.resetAt && bucket.count >= 8) {
      return NextResponse.json(
        { error: 'Too many submissions. Please try again shortly.' },
        { status: 429 }
      );
    }
    if (!bucket || now >= bucket.resetAt) {
      rateLimitMap.set(ip, { count: 1, resetAt: now + 60_000 });
    } else {
      bucket.count += 1;
    }

    const body = await req.json();
    const parsed = salesSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message || 'Validation failed.' },
        { status: 400 }
      );
    }

    if (process.env.FORM_ADAPTER === 'webhook' && process.env.SALES_WEBHOOK_URL) {
      const hookRes = await fetch(process.env.SALES_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed.data),
      });
      if (!hookRes.ok) {
        return NextResponse.json(
          { error: 'Upstream sales endpoint returned an error.' },
          { status: 502 }
        );
      }
    }

    return NextResponse.json(
      {
        ok: true,
        adapter: process.env.FORM_ADAPTER || 'demo',
        message: 'Inquiry received (local demonstration adapter; no external email sent).',
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json({ error: 'Invalid request payload.' }, { status: 400 });
  }
}
