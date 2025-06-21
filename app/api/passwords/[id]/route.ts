import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/db';
import PasswordEntry from '@/models/PasswordEntry';
import { encrypt, decrypt } from '@/lib/crypto';

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = await verifyToken(token); // Make sure this is `await`
    const { website, username, password, note } = await req.json();

    if (!website || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const encryptedPassword = encrypt(password);

    const updated = await PasswordEntry.findOneAndUpdate(
      { _id: params.id, userId },
      { website, username, password: encryptedPassword, note },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { error: 'Password entry not found' },
        { status: 404 }
      );
    }

    const updatedObj = updated.toObject();
    updatedObj.password = decrypt(updatedObj.password);

    return NextResponse.json(updatedObj);
  } catch (error) {
    console.error('Error updating password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  await connectDB();
  const token = req.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { userId } = await verifyToken(token);

    const deleted = await PasswordEntry.findOneAndDelete({
      _id: params.id,
      userId,
    });

    if (!deleted) {
      return NextResponse.json(
        { error: 'Password entry not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting password:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
