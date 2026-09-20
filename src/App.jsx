import { useEffect, useState } from 'react';
import { FiArrowUpRight, FiArrowRight, FiArrowDown, FiGithub, FiLinkedin, FiMail, FiDownload, FiMapPin, FiMenu, FiX, FiCopy, FiCheck, FiCode, FiLayers, FiDatabase, FiTerminal, FiCpu, FiZap, FiPause, FiPlay } from 'react-icons/fi';
import { SiRust, SiPython, SiReact, SiDjango, SiFastapi, SiJavascript, SiMysql, SiGit } from 'react-icons/si';
import './App.css';
import PortfolioTerminal from './components/PortfolioTerminal';
import useScrollMotion from './hooks/useScrollMotion';
import { github, email, projects, contactEmailHref, exploration } from './portfolioData';

const layers = [
  { name: 'Frontend', icon: FiCode, tools: 'React · Next.js', detail: 'Thoughtful interfaces. Responsive layouts, reusable components, and clear interactions.' },
  { name: 'Backend', icon: FiCpu, tools: 'Rust · Python · FastAPI', detail: 'Reliable at the core. Async services, secure REST APIs, and maintainable business logic.' },
  { name: 'Data', icon: FiDatabase, tools: 'MySQL · MongoDB', detail: 'Structure that makes sense. Intentional data models and database-driven workflows.' },
];
const experience = [
  {
    date: 'JAN 2026 — PRESENT',
    company: 'Salubrious Technologies',
    role: 'Software Engineer',
    location: 'Lucknow',
    description: 'Building Rust backend services and REST APIs for the Patient Relief Portal, with a focus on async workflows, structured healthcare data, and production reliability.',
    tags: ['Rust', 'Async & concurrency', 'Healthcare'],
    current: true,
    work: {
      title: 'Patient Relief Portal',
      category: 'HEALTHCARE / BACKEND ENGINEERING',
      overview: 'A healthcare portal for managing patient records and tracking patient relief percentages, with structured data handling across backend workflows.',
      contributions: [
        'Developed and maintained backend services in Rust for patient management and relief percentage tracking.',
        'Designed RESTful APIs to manage patient records and make structured healthcare data available to the application.',
        'Used async programming and concurrency concepts to support reliable, high-performance workflows.',
        'Improved service logic and backend architecture for maintainability, debugging, and production readiness.',
      ],
      focus: 'Reliable healthcare workflows, clear service boundaries, and maintainable backend logic.',
      stack: ['Rust', 'REST APIs', 'Async programming', 'Concurrency'],
    },
  },
  {
    date: 'MAY 2025 — DEC 2025',
    company: 'WealthFino Capital',
    role: 'Software Engineer',
    location: 'Bangalore',
    description: 'Developed an internal fintech business portal and full-stack features, connecting secure APIs with database-driven workflows and React interfaces.',
    tags: ['FastAPI', 'Django', 'React', 'Fintech'],
    work: {
      title: 'Internal Fintech Business Portal',
      category: 'FINTECH / FULL-STACK DEVELOPMENT',
      overview: 'An internal business portal supporting fintech operations, business workflows, and backend process management.',
      contributions: [
        'Developed backend services with FastAPI to support internal operations and process management.',
        'Designed and integrated RESTful APIs for secure communication between backend services and frontend interfaces.',
        'Built full-stack features using FastAPI, Django, and React.',
        'Implemented database-driven business logic and API integrations for the portal’s workflows.',
      ],
      focus: 'Connecting business workflows with secure APIs and usable frontend features.',
      stack: ['Python', 'FastAPI', 'Django', 'React', 'REST APIs'],
    },
  },
  {
    date: 'DEC 2024 — MAY 2025',
    company: 'Analyze Infotech',
    role: 'Software Engineering Intern',
    location: 'Lucknow',
    description: 'Developed web application features with Python and Django, supporting API development, debugging, and testing across backend modules.',
    tags: ['Python', 'Django', 'API development'],
    work: {
      title: 'Web Application Contributions',
      category: 'INTERNSHIP / CONTRIBUTIONS',
      overview: 'Contributed to web application features and backend modules as part of the engineering team.',
      contributions: [
        'Assisted in developing web application features with Python, Django, and related backend technologies.',
        'Supported API development for application modules and backend workflows.',
        'Helped debug and test application features alongside the team.',
      ],
      focus: 'Practical experience with backend development, debugging, testing, and team-based delivery.',
      stack: ['Python', 'Django', 'API development', 'Debugging & testing'],
      isContribution: true,
    },
  },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [filter, setFilter] = useState('All projects');
  const [layer, setLayer] = useState(1);
  const [motionPaused, setMotionPaused] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyMessage, setCopyMessage] = useState('');
  const scrollProgressRef = useScrollMotion(filter);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
    }, { rootMargin: '-15% 0px -65% 0px' });
    document.querySelectorAll('main > section[id]').forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => { setCopied(false); setCopyMessage(''); }, 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  useEffect(() => {
    const close = (event) => { if (event.key === 'Escape') setMenuOpen(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, []);

  async function copyEmail() {
    try { await navigator.clipboard.writeText(email); setCopied(true); setCopyMessage('Email copied to clipboard.'); }
    catch { setCopyMessage('Please copy the email address shown above.'); }
  }

  const ActiveLayerIcon = layers[layer].icon;
  const filtered = projects.filter(project => filter === 'All projects' || project.filters.includes(filter));

  return (
    <>
      <div className="scroll-progress" aria-hidden="true"><div ref={scrollProgressRef} /></div>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="header">
        <div className="nav-shell">
          <a href="#home" className="brand" aria-label="Suraj Tiwari home"><span className="brand-symbol">s<span>t</span>.</span><span>suraj tiwari<span className="brand-dot">.</span></span></a>
          <nav aria-label="Main navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} id="main-navigation">
            {[['home', 'Home'], ['about', 'About'], ['projects', 'Projects'], ['experience', 'Experience']].map(([id, name]) => <a key={id} href={`#${id}`} className={active === id ? 'active' : ''} aria-current={active === id ? 'location' : undefined} onClick={() => setMenuOpen(false)}>{name}</a>)}
          </nav>
          <a className="nav-contact" href={contactEmailHref}>Let’s talk <FiArrowUpRight /></a>
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-expanded={menuOpen} aria-controls="main-navigation" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? <FiX /> : <FiMenu />}</button>
        </div>
      </header>

      <main id="main">
        <section className="hero section-shell" id="home">
          <div className="hero-copy">
            <div className="eyebrow hero-eyebrow"><span className="status-dot" /> SOFTWARE ENGINEER & CREATIVE PROBLEM SOLVER</div>
            <h1>Good ideas.<br />Great systems.<br /><span>Real impact.</span><span className="heading-spark" aria-hidden="true">✳</span></h1>
            <p className="hero-intro">Hey, I’m <strong>Suraj.</strong> I turn complex problems into dependable software — from thoughtful interfaces to the systems that power them.</p>
            <div className="hero-actions"><a className="button primary" href="#projects">Explore my work <FiArrowUpRight /></a><a className="button secondary" href="/resume/Suraj_Tiwari.pdf" download>Download resume <FiDownload /></a></div>
            <div className="hero-social"><span><FiMapPin /> Lucknow, India</span><span className="social-divider" /><a href={github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><FiGithub /></a><a href="https://www.linkedin.com/in/suraj-tiwari-a9277626a/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><FiLinkedin /></a><a href={contactEmailHref} aria-label="Email Suraj"><FiMail /></a></div>
          </div>
          <div className="system-explorer" data-motion={motionPaused ? 'paused' : 'running'}>
          <div className="system-art">
            <div className="art-topline"><span><span className="small-cross">+</span> SELECT A LAYER TO EXPLORE</span><span>FIG. 01</span></div>
            <div className="orbit orbit-one" /><div className="orbit orbit-two" />
            <div className="orbit-label label-top">IDEA → ARCHITECTURE → IMPACT</div>
            <div className="core"><div className="core-inner"><span className="code-mark">&lt;<span>st</span> /&gt;</span><span>BUILT WITH INTENT</span></div></div>
            <svg className="connections" viewBox="0 0 550 450" fill="none" aria-hidden="true">
              {['M139 94 L139 110 L275 110 L275 198', 'M275 198 L406 198 L406 256', 'M275 230 L275 340 L157 340'].map((path, index) => (
                <g key={path} className={layer === index ? 'signal-path active' : 'signal-path'}>
                  <path d={path} />
                  {!motionPaused && <circle r={layer === index ? 4 : 2.5} fill="currentColor" stroke="none">
                    <animateMotion dur={`${3 + index}s`} repeatCount="indefinite" path={path} />
                  </circle>}
                </g>
              ))}
            </svg>
            {layers.map((item, index) => <button key={item.name} className={`system-node node-${index} ${layer === index ? 'selected' : ''}`} onClick={() => setLayer(index)} aria-pressed={layer === index} aria-controls="system-layer-description"><span className="node-icon"><item.icon /></span><span><strong>{item.name}</strong><small>{item.tools}</small></span><span className="node-dot" /></button>)}
            <span className="floating-code code-one">{'{ }'}</span><span className="floating-code code-two">+</span><span className="floating-code code-three">⌘</span>
          </div>
            <div className="system-caption" id="system-layer-description" aria-live="polite" aria-atomic="true">
              <div className="layer-description" key={layer}>
                <span className="layer-reveal-line" aria-hidden="true" />
                <div className="layer-description-heading">
                  <span className="layer-description-icon"><ActiveLayerIcon aria-hidden="true" /></span>
                  <h2>{layers[layer].name}</h2>
                  <span className="layer-description-count" aria-hidden="true">0{layer + 1} / 03</span>
                </div>
                <p>{layers[layer].detail}</p>
              </div>
            </div>
            <div className="art-bottomline"><span><span className="status-dot" /> ALWAYS BUILDING. ALWAYS LEARNING.</span><button className="diagram-motion-toggle" type="button" onClick={() => setMotionPaused(paused => !paused)} aria-pressed={motionPaused} aria-label="Pause diagram animations">{motionPaused ? <FiPlay aria-hidden="true" /> : <FiPause aria-hidden="true" />}<span>{motionPaused ? 'Resume motion' : 'Pause motion'}</span></button></div>
          </div>
          <div className="hero-bottom"><a href="#projects"><span className="scroll-icon"><FiArrowDown /></span> SCROLL TO EXPLORE</a><span>CODE WITH PURPOSE. BUILD WITH CARE.</span></div>
        </section>

        <div className="stack-strip"><div className="section-shell stack-content"><span className="stack-label">MY EVERYDAY TOOLKIT</span>{[[SiRust, 'Rust'], [SiPython, 'Python'], [SiReact, 'React'], [SiFastapi, 'FastAPI'], [SiDjango, 'Django'], [SiJavascript, 'JavaScript']].map(([Icon, name]) => <span className="stack-item" key={name}><Icon />{name}</span>)}</div></div>

        <section className="section-shell projects-section" id="projects">
          <div className="section-heading"><div><div className="eyebrow"><span className="orange-slash">/</span> 01 — SELECTED WORK</div><h2>Built to solve.<br className="mobile-break" /> <span>Made to matter.</span></h2></div><a className="text-link" href={`${github}?tab=repositories`} target="_blank" rel="noreferrer">All repositories <FiArrowUpRight /></a></div>
          <div className="project-toolbar"><p>A few things I’ve put my mind and keyboard into.</p><div className="filters" role="group" aria-label="Filter projects">{['All projects', 'AI & Agents', 'Backend', 'Frontend'].map(item => <button key={item} className={filter === item ? 'selected' : ''} aria-pressed={filter === item} onClick={() => setFilter(item)}>{item}</button>)}</div></div>
          <div className="project-grid">
            {filtered.map((project) => <article className={`project-card ${project.id}`} key={project.id}>
              <a className="project-visual" href={`${github}/${project.repo}`} target="_blank" rel="noreferrer" aria-label={`Explore ${project.name} on GitHub`}>
                <span className="visual-tag">{project.type}</span><span className="visual-link"><FiArrowUpRight /></span>
                {project.id === 'quiz' && <div className="quiz-preview"><div className="preview-brand"><FiZap /> QuizGenie <span>LEARN. PLAY. REPEAT.</span></div><div className="quiz-question"><span>LET CURIOSITY LEAD.</span><strong>A little challenge.<br />A lot of discovery.</strong><div className="quiz-options"><span><i>A</i> Pick a topic</span><span className="answer"><i>B</i> Unlock your knowledge <FiCheck /></span></div></div><span className="preview-foot">POWERED BY AI <span>✦</span></span></div>}
                {project.id === 'social' && <div className="api-preview"><div className="api-title"><span className="terminal-dots">● ● ●</span><span>social / api.py</span></div><div className="api-code"><span className="code-comment"># Behind every connection.</span><p><span className="purple">class</span> <span className="yellow">SocialAPI</span>:</p><p>&nbsp; users <span className="muted">=</span> <span className="green">UserService()</span></p><p>&nbsp; media <span className="muted">=</span> <span className="green">MediaService()</span></p><p>&nbsp; feeds <span className="muted">=</span> <span className="green">FeedService()</span></p><div className="api-response"><span>GET</span> /api/feed/ <strong>200 OK <FiCheck /></strong></div></div></div>}
                {project.id === 'food' && <div className="food-preview"><div className="food-top"><strong>food<span>express.</span></strong><span>Fresh finds. Good food.</span></div><div className="food-body"><div><span>YOUR NEXT CRAVING</span><strong>Good food.<br />Great mood.</strong><span className="food-order">Explore the menu <FiArrowRight /></span></div><div className="food-plate"><span>🥗</span></div></div><div className="food-categories"><span>✦ Freshly made</span><span>♡ Made for you</span></div></div>}
                <span className="illustration-label">PROJECT CONCEPT VISUAL</span>
              </a>
              <div className="project-info"><div className="project-name"><h3>{project.name}</h3><FiArrowUpRight /></div><p>{project.description}</p><div className="tags">{project.stack.map(tag => <span key={tag}>{tag}</span>)}</div><div className="project-footer"><span><span className={`tiny-dot ${project.id === 'quiz' ? 'in-progress' : ''}`} />{project.status}</span><a href={`${github}/${project.repo}`} target="_blank" rel="noreferrer">Code <FiGithub /></a>{project.live && <a href={project.live} target="_blank" rel="noreferrer">Live <FiArrowUpRight /></a>}</div></div>
            </article>)}
          </div>
          <span className="sr-only" role="status">{filtered.length} projects shown</span>
        </section>

        <section className="about-section" id="about"><div className="section-shell about-grid"><div className="about-photo"><div className="portrait-window"><img src="/Data/resume/profilepic.jpeg" alt="Suraj Tiwari" loading="lazy" /></div><div className="photo-note"><span>THE HUMAN BEHIND THE CODE</span><strong>Curious by default.<span>↗</span></strong></div><div className="photo-stamp">BASED IN INDIA <span>✳</span> BUILDING FOR THE WEB</div></div><div className="about-copy"><div className="eyebrow"><span className="orange-slash">/</span> 02 — A BIT ABOUT ME</div><h2>I care about what’s<br /><span>under the hood.</span></h2><p>I’m Suraj, a software engineer who enjoys connecting the dots between a good idea and a well-built product.</p><p>My work spans healthcare platforms, fintech workflows, and full-stack applications. I’m especially drawn to the backend: clear APIs, reliable systems, and code that the next person can understand.</p><p>Currently, I’m building with Rust at <strong>Salubrious Technologies</strong> and exploring AI-powered learning through QuizGenie.</p><div className="about-exploration">
              <h3>Curiosity beyond the stack.</h3>
              <div className="exploration-grid">
                {exploration.map((item, index) => (
                  <div className="exploration-item" key={item.title}>
                    <div className="exploration-title">{index === 0 ? <FiCpu aria-hidden="true" /> : <FiDatabase aria-hidden="true" />}<h4>{item.title}</h4></div>
                    <span className="exploration-label">{item.label}</span>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div><div className="about-facts"><div><FiLayers /><strong>Full-stack perspective</strong><span>From interface to infrastructure</span></div><div><FiCpu /><strong>Backend at heart</strong><span>Reliability in every layer</span></div></div></div></div></section>

        <PortfolioTerminal />

        <section className="section-shell experience-section" id="experience">
          <div className="section-heading">
            <div>
              <div className="eyebrow"><span className="orange-slash">/</span> 04 — THE JOURNEY SO FAR</div>
              <h2>Learning by <span>building.</span></h2>
            </div>
            <span className="section-aside">REAL TEAMS. REAL PROBLEMS. REAL GROWTH.</span>
          </div>
          <div className="timeline">
            {experience.map(job => (
              <article key={job.company} className="experience-row">
                <div className="experience-date">
                  <span className={job.current ? 'timeline-dot current' : 'timeline-dot'} />
                  <span>{job.date}</span>
                  {job.current && <span className="current-label">CURRENTLY HERE</span>}
                </div>
                <div className="experience-content">
                  <div className="experience-title">
                    <div><h3>{job.company}</h3><span>{job.role}</span></div>
                    <span><FiMapPin />{job.location}</span>
                  </div>
                  <p>{job.description}</p>
                  <div className="tags">{job.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                  <details className="work-details">
                    <summary aria-label={`${job.work.isContribution ? 'Contribution details' : 'Work project details'} at ${job.company}`}>
                      <FiLayers aria-hidden="true" />
                      <span className="work-toggle-closed">{job.work.isContribution ? 'View contributions' : 'View work project'}</span>
                      <span className="work-toggle-open">Hide details</span>
                      <FiArrowDown className="work-toggle-arrow" aria-hidden="true" />
                    </summary>
                    <div className="work-project">
                      <div className="work-project-category">{job.work.category}</div>
                      <h4>{job.work.title}</h4>
                      <p>{job.work.overview}</p>
                      <h5>My contributions</h5>
                      <ul>{job.work.contributions.map(contribution => <li key={contribution}>{contribution}</li>)}</ul>
                      <div className="work-project-focus">
                        <FiCpu aria-hidden="true" />
                        <div><h5>Engineering focus</h5><p>{job.work.focus}</p></div>
                      </div>
                      <h5>Technologies & practices</h5>
                      <div className="tags">{job.work.stack.map(tag => <span key={tag}>{tag}</span>)}</div>
                    </div>
                  </details>
                </div>
              </article>
            ))}
          </div>
          <div className="education">
            <div className="education-icon"><FiCode /></div>
            <div><span>THE FOUNDATION</span><h3>Bachelor of Computer Application</h3><p>IISE College · 2022 — 2025</p></div>
            <div className="certifications"><span>HACKERRANK CERTIFIED</span><p>React <span>↗</span> SQL <span>↗</span> Python <span>↗</span></p></div>
          </div>
        </section>

        <section className="skills-section section-shell" id="skills"><div><div className="eyebrow"><span className="orange-slash">/</span> 05 — TOOLS OF THE TRADE</div><h2>The right tools.<br /><span>A builder’s mindset.</span></h2><p>Different challenges, different stacks.<br />Always a foundation in the fundamentals.</p></div><div className="skill-grid">{[{ icon: SiRust, title: 'Languages', values: 'Rust · Python · JavaScript' }, { icon: FiTerminal, title: 'Backend & APIs', values: 'FastAPI · Django · DRF · Node.js · Express · REST · JWT' }, { icon: SiReact, title: 'Frontend', values: 'React · Next.js · HTML5 · CSS3' }, { icon: SiMysql, title: 'Databases', values: 'MySQL · MongoDB' }, { icon: SiGit, title: 'Developer tools', values: 'Git · GitHub · Postman · VS Code' }, { icon: FiLayers, title: 'Engineering', values: 'Async · Concurrency · System design · Data structures' }].map(item => <div className="skill-item" key={item.title}><item.icon /><h3>{item.title}</h3><p>{item.values}</p></div>)}</div></section>

        <section className="contact-section" id="contact"><div className="section-shell contact-inner"><div className="eyebrow"><span className="status-dot" /> GOOD WORK STARTS WITH A CONVERSATION</div><h2>Have something<br />in mind? <span>Let’s build it.</span><span className="contact-star" aria-hidden="true">✳</span></h2><p>A project, an opportunity, or just a conversation about good software.<br />I’d love to hear from you.</p><div className="contact-actions"><a className="button primary" href={contactEmailHref}>Say hello <FiArrowUpRight /></a><button className="copy-email" onClick={copyEmail}>{email}{copied ? <FiCheck /> : <FiCopy />}<span className="sr-only"> — Copy email address</span></button></div><p className="copy-status" role="status">{copyMessage}</p></div></section>
      </main>
      <footer className="section-shell footer"><a href="#home" className="brand">suraj tiwari<span className="brand-dot">.</span></a><p>Thoughtfully built. Always evolving. <span>© {new Date().getFullYear()}</span></p><div><a href={github} target="_blank" rel="noreferrer">GitHub <FiArrowUpRight /></a><a href="https://www.linkedin.com/in/suraj-tiwari-a9277626a/" target="_blank" rel="noreferrer">LinkedIn <FiArrowUpRight /></a><a href="#home" aria-label="Back to top" className="back-top">↑</a></div></footer>
    </>
  );
}

export default App;
