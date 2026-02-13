import { Metadata } from "next";
import { PayPalFeeCalculator } from "./_components/PayPalFeeCalculator";
import { PayPalHowToUse } from "./_components/PayPalHowToUse";
import { PayPalGuide } from "./_components/PayPalGuide";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "PayPal Fee Calculator - Calculate Transaction Fees",
    description: "Instantly calculate PayPal merchant fees for domestic and international transactions. Find out exactly how much you'll receive.",
};

export default function PayPalCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl mb-4">
                            PayPal Fee Calculator
                        </h1>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Stop guessing your profits. Calculate exact PayPal fees for invoices, sales, and transfers to ensure you price your products correctly.
                        </p>
                    </FadeIn>
                </div>

                <PayPalFeeCalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">
                    <div id="how-to-use">
                        <FadeIn delay={0.1}>
                            <PayPalHowToUse />
                        </FadeIn>
                    </div>

                    <FadeIn delay={0.2}>
                        <PayPalGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Did PayPal fees change in 2024?",
                                    answer: "PayPal updates fees periodically. Standard domestic rate remains around 2.9% + fixed fee, but check their official site for the latest policy updates."
                                },
                                {
                                    question: "What is the 'Friends & Family' rate?",
                                    answer: "Personal transfers using 'Friends & Family' are usually free if funded by bank/balance, but cannot be used for selling goods or services (no buyer protection)."
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
