import { motion } from 'framer-motion'

/**
 * Abstract developer silhouette used in place of a photo.
 * Swap this out for a real portrait by replacing the contents of
 * the "photo slot" below with an <img> tag — see README.
 */
export default function DeveloperArt() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: 'easeOut' }}
      className="relative mx-auto w-[280px] h-[280px] sm:w-[340px] sm:h-[340px] md:w-[400px] md:h-[400px]"
    >
      {/* ambient glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cobalt/30 via-transparent to-amber/20 blur-3xl" />

      {/* rotating dashed orbit ring */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow">
        <circle cx="100" cy="100" r="96" fill="none" stroke="#242429" strokeWidth="1" strokeDasharray="1 7" strokeLinecap="round" />
      </svg>

      {/* orbit ticks marking the stack, purely decorative */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 w-full h-full animate-spin-slow" style={{ animationDirection: 'reverse', animationDuration: '24s' }}>
        <circle cx="100" cy="100" r="86" fill="none" stroke="#4D7FFF" strokeOpacity="0.35" strokeWidth="1.5" strokeDasharray="2 30" strokeLinecap="round" />
      </svg>

      {/* photo slot */}
      <div className="absolute inset-[10%] rounded-full overflow-hidden border border-ink-line bg-gradient-to-b from-ink-raised to-ink-surface shadow-[0_20px_60px_rgba(0,0,0,0.55)]">
        <svg viewBox="0 0 300 300" className="w-full h-full" preserveAspectRatio="xMidYMax slice">
          <defs>
            <linearGradient id="silhouetteGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#33333c" />
              <stop offset="100%" stopColor="#1a1a1e" />
            </linearGradient>
          </defs>
          <rect width="300" height="300" fill="url(#silhouetteGrad)" opacity="0" />
          {/* head */}
          <circle cx="150" cy="118" r="52" fill="#26262c" />
          {/* shoulders / torso */}
          <path d="M40,300 C40,205 88,168 150,168 C212,168 260,205 260,300 Z" fill="#26262c" />
          {/* rim light */}
          <circle cx="150" cy="118" r="52" fill="none" stroke="#4D7FFF" strokeOpacity="0.25" strokeWidth="2" />
          <path d="M40,300 C40,205 88,168 150,168 C212,168 260,205 260,300" fill="none" stroke="#FFB238" strokeOpacity="0.18" strokeWidth="2" />
        </svg>

        {/* watermark code glyph */}
        <span className="absolute bottom-4 right-4 font-display font-semibold text-2xl text-bone/10 select-none">
          {'</>'}
        </span>
      </div>

      {/* mini terminal card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1, ease: 'easeOut' }}
        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-[86%] rounded-xl border border-ink-line bg-ink-surface/95 backdrop-blur px-4 py-2.5 shadow-xl shadow-black/40"
      >
        <p className="font-mono text-[11px] text-bone-muted leading-relaxed truncate">
          <span className="text-cobalt-soft">const</span> dev = <span className="text-amber-soft">"Kunal Deshmukh"</span>;
        </p>
      </motion.div>
    </motion.div>
  )
}
