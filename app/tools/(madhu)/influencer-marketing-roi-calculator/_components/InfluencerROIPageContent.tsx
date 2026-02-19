"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "../../ToolTemplate"
import { InfluencerROICalculator } from "./InfluencerROICalculator"
import { DollarSign, Users, Target, TrendingUp, Gift, MessageSquare, Heart } from "lucide-react"

export function InfluencerROIPageContent() {
    const steps: Step[] = [
        {
            title: "Itemize Campaign Costs",
            description: "Enter your primary influencer fees, product COGS, and logistics expenses. Use the **Budget Allocation** chart to visualize how your capital is distributed across different cost centers.",
            icon: DollarSign
        },
        {
            title: "Connect Performance Data",
            description: "Log your campaign results including total sales revenue, conversions, and reach. Our calculator automatically syncs these with your costs to determine your final efficiency metrics.",
            icon: Target
        },
        {
            title: "Review Profitability Status",
            description: "Check the **Dynamic Status Badge** (Profit/Loss) to immediately see if your campaign is in the green. Analyze your ROI and ROAS to measure the net effectiveness of the partnership.",
            icon: TrendingUp
        },
        {
            title: "Benchmark Efficiency",
            description: "Use the **CPA** and **CPM** tooltips to understand your unit-level performance. Compare these against your company's target customer acquisition tiles to guide future scaling decisions.",
            icon: Users
        }
    ]

    const goal = {
        title: "Quantitative Influencer Strategy",
        description: "Move beyond 'vanity metrics' and gut feelings. This tool provides a rigorous financial framework to prove the value of your creator partnerships and optimize your marketing budget for maximum growth.",
        icon: TrendingUp
    }

    const insights: Insight[] = [
        {
            title: "Logistics: The Hidden ROI Killer",
            description: "Most brands fail to account for the 'fully loaded' cost of a campaign. Shipping, premium packaging, and agency management fees can erode your margins by up to 30% if not tracked meticulously.",
            icon: Gift,
            stat: "22.5%",
            statLabel: "Avg. Profit Erosion",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            statColor: "text-blue-600",
            tooltip: "The standard percentage of ROI lost when logistics and overhead costs are overlooked."
        },
        {
            title: "Micro-Creator Efficiency",
            description: "While macro-influencers offer massive reach, influencers with 5k-50k followers often deliver a 4x better ROAS due to higher trust levels and niche-specific audience alignment.",
            icon: MessageSquare,
            stat: "4.1x",
            statLabel: "ROAS Multiplier",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-600",
            tooltip: "Typical increase in return on ad spend when pivoting from celebrity to micro-influence."
        },
        {
            title: "Delayed Attribution Window",
            description: "Influencer marketing often has a 'halo effect' that peaks 7-14 days after a post. Measuring ROI too early results in undervalued campaigns; wait for the full conversion tail to finalize.",
            icon: Heart,
            stat: "10 Days",
            statLabel: "Average Sales Lag",
            iconBg: "bg-rose-100",
            iconColor: "text-rose-600",
            statColor: "text-rose-600",
            tooltip: "The average time it takes for a consumer to move from influencer post to final purchase."
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "How does this tool define the difference between ROI and ROAS?",
            answer: "**ROAS** (Return on Ad Spend) measures the raw efficiency of your dollar (Revenue / Total Costs). **ROI** (Return on Investment) provides the net profitability view, accounting for your product margins and operational overhead."
        },
        {
            question: "What is the Budget Allocation bar used for?",
            answer: "It provides a visual breakdown of where your money is actually going. High-performing brands aim to keep 'Direct Fees' high and 'Logistics/Overhead' low to ensure most of the budget is driving reach."
        },
        {
            question: "Should I input the retail value or the COGS for products?",
            answer: "For an accurate ROI, you MUST use the **COGS (Cost of Goods Sold)**. Using the retail price will inflate your 'investment' and artificially lower your calculated profitability."
        },
        {
            question: "What is a target CPA to aim for in influencer campaigns?",
            answer: "This varies by industry, but a healthy campaign generally has a **CPA (Cost Per Acquisition)** that is lower than your 12-month Customer Lifetime Value (LTV)."
        }
    ]

    return (
        <MadhuToolTemplate
            title="Influencer Marketing ROI Calculator"
            toolComponent={<InfluencerROICalculator />}
            howToUseTitle="How to Measure Campaign Success"
            howToUseSteps={steps}
            howToUseGoal={goal}
            hiddenTruthInsights={insights}
            faqs={faqs}
        />
    )
}
