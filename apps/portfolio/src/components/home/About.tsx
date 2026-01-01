'use client';

import { SectionHeader, StatCard, TerminalCodeBlock } from '@/components/ui';

const stats = [
  { value: 5, suffix: '+', label: 'Years Experience' },
  { value: 80, suffix: '%', label: 'Tickets Reduced' },
  { value: 40, suffix: '%', label: 'Conversion Increase' },
  { value: 10, suffix: 'k+', label: 'Daily Requests' },
];

export function About() {
  return (
    <section className="bg-bg-secondary py-20 md:py-30" id="about">
      <div className="max-w-300 mx-auto px-6">
        <SectionHeader number="01" title="about" />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-15 items-start">
          <div>
            <TerminalCodeBlock filename="developer.ts" className="mb-8">
              <code>
                <span className="text-accent-purple">interface</span>{' '}
                <span className="text-accent-cyan">Developer</span> {'{'}
                {'\n'}  <span className="text-accent-pink">name</span>:{' '}
                <span className="text-accent-green">&quot;Petterson Firmino&quot;</span>;
                {'\n'}  <span className="text-accent-pink">role</span>:{' '}
                <span className="text-accent-green">&quot;Backend Engineer&quot;</span>;
                {'\n'}  <span className="text-accent-pink">experience</span>:{' '}
                <span className="text-accent-green">&quot;5+ years&quot;</span>;
                {'\n'}  <span className="text-accent-pink">location</span>:{' '}
                <span className="text-accent-green">&quot;Brazil&quot;</span>;
                {'\n'}  <span className="text-accent-pink">remote</span>:{' '}
                <span className="text-accent-orange">true</span>;
                {'\n'}{'}'}
                {'\n\n'}
                <span className="text-accent-purple">const</span>{' '}
                <span className="text-text-primary">passion</span> = [
                {'\n'}  <span className="text-accent-green">&quot;Scalable architectures&quot;</span>,
                {'\n'}  <span className="text-accent-green">&quot;Clean, maintainable code&quot;</span>,
                {'\n'}  <span className="text-accent-green">&quot;Performance optimization&quot;</span>,
                {'\n'}  <span className="text-accent-green">&quot;Fault-tolerant systems&quot;</span>
                {'\n'}];
              </code>
            </TerminalCodeBlock>

            <p className="text-[1.05rem] text-text-secondary mb-4">
              I&apos;m a Backend Software Engineer with a passion for designing and operating{' '}
              <strong className="text-text-primary">scalable systems</strong> that handle real-world
              complexity. My expertise lies in building high-volume transactional APIs, payment
              integrations, and multi-tenant SaaS platforms.
            </p>
            <p className="text-[1.05rem] text-text-secondary">
              I architect{' '}
              <strong className="text-text-primary">idempotent, fault-tolerant services</strong>{' '}
              that balance performance, maintainability, and compliance. Experienced in Docker-based
              deployments, CI/CD pipelines, and collaborating with distributed teams across time
              zones.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <StatCard
                key={stat.label}
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
