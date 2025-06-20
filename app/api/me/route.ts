import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const payload = verifyToken(token);
    return NextResponse.json({ ok: true, userId: (payload as any).userId });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
