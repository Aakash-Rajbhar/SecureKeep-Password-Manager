import type { Metadata } from 'next';
import { Raleway } from 'next/font/google';
import './globals.css';

const raleway = Raleway({
  variable: '--font-raleway',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'SecureKeep - Your Password Manager',
  keywords: [
    'password manager',
    'secure keep',
    'key manager',
    'secure passwords',
    'encryption',
    'privacy',
    'data security',
    'end-to-end encryption',
    'password vault',
    'password protection',
    'secure storage',
    'digital security',
    'password generator',
    'password safety',
    'secure login',
    'password management',
    'data protection',
    'secure credentials',
    'password security',
    'password storage',
    'password safety',
    'secure access',
    'password sharing',
  ],
  authors: [{ name: 'Aakash Rajbhar', url: 'https://securekeep.vercel.app' }],
  description:
    'A secure password manager for all your passwords at one place with end-to-end encryption.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable}  antialiased`}>{children}</body>
    </html>
  );
}
