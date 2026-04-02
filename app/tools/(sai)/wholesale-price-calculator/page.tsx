import { Metadata } from "next"
import { WholesalePriceCalculator } from "./_components/WholesalePriceCalculator"
import { WholesalePriceHowToUse } from "./_components/WholesalePriceHowToUse"
import { WholesalePriceGuide } from "./_components/WholesalePriceGuide"
import { WholesalePriceOverview } from "./_components/WholesalePriceOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Wholesale Price Calculator — Set Profitable Selling Prices",
    description: "Free wholesale price calculator. Determine the correct wholesale selling price from your cost per unit and desired profit margin. Instantly see markup, profit per unit, and the true cost breakdown.",
}

export default function WholesalePriceCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Wholesale Price Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <WholesalePriceCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <WholesalePriceOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <WholesalePriceHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <WholesalePriceGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is the Wholesale Price calculated?",
                                    answer: "The calculator uses the margin-based formula: Price = Effective Cost ÷ (1 − Margin%). For example, if your cost is $10 and you want a 40% margin, the wholesale price is $10 ÷ 0.60 = $16.67. This ensures profit is always calculated as a percentage of the final price."
                                },
                                {
                                    question: "Should I include shipping in my Cost per Unit?",
                                    answer: "Yes. If you pay inbound shipping or freight to receive your products, this should be included in your Cost per Unit so the wholesale price fully covers all expenses. Alternatively, treat it as a tax/duty input."
                                },
                                {
                                    question: "How much lower should a wholesale price be than the retail price?",
                                    answer: "Typically, a wholesale price should be exactly 50% of your retail price. This is known in the industry as 'keystone pricing.' It guarantees the retailer a 50% gross margin, which they need to cover their store overhead. If your product retails for $50, your target wholesale price should be $25."
                                },
                                {
                                    question: "What if my calculated wholesale price is too high for the market?",
                                    answer: "If retailers reject your wholesale price, you have two viable options: reduce your Cost per Unit (by securing volume discounts from suppliers or optimizing packaging) or accept a lower profit margin. Never randomly lower your price without recalculating to ensure you aren't selling at a loss."
                                },
                                {
                                    question: "Do I charge sales tax on wholesale transactions?",
                                    answer: "No. You generally do not collect sales tax on wholesale or B2B orders. Because the retailer is buying the goods to resell them, they are responsible for collecting sales tax from the end consumer. Always require buyers to provide a valid reseller permit or tax exemption certificate."
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