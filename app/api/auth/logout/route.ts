import { NextResponse } from 'next/server';

export async function POST() {
  // Clear the cookie by setting it with a past expiration
  return NextResponse.json(
    { message: 'Logged out successfully' },
    {
      status: 200,
      headers: {
        'Set-Cookie': `token=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict; Secure`,
      },
    }
  );
}
