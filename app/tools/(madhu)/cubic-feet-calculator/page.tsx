import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
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
                <ToolPageTitle title="Cubic Feet Calculator" />
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
                                    question: "What units can I use to enter dimensions?",
                                    answer: "You can use <strong>4 different units</strong>: Feet (ft) - the default, Inches (in), Centimeters (cm), or Meters (m). Simply select your preferred unit from the tabs above the input fields. The calculator automatically converts everything and displays results in Cubic Feet, Cubic Meters, and Cubic Inches."
                                },
                                {
                                    question: "How does the quantity feature work?",
                                    answer: "The <strong>Number of Units</strong> field (optional) lets you calculate total volume for multiple identical items. Enter dimensions once, then specify how many units you have. The calculator multiplies the single-item volume by your quantity to give you the total volume for all items combined."
                                },
                                {
                                    question: "Why do results show full numbers instead of abbreviations?",
                                    answer: "We display <strong>complete numbers with comma formatting</strong> (e.g., 3,350,000.00 instead of 3.35M) so all users can understand the exact values without needing to decode abbreviations. This prevents confusion and ensures transparency in volume calculations."
                                },
                                {
                                    question: "What's the difference between CFT, CBM, and Cubic Inches?",
                                    answer: "<strong>Cubic Feet (CFT)</strong> is the primary result and standard for US warehouses and Amazon FBA. <strong>Cubic Meters (CBM)</strong> is used for international sea freight. <strong>Cubic Inches</strong> is useful for precise measurements. Our calculator shows all three simultaneously so you have the exact values needed for any shipping or storage scenario."
                                },
                                {
                                    question: "Do I need to enter all fields to get results?",
                                    answer: "You need to enter <strong>Length, Width, and Height</strong> to see volume results. The Quantity field is optional - if left empty, it defaults to 1 unit. Results update in real-time as you type, so you'll see calculations instantly once all three dimensions are entered."
                                },
                                {
                                    question: "How accurate are the calculations?",
                                    answer: "Our calculator provides <strong>precise decimal calculations</strong> - up to 4 decimal places for Cubic Meters and 2 decimal places for Cubic Feet and Cubic Inches. This level of precision is essential for accurate freight quotes and storage fee calculations, preventing costly billing errors."
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
