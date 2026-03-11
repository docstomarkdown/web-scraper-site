import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
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
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Product Weight Converter
                        </h1>
                    </FadeIn>
                </div>
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
                                    question: "What is the 'Conversion matrix'?",
                                    answer: "The conversion matrix provides a live view of your input weight across all four standard e-commerce units: Ounces (oz), Pounds (lbs), Grams (g), and Kilograms (kg). This allows you to quickly verify weights for both domestic and international logistics."
                                },
                                {
                                    question: "What is a 'Lightweight' shipping tier?",
                                    answer: "The lightweight tier applies to packages under 1 lb (15.99 oz). These are eligible for USPS Ground Advantage, which is the most cost-effective shipping method for e-commerce sellers."
                                },
                                {
                                    question: "Why should I select a 'Target unit'?",
                                    answer: "Setting a target unit highlights that specific conversion as your primary result. This is useful for quickly filling out shipping templates or Amazon FBA listings that require a specific unit of measure."
                                },
                                {
                                    question: "How accurate are the estimated shipping costs?",
                                    answer: "The costs shown are 2025 estimates for commercial rates. Actual costs may vary based on your specific carrier contract, shipping zone (distance), and current fuel surcharges."
                                },
                                {
                                    question: "Can I save money by reducing product weight?",
                                    answer: "Yes. By identifying your current tier, you can see how close you are to the next cheaper threshold. Reducing packaging weight or minor product modifications can often yield significant margin increases."
                                }
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
