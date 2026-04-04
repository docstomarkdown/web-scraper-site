"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { Box, Calculator, Zap, BookOpen } from "lucide-react";
export function DimWeightGuide() {
    const items = [
        {
            title: "Understanding Package Density",
            description: "Dimensional weight (DIM weight) is a pricing technique that reflects package density. Carriers always charge based on the greater of the Actual Weight or the Dimensional Weight.",
            icon: Box,
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            stat: "Density",
            statColor: "text-blue-600",
            statLabel: "Pricing Factor",
        },
        {
            title: "The Calculation Formula",
            description: "The formula is (Length × Width × Height) / Divisor. Common divisors are 139 for daily rates (UPS/FedEx) and 166 for retail rates. Always round up dimensions to the nearest inch.",
            icon: Calculator,
            iconBg: "bg-green-100",
            iconColor: "text-green-600",
            stat: "139",
            statColor: "text-green-600",
            statLabel: "Common Divisor",
        },
        {
            title: "Optimization Strategies",
            description: "To reduce costs, use the smallest box possible. Avoid 'shipping air' by using custom-sized boxes or poly mailers. Negotiating a higher DIM divisor with your carrier can also reduce billable weight.",
            icon: Zap,
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            stat: "Save %",
            statColor: "text-amber-600",
            statLabel: "Optimize Packaging",
        },
    ];
    return <ToolGuide title="Understanding Dimensional Weight" icon={BookOpen} items={items} />;
}