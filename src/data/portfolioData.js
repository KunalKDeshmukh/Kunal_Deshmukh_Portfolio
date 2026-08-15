export const profile = {
  name: 'Kunal Deshmukh',
  roles: ['Full-Stack Developer', 'Java Developer', 'AI & Cloud Enthusiast'],
  heroHeadline: 'Building Scalable Software With Code, Cloud & AI.',
  heroDescription:
    'Full-stack developer focused on Java, Spring Boot, React, Cloud, DevOps and AI-powered applications.',
  resumeHref: '/resume.pdf',
  // TODO: replace with your real city/state and WhatsApp number (with country code, digits only).
  location: 'Chhatrapati Sambhajinagar, Maharashtra, India',
  whatsapp: '',
}

export const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Client Work', href: '#client-work' },
  { label: 'Education', href: '/education', route: true },
  { label: 'Contact', href: '#contact' },
]

// Replace these with your real profile URLs.
export const socialLinks = [
  { label: 'GitHub', href: 'https://github.com/1015kunaldeshmukh', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: 'linkedin' },
  { label: 'Email', href: 'mailto:1015kunaldeshmukh@gmail.com', icon: 'mail' },
  { label: 'Twitter', href: 'https://twitter.com/', icon: 'twitter' },
]

export const email = '1015kunaldeshmukh@gmail.com'

export const enquiryTypes = [
  'Job Opportunity',
  'Internship',
  'Freelance Project',
  'Collaboration',
  'Project Discussion',
  'Other',
]

export const contactMethods = ['Email', 'Phone Call', 'WhatsApp']

export const techStack = [
  'Java',
  'Spring Boot',
  'React.js',
  'Node.js',
  'Python',
  'MySQL',
  'MongoDB',
  'AWS',
  'Azure',
  'Docker',
  'Kubernetes',
  'Linux/RHCSA',
  'DevOps',
  'Claude API',
  'Generative AI',
]

// Floating badges shown around the hero portrait area.
export const floatingBadges = [
  { label: 'Java', position: 'top-left' },
  { label: 'Spring Boot', position: 'top-right' },
  { label: 'React.js', position: 'mid-left' },
  { label: 'AWS', position: 'mid-right' },
  { label: 'Docker', position: 'bottom-left' },
  { label: 'Generative AI', position: 'bottom-right' },
]

// NOTE: Update the `github` field on each project below with the real
// repository URL once your code is pushed to GitHub.
export const projects = [
  {
    id: 'lookglass',
    index: '01',
    name: 'LOOKGLASS',
    tagline: 'AI-Powered Fashion Store',
    description:
      'A full-stack fashion e-commerce platform where shoppers get outfit recommendations from an AI stylist. Users upload a photo and Claude\u2019s vision capabilities suggest matching outfits, styles and similar products from the catalog.',
    tags: ['React', 'TypeScript', 'Node.js', 'Express', 'Claude API'],
    accent: 'cobalt',
    github: 'https://github.com/1015kunaldeshmukh/lookglass',
  },
  {
    id: 'canteenhub',
    index: '02',
    name: 'CanteenHub',
    tagline: 'Smart Canteen Management System',
    description:
      'A full-stack canteen management system for tracking menu items, orders and users across admin, vendor and customer roles, with a Spring Boot API backed by MySQL and a React frontend.',
    tags: ['Java', 'Spring Boot', 'React', 'Vite', 'MySQL'],
    accent: 'amber',
    github: 'https://github.com/1015kunaldeshmukh/canteenhub',
  },
  {
    id: 'ai-project-explainer',
    index: '03',
    name: 'AI Project Explainer',
    tagline: 'Understand Any Codebase in Minutes',
    description:
      'A Flask web app that takes a zipped codebase upload and uses the Claude API to generate a plain-language walkthrough of the project\u2014its structure, key files and what the code actually does.',
    tags: ['Python', 'Flask', 'Claude API'],
    accent: 'cobalt',
    github: 'https://github.com/1015kunaldeshmukh/ai-project-explainer',
  },
]

// -----------------------------------------------------------------------
// Client Work — real-world websites built and delivered for paying clients.
// These are freelance/agency-style engagements, so most don't have a public
// GitHub repo. Replace the `liveUrl` placeholders with the real live links
// once each site is deployed.
// -----------------------------------------------------------------------
export const clientProjects = [
  {
    id: 'ca-aditya-kathar',
    index: '01',
    client: 'CA Aditya Kathar & Associates',
    industry: 'CA / Professional Services',
    tagline: 'Chartered Accountancy Firm Website',
    description:
      'A professional business website for a practicing Chartered Accountancy firm, showcasing services like tax filing, GST compliance, auditing and ROC filings, along with an about/team section and a client enquiry form.',
    tags: ['React', 'Responsive Design', 'Business Website', 'SEO'],
    accent: 'cobalt',
    liveUrl: '', // TODO: add live site URL once deployed
  },
  {
    id: 'rajendra-transport',
    index: '02',
    client: 'Rajendra Transport Company',
    industry: 'Transport / Logistics',
    tagline: 'Transport & Logistics Company Website',
    description:
      'A production website for a real transport and logistics company based in Chhatrapati Sambhajinagar, Maharashtra, featuring service listings, fleet details, route coverage and a booking/enquiry flow modeled on established logistics platforms.',
    tags: ['React', 'Business Website', 'Logistics'],
    accent: 'amber',
    liveUrl: '', // TODO: add live site URL once deployed
    github: 'https://github.com/1015kunaldeshmukh/logistics-technology',
  },
  {
    id: 'adv-kuldeep-deshmukh',
    index: '03',
    client: 'Adv. Kuldeep Deshmukh',
    industry: 'Legal Services',
    tagline: 'Advocate & Legal Services Website',
    description:
      'A trust-building website for an independent legal practice, presenting practice areas, experience and credentials, along with a simple client consultation/enquiry form for prospective clients to get in touch.',
    tags: ['React', 'Legal Services', 'Business Website'],
    accent: 'cobalt',
    liveUrl: '', // TODO: add live site URL once deployed
  },
]

// -----------------------------------------------------------------------
// Education & Certifications — sample/placeholder entries.
// Please replace the institution names, years and scores below with your
// actual details before publishing the site.
// -----------------------------------------------------------------------
export const education = [
  {
    id: 'university',
    level: 'University / College',
    degree: 'B.E. / B.Tech in Computer Science & Engineering',
    institution: 'Add your college/university name',
    duration: '2022 — 2026',
    score: 'CGPA: 0.00',
    description: 'Focused on data structures, software engineering, cloud computing and applied AI.',
  },
  {
    id: 'juniorCollege',
    level: 'Junior College (12th / HSC)',
    degree: 'Science (PCM)',
    institution: 'Add your junior college name',
    duration: '2020 — 2022',
    score: 'Percentage: 0.00%',
    description: 'Higher secondary education with Physics, Chemistry and Mathematics.',
  },
  {
    id: 'school',
    level: 'School (10th / SSC)',
    degree: 'Secondary School Certificate',
    institution: 'Add your school name',
    duration: '2019 — 2020',
    score: 'Percentage: 0.00%',
    description: 'Completed foundational schooling with a focus on math and science.',
  },
]

export const certifications = [
  {
    id: 'aws',
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    date: 'Add date',
    credentialUrl: '',
  },
  {
    id: 'azure',
    name: 'Microsoft Certified: Azure Fundamentals',
    issuer: 'Microsoft',
    date: 'Add date',
    credentialUrl: '',
  },
  {
    id: 'rhcsa',
    name: 'Red Hat Certified System Administrator (RHCSA)',
    issuer: 'Red Hat',
    date: 'Add date',
    credentialUrl: '',
  },
  {
    id: 'genai',
    name: 'Generative AI Application Development',
    issuer: 'Add issuer',
    date: 'Add date',
    credentialUrl: '',
  },
]
