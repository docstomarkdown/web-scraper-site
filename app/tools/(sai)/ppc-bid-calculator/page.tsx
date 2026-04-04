import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { PPCBidCalculator } from "./_components/PPCBidCalculator"
import { PPCBidHowToUse } from "./_components/PPCBidHowToUse"
import { PPCBidGuide } from "./_components/PPCBidGuide"
import { PPCBidOverview } from "./_components/PPCBidOverview"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Pay-Per-Click (PPC) Bid Calculator | Calculate Max Cost Per Click",
    description: "Calculate your maximum profitable PPC bid based on your product price, conversion rate, profit margin, and target ACoS. Free tool for Amazon PPC, Google Ads, and all eCommerce advertising.",
}

export default function PPCBidCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Pay-Per-Click (PPC) Bid Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <PPCBidCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <PPCBidOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PPCBidHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <PPCBidGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is the Recommended Bid calculated?",
                                    answer: "The formula is: Recommended Bid = Product Price × Conversion Rate × Target ACoS. If no target is set, the tool uses 75% of your profit margin to provide a safe bidding ceiling."
                                },
                                {
                                    question: "What is a good Target ACoS for my campaigns?",
                                    answer: "A good Target ACoS is one that is lower than your product's profit margin. If your profit margin is 40%, your Target ACoS should be below 40% to remain profitable. For new campaigns, starting around 15–25% is a common benchmark."
                                },
                                {
                                    question: "What is the difference between Recommended Bid and Break-even Bid?",
                                    answer: "The Recommended Bid is the CPC that aligns with your specific Target ACoS or profit goals. The Break-even Bid (Price × CR × Profit Margin) is the exact point where you make no profit and no loss. Your Recommended Bid should always be below the Break-even Bid."
                                },
                                {
                                    question: "Should I always bid exactly the maximum amount?",
                                    answer: "Not necessarily. The Recommended Bid is a profitability ceiling. You should start with a bid slightly below this ceiling to build initial performance data, then adjust based on real campaign results and your visibility goals."
                                },
                                {
                                    question: "How do I find my product's conversion rate?",
                                    answer: "Your conversion rate is calculated as: (Total Orders ÷ Total Clicks) × 100. Find this in your Amazon Seller Central, Google Ads, or ad platform reports. Industry averages for Amazon PPC typically range from 8–15%."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}