import { Metadata } from "next"
import { SafetyStockCalculator } from "./_components/SafetyStockCalculator"
import { SafetyStockGuide } from "./_components/SafetyStockGuide"
import { SafetyStockHowToUse } from "./_components/SafetyStockHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Safety Stock Calculator | Web Scraper Pro',
    description: 'Calculate the optimal safety stock to prevent stockouts. Handle demand and lead time variability with confidence.',
}
export default function SafetyStockCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Safety Stock Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <SafetyStockCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <SafetyStockHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SafetyStockGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why can't I just use simple averages?",
                                    answer: "Simple averages assume everything goes perfectly. Sourcing and sales are rarely perfect. Using 'Max' values ensures you're covered during busy days or when suppliers are slow."
                                },
                                {
                                    question: "Should I add this to my Reorder Point?",
                                    answer: "Yes! Your Reorder Point = (Avg Daily Sales × Avg Lead Time) + Safety Stock. This calculator gives you the 'Safety Stock' number to plug into that formula."
                                },
                                {
                                    question: "Is having too much safety stock bad?",
                                    answer: "Yes. Excess stock ties up cash flow and increases storage costs. This calculator helps you find the 'sweet spot'—enough to be safe, but not wasteful."
                                }
                            ]}
                        />
                    </FadeIn>
                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}