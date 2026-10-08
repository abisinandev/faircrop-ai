import React from 'react';
import { MapPin, Package, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';


// Utility to map status to semantic colors
export function getStatusType(status: string): 'success' | 'warning' | 'error' | 'info' | 'default' {
  const s = status.toLowerCase();
  if (['available', 'active', 'accepted', 'confirmed', 'delivered', 'completed'].includes(s)) return 'success';
  if (['negotiating', 'pending', 'limited quantity', 'in transit'].includes(s)) return 'warning';
  if (['rejected', 'expired', 'cancelled', 'disputed'].includes(s)) return 'error';
  if (['sold'].includes(s)) return 'info';
  return 'default';
}

export function StatusBadge({ status, type }: { status: string, type?: 'success' | 'warning' | 'error' | 'info' | 'default' }) {
  const actualType = type || getStatusType(status);
  
  const variants = {
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning-foreground border-warning/20',
    error: 'bg-error/10 text-error border-error/20',
    info: 'bg-info/10 text-info border-info/20',
    default: 'bg-muted/10 text-muted-foreground border-border',
  };

  return (
    <span className={cn("inline-flex items-center px-2.5 py-0.5 rounded-full text-[12px] font-medium border", variants[actualType])}>
      {status}
    </span>
  );
}

export function VerificationBadge({ verified, label = "Verified" }: { verified: boolean, label?: string }) {
  if (!verified) return null;
  return (
    <span className="inline-flex items-center text-success text-[14px] font-medium gap-1">
      <CheckCircle2 className="w-4 h-4" />
      {label}
    </span>
  );
}

export function LocationDisplay({ location, distance, className }: { location: string, distance?: string, className?: string }) {
  return (
    <div className={cn("flex items-center text-muted-foreground text-[14px] gap-1.5", className)}>
      <MapPin className="w-4 h-4 shrink-0" />
      <span className="truncate">{location}</span>
      {distance && (
        <>
          <span className="text-border mx-1">•</span>
          <span>{distance}</span>
        </>
      )}
    </div>
  );
}

export function QuantityDisplay({ quantity, unit, label, className }: { quantity: number, unit: string, label?: string, className?: string }) {
  return (
    <div className={cn("flex items-center text-foreground text-[14px] gap-1.5 font-medium", className)}>
      <Package className="w-4 h-4 shrink-0 text-muted-foreground" />
      <span>{quantity} {unit} {label && <span className="text-muted-foreground font-normal ml-1">{label}</span>}</span>
    </div>
  );
}
