"use client"

import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { TrendingDown, AlertTriangle, Truck, DollarSign, BookOpen } from "lucide-react"

export function PalletGuide() {
    return (
        <ToolGuide
            title="The Hidden Truth About Pallet Optimization"
            icon={BookOpen}
            items={[
                {
                    title: "The 'Dead Space' Tax",
                    description: "Poor pallet configuration can waste 20-40% of available space. Every inch of unused pallet space is money lost on freight, storage, and handling fees.",
                    icon: TrendingDown,
                    stat: "15-25%",
                    statLabel: "Average logistics waste",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-700",
                    tooltip: "Rotating your box orientation can often reclaim 10% more pallet surface area."
                },
                {
                    title: "The 72-Inch Safety Wall",
                    description: "Most LTL (Less Than Truckload) shipments are optimized for 72 inches. Going higher often prevents 'double stacking,' leading to premium surcharges or height rejections at the terminal.",
                    icon: AlertTriangle,
                    stat: "72 inches",
                    statLabel: "Ideal stack height",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Standard trailer height is ~110\", allowing two 48-52\" pallets or one 72-96\" pallet."
                },
                {
                    title: "Weight Capacity Pitfall",
                    description: "Pallets have physical weight limits (standard wood pallets: ~2,500 lbs). Overloading the base layer causes the wood to warp, leading to stack collapse during transit.",
                    icon: Truck,
                    stat: "2,500 lb",
                    statLabel: "Safe wood load limit",
                    iconBg: "bg-orange-50",
                    iconColor: "text-orange-600",
                    statColor: "text-orange-700",
                    tooltip: "Check your box crush strength (ECT rating) before stacking high with heavy items."
                },
                {
                    title: "The FBA 'Perfect' Pallet",
                    description: "Amazon FBA has strict 72\" and 1,500 lb limits. Exceeding these triggers 'Manual Processing' fees or stock rejections. Always leave a 2-3 inch safety buffer for stretch wrap.",
                    icon: DollarSign,
                    stat: "1,500 lb",
                    statLabel: "Amazon FBA Max Weight",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "Use our Amazon FBA preset to ensure compliance with warehouse standards."
                }
            ]}
        />
    )
}
