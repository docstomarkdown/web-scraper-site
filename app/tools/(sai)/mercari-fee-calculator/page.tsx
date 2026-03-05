import { Metadata } from "next";
import { MercariFeeCalculator } from "./_components/MercariFeeCalculator";
import { MercariFeeHowToUse } from "./_components/MercariFeeHowToUse";
import { MercariFeeGuide } from "./_components/MercariFeeGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";
export const metadata: Metadata = {
    title: "Mercari Fee Calculator - Calculate Profit & Selling Fees",
    description: "Calculate your Mercari selling fees and net profit. Plan your pricing with our 10% fee and payment processing calculator.",
};
export default function MercariFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-[42px] mb-4">
                            Mercari Fee Calculator
                        </h1>
                    </FadeIn>
                </div>
                <MercariFeeCalculator />
                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <FadeIn delay={0.1}>
                        <MercariFeeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <MercariFeeGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Does Mercari charge a listing fee?",
                                    answer: "No, Mercari is completely free to list. You only pay fees once your item successfully sells."
                                },
                                {
                                    question: "What is the payment processing fee?",
                                    answer: "Mercari charges 2.9% + $0.50 of the final price (item price + shipping) to process the buyer's payment."
                                },
                                {
                                    question: "Are there fees to withdraw my money?",
                                    answer: "Direct Deposit to your bank is free for amounts over $10. Instant Pay costs $3 per transfer."
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