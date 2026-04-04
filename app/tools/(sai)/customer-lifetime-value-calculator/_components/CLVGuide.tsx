"use client";
import { ToolGuide } from "@/app/tools/_shared/components/ToolGuide";
import { Gem, Users, Clock, BarChart3, DollarSign } from "lucide-react";

export function CLVGuide() {
    const guideItems = [
        {
            title: "CLV: The Core Metric for Sustainable Growth",
            description: "CLV reveals the total profit a customer generates over their lifetime, turning ad spend limits from guesses into calculated decisions. A 3:1 LTV to CAC ratio ensures scaling is consistently profitable.",
            icon: Gem,
            iconBg: "bg-blue-50",
            iconColor: "text-blue-500",
            stat: "3:1+",
            statColor: "text-blue-500",
            statLabel: "Ideal LTV/CAC"
        },
        {
            title: "Retention Is Your Most Powerful Growth Lever",
            description: "Because retained buyers incur no new acquisition costs, improving retention by just 5% can exponentially increase total profits. Use loyalty programs to systematically boost purchase frequency.",
            icon: Users,
            iconBg: "bg-emerald-50",
            iconColor: "text-emerald-500",
            stat: "+95%",
            statColor: "text-emerald-500",
            statLabel: "Profit from 5% Retention"
        },
        {
            title: "Revenue is Vanity, Lifetime Profit is Sanity",
            description: "High revenue is deceptive if product costs consume it. Factoring in your Gross Margin % reveals your true Lifetime Profit, which is the only reliable number for setting sustainable marketing budgets.",
            icon: DollarSign,
            iconBg: "bg-purple-50",
            iconColor: "text-purple-600",
            stat: "Revenue vs Profit",
            statColor: "text-purple-600",
            statLabel: "The True Measure"
        },
        {
            title: "Segment Customers to Focus Your Budget",
            description: "Your top 20% of customers often drive 80% of your total revenue. Identify these VIP buyers by their high order values, then target them specifically with exclusive retargeting and premium upsells.",
            icon: BarChart3,
            iconBg: "bg-amber-50",
            iconColor: "text-amber-500",
            stat: "Top 20%",
            statColor: "text-amber-500",
            statLabel: "Drives 80% Revenue"
        },
    ];

    return (
        <ToolGuide
            title="The Complete CLV Strategy Guide"
            items={guideItems}
        />
    );
}