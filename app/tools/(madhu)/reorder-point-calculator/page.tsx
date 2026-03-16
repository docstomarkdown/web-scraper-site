import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { ReorderPointCalculator } from "./_components/ReorderPointCalculator"
import { ReorderPointHowToUse } from "./_components/ReorderPointHowToUse"
import { ReorderPointGuide } from "./_components/ReorderPointGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Reorder Point Calculator - Inventory Reorder Estimator",
    description: "Calculate your optimal reorder point based on lead time, sales velocity, and safety stock. Never run out of stock or overstock again.",
}
export default function ReorderPointCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-12">
                    <ToolPageTitle
                        title="Reorder Point Calculator"
                        direction="up"
                        duration={0.6}
                    />
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
                                    question: "How do I decide on the right Safety Stock?",
                                    answer: "A simple rule of thumb is to keep enough stock for 20% of your lead time. For example, if it takes 30 days to get new stock, keep an extra 6 days worth of sales as your 'emergency buffer'."
                                },
                                {
                                    question: "Should I change my reorder point for busy holiday seasons?",
                                    answer: "Yes, definitely. When you expect higher sales (like during Black Friday or Christmas), your daily sales will go up. You should update your calculator numbers at least a month before the rush begins."
                                },
                                {
                                    question: "What if my supplier is often late?",
                                    answer: "If your supplier says delivery takes 20 days but it often takes 25, always use 25 in your calculation. It is much better (and cheaper) to have a little extra stock than to run out and lose sales."
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
