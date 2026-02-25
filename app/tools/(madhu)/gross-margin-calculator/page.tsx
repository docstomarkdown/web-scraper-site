import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { GrossMarginCalculator } from "./_components/GrossMarginCalculator"
import { GrossMarginHowToUse } from "./_components/GrossMarginHowToUse"
import { GrossMarginGuide } from "./_components/GrossMarginGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Gross Margin Calculator - Calculate Margin, Revenue & COGS | Web Scraper Pro",
    description: "Free advanced Gross Margin Calculator. Calculate Gross Margin Percentage from Revenue and COGS. optimize pricing strategies and protect your bottom line.",
}

export default function GrossMarginCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Gross Margin Calculator
                        </h1>
                    </FadeIn>
                </div>

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
                                    question: "What is the formula for Gross Margin?",
                                    answer: "Gross Margin % = ((Total Revenue - COGS) / Total Revenue) * 100. It represents the percentage of each dollar of revenue that you retain as gross profit."
                                },
                                {
                                    question: "What is a 'good' Gross Margin?",
                                    answer: "It varies wildly by industry. SaaS companies often aim for 80%+, while high-volume retail might thrive on 25-30%. As a rule of thumb for e-commerce, aiming for 50%+ allows ample room for marketing and OpEx."
                                },
                                {
                                    question: "When should I use 'Find Revenue'?",
                                    answer: "Use this mode when you know your product cost (COGS) and want to achieve a specific margin (e.g., 40%). The tool will tell you exactly what price you need to sell at."
                                },
                                {
                                    question: "Why does this tool calculate Markup too?",
                                    answer: "We include Markup to help you spot the difference. Many suppliers quote in Markup, while your P&L speaks in Margin. Seeing both helps you translate between supplier-speak and accountant-speak."
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
