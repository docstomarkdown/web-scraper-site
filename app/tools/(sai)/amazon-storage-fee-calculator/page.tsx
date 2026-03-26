import { Metadata } from "next"
import { StorageFeeCalculator } from "./_components/StorageFeeCalculator"
import { StorageFeeOverview } from "./_components/StorageFeeOverview"
import { StorageFeeGuide } from "./_components/StorageFeeGuide"
import { StorageFeeHowToUse } from "./_components/StorageFeeHowToUse"
import { ToolPageTitle, FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Amazon Storage Fee Calculator — Estimate FBA Inventory Costs | Web Scraper.do',
    description: 'Calculate your monthly Amazon FBA storage fees, seasonal Q4 peak rates, and long-term inventory surcharges. Free tool for FBA sellers and private label brands.',
}
export default function AmazonStorageFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Amazon Storage Fee Calculator" />
                <div className="mb-20">
                    <StorageFeeCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16" id="storage-guide">
                    <FadeIn delay={0.2}>
                        <StorageFeeOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <StorageFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <StorageFeeGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How is the storage fee calculated?",
                                    answer: "Amazon charges storage fees based on the <strong>cubic volume</strong> of your inventory. The formula is: <strong>(Length × Width × Height ÷ 1,728) × Units × Rate per Cubic Foot</strong>. For example, a 12×12×12 inch box is exactly 1 cubic foot, and storing 100 of them in January–September costs roughly $87/month."
                                },
                                {
                                    question: "Why do storage fees increase in Q4?",
                                    answer: "During the holiday season (<strong>October–December</strong>), Amazon's warehouses are in peak demand. Rates jump from ~<strong>$0.87/cu ft</strong> to ~<strong>$2.40/cu ft</strong> for standard-size items — nearly <strong>3× higher</strong>. Use the Advanced Settings to toggle between seasons and plan your Q4 inventory levels."
                                },
                                {
                                    question: "What does Auto-detect do for Size Tier?",
                                    answer: "When set to <strong>Auto-detect</strong>, the calculator checks your entered dimensions against Amazon's official thresholds (<strong>18 × 14 × 8 inches</strong>). If your product fits within those limits, it's classified as Standard-size. Anything larger is automatically classified as Oversize — and the correct storage rate is applied."
                                },
                                {
                                    question: "Does this calculator include long-term storage fees?",
                                    answer: "Yes. If your <strong>Storage Duration exceeds 6 months</strong>, the calculator automatically adds estimated <strong>Aged Inventory Surcharges</strong> (~$1.50/cu ft per additional month) on top of the standard monthly fee. This helps you identify slow-moving stock before it becomes a costly liability."
                                },
                                {
                                    question: "Why is this calculator locked to USD?",
                                    answer: "The storage rates used in this calculator (<strong>$0.87, $2.40/cu ft</strong>) are specific to the <strong>Amazon US marketplace</strong>. Amazon UK, India, and EU have entirely different rate cards and use metric measurements (cm). Showing a different currency symbol without changing the underlying math would give you incorrect results."
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