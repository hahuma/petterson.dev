import { cn } from '@/lib/cn';

interface SpecialtyCardProps {
  icon: string;
  label: string;
  className?: string;
}

export function SpecialtyCard({ icon, label, className }: SpecialtyCardProps) {
  return (
    <div
      className={cn(
        'bg-bg-tertiary border border-white/5 rounded-xl p-5 text-center',
        'transition-all duration-300 hover:border-accent-cyan/30 hover:-translate-y-0.5',
        className
      )}
    >
      <span className="block font-mono text-2xl text-accent-cyan mb-2">{icon}</span>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
