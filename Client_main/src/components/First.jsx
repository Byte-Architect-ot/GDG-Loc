import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import {
  ArrowRight,
  Terminal,
  Smartphone,
  Globe,
  Cloud,
  Code2,
  Calendar,
  Sparkles,
  Sun,
  Moon,
  Users,
  Zap,
  BookOpen,
  Cpu,
  GitBranch,
  Database,
  Layers,
  Wifi,
  Shield,
  Rocket,
  Star,
  ChevronRight,
  Braces,
  Monitor,
  Bot } from
'lucide-react';
import gsap from 'gsap';
import { useTheme } from '../contexts/ThemeContext';

const EASE_SMOOTH = [0.22, 1, 0.36, 1];
const FONT_HEADING = "'Syne', 'Space Grotesk', sans-serif";
const FONT_MONO = "'JetBrains Mono', monospace";

// ─── Hook: detect mobile ───
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// ─── 3D Tilt Card (Individual hover) ───






const TiltCard = ({ children, className = '', intensity = 8 }) => {
  const ref = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    rotateX.set((y - rect.height / 2) / intensity * -1);
    rotateY.set((x - rect.width / 2) / intensity);
  };

  const handleLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={`perspective-1000 ${className}`}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: 'preserve-3d'
      }}>
      
      {children}
    </motion.div>);

};

// ─── Magnetic Hover Effect (for individual elements) ───






const Magnetic = ({ children, className = '', strength = 0.3 }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20 });
  const springY = useSpring(y, { stiffness: 200, damping: 20 });

  const handleMouse = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((e.clientX - centerX) * strength);
    y.set((e.clientY - centerY) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      onMouseMove={handleMouse}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}>
      
      {children}
    </motion.div>);

};

// ─── Animated Grid Background (Lining style) ───
const AnimatedGrid = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_50%,#000_70%,transparent_110%)]`}
        style={{
          backgroundImage: isDarkMode ?
          'linear-gradient(to right, rgba(71, 85, 105, 0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(71, 85, 105, 0.3) 1px, transparent 1px)' :
          'linear-gradient(to right, #e5e7eb 1px, transparent 1px), linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)'
        }} />

      <motion.div 
        className="absolute inset-0 bg-[size:4rem_4rem] opacity-0 pointer-events-none hidden md:block"
        style={{
          backgroundImage: isDarkMode ?
          'linear-gradient(to right, rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(59, 130, 246, 0.5) 1px, transparent 1px)' :
          'linear-gradient(to right, #3b82f6 1px, transparent 1px), linear-gradient(to bottom, #3b82f6 1px, transparent 1px)',
          maskImage: 'radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)'
        }}
        animate={{ opacity: [0.1, 0, 0.2] }}
        transition={{ duration: 4, repeat: Infinity }} />

      <div
        className="absolute inset-0 transition-all duration-700 pointer-events-none"
        style={{
          background: isDarkMode ?
          'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #09090b 100%)' :
          'radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, #f8f9fa 100%)'
        }} />
      
    </div>);

};

// ─── Interactive Grid (cells light up on hover) ───
const InteractiveGrid = () => {
  const { isDarkMode } = useTheme();
  const [hoveredCell, setHoveredCell] = useState(null);
  const gridSize = 8;
  const colors = ['#4285F4', '#EA4335', '#FBBC04', '#34A853'];

  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto hidden xl:block z-5"
    style={{ marginRight: '-20px' }}>
      
      <div className="grid gap-[3px]" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}>
        {Array.from({ length: gridSize * gridSize }).map((_, i) => {
          const isHovered = hoveredCell === i;
          const isNeighbor = hoveredCell !== null &&
          Math.abs(hoveredCell % gridSize - i % gridSize) <= 1 &&
          Math.abs(Math.floor(hoveredCell / gridSize) - Math.floor(i / gridSize)) <= 1;

          return (
            <motion.div
              key={i}
              className="cursor-pointer"
              style={{
                width: 8,
                height: 8,
                borderRadius: 2,
                background: isHovered ?
                colors[i % 4] :
                isNeighbor ?
                isDarkMode ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.12)' :
                isDarkMode ? 'rgba(255,255,255,0.04)' : 'rgba(0,0,0,0.06)'
              }}
              onMouseEnter={() => setHoveredCell(i)}
              onMouseLeave={() => setHoveredCell(null)}
              animate={{
                scale: isHovered ? 2.2 : isNeighbor ? 1.4 : 1
              }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }} />);


        })}
      </div>
    </div>);

};

// ─── Floating Google-colored Orbs ───
const FloatingOrbs = () => {
  const { isDarkMode } = useTheme();
  const orbs = [
  { color: '#4285F4', x: '12%', y: '18%', size: 200, delay: 0 },
  { color: '#EA4335', x: '82%', y: '22%', size: 160, delay: 1.5 },
  { color: '#FBBC04', x: '75%', y: '72%', size: 180, delay: 3 },
  { color: '#34A853', x: '15%', y: '75%', size: 140, delay: 2 }];


  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, i) =>
      <motion.div
        key={i}
        className="absolute rounded-full"
        style={{
          width: orb.size,
          height: orb.size,
          left: orb.x,
          top: orb.y,
          background: orb.color,
          opacity: isDarkMode ? 0.05 : 0.07,
          filter: 'blur(70px)'
        }}
        animate={{
          y: [0, -30, 0],
          x: [0, 20, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10 + i * 2,
          delay: orb.delay,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />

      )}
    </div>);

};

// ─── 3D Rotating Cube ───
const RotatingCube = () => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const cubeRef = useRef(null);

  useEffect(() => {
    if (!cubeRef.current) return;
    const anim = gsap.to(cubeRef.current, {
      rotateX: 360,
      rotateY: 360,
      duration: 12,
      repeat: -1,
      ease: 'none'
    });
    return () => {anim.kill();};
  }, []);

  useEffect(() => {
    if (!cubeRef.current) return;
    if (isHovered) {
      gsap.to(cubeRef.current, { scale: 1.3, duration: 0.4, ease: 'back.out(1.7)' });
    } else {
      gsap.to(cubeRef.current, { scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, [isHovered]);

  const size = 40;
  const half = size / 2;

  return (
    <div
      className="perspective-1500 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      
      <div
        ref={cubeRef}
        className="preserve-3d relative"
        style={{ width: size, height: size }}>
        
        {/* Front */}
        <div className="cube-face" style={{ transform: `translateZ(${half}px)`, background: '#4285F4' }}>
          <Code2 size={14} className="text-white" />
        </div>
        {/* Back */}
        <div className="cube-face" style={{ transform: `rotateY(180deg) translateZ(${half}px)`, background: '#EA4335' }}>
          <Zap size={14} className="text-white" />
        </div>
        {/* Right */}
        <div className="cube-face" style={{ transform: `rotateY(90deg) translateZ(${half}px)`, background: '#FBBC04' }}>
          <Star size={14} className={isDarkMode ? 'text-zinc-900' : 'text-zinc-900'} />
        </div>
        {/* Left */}
        <div className="cube-face" style={{ transform: `rotateY(-90deg) translateZ(${half}px)`, background: '#34A853' }}>
          <Rocket size={14} className="text-white" />
        </div>
        {/* Top */}
        <div className="cube-face" style={{ transform: `rotateX(90deg) translateZ(${half}px)`, background: isDarkMode ? '#27272a' : '#e0e0e0' }}>
          <Globe size={14} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
        </div>
        {/* Bottom */}
        <div className="cube-face" style={{ transform: `rotateX(-90deg) translateZ(${half}px)`, background: isDarkMode ? '#27272a' : '#e0e0e0' }}>
          <Cloud size={14} className={isDarkMode ? 'text-zinc-400' : 'text-zinc-600'} />
        </div>
      </div>
    </div>);

};

// ─── Orbiting Icons ───
const OrbitingIcons = () => {
  const { isDarkMode } = useTheme();
  const icons = [
  { Icon: Database, color: '#4285F4', delay: 0, radius: 55, duration: 8 },
  { Icon: Shield, color: '#EA4335', delay: 2, radius: 55, duration: 8 },
  { Icon: Wifi, color: '#34A853', delay: 4, radius: 55, duration: 8 },
  { Icon: Layers, color: '#FBBC04', delay: 6, radius: 55, duration: 8 }];


  return (
    <div className="relative w-32 h-32">
      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-zinc-300'}`} />

      {/* Orbit ring */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          width: 110,
          height: 110,
          border: `1px ${isDarkMode ? 'rgba(255,255,255,0.06)' : 'rgba(0,0,0,0.06)'} solid`
        }} />
      

      {icons.map(({ Icon, color, delay, radius, duration }, i) =>
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2 cursor-pointer"
        style={{ marginLeft: -10, marginTop: -10 }}
        animate={{
          rotate: 360
        }}
        transition={{
          duration,
          delay,
          repeat: Infinity,
          ease: 'linear'
        }}>
        
          <motion.div
          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
          isDarkMode ? 'bg-[#151518] border border-[#27272a]' : 'bg-white border border-[#e0e0e0]'}`
          }
          style={{ transform: `translateX(${radius}px)` }}
          whileHover={{ scale: 1.8, zIndex: 10 }}>
          
            <Icon size={10} style={{ color }} />
          </motion.div>
        </motion.div>
      )}
    </div>);

};

// ─── Morphing Blob ───
const MorphingBlob = () => {
  const { isDarkMode } = useTheme();
  const blobRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!blobRef.current) return;
    gsap.to(blobRef.current, {
      borderRadius: '70% 30% 46% 54% / 30% 58% 42% 70%',
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, []);

  return (
    <motion.div
      ref={blobRef}
      className="cursor-pointer"
      style={{
        width: 70,
        height: 70,
        borderRadius: '42% 58% 70% 30% / 45% 45% 55% 55%',
        background: `linear-gradient(135deg, ${isDarkMode ? '#4285F420' : '#4285F430'}, ${isDarkMode ? '#34A85320' : '#34A85330'})`,
        border: `1px solid ${isDarkMode ? '#27272a' : '#e0e0e0'}`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        scale: isHovered ? 1.2 : 1,
        rotate: isHovered ? 45 : 0
      }}
      transition={{ type: 'spring', stiffness: 200, damping: 15 }}>
      
      <Bot size={20} className={`transition-colors duration-300 ${isHovered ? 'text-[#4285F4]' : isDarkMode ? 'text-zinc-600' : 'text-zinc-400'}`} />
    </motion.div>);

};

// ─── Stacking Fan Cards ───
const FanCards = () => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const colors = ['#FBBC04', '#EA4335', '#34A853', '#4285F4'];
  const icons = [Star, Zap, Rocket, Code2];

  return (
    <div
      className="relative w-16 h-20 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      
      {colors.map((color, i) => {
        const Icon = icons[i];
        const isTop = i === colors.length - 1;
        return (
          <motion.div
            key={i}
            className="absolute inset-0 rounded-xl flex items-center justify-center"
            style={{
              background: color,
              border: `1.5px solid ${isDarkMode ? '#27272a' : 'rgba(0,0,0,0.1)'}`,
              zIndex: i,
              transformOrigin: 'bottom center'
            }}
            animate={{
              rotate: isHovered ? (i - 1.5) * 12 : (i - 1.5) * 2,
              y: isHovered ? -i * 4 : 0,
              scale: isHovered && isTop ? 1.05 : 1
            }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: i * 0.03 }}>
            
            {isTop && <Icon size={16} className={color === '#FBBC04' ? 'text-zinc-900' : 'text-white'} />}
          </motion.div>);

      })}
    </div>);

};

// ─── Tech Stack Floating Badges ───
const FloatingBadge = ({
  label,
  color,
  x,
  y,
  delay






}) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="absolute cursor-pointer z-10"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay + 1, duration: 0.5, type: 'spring' }}>
      
      <motion.div
        className={`px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide border transition-all duration-300 select-none ${
        isDarkMode ? 'bg-[#151518] border-[#27272a]' : 'bg-white border-[#e0e0e0]'}`
        }
        style={{
          fontFamily: FONT_MONO,
          color: isHovered ? color : isDarkMode ? '#71717a' : '#a1a1aa',
          borderColor: isHovered ? color : undefined,
          boxShadow: isHovered ?
          `0 4px 20px ${color}20` :
          'none'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        animate={{
          y: [0, -6, 0],
          scale: isHovered ? 1.15 : 1
        }}
        transition={{
          y: { duration: 4 + delay, repeat: Infinity, ease: 'easeInOut' },
          scale: { type: 'spring', stiffness: 300 }
        }}>
        
        {label}
      </motion.div>
    </motion.div>);

};

// ─── Interactive Terminal (user can type commands) ───
const InteractiveTerminal = () => {
  const { isDarkMode } = useTheme();
  const [history, setHistory] = useState([
    { text: 'Welcome to GDG-WCE Terminal ✨', type: 'success' },
    { text: 'Type "help" to see commands.', type: 'dim' },
  ]);
  const [input, setInput] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const inputRef = useRef(null);
  const scrollRef = useRef(null);

  const commands = {
    help: [
      { text: '┌─ Available Commands ─────────┐', type: 'info' },
      { text: '│  about    → About section    │', type: 'info' },
      { text: '│  events   → Events section   │', type: 'info' },
      { text: '│  team     → Team section     │', type: 'info' },
      { text: '│  explore  → Explore section  │', type: 'info' },
      { text: '│  clear    → Clear terminal   │', type: 'info' },
      { text: '└──────────────────────────────┘', type: 'info' },
    ],
    about: [
      { text: '🚀 Navigating to About...', type: 'success' },
    ],
    events: [
      { text: '📅 Navigating to Events...', type: 'success' },
    ],
    team: [
      { text: '👥 Navigating to Team...', type: 'success' },
    ],
    explore: [
      { text: '🔍 Navigating to Explore...', type: 'success' },
    ],
  };

  const navigateTo = (sectionId) => {
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 400);
  };

  useEffect(() => {
    const blink = setInterval(() => setCursorVisible(v => !v), 530);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const cmd = input.trim().toLowerCase();
    if (!cmd) return;

    const newHistory = [...history, { text: `$ ${input}`, type: 'input' }];

    if (cmd === 'clear') {
      setHistory([{ text: 'Terminal cleared.', type: 'dim' }]);
    } else if (commands[cmd]) {
      setHistory([...newHistory, ...commands[cmd]]);
      // Navigate to section if it's a navigable command
      if (['about', 'events', 'team', 'explore'].includes(cmd)) {
        navigateTo(cmd);
      }
    } else {
      setHistory([...newHistory, { text: `Command not found: "${cmd}"`, type: 'error' }, { text: 'Type "help" for commands.', type: 'dim' }]);
    }
    setInput('');
  };

  const getColor = (type) => {
    switch (type) {
      case 'success': return '#34A853';
      case 'error': return '#EA4335';
      case 'info': return '#4285F4';
      case 'output': return isDarkMode ? '#d4d4d8' : '#e0e0e0';
      case 'link': return '#FBBC04';
      case 'input': return isDarkMode ? '#a1a1aa' : '#d4d4d8';
      case 'dim': return isDarkMode ? '#52525b' : '#71717a';
      default: return isDarkMode ? '#a1a1aa' : '#d4d4d8';
    }
  };

  return (
    <TiltCard intensity={12}>
      <motion.div
        className={`rounded-xl border overflow-hidden transition-all duration-500 ${
          isDarkMode
            ? 'bg-[#0c0c0e] border-[#27272a]'
            : 'bg-[#1a1a2e] border-[#e0e0e0]'
        }`}
        style={{
          width: 260,
          boxShadow: isFocused
            ? `0 0 20px ${isDarkMode ? 'rgba(66,133,244,0.15)' : 'rgba(66,133,244,0.2)'}, 0 8px 40px rgba(0,0,0,0.3)`
            : isDarkMode ? '0 8px 40px rgba(0,0,0,0.4)' : '0 8px 40px rgba(0,0,0,0.12)',
          borderColor: isFocused ? '#4285F4' : undefined,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.7 }}
        onClick={() => inputRef.current?.focus()}
      >
        {/* Title bar */}
        <div className={`h-8 flex items-center px-3 gap-1.5 border-b ${
          isDarkMode ? 'border-[#1c1c1f] bg-[#09090b]' : 'border-[#2a2a40] bg-[#12121f]'
        }`}>
          <motion.div className="w-2.5 h-2.5 rounded-full bg-[#EA4335] cursor-pointer" whileHover={{ scale: 1.4 }} />
          <motion.div className="w-2.5 h-2.5 rounded-full bg-[#FBBC04] cursor-pointer" whileHover={{ scale: 1.4 }} />
          <motion.div className="w-2.5 h-2.5 rounded-full bg-[#34A853] cursor-pointer" whileHover={{ scale: 1.4 }} />
          <span className="ml-2 text-[10px] text-zinc-600 flex items-center gap-1" style={{ fontFamily: FONT_MONO }}>
            <Terminal size={9} /> interactive
          </span>
          {isFocused && (
            <motion.div
              className="ml-auto w-1.5 h-1.5 rounded-full bg-[#34A853]"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          )}
        </div>

        {/* Terminal body */}
        <div
          ref={scrollRef}
          className="p-3 min-h-[130px] max-h-[150px] overflow-y-auto overflow-x-hidden"
          style={{ fontFamily: FONT_MONO, scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <style>{`
            .overflow-y-auto::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          {history.map((line, i) => (
            <motion.div
              key={`${i}-${line.text}`}
              className="text-[10px] leading-relaxed whitespace-pre"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.15, delay: i * 0.02 }}
              style={{ color: getColor(line.type) }}
            >
              {line.text}
            </motion.div>
          ))}

          {/* Input line */}
          <form onSubmit={handleSubmit} className="flex items-center text-[10px] leading-relaxed mt-0.5">
            <span className="text-[#34A853]">$ </span>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="bg-transparent border-none outline-none text-[10px] flex-1 caret-transparent"
              style={{ color: isDarkMode ? '#d4d4d8' : '#d4d4d8', fontFamily: FONT_MONO }}
              spellCheck={false}
              autoComplete="off"
            />
            <span
              className={`${cursorVisible && isFocused ? 'opacity-100' : 'opacity-0'} text-[#4285F4] transition-opacity`}
            >
              ▋
            </span>
          </form>
        </div>

        {/* Scanline effect */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.02]"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.1) 2px, rgba(255,255,255,0.1) 4px)',
          }}
        />
      </motion.div>
    </TiltCard>
  );
};

// ─── Pulsing Connection Lines ───
const ConnectionDots = () => {
  const dotCount = 5;

  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: dotCount }).map((_, i) =>
      <motion.div
        key={i}
        className="rounded-full"
        style={{
          width: 4,
          height: 4,
          background: ['#4285F4', '#EA4335', '#FBBC04', '#34A853', '#4285F4'][i]
        }}
        animate={{
          scale: [1, 1.8, 1],
          opacity: [0.4, 1, 0.4]
        }}
        transition={{
          duration: 1.5,
          delay: i * 0.2,
          repeat: Infinity,
          ease: 'easeInOut'
        }} />

      )}
    </div>);

};

// ─── Theme Toggle Button ───
const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Magnetic strength={0.2}>
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full border transition-all duration-500 ${
        isDarkMode ?
        'bg-[#151518]/80 border-[#27272a] text-zinc-300 hover:border-zinc-500' :
        'bg-white/80 border-[#e0e0e0] text-zinc-700 hover:border-zinc-400 shadow-sm'}`
        }
        style={{ backdropFilter: 'blur(12px)' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}>
        
        <AnimatePresence mode="wait">
          {isDarkMode ?
          <motion.div
            key="sun"
            initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}>
            
              <Sun size={16} />
            </motion.div> :

          <motion.div
            key="moon"
            initial={{ rotate: 90, opacity: 0, scale: 0.5 }}
            animate={{ rotate: 0, opacity: 1, scale: 1 }}
            exit={{ rotate: -90, opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}>
            
              <Moon size={16} />
            </motion.div>
          }
        </AnimatePresence>
        <span className="text-xs font-medium tracking-wide" style={{ fontFamily: FONT_HEADING }}>
          {isDarkMode ? 'Light' : 'Dark'}
        </span>
      </motion.button>
    </Magnetic>);

};

// ─── Event Card with 3D Tilt & Multi-layer Hover ───








const EventCard = ({ icon, title, description, accent, delay }) => {
  const { isDarkMode } = useTheme();
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);

  // GSAP hover animation
  useEffect(() => {
    if (!cardRef.current) return;
    const inner = cardRef.current.querySelector('.card-inner');
    const iconEl = cardRef.current.querySelector('.card-icon');
    const shine = cardRef.current.querySelector('.card-shine');

    if (isHovered) {
      gsap.to(inner, { y: -6, duration: 0.4, ease: 'back.out(1.4)' });
      gsap.to(iconEl, { scale: 1.2, rotate: 8, duration: 0.4, ease: 'back.out(2)' });
      gsap.to(shine, { opacity: 1, x: '100%', duration: 0.6, ease: 'power2.out' });
    } else {
      gsap.to(inner, { y: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(iconEl, { scale: 1, rotate: 0, duration: 0.4, ease: 'power2.out' });
      gsap.to(shine, { opacity: 0, x: '-100%', duration: 0.4, ease: 'power2.in' });
    }
  }, [isHovered]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: EASE_SMOOTH }}>
      
      <TiltCard intensity={10}>
        <div
          ref={cardRef}
          className="cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}>
          
          <div
            className={`card-inner relative p-6 rounded-2xl border overflow-hidden transition-colors duration-500 ${
            isDarkMode ?
            'bg-[#151518] border-[#27272a]' :
            'bg-white border-[#e0e0e0]'}`
            }
            style={{
              boxShadow: isHovered ?
              isDarkMode ?
              `0 20px 50px rgba(0,0,0,0.5), 0 0 0 1px ${accent}30` :
              `0 20px 50px rgba(0,0,0,0.1), 0 0 0 1px ${accent}40` :
              isDarkMode ?
              'none' :
              '0 1px 3px rgba(0,0,0,0.04)'
            }}>
            
            {/* Shine sweep */}
            <div
              className="card-shine absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, transparent, ${accent}08, transparent)`,
                opacity: 0,
                transform: 'translateX(-100%)'
              }} />
            

            {/* Accent line top */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{ background: accent }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }} />
            

            {/* Icon */}
            <div
              className="card-icon w-12 h-12 rounded-xl flex items-center justify-center mb-4"
              style={{ background: `${accent}12`, transformOrigin: 'center' }}>
              
              <div style={{ color: accent }}>{icon}</div>
            </div>

            {/* Title */}
            <h3
              className={`font-bold text-sm mb-2 ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}
              style={{ fontFamily: FONT_HEADING }}>
              
              {title}
            </h3>

            {/* Description */}
            <p className={`text-xs leading-relaxed ${isDarkMode ? 'text-zinc-500' : 'text-zinc-500'}`}>
              {description}
            </p>

            {/* Learn more */}
            <motion.div
              className="flex items-center gap-1 mt-3 text-[10px] font-semibold"
              style={{ color: accent, fontFamily: FONT_HEADING }}
              animate={{ x: isHovered ? 4 : 0, opacity: isHovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}>
              
              Learn more <ChevronRight size={10} />
            </motion.div>
          </div>
        </div>
      </TiltCard>
    </motion.div>);

};

// ─── Animated Cloud (2D Element) ───
const AnimatedCloud = () => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      className="w-64 h-40 flex items-center justify-center pointer-events-none relative -rotate-6"
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8, ease: 'back.out(1.4)' }}
    >
      {/* Background gradient glow (very subtle) */}
      <div className="absolute inset-0 bg-[#4285F4]/5 blur-3xl opacity-30" />
      
      {/* Animated 2D Cloud SVG */}
      <motion.div
          animate={{
            y: [-5, 5, -5],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="relative z-10 w-full h-full flex items-center justify-center p-6"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full drop-shadow-lg">
            <path stroke="#4285F4" d="M17.5 19C19.9853 19 22 16.9853 22 14.5C22 12.1802 20.2483 10.2707 18 10.0384C17.6534 6.64362 14.7792 4 11.25 4C7.7963 4 4.96582 6.65682 4.53676 10H4.5C2.01472 10 0 12.0147 0 14.5C0 16.9853 2.01472 19 4.5 19H17.5Z" fill={isDarkMode ? '#4285f420' : '#4285f430'}/>
            {/* Sparkles */}
            <motion.path 
              d="M19 5L20 7L22 8L20 9L19 11L18 9L16 8L18 7L19 5Z" 
              fill="#FBBC04" stroke="none"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
            />
            <motion.path 
              d="M5 2L5.5 3L6.5 3.5L5.5 4L5 5L4.5 4L3.5 3.5L4.5 3L5 2Z" 
              fill="#EA4335" stroke="none"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Infinity, delay: 1 }}
            />
            <motion.path 
              d="M9 20L9.5 21L10.5 21.5L9.5 22L9 23L8.5 22L7.5 21.5L8.5 21L9 20Z" 
              fill="#34A853" stroke="none"
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
            />
          </svg>
        </motion.div>
    </motion.div>
  );
};

// ─── Floating Phone Mockup ───
const PhoneMockup = () => {
  const { isDarkMode } = useTheme();
  const phoneRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!phoneRef.current) return;
    gsap.fromTo(
      phoneRef.current,
      { opacity: 0, x: -60, rotate: -5 },
      { opacity: 1, x: 0, rotate: 0, duration: 0.9, delay: 0.7, ease: 'back.out(1.4)' }
    );
  }, []);

  useEffect(() => {
    if (!phoneRef.current) return;
    if (isHovered) {
      gsap.to(phoneRef.current, { y: -8, rotate: -3, scale: 1.05, duration: 0.4, ease: 'back.out(1.7)' });
    } else {
      gsap.to(phoneRef.current, { y: 0, rotate: 0, scale: 1, duration: 0.4, ease: 'power2.out' });
    }
  }, [isHovered]);

  return (
    <TiltCard intensity={10}>
      <div
        ref={phoneRef}
        className={`w-[80px] h-[140px] rounded-2xl border-2 overflow-hidden cursor-pointer transition-colors duration-500 ${
        isDarkMode ?
        'bg-[#151518] border-[#27272a]' :
        'bg-white border-[#d0d0d0]'}`
        }
        style={{
          boxShadow: isDarkMode ?
          '0 8px 30px rgba(0,0,0,0.4)' :
          '0 8px 30px rgba(0,0,0,0.1)'
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}>
        
        {/* Notch */}
        <div className="flex justify-center pt-1.5 pb-1">
          <div className={`w-10 h-1.5 rounded-full ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-200'}`} />
        </div>

        {/* Screen content */}
        <div className="px-2 space-y-1.5">
          {/* Hero image */}
          <motion.div
            className="w-full h-12 rounded-lg flex items-center justify-center"
            style={{
              background: `linear-gradient(135deg, #4285F440, #34A85340)`
            }}
            animate={isHovered ? { scale: [1, 1.03, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}>
            
            <Smartphone size={14} className="text-[#4285F4]" />
          </motion.div>

          {/* Content lines */}
          <div className={`w-full h-1.5 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />
          <div className={`w-3/4 h-1.5 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />
          <div className={`w-1/2 h-1.5 rounded ${isDarkMode ? 'bg-zinc-800' : 'bg-zinc-100'}`} />

          {/* Mini button */}
          <motion.div
            className="w-full h-5 rounded-md flex items-center justify-center"
            style={{
              background: isHovered ? '#4285F4' : isDarkMode ? '#27272a' : '#e5e5e5'
            }}
            transition={{ duration: 0.3 }}>
            
            <span className="text-[6px] font-bold" style={{ color: isHovered ? 'white' : isDarkMode ? '#71717a' : '#a1a1aa' }}>
              RSVP
            </span>
          </motion.div>
        </div>

        {/* Home indicator */}
        <div className="absolute bottom-1 left-0 right-0 flex justify-center">
          <div className={`w-8 h-1 rounded-full ${isDarkMode ? 'bg-zinc-700' : 'bg-zinc-200'}`} />
        </div>
      </div>
    </TiltCard>);

};

// ─── Animated SVG Wave Divider ───
const WaveDivider = () => {
  const { isDarkMode } = useTheme();
  return (
    <motion.svg
      viewBox="0 0 1200 40"
      className="w-full h-8 mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2, duration: 1 }}>
      
      <motion.path
        d="M0 20 Q 150 0, 300 20 T 600 20 T 900 20 T 1200 20"
        fill="none"
        stroke={isDarkMode ? '#27272a' : '#e0e0e0'}
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ delay: 2, duration: 2, ease: 'easeInOut' }} />
      
      {/* Colored dots on the wave */}
      {[
      { cx: 150, color: '#4285F4' },
      { cx: 450, color: '#EA4335' },
      { cx: 750, color: '#FBBC04' },
      { cx: 1050, color: '#34A853' }].
      map((dot, i) =>
      <motion.circle
        key={i}
        cx={dot.cx}
        cy={20}
        r={3}
        fill={dot.color}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 2.5 + i * 0.2, type: 'spring' }} />

      )}
    </motion.svg>);

};

// ─── Nav / Logo Bar ───
const NavBar = () => {
  const { isDarkMode } = useTheme();
  const [hoveredItem, setHoveredItem] = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }
    );
  }, []);

  const navItems = [
  { name: 'Events', color: '#4285F4' },
  { name: 'Team', color: '#EA4335' },
  { name: 'Projects', color: '#34A853' },
  { name: 'Blog', color: '#FBBC04' }];


  return (
    <nav
      ref={navRef}
      className={`fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 sm:px-10 py-4 border-b transition-all duration-500 ${
      isDarkMode ?
      'bg-[#09090b]/80 border-[#27272a]' :
      'bg-[#f8f9fa]/80 border-[#e0e0e0]'}`
      }
      style={{ backdropFilter: 'blur(16px)' }}>
      
      <Magnetic strength={0.15}>
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="flex gap-[3px]">
            {['#4285F4', '#EA4335', '#FBBC04', '#34A853'].map((c, i) =>
            <motion.div
              key={i}
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: c }}
              whileHover={{ scale: 1.5, y: -2 }}
              transition={{ type: 'spring', stiffness: 400 }} />

            )}
          </div>
          <span
            className={`font-bold text-sm tracking-tight ${isDarkMode ? 'text-zinc-100' : 'text-zinc-900'}`}
            style={{ fontFamily: FONT_HEADING }}>
            
            GDG On Campus
          </span>
          <span className={`hidden sm:inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border ${
          isDarkMode ? 'bg-[#151518] border-[#27272a] text-zinc-500' : 'bg-white border-[#e0e0e0] text-zinc-500'}`
          }>
            WCE
          </span>
        </div>
      </Magnetic>

      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
          <Magnetic key={item.name} strength={0.2}>
              <motion.a
              href="#"
              className={`relative text-xs font-medium px-3 py-1.5 rounded-lg transition-colors duration-300 ${
              isDarkMode ? 'text-zinc-500 hover:text-zinc-200' : 'text-zinc-500 hover:text-zinc-800'}`
              }
              style={{
                background: hoveredItem === item.name ? `${item.color}10` : 'transparent',
                fontFamily: FONT_HEADING
              }}
              onMouseEnter={() => setHoveredItem(item.name)}
              onMouseLeave={() => setHoveredItem(null)}
              whileHover={{ scale: 1.05 }}>
              
                {item.name}
                {/* Underline */}
                <motion.div
                className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                style={{ background: item.color }}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: hoveredItem === item.name ? 1 : 0 }}
                transition={{ duration: 0.3 }} />
              
              </motion.a>
            </Magnetic>
          )}
        </div>
        <ConnectionDots />
      </div>
    </nav>);

};

// ─── GSAP Entrance Timeline for Headline ───
const useHeadlineTimeline = () => {
  const headlineRef = useRef(null);

  useEffect(() => {
    if (!headlineRef.current) return;

    const tl = gsap.timeline({ delay: 0.4 });
    const words = headlineRef.current.querySelectorAll('.headline-word');
    const subtitle = headlineRef.current.querySelector('.subtitle');
    const badge = headlineRef.current.querySelector('.badge');
    const buttons = headlineRef.current.querySelectorAll('.cta-btn');

    tl.fromTo(
      badge,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' }
    );

    words.forEach((word, i) => {
      tl.fromTo(
        word,
        { y: 80, opacity: 0, rotateX: 20 },
        { y: 0, opacity: 1, rotateX: 0, duration: 0.7, ease: 'power3.out' },
        `-=${i === 0 ? 0 : 0.45}`
      );
    });

    tl.fromTo(
      subtitle,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' },
      '-=0.3'
    );

    buttons.forEach((btn, i) => {
      tl.fromTo(
        btn,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.4)' },
        `-=${i === 0 ? 0.2 : 0.35}`
      );
    });

    return () => {tl.kill();};
  }, []);

  return headlineRef;
};

// ─── Hover-Reveal Text ───
const HoverWord = ({ children, color }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.span
      className="inline-block cursor-pointer relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        color: isHovered ? color : undefined,
        scale: isHovered ? 1.08 : 1
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      style={{ fontWeight: 600 }}>
      
      {children}
      <motion.span
        className="absolute bottom-0 left-0 right-0 h-[2px] rounded-full"
        style={{ background: color }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }} />
      
    </motion.span>);

};

// ─── Main Component ───
const First = () => {
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const headlineRef = useHeadlineTimeline();
  const sectionRef = useRef(null);

  // GSAP event cards scroll entrance
  useEffect(() => {
    if (!sectionRef.current) return;
    const cards = sectionRef.current.querySelectorAll('.event-card-wrap');
    const title = sectionRef.current.querySelector('.section-title');

    const tl = gsap.timeline({ delay: 1.8 });

    if (title) {
      tl.fromTo(title, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' });
    }

    cards.forEach((card, i) => {
      tl.fromTo(
        card,
        { y: 50, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'back.out(1.4)' },
        `-=${i === 0 ? 0 : 0.4}`
      );
    });

    return () => {tl.kill();};
  }, []);

  // Mouse move for parallax (desktop only)
  useEffect(() => {
    if (isMobile) return;
    const handleMove = (e) => {
      setMousePos({
        x: (e.clientX - window.innerWidth / 2) / window.innerWidth,
        y: (e.clientY - window.innerHeight / 2) / window.innerHeight
      });
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, [isMobile]);

  return (
    <div
      className={`relative min-h-screen w-full overflow-hidden transition-colors duration-700 ${
      isDarkMode ? 'bg-[#09090b] text-zinc-100' : 'bg-[#f8f9fa] text-zinc-900'}`
      }>
      
      {/* Noise texture overlay */}
      <div className="noise-overlay absolute inset-0 pointer-events-none z-[1]" />

      {/* Background layers */}
      <AnimatedGrid />
      <FloatingOrbs />

      {/* Interactive grid on right edge */}
      {!isMobile && <InteractiveGrid />}

      {/* Navigation */}
      {/* <NavBar /> */}

      {/* Theme Toggle */}
      {/* <ThemeToggle /> */}

      {/* ─── FLOATING TECH BADGES (scattered around hero) ─── */}
      {!isMobile &&
      <>
          <FloatingBadge label="Flutter" color="#4285F4" x={5} y={35} delay={0} />
          <FloatingBadge label="Firebase" color="#FBBC04" x={8} y={55} delay={0.3} />
          <FloatingBadge label="TensorFlow" color="#EA4335" x={3} y={72} delay={0.6} />
          <FloatingBadge label="Kotlin" color="#34A853" x={88} y={40} delay={0.2} />
          <FloatingBadge label="Angular" color="#EA4335" x={91} y={60} delay={0.5} />
          <FloatingBadge label="Go" color="#4285F4" x={85} y={78} delay={0.8} />
        </>
      }

      {/* ─── HERO SECTION ─── */}
      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-20 pb-16">
        <div ref={headlineRef} className="text-center max-w-5xl mx-auto">
          {/* Badge */}
          <div className="badge mb-6 sm:mb-8 flex justify-center">
            <Magnetic strength={0.2}>
              <motion.div
                className={`px-4 py-1.5 rounded-full inline-flex items-center gap-2 border transition-all duration-500 cursor-pointer ${
                isDarkMode ?
                'bg-[#151518] border-[#27272a] text-zinc-400' :
                'bg-white border-[#e0e0e0] text-zinc-600 shadow-sm'}`
                }
                whileHover={{
                  scale: 1.05,
                  borderColor: '#4285F4'
                }}>
                
                <motion.div
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}>
                  
                  <Code2 size={14} className="text-[#4285F4]" />
                </motion.div>
                <span className="text-xs font-medium tracking-wide" style={{ fontFamily: FONT_HEADING }}>
                  Connect with Developers
                </span>
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}>
                  
                  <Sparkles size={13} className="text-[#FBBC04]" />
                </motion.div>
              </motion.div>
            </Magnetic>
          </div>

          {/* Main Headline — GSAP animated */}
          <div className="perspective-1000 mb-6">
            <h1>
              <span
                className="headline-word block text-5xl sm:text-7xl md:text-8xl lg:text-[8rem] font-extrabold tracking-tighter leading-[0.9]"
                style={{ fontFamily: FONT_HEADING }}>
                
                <span
                  className="glitch-text"
                  data-text="BUILD">
                  
                  BUILD
                </span>
              </span>
              <span
                className="headline-word block text-3xl sm:text-6xl md:text-7xl lg:text-[6rem] font-extrabold tracking-tighter leading-[0.9] bg-clip-text text-transparent"
                style={{
                  fontFamily: FONT_HEADING,
                  backgroundImage: 'linear-gradient(135deg, #4285F4 0%, #34A853 35%, #FBBC04 65%, #EA4335 100%)',
                  WebkitBackgroundClip: 'text'
                }}>
                
                TOGETHER
              </span>
            </h1>
          </div>

          {/* Subtitle with hover words */}
          <p
            className={`subtitle text-base sm:text-lg md:text-xl max-w-xl mx-auto leading-relaxed mb-2 ${
            isDarkMode ? 'text-zinc-400' : 'text-zinc-500'}`
            }>
            
            Google Developer Group — On Campus WCE.
            <br className="hidden sm:block" />
            Where students{' '}
            <HoverWord color="#4285F4">learn</HoverWord>,{' '}
            <HoverWord color="#EA4335">build</HoverWord>, and{' '}
            <HoverWord color="#34A853">grow</HoverWord>{' '}
            together.
          </p>

          {/* Animated wave divider */}
          <WaveDivider />

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 justify-center px-4">
            <Magnetic strength={0.15}>
              <motion.button
                onClick={() => {
                  const el = document.getElementById('team');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`cta-btn group relative flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm rounded-xl border-2 overflow-hidden transition-all duration-300 cursor-pointer ${
                isDarkMode ?
                'bg-zinc-100 text-zinc-900 border-zinc-100 hover:bg-white' :
                'bg-zinc-900 text-white border-zinc-900 hover:bg-zinc-800'}`
                }
                style={{ fontFamily: FONT_HEADING }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}>
                
                {/* Sweep bg */}
                <motion.div
                  className="absolute inset-0 bg-[#4285F4]"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4 }} />
                
                <span className="relative z-10 flex items-center gap-2">
                  <Users size={16} />
                  Meet Our Team
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <ArrowRight size={15} />
                  </motion.span>
                </span>
              </motion.button>
            </Magnetic>

            <Magnetic strength={0.15}>
              <motion.button
                onClick={() => {
                  const el = document.getElementById('events');
                  if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }}
                className={`cta-btn group flex items-center justify-center gap-2.5 px-8 py-4 font-bold text-sm rounded-xl border-2 transition-all duration-300 cursor-pointer ${
                isDarkMode ?
                'bg-transparent text-zinc-300 border-[#27272a] hover:border-zinc-500 hover:text-zinc-100' :
                'bg-white text-zinc-700 border-[#e0e0e0] hover:border-zinc-400 hover:text-zinc-900 shadow-sm'}`
                }
                style={{ fontFamily: FONT_HEADING }}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}>
                
                <Calendar size={16} className="text-[#4285F4]" />
                Upcoming Events
              </motion.button>
            </Magnetic>
          </div>
        </div>

        {/* ─── Event Cards Section ─── */}
        <div ref={sectionRef} className="mt-20 sm:mt-24 w-full max-w-5xl mx-auto">
          <h2
            className={`section-title text-center font-bold text-lg sm:text-xl mb-10 ${
            isDarkMode ? 'text-zinc-300' : 'text-zinc-700'}`
            }
            style={{ fontFamily: FONT_HEADING }}>
            
            What We Do
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 px-2">
            <div className="event-card-wrap">
              <EventCard
                icon={<Zap size={22} />}
                title="Tech Talks"
                description="Deep-dive sessions on cutting-edge technologies by industry speakers and core team members."
                accent="#4285F4"
                delay={0} />
              
            </div>
            <div className="event-card-wrap">
              <EventCard
                icon={<BookOpen size={22} />}
                title="Study Jams"
                description="Hands-on guided learning paths covering Android, Cloud, ML, and Web development."
                accent="#34A853"
                delay={0} />
              
            </div>
            <div className="event-card-wrap">
              <EventCard
                icon={<Cpu size={22} />}
                title="Hackathons"
                description="48-hour build sprints where ideas transform into working prototypes and real-world solutions."
                accent="#FBBC04"
                delay={0} />
              
            </div>
            <div className="event-card-wrap">
              <EventCard
                icon={<Globe size={22} />}
                title="Community"
                description="A vibrant network of passionate student developers sharing knowledge and opportunities."
                accent="#EA4335"
                delay={0} />
              
            </div>
          </div>
        </div>

        {/* ─── DESKTOP DECORATIVE WIDGETS ─── */}
        {!isMobile &&
        <>
            {/* Interactive Terminal — top right */}
            <motion.div
            className="hidden lg:block absolute top-24 right-8 z-20"
            style={{
              x: mousePos.x * 20,
              y: mousePos.y * 20
            }}>
            
              <InteractiveTerminal />
            </motion.div>

            {/* Phone Mockup — top left */}
            <motion.div
            className="hidden lg:block absolute top-28 left-12 z-20"
            style={{
              x: mousePos.x * -18,
              y: mousePos.y * -18
            }}>
            
              <PhoneMockup />
            </motion.div>

            {/* 3D Rotating Cube — mid left */}
            <motion.div
            className="hidden lg:block absolute top-1/2 left-28 -translate-y-1/2 z-20"
            style={{
              x: mousePos.x * -12,
              y: mousePos.y * -12
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.3, type: 'spring' }}>
            
              <RotatingCube />
            </motion.div>

            {/* Orbiting Icons — bottom left */}
            <motion.div
            className="hidden lg:block absolute bottom-28 left-10 z-20"
            style={{
              x: mousePos.x * -15,
              y: mousePos.y * -15
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.5, duration: 0.7 }}>
            
              <OrbitingIcons />
            </motion.div>

            {/* Animated Cloud — bottom right */}
            <motion.div
            className="hidden lg:block absolute bottom-24 right-10 z-20"
            style={{
              x: mousePos.x * 18,
              y: mousePos.y * 18
            }}>
            
              <AnimatedCloud />
            </motion.div>

            {/* Fan Cards — mid right */}
            <motion.div
            className="hidden lg:block absolute top-[45%] right-28 z-20"
            style={{
              x: mousePos.x * 15,
              y: mousePos.y * 15
            }}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}>
            
              <FanCards />
            </motion.div>

            {/* Morphing Blob — bottom center-left */}
            <motion.div
            className="hidden xl:block absolute bottom-32 left-[35%] z-20"
            style={{
              x: mousePos.x * -10,
              y: mousePos.y * -10
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.6, type: 'spring' }}>
            
              <MorphingBlob />
            </motion.div>

            {/* Git branch icon with hover */}
            <motion.div
            className="hidden lg:block absolute top-[40%] left-8 z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.5 }}>
            
              <Magnetic strength={0.4}>
                <motion.div
                className={`w-10 h-10 rounded-xl flex items-center justify-center border cursor-pointer transition-all duration-300 ${
                isDarkMode ?
                'bg-[#151518] border-[#27272a] hover:border-[#34A853]' :
                'bg-white border-[#e0e0e0] hover:border-[#34A853] shadow-sm'}`
                }
                whileHover={{
                  scale: 1.2,
                  rotate: 12,
                  boxShadow: '0 8px 25px rgba(52, 168, 83, 0.15)'
                }}
                whileTap={{ scale: 0.9 }}>
                
                  <GitBranch size={16} className="text-[#34A853]" />
                </motion.div>
              </Magnetic>
            </motion.div>

            {/* Monitor icon */}
            <motion.div
            className="hidden xl:block absolute top-32 left-[30%] z-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.5 }}>
            
              <Magnetic strength={0.4}>
                <motion.div
                className={`w-9 h-9 rounded-lg flex items-center justify-center border cursor-pointer transition-all duration-300 ${
                isDarkMode ?
                'bg-[#151518] border-[#27272a] hover:border-[#EA4335]' :
                'bg-white border-[#e0e0e0] hover:border-[#EA4335] shadow-sm'}`
                }
                whileHover={{
                  scale: 1.2,
                  rotate: -8,
                  boxShadow: '0 8px 25px rgba(234, 67, 53, 0.15)'
                }}
                whileTap={{ scale: 0.9 }}>
                
                  <Monitor size={14} className="text-[#EA4335]" />
                </motion.div>
              </Magnetic>
            </motion.div>

            {/* Cloud icon — floating */}
            <motion.div
            className="hidden xl:block absolute top-36 right-[33%] z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}>
            
              <Magnetic strength={0.3}>
                <motion.div
                className={`w-9 h-9 rounded-lg flex items-center justify-center border cursor-pointer transition-all duration-300 ${
                isDarkMode ?
                'bg-[#151518] border-[#27272a] hover:border-[#4285F4]' :
                'bg-white border-[#e0e0e0] hover:border-[#4285F4] shadow-sm'}`
                }
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                whileHover={{
                  scale: 1.2,
                  boxShadow: '0 8px 25px rgba(66, 133, 244, 0.15)'
                }}>
                
                  <Cloud size={14} className="text-[#4285F4]" />
                </motion.div>
              </Magnetic>
            </motion.div>
          </>
        }
      </main>

      {/* ─── Google Color Bottom Accent Bar ─── */}
      <motion.div
        className="absolute bottom-0 w-full h-1 flex z-50"
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.2, delay: 1.5, ease: EASE_SMOOTH }}>
        
        <div className="flex-1 bg-[#4285F4]" />
        <div className="flex-1 bg-[#EA4335]" />
        <div className="flex-1 bg-[#FBBC04]" />
        <div className="flex-1 bg-[#34A853]" />
      </motion.div>

      {/* Mobile scroll indicator */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 md:hidden z-30"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}>
        
        <div className={`w-5 h-8 rounded-full border-2 flex justify-center pt-1.5 ${
        isDarkMode ? 'border-zinc-700' : 'border-zinc-300'}`
        }>
          <motion.div
            className={`w-1 h-2 rounded-full ${isDarkMode ? 'bg-zinc-600' : 'bg-zinc-400'}`}
            animate={{ y: [0, 6, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }} />
          
        </div>
      </motion.div>
    </div>);

};

export default First;