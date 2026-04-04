import { Metadata } from "next";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { ToolFAQ } from "@/app/tools/_shared/components/ToolFAQ";
import { ToolPageTitle } from "@/app/tools/_shared/components/ToolPageTitle";
import { CTA } from "@/components/sections/CTA";
import { DimWeightCalculator } from "./_components/DimWeightCalculator";
import { DimWeightHowToUse } from "./_components/DimWeightHowToUse";
import { DimWeightGuide } from "./_components/DimWeightGuide";
import { DimWeightOverview } from "./_components/DimWeightOverview";

export const metadata: Metadata = {
    title: "Dimensional Weight Calculator | Web Scraper.do",
    description: "Calculate dimensional weight for shipping with our free DIM weight calculator. Compare actual vs. billable weight for UPS, FedEx, and DHL.",
};

export default function Page() {
    const faqs = [
        {
            question: "What is a DIM divisor and why is it used?",
            answer: "A DIM divisor is a number carriers use to convert package volume into a billable weight. It ensures large, lightweight packages are charged fairly based on the space they occupy.",
        },
        {
            question: "Why do carriers charge based on dimensional weight?",
            answer: "Because large boxes take up more room in trucks and planes even if they weigh very little. DIM weight helps carriers price shipments based on both weight and space used.",
        },
        {
            question: "How do I measure an irregular or poly mailer package?",
            answer: "Measure the longest points of length, width, and height, including bulges or uneven areas. For tubes or cylinders, use the diameter as both width and height.",
        },
        {
            question: "Will I be charged based on actual weight or dimensional weight?",
            answer: "Carriers always charge you based on whichever is higher — actual weight or DIM weight. This calculator highlights the billable weight instantly so you know what to expect.",
        },
        {
            question: "Does this calculator work with both inches/lbs and cm/kg?",
            answer: "Yes, you can switch between Imperial and Metric units anytime. The tool automatically recalculates DIM weight using the selected measurement system.",
        },
    ];

    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Dimensional Weight Calculator" direction="down" duration={0.6} />
                
                <div className="mb-20">
                    <FadeIn delay={0.1}>
                        <DimWeightCalculator />
                    </FadeIn>
                </div>
                
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <DimWeightOverview />
                    </FadeIn>
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