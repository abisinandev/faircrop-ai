import React from 'react';
import { Button } from '@/components/ui/button';
import { CropData, OfferData } from './types';
import { StatusBadge, LocationDisplay, QuantityDisplay, VerificationBadge } from './displays';
import { PriceDisplay, MarketPriceRange } from './pricing';
import { Calendar } from 'lucide-react';

export function CropCard({ 
  crop, 
  onAction 
}: { 
  crop: CropData; 
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col bg-surface border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-sm">
      <div className="p-5 flex flex-col gap-4">
        <div className="flex justify-between items-start gap-4">
          <div>
            <h3 className="text-[22px] leading-[30px] font-semibold text-foreground">
              {crop.name}
            </h3>
            {crop.variety && (
              <p className="text-[14px] text-muted-foreground">{crop.variety}</p>
            )}
          </div>
          <StatusBadge status={crop.status} />
        </div>

        <div className="grid grid-cols-2 gap-y-3 gap-x-4">
          <QuantityDisplay quantity={crop.quantity} unit={crop.unit} label="available" />
          
          <div className="flex items-center text-muted-foreground text-[14px] gap-1.5">
            <Calendar className="w-4 h-4 shrink-0" />
            <span className="truncate">Harvest: {crop.harvestDate}</span>
          </div>
          
          <LocationDisplay location={crop.location} distance={crop.distance} className="col-span-2" />
        </div>

        <div className="mt-2 pt-4 border-t border-border flex flex-col gap-4">
          <PriceDisplay amount={crop.askingPrice} unit={crop.unit} size="lg" />
          
          {crop.marketMin !== undefined && crop.marketMax !== undefined && (
            <MarketPriceRange 
              min={crop.marketMin} 
              max={crop.marketMax} 
              unit={crop.unit} 
            />
          )}
        </div>
      </div>
      
      <div className="p-4 bg-muted/20 border-t border-border mt-auto">
        <Button className="w-full" onClick={onAction}>
          View Details
        </Button>
      </div>
    </div>
  );
}

export function OfferCard({ 
  offer, 
  onView 
}: { 
  offer: OfferData; 
  onView?: () => void;
}) {
  return (
    <div className="flex flex-col bg-surface border border-border rounded-xl p-5 gap-4">
      <div className="flex justify-between items-start gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">Buyer offer</span>
          <h4 className="text-[18px] leading-[28px] font-semibold text-foreground">
            {offer.buyerName}
          </h4>
          <VerificationBadge verified={offer.buyerVerified} label="Verified buyer" />
        </div>
        <StatusBadge status={offer.status} />
      </div>

      <div className="py-3 border-y border-border grid grid-cols-2 gap-4">
        <div>
          <PriceDisplay amount={offer.price} unit={offer.unit} size="lg" highlight />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-[12px] text-muted-foreground">Requested</span>
          <span className="text-[14px] font-medium">{offer.quantity} {offer.unit}</span>
        </div>
      </div>

      <div className="flex justify-between items-end">
        <div className="flex flex-col">
          <span className="text-[12px] text-muted-foreground">Submitted</span>
          <span className="text-[14px]">{offer.submittedAt}</span>
        </div>
        <Button variant="outline" size="sm" onClick={onView}>
          View Offer
        </Button>
      </div>
      
      {offer.message && (
        <div className="mt-1 p-3 rounded-md bg-muted/30 text-[14px] text-foreground border border-border/50 italic">
          &quot;{offer.message}&quot;
        </div>
      )}
    </div>
  );
}
