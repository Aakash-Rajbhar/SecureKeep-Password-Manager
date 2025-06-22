import { motion } from 'framer-motion';
import { Home, LogOut } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();

  const logout = async () => {
    await fetch('/api/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });

    router.push('/');
  };
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative flex justify-between items-start sm:items-center mb-8 gap-4 z-10"
    >
      <div>
        {/* <h1 className="text-3xl font-bold text-gray-800 bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
          SecureKeep
        </h1> */}
        <Image
          src="/text-logo.svg"
          alt="SecureKeep"
          width={160}
          height={90}
          className="w-44 sm:w-48"
        />
        <p className="text-gray-500 text-sm ml-1">
          Your digital keys, protected
        </p>
      </div>

      <div className="flex items-center gap-3">
        <motion.a
          href="/"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          title="Go to Home"
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 hover:bg-white text-gray-700 transition-all shadow-sm cursor-pointer"
        >
          <Home size={20} />
        </motion.a>
        <motion.button
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/70 backdrop-blur-sm border border-gray-300 hover:bg-white text-gray-700 transition-all shadow-sm cursor-pointer"
        >
          <LogOut size={20} />
          <span className="">Logout</span>
        </motion.button>
      </div>
    </motion.header>
  );
}
