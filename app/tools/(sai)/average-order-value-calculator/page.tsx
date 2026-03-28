import { Metadata } from "next"
import { AOVCalculator } from "./_components/AOVCalculator"
import { AOVGuide } from "./_components/AOVGuide"
import { AOVHowToUse } from "./_components/AOVHowToUse"
import { AOVOverview } from "./_components/AOVOverview"
import { FadeIn, ToolFAQ, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"
export const metadata: Metadata = {
    title: 'Average Order Value (AOV) Calculator | Web Scraper.do',
    description: 'Calculate your Average Order Value (AOV) to understand customer spending habits and improve your pricing strategy.',
}
export default function AOVCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Average Order Value (AOV) Calculator
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Determine the average amount spent every time a customer places an order.
                        </p>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <AOVCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="aov-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Understand how tracking your Average Order Value helps you grow your store's total revenue with every transaction."
                            icon={BookOpen}
                        />
                        <AOVOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AOVHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AOVGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is AOV?",
                                    answer: "Average Order Value (AOV) is the average dollar amount spent each time a customer places an order on a website or mobile app."
                                },
                                {
                                    question: "How do I calculate AOV?",
                                    answer: "Simply divide total revenue by the number of orders. Formula: Total Revenue / Total Orders."
                                },
                                {
                                    question: "Why is tracking AOV important?",
                                    answer: "Tracking AOV helps you evaluate your overall marketing efforts and pricing strategy. Increasing AOV is a key way to boost revenue without increasing traffic."
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
