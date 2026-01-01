import { SectionHeader, SpecialtyCard, Card, IconBox } from '@/components/ui';
import { SkillCategory } from './SkillCategory';
import { skillCategories, specialties } from '@/data/skills';

export function Skills() {
  return (
    <section className="bg-bg-secondary py-20 md:py-30" id="skills">
      <div className="max-w-300 mx-auto px-6">
        <SectionHeader number="03" title="skills" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillCategories.map((category) => (
            <SkillCategory key={category.title} category={category} />
          ))}

          <Card hover="up" className="rounded-2xl p-7 md:col-span-2">
            <div className="flex items-center gap-3 mb-5">
              <IconBox size="sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polygon points="12 2 2 7 12 12 22 7 12 2" />
                  <polyline points="2 17 12 22 22 17" />
                  <polyline points="2 12 12 17 22 12" />
                </svg>
              </IconBox>
              <h3 className="text-[1.1rem] font-semibold text-text-primary">Specialties</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {specialties.map((specialty) => (
                <SpecialtyCard key={specialty.name} icon={specialty.icon} label={specialty.name} />
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
