'use client';

import { motion } from 'framer-motion';

export default function PasswordTableSkeleton() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="animate-pulse"
    >
      <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-lg p-4 md:p-6 shadow-xl">
        <div className="flex items-center justify-between mb-6">
          <div className="h-6 w-40 bg-neutral-300 rounded"></div>
          <div className="h-6 w-6 bg-neutral-300 rounded-full"></div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm table-auto">
            <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-neutral-700 hidden md:table-header-group">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Website</th>
                <th className="px-4 py-3 text-left font-semibold">Username</th>
                <th className="px-4 py-3 text-left font-semibold">Password</th>
                <th className="px-4 py-3 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white/60 divide-y divide-neutral-200">
              {[...Array(4)].map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-4">
                    <div className="h-4 w-24 bg-neutral-200 rounded mb-2"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-32 bg-neutral-200 rounded mb-2"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="h-4 w-30 bg-neutral-200 rounded mb-2"></div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      <div className="h-4 w-4 bg-neutral-200 rounded-full"></div>
                      <div className="h-4 w-4 bg-neutral-200 rounded-full"></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
