import React from "react";
import { ShieldCheck, Eye, MessageSquare, FileText } from "lucide-react";

const pillars = [
  {
    icon: ShieldCheck,
    title: "Verified participants",
    body: "Buyers go through a verification process before they can make offers. Farmers see who they are dealing with.",
  },
  {
    icon: Eye,
    title: "Transparent market context",
    body: "Every offer is shown alongside the current market range for the crop — so both parties have the same pricing information.",
  },
  {
    icon: MessageSquare,
    title: "Negotiation history",
    body: "The full offer and counter-offer thread is recorded and visible to both the farmer and the buyer.",
  },
  {
    icon: FileText,
    title: "Clear deal terms",
    body: "When a deal is agreed, the final price, quantity, and parties are clearly documented in one place.",
  },
];

export function TrustSection() {
  return (
    <section
      className="py-20 md:py-28"
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <p className="text-[13px] font-semibold text-primary uppercase tracking-widest mb-3">
            Built for trust
          </p>
          <h2
            id="trust-heading"
            className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] font-bold text-foreground"
          >
            Both parties see the same information.
          </h2>
          <p className="mt-4 text-[17px] leading-[26px] text-muted-foreground">
            FairCrop is built around transparency. Pricing context, offer history, and deal terms
            are visible to both sides — creating a level surface for negotiation.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map(({ icon: Icon, title, body }) => (
            <div
              key={title}
              className="flex flex-col gap-3 p-5 bg-surface border border-border rounded-xl"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/12 flex items-center justify-center">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-[15px] font-semibold text-foreground">{title}</h3>
              <p className="text-[13px] leading-[20px] text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
