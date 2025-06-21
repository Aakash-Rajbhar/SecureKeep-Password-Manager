import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';

type JWTPayload = {
  userId: string;
};

export async function GET(req: NextRequest) {
  const token = req.cookies.get('token')?.value;
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });

  try {
    const payload = (await verifyToken(token)) as JWTPayload;
    return NextResponse.json({ ok: true, userId: payload.userId });
  } catch {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
}
