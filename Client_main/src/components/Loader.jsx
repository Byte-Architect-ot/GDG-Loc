// components/Loader.jsx
import React, { useState, useEffect } from 'react';

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

const DecryptText = ({ text, revealDelay = 0, isRevealing }) => {
  const [displayText, setDisplayText] = useState('');
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890@#$%&<>/[]{}';
  
  useEffect(() => {
    if (!isRevealing) {
      setDisplayText(text.split('').map(() => chars[Math.floor(Math.random() * chars.length)]).join(''));
      return;
    }
    let iterations = 0;
    const interval = setInterval(() => {
      setDisplayText(prev => 
        text.split('').map((letter, index) => {
          if (index < iterations) return text[index];
          return chars[Math.floor(Math.random() * chars.length)];
        }).join('')
      );
      if (iterations >= text.length) clearInterval(interval);
      iterations += 1 / 3; 
    }, 60); 
    return () => clearInterval(interval);
  }, [text, revealDelay, isRevealing]);
  return <span className="inline-block">{displayText}</span>;
};

export default function GDGSystemLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);
  const [currentLog, setCurrentLog] = useState("Initializing system...");
  const [startDecrypt, setStartDecrypt] = useState(false);
  const isMobile = useIsMobile();

  const logs = [
    { pct: 5, msg: "Connecting to GDG Node..." },
    { pct: 15, msg: "Compiling assets..." },
    { pct: 30, msg: "Optimizing V8 engine..." },
    { pct: 45, msg: "Fetching developer profiles..." },
    { pct: 60, msg: "Hydrating components..." },
    { pct: 75, msg: "Syncing with cloud..." },
    { pct: 90, msg: "Finalizing build..." },
    { pct: 98, msg: "Ready!" },
  ];

  useEffect(() => {
    setTimeout(() => setStartDecrypt(true), 500);

    let currentProgress = 0;
    const interval = setInterval(() => {
      const remaining = 100 - currentProgress;
      const speedModifier = remaining > 50 ? 1.3 : remaining > 20 ? 0.7 : 0.5;
      const increment = (Math.random() * 0.8 + 1) * speedModifier*2;
      currentProgress += increment;

      const foundLog = logs.find(l => l.pct <= currentProgress && l.pct > currentProgress - 5);
      if (foundLog) setCurrentLog(foundLog.msg);

      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => {
           if (onLoadingComplete) onLoadingComplete(); 
        }, 1000);
      }
      setProgress(currentProgress);
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    // FIXED CSS: Removed 'relative' and 'min-h-screen'. 
    // Added 'fixed inset-0 z-0' to keep it pinned to the background.
    <div className="fixed inset-0 z-0 bg-white text-slate-900 flex flex-col items-center justify-center overflow-hidden font-['Space_Grotesk']" style={{ height: 'calc(100vh + 1cm)', width: '100vw' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
        .bg-grid-subtle {
          background-size: 50px 50px;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.03) 1px, transparent 1px),
                            linear-gradient(to bottom, rgba(0, 0, 0, 0.03) 1px, transparent 1px);
        }
        @keyframes float {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: float 10s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>

      {/* BACKGROUND LAYERS */}
      <div className="absolute inset-0 bg-grid-subtle z-0" />
      {/* Animated blobs - Disabled on mobile */}
      {!isMobile && (
        <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
          <div className="absolute top-0 -right-4 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-4000" />
          <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob" />
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-10 w-full max-w-5xl px-8 flex flex-col justify-center h-full">
         <div className="mb-16 space-y-2">
           <div className="text-xs font-mono text-slate-500 tracking-[0.3em] uppercase mb-4 pl-1">System Boot Sequence v2.2</div>
           <div className="flex flex-col text-5xl sm:text-7xl md:text-8xl font-bold tracking-tight leading-[0.9]">
             <div className="text-slate-900 overflow-hidden"><DecryptText text="GOOGLE" isRevealing={startDecrypt} /></div>
             <div className="text-slate-400 overflow-hidden flex items-center gap-4">
               <span className="text-blue-600 text-6xl sm:text-8xl animate-pulse">{`>`}</span>
               <DecryptText text="DEVELOPER" isRevealing={startDecrypt} revealDelay={600} />
             </div>
             <div className="text-slate-900 overflow-hidden"><DecryptText text="GROUPS" isRevealing={startDecrypt} revealDelay={1200} /></div>
           </div>
         </div>
         <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
           <div className="font-mono text-sm h-24 flex flex-col justify-end">
             <div className="text-slate-600 border-l-2 border-slate-300 pl-4 py-2 bg-white/50 backdrop-blur-sm rounded-r-lg">
               <span className="text-green-600 mr-2">$</span>
               <span className="text-slate-500">root@gdg:~/init</span><br/>
               <span className="text-blue-600">{`> ${currentLog}`}</span>
               <span className="inline-block w-2 h-4 bg-blue-600 ml-2 animate-pulse align-middle" />
             </div>
           </div>
           <div className="flex flex-col gap-2">
             <div className="flex justify-between items-end mb-2">
               <span className="font-mono text-xs text-slate-500">MEMORY_USAGE</span>
               <span className="text-6xl font-bold tabular-nums tracking-tighter text-slate-900">{Math.floor(progress)}<span className="text-2xl text-slate-400">%</span></span>
             </div>
             <div className="h-1 w-full bg-slate-200 relative overflow-hidden">
               <div className="absolute top-0 left-0 h-full bg-slate-900 transition-all duration-300 ease-out" style={{ width: `${progress}%` }} />
             </div>
             <div className="flex w-full mt-1">
               <div className="h-1 bg-blue-500 transition-all duration-1000" style={{ width: `${progress * 0.25}%` }} />
               <div className="h-1 bg-red-500 transition-all duration-1000 delay-75" style={{ width: `${progress * 0.25}%` }} />
               <div className="h-1 bg-yellow-500 transition-all duration-1000 delay-100" style={{ width: `${progress * 0.25}%` }} />
               <div className="h-1 bg-green-500 transition-all duration-1000 delay-150" style={{ width: `${progress * 0.25}%` }} />
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}