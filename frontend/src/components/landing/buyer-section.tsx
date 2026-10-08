import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { OfferCard } from "@/components/faircrop/cards";
import { Filter, MapPin, Package, ArrowRight } from "lucide-react";

const buyerBenefits = [
  {
    icon: Filter,
    title: "Search and filter supply",
    body: "Find crops by type, location, quantity, and availability. Compare listings from verified farmers.",
  },
  {
    icon: MapPin,
    title: "Location-aware discovery",
    body: "Find produce near your facility or distribution point. Filter by district and region.",
  },
  {
    icon: Package,
    title: "Make offers directly",
    body: "Submit offers on the quantity and price you need. No intermediary required.",
  },
  {
    icon: ArrowRight,
    title: "Negotiate and confirm",
    body: "Negotiate through FairCrop's platform and reach a deal with a clear, recorded outcome.",
  },
];

export function BuyerSection() {
  return (
    <section
      id="buyers"
      className="py-20 md:py-28 bg-foreground text-background"
      aria-labelledby="buyer-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left — copy */}
          <div className="flex flex-col gap-6">
            <p className="text-[13px] font-semibold text-primary-light uppercase tracking-widest">
              For buyers
            </p>

            <h2
              id="buyer-heading"
              className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] font-bold text-background"
            >
              Find agricultural supply directly from farmers.
            </h2>

            <p className="text-[17px] leading-[26px] text-muted">
              Discover available crops from verified farmers. Review quantity, location, and pricing.
              Make offers and negotiate directly through the platform.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mt-2">
              {buyerBenefits.map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex flex-col gap-2">
                  <div className="w-9 h-9 rounded-lg bg-white/8 border border-white/12 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-primary-light" aria-hidden="true" />
                  </div>
                  <h3 className="text-[15px] font-semibold text-background">{title}</h3>
                  <p className="text-[13px] leading-[20px] text-muted">{body}</p>
                </div>
              ))}
            </div>

            <Button
              size="lg"
              variant="outline"
              className="w-fit px-8 h-12 text-[16px] mt-2 border-white/20 text-background hover:bg-white/8 hover:text-background"
              asChild
            >
              <Link href="/register/buyer">Find Produce</Link>
            </Button>
          </div>

          {/* Right — offer card demo */}
          <div className="lg:sticky lg:top-28">
            <div className="max-w-[400px]">
              <OfferCard
                offer={{
                  id: "demo-offer",
                  buyerName: "Green Valley Foods",
                  buyerVerified: true,
                  price: 51,
                  quantity: 300,
                  unit: "kg",
                  submittedAt: "Today, 2:38 PM",
                  status: "Accepted",
                  message: "Agreed. ₹51/kg. We'll pick up on the 14th.",
                }}
              />
            </div>
            <p className="mt-4 text-[12px] text-muted max-w-[400px]">
              A sample accepted offer. The full negotiation history is preserved for both parties.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
