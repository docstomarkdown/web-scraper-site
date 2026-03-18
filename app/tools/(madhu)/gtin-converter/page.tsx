import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { Converter } from "./_components/Converter"
import { GTINInfo } from "./_components/GTINInfo"
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
                        <GTINInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <GTINHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <GTINGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I convert a UPC image to EAN?",
                                    answer: "Simply click the 'Upload Barcode Image' button and select a photo or scan of your product label. Our tool automatically scans the barcode from your image, validates the check digit, and instantly provides you with the 13-digit EAN (GTIN-13) equivalent used for international retail."
                                },
                                {
                                    question: "What is the difference between GTIN-12 and UPC-A?",
                                    answer: "They are the same thing. GTIN-12 is the official GS1 name for the universal 12-digit barcode format used primarily in the United States and Canada (UPC-A). Our converter provides the GTIN-12 output for any barcode you enter."
                                },
                                {
                                    question: "Why is the check digit important for GTINs?",
                                    answer: "The final digit of any GTIN is a checksum calculated using the Modulo 10 algorithm. It prevents data entry errors. If the check digit is incorrect, marketplaces like Amazon or retail POS systems will reject the barcode. Our tool validates and corrects these digits automatically."
                                },
                                {
                                    question: "Can I convert small-form barcodes like GTIN-8?",
                                    answer: "Yes, our tool supports GTIN-8 (commonly used on very small products). You can enter an 8-digit code or upload an image of one, and we will convert it into the standard padded formats (GTIN-12, GTIN-13, and GTIN-14) used in databases."
                                },
                                {
                                    question: "What is GTIN-14 used for in logistics?",
                                    answer: "GTIN-14 is specifically designed for the 'outer' levels of packaging, such as shipping cartons or pallets containing multiple units of the same product. It is essential for inventory management and logistics, where it's often printed as an ITF-14 barcode."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5} className="mt-24 pb-12">
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
