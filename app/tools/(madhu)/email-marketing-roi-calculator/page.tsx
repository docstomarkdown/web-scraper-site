import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { EmailROICalculator } from "./_components/EmailROICalculator"
import { EmailROIOverview } from "./_components/EmailROIOverview"
import { EmailROIHowToUse } from "./_components/EmailROIHowToUse"
import { EmailROIGuide } from "./_components/EmailROIGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { BookOpen } from "lucide-react"
export const metadata: Metadata = {
    title: "Email Marketing ROI Calculator | Free Tools",
    description:
        "Calculate the ROI of your email marketing campaigns. Optimize your open rates, click-through rates, and conversion rates to maximize profit.",
}
export default function EmailROICalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                {/* Page Title */}
                <ToolPageTitle title="Email Marketing ROI Calculator" direction="down" duration={0.6} />
                {/* Calculator Tool */}
                <div className="mb-20">
                    <EmailROICalculator />
                </div>
                {/* Supporting Sections */}
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="Tool Essential"
                            icon={BookOpen}
                        />
                        <EmailROIOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <EmailROIHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <EmailROIGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why is the Click Rate based on Opens rather than total sent?",
                                    answer:
                                        "This is known as the Click-to-Open Rate (CTOR). It's a much more accurate measure of your email's content quality, because it only tracks engagement from the people who actually saw what was inside the email.",
                                },
                                {
                                    question: "What are realistic industry benchmarks for email?",
                                    answer:
                                        "Typical benchmarks are an <strong>Open Rate of 20–25%</strong>, a <strong>Click Rate of 2–3%</strong>, and a <strong>Sales Conversion Rate of 2–5%</strong>. Our tool comes pre-filled with these averages so you can instantly gauge your potential.",
                                },
                                {
                                    question: "How is 'Total Revenue' calculated?",
                                    answer:
                                        "Total Revenue multiplies your final <strong>Total Sales Conversions</strong> by your <strong>Average Order Value</strong>. It follows the precise drop-off logic: Subscribers → Emails Opened → Total Clicks → Conversions.",
                                },
                                {
                                    question: "What if my Total Campaign Cost is zero?",
                                    answer:
                                        "If you're using a free email provider and aren't tracking your time expenses, you can simply leave the Campaign Cost at 0. The tool will calculate your Total Revenue purely as Net Profit without requiring an investment figure.",
                                },
                                {
                                    question: "Should I include my own time in 'Campaign Cost'?",
                                    answer:
                                        "Yes, if you want a true ROI. Assigning a dollar value to the hours you spent writing, designing, and setting up the campaign gives you the most accurate reflection of your profitability.",
                                },
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
