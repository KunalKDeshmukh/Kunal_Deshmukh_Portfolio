import { motion } from 'framer-motion'
import { LightbulbIcon } from './Icons'

export default function LightbulbDecor({ className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.2, ease: 'easeOut' }}
      className={`relative flex items-center justify-center ${className}`}
    >
      <div className="absolute w-20 h-20 rounded-full bg-amber/25 blur-2xl animate-pulse-glow" />
      <div className="relative flex items-center justify-center w-14 h-14 rounded-full border border-ink-line bg-ink-surface/90 backdrop-blur text-amber shadow-lg shadow-black/30">
        <LightbulbIcon className="w-6 h-6" />
      </div>
      <span className="absolute -bottom-6 font-mono text-[10px] uppercase tracking-widest text-bone-dim whitespace-nowrap">
        Ideas → Code
      </span>
    </motion.div>
  )
}
