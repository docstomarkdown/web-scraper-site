import { Metadata } from "next"
import { Validator } from "./_components/Validator"
import { ValidatorGuide } from "./_components/ValidatorGuide"
import { ValidatorHowToUse } from "./_components/ValidatorHowToUse"
import { ValidatorInfo } from "./_components/ValidatorInfo"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "UPC/EAN Validator - Check Digit Calculator & Format Checker",
    description: "Free tool to validate UPC-A, EAN-13, and EAN-8 barcodes. Calculate check digits, verify formats, and fix errors instantly.",
}
export default function UPCEANValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="UPC/EAN Validator" />
                <div className="mb-20">
                    <Validator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <ValidatorInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ValidatorHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.25}>
                        <ValidatorGuide />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What barcode formats does this validator support?",
                                    answer: "We support <b>UPC-A</b> (12 digits, standard in North America), <b>EAN-13</b> (13 digits, global standard), and <b>EAN-8</b> (8 digits for small packages). All formats use the same Modulo 10 check digit algorithm."
                                },
                                {
                                    question: "What is a check digit and why does it matter?",
                                    answer: "The check digit is the last digit of a barcode, calculated using the GS1 Modulo 10 algorithm. It verifies the integrity of all previous digits. If incorrect, the barcode won't scan at point-of-sale terminals, causing checkout failures and inventory issues."
                                },
                                {
                                    question: "Why is my barcode showing as invalid?",
                                    answer: "Common reasons include: incorrect number of digits (length error—must be exactly 8, 12, or 13 digits) or a typo in the last digit (check digit error). Our tool calculates the expected check digit and shows you the correct value to fix the error."
                                },
                                {
                                    question: "Can I upload a barcode image instead of typing it?",
                                    answer: "Yes! You can click the upload section or drag and drop an image file. The tool will automatically extract the barcode number and validate it, showing you the check digit calculation."
                                },
                                {
                                    question: "Does this tool support bulk barcode validation?",
                                    answer: "Yes, you can upload a CSV, TXT, or text file containing multiple barcodes (one per line or comma-separated). The validator will process them all instantly and provide a summary of valid and invalid codes."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.35}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
