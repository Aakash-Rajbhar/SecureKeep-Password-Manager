import { Shield, Search, Database } from 'lucide-react';
import { motion } from 'framer-motion';

const FeaturedSection = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'End-to-End Encryption',
      description:
        'Your data is encrypted before it leaves your device using AES-256. Only you hold the key.',
      gradient: 'from-blue-500 to-purple-600',
    },
    {
      icon: <Search className="w-6 h-6" />,
      title: 'Search & Auto-Fill',
      description:
        'Quickly find passwords and auto-fill login forms to save time and effort.',
      gradient: 'from-purple-500 to-blue-600',
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: 'Admin Panel',
      description:
        'Manage entries, export securely, and control your credentials through a sleek dashboard.',
      gradient: 'from-blue-500 to-red-600',
    },
  ];

  return (
    <section id="features" className="relative py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-4xl md:text-5xl font-bold py-4 mb-6 bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          Why SecureKeep?
        </h3>
        <p className="max-w-2xl mx-auto text-neutral-600 text-lg">
          Everything you need to store, manage, and secure your credentials in
          one place.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="group relative p-8 rounded-2xl bg-white/80 backdrop-blur-sm border border-neutral-200 hover:border-purple-300 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <motion.div
              className={`w-12 h-12 rounded-full bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 text-white`}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {feature.icon}
            </motion.div>

            <h4 className="font-bold text-xl mb-3 text-neutral-900 group-hover:text-purple-700 transition-colors">
              {feature.title}
            </h4>

            <p className="text-neutral-600 leading-relaxed">
              {feature.description}
            </p>

            <motion.div
              className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedSection;
