import { Metadata } from "next";
import { FadeIn } from "@/app/tools/_shared/components/FadeIn";
import { ToolFAQ } from "@/app/tools/_shared/components/ToolFAQ";
import { ToolPageTitle } from "@/app/tools/_shared/components/ToolPageTitle";
import { CTA } from "@/components/sections/CTA";
import { MOQCalculator } from "./_components/MOQCalculator";
import { MOQHowToUse } from "./_components/MOQHowToUse";
import { MOQGuide } from "./_components/MOQGuide";
import { MOQOverview } from "./_components/MOQOverview";

export const metadata: Metadata = {
    title: "Minimum Order Quantity (MOQ) Cost Calculator | Web Scraper.do",
    description:
        "Calculate the total investment required for Minimum Order Quantities (MOQ), landed cost per unit, and inventory risk.",
};

const faqs = [
    {
        question: "How is 'Landed Cost per Unit' different from 'Cost per Unit'?",
        answer:
            "Cost per Unit is the raw price your supplier charges for manufacturing one item. The Landed Cost per Unit is the true, final price you pay to get the product to your warehouse, factoring in shipping, freight, and other import costs divided evenly across the entire order.",
    },
    {
        question: "What should I include in 'Other Costs'?",
        answer:
            "You should include any extra fees tied to the batch purchase that aren't the physical products or shipping. Common examples include customs duties, tariffs, third-party inspection fees, and bank wire or transaction charges.",
    },
    {
        question: "Should I order a larger MOQ just to get a cheaper unit price?",
        answer:
            "Not always. While ordering a larger batch shrinks your cost per unit, it drastically increases your total upfront investment and storage times. If your monthly sales velocity is low, long-term storage fees and tied-up cash will quickly erase any money saved on the bulk discount.",
    },
    {
        question: "What is a 'healthy' Inventory Coverage duration?",
        answer:
            "For most e-commerce sellers, holding 3 to 4 months of inventory is considered safe. It gives you enough buffer for peak seasons or shipping delays without absorbing excessive warehouse storage fees. Holding stock that covers over 6 months creates higher cash-flow risks.",
    },
];

export default function MOQValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Minimum Order Quantity (MOQ) Cost Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <MOQCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <MOQOverview />
                    </FadeIn>
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
