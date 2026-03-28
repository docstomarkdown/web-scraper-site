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
                                    question: "What is the Poshmark fee for items under $15?",
                                    answer: "Poshmark charges a flat fee of <strong>$2.95</strong> for any sale under $15. This is important to note for low-price items, as the percentage cost can be significatnly higher than 20%."
                                },
                                {
                                    question: "How is the 20% commission calculated?",
                                    answer: "For sales of $15 or more, Poshmark keeps <strong>20% (the commission)</strong> and you keep 80%. This fee covers shipping labels, payment processing, and Posh Protect insurance."
                                },
                                {
                                    question: "Are shipping discounts for 'Offer to Likers' mandatory?",
                                    answer: "Yes, when you use the 'Offer to Likers' feature, Poshmark requires you to include a shipping discount of at least <strong>$1.50 or more</strong>. This discount is deducted from your final 80% earnings."
                                },
                                {
                                    question: "What is 'Closet Clearout' and does it affect my fees?",
                                    answer: "Closet Clearout is a promotional event where Poshmark pays for the shipping discount if you lower your listing price by at least 10%. In this case, <strong>you do not lose money</strong> to the shipping discount, making it a great time to sell."
                                },
                                {
                                    question: "Does the Poshmark fee cover credit card processing?",
                                    answer: "Yes, unlike other platforms like eBay or Etsy, Poshmark's commission <strong>includes all payment processing fees</strong>. There are no additional credit card or payout fees."
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