import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { InventoryTurnoverCalculator } from "./_components/InventoryTurnoverCalculator"
import { InventoryTurnoverHowToUse } from "./_components/InventoryTurnoverHowToUse"
import { InventoryTurnoverGuide } from "./_components/InventoryTurnoverGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Inventory Turnover Calculator | Measure Inventory Efficiency",
    description: "Calculate your inventory turnover ratio and Days Sales in Inventory (DSI). Optimize your stock levels, improve cash flow, and analyze operational efficiency with our professional calculator.",
}

export default function InventoryTurnoverCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle
                    title="Inventory Turnover Ratio Calculator"
                />
                <div className="mb-20">
                    <InventoryTurnoverCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <InventoryTurnoverHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <InventoryTurnoverGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a healthy turnover ratio for e-commerce?",
                                    answer: "For most mature e-commerce brands, a ratio between <b>4 and 8</b> is ideal. High-volume categories like apparel or food may aim for 12+, while luxury goods often sit around 2-3."
                                },
                                {
                                    question: "How does DSI (Days Sales in Inventory) affect cash flow?",
                                    answer: "DSI represents how long your cash is 'trapped' in stock. Reducing DSI from 60 to 45 days can free up 25% of your inventory capital for marketing or new product development."
                                },
                                {
                                    question: "Should I include shipping costs in my COGS?",
                                    answer: "Yes. For the most accurate efficiency rating, use <b>Landed COGS</b> (Product Cost + Freight + Customs) rather than just the wholesale price."
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
