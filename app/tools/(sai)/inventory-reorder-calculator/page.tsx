import { Metadata } from "next"
import { ReorderCalculator } from "./_components/ReorderCalculator"
import { ReorderGuide } from "./_components/ReorderGuide"
import { ReorderHowToUse } from "./_components/ReorderHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: 'Inventory Reorder Point Calculator | Web Scraper Pro',
    description: 'Calculate exactly when to reorder stock. Prevent stockouts and overstocking with our scientific Reorder Point calculator.',
}

export default function ReorderCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Inventory Reorder Point Calculator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <ReorderCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <ReorderHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ReorderGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a Reorder Point (ROP)?",
                                    answer: "The Reorder Point is the specific level of inventory at which a new order must be placed to replenish stock before it runs out. It accounts for the time it takes for the order to arrive (Lead Time)."
                                },
                                {
                                    question: "How much Safety Stock do I need?",
                                    answer: "This depends on the variability of your sales and supply chain reliability. A common rule of thumb is to hold 7-14 days of safety stock for best-sellers to weather unexpected delays."
                                },
                                {
                                    question: "Does this work for all products?",
                                    answer: "Yes, this formula works for any physical product. However, for seasonal items, you should adjust your 'Average Daily Sales' to reflect the anticipated seasonal demand."
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
