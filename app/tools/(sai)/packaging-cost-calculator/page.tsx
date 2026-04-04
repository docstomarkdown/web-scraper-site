import { Metadata } from "next";
import { PackagingCostCalculator } from "./_components/PackagingCostCalculator";
import { PackagingGuide } from "./_components/PackagingGuide";
import { PackagingHowToUse } from "./_components/PackagingHowToUse";
import { PackagingCostOverview } from "./_components/PackagingCostOverview";
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components";
import { BookOpen } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Packaging Cost Calculator | Calculate Material & Labor Costs Per Unit",
    description: "Calculate the true per-unit cost of your packaging — materials, tape, labels, and labor. Optimize your fulfillment expenses and price products accurately with this free tool.",
};

const faqs = [
    // ── Getting Started ──
    {
        question: "What does 'Cost Per Unit' mean?",
        answer: "It is the total packaging cost for a single order, combining all material costs plus the labor cost for that one package. This is the number you should add to your product's cost of goods when pricing for sale.",
    },
    {
        question: "How is the labor cost calculated?",
        answer: "Labor Cost = (Minutes to Pack ÷ 60) × Hourly Wage. For example, 5 minutes at a $18/hr wage equals $1.50 in labor per package. This applies even if you are packing orders yourself — your time has real monetary value.",
    },



    // ── Costs & Optimization ──
    {
        question: "How can I reduce my packaging costs?",
        answer: "Three proven strategies: (1) Switch rigid boxes to poly mailers for non-fragile items — savings of $0.50–$1.00 per shipment. (2) Buy in bulk — 500 units of tape or labels can cost 30–40% less per unit than small quantities. (3) Right-size your packaging — boxes much larger than the product add dead weight, increasing both material and shipping costs.",
    },
    {
        question: "What is a typical packaging cost range?",
        answer: "For simple e-commerce orders: $0.50–$1.50 for materials alone. Add labor at a standard $15/hr wage and 4 minutes per box, that's another $1.00 — bringing most totals to $1.50–$2.50 per unit. Products requiring special handling, gift wrapping, or extra branding can easily reach $3–$5.",
    },

    // ── Interpretation ──
    {
        question: "Is labor cost worth tracking if I pack orders myself?",
        answer: "Absolutely. If you are spending 10 hours a week packing, that time cannot be spent on sourcing, marketing, or customer service. Tracking your labor cost helps you recognize when outsourcing fulfillment — like a 3PL or Amazon FBA — becomes financially worth it.",
    },
    {
        question: "How does this help me price my products correctly?",
        answer: "Your selling price must cover: product cost + packaging cost + shipping fee + platform fees + desired profit margin. Most sellers who skip packaging costs end up underpricing, which erodes margins invisibly. This calculator gives you the missing piece.",
    },
];

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Packaging Cost Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <PackagingCostCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            icon={BookOpen}
                        />
                        <PackagingCostOverview />
                    </FadeIn>
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