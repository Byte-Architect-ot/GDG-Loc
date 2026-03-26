import React, { useState, useEffect, useRef, useMemo } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, ArrowRight, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useYear } from '../contexts/YearContext';
import { useTheme } from '../contexts/ThemeContext';
import { publicApi } from '../api/publicApi';

// --- 1. COLOR MAPPING FOR ROLES ---
const roleColors = {
  light: {
    "Lead": "text-blue-600",
    "Co-Lead": "text-rose-600",
    "Secretary": "text-emerald-600",
    "Member": "text-purple-600",
    "Treasurer": "text-amber-600",
    "Event Coordinator": "text-cyan-600",
    "Tech Lead": "text-indigo-600",
    "Community Manager": "text-teal-600",
    "Design Lead": "text-pink-600",
    "Marketing Lead": "text-orange-600",
    "Core Team": "text-violet-600"
  },
  dark: {
    "Lead": "text-blue-400",
    "Co-Lead": "text-rose-400",
    "Secretary": "text-emerald-400",
    "Member": "text-purple-400",
    "Treasurer": "text-amber-400",
    "Event Coordinator": "text-cyan-400",
    "Tech Lead": "text-indigo-400",
    "Community Manager": "text-teal-400",
    "Design Lead": "text-pink-400",
    "Marketing Lead": "text-orange-400",
    "Core Team": "text-violet-400"
  }
};

// Helper function to get color for role
const getColorForRole = (role, isDarkMode = false) => {
  const colors = isDarkMode ? roleColors.dark : roleColors.light;
  const defaultColor = isDarkMode ? "text-slate-400" : "text-slate-600";
  
  if (colors[role]) {
    return colors[role];
  }
  
  const lowerRole = role?.toLowerCase() || '';
  for (const [key, value] of Object.entries(colors)) {
    if (lowerRole.includes(key.toLowerCase())) {
      return value;
    }
  }
  
  return defaultColor;
};

// --- 2. STYLED COMPONENTS ---

const BackgroundWrapper = styled.div`
  background-color: ${props => props.$isDarkMode ? '#0f172a' : '#ffffff'};
  min-height: 100vh;
  width: 100%;
  color: ${props => props.$isDarkMode ? '#e2e8f0' : '#1e293b'};
  position: relative;
  transition: background-color 0.3s ease, color 0.3s ease;
`;

const HorizontalTranslateContainer = styled.div.attrs(({ $translateX }) => ({
  style: { transform: `translateX(${$translateX}px)` },
}))`
  position: absolute;
  will-change: transform;
  height: 100vh;
  display: flex;
  align-items: center;
  padding-left: 4vw; 
  @media (min-width: 640px) {
    padding-left: 8vw;
  }
  @media (min-width: 1024px) {
    padding-left: 10vw;
  }
  cursor: grab;
  &:active {
    cursor: grabbing;
  }
`;

// --- 3. HELPER FUNCTIONS ---
const calcDynamicHeight = (objectWidth) => {
  const vw = window.innerWidth;
  const paddingRight = window.innerWidth * 0.2; 
  const viewAllCardWidth = window.innerWidth < 640 ? 244 : 380; 
  return objectWidth - vw + viewAllCardWidth + paddingRight + 500;
};

// --- 4. LOADING SKELETON CARD ---
const SkeletonCard = ({ isDarkMode }) => {
  return (
    <div className={`flex-shrink-0 w-[220px] sm:w-[280px] md:w-[360px] lg:w-[380px] h-[320px] sm:h-[400px] md:h-[460px] lg:h-[480px] rounded-xl sm:rounded-2xl overflow-hidden mx-3 sm:mx-4 shadow-lg border transition-colors duration-300
      ${isDarkMode 
        ? 'bg-slate-800 border-slate-700' 
        : 'bg-white border-slate-100'}`}>
      <div className={`w-full h-full animate-pulse relative transition-colors duration-300
        ${isDarkMode ? 'bg-slate-700' : 'bg-slate-200'}`}>
        <div className={`absolute inset-0 transition-colors duration-300
          ${isDarkMode 
            ? 'bg-gradient-to-t from-slate-800 via-slate-700/40 to-transparent' 
            : 'bg-gradient-to-t from-slate-300 via-slate-200/40 to-transparent'}`} />
        
        <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8">
          <div className={`h-6 sm:h-8 w-3/4 rounded animate-pulse mb-2 transition-colors duration-300
            ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
          <div className={`h-4 sm:h-5 w-1/2 rounded animate-pulse mb-4 transition-colors duration-300
            ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
          <div className={`h-1 w-12 rounded animate-pulse mb-4 transition-colors duration-300
            ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
          <div className="flex gap-2 sm:gap-3">
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full animate-pulse transition-colors duration-300
              ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full animate-pulse transition-colors duration-300
              ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
            <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full animate-pulse transition-colors duration-300
              ${isDarkMode ? 'bg-slate-600' : 'bg-slate-300'}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

// --- 5. MEMBER CARD COMPONENT ---
const MemberCard = ({ data, isDarkMode }) => {
  return (
    <motion.div
      initial={{ y: 80, opacity: 0, scale: 0.95 }} 
      whileInView={{ y: 0, opacity: 1, scale: 1 }} 
      viewport={{ once: true, margin: "0px -80px 0px 0px" }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`relative mt-10 flex-shrink-0 w-[220px] sm:w-[280px] md:w-[360px] lg:w-[380px] h-[320px] sm:h-[400px] md:h-[460px] lg:h-[480px] rounded-xl sm:rounded-2xl overflow-hidden mx-3 sm:mx-4 group shadow-lg hover:shadow-2xl transition-all duration-300 border
        ${isDarkMode 
          ? 'bg-slate-800 border-slate-700 hover:border-slate-600' 
          : 'bg-white border-slate-100 hover:border-slate-200'}`}
    >
      <div className="absolute inset-0 w-full h-full">
        {data.image ? (
          <img 
            src={data.image} 
            alt={data.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 pointer-events-none"
          />
        ) : (
          <div className={`w-full h-full flex items-center justify-center transition-colors duration-300
            ${isDarkMode 
              ? 'bg-gradient-to-br from-slate-700 to-slate-800' 
              : 'bg-gradient-to-br from-slate-200 to-slate-300'}`}>
            <span className={`text-6xl sm:text-8xl font-bold transition-colors duration-300
              ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
              {data.name?.charAt(0)?.toUpperCase() || '?'}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-90" />
      </div>

      <div className="absolute bottom-0 w-full p-4 sm:p-6 md:p-8 flex flex-col justify-end h-full z-10 translate-y-2 sm:translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <div className="mb-2 sm:mb-3 md:mb-4">
          <h3 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-wide mb-0.5 sm:mb-1">{data.name}</h3>
          <p className={`text-xs sm:text-base md:text-lg font-medium tracking-wider uppercase ${data.color}`}>{data.role}</p>
        </div>
        
        <div className="w-8 sm:w-10 md:w-12 h-0.5 sm:h-1 bg-white/30 mb-3 sm:mb-5 md:mb-6 rounded-full group-hover:w-full transition-all duration-500" />

        <div className="flex gap-2 sm:gap-3 md:gap-4 opacity-1 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          {data.linkedin && data.linkedin !== '#' && (
            <a 
              href={data.linkedin} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2.5 md:p-3 border border-white/20 rounded-full hover:bg-blue-500 hover:border-blue-500 hover:text-white transition-all text-white"
            >
              <Linkedin size={14} className="sm:w-5 sm:h-5" />
            </a>
          )}
          {data.github && data.github !== '#' && (
            <a 
              href={data.github} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2.5 md:p-3 border border-white/20 rounded-full hover:bg-white hover:text-black transition-all text-white"
            >
              <Github size={14} className="sm:w-5 sm:h-5" />
            </a>
          )}
          {data.instagram && data.instagram !== '#' && (
            <a 
              href={data.instagram} 
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 sm:p-2.5 md:p-3 border border-white/20 rounded-full hover:bg-pink-500 hover:border-pink-500 hover:text-white transition-all text-white"
            >
              <Instagram size={14} className="sm:w-5 sm:h-5" />
            </a>
          )}
          {(!data.linkedin || data.linkedin === '#') && 
           (!data.github || data.github === '#') && 
           (!data.instagram || data.instagram === '#') && (
            <>
              <div className="p-1.5 sm:p-2.5 md:p-3 border border-white/20 rounded-full text-white/50">
                <Linkedin size={14} className="sm:w-5 sm:h-5" />
              </div>
              <div className="p-1.5 sm:p-2.5 md:p-3 border border-white/20 rounded-full text-white/50">
                <Github size={14} className="sm:w-5 sm:h-5" />
              </div>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ViewAllCard = ({ isDarkMode }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex-shrink-0  w-[220px] sm:w-[280px] md:w-[320px] lg:w-[340px] h-[320px] sm:h-[400px] md:h-[460px] lg:h-[480px] flex items-center justify-center mx-3 sm:mx-4"
    >
      <div 
        className={`w-full mt-10 h-full border-2 border-dashed rounded-xl sm:rounded-2xl flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group
          ${isDarkMode 
            ? 'border-slate-600 bg-slate-800/50 hover:bg-slate-800 hover:border-blue-400 hover:shadow-xl hover:shadow-blue-500/10' 
            : 'border-slate-300 bg-slate-50/50 hover:bg-white hover:border-blue-500 hover:shadow-xl'}`}
        onClick={() => navigate("/members")} 
      >
        <div className={`p-3 sm:p-4 md:p-5 shadow-sm border rounded-full mb-3 sm:mb-4 transition-colors duration-300
          ${isDarkMode 
            ? 'bg-slate-700 border-slate-600 text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-600' 
            : 'bg-white border-slate-100 text-slate-400 group-hover:bg-blue-600 group-hover:text-white'}`}>
          <ArrowRight size={20} className="sm:w-7 sm:h-7 md:w-8 md:h-8" />
        </div>
        <h3 className={`text-sm sm:text-lg md:text-xl font-bold uppercase tracking-widest text-center px-2 transition-colors duration-300
          ${isDarkMode 
            ? 'text-slate-500 group-hover:text-slate-200' 
            : 'text-slate-400 group-hover:text-slate-800'}`}>
          View All <br /> 
          <span className={`group-hover:underline transition-colors duration-300
            ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
            Members
          </span>
        </h3>
      </div>
    </motion.div>
  );
};

// --- 6. EMPTY STATE COMPONENT ---
const EmptyState = ({ isDarkMode }) => {
  return (
    <div className="flex-shrink-0 w-full h-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-colors duration-300
            ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`}
        >
          <Users className={`transition-colors duration-300 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={32} />
        </motion.div>
        <p className={`text-lg font-medium transition-colors duration-300
          ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          No members found
        </p>
        <p className={`text-sm mt-2 transition-colors duration-300
          ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          Check back soon for team updates!
        </p>
      </motion.div>
    </div>
  );
};

// --- 7. ERROR STATE COMPONENT ---
const ErrorState = ({ error, onRetry, isDarkMode }) => {
  return (
    <div className="flex-shrink-0 w-full h-full flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center"
      >
        <div className={`inline-flex items-center justify-center w-20 h-20 rounded-full mb-6 transition-colors duration-300
          ${isDarkMode ? 'bg-red-900/30' : 'bg-red-50'}`}>
          <Users className={`transition-colors duration-300 ${isDarkMode ? 'text-red-400' : 'text-red-400'}`} size={32} />
        </div>
        <p className={`text-lg font-medium transition-colors duration-300
          ${isDarkMode ? 'text-red-400' : 'text-red-500'}`}>
          Failed to load team members
        </p>
        <p className={`text-sm mt-2 transition-colors duration-300
          ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
          {error}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className={`mt-4 px-4 py-2 rounded-lg transition-colors duration-300
              ${isDarkMode 
                ? 'bg-blue-600 text-white hover:bg-blue-500' 
                : 'bg-blue-600 text-white hover:bg-blue-700'}`}
          >
            Try Again
          </button>
        )}
      </motion.div>
    </div>
  );
};

// --- 8. MAIN COMPONENT ---
const TeamHorizontalScroll = () => {
  const { isDarkMode } = useTheme();
  const { selectedYear, selectedYearId, loading: yearLoading } = useYear();
  
  // State for API data
  const [apiMembers, setApiMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // State for auto-scroll animation
  const [autoScrollX, setAutoScrollX] = useState(0);
  const [userScrollOffset, setUserScrollOffset] = useState(0);
  
  const containerRef = useRef(null);
  const objectRef = useRef(null);
  const autoScrollRef = useRef(0);
  const userScrollRef = useRef(0);
  
  // Refs for Swipe/Drag logic
  const isDraggingRef = useRef(false);
  const lastTouchXRef = useRef(0);
  const pausedRef = useRef(false);

  // Fetch members from API
  const fetchMembers = async () => {
    if (!selectedYearId || !selectedYear) {
      console.log('Team.jsx: No selectedYearId or selectedYear, skipping members fetch');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      if (selectedYear.members && Array.isArray(selectedYear.members) && selectedYear.members.length > 0) {
        console.log('Team.jsx: Using members from year object:', selectedYear.members);
        setApiMembers(selectedYear.members);
        setLoading(false);
        return;
      }

      console.log('Team.jsx: Fetching members for yearId:', selectedYearId);
      const data = await publicApi.getMembersByYear(selectedYearId);
      console.log('Team.jsx: Members data received from API:', data);
      setApiMembers(data || []);
    } catch (err) {
      console.error('Team.jsx: Failed to fetch members:', err);
      setError('Failed to load team members. Check console for details.');
      setApiMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, [selectedYearId, selectedYear]);

  // Transform API members to component format
  const members = useMemo(() => {
    console.log('Team.jsx: Transforming', apiMembers.length, 'members');
    const transformed = apiMembers.map((member, index) => ({
      id: member._id || member.id || `member-${index}`,
      name: member.memberName || member.name || "Member",
      role: member.role || member.position || "Member",
      color: getColorForRole(member.role || member.position || "Member", isDarkMode),
      image: publicApi.getImageUrl(member.memberImageKey || member.image || member.imageKey || ""),
      github: member.github || "#",
      linkedin: member.linkedin || "#",
      instagram: member.instagram || "#",
      branch: member.memberBranch || member.branch || "",
      email: member.email || ""
    }));
    console.log('Team.jsx: Displaying ALL', transformed.length, 'members (no filtering)');
    return transformed;
  }, [apiMembers, isDarkMode]);

  // Auto-scrolling slider with infinite loop logic
  useEffect(() => {
    if (members.length === 0) return;
    
    const getCardWidth = () => {
      if (window.innerWidth < 640) return 220 + 24;
      if (window.innerWidth < 768) return 280 + 32;
      if (window.innerWidth < 1024) return 360 + 32;
      return 380 + 32;
    };
    
    const cardWidth = getCardWidth();
    const setWidth = (members.length + 1) * cardWidth;
    const scrollSpeed = 0.5; 
    
    let animationFrameId;
    let currentAutoX = autoScrollRef.current;
    
    const animate = () => {
      if (!pausedRef.current) {
        currentAutoX -= scrollSpeed;
      }
      
      const totalPosition = currentAutoX + userScrollRef.current;
      
      if (Math.abs(totalPosition) >= setWidth) {
        const resetAmount = Math.floor(Math.abs(totalPosition) / setWidth) * setWidth;
        if (totalPosition < 0) {
          currentAutoX += resetAmount;
        } else {
          currentAutoX -= resetAmount;
        }
      } 
      
      autoScrollRef.current = currentAutoX;
      setAutoScrollX(currentAutoX);
      
      if (pausedRef.current) {
        setUserScrollOffset(userScrollRef.current);
      }

      animationFrameId = requestAnimationFrame(animate);
    };
    
    const timeoutId = setTimeout(() => {
      animate();
    }, 100);
    
    return () => {
      clearTimeout(timeoutId);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [members]);

  useEffect(() => {
    autoScrollRef.current = 0;
    userScrollRef.current = 0;
    setAutoScrollX(0);
    setUserScrollOffset(0);
  }, [selectedYearId]);

  // --- SWIPE HANDLERS ---
  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
    pausedRef.current = true;
    lastTouchXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const currentX = e.touches[0].clientX;
    const deltaX = currentX - lastTouchXRef.current;
    
    userScrollRef.current += deltaX * 1.2;
    setUserScrollOffset(userScrollRef.current);
    
    lastTouchXRef.current = currentX;
  };

  const handleTouchEnd = () => {
    isDraggingRef.current = false;
    pausedRef.current = false;
  };

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    pausedRef.current = true;
    lastTouchXRef.current = e.clientX;
  };

  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    
    const currentX = e.clientX;
    const deltaX = currentX - lastTouchXRef.current;
    
    userScrollRef.current += deltaX * 1.2;
    setUserScrollOffset(userScrollRef.current);
    
    lastTouchXRef.current = currentX;
  };

  const handleMouseUp = () => {
    isDraggingRef.current = false;
    pausedRef.current = false;
  };

  const handleMouseLeave = () => {
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      pausedRef.current = false;
    }
  };

  const isLoading = yearLoading || loading;

  return (
    <BackgroundWrapper $isDarkMode={isDarkMode}>
      <div id="team" style={{ height: '100vh', position: 'relative', width: '100%' }}>
        <div 
          style={{ position: 'sticky', top: 0, height: '100vh', width: '100%', overflow: 'hidden' }} 
          ref={containerRef}
        >
          {/* Header */}
          <motion.div 
            className="absolute top-[8%] sm:top-[10%] left-0 w-full text-center z-20 pointer-events-none px-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className={`font-bold tracking-widest uppercase mb-1 sm:mb-2 text-[10px] sm:text-sm transition-colors duration-300
              ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
              Our Experts
            </h2>
            <h1 className={`font-sans text-2xl sm:text-3xl md:text-5xl lg:text-7xl font-extrabold tracking-tight transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              Meet the <span className="relative whitespace-nowrap">
                <span className="relative z-10">Team</span>
                <span className={`absolute bottom-1 sm:bottom-2 left-0 w-full h-1.5 sm:h-3 md:h-4 -z-10 hidden sm:block transition-colors duration-300
                  ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}></span>
              </span>
            </h1>
            
            {selectedYear && !isLoading && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`mt-2 sm:mt-4 text-sm sm:text-base transition-colors duration-300
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
              >
                <span className={`font-semibold transition-colors duration-300
                  ${isDarkMode ? 'text-slate-200' : 'text-slate-700'}`}>
                  {selectedYear.year}
                </span> Tenure
              </motion.p>
            )}
          </motion.div>

          {/* Content */}
          {isLoading ? (
            <HorizontalTranslateContainer $translateX={0} ref={objectRef}>
              {[1, 2, 3, 4, 5].map((i) => (
                <SkeletonCard key={i} isDarkMode={isDarkMode} />
              ))}
            </HorizontalTranslateContainer>
          ) : error ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ErrorState error={error} onRetry={fetchMembers} isDarkMode={isDarkMode} />
            </div>
          ) : members.length === 0 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <EmptyState isDarkMode={isDarkMode} />
            </div>
          ) : (
            <HorizontalTranslateContainer 
              $translateX={autoScrollX + userScrollOffset} 
              ref={objectRef}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseLeave}
            >
              {members.map((member) => (
                <MemberCard key={member.id} data={member} isDarkMode={isDarkMode} />
              ))}
              <ViewAllCard key="view-all" isDarkMode={isDarkMode} />
              {members.map((member) => (
                <MemberCard key={`duplicate-${member.id}`} data={member} isDarkMode={isDarkMode} />
              ))}
              <ViewAllCard key="duplicate-view-all" isDarkMode={isDarkMode} />
            </HorizontalTranslateContainer>
          )}
        </div>
      </div>
    </BackgroundWrapper>
  );
};

export default TeamHorizontalScroll;