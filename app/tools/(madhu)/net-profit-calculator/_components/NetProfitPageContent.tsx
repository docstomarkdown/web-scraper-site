"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "../../ToolTemplate"
import { NetProfitCalculator } from "./NetProfitCalculator"
import { Calculator, DollarSign, TrendingUp, Search } from "lucide-react"

export function NetProfitPageContent() {
    const steps: Step[] = [
        {
            title: "Log Your Gross Revenue",
            description: "Start by entering your total sales receipts before any deductions. This is the baseline from which all expenses will be subtracted.",
            icon: DollarSign
        },
        {
            title: "Deduct Product & Fulfillment Costs",
            description: "Enter your total **COGS**. This includes manufacturing, shipping to your warehouse, customs, and packaging fees.",
            icon: Search
        },
        {
            title: "Account for Marketing & Overhead",
            description: "Add your advertising spend and operational costs like software subscriptions, rent, and salaries to see your operating profit.",
            icon: Calculator
        },
        {
            title: "Calculate After-Tax Earnings",
            description: "Apply your estimated local tax rate. The final figure is your **Real Net Profit**—the money that actually goes into your bank account.",
            icon: TrendingUp
        }
    ]

    const goal = {
        title: "Achieve Financial Transparency",
        description: "Moving from 'I think we're profitable' to 'I know we're profitable.' This tool helps you identify exactly where your money is leaking so you can fix your margins.",
        icon: Search
    }

    const insights: Insight[] = [
        {
            title: "Revenue is Vanity",
            description: "High revenue figures look great on social media, but they tell you nothing about business health. A $1M business with $990k in costs is far more fragile than a $100k business with $30k in net profit.",
            icon: TrendingUp,
            stat: "10-20%",
            statLabel: "Average Net Margin",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-600",
            tooltip: "The typical benchmark for a healthy, sustainable e-commerce brand."
        },
        {
            title: "The Overhead Creep",
            description: "Small monthly subscriptions and 'miscellaneous' expenses can quietly eat 5-10% of your margins. If you aren't tracking overhead, you aren't tracking the bottom line.",
            icon: DollarSign,
            stat: "-12%",
            statLabel: "Margin Leakage",
            iconBg: "bg-amber-100",
            iconColor: "text-amber-600",
            statColor: "text-amber-600",
            tooltip: "Typical percentage of profit lost to untracked subscriptions and processing fees."
        },
        {
            title: "The Silent Tax Trap",
            description: "Many owners confuse 'Cash in Bank' with 'Profit.' Always set aside your estimated tax amount immediately, or you'll find yourself in a cash flow crisis during tax season.",
            icon: Calculator,
            stat: "25%+",
            statLabel: "Tax Allocation",
            iconBg: "bg-red-100",
            iconColor: "text-red-600",
            statColor: "text-red-600",
            tooltip: "Recommended percentage of operating profit to set aside for business taxes."
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "What is the difference between Gross Profit and Net Profit?",
            answer: "Gross Profit is only your Revenue minus COGS. **Net Profit** is what remains after subtracting EVERYTHING else—ads, rent, software, payroll, and taxes. It is your true take-home pay."
        },
        {
            question: "Should I include owner's salary in overhead?",
            answer: "Absolutely. If you don't pay yourself a fair market wage in your calculations, your profit is artificially inflated. You are calculating the profit of the business, not your total compensation."
        },
        {
            question: "What does a negative ROI imply?",
            answer: "A negative ROI means you are losing money on every dollar you spend to run the business. This usually points to high COGS, inefficient ad spend, or a price point that is simply too low."
        },
        {
            question: "How should I use the Revenue Distribution chart?",
            answer: "The chart helps you visualize the 'Slices of the Pie.' If 'Ads' or 'COGS' is taking up more than 40-50% of the bar, those are the first areas you should target for cost reduction."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Net Profit Calculator"
            toolComponent={<NetProfitCalculator />}
            howToUseTitle="How to Use This Tool"
            howToUseSteps={steps}
            howToUseGoal={goal}
            hiddenTruthTitle="The Hidden Truth About This Process"
            hiddenTruthInsights={insights}
            faqs={faqs}
        />
    )
}
