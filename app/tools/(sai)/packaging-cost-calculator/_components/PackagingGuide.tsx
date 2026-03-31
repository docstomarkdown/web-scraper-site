"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, Package, Clock, ShoppingCart } from "lucide-react";

export function PackagingGuide() {
    return (
        <ToolGuide
            title="Understanding Packaging Costs"
            icon={BookOpen}
            items={[
                {
                    title: "The Hidden Profit Killer",
                    description: "Most sellers account for product cost and shipping fees — but forget everything in between. A single order can consume $1–$3 in boxes, tape, labels, and filler. At 500 orders a month, that's up to $1,500 quietly draining your margin every 30 days.",
                    icon: Package,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "~$2.50",
                    statLabel: "Avg. Hidden Cost",
                    statColor: "text-rose-600",
                    tooltip: "Average packaging cost per standard e-commerce parcel across boxes, filler, tape, and labels."
                },
                {
                    title: "Your Time Is a Real Cost",
                    description: "Even if you pack orders yourself, that time has a dollar value. Spending 5 minutes per box at a $20/hr equivalent wage adds $1.67 in labor cost alone — a cost that's invisible without a calculator. Tracking it helps you decide when it's worth hiring help.",
                    icon: Clock,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "5–10 min",
                    statLabel: "Avg. Pack Time",
                    statColor: "text-amber-600"
                },
                {
                    title: "Cutting Costs Without Cutting Corners",
                    description: "Switching from rigid boxes to poly mailers can save $0.50–$1.00 per shipment for non-fragile items. Buying tape, labels, and filler in bulk (500+ units) reduces per-unit costs by up to 40%. Even small optimizations compound dramatically at scale.",
                    icon: ShoppingCart,
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-500",
                    stat: "Up to 40%",
                    statLabel: "Bulk Savings",
                    statColor: "text-emerald-600"
                }
            ]}
        />
    );
}