import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { ACoSCalculator } from "./_components/ACoSCalculator"
import { ACoSHowToUse } from "./_components/ACoSHowToUse"
import { ACoSGuide } from "./_components/ACoSGuide"
import { ACoSOverview } from "./_components/ACoSOverview"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "Advertising Cost of Sales (ACoS) Calculator | Calculate Advertising Cost of Sales",
    description: "Calculate your Advertising Cost of Sales (ACoS) to measure the efficiency and profitability of your Amazon PPC campaigns.",
}

export default function ACoSCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Advertising Cost of Sales (ACoS) Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <ACoSCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>

                        <ACoSOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ACoSHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ACoSGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is Advertising Cost of Sales (ACoS)?",
                                    answer: "Advertising Cost of Sales (ACoS) is a metric used to measure the absolute performance and efficiency of your ad campaigns. It shows the ratio of ad spend to ad revenue, helping you map exactly how much you spend to generate each dollar of ad sales."
                                },
                                {
                                    question: "How does ACoS relate to my net profit?",
                                    answer: "Your product's profit margin before ads acts as your breakeven point. If your ACoS percentage is lower than your profit margin, your campaign is generating a positive net profit. If your ACoS exceeds your margin, you are directly running at a loss."
                                },
                                {
                                    question: "What is considered a good ACoS?",
                                    answer: "A 'good' ACoS entirely depends on your profit margins and overall campaign goals. If your goal is pure profitability, a good ACoS must be comfortably lower than your profit margin. If your goal is product visibility or brand awareness, you might tolerate a higher ACoS temporarily."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}