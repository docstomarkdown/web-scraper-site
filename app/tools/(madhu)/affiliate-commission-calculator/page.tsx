import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { AffiliateCommissionCalculator } from "./_components/AffiliateCommissionCalculator"
import { AffiliateHowToUse } from "./_components/AffiliateHowToUse"
import { AffiliateGuide } from "./_components/AffiliateGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Affiliate Commission Calculator - Free Payout & Profit Tool",
    description: "Calculate affiliate commission payouts, net revenue, break-even rates, and profitability at different commission structures. Free tool for e-commerce sellers and affiliate program managers.",
}

export default function AffiliateCommissionCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Affiliate Commission Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <AffiliateCommissionCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <AffiliateHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <AffiliateGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is 'Net Revenue' calculated in this tool?",
                                    answer: "Net Revenue = (Net Sales × Product Price) - (Net Sales × Product Cost) - Total Payout. It represents your absolute 'take-home' profit after manufacturing costs and affiliate commissions are paid."
                                },
                                {
                                    question: "What does the 'Profit Safe' badge mean?",
                                    answer: "It means your Commission Rate is lower than your Break-Even Rate. You are making a profit on every unit sold. If it changes to 'Loss Warning', you are paying affiliates more than your margin allows."
                                },
                                {
                                    question: "Why can't I see the Commission Rate inputs description?",
                                    answer: "To keep the interface clean, detailed descriptions are hidden behind the small 'i' (Info) icon next to each label. Hover over or tap the icon to see the full definition of any field."
                                },
                                {
                                    question: "Should I include shipping in the Product Price?",
                                    answer: "No. Affiliates are typically paid on the *product value* only. Shipping and taxes are pass-through costs and should be excluded from the price input to ensure accuracy."
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
