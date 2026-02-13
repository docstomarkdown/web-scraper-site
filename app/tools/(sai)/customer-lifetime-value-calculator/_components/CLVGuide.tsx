"use client";

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Users, Gem } from "lucide-react";

export function CLVGuide() {
  return (
    <ToolGuide
      title="Unlocking Customer Value"
      icon={BookOpen}
      items={[
        {
          title: "The Golden Metric",
          description: "CLV is the single most important metric for scaling. If you know a customer is worth $200 over their life, you can comfortably spend $50 to acquire them.",
          icon: Gem,
          iconBg: "bg-blue-50",
          iconColor: "text-blue-500",
        },
        {
          title: "Retention vs. Acquisition",
          description: "Increasing CLV is often cheaper than finding new customers. A 5% increase in retention can increase profits by 25-95%.",
          icon: Users,
          iconBg: "bg-emerald-50",
          iconColor: "text-emerald-500",
        },
      ]}
    />
  );
}
