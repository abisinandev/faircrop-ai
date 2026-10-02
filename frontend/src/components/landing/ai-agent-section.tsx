import React from "react";
import { NegotiationMessage } from "@/components/faircrop/negotiation";
import { Sparkles } from "lucide-react";

export function AIAgentSection() {
  return (
    <section
      className="py-20 md:py-28 bg-surface border-y border-border"
      aria-labelledby="ai-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — explanation */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/8 border border-primary/15 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
              <span className="text-[13px] font-medium text-primary-dark">Your AI representative</span>
            </div>

            <h2
              id="ai-heading"
              className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] font-bold text-foreground"
            >
              An intelligent representative that works for you.
            </h2>

            <p className="text-[17px] leading-[26px] text-muted-foreground">
              When a buyer makes an offer, FairCrop doesn&apos;t just show you a number.
              It reviews the current market range, checks your minimum price, and recommends a specific counter
              — with a plain explanation of why.
            </p>

            <div className="flex flex-col gap-4 mt-2">
              {[
                {
                  label: "Grounded in market data",
                  body: "Every recommendation is based on the current price range for your crop in your region — not a guess.",
                },
                {
                  label: "Respects your minimum",
                  body: "You set a minimum acceptable price. FairCrop never recommends accepting below it.",
                },
                {
                  label: "You stay in control",
                  body: "FairCrop recommends. You decide. Every acceptance is yours to confirm.",
                },
              ].map(({ label, body }) => (
                <div key={label} className="flex gap-3">
                  <div className="w-5 h-5 rounded-full bg-success/10 border border-success/20 flex items-center justify-center shrink-0 mt-0.5">
                    <svg className="w-3 h-3 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-[15px] font-semibold text-foreground">{label}</p>
                    <p className="text-[14px] text-muted-foreground leading-[21px]">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — live negotiation thread demo */}
          <div className="flex flex-col gap-3 bg-background rounded-2xl border border-border p-6 shadow-sm">
            <div className="pb-3 border-b border-border">
              <p className="text-[12px] text-muted-foreground font-medium uppercase tracking-wider">Live negotiation</p>
              <p className="text-[16px] font-semibold text-foreground mt-0.5">Tomato · 300 kg · Green Valley Foods</p>
            </div>

            <div className="flex flex-col gap-3 py-2">
              <NegotiationMessage
                sender="Buyer"
                message="Can you do ₹46/kg for 300 kg? We can arrange pickup tomorrow."
                time="2:31 PM"
              />
              <NegotiationMessage
                sender="FairCrop AI"
                message="The offer is below the current market range (₹48–₹53/kg) and below your minimum price. I recommend countering at ₹51/kg."
                time="2:32 PM"
              />
              <NegotiationMessage
                sender="Farmer"
                message="I can do ₹51/kg for 300 kg."
                time="2:33 PM"
                isOwn
              />
              <NegotiationMessage
                sender="Buyer"
                message="Agreed. ₹51/kg. We'll pick up on the 14th."
                time="2:38 PM"
              />
              <NegotiationMessage
                sender="System"
                message="Deal agreed at ₹51/kg · 300 kg"
                time="2:38 PM"
              />
            </div>

            <div className="pt-3 border-t border-border mt-1">
              <div className="flex items-center justify-between text-[13px]">
                <span className="text-muted-foreground">Final price</span>
                <span className="font-bold text-foreground text-[16px]">₹51/kg</span>
              </div>
              <div className="flex items-center justify-between text-[13px] mt-1">
                <span className="text-muted-foreground">Market range</span>
                <span className="text-muted-foreground">₹48–₹53/kg</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
