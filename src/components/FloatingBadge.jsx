import { motion } from 'framer-motion'

const positionClasses = {
  'top-left': 'top-[6%] left-[2%] md:left-[-4%]',
  'top-right': 'top-[10%] right-[0%] md:right-[-6%]',
  'mid-left': 'top-[42%] left-[-6%] md:left-[-10%]',
  'mid-right': 'top-[48%] right-[-4%] md:right-[-12%]',
  'bottom-left': 'bottom-[16%] left-[0%] md:left-[-8%]',
  'bottom-right': 'bottom-[10%] right-[6%] md:right-[-2%]',
}

export default function FloatingBadge({ label, position, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 + delay, ease: 'easeOut' }}
      className={`hidden sm:block absolute ${positionClasses[position]} z-20`}
    >
      <div className="animate-float" style={{ animationDelay: `${delay}s` }}>
        <span className="inline-flex items-center gap-2 rounded-full border border-ink-line bg-ink-surface/90 backdrop-blur px-4 py-2 font-mono text-[11px] uppercase tracking-wider text-bone-muted shadow-lg shadow-black/30">
          <span className="w-1.5 h-1.5 rounded-full bg-cobalt" />
          {label}
        </span>
      </div>
    </motion.div>
  )
}
