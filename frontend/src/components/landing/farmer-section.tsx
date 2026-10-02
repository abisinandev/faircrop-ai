import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CropCard } from "@/components/faircrop/cards";
import { MapPin, TrendingUp, MessageSquare, FileCheck } from "lucide-react";

const farmerBenefits = [
  {
    icon: TrendingUp,
    title: "Market price context",
    body: "Know the current going rate for your crop before you set your price or respond to an offer.",
  },
  {
    icon: MapPin,
    title: "Reach buyers beyond your area",
    body: "Connect with verified buyers from across the region who are looking for exactly what you grow.",
  },
  {
    icon: MessageSquare,
    title: "AI-assisted negotiation",
    body: "FairCrop reviews every offer against the market and your preferences, then recommends a clear response.",
  },
  {
    icon: FileCheck,
    title: "Clear deal records",
    body: "Every agreed deal is recorded with the final price, quantity, and buyer — no ambiguity.",
  },
];

export function FarmerSection() {
  return (
    <section
      id="farmers"
      className="py-20 md:py-28"
      aria-labelledby="farmer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — crop card demo */}
          <div className="lg:sticky lg:top-28">
            <div className="max-w-[360px]">
              <CropCard
                crop={{
                  id: "demo-1",
                  name: "Tomato",
                  variety: "Local variety",
                  quantity: 500,
                  unit: "kg",
                  location: "Malappuram, Kerala",
                  harvestDate: "14 Oct 2026",
                  askingPrice: 52,
                  marketMin: 48,
                  marketMax: 53,
                  status: "Available",
                }}
              />
            </div>
            <p className="mt-4 text-[12px] text-muted-foreground max-w-[360px]">
              A sample listing as it appears to buyers. Market range is shown; your minimum price is never visible.
            </p>
          </div>

          {/* Right — copy */}
          <div className="flex flex-col gap-6">
            <p className="text-[13px] font-semibold text-primary uppercase tracking-widest">For farmers</p>

            <h2
              id="farmer-heading"
              className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] font-bold text-foreground"
            >
              Your crops. Direct access to the market.
            </h2>

            <p className="text-[17px] leading-[26px] text-muted-foreground">
              List your crop, set your price, and let FairCrop connect you with buyers and help you
              understand and evaluate every offer that comes in.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-2">
              {farmerBenefits.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-lg bg-primary/8 border border-primary/12 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
                  <p className="text-[13px] leading-[20px] text-muted-foreground">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-4 p-4 rounded-xl bg-muted/20 border border-border text-[13px] text-muted-foreground leading-relaxed">
              FairCrop does not guarantee a specific price or buyer. Market information is provided as context.
              All final decisions remain with you.
            </div>

            <Button size="lg" className="w-fit px-8 h-12 text-[16px] mt-2" asChild>
              <Link href="/register/farmer">Start Selling</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
