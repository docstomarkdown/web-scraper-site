import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { NetProfitCalculator } from "./_components/NetProfitCalculator"
import { NetProfitHowToUse } from "./_components/NetProfitHowToUse"
import { NetProfitGuide } from "./_components/NetProfitGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Net Profit Calculator - Calculate True Business Profit | Web Scraper.do",
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
                                    answer: "<strong>Gross Profit</strong> is only your Revenue minus COGS (what it costs to make the product). <strong>Net Profit</strong> is the 'True Bottom Line'—it's what remains after subtracting EVERYTHING else, including ads, rent, software, payroll, and taxes. It is your actual take-home pay."
                                },
                                {
                                    question: "Should I include my own salary in the overhead costs?",
                                    answer: "Yes, you should. If you don't account for a fair market wage for yourself, your business profit is artificially inflated. Tracking your salary as an expense helps you see if the business is truly profitable as an independent entity."
                                },
                                {
                                    question: "What is a 'Healthy' net profit margin for e-commerce?",
                                    answer: "While it varies by industry, a <strong>Net Profit Margin of 10% to 20%</strong> is generally considered healthy for established e-commerce brands. Brands focus on high-volume, low-margin goods might operate at 5%, while luxury goods can often reach 30% or higher."
                                },
                                {
                                    question: "Why does the tool subtract taxes from the net profit?",
                                    answer: "Many business owners make the mistake of spending 'Operational Profit' before taxes are paid. By subtracting your estimated tax rate, this tool gives you a realistic view of the actual cash you can safely withdraw or reinvest back into the business."
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
