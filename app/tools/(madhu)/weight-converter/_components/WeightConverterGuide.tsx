"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { DollarSign, Package, AlertCircle, Scale, BookOpen } from "lucide-react"

export function WeightConverterGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Product Weights"
            icon={BookOpen}
            items={[
                {
                    title: "The 1-pound profit trap",
                    description: "Crossing from 15.9 oz to 16 oz is the most expensive fraction in e-commerce. It triggers a jump from Ground Advantage to Priority rates, often doubling costs instantly.",
                    icon: DollarSign,
                    stat: "40-70%",
                    statLabel: "Potential cost jump",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-700",
                    tooltip: "Based on 2025 estimated commercial rates for sub-1lb vs over-1lb parcels."
                },
                {
                    title: "The 'invisible' packaging weight",
                    description: "A standard 10x6x4 box weighs ~4 oz. If your product is 12 oz, that box puts you at the 1 lb limit. Always factor in dunnage when estimating tiers.",
                    icon: Package,
                    stat: "4-8 oz",
                    statLabel: "Avg. package weight",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700"
                },
                {
                    title: "DIM vs. physical weight",
                    description: "Carriers charge based on volume (L*W*H / 139) if the box is large but light. Your 'billable weight' can be much higher than what shows on a scale.",
                    icon: AlertCircle,
                    stat: "139",
                    statLabel: "Carrier DIM factor",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "139 is the standard divisor for UPS, FedEx, and DHL commercial rates."
                },
                {
                    title: "International precision",
                    description: "Supplier quotes in grams (g) or kilograms (kg) often hide small rounding errors. Even a 20g discrepancy can push you into a higher USPS tier.",
                    icon: Scale,
                    stat: "2.204",
                    statLabel: "Lbs per kilogram",
                    iconBg: "bg-slate-50",
                    iconColor: "text-slate-600",
                    statColor: "text-slate-700"
                }
            ]}
        />
    )
}
