import { projects } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import ProjectCard from './ProjectCard'

export default function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32 border-t border-ink-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading
          eyebrow="Selected Work"
          title="A few things I've shipped."
          description="Three projects spanning AI-assisted commerce, full-stack systems and developer tooling."
        />

        <div className="mt-14 grid sm:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
