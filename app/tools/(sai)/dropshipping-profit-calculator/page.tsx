import { Metadata } from "next"
import Link from "next/link"
import { DropshippingCalculator } from "./_components/DropshippingCalculator"
import { Card, CardContent } from "@/components/ui/card"
import { DropshippingHowToUse } from "./_components/DropshippingHowToUse"
import { ProfitGuide } from "./_components/ProfitGuide"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Dropshipping Profit Calculator - Estimate your e-commerce margins",
    description: "Free tool to calculate your dropshipping profits, taking into account ads cost, RTOs, shipping, and product costs.",
}
export default function DropshippingCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Dropshipping Profit Calculator
                        </h1>
                    </FadeIn>
                </div>
                <DropshippingCalculator />
                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <FadeIn delay={0.1}>
                        <DropshippingHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ProfitGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good RTO percentage?",
                                    answer: "RTO rates vary by niche. For prepaid orders, it's usually low (5-10%). For Cash on Delivery (COD) in India, <strong>15-30%</strong> is common. Anything above 30% requires immediate attention."
                                },
                                {
                                    question: "Why is shipping cost calculated for RTO?",
                                    answer: "When an order is RTO'd, the courier charges you for both forward and return shipment. This double cost can kill profits, which is why we include it in the \"Total RTO Cost\"."
                                },
                                {
                                    question: "Does this calculator work for international dropshipping?",
                                    answer: "Yes! The calculator supports multiple currencies. Just select your currency from the dropdown and input your values."
                                },
                                {
                                    question: "How do I calculate \"Ads Cost per Product\"?",
                                    answer: "This is also known as CPA (Cost Per Acquisition). Divide your total ad spend by the number of orders received. E.g., ₹2000 ad spend ÷ 10 orders = ₹200 CPA."
                                }
                            ]}
                        />
                    </FadeIn>
                </div>
                {/* CTA Section */}
                <FadeIn delay={0.2}>
                    <CTA />
                </FadeIn>
            </div >
        </div >
    )
}