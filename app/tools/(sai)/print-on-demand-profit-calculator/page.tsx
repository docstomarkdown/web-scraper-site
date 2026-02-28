import { Metadata } from "next"
import { PODProfitCalculator } from "./_components/PODProfitCalculator"
import { PODProfitGuide } from "./_components/PODProfitGuide"
import { PODProfitHowToUse } from "./_components/PODProfitHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Print on Demand Profit Calculator - Calculate Margins & Fees | Web Scraper Pro',
    description: 'Calculate your true profit for Print on Demand (POD) products. Account for base costs, platform fees (Etsy/Shopify), and shipping to ensure profitability.',
}

export default function PODProfitCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                        Print on Demand Profit Calculator
                    </h1>
                </div>

                <div className="mb-20">
                    <PODProfitCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
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
                                    question: "Should I offer free shipping?",
                                    answer: "Free shipping increases conversion, but it must be built into your retail price. Use this calculator to see how absorbing shipping costs affects your net margin."
                                },
                                {
                                    question: "What is a good profit margin for POD?",
                                    answer: "A net margin of 20-30% is a healthy target for Print on Demand. Lower margins are riemerald because unforeseen returns or ads can wipe out profits."
                                },
                                {
                                    question: "Do platform fees apply to shipping?",
                                    answer: "Yes, most platforms like Etsy and eBay charge their percentage fee on the TOTAL transaction value, which includes the shipping price you charge the customer."
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
