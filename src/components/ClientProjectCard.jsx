import { motion } from 'framer-motion'
import { GithubIcon, ExternalLinkIcon } from './Icons'

const accentText = {
  cobalt: 'text-cobalt-soft',
  amber: 'text-amber-soft',
}

const accentBorder = {
  cobalt: 'group-hover:border-cobalt/60',
  amber: 'group-hover:border-amber/60',
}

export default function ClientProjectCard({ project, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.1, ease: 'easeOut' }}
      className={`group relative rounded-2xl border border-ink-line bg-ink-surface p-7 md:p-8 transition-colors ${accentBorder[project.accent]}`}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="font-mono text-xs text-bone-dim">{project.index}</span>
        <span className={`font-mono text-[11px] uppercase tracking-widest ${accentText[project.accent]}`}>
          {project.industry}
        </span>
      </div>

      <h3 className="mt-5 font-display font-semibold text-xl text-bone tracking-tight">
        {project.client}
      </h3>
      <p className="mt-1 text-sm text-bone-dim">{project.tagline}</p>

      <p className="mt-3 text-sm text-bone-muted leading-relaxed">{project.description}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-ink-line px-3 py-1 font-mono text-[11px] text-bone-dim"
          >
            {tag}
          </span>
        ))}
      </div>

      {(project.liveUrl || project.github) && (
        <div className="mt-6 pt-5 border-t border-ink-line flex flex-wrap items-center gap-5">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-muted transition-colors hover:text-amber"
            >
              Visit Site
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-bone-muted transition-colors hover:text-amber"
            >
              <GithubIcon className="w-4 h-4" />
              View on GitHub
              <ExternalLinkIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </motion.article>
  )
}
