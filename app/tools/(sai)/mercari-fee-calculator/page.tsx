import { Metadata } from "next";
import { MercariFeeCalculator } from "./_components/MercariFeeCalculator";
import { MercariFeeHowToUse } from "./_components/MercariFeeHowToUse";
import { MercariFeeGuide } from "./_components/MercariFeeGuide";
import { MercariFeeOverview } from "./_components/MercariFeeOverview";
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components";
import { BookOpen } from "lucide-react";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Mercari Fee Calculator - Calculate Your True Profit After Fees",
    description: "Calculate your exact Mercari profit after the 10% selling fee and 2.9% + $0.50 payment processing fee. Plan pricing and avoid hidden losses before you list.",
};

const faqs = [
    // ── Getting Started ──
    {
        question: "What do I need to enter to calculate my profit?",
        answer: "At minimum, enter your Sale Price and Item Cost. The calculator will instantly show your net profit after Mercari's 10% selling fee and the 2.9% + $0.50 payment processing fee. Adding shipping costs makes the result even more accurate."
    },
    {
        question: "Does Mercari charge a listing fee?",
        answer: "No. Listing items on Mercari is completely free. You only pay fees after your item successfully sells. There are no upfront charges for creating a listing."
    },
    {
        question: "What is Mercari's payment processing fee?",
        answer: "Mercari charges 2.9% + $0.50 on the total amount the buyer pays (item price + any buyer-paid shipping). This is separate from the 10% selling fee. Both are automatically calculated in this tool."
    },

    // ── Fees & Costs ──
    {
        question: "Should I include shipping in my cost inputs?",
        answer: "Yes — but only if you (the seller) are paying for the shipping label. If you select 'Buyer Pays Shipping' in your Mercari listing, the buyer covers the label cost and you should leave the Shipping Cost field blank."
    },
    {
        question: "What counts as 'Other Expenses'?",
        answer: "Anything you spend to fulfill the sale beyond the item purchase and shipping: packaging tape, bubble wrap, boxes, poly mailers, or other supplies. These are real costs that reduce your margin."
    },
    {
        question: "Are there fees to withdraw my earnings?",
        answer: "Standard Direct Deposit to your bank is free for balances over $10, with a 1–3 business day processing time. Instant Pay (same-day transfer) costs $3 per transfer."
    },

    // ── Pricing & Strategy ──
    {
        question: "How do I price an item to hit a specific profit target?",
        answer: "Work backwards using this formula: Minimum List Price = (Item Cost + Shipping + Other Costs + Desired Profit) ÷ 0.869. The 0.869 divisor accounts for the ~13.1% combined fee. Enter the result as your Sale Price and verify in the calculator."
    },
    {
        question: "What is a good profit margin on Mercari?",
        answer: "After covering all fees (roughly 12–14% of the sale price combined), most flippers aim for a 20–40% net margin on the listing price. Below 15% net margin, consider whether the listing volume justifies the effort."
    },
    {
        question: "Does the Batch Profit feature help with bulk selling?",
        answer: "Yes. Enter the Items Sold quantity to instantly see total batch profit across multiple identical units. This is useful for resellers pricing bundles or identical inventory lots."
    },
];

export default function MercariFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Mercari Fee Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <MercariFeeCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="tool-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            icon={BookOpen}
                        />
                        <MercariFeeOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MercariFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MercariFeeGuide />
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