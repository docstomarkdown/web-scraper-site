import { Metadata } from "next"
import { Validator } from "./_components/Validator"
import { ValidatorGuide } from "./_components/ValidatorGuide"
import { ValidatorHowToUse } from "./_components/ValidatorHowToUse"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "UPC/EAN Validator - Check Digit Calculator & Format Checker",
    description: "Free tool to validate UPC-A, EAN-13, and EAN-8 barcodes. Calculate check digits, verify formats, and fix errors instantly.",
}
export default function UPCEANValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-[42px] mb-4">
                            UPC/EAN Validator
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <Validator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <ValidatorHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ValidatorGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a Check Digit?",
                                    answer: "The last digit of a barcode is a calculated checksum used to verify the integrity of the previous digits. If this digit doesn't match the mathematical formula, the barcode will not scan at registers."
                                },
                                {
                                    question: "What formats are supported?",
                                    answer: "We support <b>UPC-A</b> (12 digits, standard in North America), <b>EAN-13</b> (13 digits, global standard), and <b>EAN-8</b> (8 digits for small packages)."
                                },
                                {
                                    question: "Why is my barcode invalid?",
                                    answer: "Common reasons include: incorrect number of digits (length error) or a typo in the last digit (check digit error). Our tool calculates the expected check digit to help you fix typos."
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
