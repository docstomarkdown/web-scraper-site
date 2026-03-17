import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { ContainerLoadCalculator } from "./_components/ContainerLoadCalculator"
import { ContainerLoadHowToUse } from "./_components/ContainerLoadHowToUse"
import { ContainerLoadGuide } from "./_components/ContainerLoadGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { Container } from "lucide-react"

export const metadata: Metadata = {
    title: "Container Load Calculator - Optimize Shipping & Cargo Space",
    description: "Calculate how many boxes fit in a 20ft or 40ft container. Optimize pallet loading, cubic volume, and weight limits to maximize your shipping ROI.",
    keywords: ["container load calculator", "cargo space optimizer", "shipping calculator", "pallet loading", "20ft container capacity", "40ft container capacity"],
}

export default function ContainerLoadCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <ToolPageTitle
                        title="Container Load Calculator"
                    />
                </FadeIn>

                <div className="mb-20">
                    <ContainerLoadCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ContainerLoadHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <ContainerLoadGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do you calculate pallet fit?",
                                    answer: "We maximize the floor area by rotating pallets (if standard size). We then stack boxes on the pallet up to the container's ceiling height."
                                },
                                {
                                    question: "Does this include container tare weight?",
                                    answer: "No, the 'Max Weight' shown is the Payload Capacity (Net Weight) typically allowed. Always check your specific container's CSC plate."
                                },
                                {
                                    question: "What if my boxes are crushable?",
                                    answer: "This calculator assumes boxes can be stacked to the ceiling. If your goods are fragile, you should manually limit the height or use pallets with defined max height."
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
