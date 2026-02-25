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
                                    question: "What is a 'Good' ROI for Influencer Marketing?",
                                    answer: "A healthy e-commerce campaign typically targets a **300% ROI (3:1)**. However, for brand awareness strategies, a 1:1 break-even is often acceptable if the 'Cost Per Impression' (CPM) is significantly lower than Facebook/Instagram Ads."
                                },
                                {
                                    question: "Why should I include 'Product COGS'?",
                                    answer: "Many brands make the mistake of calculating ROI based on retail value. You must deduct the **Cost of Goods Sold (COGS)** and shipping to see real cash efficiency. If you gift a $100 item that cost you $20 to make, your investment is $20, not $100."
                                },
                                {
                                    question: "What is the difference between CPM and CPE?",
                                    answer: "**CPM (Cost Per Mille)** measures the cost for every 1,000 views (Awareness), while **CPE (Cost Per Engagement)** measures the cost for every Like, Comment, or Share (Interest). Use CPM for top-of-funnel goals and CPE for community building."
                                },
                                {
                                    question: "How do I track 'Total Sales' from a post?",
                                    answer: "Always provide a unique discount code (e.g., 'SARAH20') or a tracked UTM link. Without these direct attribution methods, you will largely underestimate the campaign's impact."
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
