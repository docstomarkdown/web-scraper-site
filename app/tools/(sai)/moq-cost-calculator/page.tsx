import { Metadata } from "next";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { ToolFAQ } from "@/app/tools/_shared/components/ToolFAQ";
import { CTA } from "@/components/sections/CTA";
import { MOQCalculator } from "./_components/MOQCalculator";
import { MOQHowToUse } from "./_components/MOQHowToUse";
import { MOQGuide } from "./_components/MOQGuide";

export const metadata: Metadata = {
    title: "MOQ Cost Calculator | Web Scraper Pro",
    description:
        "Calculate the total investment required for Minimum Order Quantities (MOQ), effective cost per unit, and inventory risk.",
};

const faqs = [
    {
        question: "What is MOQ in manufacturing?",
        answer:
            "MOQ stands for Minimum Order Quantity. It is the minimum number of units a supplier requires you to purchase in a single order to make their production run profitable.",
    },
    {
        question: "How do I calculate the true cost per unit?",
        answer:
            "Your true cost per unit isn't just the manufacturing price. It includes shipping, customs duties, inspection fees, and bank transaction charges. This calculator sums all those up and divides by the MOQ to give you the 'Landed Cost'.",
    },
    {
        question: "What is a 'healthy' inventory coverage?",
        answer:
            "Generally, 3-4 months of inventory is considered healthy for most e-commerce businesses. Anything above 6 months is risky because it ties up cash and incurs long-term storage fees. Anything under 1 month risks stockouts.",
    },
    {
        question: "Can I negotiate MOQ?",
        answer:
            "Yes! Suppliers often set high MOQs for new clients but are willing to lower them for a 'test order' if you negotiate. You might pay a slightly higher unit price, but it reduces your upfront risk significantly.",
    },
];

export default function MOQValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="max-w-3xl mx-auto text-center mb-10">
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            MOQ Cost Calculator
                        </h1>

                    </div>
                </FadeIn>

                <div className="mb-20">
                    <MOQCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MOQHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MOQGuide />
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
