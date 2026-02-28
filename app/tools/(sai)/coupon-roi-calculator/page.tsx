import { Metadata } from "next"
import { CouponROICalculator } from "./_components/CouponROICalculator"
import { CouponROIGuide } from "./_components/CouponROIGuide"
import { CouponROIHowToUse } from "./_components/CouponROIHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Coupon ROI Calculator - Calculate Campaign Profitability | Web Scraper Pro',
    description: 'Free tool to calculate the return on investment of your coupon campaigns. Analyze break-even points, net profit, and true cost of discounting.',
}

export default function CouponROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Coupon ROI Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <CouponROICalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <CouponROIHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CouponROIGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is Coupon ROI calculated?",
                                    answer: "We take your Net Profit (Revenue - COGS - Discount Cost - Campaign Cost) and divide it by your Total Investment (Campaign Cost). Some models include COGS in investment, but for marketing efficiency, we focus on ad spend."
                                },
                                {
                                    question: "What is a good ROI for a coupon campaign?",
                                    answer: "A positive ROI is the baseline. However, for coupons, a lower ROI is acceptable if the goal is customer acquisition (LTV) rather than immediate profit."
                                },
                                {
                                    question: "Should I include fixed costs?",
                                    answer: "For a specific campaign analysis, only include the variable costs (discount amount) and direct fixed costs (printing/ads) associated with that campaign."
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
