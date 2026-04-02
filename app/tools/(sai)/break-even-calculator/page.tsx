import { Metadata } from "next"
import { BreakEvenCalculator } from "./_components/BreakEvenCalculator"
import { BreakEvenGuide } from "./_components/BreakEvenGuide"
import { BreakEvenHowToUse } from "./_components/BreakEvenHowToUse"
import { BreakEvenOverview } from "./_components/BreakEvenOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Break-Even Calculator - Calculate Break-Even Point in Units & Revenue | Web Scraper.do',
    description: 'Free Break-Even Calculator for e-commerce and business. Calculate the number of units you need to sell to cover fixed costs and start making profit. Essential for pricing strategy.',
}

export default function BreakEvenCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Break-Even Calculator" direction="down" duration={0.6} />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
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
                        <BreakEvenOverview />
                    </FadeIn>
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
                                    question: "How can I lower my break-even point?",
                                    answer: "You can reach profitability faster by: 1) Increasing your selling price, 2) Securing cheaper materials or shipping to lower variable costs, or 3) Reducing fixed overhead costs like rent or software."
                                },
                                {
                                    question: "What happens to my break-even point if I run a discount?",
                                    answer: "Lowering your price reduces your Profit per Unit. This means you will need to sell significantly more units just to break even. Always test pricing scenarios in the calculator before running a sale."
                                },
                                {
                                    question: "Should I focus on cutting fixed costs or variable costs?",
                                    answer: "Lowering variable costs (like product or packaging costs) is often more powerful for high-volume sellers because you save money on every single unit sold. Fixed costs are static, so they become less of a burden as you sell more."
                                },
                                {
                                    question: "Is break-even revenue the same as profit?",
                                    answer: "No. Break-even revenue is the amount of total sales money you need to bring in to hit exactly $0 profit (no loss, no gain). Any sales made after reaching this point convert directly to profit."
                                },
                                {
                                    question: "How often should I recalculate my break-even point?",
                                    answer: "You should run this analysis whenever your business expenses change. For example: if a supplier raises prices, if you move to a more expensive warehouse, or if you are considering whether to raise or lower your product's selling price."
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
