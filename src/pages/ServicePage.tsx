import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router'
import ArrowLeft from 'lucide-react/dist/esm/icons/arrow-left.mjs'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.mjs'
import Check from 'lucide-react/dist/esm/icons/check.mjs'
import Code2 from 'lucide-react/dist/esm/icons/code-2.mjs'
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3.mjs'
import Layers3 from 'lucide-react/dist/esm/icons/layers-3.mjs'
import Maximize2 from 'lucide-react/dist/esm/icons/maximize-2.mjs'
import { fallbackPortfolio, loadPortfolio, type Portfolio, type Project } from '../App'

type ServiceConfig = {
  slug: string
  category: string
  label: string
  headline: string
  introduction: string
  capabilities: string[]
  process: { number: string; title: string; description: string }[]
}

const serviceConfigs: ServiceConfig[] = [
  {
    slug: 'software-development',
    category: 'Software',
    label: 'Software Development',
    headline: 'Digital products built to work in the real world.',
    introduction:
      'I design and engineer dependable web and mobile products—from early architecture through launch, iteration and long-term support.',
    capabilities: ['Product architecture', 'Web applications', 'API development', 'Mobile experiences', 'Cloud deployment', 'Technical leadership'],
    process: [
      { number: '01', title: 'Understand', description: 'Clarify the users, operational constraints and outcomes that matter.' },
      { number: '02', title: 'Shape', description: 'Turn the challenge into a focused product scope and technical direction.' },
      { number: '03', title: 'Build', description: 'Deliver in visible increments with quality, security and maintainability built in.' },
    ],
  },
  {
    slug: 'data-intelligence',
    category: 'Data',
    label: 'Data & Intelligence',
    headline: 'Move from scattered data to confident decisions.',
    introduction:
      'I help teams create trustworthy data foundations, useful analytics and practical machine-learning systems that people actually adopt.',
    capabilities: ['Data strategy', 'Analytics engineering', 'Executive dashboards', 'Predictive modelling', 'Reporting automation', 'Decision support'],
    process: [
      { number: '01', title: 'Audit', description: 'Map the available data, its quality and the decisions it needs to support.' },
      { number: '02', title: 'Model', description: 'Build reliable metrics and analytical models around the business question.' },
      { number: '03', title: 'Activate', description: 'Put insights into clear dashboards and workflows your team can use.' },
    ],
  },
  {
    slug: 'ict-consulting',
    category: 'Consulting',
    label: 'ICT Consulting',
    headline: 'Technology direction grounded in practical delivery.',
    introduction:
      'I work with leaders to assess technology environments, reduce risk and create achievable roadmaps for sustainable digital transformation.',
    capabilities: ['ICT audits', 'Technology roadmaps', 'Digital transformation', 'Vendor assessment', 'Systems selection', 'Governance & risk'],
    process: [
      { number: '01', title: 'Discover', description: 'Understand your environment, goals, risks and current operating reality.' },
      { number: '02', title: 'Prioritize', description: 'Separate urgent needs from longer-term opportunities and sequence the work.' },
      { number: '03', title: 'Enable', description: 'Create an actionable roadmap and support teams through implementation.' },
    ],
  },
]

function ProjectSnapshot({ project, index }: { project: Project; index: number }) {
  const [activeImage, setActiveImage] = useState<string | null>(null)
  const snapshots = project.snapshotUrls ?? []

  return (
    <article className="case-study">
      <div className="case-study-heading">
        <div>
          <span className="case-number">CASE 0{index + 1}</span>
          <h2>{project.title}</h2>
        </div>
        <span className="case-year">{project.year}</span>
      </div>
      <div className="case-summary">
        <p>{project.description}</p>
        <div className="case-impact"><Check size={16} /> {project.impact}</div>
      </div>
      {snapshots.length ? (
        <div className={`snapshot-grid snapshot-count-${Math.min(snapshots.length, 3)}`}>
          {snapshots.map((snapshot, snapshotIndex) => (
            <button key={snapshot} onClick={() => setActiveImage(snapshot)} aria-label={`Open ${project.title} snapshot ${snapshotIndex + 1}`}>
              <img src={snapshot} alt={`${project.title} work snapshot ${snapshotIndex + 1}`} />
              <span><Maximize2 size={16} /> View snapshot</span>
            </button>
          ))}
        </div>
      ) : (
        <div className={`snapshot-placeholder accent-${project.accent}`}>
          <div className="placeholder-ui">
            <span /><span /><span />
            <div><i /><i /><i /><i /></div>
          </div>
          <p>Project snapshots will appear here</p>
        </div>
      )}
      <div className="case-footer">
        <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        {project.link && project.link !== '#' && <a href={project.link} target="_blank" rel="noreferrer">Visit project <ArrowRight size={16} /></a>}
      </div>
      {activeImage && (
        <button className="lightbox" onClick={() => setActiveImage(null)} aria-label="Close image preview">
          <img src={activeImage} alt={`${project.title} enlarged work snapshot`} />
          <span>Click anywhere to close</span>
        </button>
      )}
    </article>
  )
}

export function ServicePage() {
  const { serviceSlug } = useParams()
  const config = serviceConfigs.find((service) => service.slug === serviceSlug) ?? serviceConfigs[0]
  const [portfolio, setPortfolio] = useState<Portfolio>(fallbackPortfolio)

  useEffect(() => {
    window.scrollTo(0, 0)
    setPortfolio(loadPortfolio())
  }, [serviceSlug])

  const projects = useMemo(
    () => portfolio.projects.filter((project) => project.category === config.category),
    [config.category, portfolio.projects],
  )
  const service = portfolio.services.find((item) => item.title === config.label)
  const Icon = config.category === 'Software' ? Code2 : config.category === 'Data' ? BarChart3 : Layers3

  return (
    <div className="service-page">
      <header className="service-page-header">
        <Link className="back-link" to="/"><ArrowLeft size={17} /> Back to portfolio</Link>
        <Link className="service-page-logo" to="/"><img src="/assets/xtracode-logo.png" alt="XTRACODE" /></Link>
        <a className="primary-button" href="#service-contact">Discuss a project <ArrowRight size={16} /></a>
      </header>

      <main>
        <section className="service-hero">
          <div className="service-hero-index"><span>{service?.number ?? '01'}</span><Icon size={32} /></div>
          <div>
            <span className="section-index">{config.label.toUpperCase()}</span>
            <h1>{config.headline}</h1>
            <p>{service?.description ?? config.introduction}</p>
          </div>
        </section>

        <section className="capability-band">
          <span>Core capabilities</span>
          <div>{(service?.tags?.length ? service.tags : config.capabilities).map((capability) => <span key={capability}>{capability}</span>)}</div>
        </section>

        <section className="service-proof-section">
          <div className="service-proof-intro">
            <span className="section-index">EXPERTISE</span>
            <h2>Specialist knowledge applied with purpose.</h2>
            <p>Capabilities, credentials and resources that demonstrate depth in {config.label.toLowerCase()}.</p>
          </div>
          {(service?.expertise ?? []).length ? (
            <div className="proof-grid">
              {(service?.expertise ?? []).map((item, index) => (
                <article key={item.id}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  {item.link && <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel || 'Learn more'} <ArrowRight size={15} /></a>}
                </article>
              ))}
            </div>
          ) : (
            <div className="proof-grid capability-proof-grid">
              {(service?.tags?.length ? service.tags : config.capabilities).map((item, index) => (
                <article key={item}><span>0{index + 1}</span><h3>{item}</h3><p>Add a detailed expertise entry and link from the portfolio manager.</p></article>
              ))}
            </div>
          )}
        </section>

        <section className="service-work">
          <div className="service-section-title">
            <span className="section-index">SELECTED CASE STUDIES</span>
            <h2>Work clients can see and appreciate.</h2>
            <p>Each engagement pairs clear thinking with tangible delivery. Add your real interface, dashboard and implementation snapshots from the portfolio manager.</p>
          </div>
          <div className="case-list">
            {projects.length ? projects.map((project, index) => <ProjectSnapshot key={project.id} project={project} index={index} />) : (
              <div className="no-case-studies"><h3>Your next case study starts here.</h3><p>Add a project in the portfolio manager and select the {config.category} category.</p></div>
            )}
          </div>
        </section>

        {(service?.experiences ?? []).length > 0 && (
          <section className="service-experience">
            <div className="service-experience-title">
              <span className="section-index">RELEVANT EXPERIENCE</span>
              <h2>Experience that supports the work.</h2>
            </div>
            <div className="service-experience-list">
              {(service?.experiences ?? []).map((item, index) => (
                <article key={item.id}>
                  <span className="experience-count">0{index + 1}</span>
                  <div><span className="experience-period">{item.period}</span><h3>{item.title}</h3><h4>{item.organization}</h4></div>
                  <div><p>{item.description}</p>{item.link && <a href={item.link} target="_blank" rel="noreferrer">{item.linkLabel || 'View work'} <ArrowRight size={15} /></a>}</div>
                </article>
              ))}
            </div>
          </section>
        )}

        <section className="service-process">
          <div><span className="section-index">HOW I WORK</span><h2>A clear path from challenge to outcome.</h2></div>
          <div className="process-grid">
            {config.process.map((step) => <article key={step.number}><span>{step.number}</span><h3>{step.title}</h3><p>{step.description}</p></article>)}
          </div>
        </section>

        <section id="service-contact" className="service-cta">
          <span className="section-index">START A CONVERSATION</span>
          <h2>Have a {config.label.toLowerCase()} challenge?</h2>
          <p>Share a little context and I’ll help you identify a practical next step.</p>
          <a className="primary-button" href={`mailto:${portfolio.profile.email}`}>Email {portfolio.profile.email} <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="service-footer">
        <span>© {new Date().getFullYear()} {portfolio.profile.name}</span>
        <Link to="/">Return to portfolio <ArrowRight size={15} /></Link>
      </footer>
    </div>
  )
}
