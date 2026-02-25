import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { LeadTimeCalculator } from "./_components/LeadTimeCalculator"
import { LeadTimeHowToUse } from "./_components/LeadTimeHowToUse"
import { LeadTimeGuide } from "./_components/LeadTimeGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Lead Time Calculator - Production to Delivery Estimator",
    description: "Calculate total inventory lead time including production, shipping, customs, and buffers. Plan your restock cycles with precision.",
}

export default function LeadTimeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            Lead Time Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <LeadTimeCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
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
                                    question: "What is lead time in supply chain?",
                                    answer: "Lead time is the total amount of time that elapses between the moment a customer places an order and the moment they receive the product. In manufacturing, it's the time from the 'Start Production' signal to 'Warehouse Delivery'."
                                },
                                {
                                    question: "How do I calculate my reorder point (ROP)?",
                                    answer: "Use the formula: (Daily Sales × Lead Time) + Safety Stock. If you sell 10 units/day and lead time is 45 days, you need to reorder when you have at least 450 units left."
                                },
                                {
                                    question: "Does this calculator account for weekends?",
                                    answer: "Production and shipping often move on weekends, but customs and local courier deliveries might not. This calculator uses total calendar days to give a realistic conservative estimate."
                                },
                                {
                                    question: "What is the difference between Supplier Time and Total Lead Time?",
                                    answer: "Supplier Time only covers manufacturing and processing. Total Lead Time (which this tool calculates) includes Supplier Time, Shipping Time, and the Safety Buffer for final delivery."
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
