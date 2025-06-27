import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail } from 'lucide-react';
import { portfolioData } from '../data/portfolio';
import { useScrollReveal } from '../hooks/useScrollReveal';

const About = () => {
  const { personal } = portfolioData;
  const { ref, isInView } = useScrollReveal();

  return (
    <section id="about" ref={ref} className="py-20 bg-gray-50 dark:bg-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                {personal.bio}
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin size={20} className="mr-3 text-blue-600" />
                  <span>{personal.location}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Phone size={20} className="mr-3 text-blue-600" />
                  <span>{personal.phone}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mail size={20} className="mr-3 text-blue-600" />
                  <span>{personal.email}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl transform rotate-6"></div>
              <img
                src={personal.avatar}
                alt={personal.name}
                className="relative w-full h-96 object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;