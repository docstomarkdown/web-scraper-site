"use client"

import { AffiliateCommissionCalculator } from "./AffiliateCommissionCalculator"
import { MadhuToolTemplate, Step, Insight, FAQ } from "../../ToolTemplate"
import {
    DollarSign,
    Percent,
    Target,
    AlertCircle,
    TrendingUp,
    ShieldCheck,
    Search
} from "lucide-react"

export function AffiliateCommissionCalculatorPageContent() {
    const howToUseSteps: Step[] = [
        {
            title: "Enter Product Details",
            description: "Input your retail **Price** and **Product Cost (COGS)**. This is the foundation for calculating your true net profit margin.",
            icon: DollarSign
        },
        {
            title: "Set Commission & Refunds",
            description: "Add your **Commission Rate** and estimated **Refund Rate**. The tool automatically deducts refunds so you see the real payout liability.",
            icon: Percent
        },
        {
            title: "Scale the Numbers",
            description: "Use the **Active Affiliates** inputs to simulate bulk payouts. See exactly how much cash you need to pay 10, 50, or 100 partners.",
            icon: TrendingUp
        },
        {
            title: "Monitor the 'Loss Warning'",
            description: "Watch the **Profit Safe / Loss Warning** alert in the results card. It will turn red instantly if your commission rate exceeds your break-even point.",
            icon: AlertCircle
        }
    ]

    const howToUseGoal = {
        title: "Eliminate Payout Leaks",
        description: "The goal is to design a commission structure that is competitive for affiliates but rigorously protects your bottom line against refunds and low margins.",
        icon: ShieldCheck
    }

    const insights: Insight[] = [
        {
            title: "The 'Net Sales' Rule",
            description: "Many programs mistakenly pay commission on gross sales. This calculator uses the 'Net Sales' standard—deducting the refund rate *before* calculating the payout. This single adjustment can save you 10–15% in payouts annually.",
            icon: Target,
            stat: "-15%",
            statLabel: "Payout Savings",
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-600",
            tooltip: "Recover lost profit by paying on net, not gross."
        },
        {
            title: "Break-Even Blindness",
            description: "Most sellers guess their max rate. By entering your COGS, this tool calculates your exact mathematical ceiling. Knowing you can afford 40% (when competitors offer 20%) gives you a massive recruiting advantage.",
            icon: Search,
            stat: "Recruiting",
            statLabel: "Advantage",
            iconBg: "bg-blue-50",
            iconColor: "text-blue-600",
            statColor: "text-blue-600"
        },
        {
            title: "The Refund Double-Whammy",
            description: "If you pay a commission on a refunded item, you lose the product cost AND the commission cash. Always align your payout schedule (e.g., Net-30) to be longer than your refund window.",
            icon: AlertCircle,
            stat: "CRITICAL",
            statLabel: "Risk Alert",
            iconBg: "bg-red-50",
            iconColor: "text-red-600",
            statColor: "text-red-600"
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "How is 'Net Revenue' calculated in this tool?",
            answer: "Net Revenue = (Net Sales × Product Price) - (Net Sales × Product Cost) - Total Payout. It represents your absolute 'take-home' profit after manufacturing costs and affiliate commissions are paid."
        },
        {
            question: "What does the 'Profit Safe' badge mean?",
            answer: "It means your Commission Rate is lower than your Break-Even Rate. You are making a profit on every unit sold. If it changes to 'Loss Warning', you are paying affiliates more than your margin allows."
        },
        {
            question: "Why can't I see the Commission Rate inputs description?",
            answer: "To keep the interface clean, detailed descriptions are hidden behind the small 'i' (Info) icon next to each label. Hover over or tap the icon to see the full definition of any field."
        },
        {
            question: "Should I include shipping in the Product Price?",
            answer: "No. Affiliates are typically paid on the *product value* only. Shipping and taxes are pass-through costs and should be excluded from the price input to ensure accuracy."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Affiliate Commission Calculator"
            toolComponent={<AffiliateCommissionCalculator />}
            howToUseSteps={howToUseSteps}
            howToUseGoal={howToUseGoal}
            hiddenTruthInsights={insights}
            faqs={faqs}
        />
    )
}
