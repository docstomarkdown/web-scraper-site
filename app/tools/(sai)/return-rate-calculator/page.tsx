import { Metadata } from "next";
import { ReturnRateCalculator } from "./_components/ReturnRateCalculator";
import { ReturnRateHowToUse } from "./_components/ReturnRateHowToUse";
import { ReturnRateGuide } from "./_components/ReturnRateGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Return Rate Calculator - E-commerce Refurn Metrics",
    description: "Calculate your product return rate percentage to identify quality issues or description mismatches.",
};

export default function ReturnRatePage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            Return Rate Calculator
                        </h1>
                    </FadeIn>
                </div>

                <ReturnRateCalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <div id="how-to-use">
                        <FadeIn delay={0.1}>
                            <ReturnRateHowToUse />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <ReturnRateGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Are returns bad?",
                                    answer: "Not always. A flexible return policy increases conversion rates. The goal is to balance conversion lift against return costs."
                                },
                                {
                                    question: "How can I lower my return rate?",
                                    answer: "Better product photos, detailed sizing charts, and accurate descriptions are the most effective ways to reduce 'item not described' returns."
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
