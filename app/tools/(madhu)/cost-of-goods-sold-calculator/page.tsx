import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolSectionHeader } from "@/app/tools/_shared/components"
import { COGSCalculator } from "./_components/COGSCalculator"
import { COGSOverview } from "./_components/COGSOverview"
import { COGSHowToUse } from "./_components/COGSHowToUse"
import { COGSGuide } from "./_components/COGSGuide"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

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
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="Tool Essentials" 
                            subtitle="Key information about Cost of Goods Sold and profitability you need to know."
                            icon={Lightbulb}
                        />
                        <COGSOverview />
                    </FadeIn>
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
                                    answer: "Cost of Goods Sold (COGS) refers to the direct costs attributable to the production or acquisition of the goods sold by your company. This includes the product cost, shipping, and packaging."
                                },
                                {
                                    question: "Why do you include Shipping and Fulfillment in COGS?",
                                    answer: "In e-commerce, fulfillment and shipping are direct variable costs incurred to deliver a product safely to a customer. Factoring these into your COGS provides a transparent and actionable view for your pricing strategy."
                                },
                                {
                                    question: "Are advertising costs (ROAS) included in COGS?",
                                    answer: "No. This calculator focuses strictly on determining your direct per-unit variable costs. Advertising spend, software subscriptions, and general fixed overhead should remain separate from your Cost of Goods Sold."
                                },
                                {
                                    question: "How does the Cost Breakdown help?",
                                    answer: "The Cost Breakdown splits your Total COGS across your input quantity, revealing exactly how much capital is tied up in product, logistics, packaging, and fulfillment individually. This illuminates areas where you can optimize costs."
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
