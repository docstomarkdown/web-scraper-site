import { Metadata } from "next"
import { PODProfitCalculator } from "./_components/PODProfitCalculator"
import { PODProfitGuide } from "./_components/PODProfitGuide"
import { PODProfitHowToUse } from "./_components/PODProfitHowToUse"
import { PODProfitOverview } from "./_components/PODProfitOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: 'Print on Demand Profit Calculator - Calculate Margins & Fees | Web Scraper.do',
    description: 'Calculate your true profit for Print on Demand (POD) products. Account for base costs, platform fees (Etsy/Shopify), and shipping to ensure profitability.',
}

export default function PODProfitCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Print on Demand Profit Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <PODProfitCalculator />
                </div>
                
                <div className="max-w-5xl mx-auto space-y-16" id="pod-profit-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Gain clarity on your POD payout by understanding how dual-shipping, platform fees, and manufacturing expenses impact your actual net earnings."
                            icon={BookOpen}
                        />
                        <PODProfitOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <PODProfitHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <PODProfitGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good profit margin for POD?",
                                    answer: "A net profit margin of 20-30% is widely considered a healthy baseline for Print on Demand. Margins lower than this leave little room for unexpected expenses like test samples, refunds, or performance marketing costs."
                                },
                                {
                                    question: "Should I offer free shipping on POD products?",
                                    answer: "Free shipping is a proven conversion booster; however, you must incorporate your provider's shipping fee into the final retail price. Use this calculator to simulate how absorbing front-end shipping costs impacts your overall profitability."
                                },
                                {
                                    question: "Do platform fees apply to the shipping I charge?",
                                    answer: "Yes. Major marketplaces like Etsy and eBay apply their final value or transaction fee percentage against the ENTIRE order amount, which includes the item price plus the shipping fee paid by the customer."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}