
import React from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const DashboardCard = ({
  title,
  subtitle,
  children,
  className,
  action,
}: DashboardCardProps) => {
  return (
    <div 
      className={cn(
        "bg-white rounded-xl border border-border/40 shadow-sm overflow-hidden transition-all",
        "hover:shadow-md hover:border-border/60",
        "animate-fade-in",
        className
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-border/40">
        <div>
          <h3 className="font-medium text-sm text-foreground">{title}</h3>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
        </div>
        {action && <div className="ml-4">{action}</div>}
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
};

export default DashboardCard;
