import { projects, github, email, contactEmailHref, exploration } from '../portfolioData.js';

export const commands = [
  ['help', 'See all available commands'],
  ['about', 'Meet the person behind the code'],
  ['skills', 'Explore my everyday toolkit'],
  ['projects', 'Browse selected work and source code'],
  ['experience', 'Follow my engineering journey'],
  ['contact', 'Start a conversation'],
  ['resume', 'Download my resume'],
  ['clear', 'Start with a clean terminal'],
];

export function runCommand(input) {
  const command = input.trim().toLowerCase();
  if (!command) return null;
  switch (command) {
    case 'clear':
      return { clear: true, lines: [] };
    case 'help':
      return { lines: commands.map(([name, description]) => ({ text: `${name.padEnd(13)}${description}` })) };
    case 'about':
      return { lines: [
        { text: 'Suraj Tiwari / Software Engineer / Lucknow, India' },
        { text: 'I build dependable backends and thoughtful full-stack applications across healthcare, fintech, and the web.' },
        { text: 'Currently building Rust services at Salubrious Technologies and exploring AI-powered learning with QuizGenie.' },
        ...exploration.map(item => ({ text: `${item.title}: ${item.description}` })),
      ] };
    case 'skills':
      return { lines: [
        { text: 'Languages    Rust · Python · JavaScript' },
        { text: 'Backend      FastAPI · Django · DRF · Node.js · Express' },
        { text: 'Frontend     React · Next.js · HTML5 · CSS3' },
        { text: 'Data         MySQL · MongoDB' },
        { text: 'Engineering  REST APIs · JWT · Async · Concurrency · System design' },
        { text: 'Tools        Git · GitHub · Postman · VS Code' },
        { text: 'Exploring    AI quiz generation · Answer validation' },
        { text: 'Interests    Data science · Data analysis · Machine learning' },
      ] };
    case 'projects':
      return { lines: projects.flatMap(project => [
        { text: `${project.name} — ${project.status}` },
        { text: project.description },
        { text: `↗ ${project.repo} on GitHub`, href: `${github}/${project.repo}` },
        ...(project.live ? [{ text: '↗ Visit live project', href: project.live }] : []),
      ]) };
    case 'experience':
      return { lines: [
        { text: 'Jan 2026 — Present   Software Engineer · Salubrious Technologies' },
        { text: 'May 2025 — Dec 2025  Software Engineer · WealthFino Capital' },
        { text: 'Dec 2024 — May 2025  Software Engineering Intern · Analyze Infotech' },
        { text: 'Read the full story ↓', href: '#experience' },
      ] };
    case 'contact':
      return { lines: [
        { text: email, href: contactEmailHref },
        { text: 'GitHub ↗', href: github },
        { text: 'LinkedIn ↗', href: 'https://www.linkedin.com/in/suraj-tiwari-a9277626a/' },
        { text: 'A project, an opportunity, or just a conversation — say hello.' },
      ] };
    case 'resume':
      return { lines: [{ text: '↓ Download Suraj_Tiwari.pdf', href: '/resume/Suraj_Tiwari.pdf', download: true }] };
    default:
      return { error: true, lines: [{ text: `Command not found: ${input.trim()}. Type "help" to see what you can explore.` }] };
  }
}
