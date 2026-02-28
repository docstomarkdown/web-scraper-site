import { Metadata } from "next"
import { ConversionCalculator } from "./_components/ConversionCalculator"
import { ConversionGuide } from "./_components/ConversionGuide"
import { ConversionHowToUse } from "./_components/ConversionHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Conversion Rate Calculator | Web Scraper Pro',
    description: 'Calculate your website or campaign conversion rate instantly. Understand how well your traffic is performing.',
}

export default function ConversionCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Conversion Rate Calculator
                        </h1>

                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ConversionCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="conversion-guide">
                    <FadeIn delay={0.2}>
                        <ConversionHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ConversionGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good conversion rate?",
                                    answer: "Detailed benchmarks depend on the industry, but 2-5% is generally considered a good standard for e-commerce. Landing pages for lead generation can often see 10% or higher."
                                },
                                {
                                    question: "How do I improve my conversion rate?",
                                    answer: "Optimize your page load speed, improve your call-to-action (CTA), build trust with reviews and guarantees, and ensure your traffic source matches your offer."
                                },
                                {
                                    question: "Should I track sessions or visitors?",
                                    answer: "Typically, 'Sessions' is the standard denominator for e-conversion rates, as a user can have multiple sessions and convert in each one. However, for lead generation (one-time action), 'Unique Visitors' is often more accurate."
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
