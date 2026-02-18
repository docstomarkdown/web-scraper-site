import { Metadata } from "next"
import { AbandonmentCalculator } from "./_components/AbandonmentCalculator"
import { AbandonmentGuide } from "./_components/AbandonmentGuide"
import { AbandonmentHowToUse } from "./_components/AbandonmentHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Cart Abandonment Rate Calculator | Web Scraper Pro',
    description: 'Calculate your Cart Abandonment Rate to identify lost revenue opportunities and optimize your checkout flow.',
}

export default function CartAbandonmentCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Cart Abandonment Rate Calculator
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Discover the percentage of shoppers who leave without buying and assess the health of your checkout process.
                        </p>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <AbandonmentCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16" id="abandonment-guide">
                    <FadeIn delay={0.2}>
                        <AbandonmentHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <AbandonmentGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a 'good' abandonment rate?",
                                    answer: "While it varies by device and industry, rates under 65-70% are generally considered good. Mobile abandonment rates are typically higher than desktop."
                                },
                                {
                                    question: "How do I reduce cart abandonment?",
                                    answer: "Be transparent about costs upfront, offer guest checkout, minimize form fields, offer multiple payment options, and trust signals (security badges)."
                                },
                                {
                                    question: "Does this affect my SEO?",
                                    answer: "Indirectly, yes. High abandonment might signal a poor user experience (UX), which can negatively impact your search rankings over time."
                                }
                            ]}
                        />
                    </FadeIn>

                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
