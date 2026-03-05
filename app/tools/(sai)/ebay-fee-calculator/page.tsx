import { Metadata } from "next"
import { EbayFeeCalculator } from "./_components/EbayFeeCalculator"
import { EbayFeeGuide } from "./_components/EbayFeeGuide"
import { EbayFeeHowToUse } from "./_components/EbayFeeHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'eBay Fee Calculator - Calculate Final Value Fees & Profit | Web Scraper Pro',
    description: 'Calculate your exact eBay fees, including Final Value Fees, Ad Fees, and shipping costs. Determine your true net profit per item.',
}
export default function EbayFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            eBay Fee Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <EbayFeeCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <EbayFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <EbayFeeGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Does eBay charge fees on shipping?",
                                    answer: "Yes, the Final Value Fee is calculated on the total amount of the sale, which includes the item price, shipping cost charged to the buyer, and any sales tax."
                                },
                                {
                                    question: "What is the standard Final Value Fee?",
                                    answer: "For most categories, it is 13.25% of the total amount of the sale plus $0.30 per order. Some categories like Sneakers or Coins have different rates."
                                },
                                {
                                    question: "How do store subscriptions affect fees?",
                                    answer: "An eBay Store subscription can lower your Final Value Fee percentage in certain categories (e.g. to 12.35%). You should check eBay's current fee table for your specific category."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}