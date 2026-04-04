import { Metadata } from "next"
import { EbayFeeCalculator } from "./_components/EbayFeeCalculator"
import { EbayFeeGuide } from "./_components/EbayFeeGuide"
import { EbayFeeHowToUse } from "./_components/EbayFeeHowToUse"
import { EbayOverview } from "./_components/EbayOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: 'eBay Fee Calculator - Calculate Final Value Fees & Profit | Web Scraper.do',
    description: 'Calculate your exact eBay fees, including Final Value Fees, Ad Fees, and shipping costs. Determine your true net profit per item.',
}

export default function EbayFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="eBay Fee Calculator" direction="down" duration={0.6} />
                
                <div className="mb-20">
                    <EbayFeeCalculator />
                </div>
                
                <div className="max-w-5xl mx-auto space-y-16" id="ebay-fee-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            icon={BookOpen}
                        />
                        <EbayOverview />
                    </FadeIn>

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
                                    question: "What is the standard Final Value Fee?",
                                    answer: "For most categories, eBay charges a Final Value Fee of 13.25% on the total amount of the sale, plus a fixed $0.30 fee per order. Certain categories, like Sneakers, Books, or Heavy Equipment, have different rates."
                                },
                                {
                                    question: "Are payment processing fees separate on eBay?",
                                    answer: "No. Since the introduction of eBay Managed Payments, the Final Value Fee (FVF) includes all payment processing costs. You do not pay separate fees to PayPal or credit card processors."
                                },
                                {
                                    question: "Does eBay charge fees on shipping?",
                                    answer: "Yes, the Final Value Fee percentage is applied to the *total* amount of the sale. This includes the item price, the shipping cost charged to the buyer, and any applicable sales tax."
                                },
                                {
                                    question: "How do Store subscriptions affect fees?",
                                    answer: "Having an active eBay Store subscription (Basic, Premium, Anchor, etc.) typically lowers your Final Value Fee percentage in many categories. For instance, the 13.25% rate might be reduced to 12.35% depending on the exact item category."
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