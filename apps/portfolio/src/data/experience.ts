export interface Job {
  title: string;
  company: string;
  period: string;
  badge: string;
  highlights: string[];
  tech: string[];
}

export const jobs: Job[] = [
  {
    title: 'Backend Developer',
    company: 'Studio Visual',
    period: 'Oct 2022 - Present',
    badge: 'Remote',
    highlights: [
      'Architected and led development of an omnichannel, multi-tenant customer support and CRM platform with payments/transactional APIs',
      'Designed Embedded WhatsApp integration, reducing support tickets by <strong>80%</strong> and scaling to tens of thousands of daily requests',
      'Developed standalone microservice for real-time message processing using NestJS, PostgreSQL, and RabbitMQ',
      'Improved subscription flows for Revista Oeste, ensuring low latency under high concurrent user spikes',
      'Collaborated with cross-functional teams to raise conversion rates by <strong>40%</strong>',
    ],
    tech: ['Node.js', 'NestJS', 'PostgreSQL', 'RabbitMQ', 'TypeScript'],
  },
  {
    title: 'Full-Stack Developer',
    company: 'Insus',
    period: 'Oct 2020 - Oct 2022',
    badge: 'Remote',
    highlights: [
      'Developed and maintained backend services with Node.js/TypeScript focusing on payment gateway integrations',
      'Delivered tailored solutions for SMEs including high-performance APIs and clean code practices',
      'Built custom dashboards and CRM features leveraging caching strategies and message queues',
    ],
    tech: ['Node.js', 'TypeScript', 'PostgreSQL', 'Vue.js', 'Redis'],
  },
];
