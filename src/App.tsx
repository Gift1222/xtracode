import { FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router'
import ArrowDownRight from 'lucide-react/dist/esm/icons/arrow-down-right.mjs'
import ArrowRight from 'lucide-react/dist/esm/icons/arrow-right.mjs'
import BarChart3 from 'lucide-react/dist/esm/icons/bar-chart-3.mjs'
import BriefcaseBusiness from 'lucide-react/dist/esm/icons/briefcase-business.mjs'
import Check from 'lucide-react/dist/esm/icons/check.mjs'
import Code2 from 'lucide-react/dist/esm/icons/code-2.mjs'
import Layers3 from 'lucide-react/dist/esm/icons/layers-3.mjs'
import LockKeyhole from 'lucide-react/dist/esm/icons/lock-keyhole.mjs'
import LogOut from 'lucide-react/dist/esm/icons/log-out.mjs'
import Mail from 'lucide-react/dist/esm/icons/mail.mjs'
import Menu from 'lucide-react/dist/esm/icons/menu.mjs'
import MessageSquare from 'lucide-react/dist/esm/icons/message-square.mjs'
import Plus from 'lucide-react/dist/esm/icons/plus.mjs'
import Save from 'lucide-react/dist/esm/icons/save.mjs'
import Settings2 from 'lucide-react/dist/esm/icons/settings-2.mjs'
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.mjs'
import Trash2 from 'lucide-react/dist/esm/icons/trash-2.mjs'
import X from 'lucide-react/dist/esm/icons/x.mjs'

export type Project = {
  id: string
  title: string
  category: string
  year: string
  description: string
  impact: string
  accent: string
  featured: boolean
  link: string
  tags: string[]
  snapshotUrls?: string[]
}

type Experience = {
  id: string
  period: string
  role: string
  company: string
  description: string
}

export type Service = {
  id: string
  number: string
  title: string
  description: string
  tags: string[]
  expertise?: ServiceExpertise[]
  experiences?: ServiceExperience[]
}

export type ServiceExpertise = {
  id: string
  title: string
  description: string
  link: string
  linkLabel: string
}

export type ServiceExperience = {
  id: string
  title: string
  organization: string
  period: string
  description: string
  link: string
  linkLabel: string
}

export type Portfolio = {
  profile: {
    name: string
    eyebrow: string
    headline: string
    intro: string
    location: string
    email: string
    image: string
    years: string
    projects: string
    clients: string
  }
  skills: string[]
  services: Service[]
  projects: Project[]
  experience: Experience[]
}

type Message = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  createdAt: string
}

export const fallbackPortfolio: Portfolio = {
  profile: {
    name: 'Gift Chimwendo',
    eyebrow: 'Available for select projects',
    headline: 'I turn complex technology into useful products.',
    intro:
      'Software developer, data scientist and ICT consultant helping ambitious teams build reliable systems, understand their data and make better decisions.',
    location: 'Mzuzu',
    email: 'giftchimwendo000@gmail.com',
    image: '/assets/profile-portrait.png',
    years: '3+',
    projects: '8+',
    clients: '10+',
  },
  skills: ['Software Development', 'Machine Learning', 'Data Analysis', 'Cloud Technologies', 'ICT Support, Graphic '],
  services: [
    { id: '1', number: '01', title: 'Software Development', description: 'Scalable web applications and digital products engineered around real business needs.', tags: ['Web apps', 'APIs', 'Cloud'], expertise: [], experiences: [] },
    { id: '2', number: '02', title: 'Data & Intelligence', description: 'Analytics, forecasting and practical machine learning that make your data actionable.', tags: ['Analytics', 'ML', 'Dashboards'], expertise: [], experiences: [] },
    { id: '3', number: '03', title: 'ICT Consulting', description: 'Clear technology roadmaps, infrastructure guidance and digital transformation support.', tags: ['Strategy', 'Audit', 'Transformation'], expertise: [], experiences: [] },
  ],
  projects: [
    { id: '1', title: 'Chiyambi Learning Pla', category: 'Software', year: '2025', description: 'A multi-market operations platform that unified inventory, fulfilment and reporting for a growing retail network.', impact: '31% faster fulfilment', accent: 'lime', featured: true, link: '#', tags: ['React', 'Node.js', 'PostgreSQL'], snapshotUrls: [] },
    { id: '2', title: 'Signal Forecasting', category: 'Data', year: '2024', description: 'Demand forecasting models and an executive dashboard for a regional distribution company.', impact: '18% less stock waste', accent: 'violet', featured: true, link: '#', tags: ['Python', 'XGBoost', 'Power BI'], snapshotUrls: [] },
    { id: '3', title: 'Civic Connect', category: 'Consulting', year: '2024', description: 'Digital service audit and three-year technology roadmap for a public-sector organization.', impact: '12 services redesigned', accent: 'blue', featured: true, link: '#', tags: ['ICT Audit', 'Service Design', 'Strategy'], snapshotUrls: [] },
    { id: '4', title: 'FieldOps Mobile', category: 'Software', year: '2023', description: 'Offline-first field reporting for distributed teams working in low-connectivity regions.', impact: '9,000+ reports captured', accent: 'orange', featured: false, link: '#', tags: ['React Native', 'Offline sync', 'Maps'], snapshotUrls: [] },
  ],
  experience: [
    { id: '1', period: '2023 — 2024', role: 'Technology Integration Officer', company: 'Mzuzu Entrepreneurs Hub', description: 'Supported the integration of technology into organisational operations, working with staff, IT teams and service providers to implement digital tools, improve workflows and support effective technology use.' },
    { id: '2', period: '2025 —present', role: 'ICT Officer', company: 'Emerge Livelihoods', description: 'Supported the integration of technology into organisational operations, working with staff, IT teams and service providers to implement digital tools, improve workflows and support effective technology use' },
    // { id: '3', period: '2017 — 2019', role: 'ICT Systems Analyst', company: 'Orbit Technologies', description: 'Modernized business systems, automated reporting and supported enterprise infrastructure.' },
  ],
}

const portfolioStorageKey = 'portfolio-demo-content'
const messageStorageKey = 'portfolio-demo-messages'
const demoSessionKey = 'portfolio-demo-session'
const demoEmail = 'admin@portfolio.dev'
const demoPassword = 'admin123'

export function loadPortfolio() {
  try {
    const saved = localStorage.getItem(portfolioStorageKey)
    if (!saved) return fallbackPortfolio
    const portfolio = JSON.parse(saved) as Portfolio
    if (portfolio.profile.image.includes('photo-1566753323558-f4e0952af115')) {
      portfolio.profile.image = '/assets/profile-portrait.png'
      localStorage.setItem(portfolioStorageKey, JSON.stringify(portfolio))
    }
    return portfolio
  } catch {
    return fallbackPortfolio
  }
}

function loadMessages() {
  try {
    const saved = localStorage.getItem(messageStorageKey)
    return saved ? JSON.parse(saved) as Message[] : []
  } catch {
    return []
  }
}

function Logo() {
  return (
    <a className="logo" href="#top" aria-label="Portfolio home">
      <img src="/assets/xtracode-logo.png" alt="XTRACODE" />
    </a>
  )
}

export function PortfolioHome() {
  const [portfolio, setPortfolio] = useState<Portfolio>(fallbackPortfolio)
  const [filter, setFilter] = useState('All')
  const [menuOpen, setMenuOpen] = useState(false)
  const [dashboardOpen, setDashboardOpen] = useState(false)
  const [session, setSession] = useState(() => sessionStorage.getItem(demoSessionKey) === 'true')
  const [notice, setNotice] = useState('')

  useEffect(() => {
    setPortfolio(loadPortfolio())
  }, [])

  const categories = useMemo(
    () => ['All', ...Array.from(new Set(portfolio.projects.map((project) => project.category)))],
    [portfolio.projects],
  )
  const visibleProjects = filter === 'All' ? portfolio.projects : portfolio.projects.filter((project) => project.category === filter)

  async function savePortfolio(next: Portfolio) {
    if (!session) return
    localStorage.setItem(portfolioStorageKey, JSON.stringify(next))
    setPortfolio(next)
    setNotice('Portfolio updated successfully')
    window.setTimeout(() => setNotice(''), 3000)
  }

  return (
    <div id="top" className="app-shell">
      <header className="site-header">
        <Logo />
        <nav className={menuOpen ? 'nav-links open' : 'nav-links'}>
          {['Work', 'Expertise', 'Experience', 'Contact'].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>
          ))}
        </nav>
        <div className="header-actions">
          <button className="manage-button" onClick={() => setDashboardOpen(true)}>
            <Settings2 size={16} /> Manage
          </button>
          <button className="menu-button" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span /> {portfolio.profile.eyebrow}</div>
            <h1>{portfolio.profile.headline}</h1>
            <p>{portfolio.profile.intro}</p>
            <div className="hero-actions">
              <a className="primary-button" href="#work">Explore my work <ArrowDownRight size={18} /></a>
              <a className="text-link" href="#contact">Start a conversation <ArrowRight size={18} /></a>
            </div>
            <div className="location-line"><span className="pulse-dot" /> {portfolio.profile.location}</div>
          </div>
          <div className="hero-visual">
            <div className="image-frame">
              <img src={portfolio.profile.image} alt={`${portfolio.profile.name}, technology consultant`} />
              <div className="image-label">
                <span>Software</span><span>Data</span><span>Consulting</span>
              </div>
            </div>
            <div className="code-card">
              <div><i /><i /><i /></div>
              <code><b>const</b> expertise = [</code>
              <code>&nbsp;&nbsp;"build", "analyse",</code>
              <code>&nbsp;&nbsp;"transform"</code>
              <code>];</code>
            </div>
          </div>
        </section>

        <section className="stats-strip" aria-label="Career highlights">
          <div><strong>{portfolio.profile.years}</strong><span>Years of experience</span></div>
          <div><strong>{portfolio.profile.projects}+</strong><span>Projects delivered</span></div>
          <div><strong>{portfolio.profile.clients}</strong><span>Clients supported</span></div>
          <div className="stats-note"><Sparkles size={20} /><span>Combining technical depth with business clarity.</span></div>
        </section>

        <section id="expertise" className="section expertise-section">
          <div className="section-heading">
            <div><span className="section-index">01 / EXPERTISE</span><h2>One partner.<br />Three disciplines.</h2></div>
            <p>From first idea to working system, I bridge the gaps between engineering, data and technology strategy.</p>
          </div>
          <div className="service-grid">
            {portfolio.services.map((service, index) => {
              const Icon = [Code2, BarChart3, Layers3][index % 3]
              return (
                <article className="service-card" key={service.id}>
                  <div className="service-top"><span>{service.number}</span><Icon size={26} /></div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <div className="tag-row">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                  <Link className="service-link" to={`/services/${['software-development', 'data-intelligence', 'ict-consulting'][index]}`}>
                    View case studies <ArrowRight size={16} />
                  </Link>
                </article>
              )
            })}
          </div>
          <div className="skills-marquee">
            {portfolio.skills.map((skill) => <span key={skill}>{skill}<i /></span>)}
          </div>
        </section>

        <section id="work" className="section work-section">
          <div className="section-heading compact">
            <div><span className="section-index">02 / SELECTED WORK</span><h2>Proof, not promises.</h2></div>
            <div className="filter-row">
              {categories.map((category) => (
                <button key={category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)}>{category}</button>
              ))}
            </div>
          </div>
          <div className="project-grid">
            {visibleProjects.map((project, index) => (
              <article className={`project-card accent-${project.accent}`} key={project.id}>
                <div className="project-art">
                  <div className="art-grid" />
                  <div className="project-number">0{index + 1}</div>
                  <div className="art-window">
                    <span /><span /><span />
                    <div className="chart-bars"><i /><i /><i /><i /><i /></div>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-meta"><span>{project.category}</span><span>{project.year}</span></div>
                  <h3>{project.title}</h3>
                  <p>{project.description}</p>
                  <div className="impact"><Check size={15} /> {project.impact}</div>
                  <div className="project-footer">
                    <div className="tag-row">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <a href={project.link} aria-label={`View ${project.title}`}><ArrowRight /></a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section experience-section">
          <div className="experience-intro">
            <span className="section-index">03 / EXPERIENCE</span>
            <h2>Built through doing.</h2>
            <p>A career shaped by solving practical technology problems across engineering, analytics and advisory work.</p>
            <a className="text-link light" href="#contact">Request my full résumé <ArrowRight size={18} /></a>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item, index) => (
              <article key={item.id}>
                <span className="timeline-index">0{index + 1}</span>
                <div>
                  <span className="period">{item.period}</span>
                  <h3>{item.role}</h3>
                  <h4>{item.company}</h4>
                  <p>{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <ContactSection email={portfolio.profile.email} />
      </main>

      <footer>
        <Logo />
        <p>Designing and building useful technology.</p>
        <div><a className="social-mark" href="#" aria-label="LinkedIn">in</a><a className="social-mark" href="#" aria-label="Github">gh</a><span>© {new Date().getFullYear()} {portfolio.profile.name}</span></div>
      </footer>

      {notice && <div className="toast"><Check size={18} /> {notice}</div>}
      {dashboardOpen && (
        <Dashboard
          portfolio={portfolio}
          session={session}
          onSessionChange={setSession}
          onClose={() => setDashboardOpen(false)}
          onSave={savePortfolio}
        />
      )}
    </div>
  )
}

function ContactSection({ email }: { email: string }) {
  const [status, setStatus] = useState('')
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setStatus('Sending…')
    const form = new FormData(event.currentTarget)
    const fields = Object.fromEntries(form)
    const messages = loadMessages()
    messages.unshift({
      id: crypto.randomUUID(),
      name: String(fields.name),
      email: String(fields.email),
      subject: String(fields.subject),
      message: String(fields.message),
      createdAt: new Date().toISOString(),
    })
    localStorage.setItem(messageStorageKey, JSON.stringify(messages))
    setStatus('Message saved. I’ll be in touch soon.')
    event.currentTarget.reset()
  }
  return (
    <section id="contact" className="section contact-section">
      <div className="contact-copy">
        <span className="section-index">04 / CONTACT</span>
        <h2>Have a challenge worth solving?</h2>
        <p>Tell me what you’re working on, where you’re stuck, and what success looks like. I’ll reply within two working days.</p>
        <a href={`mailto:${email}`}><Mail size={18} /> {email}</a>
      </div>
      <form onSubmit={submit}>
        <div className="form-row">
          <label>Name<input name="name" placeholder="Your name" required /></label>
          <label>Email<input name="email" type="email" placeholder="you@company.com" required /></label>
        </div>
        <label>I'm interested in
          <select name="subject" defaultValue="Software development">
            <option>Software development</option><option>Data & analytics</option><option>ICT consulting</option><option>Something else</option>
          </select>
        </label>
        <label>Project details<textarea name="message" placeholder="A little context about your project, timeline and goals…" rows={5} required /></label>
        <button className="primary-button" type="submit">Send enquiry <ArrowRight size={18} /></button>
        {status && <span className="form-status">{status}</span>}
      </form>
    </section>
  )
}

function Dashboard({
  portfolio,
  session,
  onSessionChange,
  onClose,
  onSave,
}: {
  portfolio: Portfolio
  session: boolean
  onSessionChange: (authenticated: boolean) => void
  onClose: () => void
  onSave: (portfolio: Portfolio) => Promise<void>
}) {
  const [draft, setDraft] = useState<Portfolio>(structuredClone(portfolio))
  const [tab, setTab] = useState<'profile' | 'services' | 'projects' | 'experience' | 'messages'>('profile')
  const [authError, setAuthError] = useState('')
  const [saving, setSaving] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])

  useEffect(() => {
    if (session && tab === 'messages') {
      setMessages(loadMessages())
    }
  }, [session, tab])

  function authenticate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setAuthError('')
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email'))
    const password = String(data.get('password'))
    if (email === demoEmail && password === demoPassword) {
      sessionStorage.setItem(demoSessionKey, 'true')
      onSessionChange(true)
    } else {
      setAuthError('Use the demo email and password shown below.')
    }
  }

  async function save() {
    setSaving(true)
    try { await onSave(draft) } finally { setSaving(false) }
  }

  if (!session) {
    return (
      <div className="dashboard-overlay">
        <div className="auth-panel">
          <button className="close-button" onClick={onClose}><X /></button>
          <div className="auth-icon"><LockKeyhole /></div>
          <span className="section-index">LOCAL DEMO WORKSPACE</span>
          <h2>Portfolio manager</h2>
          <p>Use the temporary demo login below. Content is stored only in this browser until you connect a production backend.</p>
          <div className="demo-credentials"><span>Email</span><strong>{demoEmail}</strong><span>Password</span><strong>{demoPassword}</strong></div>
          <form onSubmit={authenticate}>
            <label>Email<input name="email" type="email" defaultValue={demoEmail} required /></label>
            <label>Password<input name="password" type="password" defaultValue={demoPassword} required /></label>
            <button className="primary-button" type="submit">Enter manager <ArrowRight size={18} /></button>
          </form>
          {authError && <div className="auth-error">{authError}</div>}
        </div>
      </div>
    )
  }

  return (
    <div className="dashboard-overlay">
      <aside className="dashboard-sidebar">
        <Logo />
        <div className="dashboard-title"><span>CONTENT STUDIO</span><strong>Portfolio manager</strong></div>
        <nav>
          <button className={tab === 'profile' ? 'active' : ''} onClick={() => setTab('profile')}><Settings2 /> Profile & expertise</button>
          <button className={tab === 'services' ? 'active' : ''} onClick={() => setTab('services')}><Code2 /> Service pages</button>
          <button className={tab === 'projects' ? 'active' : ''} onClick={() => setTab('projects')}><BriefcaseBusiness /> Projects</button>
          <button className={tab === 'experience' ? 'active' : ''} onClick={() => setTab('experience')}><Layers3 /> Experience</button>
          <button className={tab === 'messages' ? 'active' : ''} onClick={() => setTab('messages')}><MessageSquare /> Enquiries</button>
        </nav>
        <button className="signout" onClick={() => { sessionStorage.removeItem(demoSessionKey); onSessionChange(false) }}><LogOut /> Sign out</button>
      </aside>
      <div className="dashboard-main">
        <header><div><span>Manage content</span><h2>{tab[0].toUpperCase() + tab.slice(1)}</h2></div><div><button className="close-button inline" onClick={onClose}><X /></button>{tab !== 'messages' && <button className="save-button" onClick={save} disabled={saving}><Save /> {saving ? 'Saving…' : 'Publish changes'}</button>}</div></header>
        <div className="dashboard-content">
          {tab === 'profile' && <ProfileEditor draft={draft} setDraft={setDraft} />}
          {tab === 'services' && <ServicesEditor draft={draft} setDraft={setDraft} />}
          {tab === 'projects' && <ProjectsEditor draft={draft} setDraft={setDraft} />}
          {tab === 'experience' && <ExperienceEditor draft={draft} setDraft={setDraft} />}
          {tab === 'messages' && <MessagesView messages={messages} />}
        </div>
      </div>
    </div>
  )
}

function ProfileEditor({ draft, setDraft }: { draft: Portfolio; setDraft: (portfolio: Portfolio) => void }) {
  const update = (key: keyof Portfolio['profile'], value: string) => setDraft({ ...draft, profile: { ...draft.profile, [key]: value } })
  return (
    <>
      <div className="editor-card">
        <div className="editor-card-title"><h3>Public profile</h3><span>Shown in the opening section</span></div>
        <div className="editor-grid">
          <label>Name<input value={draft.profile.name} onChange={(event) => update('name', event.target.value)} /></label>
          <label>Availability line<input value={draft.profile.eyebrow} onChange={(event) => update('eyebrow', event.target.value)} /></label>
          <label className="wide">Headline<textarea rows={2} value={draft.profile.headline} onChange={(event) => update('headline', event.target.value)} /></label>
          <label className="wide">Introduction<textarea rows={4} value={draft.profile.intro} onChange={(event) => update('intro', event.target.value)} /></label>
          <label>Location<input value={draft.profile.location} onChange={(event) => update('location', event.target.value)} /></label>
          <label>Public email<input value={draft.profile.email} onChange={(event) => update('email', event.target.value)} /></label>
          <label className="wide">Portrait image URL<input value={draft.profile.image} onChange={(event) => update('image', event.target.value)} /></label>
        </div>
      </div>
      <div className="editor-card">
        <div className="editor-card-title"><h3>Skills</h3><span>Separate skills with commas</span></div>
        <label>Skills<input value={draft.skills.join(', ')} onChange={(event) => setDraft({ ...draft, skills: event.target.value.split(',').map((skill) => skill.trim()).filter(Boolean) })} /></label>
      </div>
    </>
  )
}

function ServicesEditor({ draft, setDraft }: { draft: Portfolio; setDraft: (portfolio: Portfolio) => void }) {
  const [selectedId, setSelectedId] = useState(draft.services[0]?.id ?? '')
  const service = draft.services.find((item) => item.id === selectedId) ?? draft.services[0]

  if (!service) return null

  const updateService = (updates: Partial<Service>) => {
    setDraft({ ...draft, services: draft.services.map((item) => item.id === service.id ? { ...item, ...updates } : item) })
  }
  const expertise = service.expertise ?? []
  const experiences = service.experiences ?? []
  const updateExpertise = (id: string, key: keyof ServiceExpertise, value: string) => {
    updateService({ expertise: expertise.map((item) => item.id === id ? { ...item, [key]: value } : item) })
  }
  const updateExperience = (id: string, key: keyof ServiceExperience, value: string) => {
    updateService({ experiences: experiences.map((item) => item.id === id ? { ...item, [key]: value } : item) })
  }

  return (
    <>
      <div className="service-editor-tabs">
        {draft.services.map((item) => <button className={item.id === service.id ? 'active' : ''} key={item.id} onClick={() => setSelectedId(item.id)}>{item.title}</button>)}
      </div>
      <div className="editor-card">
        <div className="editor-card-title"><h3>{service.title} overview</h3><span>Page introduction and capabilities</span></div>
        <div className="editor-grid">
          <label className="wide">Description<textarea rows={3} value={service.description} onChange={(event) => updateService({ description: event.target.value })} /></label>
          <label className="wide">Capability tags<input value={service.tags.join(', ')} onChange={(event) => updateService({ tags: event.target.value.split(',').map((tag) => tag.trim()).filter(Boolean) })} /><small>Separate capabilities with commas.</small></label>
        </div>
      </div>

      <div className="editor-section-heading">
        <div><h3>Expertise</h3><p>Add specialist capabilities, credentials, articles, demos, or other proof of expertise.</p></div>
        <button onClick={() => updateService({ expertise: [...expertise, { id: crypto.randomUUID(), title: 'New expertise', description: 'Explain this capability and the value it creates.', link: '', linkLabel: 'Learn more' }] })}><Plus /> Add expertise</button>
      </div>
      {expertise.map((item) => (
        <div className="editor-card" key={item.id}>
          <div className="editor-card-title"><h3>{item.title}</h3><button className="delete-button" onClick={() => updateService({ expertise: expertise.filter((entry) => entry.id !== item.id) })}><Trash2 /></button></div>
          <div className="editor-grid">
            <label>Expertise title<input value={item.title} onChange={(event) => updateExpertise(item.id, 'title', event.target.value)} /></label>
            <label>Link label<input value={item.linkLabel} onChange={(event) => updateExpertise(item.id, 'linkLabel', event.target.value)} /></label>
            <label className="wide">Description<textarea rows={3} value={item.description} onChange={(event) => updateExpertise(item.id, 'description', event.target.value)} /></label>
            <label className="wide">External link<input type="url" placeholder="https://…" value={item.link} onChange={(event) => updateExpertise(item.id, 'link', event.target.value)} /></label>
          </div>
        </div>
      ))}

      <div className="editor-section-heading">
        <div><h3>Experience</h3><p>Add relevant engagements, responsibilities, achievements, or client outcomes for this service.</p></div>
        <button onClick={() => updateService({ experiences: [...experiences, { id: crypto.randomUUID(), title: 'New experience', organization: 'Client or organization', period: new Date().getFullYear().toString(), description: 'Describe the engagement and its outcome.', link: '', linkLabel: 'View work' }] })}><Plus /> Add experience</button>
      </div>
      {experiences.map((item) => (
        <div className="editor-card" key={item.id}>
          <div className="editor-card-title"><h3>{item.title}</h3><button className="delete-button" onClick={() => updateService({ experiences: experiences.filter((entry) => entry.id !== item.id) })}><Trash2 /></button></div>
          <div className="editor-grid">
            <label>Experience title<input value={item.title} onChange={(event) => updateExperience(item.id, 'title', event.target.value)} /></label>
            <label>Organization or client<input value={item.organization} onChange={(event) => updateExperience(item.id, 'organization', event.target.value)} /></label>
            <label>Period<input value={item.period} onChange={(event) => updateExperience(item.id, 'period', event.target.value)} /></label>
            <label>Link label<input value={item.linkLabel} onChange={(event) => updateExperience(item.id, 'linkLabel', event.target.value)} /></label>
            <label className="wide">Description<textarea rows={3} value={item.description} onChange={(event) => updateExperience(item.id, 'description', event.target.value)} /></label>
            <label className="wide">External link<input type="url" placeholder="https://…" value={item.link} onChange={(event) => updateExperience(item.id, 'link', event.target.value)} /></label>
          </div>
        </div>
      ))}
    </>
  )
}

function ProjectsEditor({ draft, setDraft }: { draft: Portfolio; setDraft: (portfolio: Portfolio) => void }) {
  const add = () => setDraft({ ...draft, projects: [...draft.projects, { id: crypto.randomUUID(), title: 'New project', category: 'Software', year: new Date().getFullYear().toString(), description: 'Describe the challenge, your approach and the outcome.', impact: 'Add a measurable result', accent: 'lime', featured: true, link: '#', tags: ['New'], snapshotUrls: [] }] })
  const update = (id: string, key: keyof Project, value: string) => setDraft({ ...draft, projects: draft.projects.map((project) => project.id === id ? { ...project, [key]: key === 'tags' || key === 'snapshotUrls' ? value.split(',').map((item) => item.trim()).filter(Boolean) : value } : project) })
  return (
    <>
      <div className="editor-toolbar"><p>{draft.projects.length} projects in your portfolio</p><button onClick={add}><Plus /> Add project</button></div>
      {draft.projects.map((project) => (
        <div className="editor-card project-editor" key={project.id}>
          <div className="editor-card-title"><h3>{project.title}</h3><button className="delete-button" onClick={() => setDraft({ ...draft, projects: draft.projects.filter((item) => item.id !== project.id) })}><Trash2 /></button></div>
          <div className="editor-grid">
            <label>Project title<input value={project.title} onChange={(event) => update(project.id, 'title', event.target.value)} /></label>
            <label>Category<select value={project.category} onChange={(event) => update(project.id, 'category', event.target.value)}><option>Software</option><option>Data</option><option>Consulting</option></select></label>
            <label>Year<input value={project.year} onChange={(event) => update(project.id, 'year', event.target.value)} /></label>
            <label>Impact<input value={project.impact} onChange={(event) => update(project.id, 'impact', event.target.value)} /></label>
            <label className="wide">Project link<input type="url" placeholder="https://your-live-project.com" value={project.link === '#' ? '' : project.link} onChange={(event) => update(project.id, 'link', event.target.value)} /><small>Add a live website, repository, dashboard, video, or case-study link.</small></label>
            <label className="wide">Description<textarea rows={3} value={project.description} onChange={(event) => update(project.id, 'description', event.target.value)} /></label>
            <label className="wide">Tags<input value={project.tags.join(', ')} onChange={(event) => update(project.id, 'tags', event.target.value)} /></label>
            <label className="wide">Work snapshot URLs<input placeholder="https://…/dashboard.jpg, https://…/mobile-app.jpg" value={(project.snapshotUrls ?? []).join(', ')} onChange={(event) => update(project.id, 'snapshotUrls', event.target.value)} /><small>Add direct image URLs separated by commas. They appear on the matching service page.</small></label>
          </div>
        </div>
      ))}
    </>
  )
}

function ExperienceEditor({ draft, setDraft }: { draft: Portfolio; setDraft: (portfolio: Portfolio) => void }) {
  const add = () => setDraft({ ...draft, experience: [...draft.experience, { id: crypto.randomUUID(), period: '2025 — Present', role: 'New role', company: 'Company', description: 'Describe your responsibilities and impact.' }] })
  const update = (id: string, key: keyof Experience, value: string) => setDraft({ ...draft, experience: draft.experience.map((item) => item.id === id ? { ...item, [key]: value } : item) })
  return (
    <>
      <div className="editor-toolbar"><p>Your professional timeline</p><button onClick={add}><Plus /> Add experience</button></div>
      {draft.experience.map((item) => (
        <div className="editor-card" key={item.id}>
          <div className="editor-card-title"><h3>{item.role}</h3><button className="delete-button" onClick={() => setDraft({ ...draft, experience: draft.experience.filter((experience) => experience.id !== item.id) })}><Trash2 /></button></div>
          <div className="editor-grid">
            <label>Period<input value={item.period} onChange={(event) => update(item.id, 'period', event.target.value)} /></label>
            <label>Company<input value={item.company} onChange={(event) => update(item.id, 'company', event.target.value)} /></label>
            <label className="wide">Role<input value={item.role} onChange={(event) => update(item.id, 'role', event.target.value)} /></label>
            <label className="wide">Description<textarea rows={3} value={item.description} onChange={(event) => update(item.id, 'description', event.target.value)} /></label>
          </div>
        </div>
      ))}
    </>
  )
}

function MessagesView({ messages }: { messages: Message[] }) {
  if (!messages.length) return <div className="empty-state"><MessageSquare /><h3>No enquiries yet</h3><p>Messages from your contact form will appear here.</p></div>
  return <div className="message-list">{messages.map((message) => <article key={message.id}><div><strong>{message.name}</strong><a href={`mailto:${message.email}`}>{message.email}</a></div><span>{new Date(message.createdAt).toLocaleDateString()}</span><h3>{message.subject}</h3><p>{message.message}</p></article>)}</div>
}

// Preserve compatibility with the original Vite entry module during hot reloads.
export default PortfolioHome
