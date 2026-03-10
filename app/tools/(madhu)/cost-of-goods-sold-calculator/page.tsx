import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { COGSCalculator } from "./_components/COGSCalculator"
import { COGSHowToUse } from "./_components/COGSHowToUse"
import { COGSGuide } from "./_components/COGSGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'COGS Calculator - Calculate Cost of Goods Sold & Fulfillment | Web Scraper.do',
    description: 'Free Cost of Goods Sold (COGS) calculator for e-commerce. Calculate true product cost including manufacturing, freight, customs, packaging, and fulfillment fees.',
}
export default function COGSCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
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
                                    question: "What is Cost of Goods Sold (COGS)?",
                                    answer: "Cost of Goods Sold (COGS) refers to the direct costs attributable to the production or acquisition of the goods sold by your company. This includes the product cost, shipping, duties, and packaging."
                                },
                                {
                                    question: "Why include Fulfillment & Outbound Shipping?",
                                    answer: "While fulfillment isn't always part of traditional manufacturing COGS, in e-commerce, it is a direct variable cost incurred to deliver a product to a customer. Knowing this total cost per unit is vital for pricing your products correctly."
                                },
                                {
                                    question: "Are advertising costs (ROAS) included in COGS?",
                                    answer: "No. This calculator is designed strictly to determine your direct per-unit variable costs. Advertising spend, software subscriptions, and general fixed overhead should remain separate from your base Cost of Goods Sold."
                                },
                                {
                                    question: "Do I need to enter 'Units Sold'?",
                                    answer: "Entering your Units Sold is completely optional. If left blank, you will simply see your COGS per Unit. If you enter a number, the calculator will immediately show your Total COGS across that inventory batch."
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
