import { motion } from 'framer-motion';
import { LogOut, Search } from 'lucide-react';

interface SearchHeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  logout: () => void;
}

export default function SearchHeader({
  searchTerm,
  setSearchTerm,
  logout,
}: SearchHeaderProps) {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 z-10"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          SecureVault
        </h1>
        <p className="text-gray-500 text-sm">Your digital keys, protected</p>
      </div>

      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="relative flex-grow sm:flex-grow-0 sm:w-64">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search entries..."
            className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white/70 backdrop-blur-sm shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 hover:bg-white text-gray-700 transition-all shadow-sm"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
