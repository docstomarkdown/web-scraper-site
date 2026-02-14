import { Metadata } from "next"
import { ROICalculator } from "./_components/ROICalculator"
import { ROIGuide } from "./_components/ROIGuide"
import { ROIHowToUse } from "./_components/ROIHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Return on Investment (ROI) Calculator - Measure Product Return on Investment | Web Scraper Pro',
    description: 'Free Return on Investment (ROI) calculator to instantly measure return on investment for any product. Calculate net profit, ROI percentage, and profit ratio. Essential for e-commerce sellers.',
}

export default function ROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Return on Investment (ROI) Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ROICalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ROIHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ROIGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is Return on Investment (ROI) and why does it matter?",
                                    answer: "ROI (Return on Investment) measures how much profit you made relative to your investment. It's expressed as a percentage: ((Revenue - Investment) / Investment) × 100. A 100% ROI means you doubled your money."
                                },
                                {
                                    question: "What costs should I include in my investment?",
                                    answer: "Include all costs: product sourcing, shipping, packaging, advertising spend, platform fees, storage fees, and any other expenses directly related to selling the product."
                                },
                                {
                                    question: "What is a good Return on Investment (ROI) for e-commerce?",
                                    answer: "A good ROI varies by industry, but generally 15-30% is considered healthy for e-commerce. Dropshipping may see 20-50% ROI, while private label products can achieve 100%+ ROI."
                                },
                                {
                                    question: "How is Monthly Return on Investment (ROI) calculated?",
                                    answer: "Monthly ROI divides the total ROI percentage by the number of months. For example, a 120% ROI over 6 months equals 20% monthly ROI, helping you compare investments of different durations."
                                },
                                {
                                    question: "What does the Profit Ratio mean?",
                                    answer: "The profit ratio (or return multiple) shows how many dollars you get back for every dollar invested. A ratio of 2.0x means you earned $2 for every $1 invested — doubling your money."
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
