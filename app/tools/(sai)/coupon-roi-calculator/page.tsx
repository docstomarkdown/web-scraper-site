import { Metadata } from "next"
import { CouponROICalculator } from "./_components/CouponROICalculator"
import { CouponROIGuide } from "./_components/CouponROIGuide"
import { CouponROIHowToUse } from "./_components/CouponROIHowToUse"
import { CouponROIOverview } from "./_components/CouponROIOverview"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Coupon ROI Calculator - Calculate Campaign Profitability | Web Scraper.do',
    description: 'Free tool to calculate the return on investment of your coupon campaigns. Analyze break-even points, net profit, and true cost of discounting.',
}
export default function CouponROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Coupon ROI Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <CouponROICalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <CouponROIOverview />
                    </FadeIn>
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
                                    question: "1. Should I include fixed costs in the calculation?",
                                    answer: "When analyzing a specific coupon campaign, it’s best practice to **only include variable costs**. This consists primarily of the exact discount amount and any direct promotional spend, rather than broader baseline operational or fixed expenses."
                                },
                                {
                                    question: "2. How is Coupon ROI calculated?",
                                    answer: "Coupon ROI divides your Net Profit (Revenue minus COGS minus Discount Value minus Campaign Spend) by your Total Campaign Investment. Unlike other models, this equation restricts the investment total purely to marketing efficiency, isolating ad spend directly correlated to the coupon."
                                },
                                {
                                    question: "3. What represents a 'good' or healthy ROI?",
                                    answer: "While positive ROI indicates direct financial growth, an optimal target depends heavily on your goals. For instance, accepting a break-even—or slightly negative ROI—is common and entirely valid if the campaign effectively prioritizes **customer acquisition and LTV** over instant net profitability."
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