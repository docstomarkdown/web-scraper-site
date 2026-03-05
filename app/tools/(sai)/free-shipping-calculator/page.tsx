import { Metadata } from "next"
import { FreeShippingCalculator } from "./_components/FreeShippingCalculator"
import { FreeShippingGuide } from "./_components/FreeShippingGuide"
import { FreeShippingHowToUse } from "./_components/FreeShippingHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: 'Free Shipping Threshold Calculator | Web Scraper Pro',
    description: 'Calculate the optimal free shipping threshold for your e-commerce store. Balance conversion uplift with profit margins effectively.',
}
export default function FreeShippingCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Free Shipping Threshold Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <FreeShippingCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <FreeShippingHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <FreeShippingGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Did you know Free Shipping increases AOV?",
                                    answer: "By setting a threshold slightly above your average order value (e.g., Free Shipping on orders over $50 when AOV is $42), you encourage customers to add more items to their cart to qualify."
                                },
                                {
                                    question: "How do I calculate the Break-Even Point?",
                                    answer: "The calculator does this for you! It determines how much your sales need to increase to cover the cost of shipping without losing profit."
                                },
                                {
                                    question: "Should I offer Free Shipping on everything?",
                                    answer: "Not necessarily. Heavy or low-margin items might destroy your profitability. Using a threshold protects your margins while still offering a perk."
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