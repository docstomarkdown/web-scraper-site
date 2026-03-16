import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { InfluencerROICalculator } from "./_components/CalculatorComponent"
import { InfluencerHowToUse } from "./_components/InfluencerHowToUse"
import { InfluencerGuide } from "./_components/InfluencerGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Influencer Marketing ROI Calculator - Track Campaign Performance | Web Scraper.do",
    description: "Calculate the true return on investment for your influencer marketing campaigns. Track fees, gifting costs, and sales to measure campaign success.",
}
export default function InfluencerROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Influencer Marketing ROI Calculator" />
                <div className="mb-20">
                    <InfluencerROICalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <InfluencerHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <InfluencerGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the difference between ROAS and ROI in this tool?",
                                    answer: "<strong>ROAS</strong> (Return on Ad Spend) measures the gross revenue generated specifically from your marketing costs. If you only provide the <strong>Fee</strong> and <strong>Price</strong>, we show your ROAS. However, once you add <strong>Product</strong> and <strong>Shipping</strong> costs, the tool calculates your <strong>Net ROI</strong>, which shows your true back-pocket profit after all expenses are covered."
                                },
                                {
                                    question: "How should I account for 'gifted' products instead of a fee?",
                                    answer: "If you didn't pay a cash fee but sent a free product instead, you should enter the <strong>Product Cost (COGS)</strong> of that gift into the <strong>Influencer Fee</strong> field. This ensures your ROI calculation accounts for the actual capital you invested in that partnership."
                                },
                                {
                                    question: "What is a 'Good' ROI for Influencer Marketing?",
                                    answer: "For direct-response sales, an ROI of <strong>100% (2x return)</strong> is a strong benchmark. However, influencer campaigns often provide 'hidden' value through <strong>UGC</strong> and <strong>Brand Awareness</strong>. If a campaign results in a 0% ROI (Break Even) but gives you high-quality video content for your future ads, it is often considered a successful investment."
                                },
                                {
                                    question: "Why is tracking 'Profit per Order' useful?",
                                    answer: "While total ROI is great for high-level reporting, <strong>Profit per Order</strong> tells you if your unit economics are healthy. If your influencer drives 1,000 sales but your profit per order is only $1, your margins might be too thin to sustain scaling. This metric helps you decide which products are best suited for influencer promotions."
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
