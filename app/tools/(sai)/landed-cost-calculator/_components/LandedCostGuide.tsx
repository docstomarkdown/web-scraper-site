"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { BookOpen, CircleDollarSign, ShieldCheck, Ship, TrendingDown } from "lucide-react";

export function LandedCostGuide() {
    return (
        <ToolGuide
            title="Understanding Landed Cost"
            icon={BookOpen}
            items={[
                {
                    title: "Product Cost: Your Starting Point",
                    description: "The ex-works (EXW) or FOB price from your supplier is the foundation of your landed cost. This is the raw unit price before any logistics are added. Negotiating this number down is your primary lever for improving profit margins.",
                    icon: CircleDollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Base",
                    statColor: "text-blue-600",
                    statLabel: "Your starting unit price",
                    tooltip: "The price your supplier charges per unit, before any logistics."
                },
                {
                    title: "Customs & Duties Add Up Fast",
                    description: "Import duties are taxes charged by the destination country on your goods. The rate is based on your product's HS (Harmonized System) code. On high-value shipments, even a 5% duty rate can significantly inflate your per-unit cost — always check your rate before placing an order.",
                    icon: ShieldCheck,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "Duty",
                    statColor: "text-amber-600",
                    statLabel: "Import tariff on goods",
                    tooltip: "Calculated as a percentage of your total product value."
                },
                {
                    title: "Freight Method Changes Everything",
                    description: "Sea freight is typically 4–8x cheaper than air freight but takes 3–6 weeks. Air freight is fast (3–7 days) but expensive. Choosing the wrong mode can either destroy your margins or leave you out of stock. Always model both options before committing.",
                    icon: Ship,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "Freight",
                    statColor: "text-blue-600",
                    statLabel: "Getting goods to your door",
                    tooltip: "Sea vs. air: cost vs. speed trade-off."
                },
                {
                    title: "Landed Cost Per Unit Is the Only Price That Matters",
                    description: "The landed cost per unit is the true price you pay to get one item into your warehouse. It is the only number you should use when calculating margins, setting your selling price, or comparing suppliers. Ignoring it is the most common reason e-commerce sellers unknowingly lose money on imports.",
                    icon: TrendingDown,
                    iconBg: "bg-violet-50",
                    iconColor: "text-violet-500",
                    stat: "Total",
                    statColor: "text-violet-600",
                    statLabel: "True cost to your warehouse",
                    tooltip: "Product cost + shipping + duties + fees ÷ units ordered."
                }
            ]}
        />
    );
}
