import { NextResponse } from 'next/server';
import { signToken } from '@/lib/jwt';
import User from '@/models/User';
import { comparePassword } from '@/lib/hash';
import { connectDB } from '@/lib/db';

export async function POST(req: Request) {
  await connectDB();
  const { email, password } = await req.json();

  const user = await User.findOne({ email });
  if (!user || !(await comparePassword(password, user.password))) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = await signToken(user._id.toString());
  const res = NextResponse.json({ message: 'Login successful' });

  res.cookies.set('token', token, {
    httpOnly: true,
    path: '/',
    secure: process.env.NODE_ENV === 'production', // secure in prod
    sameSite: 'lax',
  });

  return res;
}
