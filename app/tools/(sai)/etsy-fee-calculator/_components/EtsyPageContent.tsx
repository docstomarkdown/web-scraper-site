"use client"
import React from "react"
import { BookOpen, MessageCircleQuestion } from "lucide-react"
import { EtsyFeeCalculator } from "./EtsyFeeCalculator"
import { EtsyFeeGuide } from "./EtsyFeeGuide"
import { EtsyFeeHowToUse } from "./EtsyFeeHowToUse"
import { EtsyOverview } from "./EtsyOverview"
import { FadeIn, ToolPageTitle, ToolSectionHeader, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export default function EtsyPageContent() {
    return (
        <div className="container mx-auto px-4">
            <ToolPageTitle title="Etsy Fee Calculator" direction="down" duration={0.6} />

            <div className="mb-20">
                <EtsyFeeCalculator />
            </div>

            <div className="max-w-5xl mx-auto space-y-16" id="etsy-fee-guide">
                <FadeIn delay={0.2}>
                    <ToolSectionHeader
                        title="Tool Essential"
                        icon={BookOpen}
                    />
                    <EtsyOverview />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <EtsyFeeHowToUse />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <EtsyFeeGuide />
                </FadeIn>

                <FadeIn delay={0.2}>
                    <div className="pt-10">
                        <div className="mt-8 space-y-4">
                            <ToolFAQ
                                title="Frequently Asked Questions"
                                icon={MessageCircleQuestion}
                                faqs={[
                                    {
                                        question: "How has the Etsy transaction fee changed recently?",
                                        answer: "In early 2022, Etsy increased its transaction fee from 5% to 6.5%. This fee is applied to the total sale price, which includes both the item price and the shipping amount you charge to the customer."
                                    },
                                    {
                                        question: "What exactly is the Etsy Offsite Ad fee?",
                                        answer: "If a buyer clicks an Etsy Offsite Ad (advertising on Google, Facebook, etc.) and purchases from your shop within 30 days, you pay a commission. If you made less than $10,000 USD in sales over the last 365 days, the fee is 15% (and you can opt-out). If you made over $10,000, it's 12% and opt-out is not available."
                                    },
                                    {
                                        question: "Are listing fees separate from transaction fees?",
                                        answer: "Yes. Listing fees are a flat $0.20 charged upfront when you create or renew a listing. Transaction fees (6.5%) are only charged once a sale is actually completed."
                                    },
                                    {
                                        question: "What is the difference between Etsy Payments and PayPal fees?",
                                        answer: "If you use Etsy Payments, you pay Etsy's processing fee (e.g., 3% + $0.25 in the US). If a buyer uses PayPal in a country where Etsy Payments isn't available, you pay PayPal's standard processing rate instead."
                                    }
                                ]}
                            />
                        </div>
                    </div>
                </FadeIn>

                <FadeIn delay={0.2}>
                    <CTA />
                </FadeIn>
            </div>
        </div>
    )
}
