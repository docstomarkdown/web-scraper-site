import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { NetProfitCalculator } from "./_components/NetProfitCalculator"
import { NetProfitHowToUse } from "./_components/NetProfitHowToUse"
import { NetProfitGuide } from "./_components/NetProfitGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Net Profit Calculator - Calculate True Business Profit | Web Scraper Pro",
    description: "Calculate your net profit after expenses, ads, overhead, and taxes. Get a clear view of your business bottom line with our free calculator.",
}
export default function NetProfitCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Net Profit Calculator" />
                <div className="mb-20">
                    <NetProfitCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <NetProfitHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <NetProfitGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the difference between Gross Profit and Net Profit?",
                                    answer: "Gross Profit is only your Revenue minus COGS. <strong>Net Profit</strong> is what remains after subtracting EVERYTHING else—ads, rent, software, payroll, and taxes. It is your true take-home pay."
                                },
                                {
                                    question: "Should I include owner's salary in overhead?",
                                    answer: "Absolutely. If you don't pay yourself a fair market wage in your calculations, your profit is artificially inflated. You are calculating the profit of the business, not your total compensation."
                                },
                                {
                                    question: "What does a negative ROI imply?",
                                    answer: "A negative ROI means you are losing money on every dollar you spend to run the business. This usually points to high COGS, inefficient ad spend, or a price point that is simply too low."
                                },
                                {
                                    question: "How should I use the Income & Expense Breakdown chart?",
                                    answer: "The chart helps you visualize the 'Slices of the Pie.' If 'Ads' or 'COGS' is taking up more than 50% of your total revenue, those are your primary targets for optimization and cost reduction."
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
