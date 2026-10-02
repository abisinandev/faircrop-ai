import React from "react";
import { Users, TrendingDown, Scale, Search } from "lucide-react";

const problems = [
  {
    icon: Search,
    title: "Limited buyer visibility",
    body: "Farmers often rely on a small local network to find buyers, with little visibility into who else is purchasing the same crop and at what price.",
  },
  {
    icon: TrendingDown,
    title: "Opaque market pricing",
    body: "Without access to current market rates, it's difficult to know whether the price being offered is fair or significantly below the going rate.",
  },
  {
    icon: Scale,
    title: "Unequal negotiation",
    body: "Buyers often have more market information and negotiation experience than farmers, making it harder for farmers to hold their price.",
  },
  {
    icon: Users,
    title: "Fragmented market access",
    body: "Connecting with legitimate, verified buyers who need the specific produce available — in the right quantity and location — takes time and contacts many farmers don't have.",
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="py-20 md:py-28 bg-surface border-y border-border"
      aria-labelledby="problem-heading"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mb-14">
          <p className="text-[13px] font-semibold text-primary uppercase tracking-widest mb-3">
            The problem
          </p>
          <h2
            id="problem-heading"
            className="text-[36px] leading-[44px] md:text-[44px] md:leading-[52px] font-bold text-foreground"
          >
            Reaching the right buyer shouldn&apos;t require a middleman.
          </h2>
          <p className="mt-4 text-[17px] leading-[26px] text-muted-foreground">
            Farmers grow the produce. But getting a fair price for it often depends on who you know,
            not what the market is actually paying.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map(({ icon: Icon, title, body }) => (
            <div key={title} className="flex flex-col gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/8 border border-primary/12 flex items-center justify-center shrink-0">
                <Icon className="w-5 h-5 text-primary" aria-hidden="true" />
              </div>
              <h3 className="text-[16px] font-semibold text-foreground">{title}</h3>
              <p className="text-[14px] leading-[22px] text-muted-foreground">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
