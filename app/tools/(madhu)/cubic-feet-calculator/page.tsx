import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CubicFeetCalculator } from "./_components/CubicFeetCalculator"
import { CubicFeetHowToUse } from "./_components/CubicFeetHowToUse"
import { CubicFeetGuide } from "./_components/CubicFeetGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Cubic Feet Calculator - Freight & Storage Cost Estimator",
    description: "Calculate cubic feet (CFT) from dimensions for freight and storage cost estimation. Support for Inches, Feet, CM, and Meters with instant shipping volume calculations.",
}
export default function CubicFeetCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Cubic Feet Calculator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <CubicFeetCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <CubicFeetHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <CubicFeetGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I calculate cubic feet?",
                                    answer: "Simply multiply the Length × Width × Height (in inches) and divide the result by 1,728. Our tool automates this and supports multiple units like Centimeters and Meters."
                                },
                                {
                                    question: "What is CBM in freight?",
                                    answer: "CBM stands for 'Cubic Meter'. It is the standard unit of measurement for international sea freight. 1 CBM is equivalent to 35.315 cubic feet."
                                },
                                {
                                    question: "Why should I use CFT for Amazon FBA?",
                                    answer: "Amazon calculates their monthly storage fees, removal fees, and disposal fees based on the cubic volume of your products measured in cubic feet. Accurate CFT calculation helps in profit forecasting."
                                },
                                {
                                    question: "How does dimensional weight affect my costs?",
                                    answer: "Dimensional (DIM) weight is a pricing technique used by carriers. If the cubic size of your package is large relative to its actual weight, you will be billed based on the space it occupies rather than its actual pounds."
                                },
                                {
                                    question: "What is the standard size of a pallet in cubic feet?",
                                    answer: "A standard US pallet (48\" x 40\") stacked to a height of 48 inches is approximately 53.33 cubic feet."
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