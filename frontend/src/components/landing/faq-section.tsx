"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "How does FairCrop work?",
    a: "Farmers create listings with their crop details, quantity, location, and asking price. Buyers discover listings and make offers. FairCrop evaluates offers against current market prices and the farmer's preferences, then recommends a response with a clear explanation. The farmer approves every action.",
  },
  {
    q: "Who can buy on FairCrop?",
    a: "Buyers go through a verification process before they can make offers. This is designed to ensure that farmers are dealing with legitimate agricultural buyers. Buyers see verified status clearly on every listing interaction.",
  },
  {
    q: "How does the AI negotiation work?",
    a: "When a buyer submits an offer, FairCrop checks it against the current market price range for that crop and region, and against the minimum price the farmer has set privately. It then recommends a specific counter-offer with a plain explanation of why — such as 'This offer is below the market range and below your minimum. Countering at ₹51/kg is within the current market range.' The farmer reviews this and decides.",
  },
  {
    q: "Can farmers control their minimum price?",
    a: "Yes. Farmers set a minimum acceptable price when creating a listing. This is completely private — buyers never see it. FairCrop uses it internally when evaluating offers and recommendations.",
  },
  {
    q: "Does FairCrop automatically accept deals?",
    a: "No. Every acceptance is confirmed by the farmer. FairCrop recommends actions and explains its reasoning, but the farmer makes every final decision.",
  },
  {
    q: "What happens if I disagree with FairCrop's recommendation?",
    a: "You can override it at any point. The recommendation is a suggestion based on market data and your preferences. You can enter your own price or accept an offer as-is — the choice is always yours.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  const id = q.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  return (
    <div className="border-b border-border last:border-0">
      <button
        className="w-full flex items-center justify-between gap-4 py-5 text-left"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={`faq-${id}`}
      >
        <span className="text-[16px] font-semibold text-foreground">{q}</span>
        <ChevronDown
          className={cn(
            "w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200",
            open && "rotate-180"
          )}
          aria-hidden="true"
        />
      </button>
      <div
        id={`faq-${id}`}
        role="region"
        aria-labelledby={`faq-btn-${id}`}
        className={cn(
          "overflow-hidden transition-all duration-200",
          open ? "max-h-96 pb-5" : "max-h-0"
        )}
      >
        <p className="text-[15px] leading-[24px] text-muted-foreground">{a}</p>
      </div>
    </div>
  );
}

export function FAQSection() {
  return (
    <section
      className="py-20 md:py-28 bg-surface border-t border-border"
      aria-labelledby="faq-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-3 gap-12 lg:gap-20">
          <div>
            <p className="text-[13px] font-semibold text-primary uppercase tracking-widest mb-3">
              FAQ
            </p>
            <h2
              id="faq-heading"
              className="text-[32px] leading-[40px] font-bold text-foreground"
            >
              Common questions.
            </h2>
            <p className="mt-4 text-[15px] leading-[23px] text-muted-foreground">
              If your question isn&apos;t answered here, contact us and we will help you.
            </p>
          </div>

          <div className="lg:col-span-2">
            {faqs.map((item) => (
              <FAQItem key={item.q} q={item.q} a={item.a} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
