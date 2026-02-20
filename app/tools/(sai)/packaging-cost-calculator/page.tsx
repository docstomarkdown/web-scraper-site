import { Metadata } from "next";
import { PackagingCostCalculator } from "./_components/PackagingCostCalculator";
import { PackagingGuide } from "./_components/PackagingGuide";
import { PackagingHowToUse } from "./_components/PackagingHowToUse";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Packaging Cost Calculator | Calculate Material & Labor Costs",
    description: "Calculate the true cost of your packaging materials and labor per unit. Optimize your shipping expenses with this free calculator.",
};

const faqs = [
    {
        question: "Why should I calculate labor cost?",
        answer: "Time is money. If you spend 5 minutes packing an order, you are not spending that time growing your business. Calculating this cost helps you decide if you should hire help or outsource fulfillment.",
    },
    {
        question: "Do I need to include the cost of the shipping label?",
        answer: "Yes! Thermal labels cost about $0.02 - $0.05 each. While small, over 1000 orders, that's $20-$50 in hidden costs.",
    },
    {
        question: "How can I reduce my packaging costs?",
        answer: "Buy in bulk (e.g., 500 boxes instead of 50), switch to lighter materials like poly mailers to save on shipping weight, and optimize your box size to avoid paying for 'air'.",
    },
    {
        question: "What is 'Branding Cost'?",
        answer: "This includes anything extra you put in the box for customer experience: stickers, thank you cards, tissue paper, crinkle paper, or promotional flyers.",
    },
];

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="max-w-4xl mx-auto text-center mb-12">
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
                            Packaging Cost Calculator
                        </h1>

                    </div>
                </FadeIn>

                <div className="mb-20">
                    <PackagingCostCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PackagingHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <PackagingGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ faqs={faqs} />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}
