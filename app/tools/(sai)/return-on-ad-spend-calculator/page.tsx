import { Metadata } from "next"
import { ReturnOnAdSpendCalculator } from "./_components/ReturnOnAdSpendCalculator"
import { ROASGuide } from "./_components/ROASGuide"
import { ROASHowToUse } from "./_components/ROASHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Return on Ad Spend (ROAS) Calculator - Return on Ad Spend | Web Scraper Pro',
    description: 'Free Return on Ad Spend (ROAS) calculator to instantly measure the return on your advertising spend. Calculate ROAS percentage, ratio, and net profit from ads.',
}
export default function ROASCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Return on Ad Spend (ROAS) Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <ReturnOnAdSpendCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ROASHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ROASGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is Return on Ad Spend (ROAS)?",
                                    answer: "ROAS stands for Return on Ad Spend. It is a marketing metric that measures the efficacy of a digital advertising campaign. It helps online businesses evaluate which methods are working and how they can improve future advertising efforts."
                                },
                                {
                                    question: "How is Return on Ad Spend (ROAS) calculated?",
                                    answer: "ROAS is calculated by dividing the revenue generated from ads by the cost of those ads. Formula: Revenue from Ads / Cost of Ads. For example, if you spent $100 and made $500, your ROAS is 5:1 or 500%."
                                },
                                {
                                    question: "What is a good Return on Ad Spend (ROAS)?",
                                    answer: "A good ROAS varies by industry and profit margins. Generally, a ROAS of 4:1 (or 400%) is considered strong for e-commerce. A ROAS below 2:1 might mean you're barely breaking even after accounting for product costs."
                                },
                                {
                                    question: "What's the difference between Return on Ad Spend (ROAS) and Return on Investment (ROI)?",
                                    answer: "ROAS measures revenue generated specifically from advertising spend. ROI (Return on Investment) measures overall profit relative to all costs (including product, shipping, operations, etc.). ROAS is a component of overall ROI."
                                }
                            ]}
                        />
                    </FadeIn>
                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}