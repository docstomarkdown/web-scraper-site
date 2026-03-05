import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { DaysOfInventoryCalculator } from "./_components/DaysOfInventoryCalculator"
import { DaysOfInventoryHowToUse } from "./_components/DaysOfInventoryHowToUse"
import { DaysOfInventoryGuide } from "./_components/DaysOfInventoryGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Days of Inventory Calculator | Stock Runway Forecast Tool",
    description: "Calculate how many days of inventory you have left based on current stock and sales velocity. Forecast your stock-out date and plan your next restock efficiently.",
}
export default function DaysOfInventoryCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Days of Inventory Remaining Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <DaysOfInventoryCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <DaysOfInventoryHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <DaysOfInventoryGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What do the status indicators (Critical, Warning, Healthy, Overstock) mean?",
                                    answer: "Critical: Less than 7 days remaining—reorder immediately. Warning: 7-21 days—plan your reorder now. Healthy: 21-90 days—optimal inventory range. Overstock: Over 90 days—risk of dead stock and capital tie-up."
                                },
                                {
                                    question: "Should I use Daily, Weekly, or Monthly velocity tracking?",
                                    answer: "Use the timeframe that matches your reporting system. However, Daily velocity gives the most accurate runway calculations. If you track monthly, the calculator converts it to daily (dividing by 30), but daily tracking captures demand variability better."
                                },
                                {
                                    question: "What is 'Net Useable Runway' and why does it matter?",
                                    answer: "Net Useable Runway shows how many days of stock you have BEFORE hitting your safety buffer. This is your actionable timeline—when this hits your lead time, you must reorder or risk stockouts."
                                },
                                {
                                    question: "How much safety stock should I keep?",
                                    answer: "A common rule: Safety Stock = (Max Daily Sales - Avg Daily Sales) × Lead Time Days. For example, if you average 50 units/day but can spike to 80, with a 14-day lead time, keep (80-50) × 14 = 420 units as buffer."
                                },
                                {
                                    question: "Why isn't my on-order inventory counted?",
                                    answer: "This calculator shows your TODAY runway based on physical stock. Incoming orders should be tracked separately—if your stock-out date is Feb 20 and your shipment arrives Feb 15, you're safe. If it arrives Feb 25, you'll stockout for 5 days."
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