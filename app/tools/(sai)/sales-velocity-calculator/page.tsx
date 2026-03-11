import { Metadata } from "next"
import { SalesVelocityCalculator } from "./_components/SalesVelocityCalculator"
import { SalesVelocityGuide } from "./_components/SalesVelocityGuide"
import { SalesVelocityHowToUse } from "./_components/SalesVelocityHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Sales Velocity Calculator | Web Scraper.do',
    description: 'Calculate your true sales velocity by adjusting for out-of-stock days. Improve inventory forecasting accuracy.',
}
export default function SalesVelocityCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Sales Velocity Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <SalesVelocityCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <SalesVelocityHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SalesVelocityGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is 'Out of Stock' bias?",
                                    answer: "When you have 0 inventory, you have 0 sales. If you include these days in your average, it artificially lowers your calculated sales speed, leading you to order too little stock next time."
                                },
                                {
                                    question: "Why do I need to enter Price?",
                                    answer: "Entering price is optional. It helps us calculate your 'Revenue Velocity'—how much money you are effectively making per day when stock is available."
                                },
                                {
                                    question: "How often should I check this?",
                                    answer: "You should recalculate sales velocity before every major reorder, especially if you've experienced any stockouts since the last order."
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