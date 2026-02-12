import { Metadata } from "next"
import { DimensionConverterContent } from "./_components/DimensionConverter"
import { FadeIn } from "../../_shared/components"

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
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Dimension Converter
                        </h1>
                    </FadeIn>
                </div>

                <DimensionConverterContent />
            </div>
        </div>
    )
}
