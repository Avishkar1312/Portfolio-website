import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowUp } from 'lucide-react';
import { portfolioData } from '../data/portfolio';

const Footer = () => {
  const { personal } = portfolioData;
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white py-12 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {personal.name}
            </h3>
            <p className="text-gray-400 mb-6 max-w-md mx-auto">
              Thanks for visiting my portfolio. Let's build something amazing together!
            </p>
            
            <div className="flex items-center justify-center text-gray-400 mb-8">
              <span>Made with</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mx-2"
              >
                <Heart size={16} className="text-red-500 fill-current" />
              </motion.div>
              <span>using React & Tailwind CSS</span>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-500 text-sm">
                © {currentYear} {personal.name}. All rights reserved.
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="absolute bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300"
      >
        <ArrowUp size={20} />
      </motion.button>
    </footer>
  );
};

export default Footer;