import { motion } from 'framer-motion'
import { profile, floatingBadges } from '../data/portfolioData'
import DeveloperArt from './DeveloperArt'
import FloatingBadge from './FloatingBadge'
import HireMeBadge from './HireMeBadge'
import LightbulbDecor from './LightbulbDecor'
import { ArrowRightIcon, DownloadIcon } from './Icons'

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
}

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-32 pb-28 md:pt-40 md:pb-40">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-2 gap-16 md:gap-8 items-center">
          {/* Left: developer artwork with floating tech badges */}
          <div className="relative order-2 md:order-1 flex justify-center md:justify-start">
            <div className="relative">
              <DeveloperArt />
              {floatingBadges.map((badge, i) => (
                <FloatingBadge key={badge.label} label={badge.label} position={badge.position} delay={i * 0.35} />
              ))}
            </div>
          </div>

          {/* Right: text + CTAs */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="order-1 md:order-2 text-center md:text-left"
          >
            <motion.p
              variants={item}
              className="font-mono text-xs uppercase tracking-[0.25em] text-amber mb-5"
            >
              Hi, I&rsquo;m {profile.name}
            </motion.p>

            <motion.h1
              variants={item}
              className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-gradient"
            >
              {profile.heroHeadline}
            </motion.h1>

            <motion.div variants={item} className="mt-5 flex flex-wrap justify-center md:justify-start gap-x-2 gap-y-1 font-mono text-xs sm:text-sm uppercase tracking-widest text-bone-muted">
              {profile.roles.map((role, i) => (
                <span key={role} className="flex items-center gap-2">
                  {role}
                  {i < profile.roles.length - 1 && <span className="text-amber">&middot;</span>}
                </span>
              ))}
            </motion.div>

            <motion.p variants={item} className="mt-6 text-base sm:text-lg text-bone-muted max-w-xl mx-auto md:mx-0 leading-relaxed">
              {profile.heroDescription}
            </motion.p>

            <motion.div variants={item} className="mt-9 flex flex-wrap items-center justify-center md:justify-start gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-bone text-ink px-6 py-3 font-medium text-sm transition-transform hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(244,243,239,0.15)]"
              >
                View Projects
                <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={profile.resumeHref}
                download
                className="group inline-flex items-center gap-2 rounded-full border border-ink-line px-6 py-3 font-medium text-sm text-bone transition-colors hover:border-amber hover:text-amber"
              >
                Download Resume
                <DownloadIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* bottom-left circular Hire Me element */}
      <div className="absolute left-4 bottom-2 md:left-10 md:bottom-6 z-20">
        <HireMeBadge />
      </div>

      {/* bottom-right lightbulb decorative element */}
      <div className="absolute right-6 bottom-8 md:right-14 md:bottom-14 z-20">
        <LightbulbDecor />
      </div>
    </section>
  )
}
