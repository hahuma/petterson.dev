import { cn } from '@/lib/cn';
import { Card } from './Card';

interface TerminalCodeBlockProps {
  filename: string;
  children: React.ReactNode;
  className?: string;
}

export function TerminalCodeBlock({ filename, children, className }: TerminalCodeBlockProps) {
  return (
    <Card className={cn('rounded-xl overflow-hidden', className)}>
      <div className="px-4 py-3 bg-bg-tertiary border-b border-white/5">
        <span className="font-mono text-[0.8rem] text-text-muted">{filename}</span>
      </div>
      <pre className="p-5 font-mono text-[0.85rem] leading-[1.8] overflow-x-auto bg-bg-primary">
        {children}
      </pre>
    </Card>
  );
}
