import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { ToolFAQ } from "@/app/tools/_shared/components/ToolFAQ";
import { CTA } from "@/components/sections/CTA";
import { DimWeightCalculator } from "./_components/DimWeightCalculator";
import { DimWeightHowToUse } from "./_components/DimWeightHowToUse";
import { DimWeightGuide } from "./_components/DimWeightGuide";
import { Metadata } from "next";
export const metadata: Metadata = {
    title: "Dimensional Weight Calculator | Web Scraper Pro",
    description: "Calculate dimensional weight for shipping with our free DIM weight calculator. Compare actual vs. billable weight for UPS, FedEx, and DHL.",
};
export default function Page() {
    const faqs = [
        {
            question: "What is Dimensional Weight?",
            answer: "Dimensional weight (DIM weight) is a pricing technique used by carriers to account for the amount of space a package occupies in relation to its actual weight. If a package is large but light, carriers charge based on its size rather than its weight.",
        },
        {
            question: "What DIM divisor should I use?",
            answer: "For most domestic shipments via UPS and FedEx (Daily Rates), use 139. for Retail Grounds or USPS, use 166. International shipments often use 139 as well, but always verify with your specific carrier contract.",
        },
        {
            question: "How do I lower my shipping costs?",
            answer: "To reduce shipping costs, use the smallest possible box that fits your item safely. Avoid 'shipping air' by cutting down boxes or using poly mailers for non-fragile items.",
        },
        {
            question: "Does this calculator work for metric units?",
            answer: "Yes, you can toggle between Imperial (inches/lbs) and Metric (cm/kg) units using the switch at the top of the calculator.",
        },
    ];
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4">
                            Dimensional Weight Calculator
                        </h1>
                    </div>
                </FadeIn>
                <FadeIn delay={0.1}>
                    <DimWeightCalculator />
                </FadeIn>
                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <FadeIn delay={0.2}>
                        <DimWeightHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <DimWeightGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ faqs={faqs} />
                    </FadeIn>
                </div>
                <FadeIn delay={0.5}>
                    <div className="mt-20">
                        <CTA />
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}