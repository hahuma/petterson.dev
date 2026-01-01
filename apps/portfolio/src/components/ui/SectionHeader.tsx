import { cn } from '@/lib/cn';
import { SectionLine } from './SectionLine';

interface SectionHeaderProps {
  number: string;
  title: string;
  className?: string;
}

export function SectionHeader({ number, title, className }: SectionHeaderProps) {
  return (
    <div className={cn('flex items-center gap-4 mb-15', className)}>
      <span className="font-mono text-base text-accent-cyan">{number}</span>
      <h2 className="font-mono text-[clamp(1.5rem,4vw,2rem)] font-semibold text-text-primary">
        {title}()
      </h2>
      <SectionLine />
    </div>
  );
}
