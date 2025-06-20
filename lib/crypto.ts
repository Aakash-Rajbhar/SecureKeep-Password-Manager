import crypto from 'crypto';

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY!.padEnd(32, '0'); // Must be 32 bytes
const IV = crypto.randomBytes(16); // Initialization vector

export function encrypt(text: string) {
  const cipher = crypto.createCipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    IV
  );
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return IV.toString('hex') + ':' + encrypted.toString('hex');
}

export function decrypt(text: string) {
  const parts = text.split(':');
  const iv = Buffer.from(parts[0], 'hex');
  const encryptedText = Buffer.from(parts[1], 'hex');
  const decipher = crypto.createDecipheriv(
    'aes-256-cbc',
    Buffer.from(ENCRYPTION_KEY),
    iv
  );
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}
