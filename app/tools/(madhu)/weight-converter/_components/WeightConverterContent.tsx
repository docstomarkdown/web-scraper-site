"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "../../ToolTemplate"
import { WeightConverter } from "./WeightConverter"
import { Scale, Truck, Target, Package, DollarSign, AlertCircle } from "lucide-react"

export function WeightConverterContent() {
    const howToUseSteps: Step[] = [
        {
            title: "Set your input weight",
            description: "Enter your product's weight as provided by your supplier. Be sure to include <b>packaging materials</b> (box, tape, labels) for an accurate shipping estimate.",
            icon: Scale
        },
        {
            title: "Configure target units",
            description: "Select your input unit and your preferred target unit. The tool will instantly show your main result and synchronize across the full <b>conversion matrix</b>.",
            icon: Target
        },
        {
            title: "Analyze shipping impact",
            description: "Review the 'Shipping impact analysis' card to see which carrier tier your product falls into. Watch for <b>critical cost warnings</b> if you are near a weight threshold.",
            icon: Truck
        }
    ]

    const howToUseGoal = {
        title: "Maximize shipping efficiency",
        description: "Use the live data to see if lowering product weight by even a fraction of an ounce can move you into a cheaper shipping tier, saving you thousands in annual fees.",
        icon: Target
    }

    const hiddenTruthInsights: Insight[] = [
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
    ]

    const faqs: FAQ[] = [
        {
            question: "What is the 'Conversion matrix'?",
            answer: "The conversion matrix provides a live view of your input weight across all four standard e-commerce units: Ounces (oz), Pounds (lbs), Grams (g), and Kilograms (kg). This allows you to quickly verify weights for both domestic and international logistics."
        },
        {
            question: "What is a 'Lightweight' shipping tier?",
            answer: "The lightweight tier applies to packages under 1 lb (15.99 oz). These are eligible for USPS Ground Advantage, which is the most cost-effective shipping method for e-commerce sellers."
        },
        {
            question: "Why should I select a 'Target unit'?",
            answer: "Setting a target unit highlights that specific conversion as your primary result. This is useful for quickly filling out shipping templates or Amazon FBA listings that require a specific unit of measure."
        },
        {
            question: "How accurate are the estimated shipping costs?",
            answer: "The costs shown are 2025 estimates for commercial rates. Actual costs may vary based on your specific carrier contract, shipping zone (distance), and current fuel surcharges."
        },
        {
            question: "Can I save money by reducing product weight?",
            answer: "Yes. By identifying your current tier, you can see how close you are to the next cheaper threshold. Reducing packaging weight or minor product modifications can often yield significant margin increases."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Product Weight Converter"
            toolComponent={<WeightConverter />}
            howToUseSteps={howToUseSteps}
            howToUseGoal={howToUseGoal}
            hiddenTruthInsights={hiddenTruthInsights}
            faqs={faqs}
        />
    )
}
