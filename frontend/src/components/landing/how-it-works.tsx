import React from "react";

const steps = [
  {
    number: "01",
    title: "List your crop",
    body: "Add your crop, quantity, harvest date, location, and asking price. Set a minimum price that only FairCrop can see — buyers never know your floor.",
    detail: "Tomato · 500 kg · Malappuram, Kerala · ₹52/kg asking",
  },
  {
    number: "02",
    title: "Reach verified buyers",
    body: "Your listing is visible to verified buyers looking for agricultural produce. No cold calls. No intermediaries required.",
    detail: "Green Valley Foods · Verified buyer · Kozhikode",
  },
  {
    number: "03",
    title: "FairCrop handles the negotiation",
    body: "When a buyer makes an offer, FairCrop reviews it against current market prices and your preferences — then recommends a response with a clear explanation.",
    detail: "Offer ₹46/kg · Market ₹48–₹53/kg · Suggested counter ₹51/kg",
  },
  {
    number: "04",
    title: "You approve. Deal done.",
    body: "You stay in control of every decision. FairCrop presents the recommendation, but you decide. Once agreed, the deal is recorded and both parties have clear terms.",
    detail: "Deal confirmed · ₹51/kg · 300 kg · Green Valley Foods",
  },
];

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28"
      aria-labelledby="how-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <p className="text-[13px] font-semibold text-primary uppercase tracking-widest mb-3">
            How it works
          </p>
          <h2
            id="how-heading"
            className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] font-bold text-foreground"
          >
            From listing to deal in four steps.
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative">
          {/* Connector line on desktop */}
          <div
            className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-border"
            aria-hidden="true"
          />

          {steps.map((step, i) => (
            <div key={step.number} className="flex flex-col gap-4 relative">
              {/* Step number bubble */}
              <div className="w-16 h-16 rounded-full bg-primary-light border-2 border-primary/20 flex items-center justify-center relative z-10">
                <span className="text-[22px] font-bold text-primary-dark">{i + 1}</span>
              </div>

              <div className="flex flex-col gap-2">
                <h3 className="text-[18px] font-semibold text-foreground">{step.title}</h3>
                <p className="text-[14px] leading-[22px] text-muted-foreground">{step.body}</p>
              </div>

              {/* Example context chip */}
              <div className="mt-auto pt-2">
                <span className="text-[12px] text-muted-foreground bg-muted/30 border border-border px-3 py-1.5 rounded-lg block font-mono leading-relaxed">
                  {step.detail}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
