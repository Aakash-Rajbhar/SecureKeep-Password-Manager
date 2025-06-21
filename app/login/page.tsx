'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeClosed, ShieldCheck } from 'lucide-react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (res.ok) {
      router.replace('/dashboard');
    } else {
      const err = await res.json();
      alert(err.error || 'Login failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck size={36} className="text-indigo-600 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">SecureVault</h1>
          <p className="text-sm text-gray-600">
            Log in to protect your secrets
          </p>
        </div>

        <form onSubmit={login} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                type={visible ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              />
              {visible ? (
                <Eye
                  width={20}
                  className="absolute right-2 top-3 text-neutral-600 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              ) : (
                <EyeClosed
                  width={20}
                  className="absolute right-2 top-3 text-neutral-600 cursor-pointer"
                  onClick={() => setVisible(!visible)}
                />
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-md font-semibold hover:opacity-90 transition duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Don&apos;t have an account?{' '}
            <a
              href="/register"
              className="text-indigo-500 hover:underline font-medium"
            >
              Register here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
