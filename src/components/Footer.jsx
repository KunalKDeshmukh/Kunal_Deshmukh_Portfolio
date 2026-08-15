import { profile } from '../data/portfolioData'

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-ink-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-bone-dim font-mono">
        <span>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</span>
        <span>Built with React, Vite &amp; Tailwind CSS.</span>
      </div>
    </footer>
  )
}
