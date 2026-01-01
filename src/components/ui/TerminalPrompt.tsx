import { cn } from '@/lib/cn';

interface TerminalPromptProps {
  command: string;
  symbol?: string;
  className?: string;
}

export function TerminalPrompt({ command, symbol = '$', className }: TerminalPromptProps) {
  return (
    <p className={cn('font-mono text-sm mb-2 flex items-center gap-3', className)}>
      <span className="text-accent-green">{symbol}</span>
      <span className="text-text-muted">{command}</span>
    </p>
  );
}
