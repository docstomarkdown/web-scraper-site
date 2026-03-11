import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { DimensionConverterContent } from "./_components/DimensionConverter"
import { DimensionConverterHowToUse } from "./_components/DimensionConverterHowToUse"
import { DimensionConverterGuide } from "./_components/DimensionConverterGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Dimension Converter - Unit Conversion & Volume Calculator",
    description: "Convert product dimensions between Inches and Centimeters. Calculate cubic volume, DIM weight, and verify oversized shipping surcharges instantly.",
}
export default function DimensionConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Dimension Converter
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <DimensionConverterContent />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <DimensionConverterHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <DimensionConverterGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What units does this tool support?",
                                    answer: "You can input dimensions in <b>Inches (in)</b> or <b>Centimeters (cm)</b>. The tool automatically converts all inputs to all units and calculates volume in cubic inches and cubic centimeters."
                                },
                                {
                                    question: "How is Cubic Volume calculated?",
                                    answer: "Volume is calculated by multiplying Length × Width × Height. The tool handles all unit conversions internally to ensure precision across Imperial and Metric systems."
                                },
                                {
                                    question: "Can I copy the conversion results?",
                                    answer: "Yes! Use the 'Copy All' button at the top right to copy all converted dimensions and volume calculations to your clipboard in a clean, formatted text."
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