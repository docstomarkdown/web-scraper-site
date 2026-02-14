import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { ACoSCalculator } from "./_components/ACoSCalculator"
import { ACoSHowToUse } from "./_components/ACoSHowToUse"
import { ACoSGuide } from "./_components/ACoSGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Advertising Cost of Sales (ACoS) Calculator | Calculate Advertising Cost of Sales",
    description: "Calculate your Advertising Cost of Sales (ACoS) to measure the efficiency and profitability of your Amazon PPC campaigns.",
}

export default function ACoSCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Advertising Cost of Sales (ACoS) Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ACoSCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ACoSHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <ACoSGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good Advertising Cost of Sales (ACoS)?",
                                    answer: "A good ACoS depends on your profit margin. If your profit margin is 40% before ads, then an ACoS below 40% means you are profitable."
                                },
                                {
                                    question: "How do I lower my Advertising Cost of Sales (ACoS)?",
                                    answer: "You can lower your ACoS by optimizing your bids, adding negative keywords, improving your product listing conversion rate, or targeting more relevant keywords."
                                },
                                {
                                    question: "What is the difference between Advertising Cost of Sales (ACoS) and Return on Ad Spend (ROAS)?",
                                    answer: "ACoS is ad spend divided by revenue (lower is better), while ROAS (Return on Ad Spend) is revenue divided by ad spend (higher is better). They are inverse metrics."
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
