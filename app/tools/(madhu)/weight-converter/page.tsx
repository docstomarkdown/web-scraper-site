import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { WeightConverter } from "./_components/WeightConverter"
import { WeightConverterHowToUse } from "./_components/WeightConverterHowToUse"
import { WeightConverterGuide } from "./_components/WeightConverterGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Product Weight Converter - Optimize E-Commerce Shipping Cost",
    description: "Convert e-commerce product weight to lbs, oz, kg, grams. Instantly calculate shipping tier impact, packaging dead weight, and carrier thresholds to cut fulfillment costs.",
}
export default function WeightConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Product Weight Converter" />
                <div className="mb-20">
                    <WeightConverter />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <WeightConverterHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <WeightConverterGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What units can I convert between?",
                                    answer: "You can convert between four standard weight units: <strong>Pounds (lbs)</strong>, <strong>Ounces (oz)</strong>, <strong>Kilograms (kg)</strong>, and <strong>Grams (g)</strong>. The converter shows all four conversions simultaneously for easy comparison."
                                },
                                {
                                    question: "Why can't I select the same unit for input and target?",
                                    answer: "The target unit must be different from the input unit to perform a conversion. If you need the same unit, there's no conversion needed - the value remains the same."
                                },
                                {
                                    question: "How accurate are the conversions?",
                                    answer: "Our converter uses precise conversion factors: 1 pound = 453.592 grams and 1 ounce = 28.3495 grams. This ensures accurate conversions suitable for e-commerce, shipping, cooking, and scientific applications."
                                },
                                {
                                    question: "Can I convert very large or very small weights?",
                                    answer: "Yes, the converter handles a wide range of values. Large numbers are automatically formatted for readability (e.g., 1,000,000 becomes 1M), while maintaining calculation accuracy for precise conversions."
                                },
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
