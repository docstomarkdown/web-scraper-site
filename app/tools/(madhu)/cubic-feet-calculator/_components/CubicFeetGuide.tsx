"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { DollarSign, Package, AlertCircle, Truck, BookOpen } from "lucide-react"
export function CubicFeetGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Storage & Freight Costs"
            icon={BookOpen}
            items={[
                {
                    title: "The Amazon FBA 'Air Tax'",
                    description: "Monthly storage fees are calculated per cubic foot. A 1/2 inch error in dimension measurements across 1,000 units can cost you hundreds in 'ghost' storage fees every month.",
                    icon: DollarSign,
                    stat: "$0.87+",
                    statLabel: "Avg. cost per cu. ft.",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Based on 2024-2025 standard-size non-peak storage rates."
                },
                {
                    title: "The CBM to CFT Trap",
                    description: "Freight forwarders often quote in CBM, but US warehouses bill in CFT. 1 Cubic Meter equals 35.315 Cubic Feet. Rounding down on this conversion is a common billing error.",
                    icon: Package,
                    stat: "35.315",
                    statLabel: "CFT per Cubic Meter",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700"
                },
                {
                    title: "The DIM Weight Penalty",
                    description: "If your cubic volume is high but weight is low, carriers charge you for 'space' instead of mass. (L*W*H / 139) is the volume you pay for, even if the box is empty.",
                    icon: AlertCircle,
                    stat: "166 / 139",
                    statLabel: "Common DIM Divisors",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-700",
                    tooltip: "139 for international/express, 166 for domestic ground in many regions."
                },
                {
                    title: "Pallet Efficiency",
                    description: "A standard US pallet (48\"x40\") has a footprint of 13.33 sq ft. Maximizing 'vertical' cubic feet without exceeding height limits is the key to LTL savings.",
                    icon: Truck,
                    stat: "20-30%",
                    statLabel: "Lost 'dead' space",
                    iconBg: "bg-slate-50",
                    iconColor: "text-slate-600",
                    statColor: "text-slate-700"
                }
            ]}
        />
    )
}