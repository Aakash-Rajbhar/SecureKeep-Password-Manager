import React from 'react';
import { motion } from 'framer-motion';

const How = () => {
  const steps = [
    {
      number: '01',
      title: 'Sign Up',
      description: 'Create your free account and login to your secure vault.',
    },
    {
      number: '02',
      title: 'Add Passwords',
      description:
        'Use our form or import tool to store your credentials encrypted.',
    },
    {
      number: '03',
      title: 'Manage Securely',
      description: 'Search, edit, and export passwords with full control.',
    },
  ];
  return (
    <section
      id="how-it-works"
      className="relative py-20 px-6 md:px-12 bg-white/60 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h3 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent">
          How it works
        </h3>
        <p className="max-w-2xl mx-auto text-neutral-600 text-lg">
          From creating an account to storing and securing your data, everything
          is seamless.
        </p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        {steps.map((step, index) => (
          <motion.div
            key={index}
            className="flex items-center mb-12 last:mb-0"
            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            viewport={{ once: true }}
          >
            <div
              className={`flex-1 ${
                index % 2 === 0 ? 'text-right pr-8' : 'text-left pl-8 order-2'
              }`}
            >
              <motion.div
                className="inline-block p-6 rounded-2xl bg-white/90 backdrop-blur-sm border border-neutral-200 shadow-lg"
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <h4 className="font-bold text-xl mb-2 text-neutral-900">
                  {step.title}
                </h4>
                <p className="text-neutral-600">{step.description}</p>
              </motion.div>
            </div>

            <motion.div
              className={`w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold text-lg ${
                index % 2 === 0 ? '' : 'order-1'
              }`}
              whileHover={{ scale: 1.1, rotate: 5 }}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(147, 51, 234, 0.7)',
                  '0 0 0 20px rgba(147, 51, 234, 0)',
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: index * 0.5,
              }}
            >
              {step.number}
            </motion.div>

            {index < steps.length - 1 && (
              <motion.div
                className={`absolute w-0.5 h-12 bg-gradient-to-b from-purple-600 to-blue-600 ${
                  index % 2 === 0
                    ? 'left-1/2 transform -translate-x-1/2'
                    : 'left-1/2 transform -translate-x-1/2'
                } mt-[210px] sm:mt-[155px]`}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
                viewport={{ once: true }}
              />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default How;
