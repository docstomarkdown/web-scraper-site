import { Metadata } from "next"
import { PoshmarkFeeCalculator } from "./_components/PoshmarkFeeCalculator"
import { PoshmarkFeeGuide } from "./_components/PoshmarkFeeGuide"
import { PoshmarkFeeHowToUse } from "./_components/PoshmarkFeeHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Poshmark Fee Calculator - Calculate Seller Fees & Profit | Web Scraper Pro',
    description: 'Calculate your Poshmark seller fees and net earnings. Account for critical factors like the flat fee for items under $15 and shipping discounts.',
}
export default function PoshmarkFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Poshmark Fee Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <PoshmarkFeeCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
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
                                    answer: "Poshmark charges a flat fee of $2.95 for any sale under $15. This means if you sell an item for $5, you only earn $2.05."
                                },
                                {
                                    question: "Did Poshmark fees change in 2024?",
                                    answer: "No, the fee structure remains the same: a flat $2.95 for sales under $15, and 20% for sales of $15 or more."
                                },
                                {
                                    question: "Who pays for the shipping discount?",
                                    answer: "Generally, the seller pays for the shipping discount when offering 'Offer to Likers'. Poshmark sometimes subsidizes this during special events like 'Closet Clearout'."
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