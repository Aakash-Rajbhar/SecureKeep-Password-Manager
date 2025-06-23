import { SignJWT, jwtVerify } from 'jose';
import jwt from 'jsonwebtoken';

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'theskyrajbhar'
);

// Create token
export async function signToken(userId: string) {
  return await new SignJWT({ userId })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

// Verify token
export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret);
  return payload;
}

export function signResetToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '15m' });
}

export function verifyResetToken(token: string) {
  return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
}
