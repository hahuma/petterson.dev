import { cn } from '@/lib/cn';
import { Card, Badge, IconBox } from '@/components/ui';
import type { SkillCategory as SkillCategoryType } from '@/data/skills';

interface SkillCategoryProps {
  category: SkillCategoryType;
  className?: string;
}

export function SkillCategory({ category, className }: SkillCategoryProps) {
  return (
    <Card hover="up" className={cn('rounded-2xl p-7', className)}>
      <div className="flex items-center gap-3 mb-5">
        <IconBox size="sm">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <g dangerouslySetInnerHTML={{ __html: category.icon }} />
          </svg>
        </IconBox>
        <h3 className="text-[1.1rem] font-semibold text-text-primary">{category.title}</h3>
      </div>
      <div className="flex flex-wrap gap-2.5">
        {category.skills.map((skill) => (
          <Badge key={skill} variant="cyan" interactive>
            {skill}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
