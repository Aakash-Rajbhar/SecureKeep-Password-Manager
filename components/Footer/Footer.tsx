import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 md:px-12 border-t border-neutral-200 bg-white/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center text-neutral-500"
      >
        © {new Date().getFullYear()} SecureVault. All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
