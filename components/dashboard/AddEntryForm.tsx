import { motion } from 'framer-motion';
import { Plus, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

interface AddEntryFormProps {
  form: {
    website: string;
    username: string;
    password: string;
    showPassword: boolean;
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

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      onSubmit={addPassword}
      className="relative bg-white/30 backdrop-blur-lg border border-white/30 rounded-xl p-6 mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 shadow-lg z-10"
    >
      <div className="space-y-1">
        <label htmlFor="website" className="text-sm font-medium text-gray-700">
          Website
        </label>
        <input
          id="website"
          name="website"
          value={form.website}
          onChange={handleFormChange}
          required
          placeholder="example.com"
          className="w-full p-2 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium text-gray-700">
          Username
        </label>
        <input
          id="username"
          name="username"
          value={form.username}
          onChange={handleFormChange}
          required
          placeholder="user@example.com"
          className="w-full p-2 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
        />
      </div>

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium text-gray-700">
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
            className="w-full p-2 pr-10 rounded-lg bg-white/70 backdrop-blur-sm border border-white/30 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="button"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
      </div>

      <div className="flex items-end sm:col-span-2 lg:col-span-1">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg flex items-center justify-center gap-2 py-2 px-4 transition-all shadow-lg hover:shadow-xl text-sm"
        >
          <Plus size={16} /> Add
        </motion.button>
      </div>
    </motion.form>
  );
}
