import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
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
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Pallet Configuration Calculator
                        </h1>
                    </FadeIn>
                </div>

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
