import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, Server, Globe, Smartphone, Cloud, Brain,
  Trophy, Timer, Terminal, Database, Cpu, Network,
  Layers, Zap, ArrowRight, CheckCircle2, ShieldCheck,
  MonitorSmartphone, Rocket, Binary, GitBranch,
  Box, Wifi, Lock, BarChart3, Sparkles, Play,
  Award, Target, TrendingUp, Users, Star
} from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext'; // Adjust path as needed

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

// --- 3D VISUAL COMPONENTS ---

// Web Development Visual
const WebDevVisual = ({ isDarkMode }) => (
  <div className="relative w-72 h-72 lg:w-96 lg:h-96 perspective-1000 flex items-center justify-center">
    <motion.div
      className="absolute flex items-center justify-center scale-90 sm:scale-100 lg:scale-110"
      animate={{ rotateY: [0, 5, 0, -5, 0], rotateX: [0, -2, 0, 2, 0] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Sleek Browser Layout */}
      <div 
        className={`relative w-64 h-48 lg:w-80 lg:h-56 rounded-xl shadow-2xl overflow-hidden backdrop-blur-md border border-white/10
          ${isDarkMode ? 'bg-[#0f111a]/90' : 'bg-slate-50/90'}`}
        style={{ transform: 'translateZ(20px)' }}
      >
        {/* Browser Chrome */}
        <div className={`h-8 border-b flex items-center px-4 gap-2 ${isDarkMode ? 'border-white/5 bg-black/20' : 'border-black/5 bg-black/5'}`}>
          <div className="flex gap-1.5">
            <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
            <div className={`w-2.5 h-2.5 rounded-full ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
          </div>
          <div className={`flex-1 mx-4 h-4 rounded-md flex items-center px-2 ${isDarkMode ? 'bg-black/30' : 'bg-white/50'}`}>
            <span className={`text-[8px] font-mono ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              gdg-wce.dev
            </span>
          </div>
        </div>
        
        {/* Page Content Wireframe */}
        <div className="p-4 h-full flex flex-col gap-3">
          <div className="flex gap-4">
            <div className={`w-12 h-12 rounded-lg ${isDarkMode ? 'bg-blue-500/20' : 'bg-blue-500/10'} border border-blue-500/20`} />
            <div className="flex-1 space-y-2">
              <div className={`h-2.5 w-1/3 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
              <div className={`h-2 w-3/4 rounded ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
              <div className={`h-2 w-5/6 rounded ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-2 mt-2">
            {[1, 2, 3].map(i => (
              <div key={i} className={`h-16 rounded-lg ${isDarkMode ? 'bg-slate-800/50' : 'bg-slate-200/50'}`} />
            ))}
          </div>
        </div>
      </div>

      {/* Floating Code Editor Overlay */}
      <motion.div
        className={`absolute -bottom-4 -right-4 lg:-bottom-6 lg:-right-4 rounded-xl p-4 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.5)] border border-white/10 z-20 backdrop-blur-xl
          ${isDarkMode ? 'bg-[#1e1e2e]/90' : 'bg-[#282a36]/90'}`}
        style={{ transform: 'translateZ(60px)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex gap-1.5 mb-3">
           <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
           <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
           <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
        </div>
        <pre className="text-[10px] sm:text-xs font-mono leading-relaxed">
          <span className="text-[#ff79c6]">import</span> <span className="text-[#f8f8f2]">React</span> <span className="text-[#ff79c6]">from</span> <span className="text-[#f1fa8c]">'react'</span>;<br/>
          <br/>
          <span className="text-[#ff79c6]">export</span> <span className="text-[#8be9fd]">default</span> <span className="text-[#ff79c6]">function</span> <span className="text-[#50fa7b]">App</span>() {'{'}<br/>
          <span className="text-[#f8f8f2]">  </span><span className="text-[#ff79c6]">return</span> (<br/>
          <span className="text-[#f8f8f2]">    </span><span className="text-[#8be9fd]">&lt;</span><span className="text-[#ff79c6]">Hero</span><span className="text-[#8be9fd]">&gt;</span><br/>
          <span className="text-[#f8f8f2]">      </span><span className="text-[#f1fa8c]">Build Good Things.</span><br/>
          <span className="text-[#f8f8f2]">    </span><span className="text-[#8be9fd]">&lt;/</span><span className="text-[#ff79c6]">Hero</span><span className="text-[#8be9fd]">&gt;</span><br/>
          <span className="text-[#f8f8f2]">  );</span><br/>
          {`}`}
        </pre>
      </motion.div>

      {/* Subtle React Logo Floating */}
      <motion.div
        className="absolute -top-4 -left-2 opacity-80"
        style={{ transform: 'translateZ(40px)' }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg viewBox="0 0 118 103" className="w-16 h-16" style={{ color: '#61dafb', fill: 'currentColor' }}>
          <path d="M59 81.39C32.12 81.39 9.87 70.08 0 51.5c9.87-18.58 32.12-29.89 59-29.89s49.13 11.31 59 29.89c-9.87 18.58-32.12 29.89-59 29.89zm0-56.78c-24.93 0-45.5 10.32-53.79 26.89 8.29 16.57 28.86 26.89 53.79 26.89 24.93 0 45.5-10.32 53.79-26.89-8.29-16.57-28.86-26.89-53.79-26.89zM59 66A14.5 14.5 0 1159 37a14.5 14.5 0 010 29zm0-26a11.5 11.5 0 100 23 11.5 11.5 0 000-23z" fill="currentColor"/>
          <path d="M78 81.8c-13.43 23.27-38.38 31.52-59 19.6C1 89.47-5.91 63.88 7.52 40.61 20.94 17.34 45.9 9.09 66.5 21 87.1 32.93 94.02 58.52 80.59 81.8m-50.63-29.2c-10.74 3-17.5 14.8-15.02 26.37 2.48 11.56 13.27 18.54 24 15.54 10.74-3 17.5-14.8 15.02-26.37-2.48-11.56-13.27-18.54-24-15.54m6.6-11.43c4.95-8.58 2.02-19.57-6.57-24.53s-19.61-2-24.57 6.58c-4.96 8.58-2.02 19.57 6.57 24.53s19.62 2 24.57-6.58" fill="currentColor"/>
        </svg>
      </motion.div>
    </motion.div>
  </div>
);

// App Development Visual
const AppDevVisual = ({ isDarkMode }) => (
  <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center perspective-1000">
    <motion.div
      className="relative scale-90 sm:scale-100 lg:scale-105"
      animate={{ rotateY: [-5, 5, -5], rotateX: [2, -2, 2] }}
      transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Sleek Phone Silhouette */}
      <div className="relative w-40 h-[300px] lg:w-48 lg:h-[340px] rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.5)] border-[0.5rem] border-slate-900 bg-slate-900 overflow-hidden"
           style={{ transform: 'translateZ(30px)' }}>
        
        {/* Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-5 bg-slate-900 rounded-b-xl z-20 flex justify-center items-center gap-1">
          <div className="w-1 h-1 rounded-full bg-slate-700" />
          <div className="w-8 h-1 rounded-full bg-slate-800" />
        </div>
        
        {/* Screen Background */}
        <div className={`absolute inset-0 pt-8 px-4 flex flex-col gap-4 font-sans ${isDarkMode ? 'bg-[#12141d]' : 'bg-slate-50'}`}>
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500`}>
              <Users size={18} />
            </div>
            <div className={`h-8 w-8 rounded-full ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}`} />
          </div>
          
          {/* Main Card */}
          <div className={`p-4 rounded-2xl ${isDarkMode ? 'bg-slate-800' : 'bg-white'} shadow-sm border ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
            <div className={`h-3 w-1/2 rounded mb-2 ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
            <div className={`h-8 w-3/4 rounded ${isDarkMode ? 'bg-emerald-500/20' : 'bg-emerald-500/10'}`} />
          </div>
          
          {/* List items */}
          <div className="flex-1 space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className={`flex items-center gap-3 p-3 rounded-xl ${isDarkMode ? 'bg-slate-800/50' : 'bg-white'} border ${isDarkMode ? 'border-white/5' : 'border-slate-100'}`}>
                <div className={`w-8 h-8 rounded-lg ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                <div className="flex-1 space-y-1">
                  <div className={`h-2 w-full rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                  <div className={`h-2 w-2/3 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`} />
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
        </div>
      </div>

      {/* Floating Status Notification */}
      <motion.div
        className={`absolute top-6 -right-6 rounded-2xl p-3 shadow-xl border backdrop-blur-md
          ${isDarkMode ? 'bg-slate-800/90 border-slate-700' : 'bg-white/90 border-slate-200'}`}
        style={{ transform: 'translateZ(70px)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
            <CheckCircle2 size={16} className="text-white" />
          </div>
          <div>
            <div className={`text-[10px] font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Build Success</div>
            <div className="text-[9px] text-emerald-500 font-medium">Ready for deployment</div>
          </div>
        </div>
      </motion.div>

      {/* Floating Framework Badge */}
      <motion.div
        className="absolute bottom-8 -left-6 bg-[#042B59] border border-[#042B59]/50 text-white px-4 py-2 rounded-xl shadow-xl z-20 flex items-center gap-2"
        style={{ transform: 'translateZ(90px)' }}
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <span className="text-[#38BDF8] font-bold">Flutter</span>
        <span className="text-xs text-white/50">|</span>
        <span className="text-[#61DAFB] font-bold">React Native</span>
      </motion.div>
    </motion.div>
  </div>
);

// Competitive Programming Visual
const CPVisual = ({ isDarkMode }) => (
  <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center perspective-1000">
    <motion.div
      className="relative w-full h-full flex flex-col items-center justify-center"
      animate={{ rotateY: [8, -8, 8], rotateX: [3, 0, 3] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Central IDE Layout */}
      <div 
        className={`w-72 h-52 lg:w-80 lg:h-60 rounded-xl shadow-2xl overflow-hidden border flex flex-col
          ${isDarkMode ? 'bg-[#1e1e1e] border-[#333333]' : 'bg-[#1e1e1e] border-[#444444]'}`}
        style={{ transform: 'translateZ(30px)' }}
      >
        {/* Editor Tabs */}
        <div className="h-8 bg-[#2d2d2d] flex items-center border-b border-[#1e1e1e]">
          <div className="px-4 h-full flex items-center bg-[#1e1e1e] border-t-2 border-purple-500">
             <span className="text-[10px] text-purple-400 font-mono">solver.cpp</span>
          </div>
          <div className="px-4 h-full flex items-center text-slate-500">
             <span className="text-[10px] font-mono">input.txt</span>
          </div>
        </div>
        
        {/* Editor Body */}
        <div className="flex-1 p-4 font-mono text-[10px] lg:text-xs leading-relaxed relative flex">
          {/* Line Numbers */}
          <div className="w-6 text-slate-600 space-y-1 select-none pr-2 text-right border-r border-[#333]">
             <div>1</div><div>2</div><div>3</div><div>4</div><div>5</div><div>6</div>
          </div>
          <div className="pl-4 space-y-1">
            <div><span className="text-[#c586c0]">#include</span> <span className="text-[#ce9178]">&lt;iostream&gt;</span></div>
            <div><span className="text-[#c586c0]">using namespace</span> <span className="text-[#4ec9b0]">std</span>;</div>
            <br />
            <div>
              <span className="text-[#569cd6]">int</span> <span className="text-[#dcdcaa]">main</span>() {'{'}
            </div>
            <div className="pl-4">
              <span className="text-[#6a9955]">// Logic goes here</span>
            </div>
            <div className="pl-4 pb-2">
              <span className="text-[#c586c0]">return</span> <span className="text-[#b5cea8]">0</span>;
            </div>
            <div>{'}'}</div>
          </div>
          
          {/* Subtle cursor blink */}
          <motion.div 
            className="absolute top-[85px] left-[70px] w-2 h-[14px] bg-slate-400 opacity-60"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        </div>
        
        {/* Integrated Terminal Panel */}
        <div className="h-14 bg-[#181818] border-t border-[#333] p-2 font-mono flex flex-col gap-1">
           <div className="text-[#6a9955] text-[9px]">✓ Compiled successfully in 0.4s</div>
           <div className="text-white text-[9px] flex gap-2">
             <span className="text-blue-400">output:</span>
             <span>Accepted (15ms)</span>
           </div>
        </div>
      </div>

      {/* Floating Trophy & Rating */}
      <motion.div
        className={`absolute -top-4 -right-2 rounded-xl p-3 shadow-2xl border backdrop-blur-md flex items-center gap-3
          ${isDarkMode ? 'bg-[#252526]/90 border-[#333]' : 'bg-white/95 border-slate-200'}`}
        style={{ transform: 'translateZ(80px)' }}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center">
          <Trophy size={18} className="text-white" />
        </div>
        <div>
          <div className={`text-[10px] uppercase font-bold tracking-widest ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Rating</div>
          <div className={`text-sm font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-indigo-500`}>Grandmaster</div>
        </div>
      </motion.div>

      {/* Floating algorithmic chart */}
      <motion.div
        className={`absolute -bottom-4 -left-2 p-3 rounded-xl shadow-xl border
          ${isDarkMode ? 'bg-[#1e1e1e] border-[#333]' : 'bg-white border-slate-200'}`}
        style={{ transform: 'translateZ(60px)' }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <div className="flex items-end gap-1 h-8">
           {[4, 8, 6, 10, 5, 12].map((h, i) => (
             <motion.div 
               key={i} 
               className="w-2 bg-purple-500 rounded-sm"
               style={{ height: h * 2 }}
               initial={{ scaleY: 0 }}
               animate={{ scaleY: 1 }}
               transition={{ duration: 1, delay: i * 0.1, repeat: Infinity, repeatType: "reverse", repeatDelay: 2 }}
             />
           ))}
        </div>
        <div className={`text-[8px] mt-2 font-mono text-center ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>O(N log N)</div>
      </motion.div>

    </motion.div>
  </div>
);

// Cloud Computing Visual
const CloudVisual = ({ isDarkMode }) => (
  <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center perspective-1000">
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      animate={{ rotateY: [-5, 5, -5] }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Central Server Rack Stack */}
      <div className="flex flex-col gap-3 relative z-10" style={{ transform: 'translateZ(20px)' }}>
        {[1, 2, 3].map((server, i) => (
          <motion.div
             key={i}
             className={`w-48 lg:w-56 h-12 rounded-lg border flex items-center px-4 justify-between shadow-xl
               ${isDarkMode ? 'bg-[#1a1b26] border-[#292e42]' : 'bg-slate-800 border-slate-700'}`}
             animate={{ y: [0, -4, 0] }}
             transition={{ duration: 4, delay: i * 0.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Server front panel details */}
            <div className="flex gap-2 items-center">
               <div className="grid grid-cols-2 gap-1">
                 {[1, 2, 3, 4].map(btn => (
                   <div key={btn} className="w-1.5 h-1.5 rounded-full bg-slate-500/50" />
                 ))}
               </div>
               <div className="w-8 h-2 bg-slate-700 rounded-full ml-2" />
            </div>
            
            {/* Blinking Status Lights */}
            <div className="flex gap-1.5">
               <motion.div 
                 className="w-1.5 h-1.5 rounded-full bg-emerald-500"
                 animate={{ opacity: [1, 0.4, 1] }}
                 transition={{ duration: 0.5 + i * 0.2, repeat: Infinity, ease: 'linear' }}
               />
               <div className="w-1.5 h-1.5 rounded-full bg-blue-500/80" />
               <motion.div 
                 className="w-1.5 h-1.5 rounded-full bg-amber-500/80"
                 animate={{ opacity: [1, 0.2, 1] }}
                 transition={{ duration: 2 + i * 0.5, repeat: Infinity, ease: 'linear' }}
               />
            </div>
          </motion.div>
        ))}
        {/* Glow behind servers */}
        <div className="absolute inset-0 bg-blue-500/10 blur-xl -z-10 rounded-full" />
      </div>

      {/* Floating Connectivity Nodes */}
      {[
        { icon: Database, color: 'text-indigo-400', pos: '-left-4 top-10', z: '60px', delay: 0 },
        { icon: Cloud, color: 'text-sky-400', pos: '-right-4 top-16', z: '80px', delay: 1 },
        { icon: ShieldCheck, color: 'text-emerald-400', pos: 'left-4 -bottom-4', z: '90px', delay: 2 }
      ].map((node, i) => (
        <motion.div
          key={i}
          className={`absolute ${node.pos} p-3 rounded-xl border shadow-xl backdrop-blur-md
            ${isDarkMode ? 'bg-[#16161e]/90 border-[#292e42]' : 'bg-white/95 border-slate-200'}`}
          style={{ transform: `translateZ(${node.z})` }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4 + i, delay: node.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <node.icon size={20} className={node.color} />
        </motion.div>
      ))}

      {/* Data flow lines between nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ transform: 'translateZ(10px)' }}>
        <motion.path 
          d="M 120 150 Q 80 150, 60 100" 
          fill="none" 
          stroke="url(#dataGrad1)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <motion.path 
          d="M 260 120 Q 300 120, 320 160" 
          fill="none" 
          stroke="url(#dataGrad2)" 
          strokeWidth="2" 
          strokeDasharray="4 4"
          animate={{ strokeDashoffset: [20, 0] }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        />
        <defs>
          <linearGradient id="dataGrad1" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
             <stop offset="100%" stopColor="#38bdf8" />
          </linearGradient>
          <linearGradient id="dataGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
             <stop offset="0%" stopColor="#818cf8" />
             <stop offset="100%" stopColor="#818cf8" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      {/* SLA Badge */}
      <motion.div
        className={`absolute top-0 right-0 px-3 py-1.5 rounded-full border shadow-lg flex items-center gap-2
          ${isDarkMode ? 'bg-emerald-900/20 border-emerald-500/20' : 'bg-emerald-50 border-emerald-200'}`}
        style={{ transform: 'translateZ(70px)' }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">99.99% UPTIME</span>
      </motion.div>
    </motion.div>
  </div>
);

// Machine Learning Visual
const MLVisual = ({ isDarkMode }) => (
  <div className="relative w-72 h-72 lg:w-96 lg:h-96 flex items-center justify-center perspective-1000">
    <motion.div
      className="relative w-full h-full flex items-center justify-center"
      animate={{ rotateY: [0, 360], rotateX: [-10, -10] }}
      transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Central Tensor Core */}
      <div className="relative w-24 h-24 lg:w-32 lg:h-32" style={{ transformStyle: 'preserve-3d' }}>
         {/* Core Glow */}
         <div className={`absolute inset-0 rounded-full blur-3xl 
           ${isDarkMode ? 'bg-fuchsia-600/40' : 'bg-fuchsia-400/50'}`} 
           style={{ transform: 'translateZ(0px) scale(1.5)' }} 
         />
         
         {/* 3D Grid Planes representing Neural Layers */}
         {[
           { z: -40, color: 'border-fuchsia-500/30' },
           { z: 0, color: 'border-purple-500/50', active: true },
           { z: 40, color: 'border-indigo-500/30' }
         ].map((layer, i) => (
           <div 
             key={i}
             className={`absolute inset-0 border-2 rounded-xl flex items-center justify-center ${layer.color}
               ${isDarkMode ? 'bg-black/10 backdrop-blur-sm' : 'bg-white/10 backdrop-blur-md'}`}
             style={{ transform: `translateZ(${layer.z}px)`, transformStyle: 'preserve-3d' }}
           >
             {/* Nodes within the layer */}
             <div className="grid grid-cols-3 gap-3">
                {[...Array(9)].map((_, j) => (
                  <motion.div
                    key={j}
                    className={`w-2 h-2 rounded-full ${layer.active && (j===4||j===2||j===6) ? 'bg-white shadow-[0_0_10px_#fff]' : (isDarkMode ? 'bg-fuchsia-500/50' : 'bg-fuchsia-600/50')}`}
                    animate={layer.active ? { opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] } : {}}
                    transition={{ duration: 1.5, delay: j * 0.1, repeat: Infinity }}
                  />
                ))}
             </div>
           </div>
         ))}
      </div>

      {/* Orbiting Data Particles */}
      {[...Array(6)].map((_, i) => {
        const angle = (i * 60) * (Math.PI / 180);
        const radius = 90;
        return (
          <motion.div
            key={`orbit-${i}`}
            className="absolute rounded-full shadow-[0_0_15px_currentColor]"
            style={{
              width: i % 2 === 0 ? '6px' : '4px',
              height: i % 2 === 0 ? '6px' : '4px',
              color: i % 2 === 0 ? '#ec4899' : '#8b5cf6',
              backgroundColor: 'currentColor',
              left: '50%',
              top: '50%',
              marginTop: '-3px',
              marginLeft: '-3px',
            }}
            animate={{
              x: [
                Math.cos(angle) * radius,
                Math.cos(angle + Math.PI) * radius,
                Math.cos(angle + Math.PI*2) * radius
              ],
              z: [
                Math.sin(angle) * radius,
                Math.sin(angle + Math.PI) * radius,
                Math.sin(angle + Math.PI*2) * radius
              ],
              y: [ Math.sin(angle*2) * 20, -Math.sin(angle*2) * 20, Math.sin(angle*2) * 20 ]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          />
        );
      })}

      {/* Floating Info Panels (Counter-rotated to stay readable) */}
      <motion.div
        className={`absolute -top-16 -right-6 rounded-xl p-3 shadow-xl border backdrop-blur-md flex items-center gap-2
          ${isDarkMode ? 'bg-[#1a1b26]/90 border-[#292e42]' : 'bg-white/95 border-slate-200'}`}
        style={{ transform: 'translateZ(60px)' }}
        animate={{ rotateY: [360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-fuchsia-500 to-purple-600 flex items-center justify-center">
          <Brain size={16} className="text-white" />
        </div>
        <div>
          <div className={`text-[9px] font-bold ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Deep Learning</div>
          <div className="text-xs font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-500">Active</div>
        </div>
      </motion.div>

      <motion.div
        className={`absolute -bottom-16 -left-6 rounded-lg px-3 py-1.5 shadow-xl border backdrop-blur-md flex items-center gap-1.5
          ${isDarkMode ? 'bg-orange-500/10 border-orange-500/30' : 'bg-orange-50 border-orange-200'}`}
        style={{ transform: 'translateZ(80px)' }}
        animate={{ rotateY: [360, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
        <span className="text-[10px] font-bold text-orange-500">TensorFlow</span>
      </motion.div>

    </motion.div>
  </div>
);

// Color configuration
const colorConfig = {
  blue: {
    bg: "bg-blue-500",
    text: "text-blue-600 dark:text-blue-400",
    border: "border-blue-500 dark:border-blue-400",
    lightBg: "bg-blue-50 dark:bg-blue-950/50",
    gradient: "from-blue-600 to-indigo-500",
    hex: "#3b82f6",
    darkHex: "#60a5fa"
  },
  emerald: {
    bg: "bg-emerald-500",
    text: "text-emerald-600 dark:text-emerald-400",
    border: "border-emerald-500 dark:border-emerald-400",
    lightBg: "bg-emerald-50 dark:bg-emerald-950/50",
    gradient: "from-emerald-500 to-teal-500",
    hex: "#10b981",
    darkHex: "#34d399"
  },
  purple: {
    bg: "bg-purple-500",
    text: "text-purple-600 dark:text-purple-400",
    border: "border-purple-500 dark:border-purple-400",
    lightBg: "bg-purple-50 dark:bg-purple-950/50",
    gradient: "from-purple-600 to-indigo-500",
    hex: "#a855f7",
    darkHex: "#c084fc"
  },
  sky: {
    bg: "bg-sky-500",
    text: "text-sky-600 dark:text-sky-400",
    border: "border-sky-500 dark:border-sky-400",
    lightBg: "bg-sky-50 dark:bg-sky-950/50",
    gradient: "from-sky-500 to-blue-500",
    hex: "#0ea5e9",
    darkHex: "#38bdf8"
  },
  pink: {
    bg: "bg-pink-500",
    text: "text-pink-600 dark:text-pink-400",
    border: "border-pink-500 dark:border-pink-400",
    lightBg: "bg-pink-50 dark:bg-pink-950/50",
    gradient: "from-pink-500 to-purple-500",
    hex: "#ec4899",
    darkHex: "#f472b6"
  }
};

// Particle Background Component
const ParticleBackground = ({ activeIndex, isMobile, isDarkMode }) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef(null);

  useEffect(() => {
    if (isMobile) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const colors = Object.values(colorConfig).map(c => isDarkMode ? c.darkHex : c.hex);
    const activeColor = colors[activeIndex];

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedY = Math.random() * 0.3 + 0.1;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      reset() {
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.opacity = Math.random() * 0.4 + 0.1;
      }

      update() {
        this.y += this.speedY;
        this.x += this.speedX;

        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const angle = Math.atan2(dy, dx);
          this.x -= Math.cos(angle) * 0.8;
          this.y -= Math.sin(angle) * 0.8;
        }

        if (this.y > canvas.height + 10) this.reset();
        if (this.x < -10) this.x = canvas.width + 10;
        if (this.x > canvas.width + 10) this.x = -10;
      }

      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        const alpha = Math.floor(this.opacity * 255).toString(16).padStart(2, '0');
        ctx.fillStyle = activeColor + alpha;
        ctx.fill();
      }
    }

    particlesRef.current = [];
    const count = window.innerWidth < 768 ? 40 : 80;
    for (let i = 0; i < count; i++) {
      particlesRef.current.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((particle, i) => {
        particle.update();
        particle.draw();

        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const other = particlesRef.current[j];
          const dx = particle.x - other.x;
          const dy = particle.y - other.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(other.x, other.y);
            ctx.strokeStyle = activeColor + (isDarkMode ? '20' : '15');
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => setCanvasSize();
    const handleMouseMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [activeIndex, isMobile, isDarkMode]);

  if (isMobile) return null;
  
  return <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none opacity-60" />;
};

// --- SECTIONS DATA ---
const getSections = (isDarkMode) => [
  {
    id: 1,
    category: "WEB DEVELOPMENT",
    title: "Web Development",
    subtitle: "Crafting Modern Digital Experiences",
    description: "We build stunning, responsive websites and web applications that captivate users and drive results. From sleek landing pages to complex enterprise platforms, our team masters the full web development stack to bring your vision to life.",
    highlights: [
      "Responsive & mobile-first design",
      "Modern frameworks (React, Next.js, Vue)",
      "RESTful APIs & backend integration",
      "Performance optimization & SEO"
    ],
    stats: { projects: "200+", technologies: "25+", clients: "100+" },
    skills: ["React", "Next.js", "Node.js", "TypeScript", "Tailwind CSS", "MongoDB", "PostgreSQL", "GraphQL"],
    colorClass: "blue",
    component: <WebDevVisual isDarkMode={isDarkMode} />,
  },
  {
    id: 2,
    category: "APP DEVELOPMENT",
    title: "App Development",
    subtitle: "Native & Cross-Platform Excellence",
    description: "We create powerful mobile applications that users love. Whether you need a native iOS/Android app or a cross-platform solution, we deliver polished, performant apps that stand out in the app stores and keep users engaged.",
    highlights: [
      "Native iOS & Android development",
      "Cross-platform with Flutter & React Native",
      "UI/UX design for mobile",
      "App Store optimization & deployment"
    ],
    stats: { apps: "75+", downloads: "5M+", rating: "4.8★" },
    skills: ["Flutter", "React Native", "Kotlin", "Swift", "Firebase", "Jetpack Compose", "SwiftUI", "REST APIs"],
    colorClass: "emerald",
    component: <AppDevVisual isDarkMode={isDarkMode} />,
  },
  {
    id: 3,
    category: "COMPETITIVE PROGRAMMING",
    title: "Competitive Programming",
    subtitle: "Algorithms, Problem Solving & Beyond",
    description: "We sharpen minds through competitive programming excellence. Our community participates in global contests, mentors aspiring coders, and builds algorithmic thinking skills that translate to real-world software engineering prowess.",
    highlights: [
      "Data structures & algorithms mastery",
      "Contest preparation & strategy",
      "Problem solving workshops",
      "Interview preparation & mentoring"
    ],
    stats: { problems: "10K+", contests: "50+", members: "500+" },
    skills: ["C++", "Python", "Java", "Dynamic Programming", "Graph Theory", "Number Theory", "Geometry", "Greedy Algorithms"],
    colorClass: "purple",
    component: <CPVisual isDarkMode={isDarkMode} />,
  },
  {
    id: 4,
    category: "CLOUD COMPUTING",
    title: "Cloud Solutions",
    subtitle: "Scalable Infrastructure & DevOps",
    description: "We architect and deploy cloud-native solutions that scale effortlessly. From serverless functions to Kubernetes orchestration, we help organizations harness the full power of cloud computing for reliability, security, and performance.",
    highlights: [
      "Multi-cloud architecture (AWS, GCP, Azure)",
      "Containerization & Kubernetes",
      "CI/CD pipeline automation",
      "Infrastructure as Code (IaC)"
    ],
    stats: { deployments: "300+", uptime: "99.9%", savings: "40%" },
    skills: ["AWS", "Google Cloud", "Azure", "Docker", "Kubernetes", "Terraform", "Jenkins", "GitHub Actions"],
    colorClass: "sky",
    component: <CloudVisual isDarkMode={isDarkMode} />,
  },
  {
    id: 5,
    category: "MACHINE LEARNING",
    title: "Machine Learning",
    subtitle: "Intelligent Solutions & AI Innovation",
    description: "We build intelligent systems that learn, adapt, and deliver insights. From predictive models to computer vision and NLP, we leverage cutting-edge ML techniques to solve complex problems and create smart applications.",
    highlights: [
      "Deep learning & neural networks",
      "Natural language processing",
      "Computer vision & image recognition",
      "MLOps & model deployment"
    ],
    stats: { models: "150+", accuracy: "95%+", datasets: "50TB+" },
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "Hugging Face", "Pandas", "Jupyter"],
    colorClass: "pink",
    component: <MLVisual isDarkMode={isDarkMode} />,
  }
];

// Main Component
const Explore = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isMobile = useIsMobile();
  const { isDarkMode } = useTheme();
  const borderColor = isDarkMode ? 'border-slate-600' : 'border-black';

  const SECTIONS = getSections(isDarkMode);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Space+Grotesk:wght@500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  // Auto-rotate every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % SECTIONS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [SECTIONS.length]);

  const activeData = SECTIONS[activeIndex];
  const colors = colorConfig[activeData.colorClass];

  return (
    <div
      id="explore"
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden transition-colors duration-500
        ${isDarkMode 
          ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950' 
          : 'bg-gradient-to-br from-slate-50 via-white to-slate-50'
        }`}
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      {/* Background Elements */}
      <ParticleBackground activeIndex={activeIndex} isMobile={isMobile} isDarkMode={isDarkMode} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute inset-0 [background-size:40px_40px]
          ${isDarkMode 
            ? 'bg-[radial-gradient(#334155_1px,transparent_1px)] opacity-30' 
            : 'bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] opacity-40'
          }`} 
        />
      </div>

      {/* Gradient orb - hidden on mobile */}
      {!isMobile && (
        <motion.div
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl hidden lg:block"
          animate={{ scale: [1, 1.2, 1], rotate: [0, 180, 360] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ 
            backgroundColor: isDarkMode ? colors.darkHex || colors.hex : colors.hex,
            opacity: isDarkMode ? 0.1 : 0.2
          }}
        />
      )}

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-20 min-h-screen flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8">
            {/* Section Header */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  {Object.values(colorConfig).map((c, i) => (
                    <motion.span 
                      key={i} 
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: isDarkMode ? c.darkHex || c.hex : c.hex }}
                      animate={i === activeIndex ? { scale: [1, 1.3, 1] } : {}}
                      transition={{ duration: 1, repeat: Infinity }}
                    />
                  ))}
                </div>
                <span className={`text-xs font-bold tracking-widest uppercase
                  ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}
                >
                  Our Domains
                </span>
              </div>
              
              <h2 
                className={`text-4xl lg:text-6xl font-black leading-tight tracking-tight
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}`}
                style={{ fontFamily: "'Space Grotesk', sans-serif" }}
              >
                What We
                <br />
                <span className={`text-transparent bg-clip-text bg-gradient-to-r 
                  ${isDarkMode 
                    ? 'from-blue-400 via-purple-400 to-pink-400' 
                    : 'from-blue-600 via-purple-500 to-pink-500'
                  }`}
                >
                  Excel At
                </span>
              </h2>
            </div>

            {/* Active Section Content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.5 }}
                className="space-y-5"
              >
                {/* Category Badge */}
                <motion.div 
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${colors.lightBg} ${colors.text} ${colors.border}`}
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className={`w-2 h-2 rounded-full ${colors.bg}`} />
                  <span className="text-xs font-bold tracking-wider">
                    0{activeData.id} — {activeData.category}
                  </span>
                </motion.div>

                {/* Title */}
                <div>
                  <h3 
                    className={`text-3xl lg:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${colors.gradient} mb-2`}
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                  >
                    {activeData.title}
                  </h3>
                  <p className={`text-lg font-medium ${colors.text}`}>
                    {activeData.subtitle}
                  </p>
                </div>

                {/* Description */}
                <p className={`text-base lg:text-lg leading-relaxed max-w-xl
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}
                >
                  {activeData.description}
                </p>

                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeData.highlights.map((highlight, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 size={18} className={colors.text} />
                      <span className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {highlight}
                      </span>
                    </motion.div>
                  ))}
                </div>
                
              </motion.div>
            </AnimatePresence>

            {/* Progress Indicators */}
            <div className="flex gap-2 pt-2">
              {SECTIONS.map((section, idx) => {
                const sectionColors = colorConfig[section.colorClass];
                return (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`relative h-1.5 rounded-full overflow-hidden transition-all duration-500
                      ${isDarkMode 
                        ? 'bg-slate-700 hover:bg-slate-600' 
                        : 'bg-slate-200 hover:bg-slate-300'
                      }`}
                    style={{ width: idx === activeIndex ? '48px' : '12px' }}
                  >
                    {idx === activeIndex && (
                      <motion.div
                        className={`absolute inset-0 ${sectionColors.bg}`}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 5, ease: 'linear' }}
                        key={`progress-${activeIndex}`}
                      />
                    )}
                    {idx < activeIndex && (
                      <div className={`absolute inset-0 ${sectionColors.bg}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column - Visual (Hidden on mobile) */}
          <div className="hidden lg:flex items-center justify-center relative min-h-[500px]">
            {/* Background circles - Disabled on mobile */}
            {!isMobile && (
              <>
                <motion.div
                  className={`absolute w-[500px] h-[500px] rounded-full border-2
                    ${isDarkMode ? 'opacity-20' : 'opacity-30'}`}
                  style={{ borderColor: isDarkMode ? colors.darkHex || colors.hex : colors.hex }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className={`absolute w-[400px] h-[400px] rounded-full border border-dashed
                    ${isDarkMode ? 'opacity-10' : 'opacity-20'}`}
                  style={{ borderColor: isDarkMode ? colors.darkHex || colors.hex : colors.hex }}
                  animate={{ rotate: -360 }}
                  transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                />
                <motion.div
                  className={`absolute w-[300px] h-[300px] rounded-full border
                    ${isDarkMode ? 'opacity-5' : 'opacity-10'}`}
                  style={{ borderColor: isDarkMode ? colors.darkHex || colors.hex : colors.hex }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                />
              </>
            )}

            {/* Visual Component */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 30 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative z-10"
              >
                {activeData.component}
              </motion.div>
            </AnimatePresence>
          </div>
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
    </div>
  );
};

export default Explore;