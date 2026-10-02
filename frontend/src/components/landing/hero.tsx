import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { NegotiationMessage } from "@/components/faircrop/negotiation";
import { Sparkles, TrendingUp } from "lucide-react";

function HeroProductVisual() {
  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Listing card */}
      <div className="bg-surface border border-border rounded-xl p-4 shadow-sm mb-3">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">New listing</p>
            <h3 className="text-[20px] font-semibold text-foreground">Tomato</h3>
            <p className="text-[13px] text-muted-foreground">Local variety · Malappuram, Kerala</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-success/10 text-success border border-success/20">
            Available
          </span>
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-border">
          <div>
            <p className="text-[12px] text-muted-foreground">500 kg available</p>
            <p className="text-[22px] font-bold text-foreground">₹52<span className="text-[14px] font-normal text-muted-foreground">/kg</span></p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground flex items-center gap-1 justify-end">
              <TrendingUp className="w-3 h-3" />
              Market range
            </p>
            <p className="text-[13px] font-medium text-foreground">₹48–₹53/kg</p>
          </div>
        </div>
      </div>

      {/* Arrow connector */}
      <div className="flex flex-col items-center my-1">
        <div className="w-0.5 h-4 bg-border" />
        <div className="w-2 h-2 border-r-2 border-b-2 border-border rotate-45 -mt-1" />
      </div>

      {/* AI Recommendation card */}
      <div className="bg-primary-light border border-primary/20 rounded-xl p-4 shadow-sm mb-3">
        <div className="flex items-center gap-1.5 mb-3 text-primary-dark font-semibold text-[13px]">
          <Sparkles className="w-4 h-4" />
          FairCrop recommendation
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2 mb-3">
          <div>
            <p className="text-[11px] text-muted-foreground">Buyer offered</p>
            <p className="text-[14px] font-semibold text-foreground">₹46/kg</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Market range</p>
            <p className="text-[14px] font-semibold text-foreground">₹48–₹53/kg</p>
          </div>
          <div>
            <p className="text-[11px] text-muted-foreground">Your minimum</p>
            <p className="text-[14px] font-semibold text-foreground">₹49/kg</p>
          </div>
          <div>
            <p className="text-[11px] text-primary font-medium">Suggested counter</p>
            <p className="text-[16px] font-bold text-primary-dark">₹51/kg</p>
          </div>
        </div>
        <p className="text-[12px] text-secondary-foreground leading-relaxed">
          The offer is below the market range and your minimum. Countering at ₹51/kg is within range.
        </p>
      </div>

      {/* Arrow connector */}
      <div className="flex flex-col items-center my-1">
        <div className="w-0.5 h-4 bg-border" />
        <div className="w-2 h-2 border-r-2 border-b-2 border-border rotate-45 -mt-1" />
      </div>

      {/* Deal confirmed card */}
      <div className="bg-surface border border-success/30 rounded-xl p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">Deal agreed</p>
            <p className="text-[18px] font-bold text-foreground mt-1">₹51/kg · 300 kg</p>
            <p className="text-[12px] text-muted-foreground mt-0.5">Green Valley Foods · Verified buyer</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-success/10 border border-success/20 flex items-center justify-center">
            <svg className="w-5 h-5 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 overflow-hidden" aria-labelledby="hero-heading">
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/30 via-background to-background pointer-events-none" aria-hidden="true" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-harvest/5 to-transparent pointer-events-none" aria-hidden="true" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 w-fit">
              <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[13px] font-medium text-primary-dark">Direct marketplace for agriculture</span>
            </div>

            <h1
              id="hero-heading"
              className="text-[40px] leading-[48px] md:text-[52px] md:leading-[60px] font-bold text-foreground tracking-tight"
            >
              Sell directly to the market.{" "}
              <span className="text-primary">Let AI negotiate for you.</span>
            </h1>

            <p className="text-[18px] leading-[28px] text-muted-foreground max-w-[520px]">
              FairCrop connects farmers directly with legitimate buyers — and gives you an intelligent
              representative to understand market prices, evaluate offers, and negotiate on your behalf.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button size="lg" className="text-[16px] px-8 h-12" render={<Link href="/register/farmer" />}>
                I&apos;m a Farmer
              </Button>
              <Button size="lg" variant="outline" className="text-[16px] px-8 h-12" render={<Link href="/register/buyer" />}>
                I&apos;m a Buyer
              </Button>
            </div>

            <p className="text-[13px] text-muted-foreground">
              Free to join. No hidden fees to list your crop.
            </p>
          </div>

          {/* Right — product visual */}
          <div className="lg:pl-8">
            <HeroProductVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
