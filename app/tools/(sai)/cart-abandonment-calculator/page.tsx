import { Metadata } from "next"
import { AbandonmentCalculator } from "./_components/AbandonmentCalculator"
import { AbandonmentGuide } from "./_components/AbandonmentGuide"
import { AbandonmentHowToUse } from "./_components/AbandonmentHowToUse"
import { AbandonmentOverview } from "./_components/AbandonmentOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { Lightbulb } from "lucide-react"
export const metadata: Metadata = {
    title: 'Cart Abandonment Rate Calculator | Web Scraper.do',
    description: 'Calculate your Cart Abandonment Rate to identify lost revenue opportunities and optimize your checkout flow.',
}
export default function CartAbandonmentCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Cart Abandonment Rate Calculator" />
                <div className="text-center mb-10 -mt-6">
                    <FadeIn direction="down" duration={0.6} delay={0.1}>
                        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
                            Discover the percentage of shoppers who leave without buying and assess the health of your checkout process.
                        </p>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <AbandonmentCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16" id="abandonment-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader 
                            title="Tool Essential" 
                            subtitle="Everything you need to know about calculating and analyzing your cart abandonment rate."
                            icon={Lightbulb}
                        />
                        <div className="mt-8">
                            <AbandonmentOverview />
                        </div>
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AbandonmentHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <AbandonmentGuide />
                    </FadeIn>
                    {/* FAQ Section */}
                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Where do I find my 'Carts Created' and 'Successful Checkouts' in Shopify/WooCommerce?",
                                    answer: "In Shopify, check <strong>Analytics > Reports</strong> for 'Added to Cart' (carts created) and 'Total Orders'. In WooCommerce, use <strong>WooCommerce Analytics > Orders</strong> or use Google Analytics Enhanced Ecommerce tracking."
                                },
                                {
                                    question: "What is considered a good cart abandonment rate?",
                                    answer: "A good rate is <strong>under 60%</strong>, though the global e-commerce average is around <strong>70%</strong>. If your rate falls above 75%, your checkout flow needs immediate optimization."
                                },
                                {
                                    question: "What causes high cart abandonment?",
                                    answer: "The #1 cause is <strong>unexpected shipping costs or taxes</strong> at checkout. Other major factors include forced account creation, long checkout forms, a lack of preferred payment options (like PayPal/Apple Pay), and slow mobile page speeds."
                                },
                                {
                                    question: "How can I reduce my cart abandonment rate?",
                                    answer: "Offer a simple <strong>Guest Checkout</strong> option, show shipping costs upfront unconditionally, minimize mandatory form fields, display prominent trust badges, and ensure your mobile checkout loads instantly."
                                },
                                {
                                    question: "What’s the difference between cart abandonment and checkout abandonment?",
                                    answer: "<strong>Cart abandonment</strong> is when a shopper adds an item but never starts the checkout process. <strong>Checkout abandonment</strong> is when they start entering their details (like email or address) but leave before actually paying."
                                },
                                {
                                    question: "What tools or methods can I use to recover abandoned carts?",
                                    answer: "Set up automated <strong>email recovery flows</strong> using tools like Klaviyo or Mailchimp. You can also use automated SMS reminders, browser push notifications, and retargeting ads on Meta/Google to win back those lost sales."
                                }
                            ]}
                        />
                    </FadeIn>
                    {/* CTA Section */}
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}