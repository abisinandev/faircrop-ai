import React from "react";
import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="bg-foreground text-muted py-14 border-t border-white/8" role="contentinfo">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-[12px]">F</span>
              </div>
              <span className="font-bold text-[16px] text-white">FairCrop</span>
            </div>
            <p className="text-[13px] leading-[20px] text-muted-foreground max-w-[220px]">
              Connecting farmers directly with legitimate agricultural buyers.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-[13px] font-semibold text-white mb-3 uppercase tracking-wider">Product</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "How It Works", href: "#how-it-works" },
                { label: "For Farmers", href: "#farmers" },
                { label: "For Buyers", href: "#buyers" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-[13px] text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-[13px] font-semibold text-white mb-3 uppercase tracking-wider">Account</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Sign In", href: "/login" },
                { label: "Register as Farmer", href: "/register/farmer" },
                { label: "Register as Buyer", href: "/register/buyer" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-[13px] font-semibold text-white mb-3 uppercase tracking-wider">Legal</h3>
            <ul className="flex flex-col gap-2.5">
              {[
                { label: "Privacy Policy", href: "/privacy" },
                { label: "Terms of Use", href: "/terms" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[13px] text-muted-foreground hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <p className="text-[12px] text-muted-foreground">
            © {new Date().getFullYear()} FairCrop. All rights reserved.
          </p>
          <p className="text-[12px] text-muted-foreground">
            Agricultural marketplace · Kerala, India
          </p>
        </div>
      </div>
    </footer>
  );
}
