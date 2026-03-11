import { FadeIn, ToolFAQ, ToolPageTitle } from "@/app/tools/_shared/components"
import { EOQCalculator } from "./_components/EOQCalculator"
import { EOQHowToUse } from "./_components/EOQHowToUse"
import { EOQGuide } from "./_components/EOQGuide"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: "Economic Order Quantity (EOQ) Calculator | Inventory Optimization Tool",
    description: "Calculate the optimal order quantity to minimize annual inventory costs. Find the perfect balance between ordering and holding costs with our free EOQ tool.",
}

export default function EOQCalculatorPage() {
    return (
        <div className="min-h-screen bg-slate-50 pt-32 pb-12">
            <div className="container mx-auto px-4">
                <ToolPageTitle title="Economic Order Quantity (EOQ) Calculator" />
                <div className="mb-20">
                    <EOQCalculator />
                </div>
                <div className="max-w-4xl mx-auto space-y-16">
                    <FadeIn delay={0.2}>
                        <EOQHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <EOQGuide />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why is the EOQ important for my business?",
                                    answer: "Ordering too much ties up your cash in stock; ordering too little increases your shipping and admin costs. EOQ helps you find the exact order size where you spend the least amount of money overall."
                                },
                                {
                                    question: "What counts as an 'Ordering Cost'?",
                                    answer: "This is the fixed cost you pay every time you place an order. It includes shipping fees, bank transfer charges, inspection fees, and the time your staff spends processing the purchase."
                                },
                                {
                                    question: "How do I calculate Holding Cost per unit?",
                                    answer: "Estimate the annual cost of warehouse rent per unit, insurance, and the risk of the product going obsolete. A common industry standard is 20-30% of the item's purchase value per year."
                                },
                                {
                                    question: "Does this tell me when to reorder?",
                                    answer: "This tool tells you 'how much' to order. To know 'when' to order, you should factor in your supplier's lead time and your daily sales volume."
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
