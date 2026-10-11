import portrait from '@/assets/portrait-cutout.png.asset.json';

export const profile = {
  name: 'M T Maruthi', title: 'Full Stack Developer', email: '', photo: portrait.url, resume: '',
  github: '', linkedin: '', kaggle: '',
  biography: "I'm M T Maruthi, a Computer Science and Engineering student passionate about full-stack web development and modern technologies. I enjoy building practical applications, developing user-friendly interfaces, and solving real-world problems through technology.",
};

export type Project = { title: string; category: string; description: string; detail: string; motif: string; repository: string; demo: string; technologies: string[] };
export const projects: Project[] = [
  { title: 'Dharti Mitr AI', category: 'AI & Machine Learning', description: 'Bringing agricultural information and decision support into one thoughtful experience.', detail: 'An agricultural assistance platform intended to help farmers access information. Planned areas include crop recommendations, weather, soil health and market information. Operational features and the implemented technology stack are awaiting confirmation.', motif: 'agriculture', repository: '', demo: '', technologies: [] },
  { title: 'StockSense AI', category: 'AI & Machine Learning', description: 'Exploring smarter inventory decisions through demand forecasting and insights.', detail: 'An inventory and demand forecasting project designed to present stock information and inventory insights. Dashboard, forecasting and alert implementations have not yet been verified.', motif: 'analytics', repository: '', demo: '', technologies: [] },
  { title: 'QR Code Generator', category: 'Web Development', description: 'A simple, approachable interface for turning information into QR codes.', detail: 'A web application for generating QR codes. The actual implementation, technology stack and repository link are awaiting confirmation.', motif: 'qr', repository: '', demo: '', technologies: [] },
  { title: 'Exam Conflict', category: 'Other Applications', description: 'An academic project exploring examination scheduling and conflict management.', detail: 'A project related to examination scheduling or conflict management. The exact problem statement, features and implementation details are awaiting confirmation.', motif: 'exam', repository: '', demo: '', technologies: [] },
  { title: 'Eco Track', category: 'Sustainability', description: 'Exploring the intersection of technology and a more sustainable future.', detail: 'A project related to environmental tracking or sustainability. Exact functionality and implementation details are awaiting confirmation.', motif: 'eco', repository: '', demo: '', technologies: [] },
];
export const skills = [
  { name: 'Programming languages', level: 'Intermediate', items: ['Java', 'Python', 'JavaScript', 'TypeScript', 'C'], icon: 'code' },
  { name: 'Frontend development', level: 'Advanced', items: ['HTML', 'CSS', 'React.js', 'Tailwind CSS', 'Vite'], icon: 'layout' },
  { name: 'Backend development', level: 'Beginner', items: ['Node.js', 'Express.js', 'Java Servlets', 'JSP'], icon: 'server' },
  { name: 'Databases', level: 'Beginner', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'MySQL'], icon: 'database' },
  { name: 'AI & machine learning', level: 'Intermediate', items: ['Machine Learning', 'Deep Learning', 'Generative AI', 'Natural Language Processing'], icon: 'brain' },
  { name: 'Tools & platforms', level: 'Intermediate', items: ['Git', 'GitHub', 'Visual Studio Code', 'Antigravity', 'Cursor AI'], icon: 'terminal' },
];
export const credentials = [
  ['Gemini Certified Student', 'Google for Education', 'Reported certification'],
  ['Introduction to Data Science', 'Infosys Springboard', 'Course credential'],
  ['Generative AI', 'Infosys Springboard', 'Course credential'],
  ['Project Management', 'IBM SkillsBuild', 'Course credential'],
  ['AI and Machine Learning', 'IBM SkillsBuild', 'Course credential'],
  ['Intro to Machine Learning', 'Kaggle', 'Course credential'],
  ['Kaggle Community Member', 'Kaggle', 'Community membership'],
  ['Python Coder', 'Kaggle', 'Platform achievement'],
  ['Code Forker', 'Kaggle', 'Platform achievement'],
  ['AI Tools Workshop', 'Be10x', 'Workshop participation'],
  ['Campus Ambassador Certificate', 'TECHNGLOBAL PRIVATE LIMITED', 'Reported certificate'],
].map(([title = '', issuer = '', type = '']) => ({ title, issuer, type, image: '', verification: '' }));
export const services = [
  ['Frontend development', 'Responsive, interactive interfaces built with React and modern CSS.', 'Responsive web pages · React applications · Interactive interfaces'],
  ['Full stack development', 'Connecting thoughtful interfaces with server-side functionality and data.', 'Web applications · Frontend / backend integration · Database connectivity'],
  ['AI & machine learning', 'Exploring intelligent features that make web applications more useful.', 'AI-powered apps · Machine learning · Chatbots · Predictive analytics'],
  ['Portfolios & landing pages', 'Distinctive personal portfolios and polished, mobile-friendly websites.', 'Personal portfolios · Landing pages · Project showcases'],
];