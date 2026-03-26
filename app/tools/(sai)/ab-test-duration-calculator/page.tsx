import { Metadata } from "next"
import { ABDurationCalculator } from "./_components/ABDurationCalculator"
import { ABDurationGuide } from "./_components/ABDurationGuide"
import { ABDurationHowToUse } from "./_components/ABDurationHowToUse"
import { ABDurationOverview } from "./_components/ABDurationOverview"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'A/B Test Duration Calculator | Web Scraper.do',
    description: 'Calculate how long to run your A/B test for statistical significance. Avoid common testing mistakes.',
}

export default function ABDurationCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle
                    title="A/B Test Duration Calculator"
                    direction="down"
                    duration={0.6}
                />

                <div className="mb-20">
                    <ABDurationCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-20" id="ab-guide">

                    {/* Tool Overview — ABDurationOverview has its own ToolSectionHeader */}
                    <FadeIn delay={0.2}>
                        <ABDurationOverview />
                    </FadeIn>

                    {/* How to Use — ToolSteps renders its own section header, no duplicate needed */}
                    <FadeIn delay={0.2}>
                        <ABDurationHowToUse />
                    </FadeIn>

                    {/* Tool Guide */}
                    <FadeIn delay={0.2}>
                        <ABDurationGuide />
                    </FadeIn>

                    {/* FAQ — 6 questions matching exact tool inputs & outputs */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why is 'Test Duration' the primary result?",
                                    answer: "The main goal of this calculator is to tell you how long your test must run before the results are statistically trustworthy. That's why Test Duration is highlighted — it's the number you act on. Sample size and daily traffic are shown as supporting context to help you plan the test."
                                },
                                {
                                    question: "What is the Expected Improvement (%) field?",
                                    answer: "This is the minimum lift you want to detect — how much better you expect Version B to perform over Version A. Example: if your current conversion rate is 5% and you expect B to reach 5.5%, that's a 10% relative improvement. Smaller improvements require significantly longer tests and more traffic."
                                },
                                {
                                    question: "What does Traffic Split do?",
                                    answer: "Traffic split controls how visitors are divided between Version A and Version B. A 50/50 split is the most efficient — it means both variants reach their required sample size at the same pace. Unequal splits (e.g. 70/30) slow down the minority variant, making the overall test take longer."
                                },
                                {
                                    question: "Can I stop the test once results look significant?",
                                    answer: "No — this is known as 'peeking' and it inflates your false positive rate significantly. You should commit to the full calculated duration and sample size before the test starts, and only read results after both are reached."
                                },
                                {
                                    question: "What are Confidence Level (95%) and Statistical Power (80%)?",
                                    answer: "Confidence Level (95%) means there is only a 5% chance the result is a false positive — i.e. a 'winner' that isn't actually better. Statistical Power (80%) means the test has an 80% chance of detecting a real improvement if one exists. These are industry-standard settings fixed in this calculator to ensure reliable results."
                                },
                                {
                                    question: "What if my test duration seems too long?",
                                    answer: "If the calculator returns a duration of months, consider: (1) Testing a bolder change — a larger expected improvement needs fewer users; (2) Increasing traffic to the tested page; (3) Narrowing the test to a high-traffic segment. A minimum run of 7 days is always recommended regardless of sample size to capture weekly user behavior patterns."
                                }
                            ]}
                        />
                    </FadeIn>

                    {/* CTA */}
                    <FadeIn delay={0.2}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}