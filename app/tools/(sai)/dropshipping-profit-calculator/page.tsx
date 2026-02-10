import { Metadata } from "next"
import Link from "next/link"
import { Calculator } from "./_components/Calculator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp, ShoppingBag, Truck, RefreshCcw, Wallet } from "lucide-react"
import { ProfitGuide } from "./_components/ProfitGuide"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Dropshipping Profit Calculator - Estimate your e-commerce margins",
    description: "Free tool to calculate your dropshipping profits, taking into account ads cost, RTOs, shipping, and product costs.",
}

export default function DropshippingCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-10">
                    <FadeIn direction="down" duration={0.6}>
                        <h1 className="text-4xl font-bold tracking-tight text-gray-800 sm:text-5xl mb-4">
                            Dropshipping Profit Calculator
                        </h1>
                    </FadeIn>
                </div>

                <Calculator />

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
                                            <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 01</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Enter Product Costs</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Start by entering your selling price and product cost from your supplier. This is the foundation of your margin analysis.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 02</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Add Shipping & Ads</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Input your shipping costs and ad spend (CPA). These often overlooked costs are what truly determine your net profitability.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-white p-5 sm:p-6 rounded-2xl border border-slate-200/60 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-blue-100/80 border border-blue-200 rounded-xl flex items-center justify-center text-blue-700 z-10 transition-transform duration-300 group-hover:scale-110">
                                            <RefreshCcw className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full uppercase tracking-wider">Step 03</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">Set RTO Percentage</h3>
                                            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                                                Factor in your expected Return to Origin (RTO) rate. In COD markets, this is the #1 reason dropshippers lose money.
                                            </p>
                                        </div>
                                    </div>

                                    {/* Step 4 (The Goal) */}
                                    <div className="relative flex items-start gap-4 sm:gap-8 group bg-blue-50/40 p-5 sm:p-6 rounded-2xl border-2 border-blue-200 shadow-sm shadow-blue-100/20 hover:shadow-md hover:shadow-blue-200/25 transition-all duration-300 scale-[1.02] origin-left">
                                        <div className="relative flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-600 to-blue-500 border border-blue-400 rounded-xl flex items-center justify-center text-white z-10 shadow-sm transition-transform duration-300 group-hover:scale-110">
                                            <Wallet className="w-5 h-5 sm:w-6 sm:h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 mb-1">
                                                <span className="text-[10px] font-bold text-white bg-blue-600 px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">The Goal</span>
                                            </div>
                                            <h3 className="text-base sm:text-lg font-bold text-slate-900 mb-1">View Your Profit</h3>
                                            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                                                Instantly see your net profit, margins, and the Break-Even CPA you need to hit to stay in the green.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ProfitGuide />
                    </FadeIn>



                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is a good RTO percentage?",
                                    answer: "RTO rates vary by niche. For prepaid orders, it's usually low (5-10%). For Cash on Delivery (COD) in India, <strong>15-30%</strong> is common. Anything above 30% requires immediate attention."
                                },
                                {
                                    question: "Why is shipping cost calculated for RTO?",
                                    answer: "When an order is RTO'd, the courier charges you for both forward and return shipment. This double cost can kill profits, which is why we include it in the \"Total RTO Cost\"."
                                },
                                {
                                    question: "Does this calculator work for international dropshipping?",
                                    answer: "Yes! The calculator supports multiple currencies. Just select your currency from the dropdown and input your values."
                                },
                                {
                                    question: "How do I calculate \"Ads Cost per Product\"?",
                                    answer: "This is also known as CPA (Cost Per Acquisition). Divide your total ad spend by the number of orders received. E.g., ₹2000 ad spend ÷ 10 orders = ₹200 CPA."
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
