import { Metadata } from "next"
import { StorageFeeCalculator } from "./_components/StorageFeeCalculator"
import { StorageFeeGuide } from "./_components/StorageFeeGuide"
import { StorageFeeHowToUse } from "./_components/StorageFeeHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Amazon Storage Fee Calculator | Web Scraper Pro',
    description: 'Calculate your monthly Amazon FBA inventory storage fees. Plan for Q4 peak season rates and optimize your stock levels.',
}

export default function AmazonStorageFeeCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Amazon Storage Fee Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <StorageFeeCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="storage-guide">
                    <FadeIn delay={0.2}>
                        <StorageFeeHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <StorageFeeGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Did Amazon increase storage fees for 2026?",
                                    answer: "Amazon adjusts fees annually. This calculator uses the most standard recent approximations (e.g., ~$0.87/cu ft for Jan-Sept), but keep an eye on Seller Central for exact updates."
                                },
                                {
                                    question: "How do I calculate Cubic Feet?",
                                    answer: "Multiply Length x Width x Height (in inches) and divide by 1,728. For example, a 12x12x12 box is exactly 1 cubic foot."
                                },
                                {
                                    question: "Does this include Long-Term Storage Fees?",
                                    answer: "No, this calculator estimates the standard monthly inventory storage fee. Aged Inventory Surcharges apply to items stored for more than 180 days and are calculated differently."
                                }
                            ]}
                        />
                    </FadeIn>

                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
