"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Ruler, Globe, Calculator, Zap, BookOpen } from "lucide-react"
export function CubicFeetGuide() {
    return (
        <ToolGuide
            title="Why Accurate Volume Calculation Matters"
            icon={BookOpen}
            items={[
                {
                    title: "Universal Unit Support",
                    description: "Our calculator supports 4 measurement units - Feet (default), Inches, Centimeters, and Meters. Simply select your preferred unit and enter dimensions - no manual conversions needed. Perfect for international shipping where different regions use different measurement systems.",
                    icon: Globe,
                    stat: "4 Units",
                    statLabel: "Supported formats",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "Feet (ft), Inches (in), Centimeters (cm), and Meters (m) are all supported with automatic conversion."
                },
                {
                    title: "Real-Time Multi-Unit Results",
                    description: "Get instant results in three volume formats simultaneously: Cubic Feet (CFT) as the primary result, with Cubic Meters (CBM) and Cubic Inches as secondary results",
                    icon: Calculator,
                    stat: "3 Formats",
                    statLabel: "Simultaneous results",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-700",
                    tooltip: "Results update instantly as you type, showing CFT, CBM, and cubic inches with full precision."
                },
                {
                    title: "Quantity Multiplier Feature",
                    description: "Calculate volume for multiple identical items at once. Enter dimensions once, specify quantity, and get total volume instantly. Essential for bulk shipping, warehouse planning, and inventory management. Saves time when calculating pallet loads or container capacity.",
                    icon: Zap,
                    stat: "Bulk Calc",
                    statLabel: "Quantity support",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-700",
                    tooltip: "Multiply volume calculations by entering the number of identical units."
                },
                {
                    title: "Precision Matters for Cost",
                    description: "Even small measurement errors compound when calculating volume. A 0.5 inch mistake across 1,000 units can result in hundreds of dollars in incorrect storage fees or shipping costs. Our calculator ensures accuracy down to decimal precision.",
                    icon: Ruler,
                    stat: "0.5\" Error",
                    statLabel: "Can cost $100s",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Accurate measurements prevent costly billing errors in storage and freight calculations."
                }
            ]}
        />
    )
}
