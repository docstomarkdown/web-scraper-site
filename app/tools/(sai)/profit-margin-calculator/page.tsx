import { Metadata } from "next"
import { MarginCalculator } from "./_components/MarginCalculator"
import { MarginGuide } from "./_components/MarginGuide"
import { HowToUse } from "./_components/HowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Profit Margin Calculator - Calculate Gross Margin & Markup | Web Scraper Pro',
    description: 'Free profit margin calculator to instantly calculate gross margin, markup percentage, and profit per unit. Essential tool for retailers and dropshippers.',
}

export default function ProfitMarginCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Profit Margin Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <MarginCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <HowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <MarginGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is Gross Margin vs Markup?",
                                    answer: "Gross Margin is the percentage of total sales revenue that is profit. Markup is the percentage added to the cost price to get the selling price. Margin is always lower than Markup."
                                },
                                {
                                    question: "How do I calculate Profit Margin?",
                                    answer: "Profit Margin = ((Selling Price - Cost Price) / Selling Price) * 100%. For example, if you buy for $50 and sell for $100, your margin is 50%."
                                },
                                {
                                    question: "Why is Margin important?",
                                    answer: "Margin tells you how much of each dollar of sales you actually keep. It's crucial for understanding your business profitability and break-even points."
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
