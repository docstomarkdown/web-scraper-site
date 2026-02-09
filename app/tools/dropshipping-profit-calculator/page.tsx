import { Metadata } from "next"
import Link from "next/link"
import { Calculator } from "./_components/Calculator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp, ShoppingBag, Truck, RefreshCcw, Wallet } from "lucide-react"
import { ProfitGuide } from "./_components/ProfitGuide"
import { FadeIn, ToolFAQ, ToolCTA } from "@/app/tools/_components"

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
                        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl mb-4">
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

                            <div className="relative">
                                {/* Connecting Line (Desktop) */}
                                <div className="hidden lg:block absolute top-[2.5rem] left-[10%] right-[10%] h-0.5 bg-slate-100 -z-10" />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    {/* Step 1 */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-l-blue-500 border border-slate-200/60 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 opacity-80">
                                                <ShoppingBag className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Step 1</span>
                                                </div>
                                                <h3 className="text-base font-semibold text-slate-900 mb-1">Enter Product Costs</h3>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    Fill in your selling price and product cost from your supplier.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-l-blue-500 border border-slate-200/60 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 opacity-80">
                                                <Truck className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Step 2</span>
                                                </div>
                                                <h3 className="text-base font-semibold text-slate-900 mb-1">Add Shipping & Ads</h3>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    Enter shipping cost and your average CPA (ads cost per order).
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-l-blue-500 border border-slate-200/60 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 opacity-80">
                                                <RefreshCcw className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Step 3</span>
                                                </div>
                                                <h3 className="text-base font-semibold text-slate-900 mb-1">Set RTO Percentage</h3>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    Enter expected return rate. COD markets: 15-30% typical.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Step 4 */}
                                    <div className="bg-white/80 backdrop-blur-sm rounded-xl border-l-4 border-l-blue-500 border border-slate-200/60 p-5 hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300 group">
                                        <div className="flex items-start gap-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white group-hover:scale-105 transition-transform duration-300 opacity-80">
                                                <Wallet className="w-6 h-6" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2 mb-1">
                                                    <span className="text-xs font-semibold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">Step 4</span>
                                                </div>
                                                <h3 className="text-base font-semibold text-slate-900 mb-1">View Your Profit</h3>
                                                <p className="text-sm text-slate-500 leading-relaxed">
                                                    See net profit, margin %, and impact of returns.
                                                </p>
                                            </div>
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

                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <ToolCTA
                            tagline="Recommended for Web Scraping & E-commerce Users"
                            title="Ready to find"
                            highlightedText="winning products?"
                            description="Scrape any website in seconds with our powerful Chrome extension."
                            buttonText="Install Free Extension"
                            buttonHref="#"
                        />
                    </FadeIn>
                </div>
            </div >
        </div >
    )
}
