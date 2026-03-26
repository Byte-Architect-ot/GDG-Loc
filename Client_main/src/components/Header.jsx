import React, { useState, useEffect, useMemo, useRef, useCallback } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "framer-motion";
import { Terminal, ChevronDown, Check, Menu, X, Sun, Moon, Sparkles, Zap, Code2, Cpu } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { useYear } from '../contexts/YearContext';
import { useTheme } from '../contexts/ThemeContext';

// GDG Brand Colors
const GDG_COLORS = {
  blue: '#4285F4',
  red: '#EA4335',
  yellow: '#FBBC04',
  green: '#34A853'
};


// MAGNETIC HOVER COMPONENT

const Magnetic = ({
  children,
  intensity = 0.3,
  className = ""




}) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 300, damping: 20 });
  const springY = useSpring(y, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * intensity);
    y.set((e.clientY - centerY) * intensity);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}>

      {children}
    </motion.div>);

};


// ANIMATED LOGO WITH 3D CUBE

const AnimatedLogo = ({ onClick }) => {
  const cubeRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!cubeRef.current) return;

    const tl = gsap.timeline({ repeat: -1 });
    tl.to(cubeRef.current, {
      rotateY: 360,
      rotateX: 360,
      duration: 8,
      ease: "none"
    });

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!cubeRef.current) return;
    if (isHovered) {
      gsap.to(cubeRef.current, {
        scale: 1.2,
        duration: 0.4,
        ease: "back.out(1.7)"
      });
    } else {
      gsap.to(cubeRef.current, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovered]);

  return (
    <Magnetic intensity={0.2}>
      <a
        href="/"
        onClick={onClick}
        className="flex items-center gap-2 sm:gap-3 cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>

        {/* Logo */}
        <img src="/logo.svg" alt="GDG Logo" className="w-8 h-8 object-contain drop-shadow" />

        {/* Logo Text */}
        <div className="relative overflow-hidden flex items-center">
          <span
            className="font-heading font-extrabold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white glitch-text scramble-hover"
            data-text="GDG-WCE">
            GDG<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] mx-[1px]">-</span>WCE
          </span>

          {/* Animated underline on hover */}
          <motion.div
            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]"
            initial={{ width: 0 }}
            whileHover={{ width: '100%' }}
            transition={{ duration: 0.3 }} />

        </div>

        {/* Floating sparkle */}
        <motion.div
          className="hidden sm:block"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{
            rotate: { duration: 4, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity }
          }}>

          <Sparkles size={16} className="text-[#FBBC04]" />
        </motion.div>
      </a>
    </Magnetic>);

};


// PREMIUM THEME TOGGLE WITH ANIMATIONS

const ThemeToggle = ({ className = "" }) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const buttonRef = useRef(null);
  const [particles, setParticles] = useState([]);

  const handleClick = () => {
    // Create burst particles
    const newParticles = Array.from({ length: 8 }, (_, i) => ({
      id: Date.now() + i,
      x: Math.cos(i / 8 * Math.PI * 2) * 30,
      y: Math.sin(i / 8 * Math.PI * 2) * 30,
      color: [GDG_COLORS.blue, GDG_COLORS.red, GDG_COLORS.yellow, GDG_COLORS.green][i % 4]
    }));
    setParticles(newParticles);

    // Clear particles after animation
    setTimeout(() => setParticles([]), 600);

    // GSAP button animation
    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current,
        { scale: 0.8, rotate: -10 },
        { scale: 1, rotate: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" }
      );
    }

    toggleTheme();
  };

  return (
    <Magnetic intensity={0.3}>
      <motion.button
        ref={buttonRef}
        onClick={handleClick}
        className={`
          relative p-3 rounded-xl 
          bg-slate-100 dark:bg-slate-800 
          hover:bg-slate-200 dark:hover:bg-slate-700
          border-2 border-slate-200 dark:border-slate-700
          hover:border-[#4285F4] dark:hover:border-[#4285F4]
          transition-all duration-300 
          focus:outline-none focus:ring-2 focus:ring-[#4285F4] focus:ring-offset-2
          dark:focus:ring-offset-slate-900
          group overflow-visible
          ${className}
        `}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}>

        {/* Burst particles */}
        <AnimatePresence>
          {particles.map((particle) =>
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: particle.color,
                left: '50%',
                top: '50%'
              }}
              initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
              animate={{
                x: particle.x,
                y: particle.y,
                opacity: 0,
                scale: 0
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }} />

          )}
        </AnimatePresence>

        <div className="relative w-6 h-6">
          <AnimatePresence mode="wait">
            {isDarkMode ?
              <motion.div
                key="moon"
                initial={{ rotate: -90, opacity: 0, scale: 0.5, y: 10 }}
                animate={{ rotate: 0, opacity: 1, scale: 1, y: 0 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.5, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 flex items-center justify-center">

                <Moon className="w-6 h-6 text-[#4285F4]" />
              </motion.div> :

              <motion.div
                key="sun"
                initial={{ rotate: 90, opacity: 0, scale: 0.5, y: -10 }}
                animate={{ rotate: 0, opacity: 1, scale: 1, y: 0 }}
                exit={{ rotate: -90, opacity: 0, scale: 0.5, y: 10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                className="absolute inset-0 flex items-center justify-center">

                <Sun className="w-6 h-6 text-[#FBBC04]" />
              </motion.div>
            }
          </AnimatePresence>
        </div>

        {/* Rotating ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-[#4285F4]/30 pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }} />

      </motion.button>
    </Magnetic>);

};


// INTERACTIVE NAV LINK WITH HOVER EFFECTS

const NavLink = ({
  href,
  children,
  onClick,
  isMobile = false,
  color = GDG_COLORS.blue






}) => {
  const linkRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!linkRef.current || isMobile) return;

    if (isHovered) {
      gsap.to(linkRef.current, {
        y: -2,
        duration: 0.3,
        ease: "power2.out"
      });
    } else {
      gsap.to(linkRef.current, {
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    }
  }, [isHovered, isMobile]);

  if (isMobile) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className="block w-full px-4 py-4 text-lg font-heading font-semibold text-slate-700 dark:text-slate-200 
                   hover:text-[#4285F4] dark:hover:text-[#4285F4] 
                   hover:bg-slate-50 dark:hover:bg-slate-800/50 
                   transition-all rounded-xl relative overflow-hidden group"



        whileHover={{ x: 8 }}
        whileTap={{ scale: 0.98 }}>

        <span className="relative z-10">{children}</span>
        <motion.div
          className="absolute left-0 top-0 bottom-0 w-1 rounded-r-full"
          style={{ background: color }}
          initial={{ scaleY: 0 }}
          whileHover={{ scaleY: 1 }}
          transition={{ duration: 0.2 }} />

      </motion.a>);

  }

  return (
    <Magnetic intensity={0.2}>
      <a
        ref={linkRef}
        href={href}
        onClick={onClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative text-sm font-heading font-semibold text-slate-600 dark:text-slate-400 
                   hover:text-slate-900 dark:hover:text-white
                   transition-colors uppercase tracking-wider cursor-pointer group px-1 py-2">



        <span className="relative z-10">{children}</span>

        {/* Animated underline */}
        <motion.span
          className="absolute -bottom-0.5 left-0 h-0.5 rounded-full"
          style={{ background: color }}
          initial={{ width: 0 }}
          animate={{ width: isHovered ? '100%' : 0 }}
          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }} />


        {/* Dot indicator */}
        <motion.span
          className="absolute -top-1 -right-1 w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: isHovered ? 1 : 0,
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.2 }} />

      </a>
    </Magnetic>);

};


// PREMIUM DROPDOWN WITH ANIMATIONS

const YearDropdown = ({
  years,
  selectedYear,
  onSelect,
  isMobile = false,
  loading = false






}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  // GSAP animation for dropdown content
  useEffect(() => {
    if (!contentRef.current || isMobile) return;

    if (isOpen) {
      gsap.fromTo(contentRef.current,
        { opacity: 0, y: -10, scale: 0.95 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "back.out(1.7)" }
      );
    }
  }, [isOpen, isMobile]);

  const handleSelect = (year) => {
    onSelect(year);
    setIsOpen(false);
  };

  if (loading) {
    return (
      <div className={`${isMobile ? 'w-full px-4 py-3' : 'w-36 px-3 py-2'} 
                       text-sm text-slate-400 dark:text-slate-500 
                       bg-slate-100 dark:bg-slate-800 
                       border border-slate-200 dark:border-slate-700 
                       rounded-xl animate-pulse`}>
        {isMobile ? 'Loading years...' : 'Loading...'}
      </div>);

  }

  if (isMobile) {
    return (
      <div className="w-full" ref={dropdownRef}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full flex items-center justify-between px-4 py-4 
            text-lg font-heading font-semibold 
            text-slate-700 dark:text-slate-200 
            bg-slate-50 dark:bg-slate-800/50 
            border-2 rounded-xl
            transition-all duration-200 
            ${isOpen ?
              'border-[#4285F4] ring-2 ring-[#4285F4]/20' :
              'border-slate-200 dark:border-slate-700'}
          `}
          whileTap={{ scale: 0.98 }}>

          <span className="flex items-center gap-3">
            <span className="text-slate-400 dark:text-slate-500 text-sm font-normal">Year:</span>
            <span>{selectedYear || "Current"}</span>
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}>

            <ChevronDown className="w-5 h-5 text-slate-400" />
          </motion.div>
        </motion.button>

        <AnimatePresence>
          {isOpen &&
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden">

              <div className="mt-2 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden">
                <div className="py-2 max-h-48 overflow-y-auto">
                  {years.map((year, index) =>
                    <motion.div
                      key={year}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => handleSelect(year)}
                      className={`
                        cursor-pointer px-4 py-3 text-base transition-all flex items-center justify-between
                        ${selectedYear === year ?
                          'bg-[#4285F4]/10 text-[#4285F4] font-medium' :
                          'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50'}
                      `}>

                      {year}
                      {selectedYear === year &&
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500 }}>

                          <Check className="w-4 h-4" />
                        </motion.div>
                      }
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          }
        </AnimatePresence>
      </div>);

  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Magnetic intensity={0.15}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          className={`
            inline-flex items-center justify-between w-36 px-4 py-2.5
            text-sm font-heading font-medium 
            text-slate-700 dark:text-slate-200 
            bg-white dark:bg-slate-800 
            border-2 rounded-xl shadow-sm 
            transition-all duration-200 
            hover:border-[#4285F4] dark:hover:border-[#4285F4]
            ${isOpen ?
              'border-[#4285F4] ring-2 ring-[#4285F4]/20' :
              'border-slate-200 dark:border-slate-700'}
          `}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}>

          <span>{selectedYear || "Current"}</span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}>

            <ChevronDown className="w-4 h-4 text-slate-400" />
          </motion.div>
        </motion.button>
      </Magnetic>

      <AnimatePresence>
        {isOpen &&
          <div
            ref={contentRef}
            className="absolute right-0 z-[200] w-40 mt-2 origin-top-right bg-white dark:bg-slate-800 
                       rounded-xl shadow-xl border-2 border-slate-200 dark:border-slate-700 overflow-hidden">


            <div className="py-2 max-h-48 overflow-y-auto">
              {years.map((year, index) =>
                <motion.div
                  key={year}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.03 }}
                  onClick={() => handleSelect(year)}
                  className={`
                    cursor-pointer px-4 py-2.5 text-sm transition-all flex items-center justify-between group
                    ${selectedYear === year ?
                      'bg-[#4285F4]/10 text-[#4285F4] font-medium' :
                      'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50 hover:text-[#4285F4]'}
                  `}>

                  <span>{year}</span>
                  {selectedYear === year ?
                    <Check className="w-4 h-4" /> :

                    <motion.div
                      className="w-1.5 h-1.5 rounded-full bg-[#4285F4] opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.2 }} />

                  }
                </motion.div>
              )}
            </div>
          </div>
        }
      </AnimatePresence>
    </div>);

};


// MOBILE SLIDE MENU

const MobileMenu = ({
  isOpen,
  onClose,
  navLinks,
  years,
  selectedYear,
  onSelectYear,
  loading








}) => {
  const { isDarkMode, toggleTheme } = useTheme();
  const menuRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // GSAP stagger animation for menu items
      if (menuRef.current) {
        gsap.fromTo(
          menuRef.current.querySelectorAll('.menu-item'),
          { opacity: 0, x: 50 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.out",
            delay: 0.2
          }
        );
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen &&
        <>
          {/* Backdrop with blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 dark:bg-black/80 backdrop-blur-md z-[150]"
            onClick={onClose} />


          {/* Slide Menu */}
          <motion.div
            ref={menuRef}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-[85%] max-w-sm 
                       bg-white dark:bg-[#09090b] 
                       shadow-2xl z-[200] flex flex-col 
                       border-l-2 border-slate-200 dark:border-slate-800">




            {/* Menu Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b-2 border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <img src="/logo.svg" alt="GDG Logo" className="w-8 h-8 object-contain" />
                <span className="font-heading font-extrabold text-lg text-slate-900 dark:text-white">
                  GDG<span className="text-transparent bg-clip-text bg-gradient-to-r from-[#4285F4] via-[#EA4335] to-[#FBBC04] mx-0.5">-</span>WCE
                </span>
              </div>
              <motion.button
                onClick={onClose}
                className="p-2.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 
                           border-2 border-slate-200 dark:border-slate-700 transition-colors"

                whileHover={{ scale: 1.05, rotate: 90 }}
                whileTap={{ scale: 0.95 }}>

                <X className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              </motion.button>
            </div>

            {/* Menu Content */}
            <div className="flex-1 overflow-y-auto py-6 px-4">
              {/* Navigation Links */}
              <div className="space-y-1 mb-8">
                <p className="menu-item px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Navigation
                </p>
                {navLinks.map((link) =>
                  <div key={link.name} className="menu-item">
                    <NavLink
                      href={link.href}
                      isMobile
                      onClick={link.onClick || onClose}
                      color={link.color}>

                      {link.name}
                    </NavLink>
                  </div>
                )}
              </div>

              {/* Divider */}
              <div className="menu-item border-t-2 border-slate-100 dark:border-slate-800 my-4" />

              {/* Year Selector */}
              <div className="menu-item mb-8">
                <p className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Select Tenure
                </p>
                <YearDropdown
                  years={years}
                  selectedYear={selectedYear}
                  onSelect={onSelectYear}
                  isMobile
                  loading={loading} />

              </div>

              {/* Divider */}
              <div className="menu-item border-t-2 border-slate-100 dark:border-slate-800 my-4" />

              {/* Theme Toggle */}
              <div className="menu-item">
                <p className="px-4 py-2 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  Appearance
                </p>
                <motion.button
                  onClick={toggleTheme}
                  className="w-full flex items-center justify-between px-4 py-4 
                             text-lg font-heading font-semibold text-slate-700 dark:text-slate-200 
                             hover:bg-slate-50 dark:hover:bg-slate-800 
                             rounded-xl transition-all border-2 border-slate-200 dark:border-slate-700"



                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}>

                  <span className="flex items-center gap-3">
                    {isDarkMode ?
                      <Moon className="w-5 h-5 text-[#4285F4]" /> :

                      <Sun className="w-5 h-5 text-[#FBBC04]" />
                    }
                    {isDarkMode ? 'Dark Mode' : 'Light Mode'}
                  </span>
                  <div className={`w-14 h-8 rounded-full p-1 transition-colors border-2
                                   ${isDarkMode ?
                      'bg-[#4285F4] border-[#4285F4]' :
                      'bg-slate-200 border-slate-300'}`}>
                    <motion.div
                      className="w-6 h-6 bg-white rounded-full shadow-lg flex items-center justify-center"
                      animate={{ x: isDarkMode ? 22 : 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}>

                      {isDarkMode ?
                        <Moon size={12} className="text-[#4285F4]" /> :

                        <Sun size={12} className="text-[#FBBC04]" />
                      }
                    </motion.div>
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Menu Footer with GDG colors */}
            <div className="px-5 py-4 border-t-2 border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
              <div className="flex gap-1 mb-3">
                <div className="h-1 flex-1 rounded-full bg-[#4285F4]" />
                <div className="h-1 flex-1 rounded-full bg-[#EA4335]" />
                <div className="h-1 flex-1 rounded-full bg-[#FBBC04]" />
                <div className="h-1 flex-1 rounded-full bg-[#34A853]" />
              </div>
              <p className="text-xs text-slate-400 dark:text-slate-500 text-center font-mono">
                © 2025 GDG WCE. Build Together.
              </p>
            </div>
          </motion.div>
        </>
      }
    </AnimatePresence>);

};


// ANIMATED CONNECTION DOTS

const ConnectionDots = () => {
  return (
    <div className="hidden lg:flex items-center gap-1 mx-4">
      {[GDG_COLORS.blue, GDG_COLORS.red, GDG_COLORS.yellow, GDG_COLORS.green].map((color, i) =>
        <motion.div
          key={i}
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: color }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            delay: i * 0.2,
            repeat: Infinity
          }} />

      )}
    </div>);

};


// MAIN HEADER COMPONENT

const Header = ({ visible = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const headerRef = useRef(null);

  const { years, selectedYear, setSelectedYear, loading } = useYear();

  // Scroll effect
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setIsMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // GSAP header entrance
  useEffect(() => {
    if (headerRef.current) {
      gsap.fromTo(headerRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out", delay: 0.2 }
      );
    }
  }, []);

  // Navigation handler
  const handleNavClick = useCallback((e, section) => {
    e.preventDefault();
    const scrollToSection = () => {
      const element = document.getElementById(section);
      if (element) {
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 80;
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20;
        window.scrollTo({ top: Math.max(0, offsetPosition), behavior: 'smooth' });
      }
    };

    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(scrollToSection, 150);
    } else {
      setTimeout(scrollToSection, 50);
    }
    setIsMobileMenuOpen(false);
  }, [location.pathname, navigate]);

  // Navigation links with GDG colors
  const navLinks = useMemo(() => [
    { name: "Home", href: "/", onClick: (e) => { e.preventDefault(); navigate('/'); setIsMobileMenuOpen(false); }, color: GDG_COLORS.blue },
    { name: "Domains", href: "/#explore", onClick: (e) => handleNavClick(e, 'explore'), color: GDG_COLORS.red },
    { name: "Events", href: "/#events", onClick: (e) => handleNavClick(e, 'events'), color: GDG_COLORS.yellow },
    {
      name: "Team", href: "/#team", onClick: (e) => {
        e.preventDefault();
        if (location.pathname === '/') {
          handleNavClick(e, 'team');
        } else {
          navigate('/members');
          setIsMobileMenuOpen(false);
        }
      }, color: GDG_COLORS.green
    }],
    [handleNavClick, location.pathname, navigate]);

  // Unique years
  const uniqueYears = useMemo(() => {
    if (!years || !Array.isArray(years)) return [];
    return years.
      map((item) => item.year).
      filter(Boolean).
      sort((a, b) => parseInt(b) - parseInt(a));
  }, [years]);

  const handleYearSelect = useCallback((yearString) => {
    const yearObj = years.find((y) => y.year === yearString);
    if (yearObj) setSelectedYear(yearObj);
  }, [years, setSelectedYear]);

  if (!visible) return null;

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-3 sm:py-4
          ${isScrolled ?
            "bg-white/90 dark:bg-[#09090b]/90 backdrop-blur-xl shadow-lg shadow-black/5 dark:shadow-black/20 border-b-2 border-slate-100 dark:border-slate-800" :
            "bg-transparent"}`
        }>

        {/* Gradient accent line at top when scrolled */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#4285F4] via-[#EA4335] via-[#FBBC04] to-[#34A853]"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isScrolled ? 1 : 0 }}
          transition={{ duration: 0.5 }} />


        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          {/* Logo */}
          <AnimatedLogo onClick={() => navigate('/')} />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8" role="navigation">
            {navLinks.map((link) =>
              <NavLink
                key={link.name}
                href={link.href}
                onClick={link.onClick}
                color={link.color}>

                {link.name}
              </NavLink>
            )}

            <ConnectionDots />

            <YearDropdown
              years={uniqueYears}
              selectedYear={selectedYear?.year}
              onSelect={handleYearSelect}
              loading={loading} />


            <ThemeToggle />
          </nav>

          {/* Mobile Controls */}
          <div className="flex items-center gap-3 md:hidden">
            <ThemeToggle />

            <Magnetic intensity={0.3}>
              <motion.button
                onClick={() => setIsMobileMenuOpen(true)}
                className={`p-2.5 rounded-xl transition-all border-2
                  ${isScrolled ?
                    'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700' :
                    'bg-white/50 dark:bg-slate-800/50 border-slate-200/50 dark:border-slate-700/50 backdrop-blur-sm'}
                  hover:border-[#4285F4] dark:hover:border-[#4285F4]
                `}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Open menu">

                <Menu className="w-5 h-5 text-slate-700 dark:text-slate-200" />
              </motion.button>
            </Magnetic>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        years={uniqueYears}
        selectedYear={selectedYear?.year}
        onSelectYear={handleYearSelect}
        loading={loading} />


      {/* Spacer */}
      <div className="h-16 sm:h-20" />
    </>);

};

export default Header;