import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Github, Linkedin, Instagram,
  Mail, ArrowUpRight, Heart, MapPin,
  ExternalLink, Send, Sparkles
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';
import Contact from './Contact';

const SOCIALS = [
  { id: 2, icon: Linkedin, label: "LinkedIn", href: "#", hoverBg: "hover:bg-[#0077b5]", hoverText: "hover:text-white" },
  { id: 4, icon: Instagram, label: "Instagram", href: "#", hoverBg: "hover:bg-gradient-to-br hover:from-purple-600 hover:via-pink-500 hover:to-orange-400", hoverText: "hover:text-white" },
  { id: 5, icon: Mail, label: "Email", href: "mailto:gdgwce@gmail.com", hoverBg: "hover:bg-[#EA4335]", hoverText: "hover:text-white" },
];

const FOOTER_LINKS = [
  {
    title: "Chapter",
    links: [
      { name: "About Us", href: "#" },
      { name: "Our Team", href: "#" },
      { name: "Our Aim", href: "#" },
    ]
  },
  {
    title: "Quick Links",
    links: [
      { name: "Events", href: "#", external: true },
      { name: "Teams", href: "#", external: true },
      { name: "Domains", href: "#", external: true },
      { name: "Explore", href: "#", external: true },
    ]
  }
];

const GOOGLE_COLORS = ['#4285F4', '#EA4335', '#FBBC05', '#34A853'];

const GDGFooter = () => {
  const { isDarkMode } = useTheme();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  return (
    <>
    <Contact />
    <footer
      className={`relative overflow-hidden transition-colors duration-300
        ${isDarkMode
          ? 'bg-gradient-to-b from-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-slate-50 to-white'}`}
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif" }}
    >

      {/* Animated Google Color Bar */}
      <div className="flex h-1 w-full">
        {GOOGLE_COLORS.map((color, i) => (
          <motion.div
            key={i}
            className="flex-1"
            style={{ backgroundColor: color }}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className={`absolute top-10 -right-20 w-72 h-72 rounded-full blur-3xl pointer-events-none transition-colors duration-300
        ${isDarkMode ? 'bg-blue-500/10' : 'bg-blue-500/5'}`} />
      <div className={`absolute bottom-10 -left-20 w-60 h-60 rounded-full blur-3xl pointer-events-none transition-colors duration-300
        ${isDarkMode ? 'bg-green-500/10' : 'bg-green-500/5'}`} />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

        {/* Newsletter Section - Compact */}
        <div className="py-10 lg:py-12">
          <div className={`relative rounded-2xl p-6 lg:p-8 overflow-hidden transition-colors duration-300
            ${isDarkMode
              ? 'bg-slate-800 border border-slate-700'
              : 'bg-slate-900'}`}>
            {/* Background Pattern */}
            <div className={`absolute inset-0 transition-opacity duration-300
              ${isDarkMode ? 'opacity-5' : 'opacity-10'}`}>
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }} />
            </div>

            {/* Google Dots - Corner Cluster */}
            <div className="absolute top-4 right-4 flex gap-1.5">
              {GOOGLE_COLORS.map((color, i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.7, 1, 0.7]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.15
                  }}
                />
              ))}
            </div>

            {/* Vertical Dots - Left Side */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-2">
              {GOOGLE_COLORS.map((color, i) => (
                <motion.div
                  key={i}
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: color }}
                  animate={{
                    x: [0, 3, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </div>

            <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 lg:pl-8">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-400 text-xs font-semibold uppercase tracking-wider">
                    Stay Updated
                  </span>
                </div>
                <h2
                  className="text-2xl lg:text-3xl font-bold text-white"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  Queries?
                </h2>
                <p className={`max-w-sm text-sm transition-colors duration-300
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-400'}`}>
                  Get the latest updates on events, workshops, and opportunities.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto">
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className={`w-full sm:w-64 pl-10 pr-4 py-3 border rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all text-sm
                      ${isDarkMode
                        ? 'bg-slate-700/50 border-slate-600'
                        : 'bg-white/10 border-white/10'}`}
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`px-5 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-colors text-sm
                    ${isDarkMode
                      ? 'bg-blue-600 text-white hover:bg-blue-500'
                      : 'bg-white text-slate-900 hover:bg-blue-50'}`}
                >
                  <Send size={14} />
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content - Compact */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-6 pb-10">

          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="space-y-3">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1">
                  {GOOGLE_COLORS.map((color, i) => (
                    <div
                      key={i}
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
                <div className="flex items-baseline gap-2">
                  <span
                    className={`text-xl font-bold transition-colors duration-300
                      ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    GDG
                  </span>
                  <span className={`font-medium text-sm transition-colors duration-300
                    ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>On Campus</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full border text-[10px] font-semibold transition-colors duration-300
                  ${isDarkMode
                    ? 'bg-gradient-to-r from-blue-900/50 to-green-900/50 border-blue-800/50 text-slate-300'
                    : 'bg-gradient-to-r from-blue-50 to-green-50 border-blue-100/50 text-slate-600'}`}>
                  WCE Sangli
                </span>
              </div>
            </div>

            {/* Location - Inline */}
            <div className={`flex items-start gap-2 text-sm transition-colors duration-300
              ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <MapPin size={14} className="text-red-500 shrink-0 mt-0.5" />
              <span>Walchand College of Engineering, Sangli - 416415</span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
              {SOCIALS.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.id}
                    href={social.href}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`p-2.5 rounded-lg border transition-all duration-300 shadow-sm hover:shadow-md hover:border-transparent ${social.hoverBg} ${social.hoverText}
                      ${isDarkMode
                        ? 'bg-slate-800 border-slate-700 text-slate-400'
                        : 'bg-white border-slate-100 text-slate-500'}`}
                    aria-label={social.label}
                  >
                    <IconComponent size={16} />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-8">
            {FOOTER_LINKS.map((section, idx) => (
              <div key={idx}>
                <h4
                  className={`font-bold mb-3 text-xs uppercase tracking-wider transition-colors duration-300
                    ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, i) => (
                    <li key={i}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 3 }}
                        className={`text-sm transition-colors flex items-center gap-1.5 group
                          ${isDarkMode
                            ? 'text-slate-400 hover:text-white'
                            : 'text-slate-500 hover:text-slate-900'}`}
                      >
                        {link.name}
                        {link.external && (
                          <ExternalLink size={10} className="opacity-50 group-hover:opacity-100" />
                        )}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar - Compact */}
        <div className={`border-t py-5 transition-colors duration-300
          ${isDarkMode ? 'border-slate-800' : 'border-slate-100'}`}>
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

            {/* Copyright */}
            <div className={`flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-xs transition-colors duration-300
              ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              <span>&copy; {new Date().getFullYear()} GDG On Campus WCE</span>
            </div>

            {/* Google Dots */}
            <div className="flex items-center gap-2">
              <span className={`text-[10px] font-medium transition-colors duration-300
                ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>Powered by</span>
              <div className="flex gap-1">
                {GOOGLE_COLORS.map((color, i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className={`text-[10px] font-semibold transition-colors duration-300
                ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>GDG Community</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  </>
  );
};

export default GDGFooter;