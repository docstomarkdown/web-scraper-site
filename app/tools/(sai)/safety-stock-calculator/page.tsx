import { Metadata } from "next";
import { SafetyStockCalculator } from "./_components/SafetyStockCalculator";
import { SafetyStockGuide } from "./_components/SafetyStockGuide";
import { SafetyStockHowToUse } from "./_components/SafetyStockHowToUse";
import { SafetyStockOverview } from "./_components/SafetyStockOverview";
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components";
import { ToolPageTitle } from "@/app/tools/_shared/components/ToolPageTitle";
import { CTA } from "@/components/sections/CTA";

export const metadata: Metadata = {
    title: "Safety Stock Calculator | Web Scraper.do",
    description: "Calculate the optimal safety stock to prevent stockouts. Handle demand and lead time variability with confidence using the standard buffer formula.",
};

const faqs = [
    {
        question: "How do I use safety stock to calculate my reorder point?",
        answer: "Your reorder point is the exact inventory level at which you must place a new order. It is calculated by taking your normal demand (Average Daily Sales × Average Lead Time) and simply adding your safety stock buffer on top. This ensures fresh inventory hits your warehouse exactly when your regular stock pipeline runs out, leaving your safety buffer untouched."
    },
    {
        question: "Where do I look to find accurate 'worst-case' data?",
        answer: "To find your Max Daily Sales, review your historical platform data and identify the single highest sales spike you've had in the past 12 months (e.g., Prime Day, Black Friday, or a viral campaign). For Max Lead Time, examine your logistics records to find the absolute longest delay you've experienced due to factory stalls, customs, or freight issues."
    },
    {
        question: "How often should I recalculate my safety buffer?",
        answer: "You should recalibrate your safety stock at least once a quarter, or immediately after a major business shift. This includes launching new ad campaigns, entering peak seasons like Q4, switching to a new supplier, or changing from air freight to sea freight."
    },
    {
        question: "Does safety stock differ between standard and seasonal products?",
        answer: "Yes, significantly. For highly seasonal goods, using an annual average will either leave you deeply understocked in peak months or severely overstocked off-season. Always recalculate your safety buffer using the specific historical max and average data isolated to the upcoming seasonal window."
    },
    {
        question: "What happens if a supplier delay lasts longer than my buffer?",
        answer: "Safety stock is designed to mitigate standard logistical variances, but extreme supply chain halts (like sudden port strikes or prolonged factory closures) may exhaust it. In high-risk situations, diversify your supplier base, split air and sea freight, or temporarily reduce daily ad spend to proactively slow your sales velocity."
    }
];

export default function SafetyStockCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Safety Stock Calculator" direction="down" duration={0.6} />
                <div className="mb-20">
                    <SafetyStockCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16" id="how-to-use">
                    <FadeIn delay={0.2}>
                        <SafetyStockOverview />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SafetyStockHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <SafetyStockGuide />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <ToolFAQ faqs={faqs} />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    );
}