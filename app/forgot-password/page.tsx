'use client';

import { useState } from 'react';
import { MailCheck, MoveLeft, ShieldCheck } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [resending, setResending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendResetRequest();
  };

  const sendResetRequest = async () => {
    setResending(true);
    setMessage('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: JSON.stringify({ email }),
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();
      if (data?.error || !res.ok) {
        alert(data?.error || 'Something went wrong');
      } else {
        setMessage(data?.message || 'Check your email for the reset link');
      }
    } catch {
      alert('Something went wrong.');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-100 to-white px-4">
      <div
        className="absolute top-4 left-4 flex items-center gap-2 bg-white p-4 rounded-full text-gray-700 hover:text-gray-900 transition-colors"
        title="Go Back"
      >
        <MoveLeft
          size={24}
          className=" text-gray-600 cursor-pointer"
          onClick={() => window.history.back()}
        />
      </div>
      <div className="w-full max-w-md bg-white/30 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8">
        <div className="flex flex-col items-center mb-6">
          <ShieldCheck size={36} className="text-indigo-600 mb-2" />
          <h1 className="text-2xl font-bold text-gray-800">Forgot Password</h1>
          <p className="text-sm text-gray-600 text-center">
            Enter your email to receive a password reset link
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md font-medium hover:bg-indigo-700 transition disabled:opacity-50"
            disabled={resending}
          >
            {resending ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>

        {message && (
          <div className="mt-6 text-center">
            <div className="flex justify-center mb-2">
              <MailCheck size={24} className="text-green-600" />
            </div>
            <p className="text-green-600 font-medium">{message}</p>
            <button
              onClick={sendResetRequest}
              className="mt-3 text-sm text-blue-600 underline hover:text-blue-800 disabled:opacity-50 cursor-pointer"
              disabled={resending}
            >
              {resending ? 'Resending...' : "Didn't receive it? Resend Email"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
