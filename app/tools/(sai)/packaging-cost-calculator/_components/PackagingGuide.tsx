"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Package, Scissors, Timer } from "lucide-react";

export function PackagingGuide() {
    return (
        <ToolGuide
            title="Understanding Packaging Costs"
            icon={BookOpen}
            items={[
                {
                    title: "The Silent Profit Killer",
                    description: "Many sellers only calculate the cost of the item and shipping, forgetting the box, tape, and labels. These small costs, usually $1-$3 per order, add up to thousands per year.",
                    icon: Package,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "$2.50",
                    statLabel: "Avg. Hidden Cost",
                    tooltip: "Average packaging cost for a standard e-commerce parcel."
                },
                {
                    title: "Labor is a Cost",
                    description: "Even if you pack orders yourself, your time has value. If it takes 5 minutes to pack an order and your time is worth $30/hr, that's $2.50 in labor cost per package.",
                    icon: Timer,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                },
                {
                    title: "Optimizing Materials",
                    description: "Switching from a box to a poly mailer can save $0.50-$1.00 per shipment. Buying tape and labels in bulk can reduce costs by 40%.",
                    icon: Scissors,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                }
            ]}
        />
    );
}
