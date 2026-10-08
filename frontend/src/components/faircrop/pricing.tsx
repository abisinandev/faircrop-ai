import React from 'react';
import { cn } from '@/lib/utils';

export function PriceDisplay({ 
  amount, 
  unit, 
  label, 
  size = 'md',
  highlight = false,
  className
}: { 
  amount: number; 
  unit?: string; 
  label?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  highlight?: boolean;
  className?: string;
}) {
  const formatted = new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);
  
  const sizeClasses = {
    sm: { amount: 'text-[16px]', unit: 'text-[14px]', label: 'text-[12px]' },
    md: { amount: 'text-[18px]', unit: 'text-[14px]', label: 'text-[12px]' },
    lg: { amount: 'text-[24px]', unit: 'text-[16px]', label: 'text-[14px]' },
    xl: { amount: 'text-[32px]', unit: 'text-[18px]', label: 'text-[14px]' }
  };

  return (
    <div className={cn("flex flex-col", className)}>
      {label && <span className={cn("text-muted-foreground mb-0.5", sizeClasses[size].label)}>{label}</span>}
      <div className="flex items-baseline gap-0.5">
        <span className={cn("font-bold tracking-tight", sizeClasses[size].amount, highlight ? 'text-primary' : 'text-foreground')}>
          {formatted}
        </span>
        {unit && (
          <span className={cn("text-muted-foreground font-medium", sizeClasses[size].unit)}>
            /{unit}
          </span>
        )}
      </div>
    </div>
  );
}

export function MarketPriceRange({ 
  min, 
  max, 
  current, 
  unit,
  className
}: { 
  min: number; 
  max: number; 
  current?: number; 
  unit: string;
  className?: string;
}) {
  const format = (v: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(v);
  
  let percent = 0;
  if (current !== undefined && max > min) {
    percent = Math.max(0, Math.min(100, ((current - min) / (max - min)) * 100));
  }

  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <div className="flex justify-between text-[12px] text-muted-foreground">
        <span>Current market range</span>
      </div>
      
      <div className="relative pt-6 pb-4">
        {/* Track */}
        <div className="h-2 bg-muted/30 rounded-full w-full overflow-hidden">
          <div className="h-full bg-harvest/40 rounded-full w-full"></div>
        </div>
        
        {/* Min/Max Labels */}
        <div className="absolute top-10 left-0 text-[12px] font-medium text-muted-foreground">{format(min)}</div>
        <div className="absolute top-10 right-0 text-[12px] font-medium text-muted-foreground">{format(max)}/{unit}</div>

        {/* Current Pin */}
        {current !== undefined && (
          <div 
            className="absolute top-0 -ml-4 flex flex-col items-center transition-all duration-300"
            style={{ left: `${percent}%` }}
          >
            <span className="text-[12px] font-bold text-foreground bg-surface px-1.5 py-0.5 rounded shadow-sm border border-border">
              {format(current)}
            </span>
            <div className="w-0.5 h-2 bg-primary mt-0.5 rounded-full"></div>
          </div>
        )}
      </div>
    </div>
  );
}
