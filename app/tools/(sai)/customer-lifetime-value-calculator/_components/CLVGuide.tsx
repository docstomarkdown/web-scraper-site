"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Users, Gem, Clock, BarChart3 } from "lucide-react";
export function CLVGuide() {
  return (
    <ToolGuide
      title="Unlocking Customer Value"
      icon={BookOpen}
      items={[
        {
          title: "The Golden Metric",
          description: "CLV is the ultimate scaling metric. If you know a customer is worth $200 Profit, you can confidently spend $50 to acquire them.",
          icon: Gem,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-500",
          stat: "3:1+",
          statColor: "text-blue-500",
          statLabel: "Ideal Ratio"
        },
        {
          title: "Retention Power",
          description: "Increasing CLV is cheaper than finding new customers. A 5% increase in retention can boost profits by up to 95%.",
          icon: Users,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-500",
          stat: "5% Ret",
          statColor: "text-blue-500",
          statLabel: "Profit Multiplier"
        },
        {
          title: "Payback Period",
          description: "This is the time it takes to earn back the cost of acquiring a customer (CAC). Shorter payback periods improve your cash flow.",
          icon: Clock,
          iconBg: "bg-purple-50",
          iconColor: "text-purple-500",
          stat: "< 6mo",
          statColor: "text-purple-500",
          statLabel: "Target Payback"
        },
        {
          title: "Customer Segmentation",
          description: "Not all customers are equal. Focus your marketing budget on acquiring 'VIP' customers who have high AOV and purchase frequency.",
          icon: BarChart3,
          iconBg: "bg-amber-50",
          iconColor: "text-amber-500",
          stat: "Top 20%",
          statColor: "text-amber-500",
          statLabel: "VIP Focus"
        },
      ]}
    />
  );
}