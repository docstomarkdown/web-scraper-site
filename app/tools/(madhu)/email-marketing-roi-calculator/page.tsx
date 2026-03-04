import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { EmailROICalculator } from "./_components/EmailROICalculator"
import { EmailROIHowToUse } from "./_components/EmailROIHowToUse"
import { EmailROIGuide } from "./_components/EmailROIGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
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
                <div className="text-center mb-12">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Email Marketing ROI Calculator
                        </h1>
                    </FadeIn>
                </div>
                {/* Calculator Tool */}
                <div className="mb-20">
                    <EmailROICalculator />
                </div>
                {/* Supporting Sections */}
                <div className="max-w-4xl mx-auto space-y-16">
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
                                    question: "What is 'Email CTR (on Opens)' and how is it different?",
                                    answer:
                                        "Also known as CTOR (Click-to-Open Rate), <strong>Email CTR (on Opens)</strong> measures the effectiveness of your email content. It is the percentage of people who clicked a link <em>after</em> opening the email. A high CTR on opens shows that your message and offer are compelling.",
                                },
                                {
                                    question: "What are realistic industry benchmarks for email?",
                                    answer:
                                        "While it varies by industry, typical benchmarks are an <strong>Open Rate of 20–25%</strong>, an <strong>Email CTR of 2–3%</strong>, and a <strong>Post-Click Conversion Rate of 2–5%</strong>. Our tool comes pre-filled with these averages to help you see potential results immediately.",
                                },
                                {
                                    question: "How is 'Total Revenue' calculated?",
                                    answer:
                                        "Revenue is calculated by taking your final <strong>Conversions</strong> counts and multiplying by the <strong>Average Order Value (AOV)</strong>. Conversions are derived from the funnel: Subscribers → Opens → Clicks → Sales.",
                                },
                                {
                                    question: "Why should I track CPA/CAC in email?",
                                    answer:
                                        "<strong>Cost Per Acquisition (CPA)</strong> tells you if your campaign is sustainable. If your CPA is $20 but each customer only brings in $15 in profit, you are losing money. Email has the highest ROI of any channel, often exceeding 4000% when done right.",
                                },
                                {
                                    question: "Should I include my own time in 'Campaign Cost'?",
                                    answer:
                                        "Yes! For an accurate ROI, you should assign a dollar value to the hours you spent writing, designing, and setting up the campaign. This helps you understand if your time is being invested profitably.",
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