// app/api/auth/reset-password/[token]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { hashPassword } from '@/lib/hash';

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  await connectDB();

  const { password } = await req.json();
  const resolvedParams = await params;
  const token = resolvedParams.token;

  console.log('=== RESET PASSWORD DEBUG ===');
  console.log('Token received:', token);
  console.log('Token length:', token?.length);

  if (!password) {
    return NextResponse.json(
      { error: 'Password is required' },
      { status: 400 }
    );
  }

  if (!token) {
    return NextResponse.json({ error: 'Token is required' }, { status: 400 });
  }

  const debugUsers = await User.find({ resetToken: token });
  console.log('Found users with this token (ignoring expiry):', debugUsers);

  try {
    // Find user with matching reset token and check expiration
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }, // Check if token hasn't expired
    });

    console.log('User found with token:', !!user);

    if (!user) {
      return NextResponse.json(
        { error: 'Invalid or expired link' },
        { status: 400 }
      );
    }

    // Hash the new password
    const hashed = await hashPassword(password);

    // Update user password and clear reset token fields
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    console.log('Password updated successfully for user:', user._id);

    return NextResponse.json({ message: 'Password updated successfully' });
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Invalid or expired link' },
      { status: 400 }
    );
  }
}
