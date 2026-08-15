import { motion } from 'framer-motion'
import { profile, socialLinks, email } from '../data/portfolioData'
import { iconMap, DownloadIcon, MapPinIcon, MailIcon, PhoneIcon } from './Icons'
import SectionHeading from './SectionHeading'
import EnquiryForm from './EnquiryForm'

export default function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-ink-line">
      <div className="max-w-7xl mx-auto px-6 md:px-10">
        <SectionHeading
          eyebrow="Let's Work Together"
          title="Have a project, opportunity or idea? Let's build something together."
          description="Open to full-stack, cloud and AI-focused roles, internships, freelance projects and collaborations. Send an enquiry and I'll get back to you shortly."
        />

        <div className="mt-14 grid lg:grid-cols-[0.85fr_1.15fr] gap-8 lg:gap-10 items-start">
          {/* Left: quick contact links */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="rounded-2xl border border-ink-line bg-ink-surface p-6 md:p-8"
          >
            <p className="font-mono text-xs uppercase tracking-widest text-bone-dim mb-5">Get in touch directly</p>

            <div className="space-y-4">
              <a href={`mailto:${email}`} className="flex items-center gap-3 text-sm text-bone-muted transition-colors hover:text-amber">
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-ink-line bg-ink-raised">
                  <MailIcon className="w-4 h-4" />
                </span>
                {email}
              </a>

              <div className="flex items-center gap-3 text-sm text-bone-muted">
                <span className="flex items-center justify-center w-9 h-9 rounded-full border border-ink-line bg-ink-raised">
                  <MapPinIcon className="w-4 h-4" />
                </span>
                {profile.location}
              </div>

              {profile.whatsapp && (
                <a href={`https://wa.me/${profile.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-bone-muted transition-colors hover:text-amber">
                  <span className="flex items-center justify-center w-9 h-9 rounded-full border border-ink-line bg-ink-raised">
                    <PhoneIcon className="w-4 h-4" />
                  </span>
                  Chat on WhatsApp
                </a>
              )}
            </div>

            <div className="mt-7 pt-6 border-t border-ink-line flex items-center gap-5 text-bone-muted">
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
                    <Icon className="w-5 h-5" />
                  </a>
                )
              })}
            </div>

            <a
              href={profile.resumeHref}
              download
              className="group mt-7 inline-flex items-center gap-2 rounded-full border border-ink-line px-5 py-2.5 font-medium text-sm text-bone transition-colors hover:border-amber hover:text-amber"
            >
              Download Resume
              <DownloadIcon className="w-4 h-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          {/* Right: enquiry form */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: 'easeOut' }}
          >
            <EnquiryForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
