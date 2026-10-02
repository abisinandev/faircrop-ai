import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function FinalCTA() {
  return (
    <section
      className="py-20 md:py-28 bg-primary"
      aria-labelledby="final-cta-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2
          id="final-cta-heading"
          className="text-[36px] leading-[44px] md:text-[48px] md:leading-[56px] font-bold text-white max-w-2xl mx-auto"
        >
          Connect directly with the market.
        </h2>
        <p className="mt-5 text-[17px] leading-[26px] text-primary-light/80 max-w-lg mx-auto">
          Whether you grow crops or need supply — FairCrop gives you a direct line
          to the other side of the deal.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <Button
            size="lg"
            className="text-[16px] px-10 h-12 bg-white text-primary-dark hover:bg-primary-light font-semibold"
            asChild
          >
            <Link href="/register/farmer">I&apos;m a Farmer</Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-[16px] px-10 h-12 border-white/30 text-white hover:bg-white/10 hover:text-white"
            asChild
          >
            <Link href="/register/buyer">I&apos;m a Buyer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
