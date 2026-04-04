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
                                    question: "What is AOV and why does it matter?",
                                    answer: "Average Order Value (AOV) is the average amount of money a customer spends per transaction in your store. It matters because increasing your AOV is one of the fastest and cheapest ways to grow revenue—you’re extracting more value from the traffic you already have without spending more on marketing."
                                },
                                {
                                    question: "How do I calculate AOV?",
                                    answer: "AOV is calculated by dividing your total revenue by the total number of orders placed over a specific time period. For example, if your store generated $50,000 in sales from 1,000 orders last month, your AOV is $50 ($50,000 ÷ 1,000)."
                                },
                                {
                                    question: "What is considered a good AOV?",
                                    answer: "There is no universal 'good' AOV, as it depends heavily on your industry and product pricing. For a low-ticket apparel store, an AOV of $60 might be excellent. For high-ticket electronics, $500 could be standard. The best benchmark is your own historical data—a 'good' AOV is one that consistently grows over time and comfortably covers your customer acquisition costs (CAC)."
                                },
                                {
                                    question: "How can I increase my AOV?",
                                    answer: "The most effective strategies include creating product bundles, setting free shipping thresholds (e.g., 'Spend $20 more for free shipping'), adding low-cost impulse upsells directly in the checkout cart, and offering volume discounts (e.g., 'Buy 2, Get 10% Off')."
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
