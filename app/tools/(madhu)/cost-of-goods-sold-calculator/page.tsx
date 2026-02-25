import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { COGSCalculator } from "./_components/COGSCalculator"
import { COGSHowToUse } from "./_components/COGSHowToUse"
import { COGSGuide } from "./_components/COGSGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'COGS Calculator - Calculate Cost of Goods Sold & Fulfillment | Web Scraper Pro',
    description: 'Free Cost of Goods Sold (COGS) calculator for e-commerce. Calculate true product cost including manufacturing, freight, customs, packaging, and fulfillment fees.',
}

export default function COGSCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Cost of Goods Sold (COGS) Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <COGSCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <COGSHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <COGSGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is 'Landed Cost'?",
                                    answer: "Landed Cost is the total price of a product once it has arrived at your doorstep. It includes the original purchase price, freight, customs, duties, taxes, and insurance."
                                },
                                {
                                    question: "Why include Return Rate in COGS?",
                                    answer: "Returns are a cost of doing business. If 1 in 10 items is returned, you lose the shipping and fulfillment fees for that item. Including a 'Return Risk' buffer ensures your pricing covers these inevitable losses."
                                },
                                {
                                    question: "What is a good Gross Margin?",
                                    answer: "For e-commerce, a Gross Margin above 30% is generally considered healthy. If it is below 20%, you may struggle to pay for ads and operating expenses."
                                },
                                {
                                    question: "Does this include Ad Spend (ROAS)?",
                                    answer: "No. This calculator finds your 'Gross Profit' (Revenue - COGS). You pay for ads from your Gross Profit. Determining your 'Net Profit' after ads is a separate calculation."
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
