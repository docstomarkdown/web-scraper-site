import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { GrossMarginCalculator } from "./_components/GrossMarginCalculator"
import { GrossMarginHowToUse } from "./_components/GrossMarginHowToUse"
import { GrossMarginGuide } from "./_components/GrossMarginGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Gross Margin Calculator - Calculate Margin, Revenue & COGS | Web Scraper.do",
    description: "Free advanced Gross Margin Calculator. Calculate Gross Margin Percentage from Revenue and COGS. Optimize pricing strategies and protect your bottom line.",
}

export default function GrossMarginCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Gross Margin Calculator" />
                <div className="mb-20">
                    <GrossMarginCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <GrossMarginHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <GrossMarginGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Can I use this to set my product prices?",
                                    answer: "Yes. Switch to 'Find Revenue' mode, enter your production cost (COGS), and your target margin. The calculator will tell you the exact minimum price you need to charge to hit that profit goal."
                                },
                                {
                                    question: "What is a healthy Gross Margin for a business?",
                                    answer: "While it varies by industry, a <strong>Gross Margin of 30% to 50%</strong> is often considered healthy for many businesses. This provides enough room to cover overhead, marketing, and taxes while still leaving a net profit at the bottom line."
                                },
                                {
                                    question: "What should I include in my COGS?",
                                    answer: "Cost of Goods Sold (COGS) should include every direct expense to get the product to your door: wholesale price, manufacturing costs, shipping to your warehouse, and packaging."
                                },
                                {
                                    question: "How can I use 'Find COGS' mode?",
                                    answer: "If you know your market's top price point and your required margin, this mode tells you the maximum you can afford to spend on making or buying the product while still staying profitable."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
