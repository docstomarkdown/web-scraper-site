"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingUp, AlertTriangle, CircleDollarSign, BookOpen } from "lucide-react"
export function DimensionConverterGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Converted Dimensions Profitability"
            icon={BookOpen}
            items={[
                {
                    title: "The DIM Weight Trap",
                    description: "Converts cubic volume specifically for air freight and courier billing. Formula: (L × W × H) in inches / 139 is the standard US divisor. Large boxes are often billed at double their real weight due to volume.",
                    icon: TrendingUp,
                    iconBg: "bg-rose-50",
                    iconColor: "text-rose-500",
                    stat: "139 Factor",
                    statLabel: "Volumetric Weight Divisor",
                    statColor: "text-rose-600"
                },
                {
                    title: "Oversized Surcharges",
                    description: "Length + Girth (2W + 2H) exceeding 130 inches alerts carriers for extra fees. A single centimeter error can push a box into 'Oversized' pricing tiers. Stay under the threshold by optimizing your packaging dimensions.",
                    icon: AlertTriangle,
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-500",
                    stat: "130 Inch",
                    statLabel: "Girth Limit Threshold",
                    statColor: "text-amber-600"
                },
                {
                    title: "Precise Warehousing",
                    description: "Warehousing centers charge by precise cubic centimeters or inches. Accurate unit conversion prevents overpaying for shelf space. Small height savings directly correlate to reduced annual overhead.",
                    icon: CircleDollarSign,
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-500",
                    stat: "4X Peak",
                    statLabel: "Holiday Storage Surcharges",
                    statColor: "text-blue-600"
                }
            ]}
        />
    )
}