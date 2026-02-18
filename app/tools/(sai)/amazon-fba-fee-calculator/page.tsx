import { Metadata } from "next"
import { FBACalculator } from "./_components/FBACalculator"

import { FBAGuide } from "./_components/FBAGuide"
import { FBAHowToUse } from "./_components/FBAHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Amazon FBA Fee Calculator - Estimate Fees & Profit",
    description: "Free tool to estimate Amazon FBA fees, referral fees, and net profit based on product size, weight, and price.",
}

export default function FbaCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Amazon FBA Fee Calculator
                        </h1>
                    </FadeIn>
                </div>

                <FBACalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">

                    <FadeIn delay={0.1}>
                        <FBAHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FBAGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Are these Fulfillment by Amazon (FBA) fees exact?",
                                    answer: "These are estimates based on standard 2024 rate cards. Actual fees may vary slightly due to dimensional weight calculations, dangerous goods classification, or apparel surcharges."
                                },
                                {
                                    question: "What is Dimensional Weight?",
                                    answer: "Amazon calculates fee weight based on package volume. If your product is light but large, you will be charged for the space it takes up, not just its actual weight."
                                },
                                {
                                    question: "How is the Referral Fee calculated?",
                                    answer: "It is a percentage of the total sales price (usually 15% for most categories). For example, on a $100 item, Amazon takes $15."
                                },
                                {
                                    question: "Does this include storage fees?",
                                    answer: "No, this calculator focuses on fulfillment and referral fees. Monthly storage fees depend on how long your inventory sits in the warehouse."
                                }
                            ]}
                        />
                    </FadeIn>

                </div>

                {/* CTA Section */}
                <FadeIn delay={0.2}>
                    <CTA />
                </FadeIn>
            </div >
        </div >
    )
}
