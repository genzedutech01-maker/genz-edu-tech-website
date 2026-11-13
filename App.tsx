import { useEffect, useMemo, useState } from 'react';
import {
  ArrowRight, BookOpen, BriefcaseBusiness, Check, ChevronDown, Code2,
  GraduationCap, Globe, Lightbulb, Mail, Menu, MessageCircle, Moon,
  Phone, Rocket, Sparkles, Sun, Target, Users, X
} from 'lucide-react';
import companyLogo from './assets/genz-logo.png';
import founderPhoto from './assets/founder-megadharshini.png';
import './index.css';

const PHONE = '916369216076';
const EMAIL = 'genzedutech@gmail.com';
const WEBSITE = 'https://genzedutech.in';
const INSTAGRAM = 'https://www.instagram.com/genz_edu_tech/';
const whatsapp = (message: string) => `https://wa.me/${PHONE}?text=${encodeURIComponent(message)}`;

type Course = {
  name: string; duration: string; fee: number; category: string; description: string;
  icon: typeof Lightbulb; syllabus: string[];
};

const courses: Course[] = [
  { name: 'Digital Marketing', duration: '30 days', fee: 2999, category: 'Digital Skills', description: 'Learn how to plan, promote and measure digital campaigns using practical activities.', icon: Lightbulb, syllabus: ['Digital marketing fundamentals and customer journeys', 'SEO basics and keyword research', 'Content strategy and campaign planning', 'Paid advertising concepts and budgeting', 'Analytics, reporting and a practical campaign plan'] },
  { name: 'Social Media Management', duration: '30 days', fee: 2499, category: 'Digital Skills', description: 'Plan content, manage social platforms and build an engaged online audience.', icon: Globe, syllabus: ['Platform selection and profile optimisation', 'Content calendars and creative briefs', 'Captions, hashtags and engagement', 'Community management and brand voice', 'Insights, reporting and a sample monthly plan'] },
  { name: 'Content Writing', duration: '20 days', fee: 1999, category: 'Digital Skills', description: 'Build clear writing, copywriting and digital content creation skills.', icon: BookOpen, syllabus: ['Writing fundamentals and audience research', 'Blogs, website copy and product descriptions', 'Headlines, calls to action and basic SEO writing', 'Editing, proofreading and tone of voice', 'Portfolio-ready writing samples'] },
  { name: 'AI Tools & Applications', duration: '60 days', fee: 8999, category: 'Digital Skills', description: 'Practise using AI tools for productivity, content and everyday workflows.', icon: Sparkles, syllabus: ['AI foundations and responsible use', 'Prompt writing and iterative improvement', 'Research, summarisation and document workflows', 'AI-assisted content and presentation creation', 'Productivity workflows and a final practical project'] },
  { name: 'Freelancing & Client Acquisition', duration: '20 days', fee: 2499, category: 'Career Skills', description: 'Learn to present your skills, approach clients and prepare professional proposals.', icon: BriefcaseBusiness, syllabus: ['Choosing a service and defining an offer', 'Portfolio and profile preparation', 'Finding and qualifying potential clients', 'Outreach messages, proposals and pricing basics', 'Client communication and delivery workflow'] },
  { name: 'Python Programming', duration: '60 days', fee: 14999, category: 'Programming', description: 'Build programming foundations through structured coding practice.', icon: Code2, syllabus: ['Setup, syntax, variables and data types', 'Conditions, loops and functions', 'Lists, tuples, dictionaries and sets', 'Files, exceptions and modules', 'Object-oriented basics and a practical project'] },
  { name: 'Java Programming', duration: '90 days', fee: 14499, category: 'Programming', description: 'Learn Java fundamentals, object-oriented programming and coding concepts.', icon: Code2, syllabus: ['Java setup, syntax and data types', 'Conditions, loops, arrays and methods', 'Classes, objects and constructors', 'Inheritance, polymorphism and interfaces', 'Collections, exceptions and a practical project'] },
  { name: 'HTML & CSS Web Development', duration: '30 days', fee: 7999, category: 'Programming', description: 'Create responsive websites and learn modern web layout fundamentals.', icon: Code2, syllabus: ['HTML structure, semantic elements and forms', 'CSS selectors, typography and spacing', 'Flexbox, Grid and responsive layouts', 'Navigation, cards and reusable components', 'Build and publish a responsive multi-section website'] },
  { name: 'Quantitative Aptitude', duration: '20 days', fee: 1999, category: 'Placement Preparation', description: 'Practise numerical reasoning and common placement aptitude topics.', icon: Target, syllabus: ['Number systems and simplification', 'Percentages, ratios and averages', 'Profit, loss, interest and time-work', 'Speed, distance and data interpretation', 'Timed practice tests and review strategies'] },
  { name: 'Verbal Ability', duration: '20 days', fee: 1499, category: 'Placement Preparation', description: 'Strengthen grammar, comprehension and verbal reasoning.', icon: BookOpen, syllabus: ['Grammar and sentence correction', 'Vocabulary and word usage', 'Reading comprehension', 'Sentence arrangement and verbal logic', 'Practice exercises and timed tests'] },
  { name: 'Placement Training', duration: '30 days', fee: 3999, category: 'Placement Preparation', description: 'Prepare for aptitude tests, interviews and professional communication.', icon: GraduationCap, syllabus: ['Placement process and job-readiness planning', 'Aptitude and reasoning practice', 'Resume structure and profile preparation', 'Interview questions and mock interview practice', 'Professional communication and action plan'] },
  { name: 'Career Awareness', duration: '7 days', fee: 499, category: 'Career Skills', description: 'Explore career pathways, skill requirements and practical next steps.', icon: Rocket, syllabus: ['Career interests and strengths', 'Career paths and skill requirements', 'Understanding courses, roles and industries', 'Building a practical learning roadmap', 'Personal next-step action plan'] },
];

const packages = [
  { name: 'Essential Website', price: '₹9,999', description: 'A professional starting point for small businesses.', features: ['Up to 3 pages', 'Responsive website design', 'About, services and contact sections', 'WhatsApp contact button', 'Basic on-page SEO', 'Deployment and launch support'] },
  { name: 'Business Website', price: '₹14,999', description: 'A stronger digital presence for growing businesses.', featured: true, features: ['Up to 6 pages', 'Custom branded design', 'Enquiry and WhatsApp integration', 'Basic SEO setup', 'Mobile optimisation', 'Deployment and launch testing'] },
  { name: 'Premium Business', price: '₹24,999', description: 'A distinctive website for established businesses.', features: ['Up to 10 pages', 'Custom design and animations', 'Portfolio or service sections', 'Enquiry integration', 'SEO foundations', 'Performance optimisation'] },
  { name: 'E-commerce Website', price: 'From ₹39,999', description: 'For businesses selling products online.', features: ['Product catalogue', 'Shopping cart and checkout', 'Payment gateway integration', 'Order management setup', 'Responsive storefront', 'Testing and deployment'] },
  { name: 'Custom Web Application', price: 'From ₹59,999', description: 'For custom portals, dashboards and workflows.', features: ['Custom frontend and backend', 'Database and authentication if required', 'Admin dashboard', 'Business-specific workflows', 'Integration testing', 'Deployment planning'] },
  { name: 'Website Maintenance', price: 'From ₹1,499/mo', description: 'Keep your existing website updated and maintained.', features: ['Routine content updates', 'Basic technical checks', 'Small design adjustments', 'Link and form checks', 'Support based on agreed scope'] },
];

const filters = ['All', 'Digital Skills', 'Programming', 'Career Skills', 'Placement Preparation'];

function SectionHeading({ eyebrow, title, description }: { eyebrow: string; title: string; description?: string }) {
  return <div className="section-heading"><span className="eyebrow">{eyebrow}</span><h2>{title}</h2>{description && <p>{description}</p>}</div>;
}
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [activeCourse, setActiveCourse] = useState<Course | null>(null);
  const [darkMode, setDarkMode] = useState(() => {
    try { return localStorage.getItem('genz-theme') === 'dark'; } catch { return false; }
  });

  useEffect(() => {
    try { localStorage.setItem('genz-theme', darkMode ? 'dark' : 'light'); } catch {}
  }, [darkMode]);

  const shownCourses = useMemo(
    () => filter === 'All' ? courses : courses.filter(c => c.category === filter),
    [filter]
  );

  const navLinks = [
    ['About', '#about'],
    ['Courses', '#courses'],
    ['CRT', '#crt'],
    ['Why Us', '#why-us'],
    ['GenZ Developers', '#developers'],
    ['Founder', '#founder'],
    ['Contact', '#contact']
  ];

  return <div className={`site ${darkMode ? 'dark-mode' : ''}`}>
    <div className="topline" />

    <header className="site-nav">
      <div className="nav-inner">
        <a className="brand" href="#home" onClick={() => setMenuOpen(false)}>
          <img src={companyLogo} alt="GenZ Edu Tech logo" />
          <span>GenZ Edu Tech<small>LEARN · BUILD · GROW</small></span>
        </a>

        <nav className={`nav-links ${menuOpen ? 'open' : ''}`} aria-label="Main navigation">
          {navLinks.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
          ))}
          <button
            className="theme-toggle"
            onClick={() => setDarkMode(v => !v)}
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
            <span>{darkMode ? 'Light' : 'Dark'}</span>
          </button>
          <a className="btn btn-primary nav-cta" href="#contact" onClick={() => setMenuOpen(false)}>
            Let's Talk <ArrowRight size={16} />
          </a>
        </nav>

        <button
          className="mobile-toggle"
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
        >
          {menuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="site-container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">PRACTICAL LEARNING · CAREER GROWTH</span>
            <h1>Build skills.<br /><span>Unlock your next.</span></h1>
            <p>Practical learning, career guidance and digital solutions designed to help students, job seekers and businesses move forward with confidence.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href="#courses">Explore Courses <ArrowRight size={18} /></a>
              <a className="btn btn-secondary" href="#developers">Build Your Website</a>
            </div>
            <div className="hero-points">
              <span><Check size={17} /> Practical-first learning</span>
              <span><Check size={17} /> Career-focused guidance</span>
              <span><Check size={17} /> Beginner-friendly support</span>
            </div>
          </div>

          <div className="hero-visual">
            <div className="orbit-card">
              <span className="visual-word">YOUR FUTURE STARTS HERE</span>
              <div className="visual-core"><img src={companyLogo} alt="GenZ Edu Tech" /></div>
              <span className="orbit-label label-one"><BookOpen size={17} /> Learn</span>
              <span className="orbit-label label-two"><Rocket size={17} /> Build</span>
              <span className="orbit-label label-three"><Target size={17} /> Grow</span>
            </div>
            <div className="floating-note">
              <Sparkles size={19} />
              <span><strong>Skills with purpose</strong><small>Learning made practical</small></span>
            </div>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="site-container trust-grid">
          <div><strong>Practical-first</strong><span>Learn by doing</span></div>
          <div><strong>Career guidance</strong><span>Find your direction</span></div>
          <div><strong>Digital solutions</strong><span>Build a stronger presence</span></div>
          <div><strong>Community impact</strong><span>Grow together</span></div>
        </div>
      </section>

      <section className="section about-section" id="about">
        <div className="site-container about-grid">
          <div className="about-visual">
            <div className="about-panel">
              <span className="eyebrow">OUR PURPOSE</span>
              <h3>Learning should lead to action.</h3>
              <p>We connect knowledge with practical skills, career awareness and real-world digital work.</p>
              <div className="mini-stat">
                <span className="stat-icon"><Lightbulb /></span>
                <span><strong>Learn with clarity</strong><small>Understand what to learn and why</small></span>
              </div>
              <div className="mini-stat">
                <span className="stat-icon"><Target /></span>
                <span><strong>Practise with purpose</strong><small>Build confidence through action</small></span>
              </div>
            </div>
          </div>

          <div className="about-copy">
            <span className="eyebrow">ABOUT GENZ EDU TECH</span>
            <h2>Bridging the gap between learning and opportunity.</h2>
            <p>GenZ Edu Tech is built around one simple idea: skills become valuable when people can apply them. We support learners with practical training, career guidance, freelancing awareness and job-readiness support.</p>
            <p>We also help businesses strengthen their digital presence through professional website development and ongoing support.</p>
            <div className="check-list">
              <span><Check /> Practical and beginner-friendly approach</span>
              <span><Check /> Career and freelancing awareness</span>
              <span><Check /> Digital services for growing businesses</span>
              <span><Check /> Community-minded learning</span>
            </div>
            <a className="text-link" href="#contact">Connect with our team <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="section courses-section" id="courses">
        <div className="site-container">
          <SectionHeading
            eyebrow="LEARN SOMETHING THAT MOVES YOU FORWARD"
            title="Courses built around practical skills"
            description="Choose a learning path, understand the syllabus and contact us for batch timings and enrolment details."
          />
          <div className="filter-row" role="group" aria-label="Filter courses">
            {filters.map(f => (
              <button key={f} className={`filter-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
          <div className="course-grid">
            {shownCourses.map(course => {
              const Icon = course.icon;
              return <article className="course-card" key={course.name}>
                <div className="course-card-top">
                  <span className="course-icon"><Icon size={23} /></span>
                  <span className="course-duration">{course.duration}</span>
                </div>
                <span className="course-category">{course.category}</span>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <div className="course-bottom">
                  <div><small>Course fee</small><strong>₹{course.fee.toLocaleString('en-IN')}</strong></div>
                  <button className="syllabus-btn" onClick={() => setActiveCourse(course)}>
                    Explore Syllabus <ArrowRight size={15} />
                  </button>
                </div>
                <a
                  className="course-enquire"
                  href={whatsapp(`Hello GenZ Edu Tech, I am interested in the ${course.name} course (${course.duration}). Please share the batch timings and enrolment details.`)}
                  target="_blank"
                  rel="noreferrer"
                >
                  Enquire on WhatsApp <MessageCircle size={15} />
                </a>
              </article>;
            })}
          </div>
          <p className="course-note">Course fees and batch availability may be confirmed with our team. Contact us for the current schedule and course details.</p>
        </div>
      </section>

      <section className="section tamil-learning-section" id="tamil-learning">
        <div className="site-container">
          <SectionHeading
            eyebrow="LANGUAGE LEARNING"
            title="Learn Tamil from anywhere in the world"
            description="Personalized online Tamil lessons for foreigners, non-native speakers and anyone interested in learning Tamil language and culture."
          />
          <div className="developer-intro">
            <div className="dev-intro-card">
              <span className="dev-symbol"><Globe size={27} /></span>
              <h3>Tamil for every learner</h3>
              <p>Start from the basics and build confidence in Tamil through practical, beginner-friendly lessons tailored to your goals.</p>
              <div className="check-list">
                <span><Check /> Everyday conversations and speaking</span>
                <span><Check /> Vocabulary, pronunciation and grammar</span>
                <span><Check /> Reading and writing basics</span>
                <span><Check /> Practical Tamil for real-life situations</span>
              </div>
            </div>
            <div className="dev-intro-copy">
              <h3>Learn at your own pace.</h3>
              <p>Course duration is flexible and will be planned according to your learning capacity, progress and goals. Classes are offered online with personalized guidance.</p>
              <p><strong>Hourly-based payment:</strong> Fee details will be shared upon inquiry based on your preferred learning plan and session requirements.</p>
              <a
                className="text-link"
                href={whatsapp('Hello GenZ Edu Tech, I am interested in learning Tamil. Please share the hourly fee details and help me plan classes according to my learning pace.')}
              >
                Enquire about Tamil classes <ArrowRight size={17} />
              </a>
            </div>
          </div>
        </div>
      </section>
            <section className="section crt-section" id="crt">
        <div className="site-container crt-grid">
          <div>
            <span className="eyebrow">CAREER READINESS TRAINING</span>
            <h2>Prepare with a plan, not guesswork.</h2>
            <p>Build confidence with structured aptitude practice, verbal ability, interview preparation and job-readiness guidance.</p>
            <a className="btn btn-light" href={whatsapp('Hello GenZ Edu Tech, I would like to know more about Career Readiness and Placement Training.')}>
              Ask about CRT <ArrowRight size={17} />
            </a>
          </div>
          <div className="crt-panel">
            {[
              'A structured preparation plan',
              'Quantitative aptitude practice',
              'Verbal ability and reasoning',
              'Resume and job-readiness guidance',
              'Interview and communication practice',
              'Progress review and next steps'
            ].map(item => (
              <div className="crt-item" key={item}><Check size={18} />{item}</div>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-section" id="why-us">
        <div className="site-container">
          <SectionHeading
            eyebrow="WHY GENZ EDU TECH"
            title="A practical approach to progress"
            description="Our focus is to make learning useful, approachable and connected to real goals."
          />
          <div className="benefit-grid">
            <article className="benefit-card">
              <span className="benefit-icon"><Lightbulb /></span>
              <h3>Practical-first</h3>
              <p>Work through exercises, examples and projects that turn concepts into usable skills.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-icon"><Users /></span>
              <h3>Beginner-friendly</h3>
              <p>Start with the basics and build up step by step with guidance along the way.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-icon"><Target /></span>
              <h3>Career-aware</h3>
              <p>Understand skill pathways, workplace expectations and practical next steps.</p>
            </article>
            <article className="benefit-card">
              <span className="benefit-icon"><Rocket /></span>
              <h3>Future-focused</h3>
              <p>Explore digital skills, freelancing and technology that can support your growth.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="section freelancing-section">
        <div className="site-container freelance-panel">
          <div>
            <span className="eyebrow">FROM SKILLS TO OPPORTUNITIES</span>
            <h2>Know your options. Build your path.</h2>
            <p>Explore freelancing, client communication, personal branding and career pathways with practical guidance.</p>
          </div>
          <a className="btn btn-primary" href={whatsapp('Hello GenZ Edu Tech, I would like career and freelancing guidance.')}>
            Get Guidance <ArrowRight size={17} />
          </a>
        </div>
      </section>

      <section className="section developers-section" id="developers">
        <div className="site-container">
          <SectionHeading
            eyebrow="GENZ DEVELOPERS"
            title="A better digital presence for your business"
            description="Professional, responsive websites designed to help customers understand your business and contact you easily."
          />
          <div className="developer-intro">
            <div className="dev-intro-card">
              <span className="dev-symbol"><Code2 size={27} /></span>
              <h3>Websites with a purpose</h3>
              <p>From a clean business website to an online store or custom web application, we can discuss the right scope for your needs.</p>
              <div className="check-list">
                <span><Check /> Mobile-responsive layouts</span>
                <span><Check /> Brand-focused design</span>
                <span><Check /> Clear enquiry and contact paths</span>
                <span><Check /> Deployment support</span>
              </div>
            </div>
            <div className="dev-intro-copy">
              <h3>Your business deserves more than a placeholder page.</h3>
              <p>We help small businesses present their services clearly, build trust with visitors and make it easier for potential customers to take the next step.</p>
              <a className="text-link" href={whatsapp('Hello GenZ Edu Tech, I am interested in website development. Please discuss my requirements.')}>
                Discuss your website idea <ArrowRight size={17} />
              </a>
            </div>
          </div>

          <div className="package-grid">
            {packages.map((pkg, i) => (
              <article key={pkg.name} className={`price-card ${'featured' in pkg && pkg.featured ? 'featured' : ''}`}>
                <div className="package-top">
                  {'featured' in pkg && pkg.featured
                    ? <span className="popular-tag">MOST REQUESTED</span>
                    : <span className="package-number">0{i + 1}</span>}
                  <h3>{pkg.name}</h3>
                  <p>{pkg.description}</p>
                  <strong className="package-price">{pkg.price}</strong>
                </div>
                <ul>
                  {pkg.features.map(feature => (
                    <li key={feature}><Check size={16} />{feature}</li>
                  ))}
                </ul>
                <a
                  className={`btn ${'featured' in pkg && pkg.featured ? 'btn-primary' : 'btn-secondary'}`}
                  href={whatsapp(`Hello GenZ Edu Tech, I am interested in the ${pkg.name} package (${pkg.price}). Please share the next steps.`)}
                >
                  Request a Quote <ArrowRight size={16} />
                </a>
              </article>
            ))}
          </div>
          <p className="package-note">Final pricing depends on project scope, content, integrations, hosting and third-party services. Any ongoing subscription or paid service will be discussed before work begins.</p>
        </div>
      </section>

      <section className="section impact-section">
        <div className="site-container impact-grid">
          <div>
            <span className="eyebrow">BEYOND THE CLASSROOM</span>
            <h2>Skills matter. Community matters too.</h2>
            <p>GenZ Edu Tech values accessible career awareness and community learning. Our outreach has included drug-awareness programmes, career guidance for school dropouts and conversations with college students about freelancing and future careers.</p>
          </div>
          <div className="impact-cards">
            <div><Users /><strong>Community-focused</strong><span>Sharing knowledge and awareness</span></div>
            <div><GraduationCap /><strong>Career guidance</strong><span>Helping learners explore their options</span></div>
            <div><Sparkles /><strong>Future skills</strong><span>Encouraging practical growth</span></div>
          </div>
        </div>
      </section>

      <section className="section testimonials-section" id="testimonials">
        <div className="site-container">
          <SectionHeading
            eyebrow="OUR LEARNING PHILOSOPHY"
            title="Progress starts with one practical step"
            description="We want every learner to leave with more clarity, stronger skills and a next step they can act on."
          />
          <div className="quote-grid">
            <blockquote>
              <span className="quote-mark">“</span>
              <p>Make learning practical, approachable and connected to the goals that matter to each learner.</p>
              <footer>— GenZ Edu Tech philosophy</footer>
            </blockquote>
            <blockquote>
              <span className="quote-mark">“</span>
              <p>Small, consistent improvements in skills and confidence can open up new possibilities over time.</p>
              <footer>— Our approach to growth</footer>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="section founder-section" id="founder">
        <div className="site-container founder-grid">
          <div className="founder-photo-frame">
            <img src={founderPhoto} alt="Megadharshini Kandhan, Founder of GenZ Edu Tech" />
            <div className="founder-caption">
              <strong>Megadharshini Kandhan</strong>
              <span>Founder · GenZ Edu Tech</span>
            </div>
          </div>
          <div className="founder-copy">
            <span className="eyebrow">A NOTE FROM THE FOUNDER</span>
            <h2>Helping people move from uncertainty to action.</h2>
            <p>GenZ Edu Tech grew from a belief that people deserve clear guidance, practical learning and opportunities to explore their strengths. My aim is to make skills and career awareness easier to approach while building digital solutions that help businesses grow.</p>
            <p>Whether you are learning a new skill, exploring freelancing or looking for a website for your business, we welcome a conversation about your next step.</p>
            <a className="btn btn-primary" href="#contact">Connect with me <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="site-container contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">LET'S START A CONVERSATION</span>
            <h2>Tell us what you want to build next.</h2>
            <p>Ask about course syllabuses, batch timings, career guidance or website development. We'll help you understand the next step.</p>
            <div className="contact-info">
              <a href={`https://wa.me/${PHONE}`} target="_blank" rel="noreferrer">
                <span><MessageCircle /></span>
                <div><small>WhatsApp / Phone</small><strong>+91 63692 16076</strong></div>
              </a>
              <a href={`mailto:${EMAIL}`}>
                <span><Mail /></span>
                <div><small>Email</small><strong>{EMAIL}</strong></div>
              </a>
              <a href={INSTAGRAM} target="_blank" rel="noreferrer">
                <span><Globe /></span>
                <div><small>Instagram</small><strong>@genz_edu_tech</strong></div>
              </a>
              <a href={WEBSITE} target="_blank" rel="noreferrer">
                <span><Phone /></span>
                <div><small>Website</small><strong>genzedutech.in</strong></div>
              </a>
            </div>
          </div>

          <div className="contact-action">
            <div className="contact-action-icon"><MessageCircle size={30} /></div>
            <h3>Ready to get started?</h3>
            <p>Send us a message and tell us whether you're interested in training, career guidance or web development.</p>
            <a className="btn btn-primary full-btn" href={whatsapp('Hello GenZ Edu Tech! I would like to know more about your courses and services.')}>
              Message GenZ Edu Tech <ArrowRight size={17} />
            </a>
            <a className="btn btn-secondary full-btn" href={`mailto:${EMAIL}?subject=${encodeURIComponent('Enquiry for GenZ Edu Tech')}`}>
              Send an Email <Mail size={17} />
            </a>
            <small>We look forward to hearing from you.</small>
          </div>
        </div>
      </section>
    </main>

    <footer className="site-footer">
      <div className="site-container footer-main">
        <a className="brand footer-brand" href="#home">
          <img src={companyLogo} alt="" />
          <span>GenZ Edu Tech<small>LEARN · BUILD · GROW</small></span>
        </a>
        <p>Practical learning, career awareness and digital solutions for people and businesses ready to grow.</p>
        <div className="footer-links">
          {navLinks.map(([label, href]) => <a key={href} href={href}>{label}</a>)}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="site-container">
          <span>© {new Date().getFullYear()} GenZ Edu Tech. All rights reserved.</span>
          <span>Built for learning, growth and opportunity.</span>
        </div>
      </div>
    </footer>

    <a
      className="floating-whatsapp"
      href={`https://wa.me/${PHONE}?text=${encodeURIComponent('Hello GenZ Edu Tech!')}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with GenZ Edu Tech on WhatsApp"
    >
      <MessageCircle size={24} />
    </a>

    {activeCourse && (
      <div className="modal-backdrop" role="presentation" onClick={() => setActiveCourse(null)}>
        <section
          className="syllabus-modal"
          role="dialog"
          aria-modal="true"
          aria-labelledby="syllabus-title"
          onClick={e => e.stopPropagation()}
        >
          <button className="modal-close" onClick={() => setActiveCourse(null)} aria-label="Close syllabus">
            <X />
          </button>
          <span className="eyebrow">{activeCourse.category} · {activeCourse.duration}</span>
          <h2 id="syllabus-title">{activeCourse.name}</h2>
          <p>{activeCourse.description}</p>
          <h3>What you'll cover</h3>
          <ol>{activeCourse.syllabus.map(item => <li key={item}>{item}</li>)}</ol>
          <div className="modal-bottom">
            <strong>Course fee: ₹{activeCourse.fee.toLocaleString('en-IN')}</strong>
            <a
              className="btn btn-primary"
              href={whatsapp(`Hello GenZ Edu Tech, please share the current batch details for ${activeCourse.name} (fee ₹${activeCourse.fee.toLocaleString('en-IN')}).`)}
              target="_blank"
              rel="noreferrer"
            >
              Ask about this course <ArrowRight size={16} />
            </a>
          </div>
          <small className="modal-note">Syllabus topics may be adjusted to the batch plan. Contact us to confirm details.</small>
        </section>
      </div>
    )}
  </div>;
}
