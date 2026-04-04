import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { InfluencerROICalculator } from "./_components/CalculatorComponent"
import { InfluencerHowToUse } from "./_components/InfluencerHowToUse"
import { InfluencerGuide } from "./_components/InfluencerGuide"
import { InfluencerOverview } from "./_components/InfluencerOverview"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"


export const metadata: Metadata = {
    title: "Influencer Marketing ROI Calculator - Track Campaign Performance | Web Scraper.do",
    description: "Calculate the true return on investment for your influencer marketing campaigns. Enter campaign cost and revenue to instantly see your ROI and profit.",
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
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="Tool Essential"
                            icon={Lightbulb}
                        />
                        <InfluencerOverview />
                    </FadeIn>
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
                                    question: "Should I use the simple mode or 'Add Details'?",
                                    answer: "If you just want a fast answer, use the default simple mode by entering your total <strong>Campaign Cost</strong> and <strong>Revenue</strong>. If you want to see exactly how your budget is split across Influencer Fees, Ads, and Products, click <strong>'Add Details'</strong>. The tool will auto-calculate your total cost from those details."
                                },
                                {
                                    question: "What exactly should I include in my 'Campaign Cost'?",
                                    answer: "Enter the <strong>total money you spent</strong> on the campaign. This includes the direct influencer fee, any performance bonuses, paid ad spend boosting the campaign, and out-of-pocket costs for shipping or product replacements."
                                },
                                {
                                    question: "How do I account for products I gifted to the influencer?",
                                    answer: "If you sent a free product instead of paying cash, enter the <strong>Product Cost (COGS)</strong> of that gift under 'Add Details'. This ensures your ROI calculation accounts for the actual capital you invested in the partnership, preventing an artificially inflated 0-cost ROI."
                                },
                                {
                                    question: "What is considered a 'Good' ROI for Influencer Marketing?",
                                    answer: "For direct-response sales, an ROI of <strong>100% (2x return)</strong> is typically a strong benchmark. However, influencer campaigns provide immense value through <strong>user-generated content (UGC)</strong> and <strong>brand awareness</strong>. A campaign that simply breaks even (0% ROI) is often a huge win because you get free, high-quality creatives to reuse in your paid ads."
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
