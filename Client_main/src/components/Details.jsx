import React, { useState, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { useParams } from "react-router-dom";
import { publicApi } from '../api/publicApi';
import { useTheme } from '../contexts/ThemeContext';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Share2, 
  ArrowLeft, 
  CheckCircle, 
  User,
  ExternalLink,
  Linkedin,
  Twitter,
  Instagram,
  Users,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Zap,
  Target,
  Award,
  MessageCircle,
  Heart,
  Globe
} from "lucide-react";

// --- 1. STATIC DEFAULT DATA FOR A SINGLE EVENT (used as fallback) ---
const defaultEventData = {
  title: "AI & Cloud Summit 2025",
  tagline: "Explore the future of Generative AI and Cloud Computing with industry leaders",
  category: "Flagship Event",
  date: "March 15, 2025",
  time: "10:00 AM - 4:00 PM",
  location: "Walchand College of Engineering, Sangli",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
  price: "Free",
  seats: "Seats Filling Fast!",
  totalSeats: 500,
  registeredSeats: 423,
  description: [
    "Join us for our biggest annual event featuring speakers from Google, industry experts, and hands-on cloud labs. This summit is designed to bridge the gap between academic learning and industry expectations.",
    "Whether you are a beginner looking to understand the basics of Cloud or an advanced developer wanting to deep dive into LLMs, this event has something for everyone."
  ],
  highlights: [
    { icon: "Zap", title: "Live Demos", desc: "Real-time AI demonstrations" },
    { icon: "Users", title: "500+ Attendees", desc: "Connect with peers" },
    { icon: "Award", title: "Certificates", desc: "For all participants" },
    { icon: "Target", title: "Hands-on Labs", desc: "Practical experience" },
  ],
  takeaways: [
    "Hands-on experience with Google Cloud Platform",
    "Understanding LLMs and RAG Architecture",
    "Networking with Industry Experts",
    "Exclusive Swags and Certificates",
    "Career guidance from tech leaders",
    "Access to exclusive resources"
  ],
  agenda: [
    { time: "10:00 AM", title: "Keynote & Kickoff", speaker: "Alex Chen", duration: "1h 30m" },
    { time: "11:30 AM", title: "Deep Dive into GenAI", speaker: "Dr. Sarah Miller", duration: "1h 30m" },
    { time: "01:00 PM", title: "Networking Lunch", speaker: "All Attendees", duration: "1h" },
    { time: "02:00 PM", title: "Hands-on Cloud Lab", speaker: "GDG Tech Team", duration: "2h" },
  ],
  speakers: [
    { name: "Dr. Sarah Miller", role: "Lead", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80", linkedin: "#", twitter: "#" },
    { name: "Alex Chen", role: "Co Lead", img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80", linkedin: "#", twitter: "#" },
    { name: "Priya Patel", role: "Secretary", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80", linkedin: "#", twitter: "#" },
  ],
  faqs: [
    { q: "Is this event free?", a: "Yes! This event is completely free for all students and professionals." },
    { q: "Will I get a certificate?", a: "Yes, all participants who attend the full event will receive a certificate of participation." },
    { q: "What should I bring?", a: "Just bring your laptop and enthusiasm! We'll provide everything else." },
  ]
};

// --- 2. COMPONENTS ---

// Countdown Timer
const CountdownTimer = ({ targetDate, isDarkMode }) => {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBox = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className={`font-bold text-lg sm:text-2xl w-12 h-12 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-br from-slate-700 to-slate-800 text-white' 
          : 'bg-gradient-to-br from-slate-900 to-slate-800 text-white'}`}>
        {String(value).padStart(2, '0')}
      </div>
      <span className={`text-[10px] sm:text-xs mt-1 uppercase tracking-wider transition-colors duration-300
        ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{label}</span>
    </div>
  );

  return (
    <div className="flex gap-2 sm:gap-3 justify-center">
      <TimeBox value={timeLeft.days} label="Days" />
      <span className={`text-2xl font-bold self-start mt-3 transition-colors duration-300
        ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>:</span>
      <TimeBox value={timeLeft.hours} label="Hours" />
      <span className={`text-2xl font-bold self-start mt-3 transition-colors duration-300
        ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>:</span>
      <TimeBox value={timeLeft.minutes} label="Mins" />
      <span className={`text-2xl font-bold self-start mt-3 transition-colors duration-300
        ${isDarkMode ? 'text-slate-600' : 'text-slate-300'}`}>:</span>
      <TimeBox value={timeLeft.seconds} label="Secs" />
    </div>
  );
};

// Badge Component
const Badge = ({ children, variant = "default", isMobile = false, isDarkMode = false }) => {
  const variants = {
    default: isDarkMode 
      ? "bg-blue-900/50 text-blue-300 border-blue-700" 
      : "bg-blue-50 text-blue-700 border-blue-200",
    success: isDarkMode 
      ? "bg-emerald-900/50 text-emerald-300 border-emerald-700" 
      : "bg-emerald-50 text-emerald-700 border-emerald-200",
    premium: isDarkMode 
      ? "bg-gradient-to-r from-amber-900/50 to-orange-900/50 text-amber-300 border-amber-700" 
      : "bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 border-amber-200",
    live: isDarkMode 
      ? "bg-red-900/50 text-red-300 border-red-700" 
      : "bg-red-50 text-red-600 border-red-200"
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider border transition-colors duration-300 ${variants[variant]}`}>
      {variant === "live" && <span className={`w-2 h-2 bg-red-500 rounded-full ${isMobile ? '' : 'animate-pulse'}`} />}
      {children}
    </span>
  );
};

// Share Modal
const ShareModal = ({ isOpen, onClose, isMobile = false, isDarkMode = false }) => {
  const [copied, setCopied] = useState(false);
  const shareUrl = window.location.href;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className={`fixed inset-0 z-50 flex items-center justify-center p-4
          ${isDarkMode ? 'bg-black/70' : 'bg-black/50'}
          ${isMobile ? '' : 'backdrop-blur-sm'}`}
        onClick={onClose}
      >
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`rounded-2xl p-6 max-w-md w-full shadow-2xl transition-colors duration-300
            ${isDarkMode ? 'bg-slate-800' : 'bg-white'}`}
          onClick={e => e.stopPropagation()}
        >
          <h3 className={`text-xl font-bold mb-4 transition-colors duration-300
            ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Share this event</h3>
          
          <div className="flex gap-3 mb-6">
            {[
              { icon: Twitter, color: "bg-sky-500", label: "Twitter" },
              { icon: Linkedin, color: "bg-blue-600", label: "LinkedIn" },
              { icon: MessageCircle, color: "bg-green-500", label: "WhatsApp" },
            ].map((social, i) => (
              <button 
                key={i}
                className={`${social.color} text-white p-3 rounded-xl hover:opacity-90 transition-opacity flex-1 flex items-center justify-center gap-2`}
              >
                <social.icon size={20} />
              </button>
            ))}
          </div>

          <div className="flex gap-2">
            <input 
              type="text" 
              value={shareUrl} 
              readOnly 
              className={`flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-slate-700 text-slate-300' 
                  : 'bg-slate-100 text-slate-600'}`}
            />
            <button 
              onClick={handleCopy}
              className={`px-4 py-3 rounded-xl transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-slate-700 text-white hover:bg-slate-600' 
                  : 'bg-slate-900 text-white hover:bg-slate-800'}`}
            >
              {copied ? <Check size={20} /> : <Copy size={20} />}
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// FAQ Accordion
const FAQItem = ({ question, answer, isOpen, onClick, isDarkMode }) => (
  <div className={`border rounded-xl overflow-hidden transition-colors duration-300
    ${isDarkMode 
      ? 'border-slate-700 hover:border-blue-800' 
      : 'border-slate-200 hover:border-blue-200'}`}>
    <button 
      onClick={onClick}
      className={`w-full flex items-center justify-between p-4 sm:p-5 text-left transition-colors duration-300
        ${isDarkMode 
          ? 'bg-slate-800 hover:bg-slate-750' 
          : 'bg-white hover:bg-slate-50'}`}
    >
      <span className={`font-semibold pr-4 transition-colors duration-300
        ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{question}</span>
      {isOpen 
        ? <ChevronUp className="text-blue-500 shrink-0" size={20} /> 
        : <ChevronDown className={`shrink-0 transition-colors duration-300 ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`} size={20} />}
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.15 }}
          className="overflow-hidden"
        >
          <p className={`p-4 sm:p-5 pt-0 leading-relaxed transition-colors duration-300
            ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>{answer}</p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

// The Sidebar Sticky Card
const RegistrationCard = ({ eventData, prefersReducedMotion, isMobile, isDarkMode }) => {
  const percentage = Math.round((eventData.registeredSeats / eventData.totalSeats) * 100);
  
  return (
    <motion.div 
      initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: prefersReducedMotion || isMobile ? 0 : 0.3, duration: prefersReducedMotion || isMobile ? 0.2 : 0.4 }}
      className={`border rounded-2xl sm:rounded-3xl p-5 sm:p-6 shadow-xl sticky top-20 sm:top-24 transition-colors duration-300
        ${isDarkMode 
          ? 'bg-slate-800/90 backdrop-blur-xl border-slate-700 shadow-slate-900/50' 
          : 'bg-white/80 backdrop-blur-xl border-slate-200/80 shadow-slate-200/50'}`}
    >
      {/* Price Tag */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className={`text-3xl sm:text-4xl font-extrabold transition-colors duration-300
            ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Free</span>
        </div>
        <Badge variant="success" isMobile={isMobile} isDarkMode={isDarkMode}>Limited Time</Badge>
      </div>

      {/* Countdown */}
      <div className={`rounded-xl p-4 mb-6 transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-br from-slate-700 to-slate-800' 
          : 'bg-gradient-to-br from-slate-50 to-slate-100'}`}>
        <p className={`text-center text-sm font-2xl mb-3 transition-colors duration-300
          ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>Registration closes in</p>
        <CountdownTimer targetDate="2026-03-14" isDarkMode={isDarkMode} />
      </div>
      
      <div className="space-y-4 mb-6">
        <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors duration-300
          ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <div className={`p-2 rounded-lg transition-colors duration-300
            ${isDarkMode ? 'bg-blue-900/50' : 'bg-blue-100'}`}>
            <Calendar className="text-blue-500" size={18} />
          </div>
          <div>
            <p className={`font-semibold text-sm transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{eventData.date}</p>
            <p className={`text-xs transition-colors duration-300
              ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{eventData.time}</p>
          </div>
        </div>
        <div className={`flex items-start gap-3 p-3 rounded-xl transition-colors duration-300
          ${isDarkMode ? 'bg-slate-700/50' : 'bg-slate-50'}`}>
          <div className={`p-2 rounded-lg transition-colors duration-300
            ${isDarkMode ? 'bg-emerald-900/50' : 'bg-emerald-100'}`}>
            <MapPin className="text-emerald-500" size={18} />
          </div>
          <div>
            <p className={`font-semibold text-sm transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Venue</p>
            <p className={`text-xs transition-colors duration-300
              ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{eventData.location}</p>
          </div>
        </div>
      </div>

      {/* Seat Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span className={`font-medium transition-colors duration-300
            ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>200+ registered</span>
          <span className="text-blue-500 font-bold">Fill Fast!</span>
        </div>
        <div className={`w-full rounded-full h-3 overflow-hidden transition-colors duration-300
          ${isDarkMode ? 'bg-slate-700' : 'bg-slate-100'}`}>
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: prefersReducedMotion || isMobile ? 0.3 : 1, delay: prefersReducedMotion || isMobile ? 0 : 0.5 }}
            className="bg-gradient-to-r from-blue-500 to-violet-500 h-3 rounded-full relative"
          >
            {!isMobile && <span className="absolute right-1 top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse" />}
          </motion.div>
        </div>
        <p className="text-xs text-amber-500 font-medium mt-2 flex items-center gap-1">
          <Sparkles size={12} /> Only Few Spots Left!
        </p>
      </div>

      <motion.button 
        whileHover={prefersReducedMotion || isMobile ? {} : { scale: 1.02 }}
        whileTap={prefersReducedMotion || isMobile ? {} : { scale: 0.98 }}
        className="w-full py-4 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all flex justify-center items-center gap-2 text-base"
      >
        Register Now — It's Free
        <ExternalLink size={18} />
      </motion.button>
      
      <div className={`flex items-center justify-center gap-2 mt-4 text-xs transition-colors duration-300
        ${isDarkMode ? 'text-slate-500' : 'text-slate-400'}`}>
        <CheckCircle size={14} />
        <span>Instant confirmation • No payment required</span>
      </div>

      {/* Social Proof */}
      <div className={`mt-6 pt-6 border-t transition-colors duration-300
        ${isDarkMode ? 'border-slate-700' : 'border-slate-100'}`}>
        <div className="flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1,2,3,4].map(i => (
              <img 
                key={i}
                src={`https://i.pravatar.cc/40?img=${i+10}`}
                alt="Attendee"
                className={`w-8 h-8 rounded-full border-2 transition-colors duration-300
                  ${isDarkMode ? 'border-slate-800' : 'border-white'}`}
              />
            ))}
          </div>
          <p className={`text-xs transition-colors duration-300
            ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            <span className={`font-semibold transition-colors duration-300
              ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>200+ people</span> already registered
          </p>
        </div>
      </div>
    </motion.div>
  );
};

// Highlight Card
const HighlightCard = ({ icon: Icon, title, desc, prefersReducedMotion, isMobile, isDarkMode }) => (
  <motion.div 
    whileHover={prefersReducedMotion || isMobile ? {} : { y: -4 }}
    className={`border rounded-2xl p-5 text-center transition-all duration-300
      ${isDarkMode 
        ? 'bg-slate-800 border-slate-700 hover:shadow-lg hover:shadow-slate-900/50' 
        : 'bg-white border-slate-100 hover:shadow-lg hover:shadow-slate-200/50'}`}
  >
    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 transition-colors duration-300
      ${isDarkMode 
        ? 'bg-gradient-to-br from-blue-900/50 to-violet-900/50' 
        : 'bg-gradient-to-br from-blue-50 to-violet-50'}`}>
      <Icon className="text-blue-500" size={24} />
    </div>
    <h4 className={`font-bold transition-colors duration-300
      ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{title}</h4>
    <p className={`text-sm mt-1 transition-colors duration-300
      ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{desc}</p>
  </motion.div>
);

// Speaker Card
const SpeakerCard = ({ speaker, index, prefersReducedMotion, isMobile, isDarkMode }) => (
  <motion.div 
    initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: prefersReducedMotion || isMobile ? 0 : index * 0.1, duration: prefersReducedMotion || isMobile ? 0.2 : 0.4 }}
    className={`group border rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-1
      ${isDarkMode 
        ? 'bg-slate-800 border-slate-700 hover:shadow-xl hover:shadow-slate-900/50' 
        : 'bg-white border-slate-100 hover:shadow-xl hover:shadow-slate-200/50'}`}
  >
    <div className="relative w-24 h-24 sm:w-28 sm:h-28 mx-auto mb-4">
      {!isMobile && <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-violet-400 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />}
      <img 
        src={speaker.img} 
        alt={speaker.name} 
        className={`w-full h-full object-cover rounded-full border-4 shadow-lg relative z-10 group-hover:scale-105 transition-transform duration-500
          ${isDarkMode ? 'border-slate-700' : 'border-white'}`}
      />
    </div>
    <h4 className={`text-lg font-bold transition-colors duration-300
      ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{speaker.name}</h4>
    <p className="text-blue-500 text-sm font-medium mt-1">{speaker.role}</p>
    <div className="flex justify-center gap-3 mt-4">
      <a href={speaker.linkedin} className={`p-2 rounded-lg transition-colors duration-300
        ${isDarkMode 
          ? 'bg-slate-700 text-slate-400 hover:text-blue-400 hover:bg-blue-900/50' 
          : 'bg-slate-50 text-slate-400 hover:text-blue-600 hover:bg-blue-50'}`}>
        <Linkedin size={16} />
      </a>
      <a href={speaker.twitter} className={`p-2 rounded-lg transition-colors duration-300
        ${isDarkMode 
          ? 'bg-slate-700 text-slate-400 hover:text-sky-400 hover:bg-sky-900/50' 
          : 'bg-slate-50 text-slate-400 hover:text-sky-500 hover:bg-sky-50'}`}>
        <Twitter size={16} />
      </a>
    </div>
  </motion.div>
);

// Agenda Item
const AgendaItem = ({ slot, index, isLast, prefersReducedMotion, isMobile, isDarkMode }) => (
  <motion.div 
    initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: prefersReducedMotion || isMobile ? 0 : index * 0.1, duration: prefersReducedMotion || isMobile ? 0.2 : 0.4 }}
    className="relative flex gap-4 sm:gap-6"
  >
    {/* Timeline */}
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-violet-500 rounded-xl flex items-center justify-center text-white font-bold text-xs shadow-lg shadow-blue-500/30">
        {slot.time.split(' ')[0]}
      </div>
      {!isLast && <div className={`w-0.5 h-full my-2 transition-colors duration-300
        ${isDarkMode 
          ? 'bg-gradient-to-b from-blue-800 to-transparent' 
          : 'bg-gradient-to-b from-blue-200 to-transparent'}`} />}
    </div>
    
    {/* Content */}
    <div className="flex-1 pb-8">
      <div className={`border rounded-xl p-4 transition-all duration-300
        ${isDarkMode 
          ? 'bg-slate-800 border-slate-700 hover:shadow-lg hover:shadow-slate-900/30' 
          : 'bg-white border-slate-100 hover:shadow-lg hover:shadow-slate-100'}`}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h4 className={`font-bold transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>{slot.title}</h4>
            <p className={`text-sm flex items-center gap-1.5 mt-1 transition-colors duration-300
              ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              <User size={14} /> {slot.speaker}
            </p>
          </div>
          <Badge isMobile={isMobile} isDarkMode={isDarkMode}>{slot.duration}</Badge>
        </div>
      </div>
    </div>
  </motion.div>
);

// Mobile CTA
const MobileCTA = ({ eventData, prefersReducedMotion, isMobile, isDarkMode }) => (
  <div className={`fixed bottom-0 left-0 right-0 border-t p-4 lg:hidden z-40 transition-colors duration-300
    ${isDarkMode 
      ? 'bg-slate-900/95 backdrop-blur-lg border-slate-800' 
      : `${isMobile ? 'bg-white' : 'bg-white/90 backdrop-blur-lg'} border-slate-100`}`}>
    <div className="flex items-center gap-3">
      <div className="flex-1">
        <p className={`font-bold transition-colors duration-300
          ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Free Registration</p>
        <p className={`text-xs transition-colors duration-300
          ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>{eventData.totalSeats - eventData.registeredSeats} spots left</p>
      </div>
      <motion.button 
        whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30"
      >
        Register Now
      </motion.button>
    </div>
  </div>
);

// --- 3. MAIN PAGE ---
const EventDetailPage = () => {
  const { isDarkMode } = useTheme();
  const { eventId } = useParams();
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [apiEventData, setApiEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  // Fetch event data from API
  useEffect(() => {
    const fetchEventData = async () => {
      if (!eventId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        console.log('Details.jsx: Fetching event data for eventId:', eventId);
        const data = await publicApi.getEventById(eventId);
        console.log('Details.jsx: Event data received:', data);
        setApiEventData(data);
      } catch (err) {
        console.error('Details.jsx: Failed to fetch event data:', err);
        setApiEventData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, [eventId]);

  // Merge API data with static defaults
  const eventData = React.useMemo(() => {
    if (!apiEventData) {
      return defaultEventData;
    }

    const getImageUrl = (imageKey) => {
      if (!imageKey) return defaultEventData.image;
      if (imageKey.startsWith('http://') || imageKey.startsWith('https://')) {
        return imageKey;
      }
      return publicApi.getImageUrl(imageKey);
    };

    return {
      ...defaultEventData,
      title: apiEventData.eventName || apiEventData.title || defaultEventData.title,
      tagline: apiEventData.eventTagline || apiEventData.tagline || defaultEventData.tagline,
      date: apiEventData.eventDate 
        ? new Date(apiEventData.eventDate).toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })
        : defaultEventData.date,
      image: getImageUrl(apiEventData.eventThumbnailKey || apiEventData.thumbnail || apiEventData.image),
      description: apiEventData.eventInfo || apiEventData.description 
        ? [apiEventData.eventInfo || apiEventData.description]
        : defaultEventData.description,
    };
  }, [apiEventData]);

  // Scroll to top when component mounts
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const iconMap = { Zap, Users, Award, Target };
  
  const fadeInUp = {
    initial: prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: prefersReducedMotion || isMobile ? 0.2 : 0.6 }
  };

  // Show loading state
  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center transition-colors duration-300
        ${isDarkMode ? 'bg-slate-900' : 'bg-white'}`}>
        <div className="text-center">
          <div className={`inline-block animate-spin rounded-full h-12 w-12 border-b-2 mb-4
            ${isDarkMode ? 'border-blue-400' : 'border-blue-600'}`}></div>
          <p className={`transition-colors duration-300
            ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>Loading event details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen transition-colors duration-300
      ${isDarkMode 
        ? 'bg-slate-900' 
        : `${isMobile ? 'bg-white' : 'bg-gradient-to-b from-white via-slate-50/50 to-white'}`}`}>
      
      {/* Decorative Background Elements - Hidden on mobile */}
      {!isMobile && (
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-colors duration-300
            ${isDarkMode 
              ? 'bg-gradient-to-br from-blue-900/20 to-violet-900/20' 
              : 'bg-gradient-to-br from-blue-100/40 to-violet-100/40'}`} />
          <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 transition-colors duration-300
            ${isDarkMode 
              ? 'bg-gradient-to-tr from-emerald-900/20 to-blue-900/20' 
              : 'bg-gradient-to-tr from-emerald-100/40 to-blue-100/40'}`} />
        </div>
      )}

      <div className="relative">
        {/* TOP NAVIGATION */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 flex justify-between items-center">
          <motion.a 
            href="/" 
            initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: prefersReducedMotion || isMobile ? 0.2 : 0.4 }}
            className={`flex items-center gap-2 font-medium transition-colors group
              ${isDarkMode 
                ? 'text-slate-400 hover:text-blue-400' 
                : 'text-slate-600 hover:text-blue-600'}`}
          >
            <span className={`p-2 rounded-lg transition-colors duration-300
              ${isDarkMode 
                ? 'bg-slate-800 group-hover:bg-blue-900/50' 
                : 'bg-slate-100 group-hover:bg-blue-100'}`}>
              <ArrowLeft size={18} />
            </span>
            <span className="hidden sm:inline">Back to Events</span>
          </motion.a>
          <div className="flex gap-2">
            <motion.button 
              whileHover={prefersReducedMotion || isMobile ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion || isMobile ? {} : { scale: 0.95 }}
              onClick={() => setShareModalOpen(true)}
              className={`p-2.5 rounded-xl transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-slate-800 text-slate-400 hover:bg-blue-900/50 hover:text-blue-400' 
                  : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-600'}`}
            >
              <Share2 size={18}/>
            </motion.button>
            <motion.button 
              whileHover={prefersReducedMotion || isMobile ? {} : { scale: 1.05 }}
              whileTap={prefersReducedMotion || isMobile ? {} : { scale: 0.95 }}
              className={`p-2.5 rounded-xl transition-colors duration-300
                ${isDarkMode 
                  ? 'bg-slate-800 text-slate-400 hover:bg-red-900/50 hover:text-red-400' 
                  : 'bg-slate-100 text-slate-600 hover:bg-red-100 hover:text-red-500'}`}
            >
              <Heart size={18}/>
            </motion.button>
          </div>
        </nav>

        {/* HERO SECTION */}
        <header className="max-w-7xl mx-auto px-4 sm:px-6 pb-8 sm:pb-12">
          <motion.div 
            initial={fadeInUp.initial}
            animate={fadeInUp.animate}
            transition={fadeInUp.transition}
          >
            <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
              <Badge isMobile={isMobile} isDarkMode={isDarkMode}>{eventData.category}</Badge>
              <Badge variant="success" isMobile={isMobile} isDarkMode={isDarkMode}>Open for Registration</Badge>
            </div>
            
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 sm:mb-6 leading-[1.1] transition-colors duration-300
              ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
              {eventData.title.split(' ').slice(0, -1).join(' ')}{' '}
              <span className={`${isDarkMode ? 'text-blue-400' : ''} ${isMobile ? '' : 'gradient-text'}`}>
                {eventData.title.split(' ').slice(-1)}
              </span>
            </h1>
            <p className={`text-lg sm:text-xl max-w-3xl mb-8 transition-colors duration-300
              ${isDarkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              {eventData.tagline}
            </p>

            {/* Quick Info Pills */}
            <div className="flex flex-wrap gap-3 sm:gap-4 mb-8">
              {[
                { icon: Calendar, text: eventData.date },
                { icon: Clock, text: eventData.time },
                { icon: MapPin, text: "Sangli, Maharashtra" },
                { icon: Globe, text: "In-Person Event" },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-2 border px-4 py-2 rounded-full text-sm transition-colors duration-300
                  ${isDarkMode 
                    ? 'bg-slate-800 border-slate-700 text-slate-300' 
                    : 'bg-white border-slate-200 text-slate-600'}`}>
                  <item.icon size={16} className="text-blue-500" />
                  {item.text}
                </div>
              ))}
            </div>

            {/* Hero Image */}
            <div className={`relative w-full h-[220px] sm:h-[350px] md:h-[450px] lg:h-[500px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl transition-colors duration-300
              ${isDarkMode ? 'shadow-slate-900/50' : 'shadow-slate-300/50'}`}>
              <img 
                src={eventData.image} 
                alt="Event Hero" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent" />
              
              {/* Overlay Info */}
              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 md:p-8">
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                      {eventData.speakers.slice(0, 3).map((s, i) => (
                        <img key={i} src={s.img} alt={s.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white shadow-lg" />
                      ))}
                    </div>
                    <div className="text-white">
                      <p className="font-semibold text-sm sm:text-base">{eventData.speakers.length}+ Speakers</p>
                      <p className="text-white/70 text-xs sm:text-sm">Industry Experts</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </header>

        {/* HIGHLIGHTS */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {eventData.highlights.map((item, i) => (
              <HighlightCard key={i} icon={iconMap[item.icon]} title={item.title} desc={item.desc} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} isDarkMode={isDarkMode} />
            ))}
          </div>
        </section>

        {/* MAIN CONTENT GRID */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* LEFT COLUMN (Content) */}
          <div className="lg:col-span-7 xl:col-span-8">
            
            {/* About Section */}
            <motion.section 
              initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: prefersReducedMotion || isMobile ? 0.2 : 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-violet-500 rounded-full" />
                <h2 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>About the Event</h2>
              </div>
              {eventData.description.map((para, i) => (
                <p key={i} className={`leading-relaxed mb-4 text-base sm:text-lg transition-colors duration-300
                  ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                  {para}
                </p>
              ))}
            </motion.section>

            {/* What you'll learn */}
            <motion.section 
              initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: prefersReducedMotion || isMobile ? 0.2 : 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-emerald-500 to-blue-500 rounded-full" />
                <h2 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>What You'll Learn</h2>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                {eventData.takeaways.map((item, i) => (
                  <motion.div 
                    key={i} 
                    initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
                    transition={{ delay: prefersReducedMotion || isMobile ? 0 : i * 0.05, duration: prefersReducedMotion || isMobile ? 0.2 : 0.4 }}
                    className={`flex items-start gap-3 p-4 rounded-xl border transition-all duration-300 group
                      ${isDarkMode 
                        ? 'bg-slate-800 border-slate-700 hover:shadow-md hover:border-blue-800' 
                        : 'bg-white border-slate-100 hover:shadow-md hover:border-blue-100'}`}
                  >
                    <div className={`p-1.5 rounded-lg transition-colors duration-300
                      ${isDarkMode 
                        ? 'bg-emerald-900/50 group-hover:bg-emerald-600' 
                        : 'bg-emerald-100 group-hover:bg-emerald-500'}`}>
                      <CheckCircle className={`transition-colors duration-300
                        ${isDarkMode 
                          ? 'text-emerald-400 group-hover:text-white' 
                          : 'text-emerald-600 group-hover:text-white'}`} size={16} />
                    </div>
                    <span className={`font-medium transition-colors duration-300
                      ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Speakers */}
            <motion.section 
              initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: prefersReducedMotion || isMobile ? 0.2 : 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-violet-500 to-pink-500 rounded-full" />
                <h2 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Meet the Speakers</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {eventData.speakers.map((speaker, i) => (
                  <SpeakerCard key={i} speaker={speaker} index={i} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} isDarkMode={isDarkMode} />
                ))}
              </div>
            </motion.section>

            {/* FAQs */}
            <motion.section 
              initial={prefersReducedMotion || isMobile ? { opacity: 0 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: isMobile ? "-50px" : "-100px" }}
              transition={{ duration: prefersReducedMotion || isMobile ? 0.2 : 0.6 }}
              className="mb-12"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-gradient-to-b from-blue-500 to-cyan-500 rounded-full" />
                <h2 className={`text-2xl sm:text-3xl font-bold transition-colors duration-300
                  ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Frequently Asked Questions</h2>
              </div>
              <div className="space-y-3">
                {eventData.faqs.map((faq, i) => (
                  <FAQItem 
                    key={i} 
                    question={faq.q} 
                    answer={faq.a} 
                    isOpen={openFaq === i}
                    onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                    isDarkMode={isDarkMode}
                  />
                ))}
              </div>
            </motion.section>
          </div>

          {/* RIGHT COLUMN (Sidebar) - Hidden on mobile */}
          <div className="hidden lg:block lg:col-span-5 xl:col-span-4">
            <RegistrationCard eventData={eventData} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} isDarkMode={isDarkMode} />
          </div>
        </main>
      </div>

      {/* Mobile CTA */}
      <MobileCTA eventData={eventData} prefersReducedMotion={prefersReducedMotion} isMobile={isMobile} isDarkMode={isDarkMode} />
      
      {/* Share Modal */}
      <ShareModal isOpen={shareModalOpen} onClose={() => setShareModalOpen(false)} isMobile={isMobile} isDarkMode={isDarkMode} />
    </div>
  );
};

export default EventDetailPage;