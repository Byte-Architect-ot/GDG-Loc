import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight, Calendar, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const EASE_OUT_EXPO = "easeOut";

export default function TimelineSection({
  data,
  index,
  totalEvents,
  onInView,
  isMobile,
  isDarkMode
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isInView) onInView?.();
  }, [isInView, onInView]);

  const slideLeft = {
    hidden: { opacity: 0, x: -48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.1 } }
  };

  const slideRight = {
    hidden: { opacity: 0, x: 48 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.75, ease: EASE_OUT_EXPO, delay: 0.25 } }
  };

  const imageVariants = isEven ? slideLeft : slideRight;
  const textVariants = isEven ? slideRight : slideLeft;

  const handleEventClick = () => {
    navigate(`/Details/${data.id}`);
  };

  const gradientColor = data.theme?.gradient || "from-blue-600 to-cyan-500";
  const textColor = data.theme?.text_accent || "text-blue-600";

  return (
    <motion.div
      ref={ref}
      className={`relative w-full flex flex-col items-start gap-10 md:gap-0 md:justify-between ${
        isEven ? "md:flex-row" : "md:flex-row-reverse"
      } md:items-center`}
    >
      {/* ── IMAGE SIDE (Simple Thumbnail) ── */}
      <motion.div
        className="w-full md:w-[46%] pl-10 sm:pl-14 md:pl-0"
        variants={imageVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div 
          onClick={handleEventClick}
          className={`relative w-full rounded-2xl overflow-hidden cursor-pointer border transition-all duration-300 ${
            isDarkMode ? 'border-slate-800 bg-slate-900/50 hover:border-slate-600' : 'border-slate-200 bg-white hover:border-slate-300'
          }`}
          style={{ height: isMobile ? "240px" : "320px" }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {data.img ? (
            <motion.img
              src={data.img}
              alt={data.title}
              loading="lazy"
              className="w-full h-full object-cover"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.4 }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-slate-100 dark:bg-slate-800/50">
              <Calendar size={48} className="text-slate-400 dark:text-slate-600" />
            </div>
          )}

          {/* Simple subtle gradient overlay to make text readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80" />

          {/* Simple Date Badge */}
          <div className="absolute top-4 left-4 z-10 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/20">
            <span className="text-white text-xs font-bold tracking-wider uppercase">
              {data.year}
            </span>
          </div>

          {/* Action button overlay */}
          <motion.div 
            className="absolute bottom-4 right-4 z-10 bg-white dark:bg-slate-900 rounded-full p-2 shadow-lg"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: isHovered ? 1 : 0, scale: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <ArrowUpRight size={18} className={isDarkMode ? 'text-white' : 'text-slate-900'} />
          </motion.div>
        </div>
      </motion.div>

      {/* ── CENTER TIMELINE NODE ── */}
      <div className="absolute left-4 sm:left-6 md:left-1/2 top-1/2 -translate-y-1/2 md:-translate-x-1/2 z-20">
        <motion.div
          className="relative"
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.45, delay: 0.3, type: "spring", bounce: 0.45 }}
        >
          {/* Core dot */}
          <div className={`w-4 h-4 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 border-2 sm:border-[3px] shadow-sm z-10 relative ${
            isDarkMode ? 'border-blue-500' : 'border-blue-500'
          }`}>
            <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${isDarkMode ? 'bg-blue-400' : 'bg-blue-600'}`} />
          </div>
        </motion.div>

        {/* Connector line */}
        <motion.div
          className={`hidden md:block absolute top-1/2 h-px -translate-y-1/2 ${
            isEven ? "right-full mr-3" : "left-full ml-3"
          }`}
          initial={{ width: 0 }}
          animate={isInView ? { width: "3.5rem" } : {}}
          transition={{ duration: 0.45, delay: 0.42 }}
          style={{ background: isDarkMode ? '#334155' : '#cbd5e1' }}
        />
      </div>

      {/* ── TEXT SIDE ── */}
      <motion.div
        className="w-full md:w-[46%] pl-10 sm:pl-14 md:pl-0 md:px-8"
        variants={textVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="max-w-md">
          {/* Tag pill */}
          <motion.div
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.38, duration: 0.5 }}
          >
            <span className={`text-xs font-bold tracking-widest uppercase ${textColor}`}>
              {data.tag}
            </span>
            <div className={`flex-1 h-px max-w-[36px] ${isDarkMode ? 'bg-slate-700' : 'bg-slate-300'}`} />
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 16 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.44, duration: 0.62, ease: EASE_OUT_EXPO }}
            className={`text-2xl sm:text-3xl font-bold mb-3 leading-tight ${
              isDarkMode ? 'text-white' : 'text-slate-900'
            }`}
          >
            {data.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.54, duration: 0.58 }}
            className={`text-sm sm:text-base leading-relaxed mb-6 ${
              isDarkMode ? 'text-slate-400' : 'text-slate-600'
            }`}
          >
            {data.description && data.description.length > 185
              ? `${data.description.slice(0, 185)}…`
              : data.description || "Join us for an exciting event!"}
          </motion.p>

          {/* Date */}
          <motion.div
            className={`flex items-center gap-2 mb-6 ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.62, duration: 0.5 }}
          >
            <Calendar size={14} />
            <span className="text-sm font-medium">{data.stats?.value || data.date}</span>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className={`group flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-colors border-2 ${
              isDarkMode 
                ? 'border-slate-700 hover:border-slate-500 text-slate-300' 
                : 'border-slate-200 hover:border-slate-400 text-slate-700'
            }`}
            onClick={handleEventClick}
            initial={{ opacity: 0, y: 8 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.5 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Explore Event</span>
            <ChevronRight
              size={16}
              className="group-hover:translate-x-1 transition-transform"
            />
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
