import { Metadata } from "next";
import { AdBudgetCalculator } from "./_components/AdBudgetCalculator";
import { AdBudgetHowToUse } from "./_components/AdBudgetHowToUse";
import { AdBudgetGuide } from "./_components/AdBudgetGuide";
import { AdBudgetOverview } from "./_components/AdBudgetOverview";
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components";
import { BookOpen } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Ad Spend Budget Calculator - Calculate Marketing Budget",
    description: "Reverse engineer your marketing budget based on your revenue goals and target ROAS.",
};

export default function AdBudgetPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Ad Spend Budget Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <AdBudgetCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Know exactly what you need to spend before you launch. Our calculator reverse-engineers your ad budget so you can plan for real results, not guesswork."
                            icon={BookOpen}
                        />
                        <AdBudgetOverview />
                    </FadeIn>

                    <div id="how-to-use">
                        <FadeIn delay={0.2}>
                            <AdBudgetHowToUse />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <AdBudgetGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why calculate a daily budget?",
                                    answer: "Ad platforms like Meta and Google ask for Daily Budgets. Knowing this number prevents you from overspending early in the month and ensures you have capital spread across all 30 days."
                                },
                                {
                                    question: "What should my Target Return on Ad Spend (ROAS) be?",
                                    answer: "If you're breaking even at a 2.0 ROAS, you should aim for a 3.0 or 4.0 for solid profitability. Check your ad account's historical average to set a realistic baseline."
                                },
                                {
                                    question: "Does this calculator include agency fees or software costs?",
                                    answer: "No, this calculator strictly determines your media buying budget (the exact money paid directly to ad platforms for impressions and clicks)."
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
