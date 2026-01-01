import { cn } from '@/lib/cn';
import { Card, Badge } from '@/components/ui';
import type { Job } from '@/data/experience';

interface ExperienceCardProps {
  job: Job;
  className?: string;
}

export function ExperienceCard({ job, className }: ExperienceCardProps) {
  return (
    <div className={cn('relative pb-15 last:pb-0 group', className)}>
      <div className="absolute -left-10 top-0">
        <span className="block w-4 h-4 bg-bg-primary border-[3px] border-accent-cyan rounded-full relative z-10 transition-all duration-300 group-hover:bg-accent-cyan group-hover:shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
      </div>

      <Card hover="right" className="rounded-2xl p-8">
        <div className="flex justify-between items-start gap-4 mb-3 flex-wrap">
          <div>
            <h3 className="text-xl font-semibold text-text-primary mb-1">{job.title}</h3>
            <span className="font-mono text-[0.95rem] text-accent-cyan">{job.company}</span>
          </div>
          <span className="font-mono text-[0.8rem] text-text-muted bg-bg-tertiary px-3 py-1.5 rounded-md">
            {job.period}
          </span>
        </div>

        <Badge variant="green" className="mb-5 inline-block">
          {job.badge}
        </Badge>

        <ul className="mb-5">
          {job.highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex gap-3 mb-3 text-[0.95rem] text-text-secondary leading-relaxed"
            >
              <span className="font-mono text-text-muted shrink-0">//</span>
              <span dangerouslySetInnerHTML={{ __html: highlight }} />
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-2">
          {job.tech.map((tech) => (
            <Badge key={tech} variant="cyan">
              {tech}
            </Badge>
          ))}
        </div>
      </Card>
    </div>
  );
}
