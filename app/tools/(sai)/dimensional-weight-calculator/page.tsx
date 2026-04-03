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
            question: "How do I measure an irregularly shaped package or poly mailer?",
            answer: "Always measure the furthest points of the package, including any bulges or uneven areas (length, width, and height). If the package is cylindrical like a shipping tube, treat it as a square box matching its diameter.",
        },
        {
            question: "Does dimensional weight apply to all USPS services?",
            answer: "Unlike UPS and FedEx which apply DIM weight to almost all packages, USPS currently only applies dimensional weight to packages exceeding 1 cubic foot (1,728 cubic inches).",
        },
        {
            question: "Is dimensional weight calculated differently for international shipping?",
            answer: "Yes, international shipments typically use the metric system. Carriers often use a standard divisor of 5000 cm³ per kilogram for international air freight. Always verify the exact international divisor with your carrier.",
        },
        {
            question: "Does this calculator work for metric units?",
            answer: "Yes, you can toggle between Imperial (inches/lbs) and Metric (cm/kg) units using the switch at the top of the calculator.",
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