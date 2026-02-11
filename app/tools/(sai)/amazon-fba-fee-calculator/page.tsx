import { Metadata } from "next"
import { FBACalculator } from "./_components/FBACalculator"
import { Scale, Package, Banknote, Warehouse } from "lucide-react"
import { FBAGuide } from "./_components/FBAGuide"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Amazon FBA Fee Calculator - Estimate Fees & Profit",
    description: "Free tool to estimate Amazon FBA fees, referral fees, and net profit based on product size, weight, and price.",
}

export default function FbaCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Amazon FBA Fee Calculator
                        </h1>
                    </FadeIn>
                </div>

                <FBACalculator />

                <div className="max-w-4xl mx-auto mt-20 space-y-16">

                    <FadeIn delay={0.1}>
                        <section id="how-to-use" className="relative">
                            <div className="flex items-center gap-3 mb-10 pb-4 border-b border-slate-200">
                                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">How to Use This Calculator</h2>
                            </div>

                            <div className="relative max-w-2xl mx-auto pl-4 sm:pl-8">
                                {/* Vertical Connector Line */}
                                <div className="absolute left-[34px] sm:left-[54px] top-8 bottom-8 w-0.5 bg-blue-100 -z-10" />

                                <div className="space-y-6">
                                    {/* Step 1 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <Scale className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 01</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Enter Dimensions & Weight</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Accurately enter your packaged product's length, width, height, and weight. Amazon fees heavily depend on size tiers.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <Package className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 02</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Input Selling Price</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Enter the price you intend to sell at. This is used to calculate the Referral Fee (typically 15% of the sale price).
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 (The Goal) */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-blue-50/40 p-5 sm:p-6 rounded-2xl border-2 border-blue-200 shadow-sm shadow-blue-100/20 hover:shadow-md hover:shadow-blue-200/25 transition-all duration-300 scale-[1.02] origin-left">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-500 border border-blue-400 rounded-xl flex items-center justify-center text-white z-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                            <Banknote className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">The Result</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">View Total Fees</h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                                Instantly see your estimated Amazon FBA Fulfillment Fee and Referral Fee totals.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FBAGuide />
                    </FadeIn>

                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Are these FBA fees exact?",
                                    answer: "These are estimates based on standard 2024 rate cards. Actual fees may vary slightly due to dimensional weight calculations, dangerous goods classification, or apparel surcharges."
                                },
                                {
                                    question: "What is Dimensional Weight?",
                                    answer: "Amazon calculates fee weight based on package volume. If your product is light but large, you will be charged for the space it takes up, not just its actual weight."
                                },
                                {
                                    question: "How is the Referral Fee calculated?",
                                    answer: "It is a percentage of the total sales price (usually 15% for most categories). For example, on a $100 item, Amazon takes $15."
                                },
                                {
                                    question: "Does this include storage fees?",
                                    answer: "No, this calculator focuses on fulfillment and referral fees. Monthly storage fees depend on how long your inventory sits in the warehouse."
                                }
                            ]}
                        />
                    </FadeIn>

                </div>

                {/* CTA Section */}
                <FadeIn delay={0.2}>
                    <CTA />
                </FadeIn>
            </div >
        </div >
    )
}
