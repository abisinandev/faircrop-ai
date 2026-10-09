import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Sparkles, TrendingUp, MapPin, ShieldCheck } from "lucide-react";

function HeroProductVisual() {
  return (
    <div className="relative w-full">
      {/* Main image + cards layout matching Figma */}
      <div className="relative flex items-start justify-center">
        {/* Farmer image */}
        <div className="relative z-10 w-[260px] sm:w-[300px] shrink-0">
          <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/20">
            <Image
              src="/farmer-hero.jpg"
              alt="Farmer with basket of fresh vegetables"
              width={300}
              height={420}
              className="w-full h-[360px] sm:h-[420px] object-cover object-top"
              priority
            />
          </div>
        </div>

        {/* Cards overlapping on right */}
        <div className="relative z-20 flex flex-col gap-3 ml-[-40px] mt-8 max-w-[240px] sm:max-w-[270px]">
          {/* Crop Listing Card */}
          <div className="bg-white border border-border rounded-xl p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">
                Crop Listing
              </p>
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-success/10 text-success border border-success/20">
                Verified
              </span>
            </div>
            <h3 className="text-[18px] font-bold text-foreground mb-2">Tomato</h3>
            <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-2">
              <div>
                <p className="text-[10px] text-muted-foreground">Available</p>
                <p className="text-[13px] font-bold text-foreground">500 kg</p>
              </div>
              <div>
                <p className="text-[10px] text-muted-foreground">Asking</p>
                <p className="text-[13px] font-bold text-primary">₹52/kg</p>
              </div>
            </div>
            <p className="text-[11px] text-muted-foreground flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              Malappuram, Kerala
            </p>
          </div>

          {/* Buyer offer card */}
          <div className="bg-white border border-border rounded-xl p-3 shadow-md">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                </div>
                <div>
                  <p className="text-[12px] font-semibold text-foreground leading-tight">
                    Green Valley Foods
                  </p>
                  <p className="text-[10px] text-muted-foreground">Buyer offer · 300 kg</p>
                </div>
              </div>
              <p className="text-[13px] font-bold text-foreground">₹46/kg</p>
            </div>
          </div>

          {/* AI Recommendation card */}
          <div className="bg-primary-light border border-primary/20 rounded-xl p-3 shadow-md">
            <div className="flex items-center gap-1.5 mb-2 text-primary font-semibold text-[11px]">
              <Sparkles className="w-3.5 h-3.5" />
              FairCrop recommendation
            </div>
            <p className="text-[10px] text-primary-dark/70 mb-2">Offer analysis</p>
            <div className="flex items-center justify-between mb-1">
              <p className="text-[11px] text-primary-dark/80">Market range</p>
              <p className="text-[11px] font-semibold text-primary-dark">₹48–₹53/kg</p>
            </div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-[11px] text-primary-dark/80">Farmer minimum</p>
              <p className="text-[11px] font-semibold text-primary-dark">₹49/kg</p>
            </div>
            <div className="bg-white/60 rounded-lg p-2 border border-primary/15">
              <p className="text-[9px] font-bold text-primary uppercase tracking-wider mb-0.5">
                Suggested Counter
              </p>
              <p className="text-[18px] font-bold text-primary-dark">₹51/kg</p>
            </div>
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
      <div className="absolute inset-0 bg-gradient-to-b from-primary-light/40 via-background to-background pointer-events-none" aria-hidden="true" />
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

            {/* Social proof stats */}
            <div className="flex items-center gap-6 pt-2 border-t border-border">
              <div>
                <p className="text-[22px] font-bold text-foreground">1,200+</p>
                <p className="text-[12px] text-muted-foreground">Farmers registered</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-[22px] font-bold text-foreground">₹4.2Cr</p>
                <p className="text-[12px] text-muted-foreground">Deals facilitated</p>
              </div>
              <div className="w-px h-8 bg-border" />
              <div>
                <p className="text-[22px] font-bold text-foreground">98%</p>
                <p className="text-[12px] text-muted-foreground">Satisfaction rate</p>
              </div>
            </div>
          </div>

          {/* Right — product visual */}
          <div className="lg:pl-4">
            <HeroProductVisual />
          </div>
        </div>
      </div>
    </section>
  );
}
