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
                                    question: "Why are some fields mandatory and others optional?",
                                    answer: "To calculate a basic marketing ROI, you only need three core numbers: <strong>Influencer Fee</strong>, <strong>Selling Price</strong>, and <strong>Number of Orders</strong>. We made secondary costs (like <strong>Ad Spend</strong>, <strong>Product Cost</strong>, and <strong>Shipping</strong>) optional so you can get a quick estimate in seconds, while still offering the flexibility to calculate a deeper <strong>Net Profit ROI</strong> if you know those numbers."
                                },
                                {
                                    question: "What happens if I leave the optional 'Product Cost' or 'Shipping' fields blank?",
                                    answer: "If you leave the optional fields empty, the calculator simply treats them as $0. This means your final ROI will reflect a <strong>Gross Return on Ad Spend (ROAS)</strong> rather than a <strong>True Net Profit</strong>. It's perfectly fine to do this if you are just evaluating the marketing efficiency of the influencer."
                                },
                                {
                                    question: "What is a good ROI % for an influencer campaign?",
                                    answer: "A healthy direct-response campaign typically targets a <strong>ROI of 100% or higher</strong>, meaning you earn back at least double what you spent on the campaign. For pure brand awareness, breaking even (0% ROI) is often acceptable if the campaign builds long-term audience trust and search volume."
                                },
                                {
                                    question: "How is 'Total Cost' calculated if I fill out all the fields?",
                                    answer: "The calculator adds your fixed upfront costs (<strong>Influencer Fee + Ad Spend</strong>) to your variable fulfillment costs. It multiplies your (<strong>Product Cost + Shipping Cost</strong>) by the <strong>Total Orders</strong>, and then adds that figure to your campaign spend to give you a highly accurate <strong>True Total Cost</strong>."
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
