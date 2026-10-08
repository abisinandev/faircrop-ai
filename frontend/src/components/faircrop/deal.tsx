import React from 'react';
import { DealLifecycle, DealState } from './types';
import { StatusBadge, LocationDisplay } from './displays';
import { cn } from '@/lib/utils';
import { Check, Circle, Clock } from 'lucide-react';

export function DealStatus({
  currentStage,
  state
}: {
  currentStage: DealLifecycle;
  state?: DealState;
}) {
  const stages: DealLifecycle[] = ['Listing', 'Offer', 'Negotiation', 'Accepted', 'Deal'];
  
  const currentIndex = stages.indexOf(currentStage);

  return (
    <div className="flex flex-col gap-6 bg-surface p-5 border border-border rounded-xl">
      <h4 className="text-[14px] font-medium text-foreground">Deal Lifecycle</h4>
      
      <div className="flex items-center w-full relative">
        {stages.map((stage, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;
          return (
            <React.Fragment key={stage}>
              {/* Step */}
              <div className="flex flex-col items-center relative z-10 gap-2 flex-1">
                <div className={cn(
                  "w-6 h-6 rounded-full flex items-center justify-center text-[12px] transition-colors border",
                  isCompleted ? "bg-primary text-primary-foreground border-primary" : 
                  isCurrent ? "bg-surface border-primary text-primary ring-2 ring-primary/20 ring-offset-2" : 
                  "bg-surface border-border text-muted-foreground"
                )}>
                  {isCompleted ? <Check className="w-3.5 h-3.5" /> : 
                   isCurrent ? <Circle className="w-2 h-2 fill-current" /> : 
                   <span className="text-[10px]">{index + 1}</span>}
                </div>
                <span className={cn(
                  "text-[12px] font-medium absolute top-8 whitespace-nowrap",
                  isCurrent ? "text-foreground" : "text-muted-foreground"
                )}>
                  {stage}
                </span>
              </div>
              
              {/* Connector */}
              {index < stages.length - 1 && (
                <div className={cn(
                  "h-0.5 w-full absolute -z-0",
                  isCompleted ? "bg-primary" : "bg-border"
                )} style={{ left: `calc(${(index * 100) / (stages.length - 1)}% + 12px)`, width: `calc(${100 / (stages.length - 1)}% - 24px)` }}></div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {currentStage === 'Deal' && state && (
        <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
          <span className="text-[14px] text-muted-foreground">Current Status</span>
          <StatusBadge status={state} />
        </div>
      )}
    </div>
  );
}

export function ListingSummary({
  name,
  variety,
  quantity,
  unit,
  price,
  location,
  harvestDate,
  status
}: {
  name: string;
  variety?: string;
  quantity: number;
  unit: string;
  price: number;
  location: string;
  harvestDate: string;
  status: string;
}) {
  const format = (v: number) => `₹${v}/${unit}`;

  return (
    <div className="flex flex-col gap-4 bg-surface p-4 border border-border rounded-xl w-full">
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h4 className="text-[16px] font-semibold text-foreground">{name}</h4>
          {variety && <span className="text-[12px] text-muted-foreground">{variety}</span>}
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="grid grid-cols-2 gap-3 mt-1">
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] text-muted-foreground">Quantity</span>
          <span className="text-[14px] font-medium text-foreground">{quantity} {unit}</span>
        </div>
        
        <div className="flex flex-col gap-0.5">
          <span className="text-[12px] text-muted-foreground">Asking Price</span>
          <span className="text-[14px] font-medium text-foreground">{format(price)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2 pt-3 border-t border-border">
        <LocationDisplay location={location} />
        <div className="flex items-center text-muted-foreground text-[14px] gap-1.5">
          <Clock className="w-4 h-4 shrink-0" />
          <span>Harvest: {harvestDate}</span>
        </div>
      </div>
    </div>
  );
}
