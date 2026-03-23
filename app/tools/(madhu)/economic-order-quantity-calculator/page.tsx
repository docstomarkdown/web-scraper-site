import { FadeIn, ToolFAQ, ToolPageTitle, ToolSectionHeader } from "@/app/tools/_shared/components"
import { EOQCalculator } from "./_components/EOQCalculator"
import { EOQHowToUse } from "./_components/EOQHowToUse"
import { EOQGuide } from "./_components/EOQGuide"
import { EOQOverview } from "./_components/EOQOverview"
import { CTA } from "@/components/sections/CTA"
import { Metadata } from "next"
import { Lightbulb } from "lucide-react"

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
                        <ToolSectionHeader 
                            title="Tool Essential" 
                            subtitle="Discover how balancing your ordering and holding costs unlocks massive inventory savings."
                            icon={Lightbulb}
                        />
                        <EOQOverview />
                    </FadeIn>
                    <FadeIn delay={0.3}>
                        <EOQHowToUse />
                    </FadeIn>
                    <FadeIn delay={0.4}>
                        <EOQGuide />
                    </FadeIn>
                    <FadeIn delay={0.5}>
                        <ToolFAQ
                            faqs={[
                                {
                                    question: "Why is the EOQ important for my business?",
                                    answer: "Ordering too much ties up your cash in stock; ordering too little increases your shipping and admin costs. EOQ helps you find the exact order size (units to order each time) where you spend the least amount of money overall."
                                },
                                {
                                    question: "What counts as an 'Ordering Cost'?",
                                    answer: "This is the fixed cost you pay every time you place an order. It heavily affects the 'Orders Per Year' recommendation. It includes shipping fees, bank transfer charges, inspection fees, and the time your staff spends processing the purchase."
                                },
                                {
                                    question: "How do I calculate Holding Cost per unit?",
                                    answer: "Estimate the annual cost of warehouse rent per unit, insurance, and the risk of the product going obsolescent. A common industry standard is 20-30% of the item's purchase value annually."
                                },
                                {
                                    question: "What does 'Order Frequency (Days Between Orders)' mean?",
                                    answer: "It tells you exactly when you should reorder. By splitting 365 days by your optimal 'Orders Per Year', the tool shows you the perfect time gap between your purchases, acting as a built-in schedule."
                                }
                            ]}
                        />
                    </FadeIn>
                    <FadeIn delay={0.6}>
                        <CTA withSectionWrapper={false} />
                    </FadeIn>
                </div>
            </div>
        </div>
    )
}
