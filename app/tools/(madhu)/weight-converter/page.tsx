import { Metadata } from "next"
import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { WeightConverter } from "./_components/WeightConverter"
import { WeightConverterInfo } from "./_components/WeightConverterInfo"
import { WeightConverterHowToUse } from "./_components/WeightConverterHowToUse"
import { WeightConverterGuide } from "./_components/WeightConverterGuide"
import { CTA } from "@/components/sections/CTA"
export const metadata: Metadata = {
    title: "Product Weight Converter - Optimize E-Commerce Shipping Cost",
    description: "Convert e-commerce product weight to lbs, oz, kg, grams. Instantly calculate shipping tier impact, packaging dead weight, and carrier thresholds to cut fulfillment costs.",
}
export default function WeightConverterPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Product Weight Converter" />
                <div className="mb-20">
                    <WeightConverter />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.15}>
                        <WeightConverterInfo />
                    </FadeIn>
                    <FadeIn delay={0.2}>
                        <WeightConverterHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <WeightConverterGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "How do I switch the input unit?",
                                    answer: "Use the <strong>four unit buttons</strong> (lbs, oz, kg, g) next to the Weight Unit row. The Target Unit row below lets you choose which unit appears as the large hero number in the Results Panel. All other units are always shown in the \"Other Units\" card regardless of your target selection."
                                },
                                {
                                    question: "Which shipping carriers are supported?",
                                    answer: "The tool includes tier estimates for <strong>7+ global carriers</strong>: USPS, FedEx, UPS, and DHL for US and global shipping, plus Royal Mail (UK), Canada Post, and Australia Post for regional shipping. Each carrier has its own set of weight tiers with realistic cost range estimates."
                                },
                                {
                                    question: "What is the Shipping Speed option?",
                                    answer: "If you haven't decided on a carrier yet, switch to <strong>Shipping Speed mode</strong> (Standard / Express / Next Day) to get generic cross-carrier cost estimates based on delivery speed. This is useful for early-stage pricing research before committing to a specific carrier."
                                },
                                {
                                    question: "How accurate are the shipping cost estimates?",
                                    answer: "Estimates are based on publicly published carrier weight tiers and represent <strong>typical retail rate ranges</strong>. Actual costs will vary based on origin/destination distance, package dimensions, negotiated business rates, and surcharges. Use these figures as a baseline to identify which tier your product falls into — not as a final invoiced amount."
                                },
                                {
                                    question: "What does the Cost Breakdown expand to?",
                                    answer: "Clicking <strong>\"View Cost Breakdown\"</strong> reveals every weight tier for the selected carrier in a scrollable list. Your current tier is highlighted with a colored border and badge. This lets you see exactly how many lbs/oz stand between you and a cheaper or more expensive shipping band — critical for packaging weight optimisation."
                                },
                                {
                                    question: "Why did my product fall into a 'Contact carrier' or 'Freight' tier?",
                                    answer: "When a package exceeds a carrier's standard parcel weight limit (typically 70–150 lbs depending on the carrier), it moves out of standard parcel delivery into <strong>freight forwarding</strong>. Freight pricing requires a custom quote based on pallet dimensions, weight, density, and shipping lane — these can't be estimated generically."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
