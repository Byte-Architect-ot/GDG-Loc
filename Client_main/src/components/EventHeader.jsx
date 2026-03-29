import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar } from "lucide-react";

const GOOGLE_DOTS = [
  { color: "#4285F4", delay: 0 },
  { color: "#EA4335", delay: 0.1 },
  { color: "#FBBC04", delay: 0.2 },
  { color: "#34A853", delay: 0.3 },
];

export default function EventsHeader({ selectedYear }: { selectedYear: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="text-center mb-28 md:mb-40 relative">
      {/* Rotating ring */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-8 w-40 h-40 pointer-events-none"
        animate={{ rotate: 360 }}
        transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
      >
        <div
          className="w-full h-full rounded-full border border-dashed"
          style={{ borderColor: "#27272a" }}
        />
      </motion.div>

      {/* Google brand dots pill */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border mb-8"
        style={{
          background: "rgba(39,39,42,0.6)",
          borderColor: "#27272a",
          backdropFilter: "blur(12px)",
        }}
      >
        <div className="flex gap-1.5">
          {GOOGLE_DOTS.map((dot, i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full"
              style={{ background: dot.color }}
              animate={{ scale: [1, 1.3, 1] }}
              transition={{
                duration: 1.8,
                delay: dot.delay,
                repeat: Infinity,
                repeatDelay: 1.5,
              }}
            />
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            color: "#a1a1aa",
            fontSize: "0.72rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          Google Developer Group
        </span>
      </motion.div>

      {/* Main heading */}
      <div className="overflow-hidden mb-6">
        <motion.h1
          initial={{ y: 80, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3rem, 9vw, 7.5rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#fafafa",
          }}
        >
          Our{" "}
          <span className="relative inline-block">
            <span
              style={{
                background: "linear-gradient(135deg, #fafafa 40%, #71717a 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Events
            </span>
            {/* Underline: Google color segments */}
            <motion.svg
              viewBox="0 0 320 10"
              className="absolute left-0 w-full"
              style={{ bottom: "-6px" }}
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <motion.rect
                x="0" y="3" width="78" height="3" rx="2"
                fill="#4285F4"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.7, duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
              <motion.rect
                x="82" y="3" width="78" height="3" rx="2"
                fill="#EA4335"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 0.85, duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
              <motion.rect
                x="164" y="3" width="78" height="3" rx="2"
                fill="#FBBC04"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 1.0, duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
              <motion.rect
                x="246" y="3" width="74" height="3" rx="2"
                fill="#34A853"
                initial={{ scaleX: 0 }}
                animate={isInView ? { scaleX: 1 } : {}}
                transition={{ delay: 1.15, duration: 0.4, ease: "easeOut" }}
                style={{ transformOrigin: "left" }}
              />
            </motion.svg>
          </span>
        </motion.h1>
      </div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
        style={{
          fontFamily: "'Manrope', sans-serif",
          color: "#71717a",
          fontSize: "clamp(0.95rem, 2vw, 1.15rem)",
          fontWeight: 400,
          maxWidth: "38rem",
          margin: "0 auto",
          lineHeight: 1.65,
        }}
        className="mt-8 px-4"
      >
        From a small library discussion room to the region's{" "}
        <span style={{ color: "#a1a1aa", fontWeight: 600 }}>
          leading developer community
        </span>
        .
      </motion.p>

      {/* Year indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 flex justify-center"
      >
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border"
          style={{
            background: "rgba(24,24,27,0.8)",
            borderColor: "#27272a",
            backdropFilter: "blur(8px)",
          }}
        >
          <Calendar size={13} color="#71717a" />
          <span
            style={{
              fontFamily: "'Manrope', sans-serif",
              fontSize: "0.78rem",
              color: "#71717a",
              fontWeight: 500,
            }}
          >
            Showing events for{" "}
            <span style={{ color: "#fafafa", fontWeight: 700 }}>{selectedYear}</span>
          </span>
        </div>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        className="mt-14 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 1, duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col items-center gap-1"
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1"
            style={{ borderColor: "#3f3f46" }}
          >
            <motion.div
              className="w-1 h-2 rounded-full"
              style={{ background: "#52525b" }}
              animate={{ y: [0, 8, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
        <span
          style={{
            fontFamily: "'Manrope', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "#3f3f46",
            fontWeight: 600,
          }}
        >
          Scroll to explore
        </span>
      </motion.div>
    </div>
  );
}
