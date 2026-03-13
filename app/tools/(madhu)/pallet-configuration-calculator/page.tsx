import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { PalletConfigurationCalculator } from "./_components/PalletConfigurationCalculator"
import { PalletHowToUse } from "./_components/PalletHowToUse"
import { PalletGuide } from "./_components/PalletGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Pallet Configuration Calculator - Optimize Product Loading & Shipping",
    description: "Calculate optimal product configuration per pallet based on box dimensions. Maximize pallet efficiency, reduce shipping costs, and optimize warehouse space utilization.",
}
export default function PalletConfigurationCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Pallet Configuration Calculator" />
                <div className="mb-20">
                    <PalletConfigurationCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PalletHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <PalletGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Do I need to enter all fields to get results?",
                                    answer: "No. You only need <strong>box length and width</strong> to see basic results (units per layer). Adding height enables vertical stacking calculations (total layers). Adding weight ensures you don't exceed weight limits."
                                },
                                {
                                    question: "What's the difference between the configuration presets?",
                                    answer: "<strong>Standard LTL (72\" / 2,500 lb)</strong> is for general freight shipments. <strong>Amazon FBA (72\" / 1,500 lb)</strong> meets strict warehouse requirements. <strong>Max Volume (96\" / 3,000 lb)</strong> maximizes full truckload capacity. <strong>Double Stack (48\" / 1,200 lb)</strong> allows two pallets stacked in a trailer."
                                },
                                {
                                    question: "How does the calculator choose the best orientation?",
                                    answer: "It tests <strong>6 orientations</strong> (Standard, Rotated 90°, On Side L/W, On End L/W) and selects the one with the most total units. If two orientations have the same total units, it picks the one with better area efficiency."
                                },
                                {
                                    question: "What is Space Efficiency?",
                                    answer: "Space Efficiency measures how much of the pallet's <strong>surface area</strong> is covered by boxes. 90%+ is excellent, 80-89% is good, below 80% means you're wasting space. Higher efficiency means more units per pallet and lower shipping costs per unit."
                                },
                                {
                                    question: "Can I use this for Euro pallets or custom sizes?",
                                    answer: "Yes! Select <strong>Euro</strong> for standard European pallets (47.2\" × 39.4\") or choose <strong>Custom</strong> to enter any pallet dimensions. The calculator works with any rectangular pallet size in inches."
                                },
                                {
                                    question: "Why am I getting warnings in my results?",
                                    answer: "Warnings help prevent shipping issues. <strong>Significant unused edge space</strong> means your boxes don't fit efficiently. <strong>Low volume efficiency</strong> suggests adjusting stack height. <strong>Height exceeds 96\"</strong> warns that most trailers can't accommodate your load."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
