import { Metadata } from "next"
import { ConversionCalculator } from "./_components/ConversionCalculator"
import { ConversionGuide } from "./_components/ConversionGuide"
import { ConversionHowToUse } from "./_components/ConversionHowToUse"
import { ConversionOverview } from "./_components/ConversionOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"

export const metadata: Metadata = {
    title: 'Conversion Rate Calculator | Web Scraper.do',
    description: 'Calculate your website or campaign conversion rate instantly. Understand how well your traffic is performing.',
}

export default function ConversionCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Conversion Rate Calculator" />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Calculate your website or campaign conversion rate instantly. Understand how well your traffic is performing.
                        </p>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ConversionCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16" id="conversion-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader 
                            title="Tool Essential" 
                            subtitle="Everything you need to know about calculating and analyzing your conversion rate."
                            icon={Lightbulb}
                        />
                        <div className="mt-8">
                            <ConversionOverview />
                        </div>
                    </FadeIn>

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
                                    question: "How do I find my conversion rate in Google Analytics 4 (GA4) or Shopify?",
                                    answer: "In Shopify, go to Analytics > Dashboard and look for 'Online store conversion rate'. In GA4, navigate to Reports > Engagement > Conversions, but ensure you have 'Key Events' (formerly Conversions) properly configured to track purchases or leads."
                                },
                                {
                                    question: "What is considered a 'good' conversion rate?",
                                    answer: "While it depends heavily on your industry, a standard e-commerce conversion rate is roughly 2% to 3%. High-ticket items usually convert closer to 1%, whereas targeted landing pages for free lead generation (like email signups) should aim for 10% to 20%."
                                },
                                {
                                    question: "Why am I getting traffic but no sales or conversions?",
                                    answer: "High traffic with low conversions usually indicates a mismatch between your ad targeting and your landing page, a confusing user interface, unexpected shipping costs at checkout, or a lack of trust signals (like reviews and security badges)."
                                },
                                {
                                    question: "Should I track 'Sessions' or 'Unique Visitors' in the calculator?",
                                    answer: "For e-commerce (where a user can buy multiple times), use 'Sessions' as your traffic metric. For lead generation or one-time signups (where they only convert once), use 'Unique Visitors' for a more accurate rate."
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