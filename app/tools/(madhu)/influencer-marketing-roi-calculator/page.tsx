import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { InfluencerROICalculator } from "./_components/CalculatorComponent"
import { InfluencerHowToUse } from "./_components/InfluencerHowToUse"
import { InfluencerGuide } from "./_components/InfluencerGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Influencer Marketing ROI Calculator - Track Campaign Performance | Web Scraper Pro",
    description: "Calculate the true return on investment for your influencer marketing campaigns. Track fees, gifting costs, and sales to measure campaign success.",
}

export default function InfluencerROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Influencer Marketing ROI Calculator
                        </h1>
                    </FadeIn>
                </div>

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
                                    question: "What is a good ROI % for an influencer campaign?",
                                    answer: "A healthy direct-response campaign typically targets a <strong>ROI of 100% or higher</strong>, meaning you earn back at least double what you spent. For pure brand awareness campaigns, breaking even (0% ROI) is often acceptable if the campaign builds long-term audience trust and search volume. Anything above 200% is considered strong performance."
                                },
                                {
                                    question: "Why does 'Product Cost per Item' and 'Shipping Cost' get multiplied by Total Orders?",
                                    answer: "Because these are <strong>variable costs</strong> — they are incurred once for every single order fulfilled. Unlike the Influencer Fee and Ad Spend which are fixed one-time payments, your product and shipping costs scale directly with sales volume. The tool multiplies them by Total Orders to give you an accurate Total Cost figure."
                                },
                                {
                                    question: "What does 'Profit per Order' tell me?",
                                    answer: "<strong>Profit per Order</strong> shows how much net profit you make on every individual sale after accounting for all costs (campaign fees + product + shipping). If this number is negative, you are losing money on each order sold and no volume of orders will make the campaign profitable without changes to your pricing or cost structure."
                                },
                                {
                                    question: "How do I track which orders came from the influencer campaign?",
                                    answer: "The most reliable methods are: (1) a unique <strong>discount code</strong> tied exclusively to the influencer (e.g. 'SARAH20'), (2) a <strong>UTM-tagged link</strong> tracked in Google Analytics, or (3) a dedicated <strong>landing page URL</strong>. Without one of these attribution methods, you will significantly undercount the campaign's actual sales."
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
