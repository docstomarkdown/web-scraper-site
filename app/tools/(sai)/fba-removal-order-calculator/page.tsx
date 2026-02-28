import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { FBARemovalCalculator } from "./_components/FBARemovalCalculator"
import { FBARemovalHowToUse } from "./_components/FBARemovalHowToUse"
import { FBARemovalGuide } from "./_components/FBARemovalGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata = {
    title: "FBA Removal Order Cost Calculator | Web Scraper Pro",
    description: "Calculate Amazon FBA removal and disposal order fees for 2025. Estimate costs for standard and oversize items."
}

export default function Page() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                            FBA Removal Order Calculator
                        </h1>
                    </div>
                </FadeIn>

                <div className="mb-20">
                    <FadeIn delay={0.1}>
                        <FBARemovalCalculator />
                    </FadeIn>
                </div>

                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}><FBARemovalHowToUse /></FadeIn>
                    <FadeIn delay={0.3}><FBARemovalGuide /></FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "When are removal fees charged?",
                                    answer: "Removal fees are charged when the removal order is placed. The fee rates depend on the size and shipping weight of the item."
                                },
                                {
                                    question: "Are disposal fees cheaper than removal?",
                                    answer: "Typically, no. In most cases, Amazon charges the same fee per unit for both removal (return to seller) and disposal."
                                },
                                {
                                    question: "How is shipping weight calculated?",
                                    answer: "For standard size items <= 1 lb, it's unit weight. For others, it's the greater of unit weight or dimensional weight. Large bulky items prioritize dimensional weight."
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.5}><CTA /></FadeIn>
                </div>
            </div>
        </div>
    )
}
