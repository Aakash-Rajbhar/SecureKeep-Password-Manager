import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/db';
import PasswordEntry from '@/models/PasswordEntry';
import { encrypt } from '@/lib/crypto';

export async function POST(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    console.log('No token found');
  }

  try {
    const { userId } = await verifyToken(token!);
    const { website, username, password, note } = await req.json();
    const encryptedPassword = encrypt(password);

    const newEntry = await PasswordEntry.create({
      userId,
      website,
      username,
      password: encryptedPassword,
      note,
    });

    const entryObj = newEntry.toObject();
    return NextResponse.json(entryObj);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  try {
    const { userId } = await verifyToken(token!);
    const entries = await PasswordEntry.find({ userId });

    const decryptedEntries = entries.map((entry) => ({
      ...entry.toObject(),
    }));

    return NextResponse.json(decryptedEntries);
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
}
