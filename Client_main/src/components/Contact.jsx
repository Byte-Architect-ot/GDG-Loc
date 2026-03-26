import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, ExternalLink, Send } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

const Contact = () => {
  const { isDarkMode } = useTheme();

  return (
    <section
      id="contact"
      className={`relative w-full py-20 sm:py-28 overflow-hidden transition-colors duration-500 ${
        isDarkMode
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-white via-slate-50 to-white'
      }`}
      style={{ fontFamily: "'Inter', -apple-system, sans-serif" }}
    >
      {/* Decorative blur orbs */}
      <div className={`absolute top-10 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none ${
        isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'
      }`} />
      <div className={`absolute bottom-10 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none ${
        isDarkMode ? 'bg-green-500/10' : 'bg-green-500/5'
      }`} />

      <div className="max-w-5xl mx-auto px-6 lg:px-8 relative z-10">
        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center gap-1.5 mb-4">
            {GOOGLE_COLORS.map((color, i) => (
              <motion.div
                key={i}
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: color }}
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-3 ${
            isDarkMode ? 'text-white' : 'text-slate-900'
          }`}>
            Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-red-500 to-yellow-500">Touch</span>
          </h2>
          <p className={`text-base sm:text-lg max-w-lg mx-auto ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            Have a question or want to collaborate? We'd love to hear from you.
          </p>
        </motion.div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <motion.a
            href="mailto:gdgwce@gmail.com"
            className={`group relative p-6 rounded-2xl border transition-all duration-300 hover:shadow-xl ${
              isDarkMode
                ? 'bg-slate-800/60 border-slate-700 hover:border-blue-500/50'
                : 'bg-white border-slate-200 hover:border-blue-400'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            whileHover={{ y: -4 }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300 ${
              isDarkMode
                ? 'bg-blue-900/40 text-blue-400 group-hover:bg-blue-600 group-hover:text-white'
                : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
            }`}>
              <Mail size={22} />
            </div>
            <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Email Us
            </h3>
            <p className={`text-sm flex items-center gap-1 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              gdgwce@gmail.com
              <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
            </p>
          </motion.a>

          {/* Location Card */}
          <motion.div
            className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-800/60 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isDarkMode
                ? 'bg-red-900/40 text-red-400'
                : 'bg-red-50 text-red-500'
            }`}>
              <MapPin size={22} />
            </div>
            <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Find Us
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Walchand College of Engineering, Sangli — 416415
            </p>
          </motion.div>

          {/* Quick Message Card */}
          <motion.div
            className={`group relative p-6 rounded-2xl border transition-all duration-300 ${
              isDarkMode
                ? 'bg-slate-800/60 border-slate-700'
                : 'bg-white border-slate-200'
            }`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${
              isDarkMode
                ? 'bg-green-900/40 text-green-400'
                : 'bg-green-50 text-green-600'
            }`}>
              <Send size={22} />
            </div>
            <h3 className={`font-bold text-lg mb-1 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Follow Us
            </h3>
            <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Stay updated on Instagram, LinkedIn & more.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
