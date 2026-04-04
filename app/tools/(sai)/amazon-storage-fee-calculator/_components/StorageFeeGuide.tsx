"use client"
import { ToolGuide } from "@/app/tools/_shared/components"
import { Box, Calendar, AlertTriangle, TrendingUp, BookOpen } from "lucide-react"
export function StorageFeeGuide() {
    return (
        <ToolGuide
            title="How Amazon Storage Fees Work"
            icon={BookOpen}
            items={[
                {
                    title: "Volume-Based Pricing",
                    description: "Amazon measures your product's <strong>cubic volume</strong> by multiplying Length × Width × Height (in inches), then dividing by 1,728 to get cubic feet. Your <strong>monthly storage fee</strong> is this volume × the number of units × the per-cubic-foot rate. Smaller products = lower fees per unit.",
                    icon: Box,
                    stat: "Per",
                    statLabel: "Cubic Foot",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-600",
                    tooltip: "Formula: (L × W × H ÷ 1728) × Units × Rate = Monthly Fee"
                },
                {
                    title: "Seasonal Rate Changes",
                    description: "Amazon charges <strong>standard rates</strong> from January through September (~$0.87/cu ft for standard-size). During the holiday season (<strong>October–December</strong>), rates jump to ~$2.40/cu ft — nearly <strong>3× higher</strong>. Use the Advanced Settings to toggle between seasons and plan your Q4 inventory accordingly.",
                    icon: Calendar,
                    stat: "Q4",
                    statLabel: "3× Higher",
                    iconBg: "bg-amber-50",
                    iconColor: "text-amber-600",
                    statColor: "text-amber-600",
                    tooltip: "Oct-Dec peak season rates are roughly 3× higher than Jan-Sept standard rates."
                },
                {
                    title: "Standard vs Oversize Tiers",
                    description: "Products that fit within <strong>18 × 14 × 8 inches</strong> are classified as Standard-size. Anything larger is Oversize. Oversize items have a <strong>lower per-cubic-foot rate</strong>, but because they occupy more space, the <strong>total fee per unit is often higher</strong>. The calculator auto-detects this based on your dimensions.",
                    icon: AlertTriangle,
                    stat: "Auto",
                    statLabel: "Size Detection",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-600",
                    tooltip: "Standard: ≤ 18×14×8 in. Oversize: Anything larger."
                },
                {
                    title: "Long-Term Storage Surcharges",
                    description: "Inventory that sits in Amazon warehouses for <strong>more than 6 months</strong> triggers additional aged inventory surcharges on top of the standard monthly fee. This calculator automatically adds these extra charges when your storage duration exceeds 6 months — helping you identify slow-moving stock before it becomes a costly liability.",
                    icon: TrendingUp,
                    stat: "6+",
                    statLabel: "Month Warning",
                    iconBg: "bg-red-50",
                    iconColor: "text-red-600",
                    statColor: "text-red-600",
                    tooltip: "After 6 months, Amazon charges ~$1.50/cu ft per additional month."
                }
            ]}
        />
    )
}