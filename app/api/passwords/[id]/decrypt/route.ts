// app/api/passwords/[id]/decrypt/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import PasswordEntry from '@/models/PasswordEntry';
import { decrypt } from '@/lib/crypto';
import { verifyToken } from '@/lib/jwt';

export async function POST(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = await verifyToken(token);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await context.params;
    const entry = await PasswordEntry.findOne({ _id: id, userId });

    if (!entry) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }

    const decrypted = decrypt(entry.password);
    return NextResponse.json({ password: decrypted });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to decrypt' }, { status: 500 });
  }
}
