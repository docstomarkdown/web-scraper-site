import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
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
                <ToolPageTitle title="Dimension Converter" direction="down" duration={0.6} />
                <DimensionConverterContent />
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
                                    question: "What units does this converter support?",
                                    answer: "The Dimension Converter supports <b>Inches (IN)</b> and <b>Centimeters (CM)</b>. Select your input unit using the toggle tabs, then enter Length, Width, and Height. The tool automatically converts all three dimensions to the opposite unit."
                                },
                                {
                                    question: "How does the conversion work?",
                                    answer: "The converter uses the standard conversion factor: 1 inch = 2.54 centimeters. When you enter dimensions in Inches, they are converted to Centimeters (and vice versa). All three dimensions (Length, Width, Height) are converted simultaneously and displayed in the Results Panel."
                                },
                                {
                                    question: "Do I need to fill all three dimension fields?",
                                    answer: "Yes, all three fields (Length, Width, Height) are required for the converter to display results. The Results Panel shows converted values for each dimension, so complete information ensures accurate conversions."
                                },
                                {
                                    question: "Can I use this for product listings?",
                                    answer: "Absolutely! This tool is perfect for e-commerce sellers who need to convert product dimensions between Imperial (inches) and Metric (centimeters) systems. Essential for listing products on international marketplaces or updating specifications for different regions."
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
