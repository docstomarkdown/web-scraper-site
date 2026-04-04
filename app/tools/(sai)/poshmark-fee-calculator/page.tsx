import { Metadata } from "next"
import { PoshmarkFeeCalculator } from "./_components/PoshmarkFeeCalculator"
import { PoshmarkFeeGuide } from "./_components/PoshmarkFeeGuide"
import { PoshmarkFeeHowToUse } from "./_components/PoshmarkFeeHowToUse"
import { PoshmarkOverview } from "./_components/PoshmarkOverview"
import { FadeIn, ToolFAQ, ToolSectionHeader, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: 'Poshmark Fee Calculator - Calculate Seller Fees & Profit | Web Scraper.do',
    description: 'Calculate your Poshmark seller fees and net earnings instantly. Account for the flat fee for items under $15, commission, and shipping discounts for precise profit tracking.',
}

export default function PoshmarkFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Poshmark Fee Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <PoshmarkFeeCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="poshmark-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Gain clarity on your Poshmark payout by understanding how fees, shipping discounts, and sourcing costs impact your bottom line."
                            icon={BookOpen}
                        />
                        <PoshmarkOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <PoshmarkFeeHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <PoshmarkFeeGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the Poshmark fee structure?",
                                    answer: "Poshmark's fee structure is extremely straightforward: they take a flat <strong>$2.95 fee</strong> for any item that sells for under $15. For any item that sells for $15 or more, they take a flat <strong>20% commission</strong>, and you keep 80%."
                                },
                                {
                                    question: "Who pays for shipping on Poshmark?",
                                    answer: "The <strong>buyer</strong> typically pays a flat-rate shipping fee (currently $7.97) for orders up to 5 lbs. You only pay for shipping if you explicitly offer a shipping discount (like during an 'Offer to Likers') or if your package exceeds 5 lbs."
                                },
                                {
                                    question: "Are there listing fees on Poshmark?",
                                    answer: "No, Poshmark does not charge any upfront listing fees. You can list as many items as you want for free, and you only pay a fee when an item successfully sells."
                                },
                                {
                                    question: "Do I pay extra for credit card processing or PayPal fees?",
                                    answer: "No. Unlike other platforms like eBay or Shopify, the 20% Poshmark commission covers absolutely everything: credit card processing fees, customer service, and Posh Protect seller insurance."
                                },
                                {
                                    question: "How do shipping discounts affect my profit?",
                                    answer: "If you use the 'Offer to Likers' feature, Poshmark requires you to provide a shipping discount (usually $1.50 or free shipping). This discount is deducted <strong>directly from your final payout</strong>, effectively lowering your net earnings."
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