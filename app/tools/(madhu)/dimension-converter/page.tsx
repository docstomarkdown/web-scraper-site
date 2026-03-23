import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { DimensionConverterContent } from "./_components/DimensionConverter"
import { DimensionConverterHowToUse } from "./_components/DimensionConverterHowToUse"
import { DimensionConverterGuide } from "./_components/DimensionConverterGuide"
import { DimensionConverterOverview } from "./_components/DimensionConverterOverview"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

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
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Understand how instant unit conversions keep your product dimensions accurate across every marketplace and region."
                            icon={BookOpen}
                        />
                        <DimensionConverterOverview />
                    </FadeIn>
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
                                    question: "Why is converting dimensions critical for international selling?",
                                    answer: "Most global marketplaces like Amazon UK/EU or Walmart require Metric (CM), while US listings use Imperial (IN). Accurate conversion ensures your customers (and the warehouse) get the exact product size they expect, reducing returns and shipping errors."
                                },
                                {
                                    question: "How does this tool help avoid 'unmeasured' shipping fees?",
                                    answer: "Carriers use the larger of actual weight vs 'Dimensional Weight'. By having your exact L x W x H in both systems, you can cross-calculate your DIM weight and ensure your packaging stays within the cheapest possible shipping tier."
                                },
                                {
                                    question: "Can I use these converted dimensions for box and pallet planning?",
                                    answer: "Yes! Once you have your accurate 'Metric' or 'Imperial' dimensions, you can use them in our <b>Container Load Calculator</b> or pallet planning tools to figure out exactly how many units will fit in your next shipment."
                                },
                                {
                                    question: "Does this converter handle high precision for manufacturing spec sheets?",
                                    answer: "Absolutely. The tool uses the industry-standard 1 inch = 2.54 cm formula with precise decimal support, making it reliable for everything from rough product mockups to final manufacturer technical specifications."
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
