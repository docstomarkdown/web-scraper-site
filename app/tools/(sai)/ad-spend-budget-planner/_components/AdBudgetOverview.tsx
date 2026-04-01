"use client";

import { ToolOverview } from "@/app/tools/_shared/components/ToolOverview";

export function AdBudgetOverview() {
    return (
        <ToolOverview
            heading="Why Use the Ad Spend Planner?"
            headingAccent="Ad Spend Planner?"
            definition="The Ad Spend Budget Planner is a free tool that calculates the exact advertising budget you need to hit your monthly or quarterly revenue goals. Enter your revenue target and desired ROAS, and it instantly returns your required ad spend, estimated clicks, orders, and daily budget.Designed for eCommerce sellers, marketers, and business owners, it delivers accurate PPC planning for Amazon, Google, Meta, and other ad platforms—removing guesswork and preventing overspending"
            accent="blue"
            facts={[
                {
                    stat: "Required Budget",
                    label: "Target",
                    detail: "Identify exactly how much capital you need to risk to reach your monthly revenue objective."
                },
                {
                    stat: "Hidden Costs",
                    label: "Calculated",
                    detail: "Accurately calculate hidden performance requirements like CPC and conversion rates to hit your final targets."
                },
                {
                    stat: "Daily Pacing",
                    label: "Strategy",
                    detail: "Dividing your monthly budget into a strict daily spend threshold prevents premature budget exhaustion."
                }
            ]}
        />
    );
}
