import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
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
                <ToolPageTitle title="Global Trade Item Number (GTIN) Converter" />
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
                                    question: "How does the GTIN converter work?",
                                    answer: "Enter a UPC-A (12 digits), EAN-13 (13 digits), or GTIN-14 (14 digits) barcode. The tool validates the check digit, then converts it to all three GTIN formats. If you enter a UPC, the primary result shows EAN (GTIN-13). If you enter an EAN, the primary result shows UPC (GTIN-12)."
                                },
                                {
                                    question: "What is the difference between UPC and EAN?",
                                    answer: "UPC (Universal Product Code) is a 12-digit barcode standard used primarily in the US and Canada. EAN (European Article Number) is a 13-digit standard used globally. A UPC is essentially an EAN with a leading zero—they represent the same product."
                                },
                                {
                                    question: "Why does the primary result change based on my input?",
                                    answer: "The converter prioritizes showing you the converted format. If you enter a UPC, it shows EAN as the primary result (the conversion). If you enter an EAN, it shows UPC as the primary result. This helps you quickly see the format you need for different markets."
                                },
                                {
                                    question: "What is GTIN-14 used for?",
                                    answer: "GTIN-14 is used for outer cases or shipping containers containing multiple units of the same product. It's typically represented using ITF-14 or GS1-128 barcode symbols and is used in logistics and warehouse management, not at point-of-sale."
                                },
                                {
                                    question: "Can I upload a barcode image?",
                                    answer: "Yes! Click the 'Upload Image' button to scan a barcode from an image file. The tool will extract the barcode number and convert it to all GTIN formats automatically."
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
