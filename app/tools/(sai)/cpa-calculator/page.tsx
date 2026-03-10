import { CPACalculator } from "./_components/CPACalculator"
import { CPAHowToUse } from "./_components/CPAHowToUse"
import { CPAGuide } from "./_components/CPAGuide"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Cost Per Acquisition (CPA) Calculator | Web Scraper.do",
    description: "Calculate your Cost Per Acquisition (CPA) from campaign data or estimate it based on CPC and Conversion Rate.",
}
export default function CPACalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Cost Per Acquisition (CPA) Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <CPACalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="cpa-guide">
                    <FadeIn delay={0.2}>
                        <CPAHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CPAGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the difference between Cost Per Acquisition (CPA) and Cost Per Click (CPC)?",
                                    answer: "CPC (Cost Per Click) is what you pay for a click, while CPA (Cost Per Acquisition) is what you pay for an actual customer or result. CPA is usually higher than CPC because not every click results in a sale."
                                },
                                {
                                    question: "How can I lower my Cost Per Acquisition (CPA)?",
                                    answer: "You can lower your CPA by either decreasing your Cost Per Click (CPC) or increasing your Conversion Rate (CR). Improving your ad relevance, landing page experience, and targeting can helps with both."
                                },
                                {
                                    question: "Does Cost Per Acquisition (CPA) include overhead costs?",
                                    answer: "Typically, no. Ad platform CPA only accounts for ad spend. To calculate a 'True CPA', you should factor in agency fees, creative costs, and tool subscriptions manually."
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