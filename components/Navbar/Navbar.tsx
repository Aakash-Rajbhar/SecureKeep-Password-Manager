import { motion } from 'framer-motion';
import Image from 'next/image';

interface NavbarProps {
  isScrolled: boolean;
  isAuthenticated?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({
  isScrolled,
  isAuthenticated = false,
}) => {
  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-100 ${
        isScrolled ? 'bg-white/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6 md:px-12 py-5">
        <motion.a
          href="#hero"
          className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 400 }}
        >
          <Image
            src="/text-logo.svg"
            alt="SecureKeep"
            width={160}
            height={90}
            className="inline-block"
          />
        </motion.a>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {['Features', 'How-it-works', 'Security'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="hover:text-purple-600 transition-colors relative text-neutral-700"
              whileHover={{ y: -2 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {item}
              <motion.div
                className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-600 to-blue-600 origin-left"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <motion.a
              href="/dashboard"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Dashboard
            </motion.a>
          ) : (
            <>
              <motion.a
                href="/login"
                className="text-sm font-medium hover:text-purple-600 transition-colors text-neutral-700"
                whileHover={{ scale: 1.05 }}
              >
                Login
              </motion.a>
              <motion.a
                href="/register"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 shadow-lg hover:shadow-purple-500/25 cursor-pointer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                Get Started
              </motion.a>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
