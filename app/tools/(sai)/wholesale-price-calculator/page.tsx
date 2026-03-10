import { Metadata } from "next"
import { WholesalePriceCalculator } from "./_components/WholesalePriceCalculator"
import { WholesalePriceHowToUse } from "./_components/WholesalePriceHowToUse"
import { WholesalePriceGuide } from "./_components/WholesalePriceGuide"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Wholesale Price Calculator - Calculate Profitable Selling Prices | Web Scraper.do',
    description: 'Free wholesale price calculator. Determine the perfect wholesale selling price based on your costs and desired profit margin. Ensure profitability for your business.',
}
export default function WholesalePriceCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Wholesale Price Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <WholesalePriceCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <WholesalePriceHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <WholesalePriceGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is Wholesale Price calculated?",
                                    answer: "Our calculator uses the margin-based formula: Price = Cost / (1 - Margin %). This ensures that the profit margin is a percentage of the final selling price, which is the standard method for pricing."
                                },
                                {
                                    question: "What is the difference between Margin and Markup?",
                                    answer: "Margin is the profit percentage of the SELL PRICE, while Markup is the profit percentage added to the COST PRICE. For example, to get a 50% margin, you need a 100% markup."
                                },
                                {
                                    question: "Should I include tax in my costs?",
                                    answer: "Yes, you should include any non-recoverable taxes or duties in your cost basis to ensure your wholesale price covers all expenses."
                                },
                                {
                                    question: "What is a good wholesale profit margin?",
                                    answer: "Standard wholesale margins typically range from 30% to 50%, depending on the industry. This allows retailers enough room to add their own markup (usually 2-2.5x) to reach the retail price."
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