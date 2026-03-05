import { Metadata } from "next"
import { BreakEvenCalculator } from "./_components/BreakEvenCalculator"
import { BreakEvenGuide } from "./_components/BreakEvenGuide"
import { BreakEvenHowToUse } from "./_components/BreakEvenHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Break-Even Calculator - Calculate Break-Even Point in Units & Revenue | Web Scraper Pro',
    description: 'Free Break-Even Calculator for e-commerce and business. Calculate the number of units you need to sell to cover fixed costs and start making profit. Essential for pricing strategy.',
}
export default function BreakEvenCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Break-Even Calculator
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Determine exactly how many units you need to sell to cover your costs and start generating profit.
                        </p>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <BreakEvenCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <BreakEvenHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <BreakEvenGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is break-even analysis?",
                                    answer: "Break-even analysis calculates the point at which your total revenue equals your total costs. At this point, you have neither made a profit nor a loss. Selling beyond this point means you're profitable."
                                },
                                {
                                    question: "What are fixed costs?",
                                    answer: "Fixed costs are expenses that do not change with the amount of goods sold. Examples include rent, salaries, insurance, and software subscriptions."
                                },
                                {
                                    question: "What are variable costs?",
                                    answer: "Variable costs change in proportion to the number of units sold. This includes the cost of goods sold (COGS), shipping per unit, packaging, and transaction fees."
                                },
                                {
                                    question: "Why is the contribution margin important?",
                                    answer: "The contribution margin (Price per Unit - Variable Cost per Unit) tells you how much money remains from each sale to pay for your fixed costs. The higher the margin, the fewer units you need to sell to break even."
                                },
                                {
                                    question: "How do I lower my break-even point?",
                                    answer: "You can lower your break-even point by: 1) Increasing your selling price, 2) Reducing your variable costs (e.g., cheaper suppliers or shipping), or 3) Reducing your fixed costs (e.g., lower rent)."
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