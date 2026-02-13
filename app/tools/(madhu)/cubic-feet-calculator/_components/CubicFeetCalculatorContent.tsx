"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "@/app/tools/(madhu)/ToolTemplate"
import { CubicFeetCalculator } from "@/app/tools/(madhu)/cubic-feet-calculator/_components/CubicFeetCalculator"
import { Ruler, Truck, Target, Package, DollarSign, AlertCircle, Maximize, Warehouse } from "lucide-react"

export function CubicFeetCalculatorContent() {
    const howToUseSteps: Step[] = [
        {
            title: "Enter package dimensions",
            description: "Input the <b>Length, Width, and Height</b> of your package or storage unit. Accurate measurements are critical for freight quotes.",
            icon: Ruler
        },
        {
            title: "Choose your measurement unit",
            description: "Switch between <b>Inches, Centimeters, Feet, or Meters</b>. The tool automatically converts all inputs to the selected scale for precise calculation.",
            icon: Maximize
        },
        {
            title: "Review volume metrics",
            description: "View your results in <b>Cubic Feet (CFT)</b> and <b>Cubic Meters (CBM)</b>. Use these values to estimate LTL (Less Than Truckload) or FCL (Full Container Load) costs.",
            icon: Target
        }
    ]

    const howToUseGoal = {
        title: "Optimize storage & freight costs",
        description: "By knowing your exact cubic volume, you can accurately predict Amazon FBA storage fees and negotiate better rates with freight forwarders based on CBM.",
        icon: Warehouse
    }

    const hiddenTruthInsights: Insight[] = [
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
    ]

    const faqs: FAQ[] = [
        {
            question: "How do I calculate cubic feet?",
            answer: "Simply multiply the Length × Width × Height (in inches) and divide the result by 1,728. Our tool automates this and supports multiple units like Centimeters and Meters."
        },
        {
            question: "What is CBM in freight?",
            answer: "CBM stands for 'Cubic Meter'. It is the standard unit of measurement for international sea freight. 1 CBM is equivalent to 35.315 cubic feet."
        },
        {
            question: "Why should I use CFT for Amazon FBA?",
            answer: "Amazon calculates their monthly storage fees, removal fees, and disposal fees based on the cubic volume of your products measured in cubic feet. Accurate CFT calculation helps in profit forecasting."
        },
        {
            question: "How does dimensional weight affect my costs?",
            answer: "Dimensional (DIM) weight is a pricing technique used by carriers. If the cubic size of your package is large relative to its actual weight, you will be billed based on the space it occupies rather than its actual pounds."
        },
        {
            question: "What is the standard size of a pallet in cubic feet?",
            answer: "A standard US pallet (48\" x 40\") stacked to a height of 48 inches is approximately 53.33 cubic feet."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Cubic Feet Calculator"
            toolComponent={<CubicFeetCalculator />}
            howToUseSteps={howToUseSteps}
            howToUseGoal={howToUseGoal}
            hiddenTruthInsights={hiddenTruthInsights}
            faqs={faqs}
        />
    )
}
