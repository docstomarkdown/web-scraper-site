import { Metadata } from "next"
import { Validator } from "./_components/Validator"
import { ValidatorGuide } from "./_components/ValidatorGuide"
import { HelpCircle, ScanLine, ShieldCheck, CheckCircle2 } from "lucide-react"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "UPC/EAN Validator - Check Digit Calculator & Format Checker",
    description: "Free tool to validate UPC-A, EAN-13, and EAN-8 barcodes. Calculate check digits, verify formats, and fix errors instantly.",
}

export default function UPCEANValidatorPage() {
    return (
        <div className="min-h-screen bg-slate-100/70 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            UPC/EAN Validator
                        </h1>
                    </FadeIn>
                </div>

                <Validator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">

                    <FadeIn delay={0.1}>
                        <section id="how-to-use" className="relative">
                            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200">
                                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <HelpCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">How to Use This Validator</h2>
                            </div>

                            <div className="relative max-w-2xl mx-auto pl-4 sm:pl-8">
                                {/* Vertical Connector Line */}
                                <div className="absolute left-[34px] sm:left-[54px] top-8 bottom-8 w-0.5 bg-blue-100 -z-10" />

                                <div className="space-y-6">
                                    {/* Step 1 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <ScanLine className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 01</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Input or Scan</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Type your barcode manually, use your <b>camera to scan</b>, or upload a product image. The tool supports UPC-A, EAN-13, and EAN-8.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <div className="text-xl font-bold">#</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 02</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Automatic Detection</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Our engine instantly cleans up spaces or dashes and identifies the barcode format, ensuring the correct validation logic is applied.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <HelpCircle className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 03</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Verify Calculation</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Click the <b>? icon</b> near the Check Digit to see the mathematical breakdown (Modulo 10) used to verify your code&apos;s integrity.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 4 (The Goal) */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-blue-50/40 p-5 sm:p-6 rounded-2xl border-2 border-blue-200 shadow-sm shadow-blue-100/20 hover:shadow-md hover:shadow-blue-200/25 transition-all duration-300 scale-[1.02] origin-left">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-500 border border-blue-400 rounded-xl flex items-center justify-center text-white z-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">The Goal</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Instant Verification</h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                                Get a clear &quot;Valid&quot; or &quot;Invalid&quot; status, view your barcode visualization, and copy the clean results to use in your inventory system.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ValidatorGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
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

                </div>

                {/* CTA Section */}
                <FadeIn delay={0.2} className="mt-24">
                    <CTA withSectionWrapper={false} />
                </FadeIn>
            </div >
        </div >
    )
}
