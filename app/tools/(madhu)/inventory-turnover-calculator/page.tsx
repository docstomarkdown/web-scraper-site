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
                                    question: "What does the Inventory Turnover Ratio actually tell me?",
                                    answer: "It measures how many times your business has sold and replaced its inventory during a specific period. A higher ratio generally means you're selling goods quickly and managing your stock efficiently without overstocking."
                                },
                                {
                                    question: "Is a higher turnover ratio always better?",
                                    answer: "Usually, yes, but there's a limit. An extremely high ratio might mean you're keeping too little stock, which can lead to 'stockouts' (running out of items) and losing potential sales because you can't meet demand."
                                },
                                {
                                    question: "What is the difference between Turnover Ratio and DSI?",
                                    answer: "They are two sides of the same coin. The <b>Turnover Ratio</b> tells you how <i>many times</i> you sold your stock, while <b>DSI (Days Sales in Inventory)</b> tells you exactly <i>how many days</i> on average it takes to turn your stock into a sale."
                                },
                                {
                                    question: "How can I improve a low turnover ratio?",
                                    answer: "You can improve it by better forecasting demand to avoid over-ordering, running promotions to clear slow-moving items, or reviewing your product line to remove items that aren't selling well."
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
