'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeClosed, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const register = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    setLoading(false);
    if (res.ok) router.push('/dashboard');
    else alert('Registration failed');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-white px-4">
      <div className="w-full max-w-md p-8 bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center mb-6">
          <UserPlus size={36} className="text-indigo-600 mb-2" />
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-sm text-gray-600">Join SecureKeep today</p>
        </div>

        <form onSubmit={register} className="space-y-4">
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
            {loading ? 'Registering...' : 'Register'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a
              href="/login"
              className="text-indigo-500 hover:underline font-medium"
            >
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
