import { motion } from 'framer-motion'
import { ArrowRightIcon } from './Icons'

const REPEATED_TEXT = 'AVAILABLE FOR HIRE • AVAILABLE FOR HIRE • '

export default function HireMeBadge({ className = '' }) {
  return (
    <motion.a
      href="#contact"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, delay: 1.1, ease: 'easeOut' }}
      whileHover={{ scale: 1.06 }}
      className={`group relative flex items-center justify-center w-28 h-28 md:w-32 md:h-32 ${className}`}
      aria-label="Available for hire — go to contact"
    >
      {/* rotating circular text */}
      <div className="absolute inset-0 animate-spin-slow group-hover:[animation-play-state:paused]">
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <path id="hireMeCircle" fill="none" d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
          <text className="fill-bone-muted" style={{ fontSize: '7.6px', letterSpacing: '0.05em' }}>
            <textPath href="#hireMeCircle" startOffset="0%">
              {REPEATED_TEXT}
            </textPath>
          </text>
        </svg>
      </div>

      {/* static center */}
      <div className="relative flex items-center justify-center w-16 h-16 rounded-full bg-amber text-ink shadow-[0_0_30px_rgba(255,178,56,0.35)] transition-shadow group-hover:shadow-[0_0_44px_rgba(255,178,56,0.55)]">
        <ArrowRightIcon className="w-5 h-5 -rotate-45" />
      </div>

      {/* pulsing availability dot */}
      <span className="absolute top-1 right-3 flex h-3 w-3">
        <span className="animate-pulse-dot absolute inline-flex h-full w-full rounded-full bg-emerald-400" />
        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400 ring-2 ring-ink" />
      </span>
    </motion.a>
  )
}
