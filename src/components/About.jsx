import { motion } from 'framer-motion'
import { techStack } from '../data/portfolioData'
import SectionHeading from './SectionHeading'

export default function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 border-t border-ink-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1fr_1.1fr] gap-12 md:gap-16 items-start">
          <SectionHeading
            eyebrow="About"
            title="Software built to run, not just to demo."
            description="I work across the stack — Java and Spring Boot on the backend, React on the front end, and AWS/Azure to ship it — with a growing focus on weaving generative AI into real, working products rather than one-off prototypes."
          />

          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-bone-dim mb-5">Toolbox</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.4, delay: (i % 8) * 0.05, ease: 'easeOut' }}
                  className="rounded-full border border-ink-line bg-ink-surface px-4 py-2 text-sm text-bone-muted transition-colors hover:border-cobalt hover:text-bone"
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
