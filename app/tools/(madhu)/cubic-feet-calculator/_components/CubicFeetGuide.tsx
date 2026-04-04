"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Globe, DollarSign, Layers, TrendingUp, BookOpen } from "lucide-react"

export function CubicFeetGuide() {
    return (
        <ToolGuide
            title="Why Accurate Volume Calculation Matters"
            icon={BookOpen}
            items={[
                {
                    title: "4 Input Units, 3 Output Formats",
                    description: "Enter dimensions in Feet, Inches, Centimeters, or Meters — whatever your source data uses. The Results Panel always outputs Cubic Feet (CFT), Cubic Meters (CBM), and Cubic Inches simultaneously, so you have the right number for every platform: Amazon FBA, sea freight, or local storage.",
                    icon: Globe,
                    stat: "4 → 3",
                    statLabel: "Units in, formats out",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "Feet, Inches, CM, Meters in — CFT, CBM, cubic inches out."
                },
                {
                    title: "Multi-Currency Cost Estimation",
                    description: "Select any currency (USD, GBP, EUR, INR, and 50+ more) and enter a cost-per-ft³ rate. The tool calculates your Estimated Total Cost instantly, complete with the correct currency symbol — essential for freight quoting and storage fee budgeting across regions.",
                    icon: DollarSign,
                    stat: "50+",
                    statLabel: "Currencies supported",
                    iconBg: "bg-emerald-50",
                    iconColor: "text-emerald-600",
                    statColor: "text-emerald-700",
                    tooltip: "Currency symbols are fetched from the shared currency list — always accurate."
                },
                {
                    title: "Batch Volume with Quantity Multiplier",
                    description: "Enter dimensions once and specify how many identical units you have. The \"Total Volume\" card shows the combined volume for the entire batch, while the hero still shows the single-unit figure — giving you both at the same time without extra math.",
                    icon: Layers,
                    stat: "Bulk",
                    statLabel: "Quantity support",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-700",
                    tooltip: "Multiply volume for any quantity of identical items in one calculation."
                },
                {
                    title: "Precision Prevents Costly Errors",
                    description: "Even a 0.5 inch measurement error, compounded across 1,000 units, can mean hundreds of dollars in incorrect storage fees or freight charges. Our calculator outputs up to 4 decimal places for CBM and 2 decimal places for CFT — the precision Amazon FBA and freight carriers actually need.",
                    icon: TrendingUp,
                    stat: "0.5″",
                    statLabel: "Error = $100s lost",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-700",
                    tooltip: "Decimal precision avoids billing errors in FBA fees and LTL/FTL freight quotes."
                }
            ]}
        />
    )
}
