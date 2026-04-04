import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { LeadTimeCalculator } from "./_components/LeadTimeCalculator"
import { LeadTimeHowToUse } from "./_components/LeadTimeHowToUse"
import { LeadTimeGuide } from "./_components/LeadTimeGuide"
import { LeadTimeOverview } from "./_components/LeadTimeOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
export const metadata: Metadata = {
    title: "Lead Time Calculator - Production to Delivery Estimator",
    description: "Calculate total inventory lead time including production, shipping, customs, and buffers.",
}
export default function LeadTimeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Lead Time Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <LeadTimeCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <LeadTimeOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <LeadTimeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <LeadTimeGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why does my actual lead time often differ from what my supplier promises?",
                                    answer: "Suppliers often give you the 'best-case' production time. Real lead time includes your own order processing time, shipping transit, customs clearance, and local delivery. We recommend tracking your last 3 shipments to find your true average."
                                },
                                {
                                    question: "What should I include in 'Supplier Time'?",
                                    answer: "Include the total time from purchase order submission to the moment goods are ready for pickup. This should account for raw material sourcing, manufacturing, and factory-level quality inspections."
                                },
                                {
                                    question: "How much 'Safety Buffer' is recommended?",
                                    answer: "Most supply chain experts recommend a 15-20% buffer. If your total production and shipping time is 50 days, adding a 10-day buffer helps account for port congestion or customs delays."
                                },
                                {
                                    question: "Does this account for national holidays?",
                                    answer: "This calculator uses total calendar days. When planning, you should manually increase your 'Safety Buffer' if your timeline overlaps with major events like Chinese New Year or peak holiday seasons."
                                },
                                {
                                    question: "How can I reduce my lead time?",
                                    answer: "Common strategies include sourcing from local suppliers to reduce transit time, consolidating shipments, automating order processing, and choosing faster shipping modes like air freight over ocean freight for urgent stock."
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
