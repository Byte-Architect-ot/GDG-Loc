import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Instagram, X, Mail, MapPin, Users, ChevronDown } from "lucide-react";
import Footer from './Footer';
import Header from './Header';
import { useYear } from '../contexts/YearContext';
import { useTheme } from '../contexts/ThemeContext';
import { publicApi } from '../api/publicApi';

const getImageUrl = (imageKey) => publicApi.getImageUrl(imageKey);

// --- GLOBAL STYLES ---
const GlobalStyles = ({ isDarkMode }) => (
  <style>
    {`
      @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
      body { 
        font-family: 'Plus Jakarta Sans', sans-serif; 
        transition: background-color 0.3s ease;
      }
      #team-page::-webkit-scrollbar { width: 6px; }
      #team-page::-webkit-scrollbar-thumb { 
        background: ${isDarkMode ? '#475569' : '#cbd5e1'}; 
        border-radius: 10px; 
      }
    `}
  </style>
);

// Color themes - Different for dark/light mode
const DARK_THEMES = [
  { glow: "shadow-violet-500/30", text: "text-violet-400", bg: "bg-violet-500", border: "border-violet-500/30" },
  { glow: "shadow-cyan-500/30", text: "text-cyan-400", bg: "bg-cyan-500", border: "border-cyan-500/30" },
  { glow: "shadow-amber-500/30", text: "text-amber-400", bg: "bg-amber-500", border: "border-amber-500/30" },
  { glow: "shadow-rose-500/30", text: "text-rose-400", bg: "bg-rose-500", border: "border-rose-500/30" },
  { glow: "shadow-emerald-500/30", text: "text-emerald-400", bg: "bg-emerald-500", border: "border-emerald-500/30" },
  { glow: "shadow-blue-500/30", text: "text-blue-400", bg: "bg-blue-500", border: "border-blue-500/30" },
];

const LIGHT_THEMES = [
  { glow: "shadow-violet-200", text: "text-violet-600", bg: "bg-violet-500", border: "border-violet-200" },
  { glow: "shadow-cyan-200", text: "text-cyan-600", bg: "bg-cyan-500", border: "border-cyan-200" },
  { glow: "shadow-amber-200", text: "text-amber-600", bg: "bg-amber-500", border: "border-amber-200" },
  { glow: "shadow-rose-200", text: "text-rose-600", bg: "bg-rose-500", border: "border-rose-200" },
  { glow: "shadow-emerald-200", text: "text-emerald-600", bg: "bg-emerald-500", border: "border-emerald-200" },
  { glow: "shadow-blue-200", text: "text-blue-600", bg: "bg-blue-500", border: "border-blue-200" },
];

const getTheme = (index, isDark) => {
  const themes = isDark ? DARK_THEMES : LIGHT_THEMES;
  return themes[index % themes.length];
};

// --- MEMBER CARD ---
const MemberCard = ({ member, theme, onClick, isExpanded, isDarkMode }) => {
  const cardRef = useRef(null);

  return (
    <div ref={cardRef} className="relative">
      <motion.div
        layoutId={`card-${member.id}`}
        onClick={() => !isExpanded && onClick(member, cardRef)}
        whileHover={!isExpanded ? { y: -8, scale: 1.02 } : {}}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`
          relative cursor-pointer rounded-2xl sm:rounded-3xl overflow-hidden
          ${isDarkMode
            ? 'bg-slate-900/80 border border-slate-700/50'
            : 'bg-white border border-slate-200'
          }
          ${!isExpanded ? `shadow-lg hover:shadow-2xl ${theme.glow}` : ''}
          transition-shadow duration-300
        `}
      >
        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden relative">
          {member.image ? (
            <img
              src={`${API_BASE_URL}/uploads/${member.image}`} alt={member.name}
              className={`
                w-full h-full object-cover transition-all duration-500
                ${isDarkMode ? 'group-hover:brightness-110' : ''}
              `}
            />
          ) : (
            <div className={`
              w-full h-full flex items-center justify-center
              ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}
            `}>
              <span className={`
                text-4xl sm:text-5xl md:text-6xl font-bold
                ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}
              `}>
                {member.name?.charAt(0) || '?'}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className={`
            absolute inset-0 
            ${isDarkMode
              ? 'bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent'
              : 'bg-gradient-to-t from-black/60 via-transparent to-transparent'
            }
          `} />
        </div>

        {/* Info */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-5">
          <div className={`w-6 sm:w-8 h-1 rounded-full ${theme.bg} mb-2 sm:mb-3`} />
          <h3 className={`
            text-sm sm:text-base md:text-lg font-bold truncate
            ${isDarkMode ? 'text-white' : 'text-white'}
          `}>
            {member.name}
          </h3>
          <p className={`
            text-xs sm:text-sm font-medium truncate
            ${isDarkMode ? 'text-slate-400' : 'text-white/70'}
          `}>
            {member.role}
          </p>
        </div>

        {/* Click indicator */}
        <div className={`
          absolute top-3 right-3 sm:top-4 sm:right-4
          p-1.5 sm:p-2 rounded-full 
          ${isDarkMode ? 'bg-white/10' : 'bg-black/20'}
          backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity
        `}>
          <ChevronDown size={14} className="text-white" />
        </div>
      </motion.div>
    </div>
  );
};

// --- EXPANDED DETAIL (In-place) ---
const ExpandedDetail = ({ member, theme, onClose, isDarkMode }) => {
  // Close on escape
  useEffect(() => {
    const handleEscape = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className={`
          absolute inset-0 cursor-pointer
          ${isDarkMode ? 'bg-slate-950/90' : 'bg-black/60'}
          backdrop-blur-md
        `}
      />

      {/* Detail Card */}
      <motion.div
        layoutId={`card-${member.id}`}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className={`
          relative w-full max-w-[280px] sm:max-w-[320px] z-10
          ${isDarkMode
            ? 'bg-slate-900 border border-slate-700'
            : 'bg-white border border-slate-200'
          }
          rounded-3xl overflow-hidden shadow-2xl
        `}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`
            absolute top-4 right-4 z-20 p-2.5 rounded-full
            ${isDarkMode
              ? 'bg-slate-800 hover:bg-slate-700 text-white'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
            }
            transition-colors
          `}
        >
          <X size={18} />
        </button>

        {/* Image */}
        <div className="aspect-[3/4] overflow-hidden relative">
          {member.image ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className={`
              w-full h-full flex items-center justify-center
              ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}
            `}>
              <span className={`
                text-8xl font-bold
                ${isDarkMode ? 'text-slate-700' : 'text-slate-300'}
              `}>
                {member.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
          <div className={`
            absolute inset-0 
            ${isDarkMode
              ? 'bg-gradient-to-t from-slate-900 via-transparent to-transparent'
              : 'bg-gradient-to-t from-white via-transparent to-transparent'
            }
          `} />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 -mt-12 relative z-10">
          {/* Role Badge */}
          <span className={`
            inline-block px-3 py-1 rounded-full text-xs sm:text-sm font-semibold mb-3
            ${theme.bg} text-white
          `}>
            {member.role}
          </span>

          {/* Name */}
          <h2 className={`
            text-2xl sm:text-3xl font-extrabold mb-4
            ${isDarkMode ? 'text-white' : 'text-slate-900'}
          `}>
            {member.name}
          </h2>

          {/* Info */}
          <div className="space-y-3 mb-6">
            {member.branch && (
              <div className={`
                flex items-center gap-3
                ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
              `}>
                <MapPin size={18} className={theme.text} />
                <span className="text-sm sm:text-base">{member.branch}</span>
              </div>
            )}
            {member.email && member.email !== '#' && (
              <div className={`
                flex items-center gap-3
                ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
              `}>
                <Mail size={18} className={theme.text} />
                <span className="text-sm sm:text-base break-all">{member.email}</span>
              </div>
            )}
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap gap-3">
            {member.linkedin && member.linkedin !== '#' && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                  bg-[#0077b5] text-white hover:bg-[#006396] transition-colors
                `}
              >
                <Linkedin size={18} />
                <span className="hidden sm:inline">LinkedIn</span>
              </a>
            )}
            {member.github && member.github !== '#' && (
              <a
                href={member.github}
                target="_blank"
                rel="noreferrer"
                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm
                  ${isDarkMode
                    ? 'bg-slate-700 text-white hover:bg-slate-600'
                    : 'bg-slate-800 text-white hover:bg-slate-700'
                  }
                  transition-colors
                `}
              >
                <Github size={18} />
                <span className="hidden sm:inline">GitHub</span>
              </a>
            )}
            {member.instagram && member.instagram !== '#' && (
              <a
                href={member.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                <Instagram size={18} />
                <span className="hidden sm:inline">Instagram</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

// --- SECTION HEADER ---
const SectionHeader = ({ title, count, theme, isDarkMode }) => (
  <div className="flex items-center gap-4 sm:gap-6 mb-6 sm:mb-8 md:mb-10">
    <div className={`w-1.5 h-8 sm:h-10 rounded-full ${theme.bg}`} />
    <h2 className={`
      text-xl sm:text-2xl md:text-3xl font-bold whitespace-nowrap
      ${isDarkMode ? 'text-white' : 'text-slate-900'}
    `}>
      {title}
    </h2>
    <div className={`
      h-px flex-1 
      ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}
    `} />
    <span className={`
      text-xs sm:text-sm font-mono px-2 py-1 rounded-md
      ${isDarkMode
        ? `bg-slate-800 ${theme.text}`
        : `bg-slate-100 ${theme.text}`
      }
    `}>
      {count}
    </span>
  </div>
);

// --- LOADING SKELETON ---
const SkeletonCard = ({ isDarkMode }) => (
  <div className={`
    aspect-[3/4] rounded-2xl sm:rounded-3xl overflow-hidden animate-pulse
    ${isDarkMode ? 'bg-slate-800' : 'bg-slate-200'}
  `}>
    <div className="h-full flex flex-col justify-end p-4">
      <div className={`h-3 w-16 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} mb-2`} />
      <div className={`h-5 w-3/4 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'} mb-2`} />
      <div className={`h-4 w-1/2 rounded ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
    </div>
  </div>
);

// --- EMPTY STATE ---
const EmptyState = ({ isDarkMode }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="py-20 text-center"
  >
    <div className={`
      inline-flex items-center justify-center w-20 h-20 rounded-full mb-6
      ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}
    `}>
      <Users size={32} className={isDarkMode ? 'text-slate-600' : 'text-slate-400'} />
    </div>
    <h3 className={`
      text-xl font-semibold mb-2
      ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
    `}>
      No members found
    </h3>
    <p className={isDarkMode ? 'text-slate-500' : 'text-slate-500'}>
      Team information will be updated soon.
    </p>
  </motion.div>
);

// --- MAIN PAGE ---
export default function Team() {
  const { isDarkMode } = useTheme();
  const { selectedYear, selectedYearId, loading: yearLoading } = useYear();
  const [apiMembers, setApiMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState(null);

  // Handle scroll offset on page load
  useEffect(() => {
    // Wait for header to be rendered and then apply scroll offset
    const applyScrollOffset = () => {
      const header = document.querySelector('header');
      if (header) {
        const headerHeight = header.offsetHeight;
        // Apply scroll offset to account for fixed header with extra padding
        window.scrollTo({
          top: headerHeight + 20,
          behavior: 'smooth'
        });
      }
    };

    // Wait for route change to complete and DOM to be ready
    requestAnimationFrame(() => {
      setTimeout(applyScrollOffset, 150);
    });
  }, []);

  useEffect(() => {
    const fetchMembers = async () => {
      if (!selectedYearId) return;
      setLoading(true);
      try {
        const data = await publicApi.getMembersByYear(selectedYearId);
        setApiMembers(data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, [selectedYearId]);

  // Grouping logic
  const groupedData = useMemo(() => {
    const groups = {};
    apiMembers.forEach((m) => {
      const role = m.role || "Member";
      if (!groups[role]) groups[role] = [];
      groups[role].push({
        id: m._id || m.id,
        name: m.memberName || m.name,
        role: role,
        priority: m.priority !== undefined ? m.priority : 99,
        image: getImageUrl(m.memberImageKey || m.image),
        github: m.github,
        linkedin: m.linkedin,
        instagram: m.instagram,
        branch: m.memberBranch,
        email: m.email
      });
    });

    // Sort members within each group by priority
    Object.keys(groups).forEach(role => {
      groups[role].sort((a, b) => a.priority - b.priority);
    });

    return groups;
  }, [apiMembers]);

  const roles = Object.keys(groupedData).sort((a, b) => {
    // Determine the minimum priority for each role group
    const minPriorityA = Math.min(...groupedData[a].map(m => m.priority));
    const minPriorityB = Math.min(...groupedData[b].map(m => m.priority));

    // Sort by priority first, then alphabetically by role name if priority is same
    if (minPriorityA !== minPriorityB) {
      return minPriorityA - minPriorityB;
    }
    return a.localeCompare(b);
  });

  const handleCardClick = (member) => {
    setSelectedMember(member);
    const roleIndex = roles.indexOf(member.role);
    setSelectedTheme(getTheme(roleIndex >= 0 ? roleIndex : 0, isDarkMode));
  };

  const isLoading = loading || yearLoading;

  return (
    <div
      id="team-page"
      className={`
        min-h-screen transition-colors duration-300
        ${isDarkMode
          ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950'
          : 'bg-gradient-to-b from-slate-50 via-white to-slate-100'
        }
      `}
    >
      <GlobalStyles isDarkMode={isDarkMode} />
      <Header />

      {/* Hero Section */}
      <section className="pt-24 sm:pt-28 md:pt-32 pb-12 sm:pb-16 md:pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Glow */}
        <div className={`
          absolute top-0 left-1/2 -translate-x-1/2 w-[600px] sm:w-[800px] md:w-[1000px] h-[300px] sm:h-[400px]
          ${isDarkMode ? 'bg-violet-600/10' : 'bg-violet-500/5'}
          blur-[100px] sm:blur-[120px] rounded-full -z-10
        `} />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Year Badge */}
          {selectedYear && (
            <div className={`
              inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full mb-4 sm:mb-6
              text-xs sm:text-sm font-semibold
              ${isDarkMode
                ? 'bg-violet-500/20 text-violet-400 border border-violet-500/30'
                : 'bg-violet-100 text-violet-600 border border-violet-200'
              }
            `}>
              <Users size={14} className="sm:w-4 sm:h-4" />
              <span>TENURE {selectedYear.year}</span>
            </div>
          )}

          <h1 className={`
            text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-4 sm:mb-6
            ${isDarkMode ? 'text-white' : 'text-slate-900'}
          `}>
            Meet Our{' '}
            <span className={isDarkMode ? 'text-violet-400' : 'text-violet-600'}>
              Team
            </span>
          </h1>

          <p className={`
            text-base sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed
            ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}
          `}>
            The passionate individuals driving innovation and excellence in our club.
          </p>
        </motion.div>
      </section>

      {/* Team Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24 md:pb-32">
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
            {[...Array(10)].map((_, i) => (
              <SkeletonCard key={i} isDarkMode={isDarkMode} />
            ))}
          </div>
        ) : roles.length > 0 ? (
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {roles.map((role, rIdx) => {
              const theme = getTheme(rIdx, isDarkMode);
              const members = groupedData[role];

              return (
                <motion.section
                  key={role}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: rIdx * 0.1 }}
                >
                  <SectionHeader
                    title={role}
                    count={members?.length}
                    theme={theme}
                    isDarkMode={isDarkMode}
                  />

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-6">
                    {members.map((member) => (
                      <MemberCard
                        key={member.id}
                        member={member}
                        theme={theme}
                        onClick={handleCardClick}
                        isDarkMode={isDarkMode}
                      />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </div>
        ) : (
          <EmptyState isDarkMode={isDarkMode} />
        )}
      </main>

      {/* Expanded Detail Modal */}
      <AnimatePresence>
        {selectedMember && selectedTheme && (
          <ExpandedDetail
            member={selectedMember}
            theme={selectedTheme}
            onClose={() => setSelectedMember(null)}
            isDarkMode={isDarkMode}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}