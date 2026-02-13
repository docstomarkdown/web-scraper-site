import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { PPCBidCalculator } from "./_components/PPCBidCalculator"
import { PPCBidHowToUse } from "./_components/PPCBidHowToUse"
import { PPCBidGuide } from "./_components/PPCBidGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "PPC Bid Calculator | Calculate Max Cost Per Click",
    description: "Calculate your maximum profitable PPC bid based on your product price, conversion rate, and target ACoS.",
}

export default function PPCBidCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            PPC Bid Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <PPCBidCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PPCBidHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <PPCBidGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good target ACoS?",
                                    answer: "A good target ACoS depends on your profit margins and campaign goals. Generally, you want your ACoS to be lower than your profit margin to be profitable."
                                },
                                {
                                    question: "How do I calculate my conversion rate?",
                                    answer: "Your conversion rate is the percentage of clicks that result in a sale. Calculation: (Total Orders / Total Clicks) * 100."
                                },
                                {
                                    question: "Should I bid exactly the maximum amount?",
                                    answer: "Not necessarily. The calculated max bid is your break-even point for that specific ACoS target. You might want to bid slightly lower to ensure profitability, or higher if you're prioritizing visibility over immediate profit."
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
