import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { EOQCalculator } from "./_components/EOQCalculator"
import { EOQHowToUse } from "./_components/EOQHowToUse"
import { EOQGuide } from "./_components/EOQGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Economic Order Quantity (EOQ) Calculator | Inventory Optimization Tool",
    description: "Calculate the optimal order quantity to minimize annual inventory costs. Find the perfect balance between ordering and holding costs with our free EOQ tool.",
}
export default function EOQCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Economic Order Quantity (EOQ) Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <EOQCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <EOQHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <EOQGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the 'Optimal Equilibrium' in the analysis?",
                                    answer: "In inventory theory, your total cost is minimized at the exact point where your total annual ordering costs equal your total annual holding costs. Our tool tracks this 'sweet spot' to ensure your supply chain is mathematically optimized."
                                },
                                {
                                    question: "Why should I care about Ordering Costs?",
                                    answer: "Ordering costs include the hidden labor of your procurement team, bank fees for international transfers, and fixed shipping rates. If you order too often, these small fees compound into a massive annual drain on your profits."
                                },
                                {
                                    question: "How do holding costs vary by industry?",
                                    answer: "Perishable items or electronics have high holding costs (30%+) due to expiration and rapid obsolescence. Stable items like hardware usually have lower costs (15-20%) because they retain value longer on the shelf."
                                },
                                {
                                    question: "Does the calculator account for lead times?",
                                    answer: "Standard EOQ focuses on 'How much' to order. To know 'When' to order, you should use this in conjunction with our Reorder Point (ROP) Calculator to account for shipping lead times."
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
