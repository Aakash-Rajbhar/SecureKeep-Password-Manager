import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/hash';

export async function POST(req: NextRequest) {
  await connectDB();
  const { email, password } = await req.json();

  const existingUser = await User.findOne({ email });
  if (existingUser)
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });

  const hashedPassword = await hashPassword(password);
  const newUser = await User.create({ email, password: hashedPassword });

  return NextResponse.json({
    message: 'User registered',
    user: { email: newUser.email },
  });
}
