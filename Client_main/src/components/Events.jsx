import React, { useRef, useMemo, useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Calendar, ChevronRight, Sparkles, Star, Zap, MousePointer2 } from 'lucide-react';
import { useYear } from '../contexts/YearContext';
import { useTheme } from '../contexts/ThemeContext';
import { publicApi } from '../api/publicApi';
import TimelineSection from './TimelineSection';

// Helper to get image URL - uses the API helper
const getImageUrl = (imageKey) => {
  return publicApi.getImageUrl(imageKey);
};

// Hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return isMobile;
};

// --- THEME CONFIGURATION (Light & Dark Mode) ---
const THEME = {
  blue: {
    gradient: "from-blue-600 to-cyan-500",
    gradientHover: "from-blue-500 to-cyan-400",
    text_accent: "text-blue-600 dark:text-blue-400",
    bg_subtle: "bg-blue-50 dark:bg-blue-900/30",
    border: "group-hover:border-blue-400 dark:group-hover:border-blue-500",
    shadow: "group-hover:shadow-blue-500/25",
    icon_bg: "bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/50 dark:to-cyan-900/50",
    icon_text: "text-blue-700 dark:text-blue-300",
    ring: "ring-blue-500/20 dark:ring-blue-400/30"
  },
  red: {
    gradient: "from-rose-600 to-orange-500",
    gradientHover: "from-rose-500 to-orange-400",
    text_accent: "text-rose-600 dark:text-rose-400",
    bg_subtle: "bg-rose-50 dark:bg-rose-900/30",
    border: "group-hover:border-rose-400 dark:group-hover:border-rose-500",
    shadow: "group-hover:shadow-rose-500/25",
    icon_bg: "bg-gradient-to-br from-rose-100 to-orange-100 dark:from-rose-900/50 dark:to-orange-900/50",
    icon_text: "text-rose-700 dark:text-rose-300",
    ring: "ring-rose-500/20 dark:ring-rose-400/30"
  },
  yellow: {
    gradient: "from-amber-500 to-yellow-400",
    gradientHover: "from-amber-400 to-yellow-300",
    text_accent: "text-amber-600 dark:text-amber-400",
    bg_subtle: "bg-amber-50 dark:bg-amber-900/30",
    border: "group-hover:border-amber-400 dark:group-hover:border-amber-500",
    shadow: "group-hover:shadow-amber-500/25",
    icon_bg: "bg-gradient-to-br from-amber-100 to-yellow-100 dark:from-amber-900/50 dark:to-yellow-900/50",
    icon_text: "text-amber-700 dark:text-amber-300",
    ring: "ring-amber-500/20 dark:ring-amber-400/30"
  },
  green: {
    gradient: "from-emerald-600 to-teal-500",
    gradientHover: "from-emerald-500 to-teal-400",
    text_accent: "text-emerald-600 dark:text-emerald-400",
    bg_subtle: "bg-emerald-50 dark:bg-emerald-900/30",
    border: "group-hover:border-emerald-400 dark:group-hover:border-emerald-500",
    shadow: "group-hover:shadow-emerald-500/25",
    icon_bg: "bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/50 dark:to-teal-900/50",
    icon_text: "text-emerald-700 dark:text-emerald-300",
    ring: "ring-emerald-500/20 dark:ring-emerald-400/30"
  },
  violet: {
    gradient: "from-violet-600 to-purple-500",
    gradientHover: "from-violet-500 to-purple-400",
    text_accent: "text-violet-600 dark:text-violet-400",
    bg_subtle: "bg-violet-50 dark:bg-violet-900/30",
    border: "group-hover:border-violet-400 dark:group-hover:border-violet-500",
    shadow: "group-hover:shadow-violet-500/25",
    icon_bg: "bg-gradient-to-br from-violet-100 to-purple-100 dark:from-violet-900/50 dark:to-purple-900/50",
    icon_text: "text-violet-700 dark:text-violet-300",
    ring: "ring-violet-500/20 dark:ring-violet-400/30"
  }
};

// --- FLOATING PARTICLES COMPONENT ---
const FloatingParticles = ({ isMobile, isDarkMode }) => {
  if (isMobile) return null;
  
  const particles = useMemo(() => 
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${
            isDarkMode 
              ? 'bg-gradient-to-r from-blue-400/30 to-purple-400/30' 
              : 'bg-gradient-to-r from-blue-400/20 to-purple-400/20'
          }`}
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, isDarkMode ? 0.8 : 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// --- ANIMATED GRID BACKGROUND ---
const AnimatedGrid = ({ isMobile, isDarkMode }) => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]`}
        style={{
          backgroundImage: isDarkMode 
            ? 'linear-gradient(to right, rgba(71, 85, 105, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(71, 85, 105, 0.3) 1px, transparent 1px)'
            : 'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)'
        }}
      />
      
      {!isMobile && (
        <motion.div 
          className="absolute inset-0 bg-[size:4rem_4rem] opacity-0"
          style={{
            backgroundImage: isDarkMode 
              ? 'linear-gradient(to right, rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.5) 1px, transparent 1px)'
              : 'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
            maskImage: 'radial-gradient(ellipse_60%_40%_at_50%_0%,#000_70%,transparent_100%)'
          }}
          animate={{ opacity: [0.1, 0, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}
    </div>
  );
};

// --- MORPHING BLOB COMPONENT ---
const MorphingBlob = ({ className, color, darkColor, delay = 0, isMobile, isDarkMode }) => {
  if (isMobile) return null;
  
  return (
    <motion.div
      className={`absolute rounded-full blur-3xl ${className}`}
      style={{ background: isDarkMode ? darkColor : color }}
      animate={{
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        scale: [1, 1.1, 0.9, 1],
        x: [0, 30, -20, 0],
        y: [0, -20, 30, 0],
      }}
      transition={{
        duration: 15,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// --- MOUSE FOLLOWER ---
const MouseFollower = ({ isMobile, isDarkMode }) => {
  if (isMobile) return null;
  
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <motion.div
      className="fixed w-64 h-64 pointer-events-none z-0 hidden lg:block"
      animate={{
        x: mousePos.x - 128,
        y: mousePos.y - 128,
        opacity: isVisible ? (isDarkMode ? 0.2 : 0.15) : 0,
      }}
      transition={{ type: "spring", stiffness: 150, damping: 15 }}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 blur-3xl" />
    </motion.div>
  );
};

// --- ANIMATED TEXT REVEAL ---
const AnimatedText = ({ children, className, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- SCROLL PROGRESS INDICATOR ---
const ScrollProgress = ({ progress }) => {
  const scaleX = useSpring(progress, { stiffness: 100, damping: 30 });
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 origin-left z-50"
      style={{ scaleX }}
    />
  );
};

// --- LOADING SKELETON ---
const EventSkeleton = ({ isDarkMode }) => {
  return (
    <div className="relative flex flex-col md:flex-row items-center gap-8 sm:gap-12 md:gap-20 lg:gap-28">
      {/* Image Skeleton */}
      <div className="w-full md:w-1/2 pl-10 sm:pl-14 md:pl-0">
        <div className={`h-[280px] sm:h-[340px] md:h-[420px] lg:h-[480px] w-full rounded-2xl sm:rounded-3xl animate-pulse ${
          isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
        }`} />
      </div>
      
      {/* Center Node Skeleton */}
      <div className="absolute left-4 sm:left-6 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20">
        <div className={`w-4 h-4 sm:w-5 sm:h-5 rounded-full animate-pulse ${
          isDarkMode ? 'bg-slate-700' : 'bg-slate-300'
        }`} />
      </div>
      
      {/* Text Skeleton */}
      <div className="w-full md:w-1/2 pl-10 sm:pl-14 md:pl-0">
        <div className="max-w-lg space-y-4">
          <div className={`h-6 w-24 rounded animate-pulse ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <div className={`h-10 w-3/4 rounded animate-pulse ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <div className={`h-20 w-full rounded animate-pulse ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          <div className={`h-10 w-32 rounded-full animate-pulse ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
        </div>
      </div>
    </div>
  );
};

// --- MAIN COMPONENT ---
const ParallaxTimeline = () => {
  const { selectedYear, selectedYearId, loading: yearLoading } = useYear();
  const { isDarkMode } = useTheme();
  const borderColor = isDarkMode ? 'border-slate-600' : 'border-black';
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  
  // State for API data
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch events when selected year changes
  useEffect(() => {
    const fetchEvents = async () => {
      if (!selectedYearId || !selectedYear) {
        console.log('No selectedYearId or selectedYear, skipping events fetch');
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        if (selectedYear.events && Array.isArray(selectedYear.events) && selectedYear.events.length > 0) {
          console.log('Using events from year object:', selectedYear.events);
          setEvents(selectedYear.events);
          setLoading(false);
          return;
        }

        console.log('Fetching events for yearId:', selectedYearId);
        const data = await publicApi.getEventsByYear(selectedYearId);
        console.log('Events data received from API:', data);
        setEvents(data || []);
      } catch (err) {
        console.error('Failed to fetch events:', err);
        setError('Failed to load events. Check console for details.');
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [selectedYearId, selectedYear]);

  // Transform API events to component format with themes
  const formattedEvents = useMemo(() => {
    console.log('Events.jsx: Transforming', events.length, 'events');
    const themeKeys = Object.keys(THEME);
    
    const formatted = events.map((event, index) => {
      const eventTheme = THEME[themeKeys[index % themeKeys.length]];
      
      const defaultEvent = {
        id: `event-${index}`,
        year: selectedYear?.year || '',
        tag: "EVENT",
        title: 'Untitled Event',
        description: 'Join us for an exciting event!',
        img: '',
        stats: {
          label: "Event Date",
          value: 'TBA'
        },
        theme: eventTheme,
        icon: <Calendar size={20} />
      };
      
      return {
        ...defaultEvent,
        id: event._id || event.id || defaultEvent.id,
        title: event.eventName || event.title || event.name || defaultEvent.title,
        description: event.eventInfo || event.description || event.info || defaultEvent.description,
        img: getImageUrl(event.eventThumbnailKey || event.thumbnail || event.image || '') || defaultEvent.img,
        stats: {
          label: "Event Date",
          value: event.eventDate || event.date 
            ? new Date(event.eventDate || event.date).toDateString()
            : defaultEvent.stats.value
        },
      };
    });
    
    console.log('Events.jsx: Formatted', formatted.length, 'events for display');
    return formatted;
  }, [events, selectedYear]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const lineHeight = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  
  // Background parallax - disabled on mobile
  const bgY = useTransform(scrollYProgress, [0, 1], isMobile ? [0, 0] : [0, -200]);

  const isLoading = yearLoading || loading;

  return (
    <>
      <ScrollProgress progress={scrollYProgress} />
      <MouseFollower isMobile={isMobile} isDarkMode={isDarkMode} />
      
      <div 
        id="events"
        ref={containerRef} 
        className={`relative w-full min-h-screen py-16 sm:py-24 md:py-32 overflow-hidden transition-colors duration-500 ${
          isDarkMode 
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white'
            : 'bg-gradient-to-b from-slate-50 via-white to-slate-50 text-slate-900'
        }`}
        style={{ fontFamily: "'Space Grotesk', -apple-system, sans-serif" }}
      >
        
        {/* --- BACKGROUND ANIMATIONS --- */}
        <motion.div className="absolute inset-0 pointer-events-none" style={{ y: bgY }}>
          <AnimatedGrid isMobile={isMobile} isDarkMode={isDarkMode} />
          <FloatingParticles isMobile={isMobile} isDarkMode={isDarkMode} />
          
          {/* Morphing Blobs - Disabled on mobile */}
          {!isMobile && (
            <>
              <MorphingBlob 
                className={`w-[600px] h-[600px] -top-32 -right-32 ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}
                color="linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)"
                darkColor="linear-gradient(135deg, rgba(96, 165, 250, 0.4) 0%, rgba(167, 139, 250, 0.4) 100%)"
                delay={0}
                isMobile={isMobile}
                isDarkMode={isDarkMode}
              />
              <MorphingBlob 
                className={`w-[500px] h-[500px] top-1/3 -left-48 ${isDarkMode ? 'opacity-15' : 'opacity-25'}`}
                color="linear-gradient(135deg, #34d399 0%, #60a5fa 100%)"
                darkColor="linear-gradient(135deg, rgba(52, 211, 153, 0.4) 0%, rgba(96, 165, 250, 0.4) 100%)"
                delay={2}
                isMobile={isMobile}
                isDarkMode={isDarkMode}
              />
              <MorphingBlob 
                className={`w-[700px] h-[700px] -bottom-32 right-1/4 ${isDarkMode ? 'opacity-15' : 'opacity-20'}`}
                color="linear-gradient(135deg, #f472b6 0%, #fb923c 100%)"
                darkColor="linear-gradient(135deg, rgba(244, 114, 182, 0.4) 0%, rgba(251, 146, 60, 0.4) 100%)"
                delay={4}
                isMobile={isMobile}
                isDarkMode={isDarkMode}
              />
            </>
          )}
          
          {/* Noise Texture Overlay */}
          <div 
            className={`absolute inset-0 ${isDarkMode ? 'opacity-[0.03]' : 'opacity-[0.015]'}`}
            style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noise"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch"/%3E%3C/filter%3E%3Crect width="100%" height="100%" filter="url(%23noise)"%3E%3C/rect%3E%3C/svg%3E")' }}
          />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* --- HEADER SECTION --- */}
          <div className="text-center mb-24 sm:mb-32 md:mb-40 lg:mb-48 relative">
            
            {/* Decorative Elements */}
            <motion.div 
              className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 sm:w-48 sm:h-48"
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            >
              <div className={`w-full h-full rounded-full border border-dashed transition-colors duration-300 ${
                isDarkMode ? 'border-slate-700' : 'border-slate-200'
              }`} />
            </motion.div>
            
            {/* Main Title */}
            <div className="mb-6 sm:mb-8">
              <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black tracking-tight leading-none">
                <AnimatedText delay={0.1}>
                  <span className={`transition-colors duration-300 ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    Our{' '}
                  </span>
                </AnimatedText>
                <motion.span 
                  className="relative inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                >
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-violet-600 to-emerald-500 animate-gradient-x bg-[length:200%_auto]">
                    Events
                  </span>
                  {/* Underline decoration */}
                  <motion.svg
                    className="absolute -bottom-2 sm:-bottom-4 left-0 w-full"
                    viewBox="0 0 300 12"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.6 }}
                  >
                    <motion.path
                      d="M2 8 Q75 2 150 8 T298 8"
                      fill="none"
                      stroke="url(#gradient)"
                      strokeWidth="3"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.8 }}
                    />
                    <defs>
                      <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#2563eb" />
                        <stop offset="50%" stopColor="#7c3aed" />
                        <stop offset="100%" stopColor="#10b981" />
                      </linearGradient>
                    </defs>
                  </motion.svg>
                </motion.span>
              </h2>
            </div>
            
            {/* Subtitle */}
            <AnimatedText delay={0.5}>
              <p className={`text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto leading-relaxed px-4 font-light transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                From a small library discussion room to the region's{' '}
                <span className={`font-medium transition-colors duration-300 ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  leading developer community
                </span>.
              </p>
            </AnimatedText>

            {/* Selected Year Indicator */}
            {selectedYear && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6"
              >
                <span className={`inline-flex items-center gap-2 px-4 py-2 backdrop-blur-sm border rounded-full text-sm transition-colors duration-300 ${
                  isDarkMode 
                    ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                    : 'bg-white/80 border-slate-200 text-slate-600'
                }`}>
                  <Calendar size={14} />
                  Showing events for{' '}
                  <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                    {selectedYear.year}
                  </span>
                </span>
              </motion.div>
            )}
            
            {/* Scroll Indicator */}
            <motion.div 
              className="mt-12 sm:mt-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              <motion.div 
                className={`flex flex-col items-center gap-2 transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-400'
                }`}
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <MousePointer2 size={20} />
                <span className="text-xs font-medium tracking-wider uppercase">Scroll to explore</span>
              </motion.div>
            </motion.div>
          </div>

          {/* --- TIMELINE STRUCTURE --- */}
          <div className="relative">
            
            {/* Timeline Track */}
            <div className="absolute left-4 sm:left-6 md:left-1/2 top-0 bottom-0 transform md:-translate-x-1/2">
              {/* Background Track */}
              <div className={`absolute inset-0 w-[3px] rounded-full transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-gradient-to-b from-slate-700 via-slate-700/50 to-slate-700'
                  : 'bg-gradient-to-b from-slate-200 via-slate-200/50 to-slate-200'
              }`} />
              
              {/* Animated Progress Line */}
              <motion.div 
                className="absolute inset-0 w-[3px] rounded-full overflow-hidden"
                style={{ 
                  scaleY: lineHeight,
                  transformOrigin: 'top',
                }}
              >
                <div className="w-full h-full bg-gradient-to-b from-blue-600 via-violet-600 to-emerald-500" />
                
                {/* Shimmer Effect */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-b from-transparent via-white/50 to-transparent"
                  animate={{ y: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                />
              </motion.div>
            </div>

            {/* Events List */}
            <div className="flex flex-col gap-20 sm:gap-28 md:gap-36 lg:gap-48">
              <AnimatePresence mode="wait">
                {/* Loading State */}
                {isLoading ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-20 sm:space-y-28 md:space-y-36"
                  >
                    {[1, 2, 3].map((i) => (
                      <EventSkeleton key={i} isDarkMode={isDarkMode} />
                    ))}
                  </motion.div>
                ) : error ? (
                  /* Error State */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-24"
                  >
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                      isDarkMode ? 'bg-red-900/30' : 'bg-red-50'
                    }`}>
                      <Zap className={isDarkMode ? 'text-red-400' : 'text-red-400'} size={32} />
                    </div>
                    <p className="text-red-500 text-lg font-medium">{error}</p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Please try again later
                    </p>
                  </motion.div>
                ) : formattedEvents.length > 0 ? (
                  /* Events */
                  formattedEvents.map((event, index) => (
                    <TimelineSection 
                      key={event.id} 
                      data={event} 
                      index={index} 
                      totalEvents={formattedEvents.length}
                      onInView={() => setActiveIndex(index)}
                      isDarkMode={isDarkMode}
                      isMobile={isMobile}
                    />
                  ))
                ) : (
                  /* Empty State */
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-center py-24"
                  >
                    <motion.div
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 ${
                        isDarkMode 
                          ? 'bg-gradient-to-br from-slate-800 to-slate-700'
                          : 'bg-gradient-to-br from-slate-100 to-slate-200'
                      }`}
                    >
                      <Zap className={isDarkMode ? 'text-slate-500' : 'text-slate-400'} size={32} />
                    </motion.div>
                    <p className={`text-lg font-medium ${isDarkMode ? 'text-slate-300' : 'text-slate-500'}`}>
                      Coming Soon!
                    </p>
                    <p className={`text-sm mt-2 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
                      Exciting events are on the way
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
          
          
          {/* --- FOOTER CTA --- */}
          <motion.div 
            className="text-center mt-24 sm:mt-32 md:mt-40"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex flex-col items-center gap-6">
              <p className={`text-sm sm:text-base transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                Stay Tuned For More Events!
              </p>
            </div>
          </motion.div>

        </div>
        <motion.div 
              className={`absolute bottom-0 w-full h-3 flex border-t-2 ${borderColor} overflow-hidden`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 1.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div 
                className="flex-1 bg-blue-500 pulse-bar"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0 }}
              />
              <motion.div 
                className="flex-1 bg-red-500 pulse-bar"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div 
                className="flex-1 bg-yellow-400 pulse-bar"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              />
              <motion.div 
                className="flex-1 bg-green-500 pulse-bar"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              />
            </motion.div>
      </div>
      
      {/* CSS for gradient animation */}
      <style>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x {
          animation: gradient-x 3s ease infinite;
        }
      `}</style>
    </>
  );
};
export default ParallaxTimeline;
