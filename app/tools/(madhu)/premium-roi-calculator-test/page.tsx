import { Metadata } from "next"
import { FadeIn } from "@/app/tools/_shared/components"
import { PremiumCalculator } from "./_components/PremiumCalculator"
import { PremiumToolSteps } from "./_components/PremiumToolSteps"
import { PremiumToolGuide } from "./_components/PremiumToolGuide"
import { PremiumToolFAQ } from "./_components/PremiumToolFAQ"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "Premium ROI Calculator Test - UI Sample | Web Scraper.do",
    description: "Premium UI test sample for the influencer marketing ROI calculator tool.",
}

export default function PremiumROICalculatorTestPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                {/* ═══ PREMIUM PAGE TITLE ═══ */}
                <FadeIn>
                    <div className="text-center mb-14">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100/80 text-[11px] font-bold text-blue-600 uppercase tracking-widest mb-5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                            Premium UI Sample
                        </div>
                        <h1 className="text-4xl md:text-[44px] font-bold text-slate-800 mb-3 tracking-tight leading-tight">
                            Influencer Marketing ROI Calculator
                        </h1>
                        <p className="text-[16px] text-slate-400 font-medium max-w-xl mx-auto leading-relaxed">
                            Calculate the true return on investment for your influencer campaigns. Track fees, costs, and sales in one place.
                        </p>
                    </div>
                </FadeIn>

                {/* ═══ CALCULATOR ═══ */}
                <div className="mb-24">
                    <PremiumCalculator />
                </div>

                {/* ═══ CONTENT SECTIONS ═══ */}
                <div className="max-w-4xl mx-auto space-y-20">
                    <FadeIn delay={0.15}>
                        <PremiumToolSteps
                            title="How to Calculate Campaign Success"
                            steps={[
                                {
                                    title: "Campaign Costs",
                                    description: "Enter the fixed <strong>Influencer Fee</strong> and any optional <strong>Ad Spend</strong> used to boost the campaign reach.",
                                    icon: "Wallet",
                                    accent: "blue"
                                },
                                {
                                    title: "Sales Results",
                                    description: "Input your <strong>Selling Price</strong> and <strong>Total Orders</strong> to instantly see your <strong>ROI</strong> and <strong>Profit per Order</strong>.",
                                    icon: "ShoppingCart",
                                    accent: "blue"
                                },
                                {
                                    title: "Unit Profitability",
                                    description: "Add your <strong>Product Cost</strong> and <strong>Shipping</strong> to calculate a true net profit rather than just a gross revenue estimate.",
                                    icon: "Box",
                                    accent: "blue"
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <PremiumToolGuide
                            title="Measuring Influencer Growth & ROI"
                            items={[
                                {
                                    title: "Gross ROAS vs. Net Profit ROI",
                                    description: "Fill the core fields (<strong>Fee, Price, Orders</strong>) for a quick <strong>ROAS estimate</strong>. Add <strong>Product Costs</strong> to transition into a <strong>Net Profit ROI</strong> calculation—perfect for seeing exactly what you cleared after fulfillment.",
                                    icon: "Percent",
                                    accent: "blue"
                                },
                                {
                                    title: "Scaling with Variable Costs",
                                    description: "Unlike the <strong>Influencer Fee</strong> (one-time cost), <strong>Product</strong> and <strong>Shipping</strong> costs scale with every sale. Adding these allows the tool to display your <strong>Profit Per Order</strong>, which is critical for high-volume campaigns.",
                                    icon: "TrendingUp",
                                    accent: "emerald"
                                },
                                {
                                    title: "The Silent Cost of Gifting",
                                    description: "If you didn't pay a cash fee but sent a <strong>Free Product</strong> instead, you must still track its value. Enter the <strong>COGS (Product Cost)</strong> of the gifted item into the <strong>Influencer Fee</strong> field.",
                                    icon: "Target",
                                    accent: "violet"
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.25}>
                        <PremiumToolFAQ
                            faqs={[
                                {
                                    question: "What is the difference between ROAS and ROI in this tool?",
                                    answer: "<strong>ROAS</strong> (Return on Ad Spend) measures the gross revenue generated specifically from your marketing costs. If you only provide the <strong>Fee</strong> and <strong>Price</strong>, we show your ROAS. However, once you add <strong>Product</strong> and <strong>Shipping</strong> costs, the tool calculates your <strong>Net ROI</strong>, which shows your true back-pocket profit after all expenses are covered."
                                },
                                {
                                    question: "How should I account for 'gifted' products instead of a fee?",
                                    answer: "If you didn't pay a cash fee but sent a free product instead, you should enter the <strong>Product Cost (COGS)</strong> of that gift into the <strong>Influencer Fee</strong> field. This ensures your ROI calculation accounts for the actual capital you invested in that partnership."
                                },
                                {
                                    question: "What is a 'Good' ROI for Influencer Marketing?",
                                    answer: "For direct-response sales, an ROI of <strong>100% (2x return)</strong> is a strong benchmark. However, influencer campaigns often provide 'hidden' value through <strong>UGC</strong> and <strong>Brand Awareness</strong>. If a campaign results in a 0% ROI (Break Even) but gives you high-quality video content for your future ads, it is often considered a successful investment."
                                },
                                {
                                    question: "Why is tracking 'Profit per Order' useful?",
                                    answer: "While total ROI is great for high-level reporting, <strong>Profit per Order</strong> tells you if your unit economics are healthy. If your influencer drives 1,000 sales but your profit per order is only $1, your margins might be too thin to sustain scaling."
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
