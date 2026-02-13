"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, AlertTriangle, Shirt } from "lucide-react";

// Force rebuild
export function ReturnRateGuide() {
  return (
    <ToolGuide
      title="Understanding Return Rates"
      icon={BookOpen}
      items={[
        {
          title: "Industry Benchmarks",
          description: "Return rates vary wildly by category. Electronics might see 5-8%, while Fashion/Apparel often deals with 20-30% returns due to sizing issues.",
          icon: Shirt,
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
        },
        {
          title: "The 'Hidden' Cost",
          description: "A return isn't just a lost sale. You lose: Packaging cost, Shipping (both ways often), Payment processing fees, and Staff time.",
          icon: AlertTriangle,
          iconBg: "bg-red-50",
          iconColor: "text-red-500",
        },
      ]}
    />
  );
}
