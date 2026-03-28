import { Metadata } from "next"
import { CACCalculator } from "./_components/CACCalculator"
import { CACGuide } from "./_components/CACGuide"
import { CACHowToUse } from "./_components/CACHowToUse"
import { CACOverview } from "./_components/CACOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Target } from "lucide-react"

export const metadata: Metadata = {
    title: 'Customer Acquisition Cost (CAC) Calculator | Web Scraper.do',
    description: 'Calculate your Customer Acquisition Cost (CAC) instantly. Determine how much you spend to acquire a new customer and optimize your marketing budget.',
}

export default function CACCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <ToolPageTitle
                            title="Customer Acquisition Cost (CAC) Calculator"
                        />
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <CACCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="cac-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Understand how tracking your Customer Acquisition Cost helps you evaluate and optimize your marketing strategies."
                            icon={Target}
                        />
                        <CACOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CACHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CACGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is Customer Acquisition Cost (CAC)?",
                                    answer: "CAC is the total cost your business spends to acquire a single new customer. It includes all sales and marketing expenses — ad spend, salaries, commissions, tools, and overhead — divided by the number of new customers won in the same period."
                                },
                                {
                                    question: "What is the formula for CAC?",
                                    answer: "CAC = Total Sales & Marketing Expenses ÷ Number of New Customers Acquired. For example, if you spent $10,000 on marketing and acquired 100 new customers, your CAC is $100."
                                },
                                {
                                    question: "What is the difference between CAC and CPA?",
                                    answer: "CPA (Cost Per Action) measures the cost of a single conversion on a specific platform or campaign. CAC is a broader, fully loaded business metric that accounts for all acquisition-related costs across every channel, including salaries and tools."
                                },
                                {
                                    question: "What is a good CAC for my business?",
                                    answer: "A good CAC depends on your industry and customer lifetime value (LTV). The golden rule is an LTV:CAC ratio of 3:1 — meaning each customer should generate at least 3x what it costs to acquire them. If your ratio is 1:1, you're breaking even; above 5:1, you may be under-investing in growth."
                                },
                                {
                                    question: "How can I reduce my CAC?",
                                    answer: "Focus on improving conversion rates, optimizing ad targeting, leveraging organic channels (SEO, content, referrals), increasing retention to boost LTV, and automating repetitive marketing tasks to cut overhead costs."
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