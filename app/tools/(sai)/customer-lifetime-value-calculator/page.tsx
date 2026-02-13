import { Metadata } from "next";
import { CLVCalculator } from "./_components/CLVCalculator";
import { CLVHowToUse } from "./_components/CLVHowToUse";
import { CLVGuide } from "./_components/CLVGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Customer Lifetime Value Calculator (LTV)",
    description: "Calculate the total revenue a single customer will generate for your business over their entire relationship with you.",
};

export default function CLVPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            CLV Calculator
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
                                    answer: "A common rule of thumb is a 3:1 ratio. Your CLV should be 3 times your Cost Per Acquisition (CPA). If CLV is $150, aim for a CPA of $50."
                                },
                                {
                                    question: "How do I increase CLV?",
                                    answer: "Increase Average Order Value (Upsells, Bundles), Increase Frequency (Email marketing, New drops), or Increase Lifespan (Subscription models, Loyalty programs)."
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
