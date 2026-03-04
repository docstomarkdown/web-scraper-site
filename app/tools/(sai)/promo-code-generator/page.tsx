import { Metadata } from "next"
import { FadeIn, ToolFAQ } from "@/app/tools/_shared/components"
import { CTA } from "@/components/sections/CTA"
import { PromoCodeCalculator } from "./_components/PromoCodeCalculator"
import { PromoCodeHowToUse } from "./_components/PromoCodeHowToUse"
import { PromoCodeGuide } from "./_components/PromoCodeGuide"
export const metadata: Metadata = {
    title: "Promo Code Generator | Create Professional Discount Codes",
    description: "Quickly generate professional, randomized promo codes for your e-commerce store. Support for custom prefixes, suffixes, and character selection.",
    keywords: ["promo code generator", "discount code generator", "coupon code generator", "amazon promo codes", "shopify discounts"],
}
const promoCodeFaqs = [
    {
        question: "How many codes can I generate at once?",
        answer: "You can generate up to 50 unique promo codes in a single batch. If you need more, simply click 'Generate' again to create a fresh set of codes.",
    },
    {
        question: "Where can I use these promo codes?",
        answer: "These codes are universal and can be used on any platform that supports custom discount codes, including Shopify, Amazon, WooCommerce, Magento, and custom-built e-commerce sites.",
    },
    {
        question: "Do prefixes and suffixes affect the randomness?",
        answer: "No. The randomized part of the code is generated independently. Prefixes and suffixes are static strings added to the start and end of each code for branding or tracking purposes.",
    },
    {
        question: "Are the generated codes unique?",
        answer: "The generator uses high-entropy randomization to ensure each batch of codes is unique. For very large batches (thousands), we recommend cross-checking for duplicates before importing to your store.",
    },
]
export default function PromoCodeGeneratorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <FadeIn>
                        <h1 className="text-4xl md:text-[42px] font-bold text-slate-900 mb-4 tracking-tight">
                            Promo Code <span className="text-blue-600">Generator</span>
                        </h1>
                        <p className="text-lg text-slate-600">
                            Create professional, randomized discount codes for your e-commerce campaigns in seconds.
                        </p>
                    </FadeIn>
                </div>
                <div className="mb-20">
                    <PromoCodeCalculator />
                </div>
                <div className="max-w-5xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <PromoCodeHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <PromoCodeGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ faqs={promoCodeFaqs} />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <CTA />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}