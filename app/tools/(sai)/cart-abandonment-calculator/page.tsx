import { Metadata } from "next"
import { AbandonmentCalculator } from "./_components/AbandonmentCalculator"
import { AbandonmentGuide } from "./_components/AbandonmentGuide"
import { AbandonmentHowToUse } from "./_components/AbandonmentHowToUse"
import { AbandonmentOverview } from "./_components/AbandonmentOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"
export const metadata: Metadata = {
    title: 'Cart Abandonment Rate Calculator | Web Scraper.do',
    description: 'Calculate your Cart Abandonment Rate to identify lost revenue opportunities and optimize your checkout flow.',
}
export default function CartAbandonmentCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cart Abandonment Rate Calculator" />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
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
                        <ToolSectionHeader 
                            title="Tool Essential" 
                            subtitle="Everything you need to know about calculating and analyzing your cart abandonment rate."
                            icon={Lightbulb}
                        />
                        <div className="mt-8">
                            <AbandonmentOverview />
                        </div>
                    </FadeIn>
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
                                    question: "What exactly is cart abandonment?",
                                    answer: "Cart abandonment is when a shopper adds an item to their online cart but leaves the website before completing the purchase. Our calculator directly measures this as a percentage by comparing total carts created to completed transactions."
                                },
                                {
                                    question: "What is a 'good' cart abandonment rate?",
                                    answer: "A 'good' cart abandonment rate sits securely under <strong>60%</strong>. However, the global e-commerce average is nearly <strong>70%</strong>. Industries like travel and finance tend to have even higher abandonment rates naturally due to browsing behaviors."
                                },
                                {
                                    question: "Why do so many users abandon their checkout?",
                                    answer: "The primary culprit is usually <strong>hidden costs</strong> such as taxes or steep shipping fees revealed at the final step. Other massive friction points include requiring users to create an account instead of providing 'guest checkout', complex form validations, or a confusing UI."
                                },
                                {
                                    question: "How do I fix a high abandonment rate?",
                                    answer: "You should immediately optimize three things: <strong>transparency, speed, and trust</strong>. Show shipping costs early, offer a streamlined guest checkout option, minimize mandatory form fields, display security badges clearly, and ensure page-loads are incredibly fast especially on mobile."
                                },
                                {
                                    question: "Does cart abandonment negative impact my SEO?",
                                    answer: "No, search engines like Google cannot see your specific checkout drop-off rate. However, extreme abandonment might indicate terrible overall page performance, slow speeds, or poor UI—and <i>those</i> broader user experience (UX) signals do heavily impact rankings."
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