"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "@/app/tools/(madhu)/ToolTemplate"
import { PalletConfigurationCalculator } from "./PalletConfigurationCalculator"
import { Package, Grid3x3, Target, Layers, TrendingDown, AlertTriangle, Truck, DollarSign } from "lucide-react"


export function PalletConfigurationCalculatorContent() {
    const howToUseSteps: Step[] = [
        {
            title: "Enter carton dimensions",
            description: "Input your box <b>Length, Width, Height, and Weight</b>. Switch between <b>inches and centimeters</b> for global accuracy.",
            icon: Package
        },
        {
            title: "Choose pallet & preset",
            description: "Select from <b>Standard US, Euro, or Custom</b> pallets. Use presets like <b>Amazon FBA</b> or <b>Standard LTL</b> to auto-set safety height limits.",
            icon: Grid3x3
        },
        {
            title: "Check 3D layout & export",
            description: "Analyze the <b>3D isometric visualization</b> to see exactly how boxes stack. Use the <b>Copy</b> button to save your loading plan for warehouse teams.",
            icon: Layers
        }
    ]

    const howToUseGoal = {
        title: "Pack smarter, ship cheaper",
        description: "Maximize your pallet real estate to lower costs by fitting more units into every shipment. Perfect for e-commerce brands looking to optimize FBA and LTL logistics.",
        icon: Target
    }

    const hiddenTruthInsights: Insight[] = [
        {
            title: "The 'Air' Shipping Tax",
            description: "Shipping 'air' costs as much as shipping product. A 2-inch gap at the top of a pallet might seem small, but across a 20-pallet shipment, it equals 40 unused inches of truck space you're still paying for.",
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
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-700",
            tooltip: "Use our Amazon FBA preset to ensure compliance with warehouse standards."
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "How does the 'Amazon FBA' preset differ from Standard LTL?",
            answer: "While standard LTL allows for heavier loads (up to 2,500lb+), Amazon FBA strictly caps pallets at 72 inches and 1,500 lbs. Our Amazon preset applies these safety limits automatically to prevent warehouse rejections."
        },
        {
            question: "Why should I use the 3D visualization?",
            answer: "The 3D view helps you visualize the 'Interlocked' vs 'Column' stacking potential. It also identifies if a box size is inefficient for a specific pallet type (Standard US vs Euro) before you start physical labor."
        },
        {
            question: "What is 'Space Efficiency' in the results?",
            answer: "This percentage measures how much of the pallet's 2D surface area is covered by boxes. A 100% efficiency means the pallet floor is perfectly covered with no overhang or wasted gaps."
        },
        {
            question: "How do I account for the pallet's own weight and height?",
            answer: "A standard wood pallet adds about 5.5 inches to the height and roughly 35-50 lbs to the total weight. Our calculator focuses on the 'Load Height' (the boxes), but carriers measure the 'Total Height' including the pallet."
        },
        {
            question: "Can I stack different size boxes on one pallet?",
            answer: "This calculator is designed for uniform carton sizes (Single SKU stacking). For mixed SKUs, it's best to calculate the footprint of your largest items first and use that as the base layer."
        },
        {
            question: "What is the best way to prevent overhang?",
            answer: "Ensure your box length/width dimensions are factors of the pallet dimensions (48x40). If the calculator shows an overhang warning, try rotating the orientation or using a larger pallet size."
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
