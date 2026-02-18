import { Metadata } from "next";
import { CLVCalculator } from "./_components/CLVCalculator";
import { CLVHowToUse } from "./_components/CLVHowToUse";
import { CLVGuide } from "./_components/CLVGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Customer Lifetime Value (CLV) Calculator",
    description: "Calculate the total revenue a single customer will generate for your business over their entire relationship with you.",
};

export default function CLVPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            Customer Lifetime Value (CLV) Calculator
                        </h1>
                    </FadeIn>
                </div>

                <CLVCalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <div id="how-to-use">
                        <FadeIn delay={0.1}>
                            <CLVHowToUse />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <CLVGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How much should I spend to acquire a customer?",
                                    answer: "A healthy Target Ratio is 3:1. This means your Customer Lifetime Value (LTV) Profit should be 3 times your Cost Per Acquisition (CAC). If your LTV Profit is $300, you can spend up to $100 to acquire that customer while staying profitable."
                                },
                                {
                                    question: "What is a 'good' LTV/CAC ratio?",
                                    answer: "A ratio of 1:1 means you're just breaking even on acquisition costs. 3:1 is considered healthy for most businesses, while 5:1 or higher is considered 'Elite' and indicates highly efficient growth."
                                },
                                {
                                    question: "How do I increase my Customer Lifetime Value (CLV)?",
                                    answer: "You can increase CLV by: 1. Raising Average Order Value (upsells/bundling), 2. Improving Purchase Frequency (email marketing/loyalty programs), and 3. Extending Lifespan (better customer support/subscription models)."
                                },
                                {
                                    question: "Why should I include Gross Margin in CLV?",
                                    answer: "Revenue-based CLV can be misleading. Including Gross Margin shows you the actual PROFIT you keep after product and shipping costs, which is what you actually use to pay for marketing and overhead."
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
