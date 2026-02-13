import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { SKUGenerator } from "./_components/SKUGenerator"
import { SKUHowToUse } from "./_components/SKUHowToUse"
import { SKUGuide } from "./_components/SKUGuide"
import { CTA } from "@/components/sections/CTA"

export const metadata: Metadata = {
    title: "E-commerce SKU Generator | Create Professional Product Codes",
    description: "Generate consistent, professional SKU codes for your e-commerce inventory. Customize brand, category, and attributes with real-time preview.",
}

export default function SKUGeneratorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 tracking-tight">
                            E-commerce SKU Generator
                        </h1>
                    </FadeIn>
                </div>

                <div className="mb-20">
                    <SKUGenerator />
                </div>

                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <SKUHowToUse />
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <SKUGuide />
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "What is the ideal length for a SKU?",
                                    answer: "Most experts recommend keeping SKUs between 8 to 12 characters. This is long enough to include meaningful data but short enough to be readable and fit on most barcode labels."
                                },
                                {
                                    question: "Should I use letters or just numbers?",
                                    answer: "Alphanumeric SKUs (using both letters and numbers) are generally better. Letters can represent categories or brands (e.g., 'SH' for Shirt), making the code human-readable."
                                },
                                {
                                    question: "Why avoid special characters like @, #, or *?",
                                    answer: "Special characters can cause issues when exporting data to CSVs or importing them into different marketplace platforms (like Amazon or eBay) which may have strict character requirements."
                                },
                                {
                                    question: "Is it okay to use the product's UPC as the SKU?",
                                    answer: "While possible, it's not recommended. UPCs are universal and don't tell you anything about the product's attributes or brand at a glance. SKUs should be internal and meaningful."
                                }
                            ]}
                        />
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
