import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { AffiliateCommissionCalculator } from "./_components/AffiliateCommissionCalculator"
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
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Affiliate Commission Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <AffiliateCommissionCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <AffiliateHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <AffiliateGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is 'Net Revenue' calculated in this tool?",
                                    answer: "Net Revenue = (Net Sales × Product Price) - (Net Sales × Product Cost) - Total Payout. It represents your absolute 'take-home' profit after manufacturing costs and affiliate commissions are paid. It accounts for refunded units, which many other calculators ignore."
                                },
                                {
                                    question: "What is the 'Break-Even Rate' and why is it important?",
                                    answer: "The Break-Even Rate is the maximum commission percentage you can pay before you start losing money on a sale. For example, if your margin is 40% and you pay 40% commission, you break even. If you pay 45%, you lose money. This tool highlights this with the 'Profit Safe / Loss Warning' badge."
                                },
                                {
                                    question: "What are industry standard commission rates?",
                                    answer: "Standard rates vary: Physical goods typically range from 5–15%, while digital products (with lower COGS) can range from 30–50%. Use this tool to see what *your* specific brand can afford based on your actual margins."
                                },
                                {
                                    question: "Should I calculate commissions based on Gross or Net Sales?",
                                    answer: "Always aim for Net Sales (post-refunds). If you pay commission on gross sales, you will lose significantly more money on every returned item. We recommend a 'holding period' (e.g., Net-30) to ensure the refund window has passed before payouts are finalized."
                                },
                                {
                                    question: "How does the 'Refund Rate' affect my total payout?",
                                    answer: "The tool multiplies your gross sales by the refund percentage to find 'Refunded Units'. These units are subtracted from your total sales *before* the commission is calculated. This gives you a more realistic estimate of your actual liability."
                                },
                                {
                                    question: "Can I use this for SaaS or digital products?",
                                    answer: "Absolutely. For digital products, your 'Product Cost (COGS)' might be very low (e.g., $1-5 for server/support costs). This allows you to see how high you can push your commission rates to attract top-tier affiliates while staying profitable."
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