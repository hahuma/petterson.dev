'use client';

import { cn } from '@/lib/cn';
import { Card } from './Card';
import { useCounterAnimation } from '@/hooks/useCounterAnimation';

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatCard({ value, suffix = '', label, className }: StatCardProps) {
  const { ref, displayValue } = useCounterAnimation(value);

  return (
    <Card className={cn('p-6 text-center', className)}>
      <div className="flex items-baseline justify-center">
        <span ref={ref} className="font-mono text-[2.5rem] font-bold text-accent-cyan">
          {displayValue}
        </span>
        {suffix && (
          <span className="font-mono text-2xl font-bold text-accent-cyan ml-1">
            {suffix}
          </span>
        )}
      </div>
      <span className="block text-sm text-text-muted mt-2">{label}</span>
    </Card>
  );
}
