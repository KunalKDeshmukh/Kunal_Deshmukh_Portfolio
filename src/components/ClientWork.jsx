import { clientProjects } from '../data/portfolioData'
import SectionHeading from './SectionHeading'
import ClientProjectCard from './ClientProjectCard'

export default function ClientWork() {
  return (
    <section id="client-work" className="relative py-24 md:py-32 border-t border-ink-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading
          eyebrow="Client Work"
          title="Real businesses, real websites."
          description="Freelance projects delivered for real-world clients across professional services, transport and legal industries."
        />

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {clientProjects.map((project, i) => (
            <ClientProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
