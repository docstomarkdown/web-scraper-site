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
          description: "Return rates vary by category. Electronics: 5-8%, Fashion: 20-30%. Understanding your segment is key to setting goals.",
          icon: Shirt,
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
          stat: "2-25%",
          statColor: "text-purple-500",
          statLabel: "Typical Range"
        },
        {
          title: "The 'Hidden' Cost",
          description: "A return costs more than you think: shipping (both ways), labor, packaging, and non-refundable payment fees.",
          icon: AlertTriangle,
          iconBg: "bg-red-50",
          iconColor: "text-red-500",
          stat: "$15+",
          statColor: "text-red-500",
          statLabel: "Est. Cost/Unit"
        },
      ]}
    />
  );
}