import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/jwt';
import { connectDB } from '@/lib/db';
import PasswordEntry from '@/models/PasswordEntry';
import { encrypt, decrypt } from '@/lib/crypto';

// PUT /api/passwords/[id]
export async function PUT(
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
    const { id } = await context.params; // Await the params Promise
    const { website, username, password, note } = await req.json();

    if (!website || !username || !password) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const encryptedPassword = encrypt(password);

    const updated = await PasswordEntry.findOneAndUpdate(
      { _id: id, userId }, // Use the awaited id
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

// DELETE /api/passwords/[id]
export async function DELETE(
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
    const { id } = await context.params; // Await the params Promise

    const deleted = await PasswordEntry.findOneAndDelete({
      _id: id, // Use the awaited id
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
