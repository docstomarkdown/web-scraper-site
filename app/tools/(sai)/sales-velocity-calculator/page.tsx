import { Metadata } from "next"
import { SalesVelocityCalculator } from "./_components/SalesVelocityCalculator"
import { SalesVelocityGuide } from "./_components/SalesVelocityGuide"
import { SalesVelocityHowToUse } from "./_components/SalesVelocityHowToUse"
import { SalesVelocityOverview } from "./_components/SalesVelocityOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Sales Velocity Calculator | Web Scraper.do',
    description: 'Calculate your true sales velocity by adjusting for out-of-stock days. Improve inventory forecasting accuracy.',
}

export default function SalesVelocityCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Sales Velocity Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <SalesVelocityCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.1}>
                        <SalesVelocityOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SalesVelocityHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <SalesVelocityGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is sales velocity?",
                                    answer: "Sales velocity tells you how many units you sell per day on average, helping you understand how fast your product is moving."
                                },
                                {
                                    question: "How is sales velocity calculated?",
                                    answer: "Sales velocity = Units Sold ÷ Number of Days (Your tool adjusts this by removing stockout days to show the true selling speed)."
                                },
                                {
                                    question: "Should I include out-of-stock days in my calculation?",
                                    answer: "No. Stockout days should be excluded because they hide your real demand. The tool lets you adjust for this automatically."
                                },
                                {
                                    question: "What’s the difference between true sales velocity and raw daily average?",
                                    answer: "True Velocity: Adjusts for stockouts and shows your actual demand. Raw Average: Basic calculation without adjustments."
                                },
                                {
                                    question: "How does sales velocity help with restocking?",
                                    answer: "It tells you how quickly inventory is selling so you can predict when you’ll run out and reorder at the right time."
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