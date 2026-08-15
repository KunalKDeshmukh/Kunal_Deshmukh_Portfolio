import { motion } from 'framer-motion'

export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const isCenter = align === 'center'
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={isCenter ? 'text-center max-w-2xl mx-auto' : 'text-left'}
    >
      {eyebrow && (
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-amber mb-3">{eyebrow}</p>
      )}
      <h2 className="font-display font-semibold text-3xl sm:text-4xl text-bone tracking-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-bone-muted leading-relaxed max-w-xl" style={isCenter ? { marginInline: 'auto' } : undefined}>
          {description}
        </p>
      )}
    </motion.div>
  )
}
