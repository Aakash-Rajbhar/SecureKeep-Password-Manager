'use client';

import { motion } from 'framer-motion';

export default function PasswordTableSkeleton() {
  // Number of skeleton rows to display
  const skeletonRows = 5;

  return (
    <div className="bg-white/30 backdrop-blur-md border border-white/20 rounded-lg p-4 md:p-6 shadow-xl">
      <div className="flex items-center justify-between mb-4 md:mb-6">
        <div className="h-6 w-32 bg-neutral-200 rounded-md animate-pulse"></div>
        <div className="h-8 w-8 bg-neutral-200 rounded-md animate-pulse"></div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gradient-to-r from-indigo-100 to-purple-100 text-neutral-700 hidden md:table-header-group">
            <tr>
              <th className="px-4 py-3 text-left font-semibold md:w-1/4">
                <div className="h-5 w-24 bg-neutral-300 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3 text-left font-semibold md:w-1/4">
                <div className="h-5 w-24 bg-neutral-300 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3 text-left font-semibold md:w-1/3">
                <div className="h-5 w-24 bg-neutral-300 rounded-md animate-pulse"></div>
              </th>
              <th className="px-4 py-3 text-right font-semibold md:w-1/6">
                <div className="h-5 w-24 bg-neutral-300 rounded-md animate-pulse ml-auto"></div>
              </th>
            </tr>
          </thead>

          <tbody className="bg-white/60 divide-y divide-neutral-200">
            {Array.from({ length: skeletonRows }).map((_, index) => (
              <motion.tr
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="hover:bg-indigo-50 rounded-lg block md:table-row mb-4 md:mb-0"
              >
                {/* Website */}
                <td className="px-4 py-4 block md:table-cell">
                  <div className="md:hidden mb-2">
                    <div className="h-4 w-16 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 rounded-full bg-neutral-200 animate-pulse"></div>
                    <div className="h-4 w-24 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                </td>

                {/* Username */}
                <td className="px-4 py-4 block md:table-cell">
                  <div className="md:hidden mb-2">
                    <div className="h-4 w-16 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                  <div className="h-4 w-32 bg-neutral-200 rounded-md animate-pulse"></div>
                </td>

                {/* Password */}
                <td className="px-4 py-4 block md:table-cell">
                  <div className="md:hidden mb-2">
                    <div className="h-4 w-16 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="h-4 w-24 bg-neutral-200 rounded-md animate-pulse"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 w-4 bg-neutral-200 rounded-full animate-pulse"></div>
                      <div className="h-4 w-4 bg-neutral-200 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-4 block md:table-cell text-left md:text-right">
                  <div className="md:hidden mb-2">
                    <div className="h-4 w-16 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                  <div className="flex justify-start md:justify-end space-x-4">
                    <div className="h-5 w-5 bg-neutral-200 rounded-md animate-pulse"></div>
                    <div className="h-5 w-5 bg-neutral-200 rounded-md animate-pulse"></div>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
