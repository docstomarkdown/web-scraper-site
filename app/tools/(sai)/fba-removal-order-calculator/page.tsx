import { Metadata } from "next"
import { FBARemovalCalculator } from "./_components/FBARemovalCalculator"
import { FBARemovalGuide } from "./_components/FBARemovalGuide"
import { FBARemovalHowToUse } from "./_components/FBARemovalHowToUse"
import { FBARemovalOverview } from "./_components/FBARemovalOverview"
import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "FBA Removal Order Cost Calculator | Web Scraper.do",
    description: "Calculate Amazon FBA removal and disposal order fees for 2025. Estimate costs for standard and oversize items by entering dimensions, weight, and quantity."
}

export default function FBARemovalOrderPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="FBA Removal Order Calculator" direction="down" duration={0.6} />

                <div className="mb-20">
                    <FBARemovalCalculator />
                </div>

                <div className="max-w-5xl mx-auto space-y-16" id="fba-removal-guide">
                    <FadeIn delay={0.2}>
                        <ToolSectionHeader
                            title="Tool Essential"
                            subtitle="Understand exactly what Amazon will charge before you submit a removal or disposal order — based on 2025 rates, size tiers, and shipping weight logic."
                            icon={BookOpen}
                        />
                        <FBARemovalOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FBARemovalHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <FBARemovalGuide />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "When are removal fees charged?",
                                    answer: "Removal fees are charged when the removal order is placed and confirmed. The fee rate is determined by your product's size tier (Standard or Large/Bulky) and its shipping weight — the greater of actual or dimensional weight."
                                },
                                {
                                    question: "Are disposal fees cheaper than removal fees?",
                                    answer: "No. In 2025, Amazon charges the same per-unit fee for both removal (return to seller) and disposal orders. The choice should be based on whether you can profitably resell the inventory, not on fee differences."
                                },
                                {
                                    question: "How is dimensional weight calculated?",
                                    answer: "Dimensional weight = (Length × Width × Height) ÷ 139, where all measurements are in inches and the result is in pounds. Amazon uses the greater of your product's actual unit weight or this dimensional weight as the billing weight."
                                },
                                {
                                    question: "What is the Standard vs. Large/Bulky size threshold?",
                                    answer: "A product qualifies as Standard size if it is ≤ 18 inches long, ≤ 14 inches wide, ≤ 8 inches tall, AND ≤ 20 lbs in weight. Any product exceeding any one of these limits is classified as Large/Bulky, which carries higher removal fees."
                                },
                                {
                                    question: "Is FBA Liquidation a better option than removal?",
                                    answer: "It depends. With FBA Liquidations, Amazon sells your inventory to liquidators and returns 5–10% of the estimated sale price to you. This eliminates the removal fee cost entirely. If the recovered amount exceeds what you'd net after a removal + resale, liquidation is the smarter choice."
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}