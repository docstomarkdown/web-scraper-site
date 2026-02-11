import { Metadata } from "next"
import { DiscountCalculator } from "./_components/DiscountCalculator"
import { DiscountGuide } from "./_components/DiscountGuide"
import { HowToUse } from "./_components/HowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Discount Percentage Calculator - Calculate Savings & Final Price | Web Scraper Pro',
    description: 'Free discount percentage calculator to instantly calculate final price, discount amount, and savings. Essential for shoppers and retailers.',
}

export default function DiscountCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Discount Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <DiscountCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <HowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <DiscountGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I calculate a discount?",
                                    answer: "To calculate a discount, multiply the original price by the discount percentage (as a decimal). For example, to find 20% off $50: 50 * 0.20 = $10 savings. Then subtract savings from original price: 50 - 10 = $40 final price."
                                },
                                {
                                    question: "How do I find the percentage off?",
                                    answer: "If you know the original price and the sale price, subtract the sale price from the original price to get the savings. Then divide the savings by the original price and multiply by 100."
                                },
                                {
                                    question: "What is the formula for discount percentage?",
                                    answer: "Discount % = ((Original Price - Final Price) / Original Price) * 100."
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
