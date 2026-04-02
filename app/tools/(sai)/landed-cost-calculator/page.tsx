import { Metadata } from "next";
import { LandedCostCalculator } from "./_components/LandedCostCalculator";
import { LandedCostGuide } from "./_components/LandedCostGuide";
import { LandedCostHowToUse } from "./_components/LandedCostHowToUse";
import { LandedCostOverview } from "./_components/LandedCostOverview";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { ToolPageTitle } from "@/app/tools/_shared/components/ToolPageTitle";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Landed Cost Calculator - Calculate True Import Cost Per Unit | Web Scraper.do",
    description: "Calculate the true all-in cost of importing products. Includes product cost, shipping, customs duties, insurance, and fees. Essential for e-commerce importers.",
};

const faqs = [
    {
        question: "What is a landed cost and why is it important?",
        answer: "Landed cost is the actual total price of getting a product from your supplier into your warehouse. It includes the raw product price plus international shipping, import duties, insurance, and handling fees. It is strictly important because setting your retail price based only on the supplier's initial quote will drastically erode or eliminate your profit margins."
    },
    {
        question: "How do I find my import duty percentage?",
        answer: "To find your import duty rate, you need to look up your product's HS (Harmonized System) code on your official country's customs authority website. You can also ask your freight forwarder or customs broker to confirm the exact duty rate for your specific product category."
    },
    {
        question: "What does the 'Cost Increase' percentage mean?",
        answer: "The Cost Increase percentage shows how much extra cost is added beyond your original product price. For instance, a 30% increase means a product quoted at $10 actually costs you $13 landed. Tracking this metric helps you monitor shipping efficiency over time."
    },
    {
        question: "How can I effectively lower my landed cost?",
        answer: "You can lower your landed cost by negotiating better unit prices with your supplier, consolidating shipments to use cost-effective sea freight instead of expensive air freight, and ordering in higher quantities so flat-rate logistics fees are spread across more units."
    },
    {
        question: "What is the difference between FOB and EXW?",
        answer: "These are shipping terms that impact your calculation. FOB (Free on Board) means your supplier covers the cost of getting the goods to the export port. EXW (Ex Works) means you are responsible for paying all freight costs from the moment it leaves their factory door. Knowing this ensures you don't miss hidden origin costs."
    }
];

export default function LandedCostCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Landed Cost Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <LandedCostCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <LandedCostOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <LandedCostHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <LandedCostGuide />
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