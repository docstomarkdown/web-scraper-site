"use client"
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide"
import { Scale, RefreshCw, Globe, Calculator, BookOpen } from "lucide-react"
export function WeightConverterGuide() {
    return (
        <ToolGuide
            title="Understanding Weight Conversion"
            icon={BookOpen}
            items={[
                {
                    title: "Accurate unit conversions",
                    description: "Our converter uses precise conversion factors: 1 pound = 453.592 grams, 1 ounce = 28.3495 grams. This ensures accurate conversions between imperial (lbs, oz) and metric (kg, g) units for reliable calculations.",
                    icon: Scale,
                    stat: "4 units",
                    statLabel: "Supported units",
                    iconBg: "bg-blue-50",
                    iconColor: "text-blue-600",
                    statColor: "text-blue-700",
                    tooltip: "Convert between pounds (lbs), ounces (oz), kilograms (kg), and grams (g)"
                },
                {
                    title: "Instant multi-unit display",
                    description: "When you enter a weight and select your target unit, the converter instantly shows conversions for all four units simultaneously. This makes it easy to compare weights across different measurement systems.",
                    icon: RefreshCw,
                    stat: "Real-time",
                    statLabel: "Calculations",
                    iconBg: "bg-green-50",
                    iconColor: "text-green-600",
                    statColor: "text-green-700"
                },
                {
                    title: "International compatibility",
                    description: "Perfect for converting between US measurements (lbs/oz) and international standards (kg/g). Essential for e-commerce sellers, international shipping, recipe conversions, and scientific applications.",
                    icon: Globe,
                    stat: "Worldwide",
                    statLabel: "Standards",
                    iconBg: "bg-purple-50",
                    iconColor: "text-purple-600",
                    statColor: "text-purple-700"
                },
                {
                    title: "Precise decimal handling",
                    description: "The converter handles large numbers and decimal values accurately, displaying results with appropriate precision. Large values are automatically formatted for readability while maintaining calculation accuracy.",
                    icon: Calculator,
                    stat: "High",
                    statLabel: "Precision",
                    iconBg: "bg-slate-50",
                    iconColor: "text-slate-600",
                    statColor: "text-slate-700"
                }
            ]}
        />
    )
}
