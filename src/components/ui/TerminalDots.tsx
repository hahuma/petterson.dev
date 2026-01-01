import { cn } from '@/lib/cn';

interface TerminalDotsProps {
  className?: string;
}

export function TerminalDots({ className }: TerminalDotsProps) {
  return (
    <div className={cn('flex gap-2', className)}>
      <span className="w-3 h-3 rounded-full bg-terminal-red" />
      <span className="w-3 h-3 rounded-full bg-terminal-yellow" />
      <span className="w-3 h-3 rounded-full bg-terminal-green" />
    </div>
  );
}
