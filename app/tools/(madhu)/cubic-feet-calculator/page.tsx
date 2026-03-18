import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CubicFeetCalculator } from "./_components/CubicFeetCalculator"
import { CubicFeetInfo } from "./_components/CubicFeetInfo"
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
                    <FadeIn delay={0.15}>
                        <CubicFeetInfo />
                    </FadeIn>
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
                                    answer: "You can enter dimensions in <strong>4 units</strong>: Feet (default), Inches, Centimeters, or Meters. Select your unit from the tab row at the top of the input panel — all three dimension fields switch together. The results always show Cubic Feet, Cubic Meters, and Cubic Inches simultaneously."
                                },
                                {
                                    question: "How does the Quantity field work?",
                                    answer: "The <strong>Number of Units</strong> field (optional, under the Quantity section) lets you calculate total volume for multiple identical items. When a quantity greater than 1 is entered, the Results Panel shows both the single-unit volume as the hero figure <em>and</em> a \"Total Volume\" card with the combined volume for the entire batch."
                                },
                                {
                                    question: "How do I get an Estimated Total Cost?",
                                    answer: "Open the <strong>Cost</strong> section (optional) at the bottom of the input panel. Select your currency from the currency picker — 50+ currencies are supported with correct symbols — then enter your cost per cubic foot. The results panel will show an Estimated Total Cost card with the correct currency formatting automatically applied."
                                },
                                {
                                    question: "What's the difference between CFT, CBM, and Cubic Inches?",
                                    answer: "<strong>Cubic Feet (CFT)</strong> is the primary result and the standard unit for US warehouse storage and Amazon FBA fees. <strong>Cubic Meters (CBM)</strong> is used by international sea freight carriers. <strong>Cubic Inches</strong> is useful for precise small-item calculations. All three are displayed at the same time so you always have the right figure for the right platform."
                                },
                                {
                                    question: "Why does the hero value show a compact format like 518.15K?",
                                    answer: "The large hero number uses a <strong>compact notation</strong> (K for thousands, M for millions, B for billions) to fit neatly in the display without truncation. The Other Units card below it always shows the full precise number — for example, 44,016.7292 m³ — so you never lose accuracy."
                                },
                                {
                                    question: "How precise are the calculations?",
                                    answer: "The tool outputs up to <strong>4 decimal places for Cubic Meters</strong> (CBM) and <strong>2 decimal places for Cubic Feet and Cubic Inches</strong>. This level of precision matches what Amazon FBA and LTL freight carriers require to price storage and shipping correctly."
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
