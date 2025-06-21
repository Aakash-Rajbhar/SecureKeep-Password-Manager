import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/jwt';

export async function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value;

  const publicPaths = ['/login', '/register'];
  if (publicPaths.includes(req.nextUrl.pathname)) return NextResponse.next();

  // ✅ If no token or invalid format, redirect
  if (!token || token.split('.').length !== 3) {
    console.warn('⛔️ Missing or malformed token');
    return NextResponse.redirect(new URL('/login', req.url));
  }

  try {
    await verifyToken(token);
    return NextResponse.next();
  } catch (err) {
    console.error('Invalid token in middleware:', err);
    return NextResponse.redirect(new URL('/login', req.url));
  }
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
