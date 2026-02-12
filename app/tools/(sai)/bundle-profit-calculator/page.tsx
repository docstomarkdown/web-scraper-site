import { Metadata } from 'next';
import { BundleProfitCalculator } from './_components/BundleProfitCalculator';
import { BundleHowToUse } from './_components/BundleHowToUse';
import { BundleGuide } from './_components/BundleGuide';
import { FadeIn, ToolFAQ } from '@/app/tools/_shared/components';
import { CTA } from '@/components/sections/CTA';

export const metadata: Metadata = {
    title: 'Bundle Profit Calculator | Web Scraper Pro',
    description: 'Calculate profit margins and ROI for product bundles. Optimize your e-commerce bundling strategy.',
};

const faqs = [
    {
        question: "What is a product bundle?",
        answer: "A product bundle is a marketing strategy where you offer several products for sale as one combined unit, often at a lower price than if they were purchased separately."
    },
    {
        question: "How do I calculate bundle profit?",
        answer: "Subtract the total cost of all items in the bundle from the final bundle price. The result is your net profit."
    },
    {
        question: "Should I use a percentage discount or fixed price?",
        answer: "It depends on your marketing. Percentage discounts (e.g., '20% Off') often work well for flash sales, while fixed prices (e.g., '3 for $50') are great for volume pricing."
    },
    {
        question: "Does bundling improve ROI?",
        answer: "Yes, typically by increasing the Average Order Value (AOV) and reducing per-unit shipping and marketing costs."
    }
];

export default function BundleCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-bold text-slate-900 mb-4">
                            Bundle Profit Calculator
                        </h1>
                        <p className="text-lg text-slate-600">
                            Determine the profitability of your product bundles. Optimize your pricing, discounts, and margins to maximize revenue.
                        </p>
                    </div>
                </FadeIn>

                <div className="mb-20">
                    <BundleProfitCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}><BundleHowToUse /></FadeIn>
                    <FadeIn delay={0.2}><BundleGuide /></FadeIn>
                    <FadeIn delay={0.2}><ToolFAQ faqs={faqs} /></FadeIn>
                    <FadeIn delay={0.2}><CTA /></FadeIn>
                </div>
            </div>
        </div>
    );
}
