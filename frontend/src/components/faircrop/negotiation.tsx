import React from 'react';
import { Button } from '@/components/ui/button';
import { MessageSender } from './types';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export function AIRecommendation({
  offerPrice,
  marketMin,
  marketMax,
  minimumPrice,
  recommendedPrice,
  unit,
  reason,
  onAction,
  actionLabel = "Counter Offer"
}: {
  offerPrice: number;
  marketMin: number;
  marketMax: number;
  minimumPrice?: number;
  recommendedPrice: number;
  unit: string;
  reason: string;
  onAction?: () => void;
  actionLabel?: string;
}) {
  const format = (v: number) => `₹${v}/${unit}`;

  return (
    <div className="flex flex-col bg-accent/30 border border-accent rounded-xl p-5 gap-5">
      <div className="flex items-center gap-2 text-primary-dark font-semibold">
        <Sparkles className="w-5 h-5" />
        <span className="text-[16px]">FairCrop recommendation</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4 border-y border-border/60">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-muted-foreground">Buyer offered</span>
          <span className="text-[16px] font-medium text-foreground">{format(offerPrice)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-muted-foreground">Current market</span>
          <span className="text-[16px] font-medium text-foreground">{format(marketMin)}–{format(marketMax)}</span>
        </div>
        {minimumPrice && (
          <div className="flex flex-col gap-1">
            <span className="text-[12px] text-muted-foreground">Your minimum</span>
            <span className="text-[16px] font-medium text-foreground">{format(minimumPrice)}</span>
          </div>
        )}
        <div className="flex flex-col gap-1">
          <span className="text-[12px] font-medium text-primary">Recommended counter</span>
          <span className="text-[18px] font-bold text-primary-dark">{format(recommendedPrice)}</span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-[14px] font-medium text-foreground">Why?</span>
        <p className="text-[14px] leading-[20px] text-muted-foreground">{reason}</p>
      </div>

      <div className="mt-2">
        <Button onClick={onAction} className="w-full sm:w-auto">
          {actionLabel} at {format(recommendedPrice)}
        </Button>
      </div>
    </div>
  );
}

export function NegotiationMessage({
  sender,
  message,
  time,
  isOwn = false
}: {
  sender: MessageSender;
  message: string;
  time: string;
  isOwn?: boolean;
}) {
  const isAI = sender === 'FairCrop AI';
  const isSystem = sender === 'System';

  if (isSystem) {
    return (
      <div className="flex justify-center my-6">
        <span className="text-[12px] text-muted-foreground bg-muted/30 px-3 py-1 rounded-full border border-border/50">
          {message} • {time}
        </span>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col gap-1 max-w-[85%] w-fit", isOwn ? "self-end items-end" : "self-start items-start")}>
      <span className={cn("text-[12px] font-medium", isAI ? "text-primary flex items-center gap-1" : "text-muted-foreground")}>
        {isAI && <Sparkles className="w-3 h-3" />}
        {sender}
      </span>
      
      <div className={cn(
        "px-4 py-3 rounded-2xl text-[14px] leading-[20px]",
        isOwn ? "bg-primary text-primary-foreground rounded-br-sm" : 
        isAI ? "bg-accent/40 border border-accent text-primary-dark rounded-bl-sm" : 
        "bg-surface border border-border text-foreground rounded-bl-sm"
      )}>
        {message}
      </div>
      
      <span className="text-[11px] text-muted-foreground mt-0.5">{time}</span>
    </div>
  );
}

export function NegotiationSummary({
  cropName,
  quantity,
  unit,
  farmerAsking,
  buyerOffer,
  currentCounter,
  marketMin,
  marketMax,
  round,
  totalRounds = 5,
  status
}: {
  cropName: string;
  quantity: number;
  unit: string;
  farmerAsking: number;
  buyerOffer: number;
  currentCounter?: number;
  marketMin: number;
  marketMax: number;
  round: number;
  totalRounds?: number;
  status: string;
}) {
  const format = (v: number) => `₹${v}/${unit}`;

  return (
    <div className="flex flex-col bg-surface border border-border rounded-xl p-5 gap-5">
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">Negotiation Summary</span>
          <h3 className="text-[18px] font-semibold text-foreground mt-1">{cropName} • {quantity} {unit}</h3>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="inline-flex px-2 py-0.5 rounded text-[12px] font-medium bg-muted/20 text-muted-foreground border">
            Round {round} of {totalRounds}
          </span>
          <span className="text-[12px] font-medium text-warning-foreground">{status}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-muted/10 rounded-lg border border-border/50">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-muted-foreground">Farmer asking</span>
          <span className="text-[14px] font-medium">{format(farmerAsking)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-muted-foreground">Buyer offer</span>
          <span className="text-[14px] font-medium">{format(buyerOffer)}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-primary">Current counter</span>
          <span className="text-[14px] font-bold text-primary-dark">{currentCounter ? format(currentCounter) : '-'}</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-muted-foreground">Market range</span>
          <span className="text-[14px] font-medium text-muted-foreground">{format(marketMin)}–{format(marketMax)}</span>
        </div>
      </div>
    </div>
  );
}
