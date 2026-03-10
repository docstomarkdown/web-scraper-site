import { Metadata } from "next"
import { ABDurationCalculator } from "./_components/ABDurationCalculator"
import { ABDurationGuide } from "./_components/ABDurationGuide"
import { ABDurationHowToUse } from "./_components/ABDurationHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'A/B Test Duration Calculator | Web Scraper.do',
    description: 'Calculate how long to run your A/B test for statistical significance. Avoid common testing mistakes.',
}
export default function ABDurationCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            A/B Test Duration Calculator
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Determine the required sample size and time to run your split test with confidence.
                        </p>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <ABDurationCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="ab-guide">
                    <FadeIn delay={0.2}>
                        <ABDurationHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ABDurationGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why does a smaller MDE take longer?",
                                    answer: "Detecting a small change (e.g., 1% improvement) is statistically much harder than detecting a large change (e.g., 50% improvement). It requires more data to prove the difference isn't random noise."
                                },
                                {
                                    question: "Can I stop the test as soon as it's significant?",
                                    answer: "No. This is called 'peeking' and increases your false positive rate. You should commit to the calculated sample size/duration before starting."
                                },
                                {
                                    question: "What if it takes too long?",
                                    answer: "If the calculated duration is months, consider testing a bolder change (higher expected MDE) or testing on a page with higher traffic."
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