'use client';

import { motion } from 'framer-motion';
import { Plus, Eye, EyeOff, Sparkles, Settings2, X } from 'lucide-react';
import { useState } from 'react';

interface AddEntryFormProps {
  form: {
    website: string;
    username: string;
    password: string;
  };
  handleFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  addPassword: (e: React.FormEvent) => void;
}

export default function AddEntryForm({
  form,
  handleFormChange,
  addPassword,
}: AddEntryFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);

  const generatePassword = () => {
    let charset = '';
    if (useUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) charset += '0123456789';
    if (useSymbols) charset += '!@#$%^&*()_+{}[]<>?/|';

    if (!charset) {
      alert('Please select at least one character set');
      return;
    }

    const length = 12;
    let generated = '';
    for (let i = 0; i < length; i++) {
      const randIndex = Math.floor(Math.random() * charset.length);
      generated += charset[randIndex];
    }

    handleFormChange({
      target: { name: 'password', value: generated },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  return (
    <>
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 flex items-center justify-center">
          <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm relative shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              <X size={18} />
            </button>
            <h3 className="text-lg font-semibold mb-4 text-gray-700">
              Customize Character Set
            </h3>
            <div className="space-y-3 text-sm text-gray-700">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useUppercase}
                  onChange={() => setUseUppercase(!useUppercase)}
                />
                Uppercase Letters (A–Z)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useLowercase}
                  onChange={() => setUseLowercase(!useLowercase)}
                />
                Lowercase Letters (a–z)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useNumbers}
                  onChange={() => setUseNumbers(!useNumbers)}
                />
                Numbers (0–9)
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={useSymbols}
                  onChange={() => setUseSymbols(!useSymbols)}
                />
                Symbols (!@#$...)
              </label>
            </div>
          </div>
        </div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        onSubmit={addPassword}
        className="relative bg-white/30 backdrop-blur-lg border border-white/30 rounded-lg p-6 mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-sm z-10"
      >
        {/* Website */}
        <div className="space-y-1">
          <label
            htmlFor="website"
            className="text-sm font-medium text-gray-700"
          >
            Website
          </label>
          <input
            id="website"
            name="website"
            value={form.website}
            onChange={handleFormChange}
            required
            placeholder="example.com"
            className="w-full p-2 rounded-lg bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label
            htmlFor="username"
            className="text-sm font-medium text-gray-700"
          >
            Username
          </label>
          <input
            id="username"
            name="username"
            value={form.username}
            onChange={handleFormChange}
            required
            placeholder="user@example.com"
            className="w-full p-2 rounded-lg bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Password */}
        <div className="space-y-1 sm:col-span-2 lg:col-span-1">
          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <div className="relative">
            <input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              value={form.password}
              onChange={handleFormChange}
              required
              placeholder="••••••••"
              className="w-full p-2 pr-10 rounded-lg bg-white/70 border border-gray-200 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          {/* Generator & Options Buttons */}
          <div className="flex gap-6 mt-3">
            <button
              type="button"
              onClick={generatePassword}
              className="text-xs text-purple-600 font-medium hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Sparkles size={14} /> Generate
            </button>
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className="text-xs text-gray-600 hover:text-gray-800 flex items-center gap-1 cursor-pointer"
            >
              <Settings2 size={14} /> Modify
            </button>
          </div>
        </div>

        {/* Submit */}
        <div className="flex items-center h-full">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 py-3 px-4 transition-all shadow-lg hover:shadow-xl text-sm"
          >
            <Plus size={16} /> Add
          </motion.button>
        </div>
      </motion.form>
    </>
  );
}
