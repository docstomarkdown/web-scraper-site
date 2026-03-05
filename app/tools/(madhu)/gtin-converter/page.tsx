import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { Converter } from "./_components/Converter"
import { GTINHowToUse } from "./_components/GTINHowToUse"
import { GTINGuide } from "./_components/GTINGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Global Trade Item Number (GTIN) Converter - UPC, EAN, GTIN-12, GTIN-13, GTIN-14",
    description: "Convert between UPC-A, EAN-13, GTIN-12, GTIN-13, and GTIN-14 formats. Calculate check digits and validate barcode structures instantly.",
}
export default function GTINConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 md:text-[42px] mb-4">
                            Global Trade Item Number (GTIN) Converter
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <Converter />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <GTINHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <GTINGuide />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the difference between Universal Product Code (UPC) and European Article Number (EAN)?",
                                    answer: "UPC (Universal Product Code) is a 12-digit barcode standard used primarily in the US and Canada. EAN (European Article Number) is a 13-digit standard used globally. A UPC is essentially an EAN with a leading zero."
                                },
                                {
                                    question: "Is Global Trade Item Number 12 (GTIN-12) the same as Universal Product Code A (UPC-A)?",
                                    answer: "Yes, GTIN-12 is the official GS1 name for the 12-digit UPC-A barcode format."
                                },
                                {
                                    question: "Is Global Trade Item Number 13 (GTIN-13) the same as European Article Number 13 (EAN-13)?",
                                    answer: "Yes, GTIN-13 is the official GS1 name for the 13-digit EAN-13 barcode format. It's the global standard for product identification outside North America and is required for international marketplaces like Amazon Europe, eBay UK, and other worldwide retail channels."
                                },
                                {
                                    question: "When should I use Global Trade Item Number 14 (GTIN-14)?",
                                    answer: "GTIN-14 is typically used for outer cases or shipping containers that contain multiple units of the same product. It is often represented using ITF-14 or GS1-128 barcode symbols."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.4} className="mt-24 pb-12">
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}