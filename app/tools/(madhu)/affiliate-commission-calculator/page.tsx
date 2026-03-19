import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { AffiliateCommissionCalculator } from "./_components/AffiliateCommissionCalculator"
import { AffiliateOverview } from "./_components/AffiliateOverview"
import { AffiliateHowToUse } from "./_components/AffiliateHowToUse"
import { AffiliateGuide } from "./_components/AffiliateGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Affiliate Commission Calculator - Free Payout & Profit Tool",
    description: "Calculate affiliate commission payouts, net revenue, break-even rates, and profitability at different commission structures. Free tool for e-commerce sellers and affiliate program managers.",
}
export default function AffiliateCommissionCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Affiliate Commission Calculator" />
                <div className="mb-20">
                    <AffiliateCommissionCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <AffiliateOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <AffiliateHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <AffiliateGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the minimum I need to enter to get results?",
                                    answer: "Three fields: <strong>Affiliate Traffic (Clicks)</strong>, <strong>Average Order Value</strong>, and <strong>Affiliate Commission Rate</strong>. <strong>Conversion Rate</strong> is pre-filled with an industry default, and <strong>Product Cost</strong> is optional for profitability analysis."
                                },
                                {
                                    question: "How is Affiliate Payout calculated?",
                                    answer: "<strong>Affiliate Payout</strong> = <strong>Total Revenue</strong> × <strong>Commission %</strong>. Total Revenue itself is calculated as <strong>Estimated Sales</strong> × <strong>Average Order Value</strong>, where Estimated Sales = <strong>Clicks</strong> × <strong>Conversion Rate</strong>. This gives you the total commission you'll pay across all affiliate-driven sales."
                                },
                                {
                                    question: "How is Net Profit calculated?",
                                    answer: "<strong>Net Profit</strong> = <strong>Total Revenue</strong> − <strong>Affiliate Payout</strong> − <strong>Product Cost</strong>. Product Cost is expressed as a percentage of revenue and has no default value. Filling it in shows you what you actually keep after paying affiliates and covering your fulfillment costs."
                                },
                                {
                                    question: "Why is Affiliate Payout the primary result?",
                                    answer: "The main purpose of this tool is to estimate how much you will pay affiliates at a given commission rate. That's why <strong>Affiliate Payout</strong> is highlighted as the primary metric, with <strong>Revenue</strong>, <strong>Sales</strong>, and <strong>Net Profit</strong> shown as supporting context."
                                },
                                {
                                    question: "What are typical commission rates?",
                                    answer: "Typical rates vary by industry: Physical goods range from <strong>5% to 15%</strong>, SaaS and digital products from <strong>20% to 50%</strong>. Test a few different rates in the calculator to see how they uniquely affect your profit margins before setting a firm policy."
                                },
                                {
                                    question: "What does the Product Cost (% of Revenue) field do?",
                                    answer: "This optional field represents your cost to produce or source the product as a percentage of revenue. It has no default — leave it blank if you only care about payout. Fill it in to see your <strong>Net Profit</strong> after deducting both affiliate commissions and product costs."
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
