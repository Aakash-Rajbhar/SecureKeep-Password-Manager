'use client';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import { EyeClosed, EyeIcon, ShieldCheck } from 'lucide-react';

export default function ResetPasswordPage() {
  const router = useRouter();
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenFromParams = params.token as string;
    setToken(tokenFromParams);
  }, [params]);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!token || token === 'null') {
      alert('Invalid reset link - no token found');
      return;
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`/api/auth/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password reset successful. Please login again.');
        router.push('/login');
      } else {
        alert(data?.error || 'Failed to reset password');
      }
    } catch {
      alert('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  if (token === null) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600 text-lg">Loading...</p>
      </div>
    );
  }

  if (!token || token === 'null') {
    return (
      <div className="flex flex-col items-center justify-center h-screen px-4">
        <div className="bg-white/30 backdrop-blur-md p-6 rounded-2xl border border-red-200 shadow-xl text-center max-w-md w-full">
          <h2 className="text-xl font-bold text-red-600 mb-2">
            Invalid or Expired Link
          </h2>
          <p className="text-gray-700 text-sm mb-4">
            This reset link is invalid or has expired.
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            Request New Link
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-white px-4">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck size={36} className="text-indigo-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800 mb-1">
            Reset Password
          </h1>
          <p className="text-sm text-gray-600">
            Set a new password to secure your account
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="New password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              minLength={6}
            />
            {showPassword ? (
              <EyeIcon
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeClosed
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
            {showPassword ? (
              <EyeIcon
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            ) : (
              <EyeClosed
                size={20}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50 cursor-pointer"
          >
            {loading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
}
