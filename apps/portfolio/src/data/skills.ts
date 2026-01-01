export interface SkillCategory {
  icon: string;
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    icon: '<path d="M16 18l6-6-6-6M8 6l-6 6 6 6"/>',
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'Go', 'PHP', 'Ruby', 'SQL'],
  },
  {
    icon: '<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>',
    title: 'Frameworks',
    skills: ['Node.js', 'NestJS', 'Express', 'Vue.js', 'NuxtJS', 'React', 'Ruby on Rails', 'Laravel'],
  },
  {
    icon: '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
    title: 'Databases',
    skills: ['PostgreSQL', 'MySQL', 'MongoDB', 'SQLite', 'Redis'],
  },
  {
    icon: '<path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>',
    title: 'DevOps & Infra',
    skills: ['Docker', 'GitHub Actions', 'Linux', 'Nginx', 'AWS', 'Kubernetes'],
  },
];

export interface Specialty {
  icon: string;
  name: string;
}

export const specialties: Specialty[] = [
  { icon: '{ }', name: 'High-volume APIs' },
  { icon: '$', name: 'Payment Integrations' },
  { icon: '~', name: 'Idempotency & Fault Tolerance' },
  { icon: '#', name: 'SaaS Development' },
  { icon: '@', name: 'Microservices Design' },
  { icon: '*', name: 'Database Modeling' },
];
