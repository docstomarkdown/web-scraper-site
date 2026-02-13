import { Metadata } from "next";
import { AdBudgetCalculator } from "./_components/AdBudgetCalculator";
import { AdBudgetHowToUse } from "./_components/AdBudgetHowToUse";
import { AdBudgetGuide } from "./_components/AdBudgetGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Ad Spend Budget Planner - Calculate Marketing Budget",
    description: "Reverse engineer your marketing budget based on your revenue goals and target ROAS.",
};

export default function AdBudgetPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            Ad Spend Budget Planner
                        </h1>
                    </FadeIn>
                </div>

                <AdBudgetCalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <div id="how-to-use">
                        <FadeIn delay={0.1}>
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
                                    question: "What should my Target ROAS be?",
                                    answer: "If you're breaking even at 2.0, aim for 3.0 or 4.0 for profitability. Check your ad account's historical average."
                                },
                                {
                                    question: "Why calculate a daily budget?",
                                    answer: "Ad platforms like Meta and Google ask for Daily Budgets. Knowing this number prevents you from overspending early in the month."
                                },
                                {
                                    question: "Does this include agency fees?",
                                    answer: "No, this calculator only determines your media buying budget (the money paid directly to ad platforms)."
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
