import Image from 'next/image';
import { motion, MotionValue } from 'framer-motion';

interface HeroProps {
  heroY: MotionValue<number>;
  opacity: MotionValue<number>;
}

const Hero = ({ heroY, opacity }: HeroProps) => {
  return (
    <motion.section
      id="hero"
      className="relative pt-32 pb-20 px-6 md:px-12 text-center"
      style={{ y: heroY, opacity }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className="text-5xl md:text-7xl font-bold leading-tight mb-6 bg-gradient-to-r from-neutral-900 via-purple-800 to-blue-800 bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Protect Your Digital Life with{' '}
          <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            SecureKeep🔒
          </span>
        </motion.h2>

        <motion.p
          className="max-w-2xl mx-auto text-neutral-600 mb-10 text-lg md:text-xl leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          A modern password manager that protects your digital life with robust
          encryption while keeping your credentials easily accessible.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center gap-6 mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.a
            href="/register"
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 rounded-full text-lg font-medium shadow-2xl hover:shadow-purple-500/25 transition-all duration-300"
            whileHover={{ scale: 1.05, y: -3 }}
            whileTap={{ scale: 0.95 }}
          >
            <button className="cursor-pointer">
              Try Now
              <motion.span
                className="inline-block ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                →
              </motion.span>
            </button>
          </motion.a>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div
          className="mx-auto max-w-6xl rounded-2xl overflow-hidden border border-neutral-200 shadow-2xl backdrop-blur-sm bg-white/80"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1 }}
          whileHover={{ y: -10, scale: 1.02 }}
        >
          <div className="bg-gradient-to-r from-neutral-100 to-neutral-200 p-4 flex items-center gap-2">
            <div className="flex gap-2">
              <div className="w-3 h-3 bg-red-400 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
              <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            </div>
            <div className="flex-1 text-center text-sm text-neutral-600">
              SecureKeep Dashboard
            </div>
          </div>
          <div className="aspect-video bg-gradient-to-br from-white to-neutral-50 flex items-center justify-center">
            <Image
              src="/dashboard-preview.png"
              alt="dashboard preview"
              width={1200}
              height={800}
              className="rounded-b-2xl object-cover"
            />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
