import React from 'react';
import { Eye, Lock } from 'lucide-react';
import { motion } from 'framer-motion';

const SecuritySection = () => {
  const securityFeatures = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: 'Zero Knowledge',
      description:
        'Only you can access your passwords. We cannot read or reset them.',
      delay: 0.1,
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Encrypted Storage',
      description:
        'AES-256 encryption ensures your data remains protected at all times.',
      delay: 0.2,
    },
  ];
  return (
    <section id="security" className="relative py-20 px-6 md:px-12">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-4xl md:text-5xl font-bold mb-6 py-4 bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          Security First
        </h3>
        <p className="max-w-2xl mx-auto text-neutral-600 text-lg">
          Your security is our top priority. We employ industry best practices
          to keep your data private.
        </p>
      </motion.div>

      <div className="flex flex-col md:flex-row justify-center gap-8 max-w-4xl mx-auto">
        {securityFeatures.map((feature, index) => (
          <motion.div
            key={index}
            className="flex-1 p-8 rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-200 hover:border-purple-300 transition-all duration-300 shadow-lg hover:shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: feature.delay }}
            viewport={{ once: true }}
            whileHover={{ y: -5, scale: 1.02 }}
          >
            <motion.div
              className="text-purple-600 mb-4"
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              {feature.icon}
            </motion.div>

            <h4 className="text-neutral-900 font-bold text-xl mb-3">
              {feature.title}
            </h4>

            <p className="text-neutral-600 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SecuritySection;
