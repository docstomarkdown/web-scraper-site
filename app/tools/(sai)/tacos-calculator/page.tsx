import { Metadata } from "next";
import { TACoSCalculator } from "./_components/TACoSCalculator";
import { TACoSHowToUse } from "./_components/TACoSHowToUse";
import { TACoSGuide } from "./_components/TACoSGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";
export const metadata: Metadata = {
    title: "Total Advertising Cost of Sales (TACoS) Calculator",
    description: "Calculate your Total Advertising Cost of Sales (TACoS) to measure the long-term health of your e-commerce brand.",
};
export default function TACoSPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-[42px] mb-4">
                            Total Advertising Cost of Sales (TACoS) Calculator
                        </h1>
                    </FadeIn>
                </div>
                <TACoSCalculator />
                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <div id="how-to-use">
                        <FadeIn delay={0.1}>
                            <TACoSHowToUse />
                        </FadeIn>
                    </div>
                    <FadeIn delay={0.2}>
                        <TACoSGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good Total Advertising Cost of Sales (TACoS)?",
                                    answer: "Healthy Total Advertising Cost of Sales (TACoS) depends on your business stage. For mature brands, <strong>10-15%</strong> is often considered healthy. For new launches, it might spike to <strong>20-30%</strong> as you invest in growth."
                                },
                                {
                                    question: "What if my Total Advertising Cost of Sales (TACoS) is rising?",
                                    answer: "A rising Total Advertising Cost of Sales (TACoS) means your ad spend is growing faster than your total revenue. This could indicate that your ads are becoming less effective or your organic sales are dropping."
                                },
                                {
                                    question: "How often should I check Total Advertising Cost of Sales (TACoS)?",
                                    answer: "Weekly and monthly monitoring is best. Daily fluctuations are normal and might not reflect true trends."
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