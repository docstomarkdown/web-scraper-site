import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { ReorderPointCalculator } from "./_components/ReorderPointCalculator"
import { ReorderPointHowToUse } from "./_components/ReorderPointHowToUse"
import { ReorderPointGuide } from "./_components/ReorderPointGuide"
import { ReorderPointOverview } from "./_components/ReorderPointOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Reorder Point Calculator - Inventory Reorder Estimator",
    description: "Calculate your optimal reorder point based on lead time, average daily units sold, and optional safety stock. Never run out of stock or overstock again.",
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
                    <FadeIn delay={0.15}>
                        <ReorderPointOverview />
                    </FadeIn>
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
                                    question: "How do I calculate Average Daily Units Sold?",
                                    answer: "Take your total sales over the last 30 days and divide by 30. For example, if you sold 900 units in a month, your Average Daily Units Sold is 30. Using a 30-day average smoothens out high and low days for a more accurate reorder point."
                                },
                                {
                                    question: "Is Safety Stock required for the calculation?",
                                    answer: "No, <strong>Safety Stock is optional</strong>. If left blank, the calculator assumes zero safety stock and gives you a reorder point that covers exactly your delivery time. We recommend adding a small safety buffer (e.g., 5-10% of your lead time demand) to account for shipping delays or unexpected sales spikes."
                                },
                                {
                                    question: "Should I change my reorder point for busy holiday seasons?",
                                    answer: "Yes, definitely. When you expect higher sales (like during Black Friday or Prime Day), your daily sales velocity will go up. You should update your <strong>Average Daily Units Sold</strong> in the calculator at least 30-45 days before the peak season begins to ensure your restock arrives in time."
                                },
                                {
                                    question: "What if my supplier lead time varies?",
                                    answer: "If your supplier says delivery takes 20 days but it often takes 25, <strong>always use 25 days</strong> in your calculation. It is much safer to have slightly more stock than to go Out of Stock (OOS) and lose your search ranking."
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
