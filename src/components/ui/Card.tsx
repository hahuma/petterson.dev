import { cn } from '@/lib/cn';

type CardHoverVariant = 'none' | 'up' | 'right';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: CardHoverVariant;
  as?: 'div' | 'article';
}

const hoverStyles: Record<CardHoverVariant, string> = {
  none: '',
  up: 'hover:border-accent-cyan/20 hover:-translate-y-1',
  right: 'hover:border-accent-cyan/30 hover:translate-x-2',
};

export function Card({ children, className, hover = 'none', as: Component = 'div' }: CardProps) {
  return (
    <Component
      className={cn(
        'bg-bg-card border border-white/5 rounded-xl transition-all duration-300',
        hoverStyles[hover],
        className
      )}
    >
      {children}
    </Component>
  );
}
