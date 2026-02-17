// GTIN Converter Tool Page
import { Metadata } from "next"
import { Converter } from "./_components/Converter"
import ConverterGuide from "./_components/Guide"
import { HelpCircle, RefreshCw, Calculator, FileUp, ShieldCheck } from "lucide-react"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
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
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Global Trade Item Number (GTIN) Converter
                        </h1>
                    </FadeIn>
                </div>

                <Converter />

                <div className="max-w-4xl mx-auto mt-20 space-y-24">
                    <FadeIn delay={0.1}>
                        <section id="how-to-use" className="relative">
                            <div className="flex items-center gap-4 mb-10 pb-4 border-b border-slate-200">
                                <div className="p-2 bg-blue-50 rounded-full text-blue-600">
                                    <HelpCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900 tracking-tight">How to Use This Converter</h2>
                            </div>

                            <div className="max-w-3xl mx-auto space-y-6">
                                {/* Step 1 */}
                                <div className="group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                            <FileUp className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 01</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Enter or Upload</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                Type your barcode manually or <b>upload a product image</b> for automatic extraction. Supports UPC-A, EAN-13, and GTIN-14 formats.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 2 */}
                                <div className="group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                            <div className="text-xl font-bold">#</div>
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 02</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Format Detection</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                Our engine instantly detects the format and verifies the <b>Modulo 10 check digit</b> using official GS1 algorithms.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 3 */}
                                <div className="group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                    <div className="flex items-start gap-4 sm:gap-6">
                                        <div className="flex-shrink-0 w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 transition-transform duration-300 group-hover:scale-110">
                                            <Calculator className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full uppercase tracking-wider">Step 03</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Instant Mapping</h3>
                                            <p className="text-sm text-slate-600 leading-relaxed">
                                                The tool immediately calculates the equivalent <b>GTIN-12, GTIN-13, and GTIN-14</b> codes for global EDI and inventory synchronization.
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Step 4 (The Goal) */}
                                <div className="relative flex items-start gap-4 sm:gap-8 group bg-blue-50/50 p-6 sm:p-8 rounded-3xl border border-blue-200 shadow-sm transition-all duration-300">
                                    <div className="relative flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white z-10 shadow-lg shadow-blue-600/20 transition-transform duration-300 group-hover:scale-110">
                                        <ShieldCheck className="w-6 h-6 sm:w-7 sm:h-7" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] font-bold text-white bg-blue-600 px-3 py-1 rounded-full uppercase tracking-wider shadow-md">The Goal</span>
                                        </div>
                                        <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2 leading-tight">Get All Formats</h3>
                                        <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium opacity-90">
                                            Instantly see your barcode converted to <b>GTIN-12, GTIN-13, and GTIN-14</b> formats. Copy individual codes or the complete table for global inventory systems.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <ConverterGuide />

                    <FadeIn delay={0.2}>
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

                    <FadeIn delay={0.2} className="mt-24 pb-12">
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
