
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  className?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
}

const ProgressBar = ({
  value,
  max,
  color = 'bg-primary',
  className,
  showLabel = false,
  size = 'md',
  animate = true,
}: ProgressBarProps) => {
  const percentage = Math.min(100, Math.round((value / max) * 100)) || 0;
  
  const heightClasses = {
    sm: 'h-1',
    md: 'h-2',
    lg: 'h-3',
  };
  
  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-1">
        {showLabel && (
          <div className="flex w-full justify-between">
            <span className="text-xs text-muted-foreground">
              {value.toLocaleString()}
            </span>
            <span className="text-xs font-medium">
              {percentage}%
            </span>
          </div>
        )}
      </div>
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", heightClasses[size])}>
        <div
          className={cn(
            "rounded-full",
            color,
            heightClasses[size],
            animate && "transition-all duration-1000"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
