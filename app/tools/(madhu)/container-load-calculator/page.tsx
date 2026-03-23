import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { ContainerLoadCalculator } from "./_components/ContainerLoadCalculator"
import { ContainerLoadHowToUse } from "./_components/ContainerLoadHowToUse"
import { ContainerLoadGuide } from "./_components/ContainerLoadGuide"
import { ContainerLoadOverview } from "./_components/ContainerLoadOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { BookOpen } from "lucide-react"

export const metadata: Metadata = {
    title: "Container Load Calculator - Optimize Shipping & Cargo Space",
    description: "Calculate how many boxes fit in a 20ft or 40ft container. Optimize pallet loading, cubic volume, and weight limits to maximize your shipping ROI.",
    keywords: ["container load calculator", "cargo space optimizer", "shipping calculator", "pallet loading", "20ft container capacity", "40ft container capacity"],
}

export default function ContainerLoadCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <FadeIn>
                    <ToolPageTitle
                        title="Container Load Calculator"
                    />
                </FadeIn>

                <div className="mb-20">
                    <ContainerLoadCalculator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.1}>
                        <ToolSectionHeader 
                            title="Tool Essential" 
                            subtitle="Deep dive into how our tool precisely calculates volume utilization to help you optimize shipping costs."
                            icon={BookOpen}
                        />
                        <ContainerLoadOverview />
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <ContainerLoadHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <ContainerLoadGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What's the difference between Loose and Pallet loading?",
                                    answer: "Loose loading stacks your cartons directly inside the container, maximising volume. Pallet loading places boxes on pallets first — it's slower to load but protects fragile goods and allows forklift handling. Pallets typically reduce usable volume by 10–15%."
                                },
                                {
                                    question: "Do I need to fill in the Unit Weight?",
                                    answer: "No — Unit Weight is optional. If you leave it blank, the calculator will focus purely on dimensional capacity (how many boxes fit by size). If you enter a weight, the tool will also check whether the total cargo weight stays within the container's payload limit."
                                },
                                {
                                    question: "What does the Arrangement result mean?",
                                    answer: "The Arrangement shows exactly how your boxes are positioned in the container — for example '14L × 4W × 6H' means 14 boxes along the length, 4 across the width, and 6 stacked high. For pallet mode, it shows pallet positions and box layers per pallet."
                                },
                                {
                                    question: "What does Space Utilization % mean?",
                                    answer: "Space Utilization is the percentage of total container interior volume that your cargo actually occupies. A score of 85%+ is considered efficient. If your score is low, try adjusting your carton dimensions or switching between loose and pallet mode."
                                },
                                {
                                    question: "Which container type should I choose?",
                                    answer: "Use a 20ft Standard for dense, heavy goods (it has the highest payload at 28,200 kg). Use a 40ft High Cube for light, bulky cargo — the extra 30cm of interior height often fits an entire extra stacking layer. Use Reefer containers for temperature-controlled shipments."
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
