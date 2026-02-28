import { Metadata } from "next"
import { EtsyFeeCalculator } from "./_components/EtsyFeeCalculator"
import { EtsyFeeGuide } from "./_components/EtsyFeeGuide"
import { EtsyFeeHowToUse } from "./_components/EtsyFeeHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Etsy Fee Calculator - Calculate Transaction & Listing Fees | Web Scraper Pro',
    description: 'Calculate your exact Etsy fees and net profit. Includes listing fees, transaction fees (6.5%), payment processing, and Offsite Ads calculations.',
}

export default function EtsyFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Etsy Fee Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <EtsyFeeCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <EtsyFeeHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <EtsyFeeGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Did Etsy fees increase in 2024?",
                                    answer: "The transaction fee remains at 6.5% (increased from 5% in 2022). Keep an eye on payment processing fees which vary by country."
                                },
                                {
                                    question: "When are listing fees charged?",
                                    answer: "You are charged $0.20 when you publish a listing and every time it renews (after 4 months or after it sells)."
                                },
                                {
                                    question: "How do I avoid Offsite Ads fees?",
                                    answer: "If your shop has made less than $10,000 USD in the last 365 days, you can opt out in your Shop Manager settings. If you've made more, participation is mandatory (12% fee)."
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
