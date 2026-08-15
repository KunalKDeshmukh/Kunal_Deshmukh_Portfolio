import { motion } from 'framer-motion'
import { education, certifications } from '../data/portfolioData'
import SectionHeading from '../components/SectionHeading'
import { GraduationCapIcon, AwardIcon, ExternalLinkIcon } from '../components/Icons'

function EducationTimeline() {
  return (
    <div className="mt-14 relative">
      <div className="absolute left-[19px] top-2 bottom-2 w-px bg-ink-line md:left-1/2" aria-hidden="true" />
      <div className="space-y-10">
        {education.map((item, i) => {
          const isEven = i % 2 === 0
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: 'easeOut' }}
              className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-10 md:items-center"
            >
              {/* Card slot: left column on even rows, right column on odd rows */}
              <div className={isEven ? 'md:pr-10 md:text-right' : 'md:col-start-2 md:pl-10 md:order-1'}>
                <TimelineCard item={item} />
              </div>
              {!isEven && <div className="hidden md:block" />}

              {/* Timeline dot */}
              <span className="absolute left-[13px] top-6 md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 flex items-center justify-center w-4 h-4 rounded-full bg-ink-surface border-2 border-amber">
                <span className="w-1.5 h-1.5 rounded-full bg-amber" />
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function TimelineCard({ item }) {
  return (
    <div className="inline-block w-full rounded-2xl border border-ink-line bg-ink-surface p-6 text-left">
      <div className="flex items-center gap-2 text-amber">
        <GraduationCapIcon className="w-4 h-4" />
        <span className="font-mono text-[11px] uppercase tracking-widest">{item.level}</span>
      </div>
      <h3 className="mt-3 font-display font-semibold text-lg text-bone">{item.degree}</h3>
      <p className="mt-1 text-sm text-bone-muted">{item.institution}</p>
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 font-mono text-[11px] text-bone-dim">
        <span>{item.duration}</span>
        <span>{item.score}</span>
      </div>
      {item.description && (
        <p className="mt-3 text-sm text-bone-muted leading-relaxed">{item.description}</p>
      )}
    </div>
  )
}

function CertificationsGrid() {
  return (
    <div className="mt-14 grid sm:grid-cols-2 gap-6">
      {certifications.map((cert, i) => (
        <motion.div
          key={cert.id}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, delay: (i % 4) * 0.08, ease: 'easeOut' }}
          className="group rounded-2xl border border-ink-line bg-ink-surface p-6 transition-colors hover:border-cobalt/60"
        >
          <div className="flex items-start justify-between gap-4">
            <span className="flex items-center justify-center w-10 h-10 rounded-full border border-ink-line bg-ink-raised text-amber">
              <AwardIcon className="w-5 h-5" />
            </span>
            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={`View credential: ${cert.name}`}
                className="text-bone-dim transition-colors hover:text-amber"
              >
                <ExternalLinkIcon className="w-4 h-4" />
              </a>
            )}
          </div>
          <h3 className="mt-4 font-display font-semibold text-lg text-bone tracking-tight">{cert.name}</h3>
          <p className="mt-1 text-sm text-bone-muted">{cert.issuer}</p>
          <p className="mt-3 font-mono text-[11px] uppercase tracking-widest text-bone-dim">{cert.date}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default function Education() {
  return (
    <main className="pt-32 pb-10">
      <section id="education" className="relative py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Background"
            title="Education."
            description="School, junior college and university — the academic foundation behind the projects."
          />
          <EducationTimeline />
        </div>
      </section>

      <section id="certifications" className="relative py-16 md:py-20 border-t border-ink-line">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <SectionHeading
            eyebrow="Credentials"
            title="Certifications."
            description="Courses and certifications completed across cloud, systems and AI."
          />
          <CertificationsGrid />
        </div>
      </section>
    </main>
  )
}
