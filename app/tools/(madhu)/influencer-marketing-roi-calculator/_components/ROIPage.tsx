"use client"

import React from "react"
import { MadhuToolTemplate, Step, Insight, FAQ } from "../../ToolTemplate"
import { InfluencerROICalculator } from "./CalculatorComponent"
import { DollarSign, Users, Target, TrendingUp, Gift, MessageSquare, Heart } from "lucide-react"

export function InfluencerROIPageContent() {
    const steps: Step[] = [
        {
            title: "Set Your Campaign Baseline",
            description: "Start by selecting your currency and defining the total budget cap. This instantly calibrates the tool to track your burn rate against your financial ceiling.",
            icon: Target
        },
        {
            title: "Itemize All Direct & Invisible Costs",
            description: "Go beyond just the influencer fee. Log shipping, packaging, agency commissions, and rights usage fees to uncover the *true* cost of the partnership.",
            icon: DollarSign
        },
        {
            title: "Sync Performance Data",
            description: "Input the final campaign metrics—sales, reach, and engagement. The calculator will cross-reference this against your 'Fully Loaded' cost to generate net efficiency metrics.",
            icon: TrendingUp
        },
        {
            title: "Optimize Future Spend",
            description: "Use the **CPA** and **ROAS** outputs to negotiate better rates for the next campaign. If the ROAS is below 2.0x, renegotiate fees or shift to a commission-only model.",
            icon: Users
        }
    ]

    const goal = {
        title: "Quantitative Influencer Strategy",
        description: "Move beyond 'vanity metrics' and gut feelings. This tool provides a financial framework to prove the value of your creator partnerships and optimize your marketing budget for maximum growth.",
        icon: TrendingUp
    }

    const insights: Insight[] = [
        {
            title: "The 'Halo Effect' Lag",
            description: "Influencer campaigns rarely pay off on Day 1. Data shows that 40% of sales occur 7-30 days *after* the post goes live. Judging a campaign's ROI in the first 48 hours will almost always result in a false negative.",
            icon: TrendingUp,
            stat: "30 Days",
            statLabel: "Attribution Win.",
            iconBg: "bg-blue-100",
            iconColor: "text-blue-600",
            statColor: "text-blue-600",
            tooltip: "The standard window needed to capture the full tail of influencer-driven conversions."
        },
        {
            title: "The Whitelisting Standard",
            description: "Organic reach is dying. The most profitable brands now budget an additional 30-50% of the influencer fee specifically for 'Whitelisting' (boosting the creator's post as an ad), which typically doubles the ROAS.",
            icon: Target,
            stat: "+120%",
            statLabel: "ROAS Lift",
            iconBg: "bg-emerald-100",
            iconColor: "text-emerald-600",
            statColor: "text-emerald-600",
            tooltip: "Average increase in return on ad spend when organic posts are boosted with paid media."
        },
        {
            title: "Content Decoupling",
            description: "Smart brands view the 'Influencer Fee' as a 'Content Production Fee'. Even if the post drives zero sales, acquiring high-quality UGC for $500 is often cheaper than hiring a professional studio (avg $2,500/day).",
            icon: Gift,
            stat: "$2k",
            statLabel: "Studio Savings",
            iconBg: "bg-purple-100",
            iconColor: "text-purple-600",
            statColor: "text-purple-600",
            tooltip: "Money saved by using influencer-generated content instead of booking a professional photo shoot."
        }
    ]

    const faqs: FAQ[] = [
        {
            question: "What is a 'Good' ROI for Influencer Marketing?",
            answer: "A healthy e-commerce campaign typically targets a **300% ROI (3:1)**. However, for brand awareness strategies, a 1:1 break-even is often acceptable if the 'Cost Per Impression' (CPM) is significantly lower than Facebook/Instagram Ads."
        },
        {
            question: "Why should I include 'Product COGS'?",
            answer: "Many brands make the mistake of calculating ROI based on retail value. You must deduct the **Cost of Goods Sold (COGS)** and shipping to see real cash efficiency. If you gift a $100 item that cost you $20 to make, your investment is $20, not $100."
        },
        {
            question: "What is the difference between CPM and CPE?",
            answer: "**CPM (Cost Per Mille)** measures the cost for every 1,000 views (Awareness), while **CPE (Cost Per Engagement)** measures the cost for every Like, Comment, or Share (Interest). Use CPM for top-of-funnel goals and CPE for community building."
        },
        {
            question: "How do I track 'Total Sales' from a post?",
            answer: "Always provide a unique discount code (e.g., 'SARAH20') or a tracked UTM link. Without these direct attribution methods, you will largely underestimate the campaign's impact."
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

