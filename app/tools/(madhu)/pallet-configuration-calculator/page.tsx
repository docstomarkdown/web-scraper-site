import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { PalletConfigurationCalculator } from "./_components/PalletConfigurationCalculator"
import { PalletHowToUse } from "./_components/PalletHowToUse"
import { PalletGuide } from "./_components/PalletGuide"
import { PalletOverview } from "./_components/PalletOverview"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

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
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="Tool Essential" 
                            subtitle="Everything you need to know about finding the best way to load boxes onto a pallet."
                            icon={Lightbulb}
                        />
                        <PalletOverview />
                    </FadeIn>
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
                                    question: "Why is the calculator showing 0 units for my configuration?",
                                    answer: "This typically happens if a single <strong>box dimension</strong> is larger than your pallet length/width, or if your box height exceeds the <strong>Max Stack Height</strong>. Ensure your units (in/cm) are correct and that you haven't set a Max Pallet Weight lower than a single box's weight."
                                },
                                {
                                    question: "What's the difference between Standard, Euro, and Custom pallets?",
                                    answer: "<strong>Standard</strong> is the common North American GMA pallet (48 × 40 in). <strong>Euro</strong> is the standard European size (120 × 80 cm). Use <strong>Custom</strong> to enter any specific dimensions for overseas shipments or specialized rack systems."
                                },
                                {
                                    question: "Does the 'Used Height' result include the pallet's base height?",
                                    answer: "Yes. The calculator accounts for a standard <strong>5.5-inch wooden pallet base</strong>. The 'Used Height' represents the total distance from the floor to the top of your stack, ensuring you stay compliant with the 72-inch LTL and Amazon FBA limits."
                                },
                                {
                                    question: "How much does 'Allow Rotation' improve my pallet efficiency?",
                                    answer: "By testing <strong>6 different box orientations</strong> (upright, end-to-end, side-by-side, etc.), the tool finds the maximum possible fit. Turning this on can often fit 10-20% more units, directly reducing your <strong>total shipping cost per unit</strong>."
                                },
                                {
                                    question: "Can I use this for Amazon FBA or standard LTL freight?",
                                    answer: "Absolutely. The default <strong>72-inch stack height</strong> and optimization logic are designed to meet Amazon FBA and common carrier requirements. It helps you maximize warehouse space while avoiding the surcharges associated with unstable or oversized loads."
                                },
                                {
                                    question: "How do weight limits affect the final layout?",
                                    answer: "If you enter a <strong>Max Pallet Weight</strong> under Advanced Settings, the tool will automatically reduce the number of layers to ensure the pallet is safe for transport, even if there is still vertical space available. This prevents structural pallet failure and carrier rejections."
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
