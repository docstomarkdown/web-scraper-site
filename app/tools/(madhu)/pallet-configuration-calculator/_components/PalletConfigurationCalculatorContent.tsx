"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "@/app/tools/(madhu)/ToolTemplate"
import { PalletConfigurationCalculator } from "./PalletConfigurationCalculator"
import { Package, Grid3x3, Target, Layers, TrendingDown, AlertTriangle, Truck, DollarSign } from "lucide-react"


export function PalletConfigurationCalculatorContent() {
    const howToUseSteps: Step[] = [
        {
            title: "Enter product box dimensions",
            description: "Input the <b>Length, Width, and Height</b> of your product box. Choose between <b>Inches or Centimeters</b> for precise measurements.",
            icon: Package
        },
        {
            title: "Select pallet type",
            description: "Choose from <b>Standard US (48\"×40\")</b>, <b>Euro (47.2\"×39.4\")</b>, or <b>Custom</b> pallet sizes. The calculator automatically adjusts for optimal configuration.",
            icon: Grid3x3
        },
        {
            title: "Review optimal configuration",
            description: "See the <b>maximum units per layer</b>, <b>total layers</b>, and <b>units per pallet</b>. Visual layout shows exactly how boxes fit on the pallet.",
            icon: Layers
        }
    ]

    const howToUseGoal = {
        title: "Maximize shipping efficiency & reduce costs",
        description: "By optimizing pallet configuration, you can reduce shipping costs by up to 30%, minimize wasted space, and improve warehouse handling efficiency.",
        icon: Target
    }

    const hiddenTruthInsights: Insight[] = [
        {
            title: "The 'Dead Space' Tax",
            description: "Poor pallet configuration can waste 20-40% of available space. Every inch of unused pallet space is money lost on freight, storage, and handling fees.",
            icon: TrendingDown,
            stat: "20-40%",
            statLabel: "Wasted pallet space",
            iconBg: "bg-red-50",
            iconColor: "text-red-600",
            statColor: "text-red-700",
            tooltip: "Optimizing box dimensions by even 1 inch can dramatically increase units per pallet."
        },
        {
            title: "The Height Limit Trap",
            description: "Most LTL carriers have a 96-108 inch height limit. Exceeding this triggers oversized fees or requires dedicated freight, doubling your shipping costs.",
            icon: AlertTriangle,
            stat: "96-108\"",
            statLabel: "Standard height limit",
            iconBg: "bg-amber-50",
            iconColor: "text-amber-600",
            statColor: "text-amber-700",
            tooltip: "Always account for pallet height (5-6 inches) when calculating total stack height."
        },
        {
            title: "The Overhang Penalty",
            description: "Boxes overhanging the pallet edge by more than 3 inches are rejected by most carriers or incur damage fees. Proper configuration prevents costly rejections.",
            icon: Truck,
            stat: "3 inches",
            statLabel: "Max overhang allowed",
            iconBg: "bg-orange-50",
            iconColor: "text-orange-600",
            statColor: "text-orange-700"
        },
        {
            title: "The Per-Pallet Cost Reality",
            description: "LTL freight is charged per pallet. Increasing units per pallet from 40 to 60 reduces your per-unit shipping cost by 33% without negotiating rates.",
            icon: DollarSign,
            stat: "33%",
            statLabel: "Cost reduction potential",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-700",
            tooltip: "Optimizing pallet configuration is the fastest way to reduce shipping costs."
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "What is the standard pallet size?",
            answer: "The most common pallet size in North America is 48\" × 40\" (known as GMA or Standard US pallet). In Europe, the standard is 47.2\" × 39.4\" (Euro pallet). Our calculator supports both plus custom sizes."
        },
        {
            question: "How do I calculate units per pallet?",
            answer: "Divide the pallet length and width by your box dimensions to find units per layer. Then divide the maximum stack height by box height to find total layers. Multiply units per layer by layers for total units per pallet."
        },
        {
            question: "What is the maximum pallet height for shipping?",
            answer: "Most LTL carriers allow 96-108 inches total height (including the pallet itself, which is typically 5-6 inches). Exceeding this triggers oversized surcharges or requires dedicated freight."
        },
        {
            question: "Can boxes overhang the pallet edge?",
            answer: "Most carriers allow up to 3 inches of overhang, but it's not recommended. Overhang increases damage risk and may be rejected. Our calculator warns you if overhang exceeds safe limits."
        },
        {
            question: "How does pallet configuration affect shipping costs?",
            answer: "LTL freight is charged per pallet, not per unit. Maximizing units per pallet directly reduces your per-unit shipping cost. Increasing from 40 to 60 units per pallet reduces shipping cost by 33% per unit."
        },
        {
            question: "Should I optimize for length, width, or height?",
            answer: "Prioritize optimizing the base footprint (length × width) first to maximize units per layer. Then optimize height to fit the maximum number of layers within carrier height limits."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Pallet Configuration Calculator"
            toolComponent={<PalletConfigurationCalculator />}
            howToUseSteps={howToUseSteps}
            howToUseGoal={howToUseGoal}
            hiddenTruthInsights={hiddenTruthInsights}
            faqs={faqs}
        />
    )
}
