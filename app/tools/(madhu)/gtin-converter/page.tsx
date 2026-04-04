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
                                    question: "What is a GTIN (Global Trade Item Number)?",
                                    answer: "A GTIN is a unique, internationally recognized identifier used to look up product information in global databases. It is the actual number printed beneath a barcode (such as a UPC or EAN). GTINs ensure that products are uniformly identified across all e-commerce platforms, retail checkout systems, and supply chains."
                                },
                                {
                                    question: "What are the different types of GTINs?",
                                    answer: "There are four primary lengths of GTINs: <strong>GTIN-8</strong> (an 8-digit code for very small items), <strong>GTIN-12</strong> (a 12-digit code predominantly used in North America), <strong>GTIN-13</strong> (a 13-digit code used heavily in Europe and internationally), and <strong>GTIN-14</strong> (a 14-digit code used exclusively for wholesale shipping and bulk pallet logistics)."
                                },
                                {
                                    question: "What is the difference between UPC, EAN, and GTIN?",
                                    answer: "\"GTIN\" is the overarching umbrella term for the underlying numerical data. \"UPC\" (Universal Product Code) and \"EAN\" (European Article Number) are simply the barcode graphics that hold that data. A UPC-A barcode contains a 12-digit GTIN (GTIN-12), while an EAN-13 barcode contains a 13-digit GTIN (GTIN-13)."
                                },
                                {
                                    question: "Why do I need to convert between different GTIN formats?",
                                    answer: "Different marketplaces and retail systems require specific data lengths. For instance, Amazon often requires a 14-digit padded format for bulk inventory, or a European supplier might require your American 12-digit code converted into a 13-digit EAN. Conversion standardizes your number by adding necessary padding and recalculating the check digit so retail systems accept it globally."
                                },
                                {
                                    question: "How does this GTIN Converter tool work?",
                                    answer: "Simply type your GTIN manually or upload a photo of a barcode label. Our tool automatically reads the code, validates the Modulo 10 check digit to ensure it was printed correctly, and instantly converts your item across all four major formats (GTIN-8, GTIN-12, GTIN-13, and GTIN-14) simultaneously."
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
