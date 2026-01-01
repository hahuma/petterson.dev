import { cn } from '@/lib/cn';

type IconBoxSize = 'sm' | 'md';

interface IconBoxProps {
  size?: IconBoxSize;
  children: React.ReactNode;
  className?: string;
}

const sizeStyles: Record<IconBoxSize, string> = {
  sm: 'w-10 h-10',
  md: 'w-11 h-11',
};

export function IconBox({ size = 'md', children, className }: IconBoxProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center rounded-[10px] bg-accent-cyan/10',
        sizeStyles[size],
        '[&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-accent-cyan',
        className
      )}
    >
      {children}
    </div>
  );
}
