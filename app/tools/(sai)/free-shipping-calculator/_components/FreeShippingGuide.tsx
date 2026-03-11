"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Target, ShieldCheck, Users } from "lucide-react";
export function FreeShippingGuide() {
    return (
        <ToolGuide
            title="Understanding Free Shipping Thresholds"
            icon={BookOpen}
            items={[
                {
                    title: "Why Free Shipping Works",
                    description: "Free shipping is one of the strongest psychological triggers for purchase. Unexpected shipping costs are the #1 reason for cart abandonment.",
                    icon: Users,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "60%",
                    statColor: "text-blue-600",
                    statLabel: "Cart Abandonment Rate",
                    tooltip: "Percentage of shoppers who leave due to extra costs."
                },
                {
                    title: "Setting the Right Threshold",
                    description: "A common strategy is to set your free shipping threshold 15-30% higher than your current Average Order Value (AOV). This encourages customers to add 'one more item'.",
                    icon: Target,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "+20%",
                    statColor: "text-blue-600",
                    statLabel: "Ideal Threshold Uplift",
                    tooltip: "Target Threshold = Current AOV * 1.2"
                },
                {
                    title: "Protecting Your Margins",
                    description: "Never offer free shipping if it eats your entire profit margin. Use this calculator to ensure that the increase in sales volume outweighs the cost of shipping absorption.",
                    icon: ShieldCheck,
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-500",
                    stat: "Profitable?",
                    statColor: "text-purple-600",
                    statLabel: "Calculate Net Impact",
                    tooltip: "Ensure the sales lift covers the shipping cost."
                }
            ]}
        />
    );
}