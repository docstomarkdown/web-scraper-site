import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { PriceElasticityCalculator } from "./_components/PriceElasticityCalculator"
import { PriceElasticityHowToUse } from "./_components/PriceElasticityHowToUse"
import { PriceElasticityGuide } from "./_components/PriceElasticityGuide"
export const metadata: Metadata = {
    title: "Price Elasticity Calculator | Measure Demand Sensitivity",
    description: "Calculate Price Elasticity of Demand (PED) to understand how sensitive your product's demand is to price changes. Optimize your pricing strategy.",
    keywords: ["price elasticity calculator", "PED calculator", "demand sensitivity", "pricing strategy", "elastic demand"],
}
const priceElasticityFaqs = [
    {
        question: "What is Price Elasticity of Demand (PED)?",
        answer: "PED measures how the quantity demanded of a good changes when its price changes. It helps businesses understand consumer sensitivity to price fluctuations.",
    },
    {
        question: "What does it mean if demand is elastic?",
        answer: "If demand is elastic (PED > 1), a small change in price leads to a significant change in the quantity demanded. Consumers are very sensitive to price.",
    },
    {
        question: "What does it mean if demand is inelastic?",
        answer: "If demand is inelastic (PED < 1), a change in price has little effect on the quantity demanded. Essential goods often have inelastic demand.",
    },
    {
        question: "How can I use this calculator to increase revenue?",
        answer: "If demand is inelastic, increasing prices may increase total revenue. If demand is elastic, lowering prices might increase volume enough to boost total revenue. Use this tool to model potential outcomes.",
    },
]
export default function PriceElasticityCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Price Elasticity <span className="text-blue-600">Calculator</span>
                        </h1>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <PriceElasticityCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PriceElasticityHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <PriceElasticityGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ faqs={priceElasticityFaqs} />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}