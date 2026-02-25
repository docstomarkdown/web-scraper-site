import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { ReorderPointCalculator } from "./_components/ReorderPointCalculator"
import { ReorderPointHowToUse } from "./_components/ReorderPointHowToUse"
import { ReorderPointGuide } from "./_components/ReorderPointGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Reorder Point Calculator - Inventory Restock Estimator",
    description: "Calculate your optimal reorder point based on lead time, sales velocity, and safety stock. Never run out of stock or overstock again.",
}

export default function ReorderPointCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Reorder Point Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ReorderPointCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ReorderPointHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <ReorderPointGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What exactly does the 'Restock Journey' show?",
                                    answer: "The Restock Journey visualizes the critical window between placing an order and receiving it. It highlights exactly where your 'Reorder Point' sits in that timeline to help you visualize the inventory drawdown."
                                },
                                {
                                    question: "How do I calculate the best Safety Stock?",
                                    answer: "A standard approach is: (Max Daily Sales × Max Lead Time) - (Average Daily Sales × Average Lead Time). For simpler setups, many sellers just keep 20% of their lead time demand as safety stock."
                                },
                                {
                                    question: "Should I change my ROP for Q4 or Holidays?",
                                    answer: "Absolutely. During peak seasons, your 'Daily Sales Velocity' can triple. You should recalculate your ROP at least 45 days before a major sales event like Black Friday."
                                },
                                {
                                    question: "What if my lead time varies every shipment?",
                                    answer: "Always use the 'Worst Case' lead time in your calculation. If shipping usually takes 20 days but sometimes 30, use 30. It's cheaper to hold 10 extra days of stock than to go out of stock."
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
