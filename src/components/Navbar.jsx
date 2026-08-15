import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import { navLinks, socialLinks } from '../data/portfolioData'
import { iconMap, MenuIcon, CloseIcon } from './Icons'

function NavLink({ link, onClick, className }) {
  const location = useLocation()
  const isHome = location.pathname === '/'

  if (link.route) {
    return (
      <Link to={link.href} onClick={onClick} className={className}>
        {link.label}
      </Link>
    )
  }

  // Section anchors only work while on the home page. From another route,
  // send the user back home with the hash so the browser scrolls on load.
  const href = isHome ? link.href : `/${link.href}`
  return (
    <a href={href} onClick={onClick} className={className}>
      {link.label}
    </a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-300 ${
        scrolled ? 'bg-ink/80 backdrop-blur-md border-b border-ink-line' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="relative flex items-center justify-between h-20">
          {/* Left: nav links (desktop) */}
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs uppercase tracking-widest text-bone-muted">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                link={link}
                className="relative py-2 transition-colors hover:text-bone after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-amber after:transition-all hover:after:w-full"
              />
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden text-bone p-2 -ml-2"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <CloseIcon /> : <MenuIcon />}
          </button>

          {/* Center: circular logo */}
          <Link
            to="/"
            className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center w-12 h-12 rounded-full border border-ink-line bg-ink-surface font-display font-semibold text-sm tracking-wide text-bone shadow-[0_0_0_1px_rgba(255,178,56,0.0)] transition-shadow hover:shadow-[0_0_0_1px_rgba(255,178,56,0.5),0_0_24px_rgba(255,178,56,0.25)]"
            aria-label="Kunal Deshmukh — home"
          >
            KD
          </Link>

          {/* Right: socials (desktop) */}
          <div className="hidden md:flex items-center gap-5 text-bone-muted">
            {socialLinks.map((social) => {
              const Icon = iconMap[social.icon]
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  className="transition-colors hover:text-amber"
                >
                  <Icon className="w-4 h-4" />
                </a>
              )
            })}
          </div>

          {/* Spacer to balance mobile layout */}
          <div className="md:hidden w-5" />
        </div>
      </div>

      {/* Mobile menu panel */}
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden border-t border-ink-line bg-ink/95 backdrop-blur-md overflow-hidden"
        >
          <nav className="flex flex-col px-6 py-6 gap-5 font-mono text-sm uppercase tracking-widest text-bone-muted">
            {navLinks.map((link) => (
              <NavLink key={link.href} link={link} onClick={() => setOpen(false)} className="hover:text-bone" />
            ))}
            <div className="flex items-center gap-5 pt-2 text-bone-muted">
              {socialLinks.map((social) => {
                const Icon = iconMap[social.icon]
                return (
                  <a key={social.label} href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} className="hover:text-amber">
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  )
}
