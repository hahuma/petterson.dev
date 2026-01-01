import { SectionHeader } from '@/components/ui';
import { ExperienceCard } from './ExperienceCard';
import { jobs } from '@/data/experience';

export function Experience() {
  return (
    <section className="py-20 md:py-30" id="experience">
      <div className="max-w-300 mx-auto px-6">
        <SectionHeader number="02" title="experience" />

        <div className="relative pl-10 before:content-[''] before:absolute before:left-[7px] before:top-0 before:bottom-0 before:w-0.5 before:bg-linear-to-b before:from-accent-cyan before:to-accent-purple before:opacity-30">
          {jobs.map((job) => (
            <ExperienceCard key={`${job.company}-${job.period}`} job={job} />
          ))}
        </div>
      </div>
    </section>
  );
}
