import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, Code2, Users, Lightbulb, Megaphone, Rocket,
  Sparkles, ArrowRight, ChevronRight
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

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

// ============ CONSTANTS ============
const GDG_COLORS = {
  blue: { main: '#4285F4', light: '#E8F0FE', dark: '#1a365d', border: '#D2E3FC', darkBorder: '#2563eb' },
  red: { main: '#EA4335', light: '#FCE8E6', dark: '#7f1d1d', border: '#FAD2CF', darkBorder: '#dc2626' },
  yellow: { main: '#FBBC05', light: '#FEF7E0', dark: '#713f12', border: '#FEEFC3', darkBorder: '#ca8a04' },
  green: { main: '#34A853', light: '#E6F4EA', dark: '#14532d', border: '#CEEAD6', darkBorder: '#16a34a' },
};

const FEATURES = [
  { 
    id: 1, 
    title: "Grow", 
    label: "Career Development", 
    description: "Transform your theoretical knowledge into practical expertise. Apply learnings to build real-world solutions that make a difference in people's lives and accelerate your professional journey.",
    highlight: "Build portfolio-worthy projects",
    stats: "200+ careers launched",
    icon: Trophy, 
    theme: GDG_COLORS.yellow 
  },
  { 
    id: 2, 
    title: "Learn", 
    label: "Technical Skills", 
    description: "Master cutting-edge technologies through immersive hands-on workshops led by industry experts. From AI/ML to cloud computing, we cover the skills that matter most in today's tech landscape.",
    highlight: "Expert-led sessions",
    stats: "50+ workshops yearly",
    icon: Code2, 
    theme: GDG_COLORS.blue 
  },
  { 
    id: 3, 
    title: "Connect", 
    label: "Community Network", 
    description: "Join a thriving ecosystem of passionate developers, innovative designers, and experienced mentors. Build meaningful relationships that extend beyond college and into your professional career.",
    highlight: "Lifetime connections",
    stats: "500+ active members",
    icon: Users, 
    theme: GDG_COLORS.green 
  },
  { 
    id: 4, 
    title: "Innovate", 
    label: "Creative Solutions", 
    description: "Push the boundaries of what's possible by building novel solutions for real-world challenges. Participate in hackathons, ideathons, and innovation challenges that spark creativity and drive impact.",
    highlight: "Turn ideas into reality",
    stats: "30+ projects shipped",
    icon: Lightbulb, 
    theme: GDG_COLORS.red 
  },
  { 
    id: 5, 
    title: "Promote", 
    label: "Knowledge Sharing", 
    description: "Become a catalyst for change by sharing your expertise with others. Lead workshops, write technical blogs, and mentor junior developers. Help the community grow while solidifying your own understanding.",
    highlight: "Teach & inspire others",
    stats: "100+ peer sessions",
    icon: Megaphone, 
    theme: GDG_COLORS.blue 
  },
  { 
    id: 6, 
    title: "Launch", 
    label: "Startup Ecosystem", 
    description: "Transform your side projects into market-ready products with guidance from successful founders. Access resources, mentorship, and a supportive community to help you navigate the entrepreneurial journey.",
    highlight: "From idea to startup",
    stats: "10+ startups founded",
    icon: Rocket, 
    theme: GDG_COLORS.green 
  }
];

const CAROUSEL_INTERVAL = 5000;
const ORBIT_RADIUS = 250;
const ORBIT_DURATION = 80;

// Smooth spring configuration
const smoothSpring = {
  type: "spring",
  stiffness: 100,
  damping: 20,
  mass: 1
};

const smoothTransition = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1]
};

// ============ FLOATING SHAPES ============
const FloatingShapes = ({ isMobile, isDarkMode }) => {
  const shapes = useMemo(() => [
    { type: 'circle', size: 60, x: '10%', y: '20%', color: GDG_COLORS.blue.main, delay: 0 },
    { type: 'circle', size: 40, x: '85%', y: '15%', color: GDG_COLORS.red.main, delay: 1 },
    { type: 'square', size: 50, x: '75%', y: '70%', color: GDG_COLORS.yellow.main, delay: 2 },
    { type: 'circle', size: 30, x: '20%', y: '80%', color: GDG_COLORS.green.main, delay: 0.5 },
    { type: 'triangle', size: 45, x: '90%', y: '45%', color: GDG_COLORS.blue.main, delay: 1.5 },
    { type: 'square', size: 35, x: '5%', y: '50%', color: GDG_COLORS.red.main, delay: 2.5 },
    { type: 'circle', size: 25, x: '50%', y: '10%', color: GDG_COLORS.green.main, delay: 3 },
    { type: 'triangle', size: 40, x: '30%', y: '90%', color: GDG_COLORS.yellow.main, delay: 1.8 },
  ], []);

  const shapeOpacity = isDarkMode ? 0.15 : 0.15;
  const animatedOpacity = isDarkMode ? [0.1, 0.25, 0.1] : [0.08, 0.2, 0.08];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape, index) => (
        <motion.div
          key={index}
          className="absolute"
          style={{
            left: shape.x,
            top: shape.y,
            width: shape.size,
            height: shape.size,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={isMobile ? { opacity: isDarkMode ? 0.12 : 0.08, scale: 1 } : {
            opacity: animatedOpacity,
            scale: [1, 1.2, 1],
            rotate: shape.type === 'square' ? [0, 90, 180] : [0, 360],
            y: [0, -30, 0],
          }}
          transition={isMobile ? {} : {
            duration: 12 + index * 2,
            repeat: Infinity,
            delay: shape.delay,
            ease: "easeInOut",
          }}
        >
          {shape.type === 'circle' && (
            <div
              className="w-full h-full rounded-full"
              style={{ backgroundColor: shape.color, opacity: shapeOpacity }}
            />
          )}
          {shape.type === 'square' && (
            <div
              className="w-full h-full rounded-lg"
              style={{ backgroundColor: shape.color, opacity: shapeOpacity }}
            />
          )}
          {shape.type === 'triangle' && (
            <div
              className="w-0 h-0"
              style={{
                borderLeft: `${shape.size / 2}px solid transparent`,
                borderRight: `${shape.size / 2}px solid transparent`,
                borderBottom: `${shape.size}px solid ${shape.color}`,
                opacity: shapeOpacity,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

// ============ GRID PATTERN ============
const GridPattern = ({ isMobile, isDarkMode }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    <motion.div
      className="absolute inset-0"
      style={{
        backgroundImage: isDarkMode 
          ? `linear-gradient(rgba(71, 85, 105, 0.15) 1px, transparent 1px),
             linear-gradient(90deg, rgba(71, 85, 105, 0.15) 1px, transparent 1px)`
          : `linear-gradient(rgba(66, 133, 244, 0.03) 1px, transparent 1px),
             linear-gradient(90deg, rgba(66, 133, 244, 0.03) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
      }}
      animate={isMobile ? {} : {
        backgroundPosition: ['0px 0px', '50px 50px'],
      }}
      transition={isMobile ? {} : {
        duration: 30,
        repeat: Infinity,
        ease: "linear",
      }}
    />
  </div>
);

// ============ ANIMATED BACKGROUND ============
const AnimatedBackground = ({ isMobile, isDarkMode }) => (
  <div className="absolute inset-0 pointer-events-none overflow-hidden">
    {/* Base Gradient */}
    <div className={`absolute inset-0 transition-colors duration-500 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950'
        : 'bg-gradient-to-br from-slate-50 via-white to-blue-50/50'
    }`} />

    {/* Grid Pattern */}
    <GridPattern isMobile={isMobile} isDarkMode={isDarkMode} />

    {/* Large Animated Gradient Orbs - Hidden on mobile */}
    {!isMobile && (
      <>
        <motion.div
          className="absolute -top-[300px] -left-[300px] w-[800px] h-[800px] rounded-full"
          style={{
            background: isDarkMode 
              ? `radial-gradient(circle, ${GDG_COLORS.blue.main}15 0%, transparent 70%)`
              : `radial-gradient(circle, ${GDG_COLORS.blue.light} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 100, 50, 0],
            y: [0, 50, -30, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full"
          style={{
            background: isDarkMode 
              ? `radial-gradient(circle, ${GDG_COLORS.red.main}15 0%, transparent 70%)`
              : `radial-gradient(circle, ${GDG_COLORS.red.light} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, -80, 40, 0],
            y: [0, 60, -40, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-[40%] -left-[150px] w-[500px] h-[500px] rounded-full"
          style={{
            background: isDarkMode 
              ? `radial-gradient(circle, ${GDG_COLORS.green.main}15 0%, transparent 70%)`
              : `radial-gradient(circle, ${GDG_COLORS.green.light} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.15, 0.9, 1],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute -bottom-[250px] right-[10%] w-[700px] h-[700px] rounded-full"
          style={{
            background: isDarkMode 
              ? `radial-gradient(circle, ${GDG_COLORS.yellow.main}15 0%, transparent 70%)`
              : `radial-gradient(circle, ${GDG_COLORS.yellow.light} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, -40, 60, 0],
            y: [0, -60, 30, 0],
            scale: [1, 1.05, 0.95, 1],
          }}
          transition={{
            duration: 32,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-[20%] left-[30%] w-[400px] h-[400px] rounded-full"
          style={{
            background: isDarkMode 
              ? `radial-gradient(circle, ${GDG_COLORS.blue.main}12 0%, transparent 70%)`
              : `radial-gradient(circle, ${GDG_COLORS.blue.light} 0%, transparent 70%)`,
          }}
          animate={{
            x: [0, 80, -60, 0],
            y: [0, -40, 80, 0],
            scale: [0.9, 1.1, 1, 0.9],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </>
    )}

    {/* Floating Shapes */}
    <FloatingShapes isMobile={isMobile} isDarkMode={isDarkMode} />

    {/* Animated Lines - Hidden on mobile */}
    {!isMobile && (
      <svg className={`absolute inset-0 w-full h-full ${isDarkMode ? 'opacity-[0.04]' : 'opacity-[0.02]'}`}>
        <motion.line
          x1="0%"
          y1="30%"
          x2="100%"
          y2="70%"
          stroke={GDG_COLORS.blue.main}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.line
          x1="100%"
          y1="20%"
          x2="0%"
          y2="80%"
          stroke={GDG_COLORS.red.main}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />
        <motion.line
          x1="20%"
          y1="0%"
          x2="80%"
          y2="100%"
          stroke={GDG_COLORS.green.main}
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: [0, 1, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        />
      </svg>
    )}

    {/* Noise Texture Overlay */}
    <div
      className={`absolute inset-0 ${isDarkMode ? 'opacity-[0.03]' : 'opacity-[0.012]'}`}
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }}
    />
  </div>
);

// ============ FEATURE CARD ============
const FeatureCard = ({ feature, isDarkMode }) => (
  <div className="relative z-20 w-full h-full">
    <AnimatePresence mode="wait">
      <motion.div
        key={feature.id}
        initial={{ opacity: 0, scale: 0.92, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, scale: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, scale: 1.02, y: -10, filter: "blur(5px)" }}
        transition={smoothSpring}
        className={`absolute inset-0 backdrop-blur-md rounded-2xl flex flex-col p-6 overflow-hidden transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/90 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] border border-slate-700/80'
            : 'bg-white/95 shadow-[0_20px_50px_-15px_rgba(0,0,0,0.12)] border border-slate-100/80'
        }`}
      >
        {/* Top Color Bar */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-1.5 rounded-t-2xl"
          style={{ backgroundColor: feature.theme.main }}
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
          aria-hidden="true"
        />

        {/* Background Pattern */}
        <motion.div
          className="absolute -right-12 -top-12 w-40 h-40 rounded-full"
          style={{ backgroundColor: feature.theme.main }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isDarkMode ? 0.15 : 0.08, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          aria-hidden="true"
        />

        {/* Secondary Background Circle */}
        <motion.div
          className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full"
          style={{ backgroundColor: feature.theme.main }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: isDarkMode ? 0.1 : 0.05, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          aria-hidden="true"
        />

        <div className="relative z-10 flex flex-col h-full items-start text-left">
          {/* Icon and Label Row */}
          <div className="flex items-center gap-3 mb-4">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center"
              style={{ 
                backgroundColor: isDarkMode ? `${feature.theme.main}25` : feature.theme.light 
              }}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ ...smoothSpring, delay: 0.15 }}
            >
              <feature.icon size={22} color={feature.theme.main} strokeWidth={2.5} />
            </motion.div>
            
            <motion.span
              className="text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded-full"
              style={{ 
                backgroundColor: isDarkMode ? `${feature.theme.main}20` : feature.theme.light,
                color: feature.theme.main 
              }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ ...smoothTransition, delay: 0.2 }}
            >
              {feature.label}
            </motion.span>
          </div>

          {/* Title */}
          <motion.h3
            className={`text-2xl sm:text-3xl font-black mb-3 leading-tight transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.25 }}
          >
            {feature.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            className={`text-sm leading-relaxed mb-4 font-medium flex-grow transition-colors duration-300 ${
              isDarkMode ? 'text-slate-300' : 'text-slate-600'
            }`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...smoothTransition, delay: 0.3 }}
          >
            {feature.description}
          </motion.p>

          {/* Stats and Progress */}
          <motion.div
            className={`w-full pt-3 border-t transition-colors duration-300 ${
              isDarkMode ? 'border-slate-700' : 'border-slate-100'
            }`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ ...smoothTransition, delay: 0.4 }}
          >
            <div className="flex items-center justify-between mb-2">
              <span className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                Impact
              </span>
            </div>
            <div className={`h-1.5 w-full rounded-full overflow-hidden transition-colors duration-300 ${
              isDarkMode ? 'bg-slate-700' : 'bg-slate-100'
            }`}>
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: feature.theme.main }}
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>

    {/* Shadow Cards */}
    <motion.div
      className={`absolute top-3 left-3 right-[-0.75rem] bottom-[-0.75rem] rounded-2xl shadow-md -z-10 hidden sm:block transition-colors duration-300 ${
        isDarkMode 
          ? 'bg-slate-700/50 border border-slate-600/50'
          : 'bg-white/50 border border-slate-100/50'
      }`}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 0.6, scale: 0.97 }}
      transition={{ ...smoothTransition, delay: 0.1 }}
      aria-hidden="true"
    />
  </div>
);

// ============ ORBIT BUTTON ============
const OrbitButton = ({
  feature,
  isActive,
  onClick,
  onMouseEnter,
  style,
  isMobile = false,
  isDarkMode = false
}) => {
  const IconComponent = feature.icon;

  return (
    <motion.button
      className={`relative z-30 focus:outline-none group ${isMobile ? 'p-0.5' : 'p-1'}`}
      style={style}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      whileHover={{ scale: 1.12 }}
      whileTap={{ scale: 0.95 }}
      transition={smoothSpring}
      aria-label={`Select ${feature.title}`}
      aria-pressed={isActive}
    >
      <motion.div
        className={`
          relative rounded-full flex items-center justify-center border shadow-sm transition-colors duration-300
          ${isMobile ? 'w-10 h-10' : 'w-12 h-12 md:w-14 md:h-14'}
          ${isActive 
            ? 'shadow-lg border-transparent' 
            : isDarkMode 
              ? 'bg-slate-800 border-slate-600 text-slate-400'
              : 'bg-white border-slate-200 text-slate-400'
          }
        `}
        animate={{
          backgroundColor: isActive ? feature.theme.main : isDarkMode ? '#1e293b' : '#FFFFFF',
        }}
        transition={smoothSpring}
      >
        <IconComponent
          size={isMobile ? 18 : 20}
          className={`transition-colors duration-500 ${
            isActive 
              ? 'text-white' 
              : isDarkMode 
                ? 'text-slate-400 group-hover:text-slate-200'
                : 'text-slate-400 group-hover:text-slate-600'
          }`}
        />
      </motion.div>
    </motion.button>
  );
};

// ============ DESKTOP ORBIT VIEW ============
const DesktopOrbitView = ({
  activeFeature,
  onFeatureSelect,
  isHovering,
  onHoverChange,
  isMobile,
  isDarkMode
}) => {
  const orbitPositions = useMemo(() => {
    return FEATURES.map((feature, index) => {
      const angle = (index * (360 / FEATURES.length)) - 90;
      const radian = (angle * Math.PI) / 180;
      const x = ORBIT_RADIUS * Math.cos(radian);
      const y = ORBIT_RADIUS * Math.sin(radian);
      return { feature, x, y };
    });
  }, []);

  return (
    <div
      className="hidden lg:flex relative h-[600px] xl:h-[700px] w-full items-center justify-center xl:justify-end perspective-1000"
      onMouseEnter={() => onHoverChange(true)}
      onMouseLeave={() => onHoverChange(false)}
    >
      <div className="relative w-[500px] h-[500px] xl:w-[580px] xl:h-[580px] flex items-center justify-center">

        {/* Outer Orbit Ring - Disabled on mobile */}
        {!isMobile && (
          <>
            <motion.div
              className={`absolute inset-0 border rounded-full transition-colors duration-300 ${
                isDarkMode ? 'border-slate-700/50' : 'border-slate-200/50'
              }`}
              animate={{ rotate: 360 }}
              transition={{ duration: ORBIT_DURATION * 2, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />

            {/* Middle Orbit Ring */}
            <motion.div
              className={`absolute inset-[40px] border rounded-full transition-colors duration-300 ${
                isDarkMode ? 'border-slate-700/80' : 'border-slate-100/80'
              }`}
              animate={{ rotate: -360 }}
              transition={{ duration: ORBIT_DURATION * 1.5, repeat: Infinity, ease: "linear" }}
              aria-hidden="true"
            />

            {/* Inner Dashed Ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: ORBIT_DURATION, repeat: Infinity, ease: "linear" }}
              className={`absolute inset-[20px] rounded-full border border-dashed transition-colors duration-300 ${
                isDarkMode ? 'border-slate-600/40' : 'border-slate-200/40'
              }`}
              aria-hidden="true"
            />

            {/* Center Glow */}
            <motion.div
              className="absolute w-72 h-72 rounded-full blur-3xl"
              style={{ backgroundColor: activeFeature.theme.main }}
              animate={{
                opacity: isDarkMode ? [0.15, 0.25, 0.15] : [0.08, 0.15, 0.08],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              aria-hidden="true"
            />
          </>
        )}

        {/* Center Card */}
        <div className="relative z-20 w-80 h-80 xl:w-[340px] xl:h-[340px]">
          <FeatureCard feature={activeFeature} isDarkMode={isDarkMode} />
        </div>

        {/* Orbiting Buttons */}
        {orbitPositions.map(({ feature, x, y }) => (
          <OrbitButton
            key={feature.id}
            feature={feature}
            isActive={activeFeature.id === feature.id}
            onClick={() => onFeatureSelect(feature)}
            onMouseEnter={() => onFeatureSelect(feature)}
            style={{ position: 'absolute', x, y }}
            isDarkMode={isDarkMode}
          />
        ))}

        {/* Connecting Lines to Active */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          {orbitPositions.map(({ feature, x, y }) => (
            <motion.line
              key={feature.id}
              x1="50%"
              y1="50%"
              x2={`calc(50% + ${x}px)`}
              y2={`calc(50% + ${y}px)`}
              stroke={feature.theme.main}
              strokeWidth="1.5"
              strokeDasharray="6 6"
              initial={{ opacity: 0 }}
              animate={{
                opacity: activeFeature.id === feature.id ? (isDarkMode ? 0.4 : 0.25) : 0,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

// ============ MOBILE/TABLET VIEW ============
const MobileCarouselView = ({
  activeFeature,
  onFeatureSelect,
  visibleFeatures,
  isDarkMode
}) => (
  <div className="block lg:hidden w-full max-w-md mt-6 sm:mt-10">
    {/* Card */}
    <div className="relative w-full aspect-[3/4] sm:aspect-[4/3] max-h-[380px] mx-auto mb-6">
      <FeatureCard feature={activeFeature} isDarkMode={isDarkMode} />
    </div>

    {/* Navigation Buttons */}
    <div className="flex justify-center w-full">
      <motion.div
        className={`inline-flex gap-2 p-2.5 backdrop-blur-sm rounded-full shadow-lg overflow-x-auto no-scrollbar transition-colors duration-300 ${
          isDarkMode 
            ? 'bg-slate-800/80 border border-slate-700/50'
            : 'bg-white/80 border border-slate-100/50'
        }`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...smoothTransition, delay: 0.3 }}
      >
        {visibleFeatures.map((feature) => (
          <OrbitButton
            key={feature.id}
            feature={feature}
            isActive={activeFeature.id === feature.id}
            onClick={() => onFeatureSelect(feature)}
            isMobile={true}
            isDarkMode={isDarkMode}
          />
        ))}
      </motion.div>
    </div>

    {/* Progress Indicator */}
    <div className="flex justify-center gap-1.5 mt-5">
      {FEATURES.map((feature) => (
        <motion.div
          key={feature.id}
          className="h-1.5 rounded-full cursor-pointer"
          style={{
            backgroundColor: activeFeature.id === feature.id
              ? feature.theme.main
              : isDarkMode ? '#475569' : '#E2E8F0',
          }}
          animate={{
            width: activeFeature.id === feature.id ? 28 : 8,
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => onFeatureSelect(feature)}
        />
      ))}
    </div>
  </div>
);

// ============ MAIN COMPONENT ============
const About = () => {
  const [activeFeature, setActiveFeature] = useState(FEATURES[1]);
  const [isHovering, setIsHovering] = useState(false);
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  const borderColor = isDarkMode ? 'border-slate-600' : 'border-black';

  // Auto-rotate carousel
  useEffect(() => {
    if (isHovering) return;

    const interval = setInterval(() => {
      setActiveFeature((prev) => {
        const currentIndex = FEATURES.findIndex(f => f.id === prev.id);
        const nextIndex = (currentIndex + 1) % FEATURES.length;
        return FEATURES[nextIndex];
      });
    }, CAROUSEL_INTERVAL);

    return () => clearInterval(interval);
  }, [isHovering]);

  const handleFeatureSelect = useCallback((feature) => {
    setActiveFeature(feature);
  }, []);

  const visibleFeatures = useMemo(() => FEATURES.slice(0, 6), []);

  return (
    <section
      id="about"
      className={`relative w-full min-h-screen flex items-center justify-center overflow-hidden py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-500 ${
        isDarkMode ? 'bg-slate-950' : 'bg-slate-50'
      }`}
      aria-label="About GDG Chapter"
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <AnimatedBackground isMobile={isMobile} isDarkMode={isDarkMode} />

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">

        {/* LEFT COLUMN */}
        <motion.div
          className="lg:col-span-5 flex flex-col gap-6 text-center lg:text-left items-center lg:items-start"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="space-y-5">

            {/* Main Heading */}
            <motion.h2
              className={`text-4xl sm:text-5xl lg:text-6xl font-black leading-[0.95] tracking-tight transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-900'
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, ...smoothTransition }}
            >
              Where{' '}
              <span className="relative inline-block">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600">
                  Ideas
                </span>
                <motion.svg
                  className="absolute -bottom-1 left-0 w-full"
                  viewBox="0 0 100 8"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                >
                  <motion.path
                    d="M0 6 Q25 0 50 6 Q75 12 100 6"
                    stroke="url(#underline-gradient)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ delay: 1, duration: 0.8, ease: "easeOut" }}
                  />
                  <defs>
                    <linearGradient id="underline-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#4285F4" />
                      <stop offset="50%" stopColor="#6366F1" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </span>
              <br />
              Become{' '}
              <motion.span
                className={`italic font-serif font-light transition-colors duration-300 ${
                  isDarkMode ? 'text-slate-500' : 'text-slate-400'
                }`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, ...smoothTransition }}
              >
                Reality.
              </motion.span>
            </motion.h2>

            {/* Description Paragraph 1 */}
            <motion.p
              className={`text-lg leading-relaxed max-w-lg mx-auto lg:mx-0 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, ...smoothTransition }}
            >
              We are a vibrant collective of{' '}
              <span className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}>developers</span>, 
              <span className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}> designers</span>, and 
              <span className={`font-semibold transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-slate-800'
              }`}> dreamers</span> united by our passion for technology 
              and innovation at Walchand College of Engineering, Sangli.
            </motion.p>

            {/* Description Paragraph 2 */}
            <motion.p
              className={`text-base leading-relaxed max-w-lg mx-auto lg:mx-0 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, ...smoothTransition }}
            >
              Backed by Google Developers, our community provides a platform to learn cutting-edge 
              technologies, collaborate on impactful projects, and connect with like-minded individuals 
              who are shaping the future of tech.
            </motion.p>

            {/* Quote */}
            <motion.div
              className={`mt-6 p-4 backdrop-blur-sm rounded-xl max-w-md mx-auto lg:mx-0 transition-colors duration-300 ${
                isDarkMode 
                  ? 'bg-slate-800/60 border border-slate-700/50'
                  : 'bg-white/60 border border-slate-100/50'
              }`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, ...smoothTransition }}
            >
              <p className={`text-sm italic leading-relaxed transition-colors duration-300 ${
                isDarkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                "padhai krlo"
              </p>
              <p className={`text-xs font-semibold mt-2 transition-colors duration-300 ${
                isDarkMode ? 'text-slate-500' : 'text-slate-400'
              }`}>
                — GDG WCE
              </p>
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN */}
        <div className="lg:col-span-7 w-full flex flex-col items-center lg:block">

          {/* Mobile View */}
          <MobileCarouselView
            activeFeature={activeFeature}
            onFeatureSelect={handleFeatureSelect}
            visibleFeatures={visibleFeatures}
            isDarkMode={isDarkMode}
          />

          {/* Desktop View */}
          <DesktopOrbitView
            activeFeature={activeFeature}
            onFeatureSelect={handleFeatureSelect}
            isHovering={isHovering}
            onHoverChange={setIsHovering}
            isMobile={isMobile}
            isDarkMode={isDarkMode}
          />
        </div>
      </div>
      {/* Decorative Bottom Bar with Animation */}
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
    </section>
  );
};

export default About;