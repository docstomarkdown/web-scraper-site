import { Metadata } from "next"
import { CACCalculator } from "./_components/CACCalculator"
import { CACGuide } from "./_components/CACGuide"
import { CACHowToUse } from "./_components/CACHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Customer Acquisition Cost (CAC) Calculator | Web Scraper Pro',
    description: 'Calculate your Customer Acquisition Cost (CAC) instantly. Determine how much you spend to acquire a new customer and optimize your marketing budget.',
}

export default function CACCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Customer Acquisition Cost (CAC) Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <CACCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="cac-guide">
                    <FadeIn delay={0.2}>
                        <CACHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CACGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the formula for CAC?",
                                    answer: "CAC = (Total Sales & Marketing Expenses) / (Number of New Customers Acquired)"
                                },
                                {
                                    question: "What is a good LTV:CAC ratio?",
                                    answer: "The industry standard for a healthy business is 3:1. This means the Lifetime Value of a customer should be three times the cost of acquiring them."
                                },
                                {
                                    question: "How is CAC different from CPA?",
                                    answer: "CPA (Cost Per Action) usually refers to the cost of a specific conversion (like a lead or sale) on a specific ad platform. CAC is a holistic business metric that includes all costs (salaries, tools, overhead) associated with acquiring customers."
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
