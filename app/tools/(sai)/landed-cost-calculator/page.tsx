import { Metadata } from "next"
import { LandedCostCalculator } from "./_components/LandedCostCalculator"
import { LandedCostGuide } from "./_components/LandedCostGuide"
import { LandedCostHowToUse } from "./_components/LandedCostHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Landed Cost Calculator - Calculate True Import Cost Per Unit | Web Scraper Pro',
    description: 'Free landed cost calculator to compute the true total cost of importing products. Includes product cost, shipping, customs duties, insurance, and fees. Essential for e-commerce importers.',
}

export default function LandedCostCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Landed Cost Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <LandedCostCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <LandedCostHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <LandedCostGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is landed cost?",
                                    answer: "Landed cost is the total cost of getting a product from the supplier to your warehouse. It includes the product price, international shipping, customs duties, insurance, brokerage fees, and any other charges incurred during import."
                                },
                                {
                                    question: "Why is landed cost important for e-commerce sellers?",
                                    answer: "Knowing your true landed cost is essential for setting profitable selling prices. Many sellers underestimate costs by only considering the product price, leading to thin or negative margins once shipping, duties, and fees are factored in."
                                },
                                {
                                    question: "How do I find my customs duty rate?",
                                    answer: "Look up your product's HS (Harmonized System) code on your country's customs website. In the US, use the USITC Harmonized Tariff Schedule. In the EU, check the TARIC database. Your freight forwarder or customs broker can also help determine the correct rate."
                                },
                                {
                                    question: "What is cost uplift percentage?",
                                    answer: "Cost uplift shows how much your per-unit cost increases due to import expenses. For example, if your product costs $10 from the supplier and landed cost is $15 per unit, the cost uplift is 50%. Lower uplift means more competitive pricing potential."
                                },
                                {
                                    question: "Should I use sea freight or air freight?",
                                    answer: "Sea freight is typically 4-8x cheaper than air freight but takes 20-40 days vs 3-7 days. Use sea freight for large, heavy, or non-urgent shipments. Use air freight for small, lightweight, high-value, or time-sensitive products. Many sellers use a mix of both."
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
