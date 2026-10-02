import "./globals.css";
import React from "react";
import { Manrope } from "next/font/google";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", manrope.variable)}>
      <body className="antialiased min-h-screen">
        <TooltipProvider>
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}