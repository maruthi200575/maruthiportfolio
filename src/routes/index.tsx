import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { ArrowUpRight, ArrowDown, ArrowRight, Sun, Moon, Menu, X, Code2, Terminal, MapPin, Sparkles, GraduationCap, Leaf, QrCode, CalendarDays, Globe2, Database, BrainCircuit, PanelsTopLeft, Server, Github, Linkedin, Award, Trophy, Tent, Briefcase, Laptop, Atom, Layers, GitBranch, FileText, Mail, Check, ChevronUp, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { SectionHeading } from '@/components/portfolio/section-heading';
import { profile, projects, skills, credentials, services, type Project } from '@/data/portfolio';
import { supabase } from '@/integrations/supabase/client';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_qrx68jk';
const EMAILJS_TEMPLATE_ID = 'template_gbwzw3h';
const EMAILJS_PUBLIC_KEY = 'VEaxySJWEqEV0IHtK';
import monogram from '@/assets/monogram.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'M T Maruthi — Full Stack Developer & AI Enthusiast' },
    { name: 'description', content: 'Meet M T Maruthi, a Computer Science student and aspiring full stack developer. Explore projects, technical skills, learning credentials and development interests.' },
    { property: 'og:title', content: 'M T Maruthi — Full Stack Developer' },
    { property: 'og:description', content: 'Thoughtful web experiences. Practical projects. A curiosity for AI. Explore the portfolio of M T Maruthi.' },
    { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'theme-color', content: '#111317' },
  ] }), component: Index,
});
const navigation = ['Home', 'About', 'Skills', 'Projects', 'Certifications', 'Achievements', 'Contact'];
const categories = ['All Projects', 'Web Development', 'AI & Machine Learning', 'Sustainability', 'Other Applications'];
const skillIcons = { code: Code2, layout: PanelsTopLeft, server: Server, database: Database, brain: BrainCircuit, terminal: Terminal };
const achievements = [
  { icon: Code2, title: '3+ hackathons', description: 'Participation, collaboration, and building under pressure.' },
  { icon: Laptop, title: 'Academic projects', description: 'Completion of academic mini-projects and a major project.' },
  { icon: Trophy, title: 'Third place · BGMI', description: 'Third-place finish in a BGMI LAN event at VTU.' },
  { icon: Tent, title: '5+ scouting camps', description: 'Participation in scouting camps and community experiences.' },
  { icon: Briefcase, title: 'Career opportunities', description: 'Reported internship selections at multiple organizations.' },
];

function ProjectArt({ project, index }: { project: Project; index: number }) {
  return <div className={`project-art project-${project.motif}`} role="img" aria-label={`${project.title} conceptual project illustration`}>
    <span className="art-index">PROJECT / 0{index + 1}</span>
    {project.motif === 'agriculture' && <Leaf className="art-leaf-icon" strokeWidth={1.2} />}
    {project.motif === 'analytics' && <div className="mini-chart" aria-hidden="true">{Array.from({length:6},(_,i)=><i key={i}/>)}</div>}
    {project.motif === 'qr' && <div className="qr-art"><QrCode strokeWidth={1.4}/></div>}
    {project.motif === 'exam' && <CalendarDays strokeWidth={1.3}/>}
    {project.motif === 'eco' && <Globe2 strokeWidth={1.2}/>}
    <span className="project-art-title">{project.title}{project.motif==='agriculture' && <span className="text-success"> ↗</span>}</span>
  </div>;
}

function Index() {
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [role, setRole] = useState(0);
  const [category, setCategory] = useState('All Projects');
  const [project, setProject] = useState<Project | null>(null);
  const [notice, setNotice] = useState<{title:string; description:string} | null>(null);
  const [contactStatus, setContactStatus] = useState('');
  const cursor = useRef<HTMLDivElement>(null);
  const roles = ['Full Stack Developer', 'Frontend Developer', 'AI Enthusiast', 'Problem Solver'];
  useEffect(() => {
    const saved = localStorage.getItem('maruthi-theme') || 'dark';
    setTheme(saved); document.documentElement.dataset['theme'] = saved;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = reduce ? undefined : window.setInterval(() => setRole(v => (v+1)%4), 4000);
    const observer = new IntersectionObserver(entries => { for(const entry of entries) if(entry.isIntersecting) setActive(entry.target.id); }, { rootMargin:'-15% 0px -65% 0px' });
    navigation.forEach(n => { const element = document.getElementById(n.toLowerCase()); if(element) observer.observe(element); });
    const move = (e:MouseEvent) => { if(cursor.current && !reduce && window.matchMedia('(pointer: fine)').matches) { cursor.current.style.left = `${e.clientX}px`; cursor.current.style.top = `${e.clientY}px`; cursor.current.style.opacity = '.7'; } };
    window.addEventListener('mousemove',move);
    return () => { window.clearInterval(timer); observer.disconnect(); window.removeEventListener('mousemove',move); delete document.documentElement.dataset['theme']; };
  }, []);
  const toggleTheme = () => { const next = theme==='dark'?'light':'dark'; setTheme(next); document.documentElement.dataset['theme']=next; localStorage.setItem('maruthi-theme',next); };
  const resume = () => { if(profile.resume) window.open(profile.resume,'_blank','noopener,noreferrer'); else setNotice({title:'Resume coming soon',description:'Maruthi’s resume has not been uploaded yet. It will be available to view once the real file is provided.'}); };
  const openLinkedIn = () => { if(profile.linkedin) window.open(profile.linkedin,'_blank','noopener,noreferrer'); else setNotice({title:'LinkedIn profile coming soon',description:'Maruthi’s LinkedIn profile link has not been added yet. Once the real profile URL is provided, this button opens it in a new tab.'}); };

  const submitContact = async (event:FormEvent<HTMLFormElement>) => {
    event.preventDefault(); const form = event.currentTarget; const data = new FormData(form);
    const name = String(data.get('name')).trim(); const email = String(data.get('email')).trim();
    const subject = String(data.get('subject')).trim(); const message = String(data.get('message')).trim();
    if(!name || !email || !subject || !message) { setContactStatus('Please complete every field with a name, email, subject and message.'); return; }
    setContactStatus('Sending…');
    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        from_name: name, from_email: email, reply_to: email, subject, message,
      }, EMAILJS_PUBLIC_KEY);
      await supabase.from('contact_messages').insert({ name, email, subject, message });
      form.reset(); setContactStatus('Message sent — thank you! I’ll get back to you soon.');
    } catch {
      setContactStatus('Something went wrong and your message was not sent. Please try again.');
    }
  };
  return <>
    <div className="cursor-point" ref={cursor} aria-hidden="true"/>
    <header className="site-header"><div className="container header-inner">
      <a href="#home" className="brand" aria-label="Maruthi home">Maruthi<span className="brand-dot">.</span><span className="text-muted-foreground font-normal">Portfolio</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{navigation.map(n=><a key={n} href={`#${n.toLowerCase()}`} className={`nav-link ${active===n.toLowerCase()?'active':''}`} aria-current={active===n.toLowerCase()?'location':undefined}>{n}</a>)}</nav>
      <div className="header-actions"><Button variant="ghost" size="icon" onClick={toggleTheme} aria-label={`Switch to ${theme==='dark'?'light':'dark'} mode`} title={`Switch to ${theme==='dark'?'light':'dark'} mode`}>{theme==='dark'?<Sun/>:<Moon/>}</Button><Button variant="quiet" className="resume-button" onClick={resume}><Eye/> View Resume</Button><Button variant="ghost" size="icon" className="menu-toggle" aria-label={menuOpen?'Close navigation':'Open navigation'} aria-expanded={menuOpen} onClick={()=>setMenuOpen(!menuOpen)}>{menuOpen?<X/>:<Menu/>}</Button></div>
    </div>{menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navigation.map(n=><a key={n} href={`#${n.toLowerCase()}`} onClick={()=>setMenuOpen(false)}>{n}</a>)}</nav>}</header>
    <main>
      <section id="home" className="hero"><div className="container"><div className="hero-inner">
         <div className="hero-copy reveal"><div className="availability"><span className="status-dot"/> OPEN TO EXPLORING & OPPORTUNITIES</div><p className="hero-greeting">Hi, I’m M T Maruthi <span className="text-highlight">↗</span></p><h1>Full Stack<span>Developer<span className="inline! text-highlight!">.</span></span></h1><p className="hero-description">Developing modern applications that combine creativity with technology. Discovering new possibilities in AI, machine learning, and software innovative thinking.</p><div className="hero-buttons"><Button asChild variant="portfolio"><a href="#projects">View My Projects <ArrowUpRight/></a></Button><Button asChild variant="quiet"><a href="#contact">Let’s Talk <ArrowUpRight/></a></Button><Button variant="quiet" onClick={openLinkedIn}><Linkedin/> LinkedIn</Button></div><div className="hero-meta"><Terminal size={14}/><span key={role} className="reveal">{roles[role]}</span><span className="text-primary">/</span><span>Passionate in Researching-Technologies..</span></div></div>
         <div className="hero-art">{profile.photo?<div className="portrait-stage"><img src={profile.photo} className="monogram-image portrait-image" alt="M T Maruthi" width={1024} height={1024} fetchPriority="high"/></div>:<img src={monogram} className="monogram-image monogram-art" alt="Sculptural MTM initials, Maruthi’s developer monogram" width={1024} height={1024} fetchPriority="high"/>}<div className="art-label art-label-top"><Code2/> &lt; ideas into reality /&gt;</div><div className="art-label art-label-bottom"><Sparkles/> Code with purpose .Create with Passion</div></div>
      </div><div className="hero-bottom"><span>Based in Karnataka, India · Building for the web</span><a href="#about">Scroll to explore <ArrowDown size={13}/></a></div></div></section>
      <div className="tech-band"><div className="container tech-list"><span className="tech-label">My development<br/>toolkit</span><span className="tech-name"><Atom/> React</span><span className="tech-name"><Code2/> TypeScript</span><span className="tech-name"><Layers/> Node.js</span><span className="tech-name"><Database/> PostgreSQL</span><span className="tech-name"><Terminal/> Python</span><span className="tech-name"><GitBranch/> Git</span></div></div>
      <section id="about" className="section"><div className="container"><SectionHeading number="01" eyebrow="A little about me" title="Curiosity meets code"/><div className="about-layout"><div className="about-copy"><p>{profile.biography}</p><p>I’m continuously strengthening my programming skills, exploring emerging technologies, and working on innovative projects. My goal is to become a skilled software developer and contribute to impactful projects.</p><div className="interest-row"><span className="chip">Full Stack Development</span><span className="chip">Artificial Intelligence</span><span className="chip">Machine Learning</span></div></div><div className="education"><p className="eyebrow flex items-center gap-2"><GraduationCap size={16}/> MY EDUCATION</p><h3>BE · Computer Science & Engineering</h3><p>AGM Rural College of Engineering and Technology<br/>Varur, Hubballi, Karnataka<br/>Visvesvaraya Technological University (VTU)</p><div className="education-stats"><div><strong>7th</strong><span>Current semester</span></div><div><strong>2027</strong><span>Expected graduation</span></div><div><strong>7.10<span className="text-xs"> / 10</span></strong><span>CGPA</span></div></div><div className="education-history"><div><h4>Fatima Pre-University College, Keshwapur-Hubballi</h4><p>Bachelor of Science, PCMB<br/>2021 – 2023 · Grade: 72.28%</p></div><div><h4>SWRWWO English Medium High School, Gadag road-Hubballi</h4><p>School<br/>Jan 2011 – Mar 2021 · Grade: 80.48%</p></div></div></div></div></div></section>
      <section id="projects" className="section"><div className="container"><SectionHeading number="02" eyebrow="Selected work" title="Ideas, brought to life" description="A collection of practical projects, experiments, and things I’m excited to build."><span className="chip">05 FEATURED PROJECTS</span></SectionHeading><div className="filter-row" role="group" aria-label="Project categories">{categories.map(c=><Button key={c} variant={category===c?'portfolio':'ghost'} onClick={()=>setCategory(c)} aria-pressed={category===c}>{c}</Button>)}</div><div className="project-grid">{projects.filter(p=>category==='All Projects'||p.category===category).map(p=><article key={p.title} className="project-card reveal"><ProjectArt project={p} index={projects.indexOf(p)}/><div className="project-info"><div className="eyebrow">{p.category}</div><h3>{p.title}</h3><p>{p.description}</p>{p.technologies.length>0 && <div className="skill-tags">{p.technologies.map(t=><span className="chip" key={t}>{t}</span>)}</div>}<div className="project-footer"><span className="project-status">PROJECT EXPLORATION</span><Button variant="link" onClick={()=>setProject(p)}>View project <ArrowUpRight/></Button></div></div></article>)}</div></div></section>
      <section id="skills" className="section"><div className="container"><SectionHeading number="03" eyebrow="My toolkit" title="The tools behind the ideas" description="A growing technical foundation, with a focus on learning by doing."/><div className="skill-grid">{skills.map(s=>{const Icon=skillIcons[s.icon as keyof typeof skillIcons]; return <article key={s.name} className="skill-card"><div className="skill-top"><Icon/><span className="skill-level">{s.level}</span></div><h3>{s.name}</h3><div className="skill-tags">{s.items.map(t=><span className="chip" key={t}>{t}</span>)}</div></article>;})}</div></div></section>
      <section className="section"><div className="container"><SectionHeading number="04" eyebrow="Development capabilities" title="What I can help build"/><div className="service-grid">{services.map(([title,description,features],i)=><article key={title} className="service-item"><span className="service-number">0{i+1} <ArrowUpRight className="inline ml-2" size={15}/></span><h3>{title}</h3><p>{description}</p><small>{features}</small></article>)}</div></div></section>
       <section className="section"><div className="container"><SectionHeading number="05" eyebrow="The next chapter" title="Internship selections & opportunities" description="Reported selections — a step toward my professional development, not completed internships."/><div className="selections">{['Dhee Coding Lab pvt ltd','Besant Technologies','CodeAlpha','EdVyro'].map(name=><article className="selection-item" key={name}><Briefcase className="text-primary" size={22}/><h3>{name}</h3><p>Reported selection · Proof pending</p></article>)}</div></div></section>
      <section id="certifications" className="section"><div className="container"><SectionHeading number="06" eyebrow="Always a student" title="Learning & credentials" description="Reported courses, certificates, and platform achievements. Certificate assets and verification are pending."/><div className="credential-grid">{credentials.map(c=><article className="credential" key={c.title}><Award/><div className="min-w-0"><h3>{c.title}</h3><p>{c.issuer}</p><small>{c.type}</small></div>{c.image?<Button asChild variant="ghost" size="icon"><a href={c.image} target="_blank" rel="noreferrer" aria-label={`View ${c.title} certificate`}><ArrowUpRight/></a></Button>:<Button variant="ghost" size="icon" title="Certificate not yet supplied" aria-label={`Certificate information for ${c.title}`} onClick={()=>setNotice({title:c.title,description:`${c.type} · ${c.issuer}. The certificate image, issue date and verification link have not been supplied yet.`})}><FileText/></Button>}</article>)}</div></div></section>
      <section id="achievements" className="section"><div className="container"><SectionHeading number="07" eyebrow="Beyond the keyboard" title="Experiences that shape me"/><div className="achievement-list">{achievements.map(a=><article className="achievement" key={a.title}><a.icon/><h3>{a.title}</h3><p>{a.description}</p></article>)}</div></div></section>
      <section id="contact" className="section"><div className="container contact-layout"><div className="contact-copy"><p className="eyebrow"><span>08 /</span> LET’S CONNECT</p><h2 className="contact-title">Great things start<br/>with a <span className="text-primary">conversation.</span></h2><p>Have a project in mind, an opportunity to share, or just want to say hello? I’d love to connect.</p><div className="contact-location"><MapPin size={16}/> Karnataka, India</div>{profile.email && <a className="contact-location" href={`mailto:${profile.email}`}><Mail size={16}/>{profile.email}</a>}<div className="contact-profiles"><p className="contact-profiles-label">Around the web</p>{[{name:'GitHub',icon:Github,url:profile.github},{name:'LinkedIn',icon:Linkedin,url:profile.linkedin},{name:'Kaggle',icon:BrainCircuit,url:profile.kaggle}].map(p=>p.url?<a className="profile-link" href={p.url} key={p.name} target="_blank" rel="noreferrer"><p.icon/><div><strong>{p.name}</strong><small>Visit my profile</small></div><ArrowUpRight className="ml-auto"/></a>:<div className="profile-link" key={p.name}><p.icon/><div><strong>{p.name}</strong><small>Profile link coming soon</small></div></div>)}</div></div><form className="contact-form" onSubmit={submitContact}><div className="form-row"><label className="field">Your name<input name="name" placeholder="What's your name?" autoComplete="name" required maxLength={100}/></label><label className="field">Email address<input name="email" type="email" placeholder="you@example.com" autoComplete="email" required maxLength={254}/></label></div><label className="field">Subject<input name="subject" placeholder="What would you like to talk about?" required maxLength={200}/></label><label className="field">Your message<textarea name="message" placeholder="Tell me a little more…" required maxLength={5000}/></label><Button type="submit" variant="portfolio" className="justify-between h-11">Let’s Connect <ArrowUpRight/></Button><p className="form-notice">Your message goes straight to me — I read every one.</p>{contactStatus && <p className="form-error" role="status">{contactStatus}</p>}</form></div></section>
    </main>
     <footer className="container footer"><a href="#home" className="brand">maruthi<span className="brand-dot">.</span>portfolio</a><p>© 2026 M T Maruthi · Crafted with curiosity & code.</p><Button asChild variant="ghost" size="icon"><a href="#home" aria-label="Back to top" title="Back to top"><ChevronUp/></a></Button></footer>
    <Dialog open={project!==null} onOpenChange={open=>{if(!open)setProject(null);}}><DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto"><DialogTitle>{project?.title}</DialogTitle><DialogDescription>{project?.category}</DialogDescription><p className="text-sm leading-7 text-muted-foreground">{project?.detail}</p><p className="text-xs text-muted-foreground">Repository and live demo links are not yet provided. Project artwork is conceptual, not an application screenshot.</p>{project?.repository && <Button asChild><a href={project.repository} target="_blank" rel="noreferrer"><Github/> Repository</a></Button>}{project?.demo && <Button asChild><a href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight/></a></Button>}</DialogContent></Dialog>
    <Dialog open={notice!==null} onOpenChange={open=>{if(!open)setNotice(null);}}><DialogContent><DialogTitle>{notice?.title}</DialogTitle><DialogDescription className="leading-7">{notice?.description}</DialogDescription><Button variant="portfolio" onClick={()=>setNotice(null)} className="mt-2">Got it <Check/></Button></DialogContent></Dialog>
  </>;
}
