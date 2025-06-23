import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import User from '@/models/User';
import { sendEmail } from '@/lib/email';
import crypto from 'crypto';

export async function POST(req: Request) {
  await connectDB();

  const { email } = await req.json();
  if (!email) {
    return NextResponse.json({ error: 'Email is required' }, { status: 400 });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return NextResponse.json({
      message: 'User not found. ',
    });
  }

  // Generate a reset token
  const token = crypto.randomBytes(32).toString('hex');
  const expire = Date.now() + 1000 * 60 * 30; // 30 mins

  // Store token in DB
  user.resetToken = token;
  console.log('Saving token:', token);
  user.resetTokenExpiry = expire;
  console.log('Expiry timestamp:', expire);
  await user.save();
  console.log('User after saving token:', user);

  // Construct reset link
  const resetLink = `${process.env.NEXT_PUBLIC_BASE_URL}/reset-password/${token}`;

  const html = `
  <div style="max-width:600px;margin:0 auto;padding:24px;border-radius:12px;background:#f9fafb;border:1px solid #e5e7eb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;">
    <h2 style="color:#4338ca;margin-bottom:16px;">🔐 Reset Your SecureKeep Password</h2>

    <p style="font-size:16px;color:#374151;margin-bottom:16px;">
      We received a request to reset your password. Click the button below to securely set a new password.
    </p>

    <a href="${resetLink}" style="display:inline-block;padding:12px 24px;background-color:#4f46e5;color:white;border-radius:8px;text-decoration:none;font-weight:600;margin-bottom:16px;">
      Reset Password
    </a>

    <p style="font-size:14px;color:#6b7280;margin-bottom:16px;">
      If you didn’t request this, you can safely ignore this email — your password won’t change.
    </p>

    <p style="font-size:14px;color:#9ca3af;margin-top:24px;">
      This link will expire in 30 minutes for security reasons.
    </p>

    <hr style="margin:32px 0;border:none;border-top:1px solid #e5e7eb;">

    <p style="font-size:13px;color:#9ca3af;">
      Sent by SecureKeep • securekeep.vercel.app
    </p>
  </div>
`;

  // Send the email
  await sendEmail(email, 'Reset your SecureKeep password', html);

  return NextResponse.json({
    message: 'If email exists, a reset link will be sent',
  });
}
