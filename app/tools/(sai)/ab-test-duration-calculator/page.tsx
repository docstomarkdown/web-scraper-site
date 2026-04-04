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

                    {/* FAQ — 5 high-impact questions focusing on A/B testing strategy and common pitfalls */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How long should my A/B test run?",
                                    answer: "Your test should run until it reaches the calculated sample size and duration. However, as a strategic rule of thumb, always run for at least 7 to 14 days. This ensures you account for fluctuations in user behavior across different days of the week (e.g., weekend vs. weekday traffic patterns)."
                                },
                                {
                                    question: "Can I stop the test early if one version looks like a winner?",
                                    answer: "No. Stopping a test early just because it looks like a winner (known as 'peeking') is a major mistake. Results often swing back and forth before data stabilize. You must commit to the full calculated sample size to ensure your result is statistically significant and not just a temporary data spike."
                                },
                                {
                                    question: "Why does low traffic increase my test duration?",
                                    answer: "Statistical significance requires a specific amount of data (sample size). If fewer people visit your page each day, it takes longer to collect enough conversions to confidently say that one version is truly better than the other. More data leads to more certain results."
                                },
                                {
                                    question: "What expected improvement should I enter?",
                                    answer: "This depends on the boldness of your change. If you're testing minor adjustments (like a button color), expect a small uplift (1-3%). For high-impact changes (like a new offer or headline), you might expect 10-20%. Note: Smaller expected improvements require much larger sample sizes and more time to detect."
                                },
                                {
                                    question: "Why can't I run my test for just 1–2 days?",
                                    answer: "Short tests are highly prone to 'false positives' because they don't capture a full cycle of user behavior. Sunday shoppers often behave differently than Tuesday buyers. A 7-day minimum run is the industry standard to ensure your winner holds true across any given day of the week."
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