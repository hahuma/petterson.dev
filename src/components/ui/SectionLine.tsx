import { cn } from '@/lib/cn';

interface SectionLineProps {
  className?: string;
}

export function SectionLine({ className }: SectionLineProps) {
  return (
    <div
      className={cn(
        'flex-1 h-px bg-linear-to-r from-white/10 to-transparent',
        className
      )}
    />
  );
}
