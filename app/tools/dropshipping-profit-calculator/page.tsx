import { Metadata } from "next"
import Link from "next/link"
import { Calculator } from "./_components/Calculator"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { HelpCircle, TrendingUp } from "lucide-react"
import { GuideCarousel } from "./_components/GuideCarousel"
import { FadeIn } from "./_components/FadeIn"

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

                    <FadeIn delay={0.2}>
                        <GuideCarousel />
                    </FadeIn>



                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <section>
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
                                <div className="p-2 bg-slate-100 rounded-xl text-slate-700">
                                    <HelpCircle className="h-6 w-6" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
                            </div>
                            <div className="space-y-4">
                                <Card className="border-0 shadow-sm bg-white">
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">What is a good RTO percentage?</h3>
                                        <p className="text-slate-600 text-sm">RTO rates vary by niche. For prepaid orders, it's usually low (5-10%). For Cash on Delivery (COD) in India, <strong>15-30%</strong> is common. Anything above 30% requires immediate attention to your courier selection or customer verification process.</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-sm bg-white">
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">Why is shipping cost calculated for RTO?</h3>
                                        <p className="text-slate-600 text-sm">When an order is RTO'd, the courier charges you for the forward shipment (to the customer) AND the return shipment (back to the warehouse). This double whammy can kill profits, which is why we include it in the "Total RTO Cost".</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-sm bg-white">
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">Does this calculator work for international dropshipping?</h3>
                                        <p className="text-slate-600 text-sm">Yes! While the currency symbol is currently ₹ (INR), the math works the same for USD ($) or any other currency. Just input your values ignoring the symbol.</p>
                                    </CardContent>
                                </Card>
                                <Card className="border-0 shadow-sm bg-white">
                                    <CardContent className="pt-6">
                                        <h3 className="font-semibold text-slate-900 mb-2">How do I calculate "Ads Cost per Product"?</h3>
                                        <p className="text-slate-600 text-sm">This is also known as CPA (Cost Per Acquisition). Divide your total ad spend by the total number of orders received. E.g., if you spent ₹2000 and got 10 orders, your CPA is ₹200.</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </section>
                    </FadeIn>

                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <section>
                            <Card className="bg-white border border-slate-100 shadow-2xl shadow-blue-900/5 overflow-hidden relative isolate">
                                <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-25" />
                                <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none -z-10" />
                                <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none" />

                                <CardContent className="p-10 md:p-14 text-center relative z-10">
                                    <div className="inline-flex p-3 bg-blue-50/50 border border-blue-100 rounded-2xl mb-8 shadow-sm backdrop-blur-sm">
                                        <TrendingUp className="h-8 w-8 text-blue-600" />
                                    </div>
                                    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 text-slate-900 tracking-tight leading-tight">
                                        Scale Faster with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Web Scraper Pro</span>
                                    </h2>
                                    <p className="text-slate-600 max-w-2xl mx-auto mb-10 text-lg leading-relaxed font-medium">
                                        Stop guessing. Start dominating. Extract data, track competitors, and find winning products in seconds.
                                    </p>
                                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                                        <a href="https://chrome.google.com/webstore/detail/web-scraper-pro" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity transform hover:scale-105 duration-200">
                                            <img
                                                src="https://developer.chrome.com/static/images/ChromeWebStore_Badge_v2_206x58.png"
                                                alt="Available in the Chrome Web Store"
                                                height="58"
                                                className="h-[58px] w-auto shadow-lg rounded-md"
                                            />
                                        </a>
                                    </div>
                                    <p className="mt-8 text-xs font-semibold uppercase tracking-widest text-slate-400">
                                        Free forever for basic use • No credit card required
                                    </p>
                                </CardContent>
                            </Card>
                        </section>
                    </FadeIn>
                </div>
            </div >
        </div >
    )
}
