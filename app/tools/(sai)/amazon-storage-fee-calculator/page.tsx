import { Metadata } from "next"
import { StorageFeeCalculator } from "./_components/StorageFeeCalculator"
import { StorageFeeOverview } from "./_components/StorageFeeOverview"
import { StorageFeeGuide } from "./_components/StorageFeeGuide"
import { StorageFeeHowToUse } from "./_components/StorageFeeHowToUse"
import { ToolPageTitle, FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Amazon Storage Fee Calculator — Estimate FBA Inventory Costs | Web Scraper.do',
    description: 'Calculate your monthly Amazon FBA storage fees, seasonal Q4 peak rates, and long-term inventory surcharges. Free tool for FBA sellers and private label brands.',
}
export default function AmazonStorageFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Amazon Storage Fee Calculator" />
                <div className="mb-20">
                    <StorageFeeCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16" id="storage-guide">
                    <FadeIn delay={0.2}>
                        <StorageFeeOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <StorageFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <StorageFeeGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How does Amazon calculate storage fees?",
                                    answer: "Amazon calculates monthly storage fees based on the daily average volume (measured in cubic feet) that your inventory occupies in their fulfillment centers. The rate changes depending on the product size tier (Standard vs Oversize) and the time of year, with costs significantly spiking during the Q4 holiday season (October–December)."
                                },
                                {
                                    question: "What is long-term storage fee?",
                                    answer: "Amazon applies an Aged Inventory Surcharge (commonly known as a long-term storage fee) to any inventory that has been stored in their fulfillment centers for more than 181 days (6 months). This surcharge is applied monthly on top of your standard storage fees and becomes more expensive the longer the item sits."
                                },
                                {
                                    question: "How can I avoid long-term storage fees?",
                                    answer: "To avoid surcharges, aim to move inventory before the 6-month mark. You can run promotions, create Outlet deals, lower your price, or create a removal order to have excess stock sent back to you or disposed of before aged fees apply."
                                },
                                {
                                    question: "Are storage fees the same as FBA fulfillment fees?",
                                    answer: "No. <strong>Storage fees</strong> act as the monthly rent for holding your products in an Amazon fulfillment center. <strong>Fulfillment fees</strong> (pick and pack) are a separate charge applied only when an item actually sells and is shipped to a customer."
                                },
                                {
                                    question: "How much inventory should I send to Amazon?",
                                    answer: "To balance stockouts and storage costs, most sellers aim to keep <strong>30 to 60 days of inventory</strong> at Amazon. For larger volumes, it is often cheaper to use a 3PL partner for bulk storage and 'drip-feed' stock into FBA to avoid high monthly bills and long-term surcharges."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}